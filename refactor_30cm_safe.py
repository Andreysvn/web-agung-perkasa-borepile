import re

filepath = "src/pages/harga/bore-pile/30cm/index.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add imports BEFORE the closing `---`
content = content.replace(
    '---<!DOCTYPE html>',
    '''
import BaseLayout from '../../../../layouts/BaseLayout.astro';
import PriceTable from '../../../../components/shared/PriceTable.astro';
import CityCalculator from '../../../../components/city/CityCalculator.astro';
---'''
)

# 2. Extract blog-container
main_match = re.search(r'<main id="main-content">\s*<div class="blog-container">(.*?)</div>\s*</main>', content, re.DOTALL)
if not main_match:
    print("Could not find <main> and blog-container")
    exit(1)
main_content = main_match.group(1)

# 3. Replace Calculator
main_content = re.sub(
    r'<div class="calculator-box">.*?</div>\s*</section>',
    '<CityCalculator cityName="" />\n              </section>',
    main_content,
    flags=re.DOTALL
)

# 4. Replace the two Tables
main_content = re.sub(
    r'<h3>Bore Pile Mesin \(Mini Crane\)</h3>\s*<div class="table-responsive">\s*<table class="price-table">.*?</table>\s*</div>',
    '<PriceTable highlightDiameter="30" />',
    main_content,
    flags=re.DOTALL
)
main_content = re.sub(
    r'<h3>Bore Pile Manual \(Strauss Pile\)</h3>\s*<div class="table-responsive">\s*<table class="price-table">.*?</table>\s*</div>',
    '',
    main_content,
    flags=re.DOTALL
)

# Fix class name for illustration row
main_content = main_content.replace('class="illustration-row"', 'class="illustration"')

# Build new file
top_part = content.split('---')[0] + '---' + content.split('---')[1] + '---'

new_astro = top_part + """
<BaseLayout 
    disableGlobalCss={true}
    title="Harga Bore Pile 30cm Terbaru 2026 Per Meter | Agung Perkasa"
    description="Harga bore pile diameter 30cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp120.000/m, manual Rp70.000/m. Kalkulator estimasi biaya. Konsultasi gratis."
    canonical="https://agungperkasaborepile.com/harga/bore-pile/30cm.html"
>
    <Fragment slot="head">
        <link rel="stylesheet" href="/css/modern-harga.css">
        <link rel="stylesheet" href="/css/lightbox.css">
        <script src="/js/lightbox.js" defer></script>
        
        <meta property="og:title" content="Harga Bore Pile Diameter 30cm Terbaru 2026 | Agung Perkasa">
        <meta property="og:description" content="Kalkulator estimasi biaya bore pile diameter 30cm untuk mesin & manual. Harga terjangkau untuk rumah 1-2 lantai.">
        <meta property="og:url" content="https://agungperkasaborepile.com/harga/bore-pile/30cm.html">
        <meta property="og:type" content="article">
        <meta property="og:locale" content="id_ID">
        <meta property="og:site_name" content="Agung Perkasa Bore Pile">
        <meta property="og:image" content="https://agungperkasaborepile.com/imgs/borepile-pulo-gadung-jakarta.webp">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Harga Bore Pile Diameter 30cm Jakarta Terbaru 2026">
        <meta name="twitter:description" content="Kalkulator estimasi biaya bore pile diameter 30cm Jakarta 2026.">
        <meta name="twitter:image" content="https://agungperkasaborepile.com/imgs/logo-agung-perkasa.webp">
    </Fragment>

    <div class="blog-container">
""" + main_content + """
    </div>
    
    <script type="application/ld+json" set:html={orgLd} is:inline></script>
    <script type="application/ld+json" set:html={localBusinessLd} is:inline></script>
</BaseLayout>
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_astro)
