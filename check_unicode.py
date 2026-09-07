import json

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    content = f.read()

count = content.count("\ufffd")
print(f"Replacement characters found: {count}")

# Print the context if found
if count > 0:
    lines = content.split("\n")
    for i, line in enumerate(lines):
        if "\ufffd" in line:
            print(f"Line {i+1}: {line.strip()}")
