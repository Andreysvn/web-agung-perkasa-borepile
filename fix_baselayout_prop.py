import re
filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <BaseLayout ...>
content = re.sub(
    r'<BaseLayout\s+',
    '<BaseLayout disableGlobalCss={true} ',
    content,
    count=1
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected disableGlobalCss=true")
