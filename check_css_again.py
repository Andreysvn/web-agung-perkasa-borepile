import re
with open("dist/harga/bore-pile-2026.html", "r", encoding="utf-8") as f:
    html = f.read()
for link in re.findall(r'<link[^>]*rel="stylesheet"[^>]*>', html):
    print(link)
