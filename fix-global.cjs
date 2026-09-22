const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.astro') || file.endsWith('.json')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src');

files.forEach(file => {
    let c = fs.readFileSync(file, 'utf8');

    // Rewrite gawangan specs
    c = c.replace(/Komponen gawangan dirancang portable, bisa dibawa melewati gang sempit sekalipun\./g, 'Gawangan menggunakan sistem knock-down, sangat ideal untuk lokasi yang terhalang atap atau kabel melintang.');
    c = c.replace(/Tidak perlu truk besar untuk mobilisasi, cukup dibawa dengan motor atau kendaraan kecil\./g, 'Mesin dan menara knock-down dibawa menggunakan truk, lalu diangkut manual ke titik bor yang terhalang atap.');
    
    // Fix FAQ in gawangan/index.astro
    c = c.replace(/Minimal 1 meter\. Komponen gawangan dirancang cukup ringkas untuk melewati akses jalan selebar 1 meter\. Ini jauh lebih sempit dari mini crane yang butuh jalan 2-3 meter\./g, 'Minimal 2 meter (lebar pintu). Karena Gawangan membawa mesin diesel yang ukurannya sama besarnya dengan Mini Crane.');
    
    c = c.replace(/Perbedaan utamanya pada mobilisasi\. Mini crane diangkut langsung dengan truk ke lokasi, sedangkan gawangan dibawa dalam bentuk komponen terurai dan dirakit di lokasi\. Gawangan bisa masuk gang sempit yang tidak bisa dilalui truk\./g, 'Bentuk menara/tiangnya. Mini crane menggunakan menara crane terpadu, sementara gawangan menggunakan tiang knock-down yang bisa dibongkar pasang. Cocok untuk area dengan halangan atap atau kabel, namun tetap membutuhkan lebar pintu masuk minimal 2 meter.');
    
    c = c.replace(/Solusi untuk gang sempit dan area tidak terakses mini crane/g, 'Solusi untuk area beratap dan akses vertikal tidak terakses mini crane');
    
    // Any remaining "gang sempit" associated with gawangan
    c = c.replace(/gawangan untuk area sempit/gi, 'gawangan untuk area beratap');
    c = c.replace(/gawangan untuk gang sempit/gi, 'gawangan untuk area beratap');
    c = c.replace(/gang sempit yang tidak bisa dilalui truk/gi, 'halangan atap yang tidak bisa dilalui mini crane');
    
    fs.writeFileSync(file, c);
});
console.log('Fixed gawangan globally');

