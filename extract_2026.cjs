const fs = require('fs');

const pd = JSON.parse(fs.readFileSync('src/data/harga-2026.json', 'utf8'));

pd.factors = [
    {title: '1. Diameter & Kedalaman', desc: 'Semakin besar diameter dan semakin dalam pengeboran yang diperlukan hingga tanah keras, maka biaya per meter semakin tinggi.'}, 
    {title: '2. Kondisi Tanah', desc: 'Tanah lunak (bekas rawa/sawah) membutuhkan pengeboran lebih dalam hingga tanah keras, sehingga biaya bore pile bisa lebih besar.'}, 
    {title: '3. Jarak Proyek Dari Gudang Kami', desc: 'Biaya mobilisasi alat sudah kami sesuaikan sesuai jarak dari gudang kami di Jakarta.'}, 
    {title: '4. Volume Pekerjaan', desc: 'Minimal order jasa bore pile untuk mesin (mini crane & gawangan) adalah 200 meter, sedangkan strauss pile manual 100 meter.'}, 
    {title: '5. Jenis & Skala Proyek', desc: 'Proyek rumah tinggal pribadi umumnya memiliki harga lebih terjangkau dibandingkan proyek skala besar seperti kontraktor atau developer.'}
]; 

pd.additionalCosts = [
    {title: 'Mobilisasi Alat Bore Pile', desc: 'Mesin mini crane: Rp2-3jt | Strauss pile (bore pile manual): Rp1jt'}, 
    {title: 'Minimal Order', desc: 'Mesin mini crane dan gawangan: 200 meter | Strauss Pile (Manual): 100 meter'}, 
    {title: 'Sedot Lumpur', desc: 'Jika memakai bore pile mesin gawangan dan mini crane menggunakan metode <strong>wash boring (bor basah)</strong>, perkiraan biaya tambahannya sekitar: Rp800.000 - Rp1.200.000/rit (tergantung volume)'}, 
    {title: 'Data Sondir', desc: 'Sangat wajib untuk menentukan kedalaman pengeboran yang tepat hingga mencapai tanah keras'}
]; 

pd.tips = {
    heading: 'Tips memilih diameter:', 
    items: ['<strong>30 cm</strong> -&gt; rumah 1-2 lantai (paling banyak dipilih)', '<strong>40-50 cm</strong> -&gt; ruko, kantor, gudang, rumah sakit', '<strong>60-110 cm</strong> -&gt; hotel, gedung bertingkat']
}; 

pd.projects = {
    heading: 'Contoh Hitungan Proyek Nyata', 
    items: [
        {img: '/imgs/borepile-pulo-gadung-jakarta.webp', alt: 'Pengeboran bore pile mini crane diameter 30cm untuk rumah di Pulo Gadung, Jakarta Timur', caption: 'Bore Pile mini crane di Pulo Gadung, Jakarta Timur', title: 'Rumah 2 Lantai di Jakarta Timur', specs: 'Bore pile mesin mini crane diameter 30cm, kedalaman 12m, 27 titik', costCalc: '12m x Rp120.000 x 27 = <strong class="price-total">Rp38.880.000</strong>', mobilization: 'Rp3.000.000', total: '<strong class="price-total">Rp41.880.000</strong>', time: '5-7 hari kerja'}, 
        {img: '/imgs/strauss-pile-pondok-pinang.webp', fallback: '/imgs/borepile-depok.webp', alt: 'Proses bore pile manual pakai tenaga manusia (strauss pile)', caption: 'Bore Pile manual di area terbatas', title: 'Rumah 1 Lantai (Manual) di Jakarta Selatan', specs: 'Strauss pile (bore pile manual) diameter 30cm, kedalaman 6m, 19 titik', costCalc: '6m x Rp80.000 x 19 = <strong class="price-total">Rp9.120.000</strong>', mobilization: 'Rp1.000.000', total: '<strong class="price-total">Rp10.120.000</strong>', time: '7-9 hari kerja'}
    ], 
    note: '<strong>Catatan:</strong> Harga di atas sudah termasuk jasa pengeboran, perakitan besi tulangan, dan pengecoran beton, <strong>belum termasuk material</strong> (beton dan besi). Contoh di atas adalah proyek asli yang pernah kami kerjakan di lapangan.'
}; 

pd.advantages = {
    heading: 'Keuntungan Memilih Bore Pile', 
    items: [
        {title: 'Kedalaman Maksimal 30 Meter', desc: 'Mampu menembus tanah lunak hingga mencapai tanah keras, cocok untuk berbagai kondisi tanah di Pulau Jawa.'}, 
        {title: 'Daya Dukung Tinggi', desc: 'Mulai dari 15 ton hingga 120 ton tergantung diameter, bisa disesuaikan dengan beban bangunan.'}, 
        {title: 'Metode Fleksibel', desc: 'Bisa dikerjakan dengan bore pile mesin (mini crane) maupun manual menggunakan tenaga manusia.'}, 
        {title: 'Minim Getaran', desc: 'Aman untuk bangunan di sekitar proyek, tidak merusak tanah dan dinding tetangga.'}
    ]
}; 

pd.materialPackages = [
    {title: 'Diameter 30cm', desc: '<strong>Harga :</strong> Rp300.000/m<br><strong>Sudah termasuk:</strong> Jasa bor, perakitan besi, dan pengecoran beton. Besi tulangan 5D13 SNI, sengkang D8, beton mix K250<br><strong>Minimal order:</strong> 200m untuk mesin, dan 100m untuk manual'}, 
    {title: 'Diameter 40cm', desc: '<strong>Harga :</strong> Rp350.000/m<br><strong>Sudah termasuk:</strong> Jasa bor, perakitan besi, dan pengecoran beton. Besi tulangan 6D13 SNI, sengkang D8, beton mix K250<br><strong>Minimal order:</strong> 200m untuk mesin, dan 100m untuk manual'}, 
    {title: 'Diameter 50cm', desc: '<strong>Harga :</strong> Rp450.000/m<br><strong>Sudah termasuk:</strong> Jasa bor, perakitan besi, dan pengecoran beton. Besi tulangan 8D13 SNI, sengkang D8, beton mix K250<br><strong>Minimal order:</strong> 200m untuk mesin'}
]; 

fs.writeFileSync('src/data/harga-2026.json', JSON.stringify(pd, null, 2));
console.log("Updated harga-2026.json");
