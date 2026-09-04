import re
import os

diameters = ["40cm", "50cm", "60cm", "80cm"]

for d in diameters:
    filepath = f"src/pages/harga/bore-pile/{d}/index.astro"
    if not os.path.exists(filepath):
        print(f"Skipping {d}, file not found.")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add imports BEFORE the closing `---`
    if "import BaseLayout" not in content:
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
        print(f"Could not find <main> and blog-container in {d}")
        continue
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
        f'<PriceTable localPrices={{pricing}} cityName="Jawa" highlightDiameter="{d[:2]}" />',
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
    
    # We need to extract the SEO stuff from the old head
    title_match = re.search(r'<title>(.*?)</title>', content)
    title = title_match.group(1) if title_match else f"Harga Bore Pile {d} Terbaru 2026 Per Meter"
    
    desc_match = re.search(r'<meta name="description" content="(.*?)">', content)
    desc = desc_match.group(1) if desc_match else f"Harga bore pile diameter {d} terbaru 2026 seluruh Pulau Jawa."
    
    og_title = re.search(r'<meta property="og:title" content="(.*?)">', content)
    og_title = og_title.group(1) if og_title else title
    
    og_desc = re.search(r'<meta property="og:description" content="(.*?)">', content)
    og_desc = og_desc.group(1) if og_desc else desc

    tw_title = re.search(r'<meta name="twitter:title" content="(.*?)">', content)
    tw_title = tw_title.group(1) if tw_title else title

    tw_desc = re.search(r'<meta name="twitter:description" content="(.*?)">', content)
    tw_desc = tw_desc.group(1) if tw_desc else desc

    new_astro = top_part + f"""
<BaseLayout 
    disableGlobalCss={{true}}
    title="{title}"
    description="{desc}"
    canonical="https://agungperkasaborepile.com/harga/bore-pile/{d}.html"
>
    <Fragment slot="head">
        <link rel="stylesheet" href="/css/modern-harga.css">
        <link rel="stylesheet" href="/css/lightbox.css">
        <script src="/js/lightbox.js" defer></script>
        
        <meta property="og:title" content="{og_title}">
        <meta property="og:description" content="{og_desc}">
        <meta property="og:url" content="https://agungperkasaborepile.com/harga/bore-pile/{d}.html">
        <meta property="og:type" content="article">
        <meta property="og:locale" content="id_ID">
        <meta property="og:site_name" content="Agung Perkasa Bore Pile">
        <meta property="og:image" content="https://agungperkasaborepile.com/imgs/borepile-pulo-gadung-jakarta.webp">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{tw_title}">
        <meta name="twitter:description" content="{tw_desc}">
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

    print(f"Refactored {d} page successfully!")
