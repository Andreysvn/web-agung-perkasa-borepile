import re

with open('scratch/original_2026.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract Frontmatter
fm_match = re.search(r'---\s*(.*?)\s*---', content, re.DOTALL)
fm_code = fm_match.group(1)

# Modify frontmatter
fm_code = fm_code.replace("import Navbar from '../../components/global/Navbar.astro';", "")
fm_code = fm_code.replace("import Footer from '../../components/global/Footer.astro';", "")
fm_code = fm_code.replace("import FaIcon from '../../components/icons/FaIcon.astro';", "import FaIcon from '../../components/icons/FaIcon.astro';\nimport BaseLayout from '../../layouts/BaseLayout.astro';")

# 2. Extract title and description from head
title_match = re.search(r'<title>(.*?)</title>', content)
title = title_match.group(1) if title_match else ""

desc_match = re.search(r'<meta name="description" content="(.*?)">', content)
description = desc_match.group(1) if desc_match else ""

# 3. Extract the body content (from after <body... to before <Footer />)
body_match = re.search(r'<main id="main-content">(.*?)<Footer />', content, re.DOTALL)
if not body_match:
    print("Body not found")
    exit(1)
body_html = body_match.group(1)
# Clean up closing </main>
body_html = body_html.replace('</main>', '')

# 4. Extract schema and scripts at the bottom
schemas_match = re.search(r'<!-- ===== SCHEMA MARKUP ===== -->(.*?)</body>', content, re.DOTALL)
schemas_html = schemas_match.group(1) if schemas_match else ""

# 5. Build the new file
new_content = f\"\"\"---
{fm_code.strip()}
---
<BaseLayout 
    title=\"{title}\"
    description=\"{description}\"
    disableGlobalCss={{true}}
    disableGlobalJs={{true}}
>
    <link rel=\"stylesheet\" href=\"/css/modern-harga.css\" slot=\"head\">

{body_html}

    <!-- ===== SCHEMA MARKUP ===== -->
{schemas_html}
</BaseLayout>
\"\"\"

with open('src/pages/harga/bore-pile-2026.astro', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Refactored bore-pile-2026.astro successfully!")
