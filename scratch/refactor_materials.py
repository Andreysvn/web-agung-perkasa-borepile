import re

with open('src/pages/harga/bore-pile-2026.astro', 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "import MaterialPackages from '../../components/shared/MaterialPackages.astro';\n"
if "MaterialPackages" not in content:
    content = content.replace("import CityGuarantee", import_stmt + "import CityGuarantee")

pattern = re.compile(r'<!-- ===== MATERIAL DARI KAMI ===== -->\s*<section>.*?<\/section>', re.DOTALL)
replacement = '<!-- ===== MATERIAL DARI KAMI ===== -->\n            <MaterialPackages packages={pricing.materialPackages} />'
content = pattern.sub(replacement, content)

with open('src/pages/harga/bore-pile-2026.astro', 'w', encoding='utf-8') as f:
    f.write(content)

# Optional: Add it to Jakarta page too!
with open('src/pages/jasa/bore-pile/jakarta/index.astro', 'r', encoding='utf-8') as f:
    jkt = f.read()

if "MaterialPackages" not in jkt:
    jkt = jkt.replace("import CityGuarantee", "import MaterialPackages from '../../../../components/shared/MaterialPackages.astro';\nimport CityGuarantee")

if "<MaterialPackages" not in jkt:
    # Insert it right before the Projects section
    jkt = jkt.replace("<!-- Section 9: Projects -->", "<!-- Section 8.5: Material Packages -->\n    <MaterialPackages packages={pricing.materialPackages} />\n\n    <!-- Section 9: Projects -->")

with open('src/pages/jasa/bore-pile/jakarta/index.astro', 'w', encoding='utf-8') as f:
    f.write(jkt)

print("Done refactoring MaterialPackages!")

