import json
with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    text = f.read()

count = text.count("\ufffd")
print(f"Found {count} replacement characters.")

if count > 0:
    text = text.replace("\ufffd", "Ø")
    with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
        f.write(text)
    print("Fixed!")
