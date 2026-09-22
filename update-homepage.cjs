const fs = require('fs');
const path = require('path');

const indexAstroPath = path.join(__dirname, 'src', 'pages', 'index.astro');
let content = fs.readFileSync(indexAstroPath, 'utf8');

// Replace table row
content = content.replace(
    /<tr><td>Biaya<\/td><td>Rp 120\.000 - 360\.000\/m<\/td><td>Rp 75\.000 - 120\.000\/m<\/td><\/tr>/,
    "<tr><td>Biaya</td><td>Mulai Rp {mesinPrice.toLocaleString('id-ID')}/m</td><td>Mulai Rp {manualPrice.toLocaleString('id-ID')}/m</td></tr>"
);

// Replace pricing box
content = content.replace(
    /Harga mulai dari Rp120\.000\/m \(mesin\) & Rp75\.000\/m \(manual atau strauss pile\)\./,
    "Harga mulai dari Rp{mesinPrice.toLocaleString('id-ID')}/m (mesin) & Rp{manualPrice.toLocaleString('id-ID')}/m (manual atau strauss pile)."
);

// Replace FAQ answer
content = content.replace(
    /Borepile mesin mulai Rp120\.000\/m, Borepile manual mulai Rp75\.000\/m\./,
    "Borepile mesin mulai Rp{mesinPrice.toLocaleString('id-ID')}/m, Borepile manual mulai Rp{manualPrice.toLocaleString('id-ID')}/m."
);

// Fix FAQ schema hardcoded text
content = content.replace(
    /Borepile mesin mulai Rp120\.000\\\/m, Borepile manual mulai Rp75\.000\\\/m\./g,
    `Borepile mesin mulai Rp\${mesinPrice.toLocaleString('id-ID')}/m, Borepile manual mulai Rp\${manualPrice.toLocaleString('id-ID')}/m.`
);

content = content.replace(
    /mulai Rp75\.000\\\/m/g,
    `mulai Rp\${manualPrice.toLocaleString('id-ID')}/m`
);

content = content.replace(
    /kedalaman hingga 10m/g,
    `kedalaman hingga \${maxManualDepth}m`
);

fs.writeFileSync(indexAstroPath, content);
console.log('Homepage prices and depths updated!');

