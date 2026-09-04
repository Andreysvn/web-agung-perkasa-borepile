import os

files = [
    "bore-pile-bintaro.astro",
    "bore-pile-bsd.astro",
    "bore-pile-cibubur.astro",
    "bore-pile-cikarang.astro",
    "bore-pile-ciputat.astro",
    "bore-pile-karawaci.astro",
    "bore-pile-pamulang.astro",
    "bore-pile-tangerang-selatan.astro"
]

with open('src/pages/jasa/bore-pile/jakarta/index.astro', 'r', encoding='utf-8') as f:
    template = f.read()

# Notice that jakarta/index.astro imports are relative to src/pages/jasa/bore-pile/jakarta/
# But our new files will be in src/pages/jasa/
# So we need to adjust the import paths: 
# '../../../../layouts/KotaLayout.astro' -> '../../layouts/KotaLayout.astro'
# '../../../../data/kota/jakarta.json' -> '../../data/kota/{city}.json'
# '../../../../components/...' -> '../../components/...'

template = template.replace('../../../../', '../../')

for filename in files:
    slug = filename.replace('.astro', '').replace('bore-pile-', '')
    
    # Replace JSON import
    content = template.replace("import cityData from '../../data/kota/jakarta.json';", f"import cityData from '../../data/kota/{slug}.json';")
    
    filepath = f"src/pages/jasa/{filename}"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Replaced all 8 Area Astro pages with the clean template!")
