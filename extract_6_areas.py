import os
import json
import re

files = [
    "bore-pile-bintaro.astro",
    "bore-pile-bsd.astro",
    "bore-pile-cibubur.astro",
    "bore-pile-ciputat.astro",
    "bore-pile-karawaci.astro",
    "bore-pile-pamulang.astro"
]

with open('src/data/kota/tangerang.json', 'r', encoding='utf-8') as f:
    master = json.load(f)

for filename in files:
    filepath = f"src/pages/jasa/{filename}"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    slug = filename.replace(".astro", "")
    name = slug.replace("bore-pile-", "").replace("-", " ").title()
    if name == "Bsd": name = "BSD"
    
    # Extract Meta Description
    meta_desc = re.search(r'<meta name="description" content="(.*?)">', content).group(1)
    
    # Extract Hero Text
    hero_text = re.search(r'<p class="hero-subtitle">(.*?)</p>', content, re.DOTALL).group(1).strip()
    
    # Extract FAQs
    faq_q = re.findall(r'<button class="faq-question">(.*?) <FaIcon', content)
    faq_a = re.findall(r'<div class="faq-answer"><p>(.*?)</p></div>', content)
    faqs = [{"q": q, "a": a} for q, a in zip(faq_q, faq_a)]
    
    # Build new JSON
    import copy
    data = copy.deepcopy(master)
    
    # Basic replacements
    data['slug'] = slug
    data['name'] = name
    data['geoPlacename'] = f"{name}, Indonesia"
    data['localBusinessDesc'] = meta_desc
    data['heroText'] = hero_text
    
    # Overwrite FAQs
    if faqs:
        data['faq'] = faqs
        
    # Overwrite general text replacing Tangerang with Area Name
    def walk(obj):
        if isinstance(obj, dict):
            for k, v in obj.items():
                if isinstance(v, (dict, list)): walk(v)
                elif isinstance(v, str): obj[k] = v.replace('Tangerang', name).replace('tangerang', name.lower())
        elif isinstance(obj, list):
            for i in range(len(obj)):
                if isinstance(obj[i], (dict, list)): walk(obj[i])
                elif isinstance(obj[i], str): obj[i] = obj[i].replace('Tangerang', name).replace('tangerang', name.lower())
    
    # Apply to tips, soilReasons, projectNote
    walk(data['tips'])
    walk(data['soilReasons'])
    walk(data['projectNote'])
    walk(data['projects'])
    walk(data['whyUs'])
    walk(data['equipment'])
    walk(data['additionalCosts'])
    
    # Save JSON
    out_path = f"src/data/kota/{slug.replace('bore-pile-', '')}.json"
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Generated JSON for 6 standard areas!")
