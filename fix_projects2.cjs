const fs = require('fs');

const files = [
    'src/pages/harga/bore-pile/30cm/index.astro',
    'src/pages/harga/bore-pile/40cm/index.astro',
    'src/pages/harga/bore-pile/50cm/index.astro',
    'src/pages/harga/bore-pile/60cm/index.astro',
    'src/pages/harga/bore-pile/80cm/index.astro'
];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let c = fs.readFileSync(file, 'utf8');

    // Make sure we replace manualPrice with a safe check if it doesn't exist
    c = c.replace(/manualPrice\)/g, "(typeof manualPrice !== 'undefined' ? manualPrice : '')\)");

    // Wait, let's just do a clean replace on `{mn' + pageData.diameterNum + '}', 'g'), manualPrice)`
    c = c.replace(/, manualPrice\)/g, ", (typeof manualPrice !== 'undefined' ? manualPrice : ''))");
    
    // Also, we need to make sure the replacement didn't mess up anything else. 
    // And wait, what about the FAQ? 
    // `faqRegex` replaced manualPrice there too. It'll be caught by the same replace!

    fs.writeFileSync(file, c);
}
