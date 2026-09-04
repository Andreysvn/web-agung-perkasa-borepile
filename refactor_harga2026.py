import re

filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract frontmatter
frontmatter_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
frontmatter = frontmatter_match.group(1)

# Add BaseLayout and CityCalculator to frontmatter imports
frontmatter = frontmatter.replace("import Navbar from '../../components/global/Navbar.astro';", "")
frontmatter = frontmatter.replace("import Footer from '../../components/global/Footer.astro';", "")
frontmatter += "\nimport BaseLayout from '../../layouts/BaseLayout.astro';"
frontmatter += "\nimport CityCalculator from '../../components/city/CityCalculator.astro';"

# 2. Extract content body between <main id="main-content"> and <Footer />
body_match = re.search(r'(<main id="main-content">.*?)\s*<Footer />', content, re.DOTALL)
body_content = body_match.group(1)

# 3. Extract the JSON-LD schemas at the bottom (after Footer, but before </body>)
# Actually, the user asked to keep schemas. They are at the bottom:
schema_match = re.search(r'(<script type="application/ld\+json".*?</script>)', content, re.DOTALL)
schemas = schema_match.group(1) if schema_match else ""
# Wait, there are multiple schemas (orgLd, localBusinessLd, FAQ). Let's extract ALL script tags of type application/ld+json
schemas = "\n".join(re.findall(r'<script type="application/ld\+json".*?</script>', content, re.DOTALL))

# 4. Replace the old calculator with CityCalculator
# The old calculator starts with <section aria-labelledby="calculator-heading"> and ends with </section> just before <!-- ===== SECTION TABEL HARGA ===== -->
calc_regex = r'<section aria-labelledby="calculator-heading">\s*<div class="calculator-box">.*?</div>\s*</section>'
body_content = re.sub(calc_regex, '<CityCalculator cityName="" />', body_content, flags=re.DOTALL)

# 5. Add data-lightbox and width/height to specific images
# pengecoran-beton-borepile.webp
body_content = body_content.replace('src="/imgs/pengecoran-beton-borepile.webp" alt="Proses pengecoran beton pada lubang bore pile" loading="lazy" width="400" height="250"', 'src="/imgs/pengecoran-beton-borepile.webp" alt="Proses pengecoran beton pada lubang bore pile" loading="lazy" width="400" height="250" data-lightbox')

# borepile-pulo-gadung-jakarta.webp
body_content = body_content.replace('src="/imgs/borepile-pulo-gadung-jakarta.webp" alt="Pengeboran bore pile mini crane diameter 30cm untuk rumah di Pulo Gadung, Jakarta Timur" loading="lazy"', 'src="/imgs/borepile-pulo-gadung-jakarta.webp" alt="Pengeboran bore pile mini crane diameter 30cm untuk rumah di Pulo Gadung, Jakarta Timur" loading="lazy" width="400" height="300" data-lightbox')
body_content = body_content.replace('src="/imgs/borepile-pulo-gadung-jakarta.webp" alt="Harga Bore Pile Diameter 30cm" loading="lazy"', 'src="/imgs/borepile-pulo-gadung-jakarta.webp" alt="Harga Bore Pile Diameter 30cm" loading="lazy" width="400" height="300"') # article card

# borepile-meruya-jakarta.webp
body_content = body_content.replace('src="/imgs/borepile-meruya-jakarta.webp" alt="Pengeboran bore pile mini crane diameter 40cm untuk ruko di Meruya, Jakarta Barat" loading="lazy"', 'src="/imgs/borepile-meruya-jakarta.webp" alt="Pengeboran bore pile mini crane diameter 40cm untuk ruko di Meruya, Jakarta Barat" loading="lazy" width="400" height="300" data-lightbox')

# strauss-pile-pondok-pinang.webp
body_content = body_content.replace('src="/imgs/strauss-pile-pondok-pinang.webp" onerror="this.src=\'/imgs/logo-agung-perkasa.webp\'" alt="Proses bore pile manual pakai tenaga manusia (strauss pile)" loading="lazy"', 'src="/imgs/strauss-pile-pondok-pinang.webp" onerror="this.src=\'/imgs/logo-agung-perkasa.webp\'" alt="Proses bore pile manual pakai tenaga manusia (strauss pile)" loading="lazy" width="400" height="300" data-lightbox')

# Add data-lightbox to already sized ones
body_content = body_content.replace('width="400" height="300">', 'width="400" height="300" data-lightbox>')
body_content = body_content.replace('data-lightbox data-lightbox>', 'data-lightbox>') # prevent double

# Article cards (don't need lightbox, but need width/height)
body_content = body_content.replace('src="/imgs/borepile-dekat-dinding.webp" alt="Harga Bore Pile 2026" loading="lazy"', 'src="/imgs/borepile-dekat-dinding.webp" alt="Harga Bore Pile 2026" loading="lazy" width="400" height="250"')
body_content = body_content.replace('src="/imgs/bore-pile-rumah-di-pik.webp" alt="Perbedaan Bore Pile dan Strauss Pile" loading="lazy"', 'src="/imgs/bore-pile-rumah-di-pik.webp" alt="Perbedaan Bore Pile dan Strauss Pile" loading="lazy" width="400" height="250"')

# Construct final Astro file
final_content = f"""---
{frontmatter.strip()}
---
<BaseLayout 
    title="Harga Bore Pile 2026 Terbaru Per Meter | Kalkulator & Biaya Bore Pile"
    description="Harga bore pile 2026 terbaru seluruh Pulau Jawa. Mesin mulai Rp120.000/m, manual Rp75.000/m. Kalkulator estimasi biaya otomatis. Konsultasi gratis."
    canonical="https://agungperkasaborepile.com/harga/bore-pile-2026.html"
>
    <!-- Lightbox CSS/JS injected to head -->
    <Fragment slot="head">
        <link rel="stylesheet" href="/css/lightbox.css">
        <script src="/js/lightbox.js" defer></script>
    </Fragment>

    {body_content.strip()}

    {schemas}
</BaseLayout>
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(final_content)

print("Refactored harga/bore-pile-2026.astro successfully!")
