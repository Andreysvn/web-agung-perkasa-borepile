filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<link rel="stylesheet" href="/css/lightbox.css">',
    '<link rel="stylesheet" href="/css/harga.css">\n        <link rel="stylesheet" href="/css/lightbox.css">'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected harga.css back into the page!")
