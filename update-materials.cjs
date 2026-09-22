const fs = require('fs');

// 1. Update harga.json
let harga = JSON.parse(fs.readFileSync('src/data/harga.json', 'utf8'));
if (harga.materialPackages) {
    harga.materialPackages.forEach(pkg => {
        pkg.includes = "Jasa bor, perakitan besi, dan pengecoran beton. Besi standar SNI + beton readymix K300 atau sesuai permintaan.";
    });
    fs.writeFileSync('src/data/harga.json', JSON.stringify(harga, null, 2));
    console.log('Updated harga.json');
}

// 2. Update harga-diameter/*.json
const folders = ['30cm', '40cm', '50cm', '60cm', '80cm'];
folders.forEach(folder => {
    const file = `src/data/harga-diameter/${folder}.json`;
    if (fs.existsSync(file)) {
        let data = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (data.materialPackage) {
            data.materialPackage.includes = "Jasa bor, perakitan besi, dan pengecoran beton. Besi standar SNI + beton readymix K300 atau sesuai permintaan.";
            fs.writeFileSync(file, JSON.stringify(data, null, 2));
            console.log(`Updated ${file}`);
        }
    }
});

