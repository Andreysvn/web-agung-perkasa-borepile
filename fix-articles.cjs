const fs = require('fs');

const file1 = 'src/pages/artikel/bore-pile-machine.astro';
let c1 = fs.readFileSync(file1, 'utf8');

c1 = c1.replace(
`                <h3>1. Gawangan Bore Pile</h3>
                <p><strong>Gawangan</strong> adalah mesin bore pile berukuran besar yang paling sering digunakan untuk proyek-proyek berskala besar. Mesin ini memiliki struktur rangka tinggi yang memungkinkan pengeboran hingga kedalaman maksimal.</p>
                <ul>
                    <li><strong>Kedalaman:</strong> Hingga 30 meter</li>
                    <li><strong>Diameter:</strong> 30-150 cm</li>
                    <li><strong>Kelebihan:</strong> Kapasitas besar, cocok untuk tanah keras</li>
                    <li><strong>Kekurangan:</strong> Membutuhkan area yang luas untuk manuver</li>
                </ul>

                <h3>2. Mini Crane Bore Pile</h3>
                <p><strong>Mini crane</strong> adalah versi lebih kecil dari gawangan, namun tetap memiliki performa yang baik. Mesin ini sangat populer karena fleksibilitasnya dalam menjangkau berbagai jenis proyek.</p>
                <ul>
                    <li><strong>Kedalaman:</strong> Hingga 20 meter</li>
                    <li><strong>Diameter:</strong> 30-80 cm</li>
                    <li><strong>Kelebihan:</strong> Fleksibel, cocok untuk area sempit</li>
                    <li><strong>Kekurangan:</strong> Kapasitas lebih kecil dari gawangan</li>
                </ul>`,
`                <h3>1. Mini Crane & Gawangan Bore Pile</h3>
                <p><strong>Mini Crane dan Gawangan</strong> pada dasarnya adalah mesin yang memiliki spesifikasi, tenaga, dan harga jasa yang sama persis. Keduanya menggunakan sistem pengerak mesin diesel (menggunakan truk mobilisasi yang sama) dan mampu mengebor hingga kedalaman 30 meter.</p>
                <ul>
                    <li><strong>Kedalaman:</strong> Hingga 30 meter</li>
                    <li><strong>Diameter:</strong> 30-80 cm</li>
                    <li><strong>Kelebihan Mini Crane:</strong> Paling populer, pengerjaan lebih cepat dan stabil karena menara crane sudah terintegrasi.</li>
                    <li><strong>Kelebihan Gawangan:</strong> Memiliki tiang (gawangan) yang bisa dilepas-pasang, sehingga sangat cocok untuk lokasi proyek yang terhalang atap atau memiliki akses pintu yang sangat pendek dimana menara mini crane tidak bisa masuk.</li>
                </ul>`
);

c1 = c1.replace(
`            <p>Biaya bervariasi tergantung jenis mesin dan wilayah. <strong>Gawangan Rp3-5 juta/hari</strong>, <strong>mini crane Rp2-3 juta/hari</strong>. Harga ini belum termasuk operator dan biaya operasional lainnya.</p>`,
`            <p>Mesin bore pile seperti Mini Crane dan Gawangan biasanya tidak disewakan secara harian, melainkan diborongkan per meter kedalaman. Harga jasanya sama persis, mulai dari Rp120.000 hingga Rp160.000 per meter tergantung diameternya, dengan batas minimal order 200 meter.</p>`
);

c1 = c1.replace(
`                "text": "Biaya bervariasi tergantung jenis mesin dan wilayah. Gawangan Rp3-5 juta/hari, mini crane Rp2-3 juta/hari. Harga ini belum termasuk operator dan biaya operasional lainnya."`,
`                "text": "Mesin bore pile Mini Crane dan Gawangan tidak disewakan harian, melainkan diborongkan per meter mulai Rp120.000/m dengan spesifikasi harga yang persis sama."`
);

fs.writeFileSync(file1, c1);

const file2 = 'src/pages/artikel/pondasi-area-terbatas.astro';
let c2 = fs.readFileSync(file2, 'utf8');

c2 = c2.replace(
`                <h3>2. Mini Crane Bore Pile</h3>
                <p>Jika area sedikit lebih luas, mini crane bisa menjadi pilihan. Mesin ini lebih kecil dari gawangan tapi tetap memiliki kapasitas bor yang baik, mampu menembus kedalaman hingga 20 meter.</p>

                <h3>3. Gawangan Bore Pile</h3>
                <p>Untuk area yang cukup untuk mobilisasi alat sedang, gawangan bore pile memberikan performa terbaik dengan kedalaman hingga 30 meter.</p>`,
`                <h3>2. Gawangan Bore Pile (Sistem Knock-Down)</h3>
                <p>Gawangan adalah solusi utama jika area proyek memiliki halangan vertikal seperti atap rendah atau kabel malang-melintang, di mana mesin mini crane biasa tidak bisa mendirikan menara (tower)-nya. Gawangan memiliki kapasitas kedalaman yang sama kuatnya (hingga 30 meter) dengan harga yang sama persis.</p>

                <h3>3. Mini Crane Bore Pile</h3>
                <p>Jika area proyek memiliki akses langit-langit yang bebas dan bisa dilalui truk colt diesel, Mini Crane adalah pilihan paling ideal dan cepat untuk mengebor diameter 30-80cm hingga 30 meter.</p>`
);

c2 = c2.replace(
`            <p><strong>Strauss pile:</strong> minimal 1 meter. <strong>Mini crane:</strong> minimal 2-3 meter. <strong>Gawangan:</strong> minimal 4-5 meter. Untuk akses sangat sempit, strauss pile adalah pilihan paling fleksibel.</p>`,
`            <p><strong>Strauss pile:</strong> minimal lebar 1 meter. <strong>Mini crane dan Gawangan:</strong> minimal lebar pintu 2 meter untuk masuknya chassis mesin. Keduanya membutuhkan minimal area yang sama.</p>`
);

c2 = c2.replace(
`                "text": "Strauss pile: minimal 1 meter. Mini crane: minimal 2-3 meter. Gawangan: minimal 4-5 meter. Untuk akses sangat sempit, strauss pile adalah pilihan paling fleksibel."`,
`                "text": "Strauss pile: minimal lebar 1 meter. Mini crane dan Gawangan: minimal lebar 2 meter."`
);

fs.writeFileSync(file2, c2);

console.log('Fixed articles!');

