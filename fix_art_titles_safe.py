import json

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Explicitly fix using safe ascii unicode escapes to avoid powershell encoding issues
data["articles"][0]["title"] = "Borepile vs Strauss Pile"
data["articles"][1]["title"] = "Harga Bore Pile \u00D830cm"
data["articles"][2]["title"] = "Bore Pile VS Tiang Pancang"

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
