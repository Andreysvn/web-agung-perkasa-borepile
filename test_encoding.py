import json
with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)
print(repr(data["articles"][1]["title"].encode("utf-8")))
