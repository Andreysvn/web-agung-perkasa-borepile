const fs = require('fs');

let content = fs.readFileSync('scratch/original_2026.astro', 'utf8');

// 1. Frontmatter
const fmMatch = content.match(/---\s*([\s\S]*?)\s*---/);
let fmCode = fmMatch[1];
fmCode = fmCode.replace(/import Navbar from '\.\.\/\.\.\/components\/global\/Navbar\.astro';/g, '');
fmCode = fmCode.replace(/import Footer from '\.\.\/\.\.\/components\/global\/Footer\.astro';/g, '');
fmCode = fmCode.replace(/import FaIcon from '\.\.\/\.\.\/components\/icons\/FaIcon\.astro';/g, "import FaIcon from '../../components/icons/FaIcon.astro';\nimport BaseLayout from '../../layouts/BaseLayout.astro';");

// 2. Title and desc
const titleMatch = content.match(/<title>(.*?)<\/title>/);
const title = titleMatch ? titleMatch[1] : '';

const descMatch = content.match(/<meta name="description" content="(.*?)">/);
const description = descMatch ? descMatch[1] : '';

// 3. Body
const bodyMatch = content.match(/<main id="main-content">([\s\S]*?)<Footer \/>/);
let bodyHtml = bodyMatch[1].replace(/<\/main>/g, '');

// 4. Schema
const schemasMatch = content.match(/<!-- ===== SCHEMA MARKUP ===== -->([\s\S]*?)<\/body>/);
const schemasHtml = schemasMatch ? schemasMatch[1] : '';

const newContent = `---
${fmCode.trim()}
---
<BaseLayout 
    title="${title}"
    description="${description}"
    disableGlobalCss={true}
    disableGlobalJs={true}
>
    <link rel="stylesheet" href="/css/modern-harga.css" slot="head">

${bodyHtml}

    <!-- ===== SCHEMA MARKUP ===== -->
${schemasHtml}
</BaseLayout>
`;

fs.writeFileSync('src/pages/harga/bore-pile-2026.astro', newContent, 'utf8');
console.log('Refactored correctly!');
