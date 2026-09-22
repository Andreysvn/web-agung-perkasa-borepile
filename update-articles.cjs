const fs = require('fs');
const path = require('path');

// 1. Fix jasa/index.astro
const jasaPath = path.join(__dirname, 'src', 'pages', 'jasa', 'index.astro');
let jasaContent = fs.readFileSync(jasaPath, 'utf8');
jasaContent = jasaContent.replace(
    '<BaseLayout title="Layanan Agung Perkasa | Jasa Bore Pile & Strauss Pile"\n    bodyClass="services">',
    '<BaseLayout \n    title="Layanan Jasa Pemborong Bore Pile & Strauss Pile Terdekat"\n    description="Layanan jasa pemborong bore pile (mesin) & strauss pile (manual) terdekat untuk proyek pondasi rumah dan ruko di Jabodetabek & Jawa. Harga mulai kompetitif."\n    bodyClass="services">'
);
// In case the spacing is different:
jasaContent = jasaContent.replace(
    /<BaseLayout title="Layanan Agung Perkasa \| Jasa Bore Pile & Strauss Pile"[\s\S]*?bodyClass="services">/,
    '<BaseLayout \n    title="Layanan Jasa Pemborong Bore Pile & Strauss Pile Terdekat"\n    description="Layanan jasa pemborong bore pile (mesin) & strauss pile (manual) terdekat untuk proyek pondasi rumah dan ruko di Jabodetabek & Jawa. Harga mulai kompetitif."\n    bodyClass="services">'
);
fs.writeFileSync(jasaPath, jasaContent);

// 2. Fix Articles
const artikelDir = path.join(__dirname, 'src', 'pages', 'artikel');
const files = fs.readdirSync(artikelDir).filter(f => f.endsWith('.astro') && f !== 'index.astro');

const importScript = `
import pricing from '../../data/harga.json';
const manualPrice = pricing.manual.find(i => i.price > 0)?.price || 75000;
const mesinPrice = pricing.mesin.find(i => i.price > 0)?.price || 120000;
const maxManualDepth = pricing.manual.find(i => i.price > 0)?.maxDepth || 6;
`;

files.forEach(file => {
    const filePath = path.join(artikelDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Inject import if not already there
    if (!content.includes('import pricing from')) {
        content = content.replace('---', '---\n' + importScript.trim() + '\n');
    }
    
    // Check if it's missing description prop
    if (!content.match(/description=["'{]/)) {
        // Extract a fake description from the first paragraph or title
        let titleMatch = content.match(/title="([^"]+)"/);
        let title = titleMatch ? titleMatch[1] : 'Artikel Bore Pile';
        let desc = `Pelajari lebih lanjut tentang ${title.toLowerCase()} untuk proyek pondasi rumah dan ruko Anda. Baca selengkapnya di blog Agung Perkasa Borepile.`;
        content = content.replace(/<BaseLayout title="([^"]+)"/, `<BaseLayout title="$1" description="${desc}"`);
    }

    // Replace hardcoded prices
    content = content.replace(/Rp\s?70\.000/g, "Rp{manualPrice.toLocaleString('id-ID')}");
    content = content.replace(/Rp\s?75\.000/g, "Rp{manualPrice.toLocaleString('id-ID')}");
    content = content.replace(/120\.000/g, "{mesinPrice.toLocaleString('id-ID')}");
    content = content.replace(/350\.000/g, "360.000"); // Just in case
    
    // Replace depths
    content = content.replace(/kedalaman hingga 8\s?m(eter)?/gi, "kedalaman hingga {maxManualDepth} meter");
    content = content.replace(/kedalaman 8\s?m(eter)?/gi, "kedalaman {maxManualDepth} meter");

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});

// 3. Fix Galleries
const galeriDir = path.join(__dirname, 'src', 'pages', 'galeri');
const galeriFiles = fs.readdirSync(galeriDir).filter(f => f.endsWith('.astro'));

galeriFiles.forEach(file => {
    const filePath = path.join(galeriDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Inject import if not already there
    if (!content.includes('import pricing from')) {
        content = content.replace('---', '---\n' + importScript.trim() + '\n');
    }
    
    // Replace hardcoded prices
    content = content.replace(/Rp\s?70\.000/g, "Rp{manualPrice.toLocaleString('id-ID')}");
    content = content.replace(/Rp\s?75\.000/g, "Rp{manualPrice.toLocaleString('id-ID')}");
    content = content.replace(/120\.000/g, "{mesinPrice.toLocaleString('id-ID')}");

    fs.writeFileSync(filePath, content);
    console.log(`Updated gallery ${file}`);
});

console.log('All articles and galleries updated!');

