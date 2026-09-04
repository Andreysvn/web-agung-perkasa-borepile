const fs = require('fs');

let extractedBody = fs.readFileSync('scratch/clean_extracted.html', 'utf8');

// 1. Replace Material
extractedBody = extractedBody.replace(
    /<!-- ===== MATERIAL DARI KAMI ===== -->[\s\S]*?<\/section>/,
    '<!-- ===== MATERIAL DARI KAMI ===== -->\n            <MaterialPackages packages={pricing.materialPackages} />'
);

// 2. Replace Guarantee
extractedBody = extractedBody.replace(
    /<!-- ===== KOMITMEN & GARANSI ===== -->[\s\S]*?<div style="background:[^>]*>[\s\S]*?<\/div>[\s\S]*?<\/div>/,
    '<!-- ===== KOMITMEN & GARANSI ===== -->\n            <CityGuarantee />'
);

// 3. Replace Portfolio
extractedBody = extractedBody.replace(
    /<!-- ============================================================\s*PORTOFOLIO PROYEK BORE PILE\s*============================================================ -->[\s\S]*?<section class="portfolio-jakarta-section">[\s\S]*?<\/section>/,
    '<!-- Section: Projects -->\n            <CityProjects cityName="" />'
);

// 4. Replace Dynamic Prices
extractedBody = extractedBody.replace('<td>120.000</td>', '<td>{m30}</td>')
    .replace('<td>135.000</td>', '<td>{m40}</td>')
    .replace('<td>190.000</td>', '<td>{m50}</td>')
    .replace('<td>70.000</td>', '<td>{mn20}</td>')
    .replace('<td>75.000</td>', '<td>{mn25}</td>')
    .replace('<td>80.000</td>', '<td>{mn30}</td>')
    .replace('<td>115.000</td>', '<td>{mn40}</td>');

const finalCode = `---
import pricing from '../../data/harga.json';
import pageData from '../../data/harga-2026.json';
import { localBusinessSchema } from '../../lib/schema.js';
import FaIcon from '../../components/icons/FaIcon.astro';

import KotaLayout from '../../layouts/KotaLayout.astro';
import PageMeta from '../../components/shared/PageMeta.astro';
import CityCalculator from '../../components/city/CityCalculator.astro';
import CityGuarantee from '../../components/city/CityGuarantee.astro';
import MaterialPackages from '../../components/shared/MaterialPackages.astro';
import CityProjects from '../../components/city/CityProjects.astro';

const updateDate = new Date(\`\${pricing.priceUpdatedAt}T00:00:00\`);

const mesinMulai = pricing.mesin.find(p => p.diameter === 30).price.toLocaleString('id-ID');
const manualMulai = pricing.manual.find(p => p.diameter === 25).price.toLocaleString('id-ID');
const m30 = pricing.mesin.find(p => p.diameter === 30).price.toLocaleString('id-ID');
const m40 = pricing.mesin.find(p => p.diameter === 40).price.toLocaleString('id-ID');
const m50 = pricing.mesin.find(p => p.diameter === 50).price.toLocaleString('id-ID');
const mn20 = pricing.manual.find(p => p.diameter === 20).price.toLocaleString('id-ID');
const mn25 = pricing.manual.find(p => p.diameter === 25).price.toLocaleString('id-ID');
const mn30 = pricing.manual.find(p => p.diameter === 30).price.toLocaleString('id-ID');
const mn40 = pricing.manual.find(p => p.diameter === 40).price.toLocaleString('id-ID');

const seoTitle = "Harga Bore Pile 2026 Terbaru Per Meter | Kalkulator & Biaya Bore Pile";
const seoDesc = \`Harga bore pile 2026 terbaru seluruh Pulau Jawa. Mesin mulai Rp\${mesinMulai}/m, manual Rp\${manualMulai}/m. Kalkulator estimasi biaya otomatis. Konsultasi gratis.\`;
const canonical = "https://agungperkasaborepile.com/harga/bore-pile-2026.html";

const localBusinessLd = localBusinessSchema({
    "description": pageData.localBusinessDesc,
    "areaServed": [
        { "@type": "City", "name": "Jakarta" },
        { "@type": "City", "name": "Bekasi" },
        { "@type": "City", "name": "Depok" },
        { "@type": "City", "name": "Tangerang" },
        { "@type": "City", "name": "Bogor" }
    ]
});

const formattedUpdate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}).format(new Date(\`\${pricing.priceUpdatedAt}T00:00:00\`));
---

<KotaLayout
    title={seoTitle}
    description={seoDesc}
    canonical={canonical}
    ogTitle="Harga Bore Pile 2026 Terbaru | Kalkulator Biaya | Agung Perkasa"
    ogDescription="Harga bore pile 2026 terbaru seluruh Pulau Jawa. Kalkulator estimasi biaya bore pile mesin & manual. Konsultasi gratis."
    cityName={pageData.name}
    citySlug={pageData.slug}
    geoRegion={pageData.geoRegion}
    geoPlacename={pageData.geoPlacename}
    localBusinessDesc={pageData.localBusinessDesc}
    breadcrumbItems={[
        { name: "Beranda", url: "https://agungperkasaborepile.com/" },
        { name: "Harga", url: canonical }
    ]}
    faqSchema={pageData.faq}
    hasGoogleAds={true}
    googleAdsId="AW-16649506462"
    publisherDesc="Spesialis pondasi borepile dengan pengalaman lebih dari 10 tahun melayani Pulau Jawa. Data harga dan estimasi waktu di atas merupakan akumulasi dari semua proyek nyata yang telah kami kerjakan untuk client perorangan maupun kontraktor."
    mapsNote="*Kantor Pusat Operasional"
>

    <!-- Section 2: Page Meta (Mirrors Jakarta exactly using PageMeta component) -->
    <PageMeta 
        title="Harga Bore Pile 2026 Terbaru Per Meter" 
        updateDate={formattedUpdate} 
        location="Melayani JABODETABEK & Seluruh Pulau Jawa" 
    />
    
    <div class="illustration-row">
        <div class="illustration-img">
            <img src="/imgs/pengecoran-beton-borepile.webp" alt="Proses pengecoran beton pada lubang bore pile" loading="lazy" width="400" height="250">
            <div class="caption">Proses pengecoran bore pile</div>
        </div>
        <div class="illustration-text">
            <p><strong>Harga bore pile 2026</strong> terbaru untuk jasa pengeboran mulai dari <strong>Rp{mesinMulai}/m untuk mesin (mini crane)</strong>, dan manual atau <strong>strauss pile mulai dari Rp{manualMulai}/m</strong>. Kalkulator ini dibuat untuk menghitung estimasi <strong>total biaya</strong> jasa borepile dari berbagai diameter (mesin & manual), bisa mengatur harga sendiri sesuai keinginan. Dibuat oleh tim Agung Perkasa Borepile dari data proyek nyata yang kami kerjakan di lapangan.</p>
            <p><a href="/harga/bore-pile-2026.html">Lihat daftar harga bore pile 2026 lengkap di sini</a>.</p>
        </div>
    </div>

    <!-- Section 3: Calculator (The unified one) -->
    <CityCalculator cityName="" />

    <!-- Section 4: ALL RESTORED CONTENT -->
    ${extractedBody}

</KotaLayout>
`;

fs.writeFileSync('src/pages/harga/bore-pile-2026.astro', finalCode, 'utf8');
console.log("Super restore complete!");
