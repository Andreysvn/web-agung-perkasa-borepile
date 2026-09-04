import re

with open("scratch/original_2026.astro", "r", encoding="utf-8") as f:
    orig = f.read()

# BaseLayout opening
title_match = re.search(r'<title>(.*?)</title>', orig)
title = title_match.group(1) if title_match else "Harga Bore Pile 2026 Terbaru Per Meter"

desc_match = re.search(r'<meta name="description" content="(.*?)">', orig)
desc = desc_match.group(1) if desc_match else ""

canon_match = re.search(r'<link rel="canonical" href="(.*?)"\s*/>', orig)
canon = canon_match.group(1) if canon_match else "https://agungperkasaborepile.com/harga/bore-pile-2026.html"

baselayout_open = f"""---
import BaseLayout from '../../layouts/BaseLayout.astro';
import pricing from '../../data/harga.json';
import {{ organizationSchema, localBusinessSchema }} from '../../lib/schema.js';
import FaIcon from '../../components/icons/FaIcon.astro';
import PriceTable from '../../components/shared/PriceTable.astro';
import CityCalculator from '../../components/city/CityCalculator.astro';
import Breadcrumb from '../../components/shared/Breadcrumb.astro';
import PageMeta from '../../components/shared/PageMeta.astro';
import GoogleMapsEmbed from '../../components/shared/GoogleMapsEmbed.astro';
import PublisherBox from '../../components/shared/PublisherBox.astro';
import FaqSection from '../../components/shared/FaqSection.astro';
import pricingFaqs from '../../data/faq-pricing.json';

const orgLd = JSON.stringify(organizationSchema());
const localBusinessLd = JSON.stringify(localBusinessSchema({{
    "description": "Harga bore pile 2026 terbaru dan terpercaya dengan pengalaman lebih dari 10 tahun. Harga bore pile mesin mulai Rp120.000/m, manual mulai Rp75.000/m.",
    "areaServed": [
        {{ "@type": "City", "name": "Jakarta" }},
        {{ "@type": "City", "name": "Bekasi" }},
        {{ "@type": "City", "name": "Depok" }},
        {{ "@type": "City", "name": "Tangerang" }},
        {{ "@type": "City", "name": "Bogor" }}
    ]
}}));

const formattedUpdate = new Intl.DateTimeFormat('id-ID', {{
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}}).format(new Date(`${{pricing.priceUpdatedAt}}T00:00:00`));
---
<BaseLayout 
    disableGlobalCss={{true}}
    title="{title}"
    description="{desc}"
    canonical="{canon}"
>
    <Fragment slot="head">
        <link rel="stylesheet" href="/css/modern-harga.css">
        <link rel="stylesheet" href="/css/lightbox.css">
        <script src="/js/lightbox.js" defer></script>
        
        <meta property="og:title" content="Harga Bore Pile 2026 Terbaru Per Meter | Agung Perkasa">
        <meta property="og:description" content="Kalkulator estimasi biaya bore pile otomatis untuk mesin mini crane & manual strauss pile. Harga terjangkau, kualitas terbaik.">
        <meta property="og:url" content="https://agungperkasaborepile.com/harga/bore-pile-2026.html">
        <meta property="og:type" content="article">
        <meta property="og:locale" content="id_ID">
        <meta property="og:site_name" content="Agung Perkasa Bore Pile">
        <meta property="og:image" content="https://agungperkasaborepile.com/imgs/borepile-pulo-gadung-jakarta.webp">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Harga Bore Pile 2026 Jakarta Terbaru Per Meter">
        <meta name="twitter:description" content="Kalkulator estimasi biaya bore pile otomatis untuk mesin mini crane & manual strauss pile.">
        <meta name="twitter:image" content="https://agungperkasaborepile.com/imgs/logo-agung-perkasa.webp">
    </Fragment>
"""

body_match = re.search(r'(<main id="main-content">.*?)\s*<Footer />', orig, re.DOTALL)
if not body_match:
    print("Could not find body!")
    exit(1)
body = body_match.group(1)

# 1. Breadcrumb
breadcrumb_html = r'<nav class="breadcrumb".*?</nav>'
body = re.sub(breadcrumb_html, '<Breadcrumb items={[\n            { label: "Beranda", href: "/" },\n            { label: "Harga", href: "/harga/bore-pile-2026.html" },\n            { label: "Harga Bore Pile 2026" }\n        ]} />', body, flags=re.DOTALL)

# 2. PageMeta
pagemeta_html = r'<div class="page-meta".*?</div>'
body = re.sub(pagemeta_html, '<PageMeta\n            title="Harga Bore Pile 2026 Terbaru Per Meter"\n            updateDate={formattedUpdate}\n            location="Melayani JABODETABEK & Seluruh Pulau Jawa"\n        />', body, flags=re.DOTALL)

# 3. CityCalculator
# Include the section tag in the deletion!
calc_html = r'<section aria-labelledby="calculator-heading">.*?<!-- ===== SECTION TABEL HARGA ===== -->'
body = re.sub(calc_html, '<CityCalculator />\n\n            <!-- ===== SECTION TABEL HARGA ===== -->', body, flags=re.DOTALL)

# 4. PriceTable
table_html = r'<div class="table-responsive">.*?</table>\s*</div>'
body = re.sub(table_html, '<PriceTable />', body, flags=re.DOTALL)

# 5. Maps
map_html = r'<!-- ===== MAPS ===== -->\s*<div class="maps-container">.*?</div>\s*</div>\s*</div>'
body = re.sub(map_html, '<!-- ===== MAPS ===== -->\n    <GoogleMapsEmbed cityName="Jakarta" />', body, flags=re.DOTALL)

# 6. PublisherBox
pub_html = r'<!-- ===== PUBLISHER BOX ===== -->\s*<div class="publisher-box">.*?</div>\s*</div>\s*</div>'
body = re.sub(pub_html, '<!-- ===== PUBLISHER BOX ===== -->\n    <PublisherBox />', body, flags=re.DOTALL)

# 7. FaqSection
faq_html = r'<!-- ===== FAQ ===== -->\s*<section>.*?</section>'
body = re.sub(faq_html, '<!-- ===== FAQ ===== -->\n            <FaqSection \n                sectionTitle="Pertanyaan Umum Seputar Harga Bore Pile 2026"\n                faq={pricingFaqs} \n                addSchema={false} \n            />', body, flags=re.DOTALL)

# Replace <main id="main-content">
body = body.replace('<main id="main-content">', '<main id="main-content">', 1)

# Extract schemas at the bottom from the original file
schema_match = re.search(r'(<script type="application/ld\+json".*?)</body', orig, re.DOTALL)
if schema_match:
    schemas = schema_match.group(1)
else:
    schemas = ""

final_file = baselayout_open + "\n" + body + "\n" + schemas + "\n</BaseLayout>"

with open("src/pages/harga/bore-pile-2026.astro", "w", encoding="utf-8") as f:
    f.write(final_file)

print("Restructured successfully!")
