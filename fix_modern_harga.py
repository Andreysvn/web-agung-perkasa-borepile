import os

with open("public/css/modern-draft.css", "r", encoding="utf-8") as f:
    modern_css = f.read()

with open("public/css/harga.css", "r", encoding="utf-8") as f:
    harga_css = f.read()

# Combine both, putting modern-draft.css first as the base, 
# and then append harga.css to fill in ALL the missing specific classes 
# (like .blog-container, .section-heading, .maps-container, etc)
combined_css = modern_css + "\n/* --- HARGA.CSS APPENDED BELOW --- */\n" + harga_css

with open("public/css/modern-harga.css", "w", encoding="utf-8") as f:
    f.write(combined_css)

print("Generated true modern-harga.css with all classes preserved!")
