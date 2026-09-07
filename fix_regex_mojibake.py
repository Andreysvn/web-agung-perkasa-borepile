import json

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    content = f.read()

# Replace any sequence of weird characters before 30cm or 40cm or 18m with Ø
import re

# E.g. "Bore pile mini crane A...o40cm" -> "Bore pile mini crane Ø40cm"
content = re.sub(r'A[^\w\s]*o(\d{2}cm)', r'Ø\1', content)

# E.g. "A...o30cm kedalaman 9m dan A...o40 kedalaman 18m"
content = re.sub(r'A[^\w\s]*o(\d{2})', r'Ø\1', content)

# E.g. "A...o' Note:" -> "💡 Note:"
content = re.sub(r'A[^\w\s]*o[^\w\s]*\s*<strong>Note:</strong>', r'💡 <strong>Note:</strong>', content)

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    f.write(content)

print("Replaced instances:")
with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    for line in f:
        if 'Ø' in line or '💡' in line:
            print(line.strip())
