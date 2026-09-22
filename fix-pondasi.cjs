const fs = require('fs');
const file = 'src/pages/artikel/pondasi-area-terbatas.astro';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(
`                <h3>2. Mini Crane Bore Pile</h3>
                <p>Jika area sedikit lebih luas, mini crane bisa menjadi pilihan. Mesin ini lebih kecil dari gawangan tapi tetap memiliki kapasitas bor yang baik, mampu menembus kedalaman hingga 20 meter.</p>

                <h3>3. Gawangan Bore Pile</h3>
                <p>Untuk area yang cukup untuk mobilisasi alat sedang, gawangan bore pile memberikan performa terbaik dengan kedalaman hingga 30 meter.</p>`,
`                <h3>2. Mini Crane Bore Pile</h3>
                <p>Jika area sedikit lebih luas dan langit-langit bebas (tidak mentok), mini crane bisa menjadi pilihan ideal. Mesin ini sangat cepat dan stabil, mampu menembus kedalaman hingga 30 meter.</p>

                <h3>3. Gawangan Bore Pile</h3>
                <p>Jika proyek Anda terhalang oleh atap garasi yang rendah atau akses yang tidak memungkinkan menara mini crane untuk masuk, Gawangan adalah solusi utamanya. Spesifikasinya 100% sama dengan mini crane (harga sama, kedalaman sama hingga 30 meter, armada sama), hanya fisiknya saja yang berbeda berupa tiang knock-down.</p>`);

c = c.replace(
`            <p><strong>Strauss pile:</strong> minimal 1 meter. <strong>Mini crane:</strong> minimal 2-3 meter. <strong>Gawangan:</strong> minimal 4-5 meter. Untuk akses sangat sempit, strauss pile adalah pilihan paling fleksibel.</p>`,
`            <p><strong>Strauss pile:</strong> minimal lebar 1 meter. <strong>Mini crane dan Gawangan:</strong> minimal lebar pintu 2 meter untuk masuknya chassis mesin. Keduanya membutuhkan minimal area yang sama.</p>`);

c = c.replace(
`                "text": "Strauss pile: minimal 1 meter. Mini crane: minimal 2-3 meter. Gawangan: minimal 4-5 meter. Untuk akses sangat sempit, strauss pile adalah pilihan paling fleksibel."`,
`                "text": "Strauss pile: minimal lebar 1 meter. Mini crane dan Gawangan: minimal lebar 2 meter."`);

// apply dynamic prices as update-articles.cjs would do
c = c.replace('---', `---
import pricing from '../../data/harga.json';
const manualPrice = pricing.manual.find(i => i.price > 0)?.price || 75000;
const mesinPrice = pricing.mesin.find(i => i.price > 0)?.price || 120000;
const maxManualDepth = pricing.manual.find(i => i.price > 0)?.maxDepth || 6;
`);
c = c.replace(/Rp70\.000/g, "Rp{manualPrice.toLocaleString('id-ID')}");
c = c.replace(/Rp120\.000/g, "Rp{mesinPrice.toLocaleString('id-ID')}");

fs.writeFileSync(file, c);
console.log("Fixed carefully");

