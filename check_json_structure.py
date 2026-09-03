import json
with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print("Keys in JSON:")
print(data.keys())

if "projects" in data:
    print(type(data["projects"]))
    
if "projectNote" in data:
    print("Project Note found at root level:")
    print(data["projectNote"][:20])
