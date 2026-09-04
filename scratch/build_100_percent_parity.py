import re

with open('scratch/original_2026.astro', 'r', encoding='utf-8') as f:
    html = f.read()

start_marker = '<!-- ===== SECTION TABEL HARGA ===== -->'
# We will cut off the raw HTML at "WHY CHOOSE US" because from that point on, we will use modern components!
end_marker = '<!-- ============================================================\n                 WHY CHOOSE US & EQUIPMENT'

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Markers not found!")
    exit(1)

content_block = html[start_idx:end_idx]

# IMPORTANT: Remove the FAQ container from the raw HTML because we are going to use the modern <FaqSection> component!
# The FAQ in the raw html starts at "<!-- ===== FAQ ===== -->"
faq_idx = content_block.find('<!-- ===== FAQ ===== -->')
if faq_idx != -1:
    content_block = content_block[:faq_idx]

# Also remove the internal CTA/Links because we will use standard layout elements or the components handle it
cta_idx = content_block.find('<!-- ===== CTA ===== -->')
if cta_idx != -1:
    content_block = content_block[:cta_idx]

# Wait, in the original html, FAQ was AFTER the WHY CHOOSE US section!
# Let's verify: Actually, WHY CHOOSE US contains Portfolio and Equipment.
# Is FAQ before or after?
# In original_2026.astro, it's WHY CHOOSE US -> Portofolio -> Alat -> FAQ -> CTA -> Internal Link -> main end -> ARTIKEL -> AREA LAYANAN.
# So by chopping at WHY CHOOSE US, we automatically remove the raw Portofolio, Alat, FAQ, CTA, Artikel, Area Layanan!

# Let's build the final Astro file
final_astro = f"""---
import pricing from '../../data/harga.json';
import pageData from '../../data/harga-2026.json';
import {{ localBusinessSchema }} from '../../lib/schema.js';
import FaIcon from '../../components/icons/FaIcon.astro';

import KotaLayout from '../../layouts/KotaLayout.astro';
import Breadcrumb from '../../components/shared/Breadcrumb.astro';
import PageMeta from '../../components/shared/PageMeta.astro';
import CityHero from '../../components/city/CityHero.astro';
import CityCalculator from '../../components/city/CityCalculator.astro';

// Modern Components to replace the ugly legacy ones:
import CityWhyUs from '../../components/city/CityWhyUs.astro';
import CityPortfolio from '../../components/city/CityPortfolio.astro';
import CityEquipment from '../../components/city/CityEquipment.astro';
import FaqSection from '../../components/shared/FaqSection.astro';
import CityArticles from '../../components/city/CityArticles.astro';
import CityKecamatan from '../../components/city/CityKecamatan.astro';

const formattedUpdate = new Intl.DateTimeFormat('id-ID', {{
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}}).format(new Date(`${{pricing.priceUpdatedAt}}T00:00:00`));

const seoTitle = "Harga Bore Pile 2026 Terbaru Per Meter | Kalkulator & Biaya Bore Pile";
const seoDesc = "Harga bore pile 2026 terbaru seluruh Pulau Jawa. Mesin mulai Rp120.000/m, manual Rp75.000/m. Kalkulator estimasi biaya otomatis. Konsultasi gratis.";
const canonical = "https://agungperkasaborepile.com/harga/bore-pile-2026.html";

const localBusinessLd = localBusinessSchema({{
    "description": pageData.localBusinessDesc,
    "areaServed": [
        {{ "@type": "City", "name": "Jakarta" }},
        {{ "@type": "City", "name": "Bekasi" }},
        {{ "@type": "City", "name": "Depok" }},
        {{ "@type": "City", "name": "Tangerang" }},
        {{ "@type": "City", "name": "Bogor" }}
    ]
}});
---

<KotaLayout
    title={{seoTitle}}
    description={{seoDesc}}
    canonical={{canonical}}
    ogTitle="Harga Bore Pile 2026 Terbaru | Kalkulator Biaya | Agung Perkasa"
    ogDescription="Harga bore pile 2026 terbaru seluruh Pulau Jawa. Kalkulator estimasi biaya bore pile mesin & manual. Konsultasi gratis."
    cityName={{pageData.name}}
    citySlug={{pageData.slug}}
    geoRegion={{pageData.geoRegion}}
    geoPlacename={{pageData.geoPlacename}}
    localBusinessDesc={{pageData.localBusinessDesc}}
    breadcrumbItems={{[
        {{ name: "Beranda", url: "https://agungperkasaborepile.com/" }},
        {{ name: "Harga", url: canonical }}
    ]}}
    faqSchema={{pageData.faq}}
    hasGoogleAds={{true}}
    googleAdsId="AW-16649506462"
    publisherDesc="Spesialis pondasi borepile dengan pengalaman lebih dari 10 tahun melayani Pulau Jawa. Data harga dan estimasi waktu di atas merupakan akumulasi dari semua proyek nyata yang telah kami kerjakan untuk client perorangan maupun kontraktor."
    mapsNote="*Kantor Pusat Operasional"
>
    <!-- Section 1: Breadcrumb -->
    <Breadcrumb items={{[
        {{ label: "Beranda", href: "/" }},
        {{ label: "Harga", href: "/harga/bore-pile-2026.html" }}
    ]}} />

    <!-- Section 2: Page Meta (Restored original content style in the illustration row) -->
    <div class="update-badge">Harga terbaru {{formattedUpdate}} | Konsultasi gratis</div>
    <h1 class="page-title">Harga Bore Pile 2026 Terbaru Per Meter</h1>
    <div class="page-meta">
        <span>Update: {{formattedUpdate}}</span> |
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

    <!-- Section 3: Calculator -->
    <CityCalculator cityName="" />

    <!-- Section 4: Text Content (Tabel, Keuntungan, dll) EXACTLY as original -->
{content_block}

    <!-- Section 5: The newly modernized sections -->
    <CityWhyUs whyUs={{pageData.whyUs}} cityName="Bore Pile" />
    <CityPortfolio portfolio={{pageData.portfolio}} cityName="" />
    <CityEquipment equipment={{pageData.equipment}} cityName="" />
    <FaqSection faq={{pageData.faq}} cityName="Bore Pile 2026" />
    
    <div class="container">
        <h2 style="color: var(--primary-color); margin: 25px 0 10px;">{{pageData.areaLayanan.title}}</h2>
        <p>{{pageData.areaLayanan.subtitle}}</p>
    </div>
    <CityKecamatan kecamatan={{pageData.areaLayanan}} cityName="" />
    
    <CityArticles articles={{[]}} />

</KotaLayout>
"""

with open('src/pages/harga/bore-pile-2026.astro', 'w', encoding='utf-8') as f:
    f.write(final_astro)

print("Done generating highly-polished bore-pile-2026.astro")
