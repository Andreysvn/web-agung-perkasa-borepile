import re
import os

diameters = ["30cm", "40cm", "50cm", "60cm", "80cm"]

for d in diameters:
    filepath = f"src/pages/harga/bore-pile/{d}/index.astro"
    if not os.path.exists(filepath):
        print(f"Skipping {d}, file not found.")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add imports
    imports = """
import Breadcrumb from '../../../../components/shared/Breadcrumb.astro';
import PageMeta from '../../../../components/shared/PageMeta.astro';
"""
    if "import Breadcrumb" not in content:
        content = content.replace("import BaseLayout", imports + "import BaseLayout")

    # Replace breadcrumb HTML
    content = re.sub(
        r'<nav class="breadcrumb" aria-label="Breadcrumb navigasi">.*?</nav>',
        f'''<Breadcrumb items={{[
            {{ label: "Beranda", href: "/" }},
            {{ label: "Harga", href: "/harga/bore-pile-2026.html" }},
            {{ label: "Harga Bore Pile {d}" }}
        ]}} />''',
        content,
        flags=re.DOTALL
    )

    # Replace update-badge, page-title, page-meta HTML
    content = re.sub(
        r'<div class="update-badge">.*?</div>\s*<h1 class="page-title">.*?</h1>\s*<div class="page-meta">.*?</div>',
        f'''<PageMeta
            title="Harga Bore Pile {d} Terbaru 2026 Per Meter"
            updateDate={{formattedUpdate}}
            location="Melayani JABODETABEK & Seluruh Pulau Jawa"
        />''',
        content,
        flags=re.DOTALL
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Refactored {d} page components successfully!")
