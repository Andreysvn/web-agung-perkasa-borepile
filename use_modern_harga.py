filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the two CSS links with just modern-harga.css
content = content.replace(
    '<link rel="stylesheet" href="/css/harga.css">\n        <link rel="stylesheet" href="/css/modern-draft.css">',
    '<link rel="stylesheet" href="/css/modern-harga.css">'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated bore-pile-2026.astro to use modern-harga.css!")
