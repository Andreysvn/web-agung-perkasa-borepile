import json
with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for art in data.get("articles", []):
    title = art["title"]
    if "30cm" in title:
        print("Original:", repr(title))
        # Let's fix it
        art["title"] = "Harga Bore Pile Ø30cm"

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
