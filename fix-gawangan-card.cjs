const fs = require('fs');
let c = fs.readFileSync('src/pages/alat/index.astro', 'utf8');

c = c.replace('<p class="equip-sub">Atap Terbatas</p>', '<p class="equip-sub">Medan Bermanuver Sulit</p>');
c = c.replace('<p>Cocok untuk proyek renovasi di dalam ruangan (indoor) atau yang terhalang atap. Diameter 30-80cm.</p>', '<p>Cocok untuk area padat penduduk, lahan miring/berlumpur, dan titik sudut di mana mini crane sulit bermanuver.</p>');

fs.writeFileSync('src/pages/alat/index.astro', c);
console.log('Fixed gawangan card on alat index');

