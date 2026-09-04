const fs = require('fs');

const content = fs.readFileSync('scratch/original_2026.astro', 'utf8');
const faqMatch = content.match(/<!-- ===== FAQ ===== -->[\s\S]*?(?=<Footer|<\/main>)/);

if(faqMatch) {
    const componentCode = `---\nimport FaIcon from '../icons/FaIcon.astro';\n---\n${faqMatch[0]}`;
    fs.writeFileSync('src/components/harga/HargaFaq.astro', componentCode, 'utf8');
    console.log("FAQ extracted!");
} else {
    console.log("FAQ not found!");
}

