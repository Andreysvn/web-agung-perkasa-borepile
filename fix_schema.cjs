const fs = require('fs');
const glob = require('glob'); // we don't have glob, just array
const path = require('path');

const diameters = ['30cm', '40cm', '50cm', '60cm', '80cm'];

for (const d of diameters) {
    const file = `src/pages/harga/bore-pile/${d}/index.astro`;
    let out = fs.readFileSync(file, 'utf8');
    
    // We need to change:
    // faqSchema={pageData.faq}
    // to:
    // faqSchema={pageData.faq.map(item => ({ q: item.q.replace(/<[^>]*>?/gm, ''), a: item.a.replace(/<[^>]*>?/gm, '').replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), manualPrice || '') }))}
    
    out = out.replace(
        /faqSchema=\{pageData\.faq\}/, 
        `faqSchema={pageData.faq.map(item => ({ q: item.q.replace(/<[^>]*>?/gm, ''), a: item.a.replace(/<[^>]*>?/gm, '').replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), manualPrice || '') }))}`
    );
    
    fs.writeFileSync(file, out);
    console.log(`Updated schema in ${d}`);
}

