import re

filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports for FaqSection, GoogleMapsEmbed, PublisherBox
imports = """
import GoogleMapsEmbed from '../../components/shared/GoogleMapsEmbed.astro';
import PublisherBox from '../../components/shared/PublisherBox.astro';
import FaqSection from '../../components/shared/FaqSection.astro';
import pricingFaqs from '../../data/faq-pricing.json';
"""
if "import GoogleMapsEmbed" not in content:
    content = content.replace("import BaseLayout", imports + "import BaseLayout")

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
# We find the <section> for FAQ and end at </section>
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

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Refactored properly!")
