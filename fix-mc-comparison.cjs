const fs = require('fs');
let c = fs.readFileSync('src/pages/alat/mini-crane/index.astro', 'utf8');

c = c.replace(
    '<li><strong>Ground Clearance:</strong> Tidak bisa masuk ke area dengan ketinggian langit-langit rendah atau akses tertutup.</li>',
    '<li><strong>Area Bermanuver Kaku:</strong> Karena sasis yang panjang dan kaku, mini crane sulit dikemudikan untuk berbelok patah di lahan sempit atau diposisikan pada lahan yang sangat miring.</li>'
);

// Comparison table in mini-crane
c = c.replace(
    '<td><strong>Gawangan</strong></td>',
    '<td><strong>Gawangan (Knock-down)</strong></td>'
);

fs.writeFileSync('src/pages/alat/mini-crane/index.astro', c);
console.log('Fixed mini crane comparison text');

