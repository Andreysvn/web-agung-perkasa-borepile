import json
import re
import copy

# CIKARANG (Clone from Bekasi)
with open('src/data/kota/bekasi.json', 'r', encoding='utf-8') as f:
    cikarang = json.load(f)

with open('src/pages/jasa/bore-pile-cikarang.astro', 'r', encoding='utf-8') as f:
    content_cik = f.read()

meta_cik = re.search(r'<meta name="description" content="(.*?)">', content_cik).group(1)

def walk_replace(obj, old_word, new_word):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if isinstance(v, (dict, list)): walk_replace(v, old_word, new_word)
            elif isinstance(v, str): obj[k] = v.replace(old_word, new_word).replace(old_word.lower(), new_word.lower())
    elif isinstance(obj, list):
        for i in range(len(obj)):
            if isinstance(obj[i], (dict, list)): walk_replace(obj[i], old_word, new_word)
            elif isinstance(obj[i], str): obj[i] = obj[i].replace(old_word, new_word).replace(old_word.lower(), new_word.lower())

cikarang['slug'] = 'bore-pile-cikarang'
cikarang['name'] = 'Cikarang'
cikarang['geoPlacename'] = 'Cikarang, Indonesia'
cikarang['localBusinessDesc'] = meta_cik
cikarang['heroText'] = "<strong>Harga bore pile Cikarang 2026</strong> untuk jasa pengeboran saja mulai dari <strong>Rp120.000/m untuk mesin (mini crane)</strong>, dan manual atau strauss pile mulai dari <strong>Rp70.000/m</strong>. Melayani seluruh kawasan Cikarang Pusat, Selatan, Utara, Timur, Barat, Jababeka, Lippo Cikarang, Deltamas, MM2100, dan sekitarnya."

walk_replace(cikarang['tips'], 'Bekasi', 'Cikarang')
walk_replace(cikarang['soilReasons'], 'Bekasi', 'Cikarang')
walk_replace(cikarang['projectNote'], 'Bekasi', 'Cikarang')
walk_replace(cikarang['projects'], 'Bekasi', 'Cikarang')
walk_replace(cikarang['whyUs'], 'Bekasi', 'Cikarang')
walk_replace(cikarang['equipment'], 'Bekasi', 'Cikarang')
walk_replace(cikarang['additionalCosts'], 'Bekasi', 'Cikarang')
walk_replace(cikarang['faq'], 'Bekasi', 'Cikarang')

with open('src/data/kota/cikarang.json', 'w', encoding='utf-8') as f:
    json.dump(cikarang, f, ensure_ascii=False, indent=2)


# TANGERANG SELATAN (Clone from Tangerang)
with open('src/data/kota/tangerang.json', 'r', encoding='utf-8') as f:
    tangsel = json.load(f)

with open('src/pages/jasa/bore-pile-tangerang-selatan.astro', 'r', encoding='utf-8') as f:
    content_tang = f.read()

meta_tang = re.search(r'<meta name="description" content="(.*?)">', content_tang).group(1)

tangsel['slug'] = 'bore-pile-tangerang-selatan'
tangsel['name'] = 'Tangerang Selatan'
tangsel['geoPlacename'] = 'Tangerang Selatan, Indonesia'
tangsel['localBusinessDesc'] = meta_tang
tangsel['heroText'] = "<strong>Harga bore pile Tangerang Selatan 2026</strong> untuk jasa pengeboran saja mulai dari <strong>Rp120.000/m untuk mesin (mini crane)</strong>, dan manual atau strauss pile mulai dari <strong>Rp70.000/m</strong>. Melayani Ciputat, Pamulang, Pondok Aren, Serpong, BSD, Bintaro, Setu dan sekitarnya."

walk_replace(tangsel['tips'], 'Tangerang', 'Tangerang Selatan')
walk_replace(tangsel['soilReasons'], 'Tangerang', 'Tangerang Selatan')
walk_replace(tangsel['projectNote'], 'Tangerang', 'Tangerang Selatan')
walk_replace(tangsel['projects'], 'Tangerang', 'Tangerang Selatan')
walk_replace(tangsel['whyUs'], 'Tangerang', 'Tangerang Selatan')
walk_replace(tangsel['equipment'], 'Tangerang', 'Tangerang Selatan')
walk_replace(tangsel['additionalCosts'], 'Tangerang', 'Tangerang Selatan')
walk_replace(tangsel['faq'], 'Tangerang', 'Tangerang Selatan')

with open('src/data/kota/tangerang-selatan.json', 'w', encoding='utf-8') as f:
    json.dump(tangsel, f, ensure_ascii=False, indent=2)

print("Generated Cikarang and Tangerang Selatan JSONs!")
