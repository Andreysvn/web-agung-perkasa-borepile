import os
import shutil
import re

# 1. Create archive folder
os.makedirs('scratch/arsip-lama', exist_ok=True)

# 2. Move old CSS
old_css = 'public/css/borepile-kota.css'
if os.path.exists(old_css):
    shutil.move(old_css, 'scratch/arsip-lama/borepile-kota.css')

# 3. Rename modern-draft.css to borepile-kota.css
modern_css = 'public/css/modern-draft.css'
if os.path.exists(modern_css):
    shutil.move(modern_css, 'public/css/borepile-kota.css')

# 4. Rename DraftLayout.astro to KotaLayout.astro
draft_layout = 'src/layouts/DraftLayout.astro'
if os.path.exists(draft_layout):
    shutil.move(draft_layout, 'src/layouts/KotaLayout.astro')

# 5. Update KotaLayout.astro content (link rel)
kota_layout = 'src/layouts/KotaLayout.astro'
if os.path.exists(kota_layout):
    with open(kota_layout, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('/css/modern-draft.css', '/css/borepile-kota.css')
    with open(kota_layout, 'w', encoding='utf-8') as f:
        f.write(content)

# 6. Update jakarta/index.astro imports
jakarta_idx = 'src/pages/jasa/bore-pile/jakarta/index.astro'
if os.path.exists(jakarta_idx):
    with open(jakarta_idx, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("import DraftLayout from '../../../../layouts/DraftLayout.astro';", 
                              "import KotaLayout from '../../../../layouts/KotaLayout.astro';")
    content = content.replace("<DraftLayout", "<KotaLayout").replace("</DraftLayout>", "</KotaLayout>")
    with open(jakarta_idx, 'w', encoding='utf-8') as f:
        f.write(content)

print("Step 1 Renaming and Archiving Complete!")
