import json
import os

cities = ['bandung', 'bekasi', 'bogor', 'depok', 'karawang', 'semarang', 'surabaya', 'tangerang', 'jakarta']

with open('src/data/kota/jakarta.json', 'r', encoding='utf-8') as f:
    master = json.load(f)

for city in cities:
    city_path = f'src/data/kota/{city}.json'
    with open(city_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # Overwrite equipment items from master to ensure images are present, 
    # but adapt the alt text and descriptions to the specific city
    # Actually, the easiest way is to inject image and imageAlt into the existing items
    
    for i, item in enumerate(data['equipment']['items']):
        if i < len(master['equipment']['items']):
            master_item = master['equipment']['items'][i]
            
            item['image'] = master_item.get('image', '')
            alt = master_item.get('imageAlt', '')
            # Replace Jakarta/jakarta with City Name
            alt = alt.replace('Jakarta', city.capitalize()).replace('jakarta', city.lower())
            item['imageAlt'] = alt
            
            # Since we're here, let's fix any remaining A~ in the description
            item['desc'] = item['desc'].replace('A~', 'Ø').replace('Ã˜', 'Ø').replace('A-', 'Ø')
            
    with open(city_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Equipment images synced to all cities!")
