import json
with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)
print("PROJECT NOTE:")
print(data.get("projects", {}).get("projectNote", ""))
print("\nADDITIONAL COSTS:")
for c in data.get("additionalCosts", []):
    print(c.get("title", ""))
