const fs = require('fs');

const files = [
    '30cm.json', '40cm.json', '50cm.json', '60cm.json', '80cm.json'
];

files.forEach(file => {
    const path = `src/data/harga-diameter/${file}`;
    if (!fs.existsSync(path)) return;
    
    let c = fs.readFileSync(path, 'utf8');
    
    // The exact corrupted string patterns found in the file
    c = c.replace(/A'A<"/g, 'Ø');
    c = c.replace(/A'A,\?\?/g, 'x'); 
    c = c.replace(/AAA\.A,A\.AA,A/g, '🚚');
    c = c.replace(/AAA\.A,A,"A\.\?T/g, '📝');
    c = c.replace(/m/g, 'm²');
    
    fs.writeFileSync(path, c);
    console.log(`Fixed ${file}`);
});

