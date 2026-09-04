filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('class="illustration-row"', 'class="illustration"')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated illustration-row to illustration")
