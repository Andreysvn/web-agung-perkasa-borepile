const fs = require('fs');

const file = 'src/pages/alat/gawangan/index.astro';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(
`Tidak perlu truk besar untuk mobilisasi, cukup dibawa dengan motor atau kendaraan kecil.`,
`Mobilisasi tetap menggunakan armada truk (sama seperti Mini Crane).`
);

c = c.replace(
`Komponen gawangan dibawa ke lokasi dengan kendaraan kecil atau motor.`,
`Mesin dan menara knock-down dibawa menggunakan truk, lalu diangkut manual ke titik bor yang terhalang atap.`
);

c = c.replace(
`<p>Harga gawangan <strong>sedikit lebih mahal dari mini crane</strong> karena adanya biaya bongkar-pasang komponen di lokasi. Namun secara keseluruhan, harga masih dalam kisaran Rp{mesinPrice.toLocaleString('id-ID')} - Rp400.000 per meter tergantung diameter dan kedalaman.</p>`,
`<p><strong>Harganya 100% SAMA PERSIS dengan Mini Crane.</strong> Tidak ada biaya tambahan untuk bongkar pasang. Harga jasa bor mulai dari Rp{mesinPrice.toLocaleString('id-ID')} per meter dengan minimal order 200 meter.</p>`
);

c = c.replace(
`"text": "Harga gawangan sedikit lebih mahal dari mini crane karena adanya biaya bongkar-pasang komponen di lokasi. Namun secara keseluruhan, harga masih dalam kisaran Rp{mesinPrice.toLocaleString('id-ID')} - Rp400.000 per meter tergantung diameter dan kedalaman."`,
`"text": "Harganya 100% SAMA PERSIS dengan Mini Crane. Tidak ada biaya tambahan untuk bongkar pasang. Harga jasa bor mulai dari Rp{mesinPrice.toLocaleString('id-ID')} per meter."`
);

fs.writeFileSync(file, c);
console.log('Fixed gawangan dedicated page!');

