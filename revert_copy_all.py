import json

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Revert other points back to the exact user phrasing with just basic caps/periods
if "soilReasons" in data and "points" in data["soilReasons"]:
    points = data["soilReasons"]["points"]
    if len(points) >= 5:
        points[2]["desc"] = "Aman untuk bangunan di sekitar proyek, jadi tidak merusak tanah dan dinding tetangga Anda."
        points[4]["desc"] = "Bor basah sangat efektif untuk tanah berair atau rawa seperti di Jakarta Utara."

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
