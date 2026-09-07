import json
with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for cost in data.get("additionalCosts", []):
    print(cost.get("title", ""))
