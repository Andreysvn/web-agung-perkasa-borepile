const fs = require('fs');
let c = fs.readFileSync('src/pages/alat/gawangan/index.astro', 'utf8');

c = c.replace(/<figure>[\s\S]*?<\/figure>/, `<figure>
                    <img class="blog-image" src="/imgs/icons/bore-pile-mesin-gawangan-icon-agung-perkasa.svg" alt="Mesin bore pile gawangan di area atap rendah" loading="lazy" decoding="async">
                    <figcaption class="blog-image-caption">Mesin gawangan: Dirakit khusus untuk lokasi yang terhalang atap, kanopi, atau kabel melintang.</figcaption>
                </figure>`);

c = c.replace(/"image": "https:\/\/agungperkasaborepile\.com\/imgs\/gawangan-diagram\.svg",/g, '"image": "https://agungperkasaborepile.com/imgs/icons/bore-pile-mesin-gawangan-icon-agung-perkasa.svg",');

fs.writeFileSync('src/pages/alat/gawangan/index.astro', c);
console.log('Fixed gawangan astro');

