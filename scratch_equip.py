import json

with open('src/data/kota/jakarta.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

items = data['equipment']['items']

for item in items:
    if 'Mini Crane' in item['name']:
        item['image'] = '/imgs/icons/bore-pile-mesin-mini-crane-icon-agung-perkasa.svg'
        item['imageAlt'] = 'Mesin bore pile mini crane Agung Perkasa untuk bore pile pondasi rumah, ruko, dan bangunan bertingkat di Jakarta'
    elif 'Gawangan' in item['name']:
        item['image'] = '/imgs/icons/bore-pile-mesin-gawangan-icon-agung-perkasa.svg'
        item['imageAlt'] = 'Mesin bore pile gawangan Agung Perkasa untuk bore pile ketika area tidak bisa dijangkau oleh mini crane di Jakarta'
    elif 'Strauss Pile' in item['name']:
        item['image'] = '/imgs/icons/strauss-pile-icon-agung-perkasa.svg'
        item['imageAlt'] = 'Strauss pile (bore pile manual) untuk pondasi di gang sempit dan area terbatas Jakarta lainnya'

with open('src/data/kota/jakarta.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
