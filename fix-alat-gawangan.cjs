const fs = require('fs');
let c = fs.readFileSync('src/pages/alat/index.astro', 'utf8');

c = c.replace('<p class="equip-sub">Area Sempit</p>', '<p class="equip-sub">Atap Terbatas</p>');
c = c.replace('<p>Cocok untuk area yang tidak bisa diakses mini crane. Diameter 30-80cm untuk proyek di gang sempit.</p>', '<p>Cocok untuk proyek renovasi di dalam ruangan (indoor) atau yang terhalang atap. Diameter 30-80cm.</p>');

fs.writeFileSync('src/pages/alat/index.astro', c);
console.log('Fixed alat/index.astro');

