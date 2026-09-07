import re

with open('src/pages/harga/bore-pile/30cm/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract the inner HTML of <div class="blog-container">
blog_start = content.find('<div class="blog-container">')
if blog_start != -1:
    blog_start += len('<div class="blog-container">')
blog_end = content.find('<!-- ===== ARTIKEL SECTION ===== -->')

inner_html = content[blog_start:blog_end].strip()

# Remove the trailing </div></main> that belongs to the layout
inner_html = re.sub(r'</div>\s*</main>\s*$', '', inner_html)

# 2. Replace the Calculator HTML with our CityCalculator component
calc_regex = re.compile(r'<section aria-labelledby="calculator-heading">[\s\S]*?</section>\s*(?=<!-- ===== SECTION TABEL HARGA ===== -->)', re.DOTALL)
inner_html = calc_regex.sub('<CityCalculator cityName="30cm" defaultDiameter={30} />\n\n            ', inner_html)

# 3. Construct the new 30cm Astro file
new_content = f"""---
import config from '../../../../data/config.json';
import KotaLayout from '../../../../layouts/KotaLayout.astro';
import pricing from '../../../../data/harga.json';
import {{ organizationSchema, localBusinessSchema }} from '../../../../lib/schema.js';
import FaIcon from '../../../../components/icons/FaIcon.astro';

// Components
import CityCalculator from '../../../../components/city/CityCalculator.astro';

const orgLd = JSON.stringify(organizationSchema());

const localBusinessLd = JSON.stringify(localBusinessSchema({{
    "description": "Jasa bore pile diameter 30cm terpercaya dengan pengalaman lebih dari 10 tahun. Harga bore pile mesin mulai Rp120.000/m, manual mulai Rp70.000/m.",
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

const formattedMonthYear = new Intl.DateTimeFormat('id-ID', {{
    month: 'long',
    year: 'numeric'
}}).format(new Date(`${{pricing.priceUpdatedAt}}T00:00:00`));
---

<KotaLayout 
    title="Harga Bore Pile 30cm Terbaru 2026 Per Meter | Agung Perkasa"
    description="Harga bore pile diameter 30cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp120.000/m, manual Rp70.000/m. Kalkulator estimasi biaya. Konsultasi gratis."
    canonical="https://agungperkasaborepile.com/harga/bore-pile/30cm.html"
    schema={{[orgLd, localBusinessLd]}}
>
    {inner_html}
</KotaLayout>
"""

with open('src/pages/harga/bore-pile/30cm/index.astro', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Refactored 30cm page perfectly!")
