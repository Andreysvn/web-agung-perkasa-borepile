with open("public/css/borepile-kota.css", "r", encoding="utf-8") as f:
    kota = f.read()

with open("public/css/modern-draft-arsip.css", "r", encoding="utf-8") as f:
    draft = f.read()

# Get the appended rules currently in modern-harga.css that are NOT in modern-draft-arsip.css
with open("public/css/modern-harga.css", "r", encoding="utf-8") as f:
    harga = f.read()
appended = ""
if "/* --- AREA GRID DETAIL --- */" in harga:
    appended = harga[harga.find("/* --- AREA GRID DETAIL --- */"):]

with open("public/css/modern-harga.css", "w", encoding="utf-8") as f:
    f.write("/* 1. KOTA (JAKARTA) CSS BASE */\n")
    f.write(kota)
    f.write("\n\n/* 2. MODERN DRAFT (CALCULATOR/TABLES) */\n")
    f.write(draft)
    f.write("\n\n/* 3. APPENDED LEGACY RULES */\n")
    f.write(appended)

print("Fixed modern-harga.css! It now contains borepile-kota.css at the top.")
