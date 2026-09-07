import json
import re

# 1. Create faq-pricing.json
faqs = [
    {
        "q": "Apa perbedaan bore pile mesin dan manual?",
        "a": "Bore pile mesin pakai mini crane, kedalaman hingga 30 meter, biaya lebih tinggi. Bore pile manual pakai tenaga manusia, kedalaman 10 meter, lebih ekonomis untuk proyek kecil dan area sempit."
    },
    {
        "q": "Metode mana yang cocok untuk proyek rumah saya?",
        "a": "Jika ingin membuat rumah 2 lantai ke atas atau tanah bekas rawa kami sarankan menggunakan bore pile mesin. Jika hanya rumah 1 lantai, area sempit, budget terbatas bisa menggunakan bore pile manual."
    },
    {
        "q": "Berapa minimal order untuk jasa bore pile?",
        "a": "Bore pile mesin (mini crane & gawangan) minimal 200 meter. Bore pile manual minimal 100 meter. Di bawah itu bisa hubungi admin untuk penawaran khusus."
    },
    {
        "q": "Bisa pakai material sendiri untuk bore pile?",
        "a": "Sangat bisa. Harga di atas untuk jasa bor saja, material bisa Anda sediakan sendiri. Kami juga menyediakan paket lengkap dengan material jika Anda tidak ingin repot."
    },
    {
        "q": "Apa yang mempengaruhi harga bore pile?",
        "a": "Diameter, kedalaman pengeboran, kondisi tanah, jarak lokasi proyek dari gudang kami, volume pekerjaan, dan tingkat kesulitan proyek."
    },
    {
        "q": "Berapa kedalaman maksimal bore pile?",
        "a": "Untuk bore pile mesin (mini crane) kedalaman maksimal mencapai <strong>30 meter</strong>. Untuk bore pile manual (strauss pile) kedalaman maksimal <strong>10 meter</strong>. Kedalaman yang dibutuhkan tergantung pada kondisi tanah dan hasil uji sondir."
    },
    {
        "q": "Apakah melayani area Bekasi, Tangerang, Bogor?",
        "a": "Betul. Kami melayani area <strong>Jabodetabek</strong> (Jakarta, Bekasi, Bogor, Depok, Tangerang) dan seluruh Pulau Jawa."
    },
    {
        "q": "Apakah melayani area luar Jabodetabek?",
        "a": "Ya. Kami melayani seluruh area pulau Jawa sesuai permintaan proyek, tetapi ada perbedaan harga mobilisasi alat bore pile."
    }
]
with open("src/data/faq-pricing.json", "w", encoding="utf-8") as f:
    json.dump(faqs, f, indent=4, ensure_ascii=False)

print("Created faq-pricing.json")

# 2. Refactor bore-pile-2026.astro
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
content = content.replace("import BaseLayout", imports + "import BaseLayout")

# Replace Maps raw HTML with Component
content = re.sub(
    r'<!-- ===== MAPS ===== -->.*?</div>\s*</div>',
    '<!-- ===== MAPS ===== -->\n    <GoogleMapsEmbed cityName="Jakarta" />',
    content,
    flags=re.DOTALL
)

# Replace Publisher Box raw HTML with Component
content = re.sub(
    r'<!-- ===== PUBLISHER BOX ===== -->.*?</div>\s*</div>',
    '<!-- ===== PUBLISHER BOX ===== -->\n    <PublisherBox />',
    content,
    flags=re.DOTALL
)

# Replace FAQ raw HTML and JSON-LD with Component
# We match from <!-- ===== FAQ ===== --> up to the end of the schema script
content = re.sub(
    r'<!-- ===== FAQ ===== -->\s*<section>\s*<h2 class="section-heading">Pertanyaan Umum Seputar Harga Bore Pile 2026</h2>\s*<div class="faq-container">.*?</script>',
    '''<!-- ===== FAQ ===== -->
            <FaqSection 
                title="Pertanyaan Umum Seputar Harga Bore Pile 2026"
                faqs={pricingFaqs} 
                addSchema={true} 
            />''',
    content,
    flags=re.DOTALL
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Refactored Maps, PublisherBox, and FaqSection in 2026 page!")
