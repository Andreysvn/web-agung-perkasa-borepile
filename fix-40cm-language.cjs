const fs = require('fs');

const file = 'src/data/harga-diameter/40cm.json';
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

data.heroText = "<strong>Bore pile diameter 40cm</strong> adalah standar ukuran pondasi yang paling tepat untuk bangunan komersial kelas menengah seperti <strong>ruko dan gedung perkantoran 2-3 lantai</strong>. \n\nDengan daya dukung beban mencapai 25-40 ton per titik, ukuran 40cm memberikan jaminan kekuatan struktur yang jauh lebih solid dibandingkan 30cm. Ukuran ini sangat aman untuk mencegah risiko bangunan amblas atau retak akibat beban operasional yang berat. Tim Agung Perkasa sudah terbiasa mengerjakan ratusan titik bore pile 40cm dengan rapi, presisi, dan selesai tepat waktu sesuai gambar kerja Anda.";

data.faq.forEach(f => {
    if (f.q.includes('ruko 3 lantai')) {
        f.a = "<strong>Sangat kuat.</strong> Bangunan ruko 3 lantai biasanya menampung beban operasional yang berat (barang dagangan dan aktivitas orang). Dengan daya dukung 25-40 ton per titik, pondasi bore pile 40cm yang dibor sampai menyentuh tanah keras sudah lebih dari cukup untuk menahan beban ruko 3 lantai dengan aman tanpa risiko amblas.";
    }
    if (f.q.includes('rincian harga')) {
        f.a = "Untuk wilayah Jabodetabek, harga jasa bor diameter 40cm menggunakan <strong>mesin (Mini Crane/Gawangan) adalah Rp135.000 per meter</strong>. Kami juga menyediakan jasa manual (Strauss Pile) di harga Rp120.000 per meter, namun kami lebih menyarankan pemakaian mesin karena proses pengeboran 40cm secara manual memakan waktu lebih lama. Harga di atas adalah biaya murni untuk jasa bor, perakitan besi tulangan, dan pengecoran (belum termasuk material beton dan besi).";
    }
    if (f.q.includes('Kapan sebaiknya')) {
        f.a = "Jika Anda membangun rumah tinggal biasa, diameter 30cm sudah cukup. Namun, jika Anda membangun fasilitas komersial (ruko, perkantoran, minimarket) yang jarak antar-tiangnya (bentang kolom) lebih lebar dan beban bangunannya lebih berat, kami sangat menyarankan Anda naik ke diameter 40cm agar pondasi jauh lebih kokoh dan aman jangka panjang.";
    }
    if (f.q.includes('Berapa titik pondasi')) {
        f.a = "Sebagai gambaran kasar, satu unit ruko standar (misalnya ukuran 5x15 meter) dengan struktur 2-3 lantai biasanya membutuhkan <strong>12 hingga 18 titik</strong> bore pile ukuran 40cm. Namun, jumlah pasti dan jarak antar-tiangnya harus selalu mengikuti acuan gambar kerja struktur dari arsitek Anda.";
    }
    if (f.q.includes('mobilisasi mesin')) {
        f.a = "Mesin bor Mini Crane dan Gawangan yang kami gunakan bisa diangkut menggunakan truk standar. Selama lokasi proyek (seperti perumahan atau kompleks ruko) memiliki lebar jalan akses minimal 3 meter, mesin kami bisa masuk dan bermanuver menuju titik pengeboran dengan aman tanpa merusak aspal atau paving jalan.";
    }
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Rewrote 40cm to be natural Indonesian B2B');

