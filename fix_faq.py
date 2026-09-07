filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('faqs={pricingFaqs}', 'faq={pricingFaqs}')
content = content.replace('title="Pertanyaan Umum Seputar Harga Bore Pile 2026"', 'sectionTitle="Pertanyaan Umum Seputar Harga Bore Pile 2026"')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed FAQ props!")
