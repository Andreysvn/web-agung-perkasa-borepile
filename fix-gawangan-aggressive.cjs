const fs = require('fs');

const file = 'src/pages/alat/gawangan/index.astro';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/area sempit/gi, 'area beratap');
c = c.replace(/Area Sempit/gi, 'Area Beratap');
c = c.replace(/gang sempit/gi, 'atap terhalang');
c = c.replace(/Gang Sempit/gi, 'Atap Terhalang');
c = c.replace(/bisa masuk atap terhalang/gi, 'bisa dirakit di bawah atap');
c = c.replace(/lokasi sempit/gi, 'lokasi beratap');
c = c.replace(/lokasi yang menantang/gi, 'lokasi dengan halangan vertikal');
c = c.replace(/akses jalan terbatas/gi, 'langit-langit terbatas');
c = c.replace(/tanpa perlu akses truk besar/gi, 'tanpa harus membobol atap bangunan');
c = c.replace(/1-1,5 meter/gi, 'terbatas vertikal');
c = c.replace(/<strong>Minimal 1 meter.<\/strong> Komponen gawangan dirancang cukup ringkas untuk melewati akses jalan selebar 1 meter\. Ini jauh lebih atap terhalang dari mini crane yang butuh jalan 2-3 meter\./gi, '<strong>Minimal 2 meter (lebar pintu).</strong> Karena Gawangan membawa mesin diesel yang ukurannya sama besarnya dengan Mini Crane, hanya beda tiang menaranya saja.');

fs.writeFileSync(file, c);
console.log('Fixed gawangan page thoroughly!');
