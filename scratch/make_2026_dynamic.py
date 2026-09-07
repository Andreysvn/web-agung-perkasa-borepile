import re

with open('src/pages/harga/bore-pile-2026.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add dynamic variables to frontmatter
variables = """
const mesinMulai = pricing.mesin.find(p => p.diameter === 30).price.toLocaleString('id-ID');
const manualMulai = pricing.manual.find(p => p.diameter === 25).price.toLocaleString('id-ID');
const m30 = pricing.mesin.find(p => p.diameter === 30).price.toLocaleString('id-ID');
const m40 = pricing.mesin.find(p => p.diameter === 40).price.toLocaleString('id-ID');
const m50 = pricing.mesin.find(p => p.diameter === 50).price.toLocaleString('id-ID');
const mn20 = pricing.manual.find(p => p.diameter === 20).price.toLocaleString('id-ID');
const mn25 = pricing.manual.find(p => p.diameter === 25).price.toLocaleString('id-ID');
const mn30 = pricing.manual.find(p => p.diameter === 30).price.toLocaleString('id-ID');
const mn40 = pricing.manual.find(p => p.diameter === 40).price.toLocaleString('id-ID');
"""

# Replace the old seoDesc
old_seo_desc = 'const seoDesc = "Harga bore pile 2026 terbaru seluruh Pulau Jawa. Mesin mulai Rp120.000/m, manual Rp75.000/m. Kalkulator estimasi biaya otomatis. Konsultasi gratis.";'
new_seo_desc = 'const seoDesc = `Harga bore pile 2026 terbaru seluruh Pulau Jawa. Mesin mulai Rp${mesinMulai}/m, manual Rp${manualMulai}/m. Kalkulator estimasi biaya otomatis. Konsultasi gratis.`;'

content = content.replace(old_seo_desc, variables + "\n" + new_seo_desc)

# 2. Replace Hero Text
old_hero = '<strong>Harga bore pile 2026</strong> terbaru untuk jasa pengeboran mulai dari <strong>Rp120.000/m untuk mesin (mini crane)</strong>, dan manual atau <strong>strauss pile mulai dari Rp75.000/m</strong>'
new_hero = '<strong>Harga bore pile 2026</strong> terbaru untuk jasa pengeboran mulai dari <strong>Rp{mesinMulai}/m untuk mesin (mini crane)</strong>, dan manual atau <strong>strauss pile mulai dari Rp{manualMulai}/m</strong>'
content = content.replace(old_hero, new_hero)

# 3. Replace Table Mesin
content = content.replace('<td>30 cm</td>\n                                <td>120.000</td>', '<td>30 cm</td>\n                                <td>{m30}</td>')
content = content.replace('<td>40 cm</td>\n                                <td>135.000</td>', '<td>40 cm</td>\n                                <td>{m40}</td>')
content = content.replace('<td>50 cm</td>\n                                <td>190.000</td>', '<td>50 cm</td>\n                                <td>{m50}</td>')

# 4. Replace Table Manual
content = content.replace('<td>20 cm</td>\n                                <td>70.000</td>', '<td>20 cm</td>\n                                <td>{mn20}</td>')
content = content.replace('<td>25 cm</td>\n                                <td>75.000</td>', '<td>25 cm</td>\n                                <td>{mn25}</td>')
content = content.replace('<td>30 cm</td>\n                                <td>80.000</td>', '<td>30 cm</td>\n                                <td>{mn30}</td>')
content = content.replace('<td>40 cm</td>\n                                <td>115.000</td>', '<td>40 cm</td>\n                                <td>{mn40}</td>')

with open('src/pages/harga/bore-pile-2026.astro', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done replacing static prices with dynamic variables!")

