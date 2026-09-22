const fs = require('fs');
let c = fs.readFileSync('src/pages/alat/index.astro', 'utf8');

c = c.replace(/<img src="\/imgs\/borepile-pondasi-rumah\.jpg"/g, '<img src="/imgs/strauss-pile-asli-1.jpg"');
// and for the equipment card of strauss pile:
c = c.replace(/<img src="\/imgs\/icons\/strauss-pile-manual-agung-perkasa\.svg"/g, '<img src="/imgs/icons/strauss-pile-manual-agung-perkasa.svg"'); // actually this one is an SVG icon, it's fine.

fs.writeFileSync('src/pages/alat/index.astro', c);
console.log('Fixed alat/index.astro strauss image');

