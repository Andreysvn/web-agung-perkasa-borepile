import json

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Explicitly fix the article titles to undo the empty string replacement error
if "articles" in data and len(data["articles"]) >= 3:
    data["articles"][0]["title"] = "Borepile vs Strauss Pile"
    data["articles"][1]["title"] = "Harga Bore Pile Ø30cm"
    data["articles"][2]["title"] = "Bore Pile VS Tiang Pancang"

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
