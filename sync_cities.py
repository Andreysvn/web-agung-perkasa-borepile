import json
import os
import re

cities = ['bandung', 'bekasi', 'bogor', 'depok', 'karawang', 'semarang', 'surabaya', 'tangerang']
with open('src/data/kota/jakarta.json', 'r', encoding='utf-8') as f:
    master = json.load(f)

# The keys we want to sync from master
sync_keys = ['additionalCosts', 'soilReasons', 'priceUpdatedAt', 'projectNote', 'tips']

# Regex to replace capital O followed by numbers and cm (e.g., O30cm -> Ø30cm)
# Actually, let's just do string replacement for safety, or regex.
def fix_mojibake(text):
    if not isinstance(text, str):
        return text
    # Fix O30cm -> Ø30cm
    text = re.sub(r'\bO(\d+cm)\b', r'Ø\1', text)
    # Fix any remaining A~
    text = text.replace('A~', 'Ø').replace('Ã˜', 'Ø').replace('A-', 'Ø')
    return text

def recursively_fix_dict(d, city_name):
    if isinstance(d, dict):
        for k, v in d.items():
            if isinstance(v, (dict, list)):
                recursively_fix_dict(v, city_name)
            elif isinstance(v, str):
                fixed = fix_mojibake(v)
                d[k] = fixed
    elif isinstance(d, list):
        for i in range(len(d)):
            if isinstance(d[i], (dict, list)):
                recursively_fix_dict(d[i], city_name)
            elif isinstance(d[i], str):
                fixed = fix_mojibake(d[i])
                d[i] = fixed

def adapt_to_city(data, city_name):
    # Deep copy needed? Yes, but we're modifying strings.
    import copy
    cloned = copy.deepcopy(data)
    
    def walk(obj):
        if isinstance(obj, dict):
            for k, v in obj.items():
                if isinstance(v, (dict, list)):
                    walk(v)
                elif isinstance(v, str):
                    obj[k] = v.replace('Jakarta', city_name).replace('jakarta', city_name.lower())
        elif isinstance(obj, list):
            for i in range(len(obj)):
                if isinstance(obj[i], (dict, list)):
                    walk(obj[i])
                elif isinstance(obj[i], str):
                    obj[i] = obj[i].replace('Jakarta', city_name).replace('jakarta', city_name.lower())
    walk(cloned)
    return cloned

for city in cities:
    city_path = f"src/data/kota/{city}.json"
    with open(city_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Sync missing keys
    for k in sync_keys:
        if k in master:
            adapted = adapt_to_city(master[k], city.capitalize())
            data[k] = adapted
            
    # Fix mojibake & O30cm across entire file
    recursively_fix_dict(data, city.capitalize())
    
    # Save
    with open(city_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("JSON Replication & Cleaning completed!")
