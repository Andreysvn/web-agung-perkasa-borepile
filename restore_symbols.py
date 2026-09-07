import json
import re

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    content = f.read()

# Restore symbols cleanly
content = re.sub(r'Diameter (\d+)', r'Ø\1', content)
content = content.replace("  x  ", " × ")

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    f.write(content)
