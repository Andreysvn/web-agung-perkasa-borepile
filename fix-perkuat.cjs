const fs = require('fs');

const file = 'src/pages/artikel/perkuat-pondasi-tanah-lunak.astro';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/Bore pile gawangan diameter 50-80cm/g, 'Bore pile mesin diameter 40-60cm');
c = c.replace(/Bore pile gawangan diameter 60-100cm/g, 'Bore pile mesin diameter 60-80cm');
c = c.replace(/Bore pile gawangan diameter 80-120cm/g, 'Bore pile mesin diameter 80cm');
c = c.replace(/karena kedalaman yang lebih dalam dan penggunaan mesin gawangan/g, 'karena menyesuaikan tingkat kedalaman dari mesin bor (Mini Crane/Gawangan)');

fs.writeFileSync(file, c);
console.log('Fixed perkuat!');

