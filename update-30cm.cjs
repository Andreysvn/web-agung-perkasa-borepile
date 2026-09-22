const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'harga-diameter', '30cm.json');
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Update specific fields
data.title = "Harga Bore Pile 30cm Terbaru 2026 Per Meter | Agung Perkasa";
data.h1 = "Harga Bore Pile Diameter 30cm (Sweet Spot Rumah 2 Lantai)";
data.heroAlt = "Proses pengeboran bore pile 30cm dengan mini crane untuk pondasi rumah 2 lantai di gang sempit";
data.heroCaption = "Pengeboran bore pile 30cm untuk rumah tinggal di area padat penduduk";
data.heroText = "<strong>Bore pile diameter 30cm</strong> adalah 'Sweet Spot' (ukuran paling ideal dan ekonomis) untuk pondasi <strong>rumah 2-3 lantai</strong>, kost-kostan eksklusif, dan ruko kecil di area Jabodetabek. Mengapa? Karena kapasitas daya dukungnya sangat pas (mencapai 15-20 ton per titik), tidak mubazir biaya, dan sangat aman diaplikasikan di perumahan padat penduduk berkat minimnya getaran.";
data.descriptionTemplate = "Cek harga bore pile diameter 30cm terbaru 2026. Mesin Rp{mesin}/m, manual Rp{manual}/m. Ukuran paling ideal & ekonomis untuk pondasi rumah 2 lantai di gang sempit.";
data.localBusinessDescTemplate = "Spesialis jasa bore pile diameter 30cm untuk perumahan padat. Mesin Rp{mesin}/m, manual Rp{manual}/m. Gratis konsultasi hitung RAB pondasi rumah Anda.";
data.priceTableNote = "Berikut <strong>harga JASA PENGEBORAN SAJA</strong> (belum termasuk material beton & besi) khusus untuk diameter 30cm. Kedalaman maksimal manual adalah 6 meter, sedangkan mesin bisa mencapai 30 meter. Pastikan Anda memiliki data sondir tanah untuk mengetahui kedalaman tanah keras di lokasi Anda.";

data.mesinHighlight.suitable = "Pondasi Rumah 2-3 Lantai & Ruko";

// Leave manualHighlight.price as "100.000" since it's correct
data.manualHighlight.maxDepth = "6 meter";
data.manualHighlight.suitable = "Renovasi Rumah di Gang Sempit";

// Update FAQ
data.faq = [
    {
      "q": "Apakah bore pile diameter 30cm cukup kuat menahan rumah 3 lantai?",
      "a": "<strong>Sangat kuat.</strong> Dengan kedalaman pengeboran yang tepat (mencapai tanah keras), satu titik tiang bore pile 30cm mampu menahan beban vertikal antara 15 hingga 20 ton. Sangat ideal untuk rumah mewah 2-3 lantai atau bangunan kost-kostan."
    },
    {
      "q": "Berapa standar harga jasa bor diameter 30cm per meternya?",
      "a": "Harga standar jasa pengeboran diameter 30cm adalah <strong>mesin Rp120.000/m</strong> dan <strong>manual Rp100.000/m</strong>. Harga ini hanya untuk ongkos kerja bor, rakit besi, dan pengecoran (belum termasuk pembelian material besi dan beton dari supplier)."
    },
    {
      "q": "Berapa titik tiang bore pile 30cm yang dibutuhkan untuk luas tanah 100m²?",
      "a": "Untuk rumah 2 lantai seluas 100m², biasanya membutuhkan sekitar <strong>12-16 titik pondasi</strong> (tergantung bentang kolom dan gambar arsitek). Konsultasikan gambar denah Anda kepada kami untuk perhitungan RAB yang akurat."
    },
    {
      "q": "Bisa pakai metode bor manual (strauss pile) untuk diameter 30cm?",
      "a": "Bisa! Bore pile manual (strauss pile) sangat sering dipakai untuk diameter 30cm di lokasi yang tidak bisa dimasuki alat mesin sama sekali. Namun batas kedalaman maksimalnya adalah <strong>6 meter</strong>, jadi pastikan tanah keras di lokasi Anda tidak terlalu dalam."
    },
    {
      "q": "Apakah pengeboran 30cm akan membuat tembok tetangga retak?",
      "a": "Tidak. Metode bore pile adalah <strong>dibor (dikorek tanahnya ke atas)</strong>, bukan dipukul seperti tiang pancang. Sehingga getaran yang ditimbulkan sangat minim dan 100% aman untuk rumah tetangga yang berdempetan tembok sekalipun."
    }
];

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('30cm updated carefully!');

