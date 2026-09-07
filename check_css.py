from bs4 import BeautifulSoup
import re

with open("dist/harga/bore-pile-2026.html", "r", encoding="utf-8") as f:
    html = f.read()

# find all link tags
soup = BeautifulSoup(html, "html.parser")
for link in soup.find_all("link", rel="stylesheet"):
    print(link.get("href"))
