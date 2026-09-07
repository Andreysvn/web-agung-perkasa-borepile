import json
with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for art in data.get("articles", []):
    print(art["title"])
