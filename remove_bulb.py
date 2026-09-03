import json

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)

if "projectNote" in data:
    note = data["projectNote"]
    idx = note.find("<strong>Note:</strong>")
    if idx != -1:
        data["projectNote"] = note[idx:]
    else:
        # Just strip the bulb emoji if it's there
        data["projectNote"] = note.replace("\U0001f4a1", "").strip()

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
