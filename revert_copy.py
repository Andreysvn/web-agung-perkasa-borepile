import json

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Revert the specific point back to the user's original phrasing
if "soilReasons" in data and "points" in data["soilReasons"]:
    points = data["soilReasons"]["points"]
    if len(points) > 3:
        points[3]["desc"] = "Suaranya tidak terlalu mengganggu tetangga sekitar proyek, apalagi jika proyek dilakukan di area padat, tapi terkadang ada tetangga yang merasa terganggu oleh suara yang dihasilkan, jadi kami juga menyediakan solusi untuk mengurangi suaranya (misal diberikan peredam suara)."

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
