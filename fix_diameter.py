import json
import re

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    content = f.read()

# Replace Ø with "Diameter "
content = content.replace("Ø", "Diameter ")

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    f.write(content)
