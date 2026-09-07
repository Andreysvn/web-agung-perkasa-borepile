import re

with open("public/css/harga.css", "r", encoding="utf-8") as f:
    css = f.read()

# Match everything related to area-box, area-tags, maps-container
matches = re.findall(r'(\.area-(?:box|tags|grid)[^{]*\{[^}]*\})', css)
with open("public/css/modern-harga.css", "a", encoding="utf-8") as f:
    f.write("\n/* --- AREA CLASSES --- */\n")
    for match in matches:
        f.write(match + "\n")

matches = re.findall(r'(\.maps-(?:container|card|embed|title|address|btn)[^{]*\{[^}]*\})', css)
with open("public/css/modern-harga.css", "a", encoding="utf-8") as f:
    f.write("\n/* --- MAPS CLASSES --- */\n")
    for match in matches:
        f.write(match + "\n")

matches = re.findall(r'(\.publisher-(?:box|inner)[^{]*\{[^}]*\})', css)
with open("public/css/modern-harga.css", "a", encoding="utf-8") as f:
    f.write("\n/* --- PUBLISHER CLASSES --- */\n")
    for match in matches:
        f.write(match + "\n")

print("Appended area, maps, publisher to modern-harga.css")
