const fs = require('fs');

// 1. Gawangan
let g = fs.readFileSync('src/pages/alat/gawangan/index.astro', 'utf8');
g = g.replace(
    '<strong>Catatan Penting:</strong> Jika volume total pengeboran proyek Anda <strong>kurang dari 200 meter</strong>, jangan khawatir! Silakan langsung hubungi admin kami untuk mendapatkan penawaran <strong>harga borongan (lump sum)</strong> yang disesuaikan dengan kondisi proyek Anda.',
    '<strong>Catatan:</strong> Untuk volume pengerjaan di bawah batas minimal (kurang dari 200 meter), silakan hubungi admin kami untuk mendapatkan penawaran harga borongan (lump sum).'
);
fs.writeFileSync('src/pages/alat/gawangan/index.astro', g);

// 2. Mini Crane
let mc = fs.readFileSync('src/pages/alat/mini-crane/index.astro', 'utf8');
mc = mc.replace(
    'Harga ini berlaku untuk <strong>minimal volume 200 meter</strong>. Jika volume proyek Anda kurang dari itu, silakan hubungi admin kami untuk mendapatkan penawaran <strong>harga borongan (lump sum)</strong>. Untuk konsultasi gratis, hubungi WhatsApp kami.',
    'Harga di atas berlaku dengan <strong>syarat minimal volume 200 meter</strong>. Apabila total volume pengerjaan kurang dari 200 meter, silakan hubungi admin kami untuk mendapatkan penawaran harga borongan (lump sum).'
);
mc = mc.replace(
    'Harga berkisar Rp{mesinPrice.toLocaleString(\'id-ID\')} - Rp400.000 per meter untuk minimal volume 200 meter. Jika volume kurang dari itu, hubungi admin untuk penawaran harga borongan (lump sum).',
    'Harga berkisar Rp{mesinPrice.toLocaleString(\'id-ID\')} - Rp400.000 per meter (minimal volume 200 meter). Untuk volume di bawah 200 meter, silakan hubungi admin kami untuk penawaran harga borongan (lump sum).'
);
fs.writeFileSync('src/pages/alat/mini-crane/index.astro', mc);

// 3. Strauss Pile
let sp = fs.readFileSync('src/pages/alat/strauss-pile/index.astro', 'utf8');
sp = sp.replace(
    '(Min. order 100m. Kurang dari itu? Hubungi admin untuk harga borongan/lump sum)',
    '(Minimal order 100 meter. Untuk volume di bawah 100 meter, silakan hubungi admin untuk penawaran harga borongan)'
);
fs.writeFileSync('src/pages/alat/strauss-pile/index.astro', sp);

console.log('Fixed weird language');

