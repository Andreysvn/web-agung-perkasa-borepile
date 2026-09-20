const fs = require('fs');
const pd = JSON.parse(fs.readFileSync('src/data/harga-2026.json', 'utf8'));
pd.projects.items.splice(1, 0, {
    img: '/imgs/borepile-meruya-jakarta.webp', 
    alt: 'Pengeboran bore pile mini crane diameter 40cm untuk ruko di Meruya, Jakarta Barat', 
    caption: 'Bore Pile mini crane di Meruya, Jakarta Barat', 
    title: 'Ruko di Meruya, Jakarta Barat', 
    specs: 'Bore pile mesin mini crane diameter 40cm, kedalaman 12m, 20 titik', 
    costCalc: '12m x Rp135.000 x 20 = <strong class="price-total">Rp32.400.000</strong>', 
    mobilization: 'Rp3.000.000', 
    total: '<strong class="price-total">Rp35.400.000</strong>', 
    time: '5-7 hari kerja'
});
fs.writeFileSync('src/data/harga-2026.json', JSON.stringify(pd, null, 2));
