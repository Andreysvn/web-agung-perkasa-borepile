const fs = require('fs');

const content = fs.readFileSync('src/pages/harga/bore-pile-2026.astro', 'utf8');

// We will use regex to extract the sections

// 1. Table Section
// Looks for `<div class="table-responsive">` to `</div></div>`
const tableRegex = /(<div class="table-responsive">[\s\S]*?<\/table>\s*<\/div>)/;
const tableMatch = content.match(tableRegex);
if(tableMatch) {
    fs.mkdirSync('src/components/harga', { recursive: true });
    fs.writeFileSync('src/components/harga/HargaTable.astro', `---\n// src/components/harga/HargaTable.astro\n---\n${tableMatch[1]}`, 'utf8');
}

// 2. Calculator Section
// Looks for `<section aria-labelledby="calculator-heading">` to `</section>`
const calcRegex = /(<section aria-labelledby="calculator-heading">[\s\S]*?<\/section>)/;
const calcMatch = content.match(calcRegex);
if(calcMatch) {
    fs.writeFileSync('src/components/harga/HargaCalculator.astro', `---\n// src/components/harga/HargaCalculator.astro\n---\n${calcMatch[1]}`, 'utf8');
}

// 3. FAQ Section
// Looks for `<section class="faq-section" aria-labelledby="faq-heading">` to `</section>`
const faqRegex = /(<section class="faq-section" aria-labelledby="faq-heading">[\s\S]*?<\/section>)/;
const faqMatch = content.match(faqRegex);
if(faqMatch) {
    fs.writeFileSync('src/components/harga/HargaFaq.astro', `---\n// src/components/harga/HargaFaq.astro\nimport FaIcon from '../icons/FaIcon.astro';\n---\n${faqMatch[1]}`, 'utf8');
}

// Replace content in main file
let newContent = content;
if(tableMatch) newContent = newContent.replace(tableMatch[1], '<HargaTable />');
if(calcMatch) newContent = newContent.replace(calcMatch[1], '<HargaCalculator />');
if(faqMatch) newContent = newContent.replace(faqMatch[1], '<HargaFaq />');

// Add imports
const imports = `import HargaTable from '../../components/harga/HargaTable.astro';\nimport HargaCalculator from '../../components/harga/HargaCalculator.astro';\nimport HargaFaq from '../../components/harga/HargaFaq.astro';\n`;
newContent = newContent.replace('import BaseLayout', imports + 'import BaseLayout');

fs.writeFileSync('src/pages/harga/bore-pile-2026.astro', newContent, 'utf8');
console.log('Componentization successful!');
