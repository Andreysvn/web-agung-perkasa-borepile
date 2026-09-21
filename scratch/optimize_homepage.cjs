const fs = require('fs');
const path = require('path');

const indexAstroPath = path.join(__dirname, '../src/pages/index.astro');
let content = fs.readFileSync(indexAstroPath, 'utf8');

// 1. Fix Diameters & Prices
content = content.replace(/30cm sampai 110cm/g, '30cm sampai 80cm');
content = content.replace(/Diameter 30cm, 40cm, 50cm, 60cm, 70cm, 80cm, 90cm, 100cm, 110cm/g, 'Diameter 30cm, 40cm, 50cm, 60cm, 80cm');
content = content.replace(/Diameter: 30-110cm/g, 'Diameter: 30-80cm');
content = content.replace(/30-150 cm/g, '30-80 cm');

// Fix Prices
content = content.replace(/Rp 120\.000 - 350\.000\/m/g, 'Rp 120.000 - 360.000/m');
content = content.replace(/Rp 70\.000 - 100\.000\/m/g, 'Rp 75.000 - 120.000/m');
content = content.replace(/Rp70\.000\/m \(manual/g, 'Rp75.000/m (manual');

// 2. Add explicit width and height to images
// I will just add loading="lazy" width="800" height="600" to general images if not specific.
// Actually, it's better to preserve Aspect Ratio. But adding generic width/height is enough to stop CLS if CSS handles object-fit.
// Let's replace specific images.

const replacements = [
    { target: `<img src="/imgs/layanan-bore-pile-mesin-mini-crane.jpg" alt="Jasa Borepile" loading="lazy" decoding="async">`, 
      replace: `<img src="/imgs/layanan-bore-pile-mesin-mini-crane.jpg" alt="Jasa Borepile" width="600" height="400" loading="lazy" decoding="async">` },
    { target: `<img src="/imgs/hasil-lubang-borepile.jpg" alt="Jasa Strauss Pile" loading="lazy" decoding="async">`, 
      replace: `<img src="/imgs/hasil-lubang-borepile.jpg" alt="Jasa Strauss Pile" width="600" height="400" loading="lazy" decoding="async">` },
    { target: `<img src="/imgs/borepile-meruya-jakarta.jpg" alt="Harga Bore Pile 2026" loading="lazy">`, 
      replace: `<img src="/imgs/borepile-meruya-jakarta.jpg" alt="Harga Bore Pile 2026" width="600" height="400" loading="lazy">` },
    { target: `<img src="/imgs/borepile-mesin-biru.jpg" alt="Harga Bore Pile Diameter 30cm" loading="lazy">`, 
      replace: `<img src="/imgs/borepile-mesin-biru.jpg" alt="Harga Bore Pile Diameter 30cm" width="600" height="400" loading="lazy">` },
    { target: `<img src="/imgs/borepile-gedung-universitas-paramadina.jpg" alt="Proyek bore pile mini crane untuk gedung Universitas Paramadina di Kecamatan Cipayung, Jakarta Timur" loading="lazy">`, 
      replace: `<img src="/imgs/borepile-gedung-universitas-paramadina.jpg" alt="Proyek bore pile mini crane untuk gedung Universitas Paramadina di Kecamatan Cipayung, Jakarta Timur" width="600" height="400" loading="lazy">` },
    { target: `<img src="/imgs/bore-pile-rumah-di-pik.jpg" alt="Proyek bore pile mini crane untuk rumah di Pantai Indah Kapuk, Jakarta Utara" loading="lazy">`, 
      replace: `<img src="/imgs/bore-pile-rumah-di-pik.jpg" alt="Proyek bore pile mini crane untuk rumah di Pantai Indah Kapuk, Jakarta Utara" width="600" height="400" loading="lazy">` },
    { target: `<img src="/imgs/borepile-meruya-jakarta.webp" alt="Proyek bore pile mini crane untuk bangunan di Puri Kembangan, Jakarta Barat" loading="lazy">`, 
      replace: `<img src="/imgs/borepile-meruya-jakarta.webp" alt="Proyek bore pile mini crane untuk bangunan di Puri Kembangan, Jakarta Barat" width="600" height="400" loading="lazy">` },
    { target: `<img src="/imgs/borepile-asrama-pesantren-az-zikra-bogor-agung-perkasa.jpg" alt="Proyek bore pile mini crane untuk bangunan pesantren di samping masjid AZ Zikra di Gunung Sindur, Bogor" loading="lazy">`, 
      replace: `<img src="/imgs/borepile-asrama-pesantren-az-zikra-bogor-agung-perkasa.jpg" alt="Proyek bore pile mini crane untuk bangunan pesantren di samping masjid AZ Zikra di Gunung Sindur, Bogor" width="600" height="400" loading="lazy">` },
    { target: `<img src="/imgs/borepile-di-pinggir-sungai.jpg" alt="Proyek bore pile mini crane di samping sungai untuk pembuatan jembatan kecil" loading="lazy">`, 
      replace: `<img src="/imgs/borepile-di-pinggir-sungai.jpg" alt="Proyek bore pile mini crane di samping sungai untuk pembuatan jembatan kecil" width="600" height="400" loading="lazy">` },
    { target: `<img src="/imgs/pengecoran-beton-borepile.webp" alt="Proses pengecoran bore pile di Pulo Gadung, Jakarta Timur" loading="lazy">`, 
      replace: `<img src="/imgs/pengecoran-beton-borepile.webp" alt="Proses pengecoran bore pile di Pulo Gadung, Jakarta Timur" width="600" height="400" loading="lazy">` },
    { target: `<img src="/imgs/perakitan-besi-tulangan.jpg" alt="Tim Ahli Pondasi Kami" class="featured-image" loading="lazy">`, 
      replace: `<img src="/imgs/perakitan-besi-tulangan.jpg" alt="Tim Ahli Pondasi Kami" class="featured-image" width="600" height="400" loading="lazy">` },
    { target: `<img src="/imgs/borepile-dekat-dinding.webp" alt="Borepile vs Strauss Pile" loading="lazy">`, 
      replace: `<img src="/imgs/borepile-dekat-dinding.webp" alt="Borepile vs Strauss Pile" width="600" height="400" loading="lazy">` },
    { target: `<img src="/imgs/hasil-lubang-borepile.webp" alt="Bore Pile vs Tiang Pancang" loading="lazy">`, 
      replace: `<img src="/imgs/hasil-lubang-borepile.webp" alt="Bore Pile vs Tiang Pancang" width="600" height="400" loading="lazy">` },
    { target: `<img src="/imgs/borepile-dan-truk-molen.webp" alt="Proses Borepile" loading="lazy">`, 
      replace: `<img src="/imgs/borepile-dan-truk-molen.webp" alt="Proses Borepile" width="600" height="400" loading="lazy">` }
];

replacements.forEach(r => {
    content = content.replace(r.target, r.replace);
});


// 3. Inject FAQ Schema
// We'll construct the JSON-LD for the FAQ
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": "Apa perbedaan utama antara borepile dan strauss pile?", "acceptedAnswer": { "@type": "Answer", "text": "Borepile menggunakan mesin bor mini crane atau gawangan, kedalaman hingga 30m dan diameter bisa 30-80cm. Strauss pile menggunakan bor manual, kedalaman hingga 10m, diameter 20-40cm." } },
        { "@type": "Question", "name": "Apa kelebihan dan kekurangan borepile?", "acceptedAnswer": { "@type": "Answer", "text": "Kelebihan: Kapasitas beban tinggi, cocok tanah lunak, kedalaman hingga 30m, minim getaran tanah. Kekurangan: Biaya lebih tinggi, perlu area luas untuk mobilisasi alat." } },
        { "@type": "Question", "name": "Berapa kisaran biaya para jasa borepile dan strauss pile?", "acceptedAnswer": { "@type": "Answer", "text": "Borepile mesin mulai Rp120.000/m, Borepile manual mulai Rp75.000/m." } },
        { "@type": "Question", "name": "Berapa lama waktu pengerjaan untuk menyelesaikan pondasi bore pile atau strauss pile?", "acceptedAnswer": { "@type": "Answer", "text": "Borepile: 2-4 titik/hari. Strauss Pile: 1-3 titik/hari." } },
        { "@type": "Question", "name": "Apa perbedaan bore pile dengan tiang pancang (pile driving)?", "acceptedAnswer": { "@type": "Answer", "text": "Bore pile dengan pengeboran (minim getaran) dan bisa mencapai 30m. Tiang pancang dengan pemukulan (getaran besar) maksimal 15-20m. Bore pile aman untuk pemukiman padat." } },
        { "@type": "Question", "name": "Apakah bore pile aman untuk bangunan tetangga sekitar saya?", "acceptedAnswer": { "@type": "Answer", "text": "Sangat aman. Bore pile menggunakan metode pengeboran, bukan pemukulan seperti tiang pancang. Jadi getaran yang dihasilkan sangat sedikit." } },
        { "@type": "Question", "name": "Apakah wajib ada data sondir sebelum bore pile?", "acceptedAnswer": { "@type": "Answer", "text": "SANGAT WAJIB. Data sondir (soil test) sangat penting untuk menentukan kedalaman bore pile yang tepat untuk mencapai tanah keras." } },
        { "@type": "Question", "name": "Mana yang lebih baik untuk rumah 2 lantai: bore pile atau tiang pancang?", "acceptedAnswer": { "@type": "Answer", "text": "Kami lebih merekomendasikan bore pile karena minim getaran, minim polusi suara, dan bisa mencapai tanah keras lebih dalam." } },
        { "@type": "Question", "name": "Apakah bore pile untuk rumah 1 lantai terlalu berlebihan?", "acceptedAnswer": { "@type": "Answer", "text": "Tidak berlebihan. Biasanya menggunakan strauss pile (manual) mulai Rp75.000/m, sangat terjangkau dan minim getaran." } },
        { "@type": "Question", "name": "Apakah Agung Perkasa melayani proyek di luar Jakarta?", "acceptedAnswer": { "@type": "Answer", "text": "Benar. Kami melayani seluruh wilayah Jabodetabek dan seluruh wilayah di Pulau Jawa." } },
        { "@type": "Question", "name": "Apakah ada survei lokasi gratis?", "acceptedAnswer": { "@type": "Answer", "text": "Ya. Kami menyediakan konsultasi dan survei lokasi untuk wilayah Jabodetabek." } },
        { "@type": "Question", "name": "Berapa diameter bore pile yang cocok untuk rumah tinggal?", "acceptedAnswer": { "@type": "Answer", "text": "Untuk rumah 1-2 lantai umumnya menggunakan diameter 20-30 cm berdasarkan hasil sondir." } },
        { "@type": "Question", "name": "Bagaimana cara mendapatkan penawaran harga bore pile?", "acceptedAnswer": { "@type": "Answer", "text": "Kirimkan lokasi proyek, gambar kerja, dan data sondir ke tim kami." } }
    ]
};

// Add preload header to frontmatter
const frontmatterEnd = content.indexOf('---', 10);
const importIndex = content.indexOf('import config', 0);
const schemaImportStr = `import { localBusinessSchema } from '../lib/schema.js';\n`;
if (!content.includes('localBusinessSchema')) {
    content = content.slice(0, importIndex) + schemaImportStr + content.slice(importIndex);
}

// Inject the FAQ script at the end of the BaseLayout
const scriptToInject = `
    <!-- FAQ Schema injected for rich snippets -->
    <script type="application/ld+json" set:html={JSON.stringify(${JSON.stringify(faqSchema)})}></script>
`;
content = content.replace('</BaseLayout>', scriptToInject + '\n</BaseLayout>');

fs.writeFileSync(indexAstroPath, content);
console.log('index.astro updated');

// 4. Update BaseLayout to support preloadImage
const layoutPath = path.join(__dirname, '../src/layouts/BaseLayout.astro');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

// Ensure props include preloadImage
if (!layoutContent.includes('preloadImage')) {
    layoutContent = layoutContent.replace(/export interface Props \{/, 'export interface Props {\n    preloadImage?: string;');
    layoutContent = layoutContent.replace(/const \{ title, description, bodyClass, image, article, customCanonical \} = Astro\.props;/, 'const { title, description, bodyClass, image, article, customCanonical, preloadImage } = Astro.props;');
    
    const headEnd = layoutContent.indexOf('</head>');
    const preloadLink = `
    {preloadImage && <link rel="preload" as="image" href={preloadImage} fetchpriority="high" />}
`;
    layoutContent = layoutContent.slice(0, headEnd) + preloadLink + layoutContent.slice(headEnd);
    fs.writeFileSync(layoutPath, layoutContent);
    console.log('BaseLayout.astro updated');
}

// Update index.astro to pass preloadImage
let newIndexContent = fs.readFileSync(indexAstroPath, 'utf8');
newIndexContent = newIndexContent.replace('<BaseLayout title="Jasa Bore Pile Profesional Terpercaya" bodyClass="home">', '<BaseLayout title="Jasa Bore Pile Profesional Terpercaya" bodyClass="home" preloadImage="/imgs/header-beranda-bore-pile.jpg">');
fs.writeFileSync(indexAstroPath, newIndexContent);
console.log('index.astro passed preloadImage');

// 5. Remove Duplicate Area Layanan in harga-2026.json (since it's copied from homepage and renders exactly the same)
// Actually, it's safer to just remove the CityKecamatan component from bore-pile-2026.astro so it doesn't render it.
const hargaAstroPath = path.join(__dirname, '../src/pages/harga/bore-pile-2026.astro');
let hargaContent = fs.readFileSync(hargaAstroPath, 'utf8');
// Look for CityKecamatan usage and remove it
hargaContent = hargaContent.replace(/<CityKecamatan areaLayanan=\{pageData\.areaLayanan\} \/>/, '<!-- Area Layanan removed to prevent duplicate content with homepage -->');
fs.writeFileSync(hargaAstroPath, hargaContent);
console.log('bore-pile-2026.astro updated to remove duplicate Area Layanan');

