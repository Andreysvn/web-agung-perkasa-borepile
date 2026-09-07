import re

filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add all imports
imports = """
import BaseLayout from '../../layouts/BaseLayout.astro';
import PriceTable from '../../components/shared/PriceTable.astro';
import CityCalculator from '../../components/city/CityCalculator.astro';
import Breadcrumb from '../../components/shared/Breadcrumb.astro';
import PageMeta from '../../components/shared/PageMeta.astro';
import GoogleMapsEmbed from '../../components/shared/GoogleMapsEmbed.astro';
import PublisherBox from '../../components/shared/PublisherBox.astro';
import FaqSection from '../../components/shared/FaqSection.astro';
import pricingFaqs from '../../data/faq-pricing.json';
---
"""
content = content.replace("---", imports, 1) # Only replace the first --- ? No, replace the closing ---
content = content.replace('\n---\n<!DOCTYPE html>', '\n' + imports.strip() + '\n')

# Extract main content inside <div class="blog-container"> (or replace everything below ---)
# Wait, let's just do regex replacements for each block.

# Replace the HTML structure
# Replace breadcrumb
content = re.sub(
    r'<nav class="breadcrumb" aria-label="Breadcrumb navigasi">.*?</nav>',
    '''<Breadcrumb items={[
            { label: "Beranda", href: "/" },
            { label: "Harga", href: "/harga/bore-pile-2026.html" },
            { label: "Harga Bore Pile 2026" }
        ]} />''',
    content,
    flags=re.DOTALL
)

# Replace update-badge, page-title, page-meta
content = re.sub(
    r'<div class="update-badge">.*?</div>\s*<h1 class="page-title">.*?</h1>\s*<div class="page-meta">.*?</div>',
    '''<PageMeta
            title="Harga Bore Pile 2026 Terbaru Per Meter"
            updateDate={formattedUpdate}
            location="Melayani JABODETABEK & Seluruh Pulau Jawa"
        />''',
    content,
    flags=re.DOTALL
)

# Replace illustration-row with illustration
content = content.replace('class="illustration-row"', 'class="illustration"')

# Replace Calculator
content = re.sub(
    r'<div class="calculator-box">.*?</div>\s*</section>',
    '<CityCalculator cityName="" />\n              </section>',
    content,
    flags=re.DOTALL
)

# Replace the two Tables
content = re.sub(
    r'<h3>Bore Pile Mesin \(Mini Crane\)</h3>\s*<div class="table-responsive">\s*<table class="price-table">.*?</table>\s*</div>',
    '<PriceTable localPrices={pricing} cityName="Jawa" />',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<h3>Bore Pile Manual \(Strauss Pile\)</h3>\s*<div class="table-responsive">\s*<table class="price-table">.*?</table>\s*</div>',
    '',
    content,
    flags=re.DOTALL
)

# Replace Maps
content = re.sub(
    r'<!-- ===== MAPS ===== -->.*?<a href="[^"]*" target="_blank"[^>]*>Buka di Google Maps</a>\s*</div>\s*</div>',
    '<!-- ===== MAPS ===== -->\n    <GoogleMapsEmbed cityName="Jakarta" />',
    content,
    flags=re.DOTALL
)

# Replace Publisher Box
content = re.sub(
    r'<!-- ===== PUBLISHER BOX ===== -->.*?<div class="publisher-inner">.*?</div>\s*</div>\s*</div>',
    '<!-- ===== PUBLISHER BOX ===== -->\n    <PublisherBox />',
    content,
    flags=re.DOTALL
)

# Replace FAQ HTML
content = re.sub(
    r'<!-- ===== FAQ ===== -->\s*<section>\s*<h2 class="section-heading">Pertanyaan Umum Seputar Harga Bore Pile 2026</h2>\s*<div class="faq-container">.*?</section>',
    '''<!-- ===== FAQ ===== -->
    <FaqSection 
        title="Pertanyaan Umum Seputar Harga Bore Pile 2026"
        faqs={pricingFaqs} 
        addSchema={false} 
    />''',
    content,
    flags=re.DOTALL
)

# Now, wrap everything in BaseLayout.
# The original file has <!DOCTYPE html>...<body><Navbar/>...
# We will match everything between <main id="main-content"> and </main>
main_match = re.search(r'<main id="main-content">(.*?)</main>', content, re.DOTALL)
if main_match:
    main_html = main_match.group(1)
    # The new layout replaces everything from <!DOCTYPE html> onwards
    top_part = content.split('<!DOCTYPE html>')[0]
    new_astro = top_part + """<BaseLayout 
    disableGlobalCss={true}
    title="Harga Bore Pile 2026 Terbaru Per Meter | Kalkulator & Biaya Bore Pile"
    description="Harga bore pile 2026 terbaru seluruh Pulau Jawa. Mesin mulai Rp120.000/m, manual Rp75.000/m. Kalkulator estimasi biaya otomatis. Konsultasi gratis."
    canonical="https://agungperkasaborepile.com/harga/bore-pile-2026.html"
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

""" + main_html + """
    
    <script type="application/ld+json" set:html={orgLd} is:inline></script>
    <script type="application/ld+json" set:html={localBusinessLd} is:inline></script>
</BaseLayout>
"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_astro)
    print("Fully refactored!")
else:
    print("Could not find <main>")

