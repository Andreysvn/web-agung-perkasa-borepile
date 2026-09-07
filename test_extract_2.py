import os
import json
import re

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

for filename in files:
    filepath = f"src/pages/jasa/{filename}"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    name = filename.replace("bore-pile-", "").replace(".astro", "").replace("-", " ").title()
    if name == "Bsd": name = "BSD"
    
    # Extract FAQs via regex since json.loads might fail if there are Astro variables inside the JSON-LD
    # Wait, let's just find the <div class="faq-answer"> content
    faq_q = re.findall(r'<button class="faq-question">(.*?) <FaIcon', content)
    faq_a = re.findall(r'<div class="faq-answer"><p>(.*?)</p></div>', content)
    
    # Extract Area Tags
    area_tags = re.findall(r'<span>(.*?)</span>', content)
    
    print(f"--- {name} ---")
    print(f"FAQs: {len(faq_q)} Qs, {len(faq_a)} As")
    print(f"Areas: {len(area_tags)}")
