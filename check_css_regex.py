import re

with open("dist/harga/bore-pile-2026.html", "r", encoding="utf-8") as f:
    html = f.read()

links = re.findall(r'<link[^>]*rel="stylesheet"[^>]*>', html)
for link in links:
    print(link)
