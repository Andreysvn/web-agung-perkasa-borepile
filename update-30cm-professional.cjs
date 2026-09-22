const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'harga-diameter', '30cm.json');
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Professional, Corporate, Engineering Tone
data.title = "Harga Bore Pile 30cm Terbaru 2026 Per Meter | Agung Perkasa";
data.h1 = "Harga Bore Pile Diameter 30cm: Spesifikasi Rumah 2-3 Lantai";
data.heroAlt = "Proses pengeboran bore pile 30cm dengan mesin mini crane untuk pondasi rumah tinggal";
data.heroCaption = "Pengeboran bore pile 30cm untuk pondasi bangunan di area padat penduduk";
data.heroText = "<strong>Bore pile diameter 30cm</strong> merupakan standar spesifikasi teknis yang paling direkomendasikan untuk struktur bangunan 2 hingga 3 lantai. Dengan daya dukung beban (<em>axial load</em>) mencapai 15-25 ton per titik, ukuran ini memberikan keseimbangan optimal antara kekuatan struktural dan efisiensi Rencana Anggaran Biaya (RAB). Metode pengeboran ini sangat aman diaplikasikan pada perumahan padat penduduk karena prosesnya tidak menimbulkan getaran maupun pergeseran tanah yang dapat merusak bangunan di sekitarnya.";
data.descriptionTemplate = "Harga jasa bore pile diameter 30cm terbaru 2026. Mesin Rp{mesin}/m, manual Rp{manual}/m. Standar pondasi ideal untuk rumah 2-3 lantai dan ruko. Hubungi kami.";
data.localBusinessDescTemplate = "Kontraktor jasa bore pile terpercaya. Spesialisasi diameter 30cm untuk struktur bangunan 2-3 lantai dengan daya dukung 15-25 ton per titik.";

// Clean highlights
data.mesinHighlight.suitable = "Rumah Tinggal, Ruko 2-3 Lantai, Gedung Kecil";
data.manualHighlight.suitable = "Renovasi di Akses Terbatas (Gang Sempit)";

// Professional FAQ
data.faq = [
    {
      "q": "Apakah bore pile diameter 30cm memadai untuk struktur bangunan 3 lantai?",
      "a": "<strong>Sangat memadai.</strong> Asalkan pengeboran dilakukan hingga mencapai lapisan tanah keras (<em>hard strata</em>) berdasarkan hasil uji sondir, satu titik tiang bore pile 30cm mampu menopang beban vertikal antara 15 hingga 25 ton. Spesifikasi ini sudah memenuhi standar keamanan untuk rumah atau ruko 3 lantai."
    },
    {
      "q": "Berapa rincian harga jasa bore pile diameter 30cm per meter?",
      "a": "Untuk wilayah Jabodetabek, harga jasa pengeboran diameter 30cm adalah <strong>Rp120.000/meter (Mesin)</strong> dan <strong>Rp100.000/meter (Manual/Strauss Pile)</strong>. Biaya tersebut murni untuk ongkos kerja pengeboran, perakitan tulangan besi, dan penuangan beton. Pembelian material beton readymix dan besi tulangan dihitung secara terpisah."
    },
    {
      "q": "Berapa estimasi kebutuhan titik tiang untuk lahan seluas 100m²?",
      "a": "Berdasarkan standar konstruksi umum untuk rumah 2 lantai seluas 100m², umumnya dibutuhkan sekitar <strong>12 hingga 16 titik pondasi</strong>. Namun, jumlah pasti wajib merujuk pada jarak antar kolom yang tertera pada gambar kerja (<em>shop drawing</em>) struktur Anda."
    },
    {
      "q": "Kapan sebaiknya menggunakan metode bor manual (Strauss Pile) untuk 30cm?",
      "a": "Metode Strauss Pile sangat direkomendasikan apabila lokasi proyek berada di gang yang sangat sempit dan tidak memungkinkan akses mobilisasi mesin Mini Crane. Kekurangannya, metode manual hanya efektif menembus kedalaman maksimal <strong>6 meter</strong> dan tidak bisa digunakan pada lapisan tanah cadas."
    },
    {
      "q": "Apakah proses pengeborannya berisiko meretakkan dinding bangunan tetangga?",
      "a": "Sama sekali tidak. Berbeda dengan sistem tiang pancang (<em>paku bumi</em>) yang dipukul, sistem bore pile menggunakan metode ekstraksi tanah dengan cara dibor. Proses ini minim getaran (<em>low vibration</em>) sehingga 100% aman diaplikasikan pada lahan yang berdempetan persis dengan dinding tetangga."
    }
];

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('30cm rewrite complete (Professional Tone)');
