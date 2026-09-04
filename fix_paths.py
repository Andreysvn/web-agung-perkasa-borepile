import os
import shutil

folders = ["30cm", "40cm", "50cm", "60cm", "80cm"]
base_dir = "src/pages/harga/bore-pile"

filepath = f"{base_dir}/[diameter].astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix imports by removing one level of nesting (../../../ instead of ../../../../)
content = content.replace('../../../../', '../../../')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

# Delete the old folders manually
for folder in folders:
    shutil.rmtree(f"{base_dir}/{folder}", ignore_errors=True)

print("Imports fixed and legacy folders removed!")
