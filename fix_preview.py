path = "src/pages/preview-desain.astro"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()
text = text.replace('DraftLayout', 'KotaLayout')
with open(path, "w", encoding="utf-8") as f:
    f.write(text)
