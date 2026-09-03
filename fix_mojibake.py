import json

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    content = f.read()

# Fix mojibake
content = content.replace("AEo", "Ø")
content = content.replace("A,?o'", "💡")

# Some might be slightly different. Let's write back
with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    f.write(content)
