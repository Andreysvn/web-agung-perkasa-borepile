import re

with open('src/pages/harga/bore-pile/30cm/index.astro', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace old breadcrumb and badges
meta_regex = re.compile(r'<nav class="breadcrumb".*?</nav>\s*<div class="update-badge">.*?</div>\s*<div class="diameter-badge">.*?</div>', re.DOTALL)
replacement = '''<PageMeta 
                breadcrumb={[
                    { label: "Home", url: "/" },
                    { label: "Harga", url: "/harga/bore-pile-2026.html" },
                    { label: "30cm", url: "/harga/bore-pile/30cm.html" }
                ]}
                updatedAt={formattedUpdate}
                author="Agung Perkasa"
                location="Jakarta"
            />'''

c = meta_regex.sub(replacement, c)

with open('src/pages/harga/bore-pile/30cm/index.astro', 'w', encoding='utf-8') as f:
    f.write(c)
