import re

with open("public/css/harga.css", "r", encoding="utf-8") as f:
    css = f.read()

# Match everything related to area-grid-detail
matches = re.findall(r'(\.area-grid-detail[^{]*\{[^}]*\})', css)
with open("public/css/modern-harga.css", "a", encoding="utf-8") as f:
    f.write("\n/* --- AREA GRID DETAIL --- */\n")
    for match in matches:
        f.write(match + "\n")

print("Appended area-grid-detail to modern-harga.css")
