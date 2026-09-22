const fs = require('fs');
const file = 'src/pages/alat/strauss-pile/index.astro';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(
    /<figure>[\s\S]*?<\/figure>/,
    `<figure>
                    <img class="blog-image" src="/imgs/strauss-pile-asli-1.jpg" alt="Proyek strauss pile manual di gang sempit dan samping tembok" loading="lazy" decoding="async">
                    <figcaption class="blog-image-caption">Dua pekerja sedang memutar stang bor strauss pile di area yang sangat sempit dan mepet tembok.</figcaption>
                </figure>`
);

c = c.replace(
    /<figure>[\s\S]*?<\/figure>/, // Second figure
    `<figure>
                    <img class="blog-image" src="/imgs/strauss-pile-asli-2.jpg" alt="Pekerjaan strauss pile manual di halaman rumah untuk pondasi tambahan" loading="lazy" decoding="async">
                    <figcaption class="blog-image-caption">Proses pengeboran manual (Strauss Pile) sangat ramah lingkungan, tidak merusak taman, dan minim kotoran.</figcaption>
                </figure>`
);

c = c.replace(/Hingga 10 meter/g, 'Hingga 6 meter (tergantung kekerasan tanah)');
c = c.replace(/10-30 ton per titik/g, 'Mampu menopang rumah 1-2 lantai atau ruko sederhana');
c = c.replace(/Maksimal 40 cm, tidak bisa untuk pondasi diameter besar/g, 'Maksimal 40 cm (sangat berat jika manual), idealnya 20-30 cm untuk rumah tinggal');
c = c.replace(/Hanya 10-30 ton per titik, tidak cocok untuk bangunan bertingkat tinggi/g, 'Hanya untuk rumah 1-2 lantai, tidak cocok untuk ruko 3 lantai ke atas atau gedung bertingkat');
c = c.replace(/10-30 ton/g, 'Rumah 1-2 lantai');
c = c.replace(/Rp\{manualPrice\.toLocaleString\('id-ID'\)\} - Rp100\.000\/m/g, "Mulai dari Rp{manualPrice.toLocaleString('id-ID')}/m");

fs.writeFileSync(file, c);
console.log('Fixed Strauss pile content and photos');

