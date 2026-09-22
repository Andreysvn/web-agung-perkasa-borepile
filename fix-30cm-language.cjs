const fs = require('fs');

const file = 'src/data/harga-diameter/30cm.json';
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

data.heroText = "<strong>Bore pile diameter 30cm</strong> adalah ukuran pondasi yang paling sering dipesan untuk proyek <strong>rumah tinggal 1 hingga 3 lantai</strong> dan juga ruko standar. \n\nKenapa ukuran ini paling laris? Karena dengan kemampuan menahan beban 15 sampai 25 ton per titik, 30cm memberikan kekuatan yang sangat aman untuk bangunan bertingkat, tapi harganya tetap paling hemat di kantong. Selain itu, proses pengeborannya sangat halus sehingga Anda tidak perlu khawatir didemo tetangga karena tembok mereka retak akibat getaran.";

data.faq.forEach(f => {
    if (f.q.includes('rumah 2 lantai')) {
        f.a = "<strong>Sangat kuat.</strong> Asalkan pengeboran dilakukan sampai benar-benar menyentuh tanah keras, satu titik bore pile 30cm bisa menahan beban 15 sampai 25 ton. Ukuran ini sudah menjadi standar aman yang dipakai banyak kontraktor untuk perumahan 2-3 lantai.";
    }
    if (f.q.includes('standar harga jasa')) {
        f.a = "Untuk wilayah Jabodetabek, standar harga jasa bor diameter 30cm adalah <strong>Rp120.000 per meter jika menggunakan mesin</strong>, dan <strong>Rp100.000 per meter jika menggunakan alat manual (Strauss Pile)</strong>. Harga ini khusus untuk jasa kerja bor, perakitan besi, dan pengecoran (belum termasuk pembelian besi dan beton).";
    }
    if (f.q.includes('titik ideal')) {
        f.a = "Untuk rumah 2 lantai standar dengan luas tanah 100-200m², biasanya membutuhkan sekitar <strong>12 sampai 20 titik</strong> pondasi. Tapi untuk jumlah pastinya, kami selalu mengikuti jarak titik kolom yang ada di gambar denah bangunan Anda.";
    }
    if (f.q.includes('kedalaman maksimal')) {
        f.a = "Kalau menggunakan mesin (Mini Crane), kami bisa mengebor sedalam <strong>25 sampai 30 meter</strong>. Tapi kalau menggunakan tenaga manual (Strauss Pile), maksimalnya hanya tembus <strong>6 sampai 10 meter</strong> saja. Kedalaman pastinya selalu menyesuaikan seberapa dalam lapisan tanah keras di lokasi Anda.";
    }
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Rewrote 30cm to be natural Indonesian');

