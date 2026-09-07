import json

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# The bulb is in data["projects"]["projectNote"]
if "projects" in data and "projectNote" in data["projects"]:
    note = data["projects"]["projectNote"]
    # We'll just strip out the weird chars. The string starts with "💡 " or its mojibake.
    # We know the true text starts with "<strong>Note:</strong>"
    idx = note.find("<strong>Note:</strong>")
    if idx != -1:
        data["projects"]["projectNote"] = note[idx:]

# The truck is in data["additionalCosts"][0]["title"]
if "additionalCosts" in data:
    for cost in data["additionalCosts"]:
        if "Mobilisasi Alat" in cost["title"]:
            cost["title"] = "Mobilisasi Alat Bore Pile"

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
