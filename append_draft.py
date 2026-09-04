with open("public/css/modern-draft.css", "r", encoding="utf-8") as f:
    draft_css = f.read()

with open("public/css/modern-harga.css", "a", encoding="utf-8") as f:
    f.write("\n/* --- MODERN DRAFT (CALCULATOR & PRICE TABLE) --- */\n")
    f.write(draft_css)

print("Appended modern-draft.css to modern-harga.css!")
