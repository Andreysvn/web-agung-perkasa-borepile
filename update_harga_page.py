filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the prop to BaseLayout
content = content.replace(
    '<BaseLayout \n    title="Harga Bore Pile 2026',
    '<BaseLayout \n    disableGlobalCss={true}\n    title="Harga Bore Pile 2026'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated bore-pile-2026.astro!")
