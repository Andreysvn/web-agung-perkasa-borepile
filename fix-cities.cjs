const fs = require('fs');
const path = require('path');

const dir = 'src/data/kota/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let c = fs.readFileSync(filePath, 'utf8');

    // Replace misleading Gawangan descriptions
    c = c.replace(/mesin gawangan portable atau metode strauss pile manual/g, 'metode strauss pile manual (untuk area sangat sempit) atau mesin gawangan (untuk area beratap rendah)');
    c = c.replace(/gawangan modular untuk lahan terbatas dengan akses sempit/g, 'gawangan knock-down untuk lahan terbatas dengan atap rendah');
    c = c.replace(/mesin gawangan dan opsi strauss pile manual/g, 'mesin gawangan (untuk atap rendah) dan opsi strauss pile manual (untuk gang sempit)');
    c = c.replace(/bor gawangan fleksibel untuk lorong sempit/g, 'bor gawangan fleksibel untuk atap rendah');
    c = c.replace(/mesin gawangan yang dapat dibongkar pasang sehingga bisa dibawa melalui lorong sempit/g, 'mesin gawangan yang menaranya dapat dibongkar pasang sehingga bisa dikerjakan di bawah atap rendah');
    c = c.replace(/bor gawangan untuk lorong sempit/g, 'bor gawangan untuk atap rendah');
    c = c.replace(/mesin gawangan kompak atau strauss pile manual/g, 'mesin gawangan (untuk atap rendah) atau strauss pile manual (untuk gang sempit)');
    c = c.replace(/mesin mini gawangan/g, 'mesin gawangan (untuk area beratap)');
    c = c.replace(/unit gawangan atau strauss pile manual menjadi solusi yang paling fleksibel/g, 'unit gawangan (untuk area beratap) atau strauss pile manual (untuk gang sempit) menjadi solusi yang paling fleksibel');
    c = c.replace(/gawangan mesin/g, 'mesin gawangan');
    c = c.replace(/gang sempit/g, 'gang sempit (strauss pile)');

    fs.writeFileSync(filePath, c);
});
console.log('Fixed gawangan in city JSONs');

