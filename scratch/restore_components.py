import re

with open('src/pages/harga/bore-pile-2026.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace material section
mat_pattern = re.compile(r'<!-- ===== MATERIAL DARI KAMI ===== -->.*?<\/section>', re.DOTALL)
content = mat_pattern.sub(r'<!-- ===== MATERIAL DARI KAMI ===== -->\n            <MaterialPackages packages={pricing.materialPackages} />', content)

# Replace guarantee section
guar_pattern = re.compile(r'<!-- ===== KOMITMEN & GARANSI ===== -->\s*<div style="background.*?<\/div>\s*<\/div>\s*<\/div>', re.DOTALL)
content = guar_pattern.sub(r'<!-- ===== KOMITMEN & GARANSI ===== -->\n            <CityGuarantee />', content)

with open('src/pages/harga/bore-pile-2026.astro', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done restoring")

