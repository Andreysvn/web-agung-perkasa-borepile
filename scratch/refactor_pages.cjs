const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/pages');
const filesToProcess = [
    'alat/index.astro',
    'alat/gawangan/index.astro',
    'alat/mini-crane/index.astro',
    'alat/strauss-pile/index.astro',
    'artikel/bore-pile-machine.astro',
    'artikel/bore-pile-manual.astro',
    'artikel/bore-pile-vs-strauss-pile.astro',
    'artikel/borepile-vs-tiang-pancang.astro',
    'artikel/index.astro',
    'artikel/perencanaan-borepile.astro',
    'artikel/perkuat-pondasi-tanah-lunak.astro',
    'artikel/pondasi-area-terbatas.astro',
    'artikel/proses-bore-pile.astro',
    'artikel/strauss-lokasi-sempit.astro',
    'artikel/ukuran-pondasi-bore-pile.astro',
    'galeri/gallery-2.astro',
    'galeri/gallery.astro',
    'jasa/index.astro',
    'jasa/bore-pile/index.astro',
    'jasa/strauss-pile/jakarta/index.astro'
];

for (const file of filesToProcess) {
    const filePath = path.join(srcDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('<!DOCTYPE html>')) {
        continue;
    }
    
    // Extract title
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(' | Agung Perkasa', '').replace(' | Agung Perkasa Borepile', '') : '';
    
    // Extract description
    const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)">/i);
    const description = descMatch ? descMatch[1] : '';
    
    // Extract keywords
    const kwMatch = content.match(/<meta\s+name="keywords"\s+content="([^"]+)">/i);
    const keywords = kwMatch ? kwMatch[1] : '';
    
    // Check if it has a custom JSON-LD script block that isn't handled by BaseLayout
    // BaseLayout injects organizationSchema and websiteSchema.
    let headSlotContent = '';
    
    // Extract anything between <head> and </head> that we might want to keep?
    // Actually, we can just extract everything between <head> and </head>, 
    // remove title, description, canonical, favicon, GTM, charset, viewport, author, etc.
    const headMatch = content.match(/<head>([\s\S]*?)<\/head>/i);
    if (headMatch) {
        let headHtml = headMatch[1];
        // Clean up headHtml
        headHtml = headHtml.replace(/<meta charset="[^"]*">\s*/i, '');
        headHtml = headHtml.replace(/<meta\s+name="viewport"[^>]*>\s*/i, '');
        headHtml = headHtml.replace(/<meta\s+name="theme-color"[^>]*>\s*/i, '');
        headHtml = headHtml.replace(/<title>.*?<\/title>\s*/i, '');
        headHtml = headHtml.replace(/<meta\s+name="description".*?>\s*/i, '');
        headHtml = headHtml.replace(/<meta\s+name="keywords".*?>\s*/i, '');
        headHtml = headHtml.replace(/<meta\s+name="author".*?>\s*/i, '');
        headHtml = headHtml.replace(/<meta\s+name="robots".*?>\s*/i, '');
        headHtml = headHtml.replace(/<meta\s+name="google-site-verification".*?>\s*/i, '');
        headHtml = headHtml.replace(/<link\s+rel="canonical".*?>\s*/i, '');
        headHtml = headHtml.replace(/<link\s+rel="icon".*?>\s*/i, '');
        headHtml = headHtml.replace(/<link\s+rel="shortcut icon".*?>\s*/i, '');
        headHtml = headHtml.replace(/<link\s+rel="apple-touch-icon".*?>\s*/i, '');
        headHtml = headHtml.replace(/<link\s+rel="manifest".*?>\s*/i, '');
        headHtml = headHtml.replace(/<link\s+rel="stylesheet".*?style\.css.*?>\s*/i, '');
        headHtml = headHtml.replace(/<link\s+href="https:\/\/cdnjs.cloudflare.com.*?>\s*/i, '');
        
        // Remove GTM scripts
        headHtml = headHtml.replace(/<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->\s*/i, '');
        headHtml = headHtml.replace(/<script>\s*\(function\(w,d,s,l,i\)[\s\S]*?<\/script>\s*/i, '');
        
        // Trim
        headHtml = headHtml.trim();
        if (headHtml) {
            headSlotContent = `\n    <slot name="head">\n        ${headHtml}\n    </slot>\n`;
        }
    }
    
    // Now extract body content
    const bodyMatch = content.match(/<body>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : '';
    
    // Remove <Navbar /> and <Footer /> and GTM noscript from body
    bodyContent = bodyContent.replace(/<Navbar \/>\s*/i, '');
    bodyContent = bodyContent.replace(/<Footer \/>\s*/i, '');
    bodyContent = bodyContent.replace(/<noscript>[\s\S]*?<\/noscript>\s*/i, '');
    
    // Determine path depth for BaseLayout import
    const depth = file.split('/').length - 1;
    const dots = '../'.repeat(depth + 1);
    
    // Modify Frontmatter
    let frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
    let newFrontmatter = '';
    if (frontmatterMatch) {
        newFrontmatter = frontmatterMatch[1];
        // Remove Navbar and Footer imports
        newFrontmatter = newFrontmatter.replace(/import Navbar from '[^']+';\s*/g, '');
        newFrontmatter = newFrontmatter.replace(/import Footer from '[^']+';\s*/g, '');
        
        // Add BaseLayout import if missing
        if (!newFrontmatter.includes('import BaseLayout')) {
            newFrontmatter = `import BaseLayout from '${dots}layouts/BaseLayout.astro';\n` + newFrontmatter;
        }
    }
    
    // Determine bodyClass based on file type
    let bodyClass = '';
    if (file.startsWith('artikel/')) bodyClass = 'article-page';
    else if (file.startsWith('jasa/')) bodyClass = 'services';
    else if (file.startsWith('alat/')) bodyClass = 'services';
    else if (file.startsWith('galeri/')) bodyClass = 'gallery-page';
    
    let baseLayoutProps = `title="${title}"`;
    if (description) baseLayoutProps += `\n    description="${description}"`;
    if (keywords) baseLayoutProps += `\n    keywords="${keywords}"`;
    if (bodyClass) baseLayoutProps += `\n    bodyClass="${bodyClass}"`;
    
    // Construct final file
    let newFile = `---
${newFrontmatter}
---

<BaseLayout ${baseLayoutProps}>${headSlotContent}
${bodyContent}
</BaseLayout>
`;

    fs.writeFileSync(filePath, newFile, 'utf8');
    console.log(`Refactored ${file}`);
}

