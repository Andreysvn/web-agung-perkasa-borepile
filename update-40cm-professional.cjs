const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'harga-diameter', '40cm.json');
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Professional, Corporate, Engineering Tone for 40cm
data.title = "Harga Bore Pile 40cm Terbaru 2026 Per Meter | Agung Perkasa";
data.h1 = "Harga Bore Pile Diameter 40cm: Spesifikasi Komersial (Ruko & Kantor)";
data.heroAlt = "Proses pengeboran bore pile 40cm dengan mesin mini crane untuk pondasi ruko dan kantor";
data.heroCaption = "Pengeboran bore pile 40cm untuk proyek bangunan komersial";
data.heroText = "<strong>Bore pile diameter 40cm</strong> adalah standar pondasi yang sangat ideal untuk menopang beban struktural bangunan komersial, seperti <strong>ruko, perkantoran, dan rukan 2-3 lantai</strong>. \n\nDengan daya dukung (<em>axial capacity</em>) mencapai 25-40 ton per titik, spesifikasi 40cm memberikan jaminan kestabilan pondasi yang lebih solid dibandingkan diameter 30cm, sekaligus meminimalisasi risiko penurunan tanah (<em>settlement</em>) pada bangunan yang menampung beban operasional komersial. Kami telah mengerjakan ratusan titik 40cm dengan presisi, memastikan pondasi Anda kuat dan tepat RAB.";
data.descriptionTemplate = "Harga jasa bore pile diameter 40cm terbaru 2026. Standar pondasi komersial (ruko & kantor 2-3 lantai). Mesin mulai Rp{mesin}/m. Konsultasi gratis.";
data.localBusinessDescTemplate = "Kontraktor jasa bore pile terpercaya. Spesialisasi diameter 40cm untuk struktur ruko dan kantor dengan daya dukung 25-40 ton per titik.";

// Clean highlights
data.mesinHighlight.suitable = "Ruko, Kantor, dan Fasilitas Komersial 2-3 Lantai";
data.manualHighlight.suitable = "Renovasi Area Terbatas (Tanah Padat)";

// Clean up mojibake in portfolio
if (data.portfolio && data.portfolio.items) {
    data.portfolio.items.forEach(item => {
        if (item.detail.includes('A~40cm')) item.detail = item.detail.replace('A~40cm', 'Ø40cm');
    });
}

// Professional FAQ
data.faq = [
    {
      "q": "Apakah bore pile diameter 40cm direkomendasikan untuk ruko 3 lantai?",
      "a": "<strong>Sangat direkomendasikan.</strong> Struktur ruko 3 lantai memiliki beban mati dan beban hidup yang cukup besar (karena menampung barang dagangan/operasional kantor). Dengan daya dukung mencapai 25-40 ton per titik, tiang pancang bor (bore pile) 40cm yang menembus hingga tanah keras (<em>hard strata</em>) akan menjamin bangunan Anda bebas dari risiko penurunan (<em>settlement</em>)."
    },
    {
      "q": "Berapa rincian harga jasa bore pile diameter 40cm per meter?",
      "a": "Untuk wilayah Jabodetabek, harga jasa pengeboran diameter 40cm menggunakan <strong>mesin (Mini Crane/Gawangan) adalah Rp135.000/meter</strong>. Metode manual (Strauss Pile) juga tersedia sekitar Rp120.000/meter, namun cukup jarang digunakan karena beban pemutarannya sangat berat bagi tenaga manusia. Biaya ini murni untuk jasa pengeboran, perakitan tulangan baja, dan pengecoran (belum termasuk material)."
    },
    {
      "q": "Kapan sebaiknya menggunakan diameter 40cm dibanding 30cm?",
      "a": "Diameter 30cm (15-25 ton/titik) biasanya cukup untuk rumah tinggal pribadi. Namun, jika Anda membangun fasilitas komersial (ruko, perkantoran, minimarket) yang memiliki bentang antar kolom lebih jauh atau akan menampung beban operasional berat, diameter 40cm memberikan faktor keamanan struktural (<em>safety factor</em>) yang jauh lebih memadai."
    },
    {
      "q": "Berapa titik pondasi yang dibutuhkan untuk ruko ukuran standar?",
      "a": "Sebagai estimasi, sebuah unit ruko standar (misal 5x15 meter) dengan struktur 2-3 lantai umumnya membutuhkan <strong>12 hingga 18 titik</strong> bore pile berdiameter 40cm. Jumlah pastinya akan mengacu pada jarak bentang kolom pada gambar kerja (<em>shop drawing</em>) arsitek Anda."
    },
    {
      "q": "Bagaimana proses mobilisasi mesin bore pile untuk diameter 40cm?",
      "a": "Alat bor Mini Crane atau Gawangan kami dapat dimobilisasi menggunakan truk angkut standar. Untuk perumahan atau kompleks ruko yang memiliki jalan utama dengan lebar minimal 3 meter, mesin dapat masuk dan bermanuver dengan lancar menuju titik pengeboran tanpa merusak infrastruktur jalan."
    }
];

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('40cm rewrite complete (Professional Tone)');

