const fs = require('fs');
const path = require('path');

const currentPath = path.join(__dirname, 'src', 'pages', 'jasa', 'strauss-pile', 'jakarta', 'index.astro');
let content = fs.readFileSync(currentPath, 'utf8');

// 1. Fix the encoding anomaly 
// Replace any weird characters after "Baca selengkapnya " with "→"
content = content.replace(/Baca selengkapnya[^<]*/g, 'Baca selengkapnya →');
content = content.replace(/Cek layanan Bore Pile Mesin kami[^<]*/g, 'Cek layanan Bore Pile Mesin kami →');
// Map icon fix
content = content.replace(/%'A'A Lokasi Kami/g, '📍 Lokasi Kami');
content = content.replace(/.*?Lokasi Kami/g, '📍 Lokasi Kami');

// 2. Add an SEO optimized section
const seoContent = `
            <!-- ===== SEO CONTENT EXTRA ===== -->
            <section aria-labelledby="seo-heading">
                <h2 id="seo-heading" class="section-heading">Ahli Jasa Strauss Pile Jakarta Terpercaya</h2>
                <div class="seo-text-box">
                    <p>Mencari <strong>jasa strauss pile Jakarta</strong> yang profesional dan berpengalaman? Agung Perkasa Borepile adalah ahlinya. Dengan padatnya pemukiman di ibu kota, banyak warga kesulitan menemukan kontraktor pondasi yang bisa bekerja di area sempit tanpa merusak bangunan sebelah. Di sinilah layanan <strong>tukang strauss pile Jakarta</strong> kami hadir sebagai solusi.</p>
                    <p>Kami menawarkan <strong>harga jasa strauss pile Jakarta per meter</strong> yang sangat kompetitif, mulai dari Rp 75.000 saja. Harga murah ini tidak mengorbankan kualitas, karena tenaga kerja kami sudah terbiasa menghadapi berbagai kontur tanah lempung, bekas rawa, maupun urugan di seluruh area Jakarta Pusat, Jakarta Selatan, Jakarta Barat, Jakarta Timur, hingga Jakarta Utara.</p>
                    <p>Banyak pemborong menjanjikan kecepatan, namun kami menjanjikan <strong>ketepatan dan keamanan</strong>. Metode <em>dry boring</em> atau bor kering yang kami gunakan memastikan proyek rumah tingkat, ruko, atau kontrakan Anda bebas dari masalah limbah lumpur yang sering diprotes warga. Pastikan pondasi bangunan Anda kokoh berpuluh-puluh tahun dengan mempercayakannya pada <strong>pemborong strauss pile Jakarta</strong> terbaik.</p>
                </div>
            </section>
`;

// Insert the SEO content right before the FAQ section
content = content.replace('<!-- ===== KOMITMEN & GARANSI ===== -->', seoContent + '\n            <!-- ===== KOMITMEN & GARANSI ===== -->');

fs.writeFileSync(currentPath, content, 'utf8');
console.log('SEO Content added and encoding fixed!');

