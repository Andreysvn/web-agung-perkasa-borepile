import json
with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    text = f.read()

# Replace any stray "A~" that might represent diameter.
text = text.replace("A~", "Ø")

# Fix some grammar in "whyUs"
text = text.replace("di jakarta.", "di Jakarta.")
text = text.replace("proyek Pribadi, Mandor, dan Developer", "proyek pribadi, mandor, dan developer")

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    f.write(text)
