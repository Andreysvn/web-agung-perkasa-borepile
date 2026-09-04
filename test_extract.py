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
    
    # Extract Meta Description
    meta_desc_match = re.search(r'<meta name="description" content="(.*?)">', content)
    meta_desc = meta_desc_match.group(1) if meta_desc_match else ""
    
    # Extract JSON-LD FAQs
    faq_matches = re.findall(r'\{"@type": "Question", "name": "(.*?)", "acceptedAnswer": \{"@type": "Answer", "text": "(.*?)"\}\}', content)
    faqs = []
    for q, a in faq_matches:
        faqs.append({"q": q.strip(), "a": a.strip()})
        
    print(f"--- {name} ---")
    print(f"Desc: {meta_desc[:50]}...")
    print(f"FAQs: {len(faqs)}")
