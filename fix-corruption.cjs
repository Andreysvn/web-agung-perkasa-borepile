const fs = require('fs');

const files = [
    '30cm.json', '40cm.json', '50cm.json', '60cm.json', '80cm.json'
];

files.forEach(file => {
    const path = `src/data/harga-diameter/${file}`;
    if (!fs.existsSync(path)) return;
    
    let c = fs.readFileSync(path, 'utf8');
    
    // Replace the specific corrupted UTF-8 sequences
    c = c.replace(/A'A<"/g, 'Ø');
    c = c.replace(/A'A,\?\?/g, '×');
    c = c.replace(/AAA\.A,A\.AA,A/g, '🚚');
    c = c.replace(/AAA\.A,A,"A\.\?T/g, '📝');
    c = c.replace(/mA/g, 'm²');
    
    fs.writeFileSync(path, c);
    console.log(`Cleaned ${file}`);
});
