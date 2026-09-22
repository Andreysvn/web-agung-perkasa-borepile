const fs = require('fs');

const file = 'src/data/harga-diameter/40cm.json';
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

if (data.portfolio && data.portfolio.items) {
    data.portfolio.items.forEach(item => {
        // Just replace the whole string to be safe
        if (item.label.includes('Universitas Paramadina')) {
            item.detail = "Bore pile mini crane Ø40cm untuk gedung universitas";
        }
        if (item.label.includes('AZ Zikra')) {
            item.detail = "Bore pile mini crane Ø40cm untuk bangunan asrama pesantren di area masjid AZ Zikra";
        }
        if (item.label.includes('Puri Indah')) {
            item.detail = "Bore pile mini crane Ø40cm untuk bangunan di depan Mall Puri Indah";
        }
    });
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Fixed 40cm portfolio mojibake');

