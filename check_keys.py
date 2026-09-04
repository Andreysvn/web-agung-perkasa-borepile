import json
import os

cities = ['bandung', 'bekasi', 'bogor', 'depok', 'karawang', 'semarang', 'surabaya', 'tangerang']
with open('src/data/kota/jakarta.json', 'r', encoding='utf-8') as f:
    j = json.load(f)

print("Jakarta keys:", list(j.keys()))

with open('src/data/kota/bandung.json', 'r', encoding='utf-8') as f:
    b = json.load(f)
print("Bandung keys:", list(b.keys()))

missing = set(j.keys()) - set(b.keys())
print("Missing in Bandung:", missing)
