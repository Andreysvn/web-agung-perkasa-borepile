const fs = require('fs');

const extractedBody = fs.readFileSync('scratch/clean_extracted.html', 'utf8');

const finalCode = `---
import pricing from '../../data/harga.json';
import pageData from '../../data/harga-2026.json';
import { localBusinessSchema } from '../../lib/schema.js';
import FaIcon from '../../components/icons/FaIcon.astro';

import KotaLayout from '../../layouts/KotaLayout.astro';
import Breadcrumb from '../../components/shared/Breadcrumb.astro';
import PageMeta from '../../components/shared/PageMeta.astro';
import CityHero from '../../components/city/CityHero.astro';
import CityCalculator from '../../components/city/CityCalculator.astro';

const updateDate = new Date(\`\${pricing.priceUpdatedAt}T00:00:00\`);

const seoTitle = "Harga Bore Pile 2026 Terbaru Per Meter | Kalkulator & Biaya Bore Pile";
const seoDesc = "Harga bore pile 2026 terbaru seluruh Pulau Jawa. Mesin mulai Rp120.000/m, manual Rp75.000/m. Kalkulator estimasi biaya otomatis. Konsultasi gratis.";
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
    <!-- Section 1: Breadcrumb -->
    <Breadcrumb items={[
        { label: "Beranda", href: "/" },
        { label: "Harga", href: "/harga/bore-pile-2026.html" }
    ]} />

    <!-- Section 2: Page Meta -->
    <div class="update-badge">Harga terbaru {formattedUpdate} | Konsultasi gratis</div>
    <h1 class="page-title">Harga Bore Pile 2026 Terbaru Per Meter</h1>
    <div class="page-meta">
        <span>Update: {formattedUpdate}</span> |
        <span>Agung Perkasa</span> |
        <span>Lokasi: Melayani JABODETABEK & Seluruh Pulau Jawa</span>
    </div>
    
    <div class="illustration-row">
        <div class="illustration-img">
            <img src="/imgs/pengecoran-beton-borepile.webp" alt="Proses pengecoran beton pada lubang bore pile" loading="lazy" width="400" height="250">
            <div class="caption">Proses pengecoran bore pile</div>
        </div>
        <div class="illustration-text">
            <p><strong>Harga bore pile 2026</strong> terbaru untuk jasa pengeboran mulai dari <strong>Rp120.000/m untuk mesin (mini crane)</strong>, dan manual atau <strong>strauss pile mulai dari Rp75.000/m</strong>. Kalkulator ini dibuat untuk menghitung estimasi <strong>total biaya</strong> jasa borepile dari berbagai diameter (mesin & manual), bisa mengatur harga sendiri sesuai keinginan. Dibuat oleh tim Agung Perkasa Borepile dari data proyek nyata yang kami kerjakan di lapangan.</p>
            <p><a href="/harga/bore-pile-2026.html">Lihat daftar harga bore pile 2026 lengkap di sini</a>.</p>
        </div>
    </div>

    <!-- Section 3: Calculator (The unified one) -->
    <CityCalculator cityName="" />

    <!-- Section 4: ALL 100% ORIGINAL CONTENT RESTORED -->
    ${extractedBody}

</KotaLayout>
`;

fs.writeFileSync('src/pages/harga/bore-pile-2026.astro', finalCode, 'utf8');
console.log("Restored 100% of the content.");

