import re

with open('src/pages/harga/bore-pile-2026.astro', 'r', encoding='utf-8') as f:
    html = f.read()

# The pattern is:
# <div class="page-meta">
#     <span>Update: {formattedUpdate}</span> |
#     <span>Agung Perkasa</span> |
#     <span>Lokasi: Melayani JABODETABEK & Seluruh Pulau Jawa</span>
# </div>

pattern = re.compile(r'<div class="page-meta">.*?</div>\s*', re.DOTALL)
html = pattern.sub('', html)

with open('src/pages/harga/bore-pile-2026.astro', 'w', encoding='utf-8') as f:
    f.write(html)

