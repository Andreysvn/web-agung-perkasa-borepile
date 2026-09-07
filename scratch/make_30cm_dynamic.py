import re

with open('src/pages/harga/bore-pile/30cm/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()

variables = """
const m30 = pricing.mesin.find(p => p.diameter === 30).price.toLocaleString('id-ID');
const m40 = pricing.mesin.find(p => p.diameter === 40).price.toLocaleString('id-ID');
const m50 = pricing.mesin.find(p => p.diameter === 50).price.toLocaleString('id-ID');
const mn20 = pricing.manual.find(p => p.diameter === 20).price.toLocaleString('id-ID');
const mn25 = pricing.manual.find(p => p.diameter === 25).price.toLocaleString('id-ID');
const mn30 = pricing.manual.find(p => p.diameter === 30).price.toLocaleString('id-ID');
const mn40 = pricing.manual.find(p => p.diameter === 40).price.toLocaleString('id-ID');
"""

# Insert variables into frontmatter
content = content.replace("const orgLd =", variables + "\nconst orgLd =")

# Fix description strings in JSON-LD and Layout
old_ld_desc = '"description": "Jasa bore pile diameter 30cm terpercaya dengan pengalaman lebih dari 10 tahun. Harga bore pile mesin mulai Rp120.000/m, manual mulai Rp70.000/m.",'
new_ld_desc = '"description": `Jasa bore pile diameter 30cm terpercaya dengan pengalaman lebih dari 10 tahun. Harga bore pile mesin mulai Rp${m30}/m, manual mulai Rp${mn20}/m.`, '
content = content.replace(old_ld_desc, new_ld_desc)

old_layout_desc = 'description="Harga bore pile diameter 30cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp120.000/m, manual Rp70.000/m. Kalkulator estimasi biaya. Konsultasi gratis."'
new_layout_desc = 'description={`Harga bore pile diameter 30cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp${m30}/m, manual Rp${mn20}/m. Kalkulator estimasi biaya. Konsultasi gratis.`}'
content = content.replace(old_layout_desc, new_layout_desc)

# Replace table prices
content = content.replace('<td><strong>120.000</strong></td>', '<td><strong>{m30}</strong></td>')
content = content.replace('<td>135.000</td>', '<td>{m40}</td>')
content = content.replace('<td>190.000</td>', '<td>{m50}</td>')
content = content.replace('<td>70.000</td>', '<td>{mn20}</td>')
content = content.replace('<td>85.000</td>', '<td>{mn25}</td>')
content = content.replace('<td>120.000</td>', '<td>{mn40}</td>')

# Replace inline paragraph prices
content = content.replace('mesin Rp120.000/m², manual Rp85.000/m²', 'mesin Rp{m30}/m², manual Rp{mn25}/m²')
content = content.replace('Rp120.000/m² × 12m', 'Rp{m30}/m² × 12m')
content = content.replace('Rp85.000/m² × 8m', 'Rp{mn25}/m² × 8m')

with open('src/pages/harga/bore-pile/30cm/index.astro', 'w', encoding='utf-8') as f:
    f.write(content)

print("Made 30cm page dynamic!")

