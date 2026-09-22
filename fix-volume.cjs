const fs = require('fs');

// 1. Gawangan (Already did it, but let's double check it has it. I'll just leave it if it does)

// 2. Mini Crane
let mc = fs.readFileSync('src/pages/alat/mini-crane/index.astro', 'utf8');
mc = mc.replace(
    'Untuk penawaran akurat, silakan konsultasi gratis melalui WhatsApp kami.</p>',
    'Harga ini berlaku untuk <strong>minimal volume 200 meter</strong>. Jika volume proyek Anda kurang dari itu, silakan hubungi admin kami untuk mendapatkan penawaran <strong>harga borongan (lump sum)</strong>. Untuk konsultasi gratis, hubungi WhatsApp kami.</p>'
);
mc = mc.replace(
    '"text": "Harga bervariasi tergantung diameter dan kedalaman. Secara umum berkisar Rp{mesinPrice.toLocaleString(\'id-ID\')} - Rp400.000 per meter (belum termasuk material beton dan tulangan)."',
    '"text": "Harga berkisar Rp{mesinPrice.toLocaleString(\'id-ID\')} - Rp400.000 per meter untuk minimal volume 200 meter. Jika volume kurang dari itu, hubungi admin untuk penawaran harga borongan (lump sum)."'
);
fs.writeFileSync('src/pages/alat/mini-crane/index.astro', mc);

// 3. Strauss Pile
let sp = fs.readFileSync('src/pages/alat/strauss-pile/index.astro', 'utf8');
sp = sp.replace(
    "Mulai dari Rp{manualPrice.toLocaleString('id-ID')}/m",
    "Mulai dari Rp{manualPrice.toLocaleString('id-ID')}/m (Min. order 100m. Kurang dari itu? Hubungi admin untuk harga borongan/lump sum)"
);
fs.writeFileSync('src/pages/alat/strauss-pile/index.astro', sp);

console.log('Fixed volumes');

