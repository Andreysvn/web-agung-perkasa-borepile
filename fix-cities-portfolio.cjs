const fs = require('fs');
const path = require('path');

const realPortfolioItems = [
    {
      "image": "/imgs/borepile-gedung-universitas-paramadina-jaktim.webp",
      "imageAlt": "Proyek bore pile gedung Universitas Paramadina",
      "label": "Gedung Universitas (Contoh Proyek)",
      "detail": "Bore pile mini crane Ø40cm untuk gedung kampus"
    },
    {
      "image": "/imgs/borepile-di-depan-mall-puri-indah-agung-perkasa.jpg",
      "imageAlt": "Proyek pondasi bangunan komersial depan Mall Puri Indah",
      "label": "Bangunan Komersial (Contoh Proyek)",
      "detail": "Bore pile mini crane Ø40cm kedalaman 9m untuk area komersial"
    },
    {
      "image": "/imgs/bore-pile-rumah-green-mansion-jakarta-barat-agung-perkasa.jpeg",
      "imageAlt": "Pengeboran bore pile untuk perumahan Green Mansion",
      "label": "Perumahan Padat (Contoh Proyek)",
      "detail": "Bore pile mini crane Ø30cm dengan metode wash boring (bor basah)"
    }
];

const cities = ['surabaya.json', 'semarang.json', 'bandung.json', 'karawang.json'];

cities.forEach(cityFile => {
    const p = path.join('src/data/kota', cityFile);
    if (!fs.existsSync(p)) return;
    
    let data = JSON.parse(fs.readFileSync(p, 'utf8'));
    const cityName = data.name; // e.g. "Surabaya"
    
    data.portfolio.title = "Pengalaman & Referensi Proyek Agung Perkasa";
    data.portfolio.subtitle = `Berikut adalah beberapa contoh dokumentasi proyek nyata yang telah kami kerjakan. Meskipun basecamp utama kami berada di Jabodetabek, armada dan tim teknis kami siap dimobilisasi secara penuh untuk mengerjakan proyek pondasi bore pile di wilayah ${cityName} dan sekitarnya.`;
    data.portfolio.items = realPortfolioItems;
    
    fs.writeFileSync(p, JSON.stringify(data, null, 2));
    console.log(`Updated portfolio for ${cityName}`);
});

