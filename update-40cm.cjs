const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'harga-diameter', '40cm.json');
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.title = "Harga Bore Pile 40cm Terbaru 2026 Per Meter | Agung Perkasa";
data.h1 = "Harga Bore Pile Diameter 40cm: Spesifikasi Ruko & Perkantoran";
data.heroAlt = "Proses pengeboran bore pile 40cm dengan mesin mini crane di samping truk molen readymix";
data.heroCaption = "Pengeboran pondasi bore pile 40cm untuk proyek bangunan komersial";
data.heroText = "<strong>Bore pile diameter 40cm</strong> adalah standar pondasi struktural yang dirancang khusus untuk bangunan komersial beban menengah hingga berat, seperti <strong>ruko 3-4 lantai, perkantoran, dan gudang</strong>. Dengan kapasitas daya dukung (<em>axial load</em>) mencapai 35-45 ton per titik, ukuran ini sangat kokoh untuk menopang bentang kolom yang lebar. Kami menggunakan alat mesin <strong>Mini Crane</strong> maupun <strong>Gawangan</strong> (keduanya memiliki harga, kapasitas kedalaman maksimal 30m, dan spesifikasi yang sama persis) yang dapat disesuaikan dengan kondisi akses lahan proyek Anda.";
data.descriptionTemplate = "Harga jasa bore pile diameter 40cm terbaru 2026. Mesin Rp{mesin}/m, manual Rp{manual}/m. Standar pondasi kokoh untuk ruko 3-4 lantai, kantor & gudang.";
data.localBusinessDescTemplate = "Kontraktor jasa bore pile terpercaya. Spesialisasi diameter 40cm untuk struktur komersial dengan daya dukung 35-45 ton per titik menggunakan mesin crane/gawangan.";

data.mesinHighlight.suitable = "Ruko 3-4 Lantai, Gudang, Perkantoran, Gedung Menengah";
data.manualHighlight.suitable = "Sangat jarang (biasanya hanya untuk area yang tidak bisa dilalui mesin sama sekali)";

data.faq = [
    {
      "q": "Apakah bore pile diameter 40cm cocok untuk bangunan ruko 4 lantai?",
      "a": "<strong>Sangat cocok.</strong> Bore pile diameter 40cm adalah standar teknis yang paling banyak direkomendasikan oleh konsultan perencana untuk bangunan ruko 3 hingga 4 lantai. Satu titik pondasi 40cm mampu menopang beban vertikal (<em>axial load</em>) antara 35 hingga 45 ton, asalkan pengeboran mencapai lapisan tanah keras."
    },
    {
      "q": "Apa bedanya menggunakan alat Mesin Mini Crane dengan Gawangan?",
      "a": "<strong>Tidak ada bedanya secara spesifikasi dan harga.</strong> Keduanya sama-sama mesin bor dengan harga per meter yang sama (mulai Rp130.000/m), kedalaman maksimal yang sama (hingga 30 meter), batas minimal order yang sama (200 meter), dan diangkut menggunakan truk colt diesel. Gawangan hanya digunakan sebagai alternatif jika lokasi proyek memiliki atap rendah atau akses yang terlalu sempit untuk mendirikan menara Mini Crane."
    },
    {
      "q": "Berapa rincian harga jasa bore pile diameter 40cm per meter?",
      "a": "Untuk wilayah Jabodetabek, ongkos kerja pengeboran diameter 40cm menggunakan mesin (Mini Crane / Gawangan) adalah <strong>Rp130.000/meter</strong>. Harga tersebut murni untuk jasa bor, perakitan besi, dan pengecoran. Pembelian material beton readymix dan besi ulir disediakan oleh pihak *owner* atau kontraktor utama."
    },
    {
      "q": "Apakah memungkinkan mengebor diameter 40cm menggunakan alat manual (Strauss Pile)?",
      "a": "Secara teknis memungkinkan dengan harga jasa Rp120.000/meter, namun <strong>sangat jarang direkomendasikan</strong>. Tenaga manusia akan sangat kesulitan dan lambat memutar mata bor ukuran 40cm, dan batas kedalaman maksimal yang bisa dicapai hanya sekitar 4-6 meter saja."
    },
    {
      "q": "Berapa lama waktu pengerjaan untuk 20 titik bore pile 40cm?",
      "a": "Dengan menggunakan mesin Mini Crane atau Gawangan, rata-rata kecepatan pengeboran adalah 3 hingga 4 titik per hari (tergantung kekerasan tanah dan kelancaran suplai beton readymix). Sehingga untuk 20 titik umumnya dapat diselesaikan dalam waktu sekitar 5-7 hari kerja."
    }
];

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('40cm rewritten to professional tone!');

