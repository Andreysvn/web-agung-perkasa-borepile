import os
import shutil

cities = ['bandung', 'bekasi', 'bogor', 'depok', 'karawang', 'semarang', 'surabaya', 'tangerang', 'jakarta']

jakarta_path = 'src/pages/jasa/bore-pile/jakarta/index.astro'

with open(jakarta_path, 'r', encoding='utf-8') as f:
    template = f.read()

# Make it a generic template
template = template.replace("import jakartaData from '../../../../data/kota/jakarta.json';",
                            "import cityData from '../../../../data/kota/{city}.json';")
template = template.replace("jakartaData.", "cityData.")
template = template.replace("jakartaData", "cityData")

for city in cities:
    city_path = f'src/pages/jasa/bore-pile/{city}/index.astro'
    # Ensure directory exists
    os.makedirs(os.path.dirname(city_path), exist_ok=True)
    
    city_content = template.replace('{city}', city)
    
    with open(city_path, 'w', encoding='utf-8') as f:
        f.write(city_content)
        
print("Successfully replicated the Astro city template to all 8 cities and updated Jakarta!")
