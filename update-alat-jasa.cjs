const fs = require('fs');
const path = require('path');

const dirsToScan = [
    path.join(__dirname, 'src', 'pages', 'alat'),
    path.join(__dirname, 'src', 'pages', 'alat', 'gawangan'),
    path.join(__dirname, 'src', 'pages', 'alat', 'mini-crane'),
    path.join(__dirname, 'src', 'pages', 'alat', 'strauss-pile'),
    path.join(__dirname, 'src', 'pages', 'jasa', 'bore-pile'),
    path.join(__dirname, 'src', 'pages', 'jasa')
];

const importScript = `
import pricing from '../../data/harga.json';
const manualPrice = pricing.manual.find(i => i.price > 0)?.price || 75000;
const mesinPrice = pricing.mesin.find(i => i.price > 0)?.price || 120000;
`;

dirsToScan.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if it doesn't have hardcoded prices
        if (!content.match(/Rp\s?70\.000/) && !content.match(/Rp\s?75\.000/)) return;
        
        // Ensure imports
        if (!content.includes('import pricing from')) {
            // Adjust import path depth based on how deep the file is
            const depth = filePath.split(path.sep).length - __dirname.split(path.sep).length - 2;
            let importStr = `import pricing from '${'../'.repeat(depth)}data/harga.json';\n`;
            importStr += `const manualPrice = pricing.manual.find(i => i.price > 0)?.price || 75000;\n`;
            importStr += `const mesinPrice = pricing.mesin.find(i => i.price > 0)?.price || 120000;\n`;
            
            content = content.replace('---', '---\n' + importStr);
        }
        
        content = content.replace(/Rp\s?70\.000/g, "Rp{manualPrice.toLocaleString('id-ID')}");
        content = content.replace(/Rp\s?75\.000/g, "Rp{manualPrice.toLocaleString('id-ID')}");
        content = content.replace(/120\.000/g, "{mesinPrice.toLocaleString('id-ID')}");
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated missing prices in ${filePath}`);
    });
});

