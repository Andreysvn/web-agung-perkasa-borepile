import shutil
import re

# 1. Copy borepile-kota.css to modern-harga.css
shutil.copy("public/css/borepile-kota.css", "public/css/modern-harga.css")

# 2. Update BaseLayout to actually NOT load style.css if disableGlobalCss is true
# Wait, I already added disableGlobalCss={true} support to BaseLayout earlier!

# 3. Update bore-pile-2026.astro
filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add disableGlobalCss={true}
if 'disableGlobalCss' not in content:
    content = content.replace(
        '<BaseLayout \n    title="Harga Bore Pile 2026',
        '<BaseLayout \n    disableGlobalCss={true}\n    title="Harga Bore Pile 2026'
    )

# Clean up CSS links to just modern-harga.css and lightbox.css
# Right now it has style.css, harga.css, modern-draft.css etc?
# Actually earlier I restored them in my script:
# '<link rel="stylesheet" href="/css/harga.css">\n        <link rel="stylesheet" href="/css/modern-draft.css">'

content = re.sub(
    r'<Fragment slot="head">.*?</Fragment>',
    '<Fragment slot="head">\n        <link rel="stylesheet" href="/css/modern-harga.css">\n        <link rel="stylesheet" href="/css/lightbox.css">\n        <script src="/js/lightbox.js" defer></script>\n    </Fragment>',
    content,
    flags=re.DOTALL
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated modern-harga.css and bore-pile-2026.astro!")
