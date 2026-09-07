import json

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Fix articles
for art in data.get("articles", []):
    art["title"] = art["title"].replace("A~", "Ø").replace("", "Ø")

# Fix soilReasons conclusion spacing and grammar
if "soilReasons" in data:
    conclusion = data["soilReasons"]["conclusion"]
    conclusion = conclusion.replace("rumah,ruko", "rumah, ruko")
    conclusion = conclusion.replace("Sunter dll.", "Sunter, dll.")
    conclusion = conclusion.replace("sebagian berpasir, kami", "sebagian berpasir. Kami")
    conclusion = conclusion.replace("berbeda, contohnya", "berbeda. Contohnya")
    data["soilReasons"]["conclusion"] = conclusion

    # Fix points capitalization and punctuation
    points = data["soilReasons"].get("points", [])
    if len(points) >= 5:
        points[0]["desc"] = "Mampu menembus lapisan tanah lunak hingga <a href=\"https://journal.jgu.ac.id/index.php/jgers/article/view/40\" target=\"_blank\" rel=\"noopener noreferrer\">mencapai tanah keras</a>."
        points[1]["desc"] = "Bisa disesuaikan dengan <a href=\"https://library.gunadarma.ac.id/repository/perencanaan-fondasi-bored-pile-pada-gedung-perkantoran-10-lantai-di-jakarta-pusat-skripsi\" target=\"_blank\" rel=\"noopener noreferrer\">beban bangunan</a>."
        points[2]["desc"] = "Aman untuk bangunan di sekitar proyek, tidak merusak tanah dan dinding tetangga Anda."
        points[3]["desc"] = "Suara mesin tidak terlalu bising sehingga cocok untuk area padat penduduk. Kami juga siap memberikan solusi ekstra untuk meredam suara jika diperlukan."
        points[4]["desc"] = "Metode <em>wash boring</em> (bor basah) sangat efektif untuk tanah berair atau rawa seperti di wilayah Jakarta Utara."

# Fix additionalCosts
for cost in data.get("additionalCosts", []):
    if cost["title"] == "Data Sondir":
        cost["text"] = "Sangat wajib untuk menentukan kedalaman pengeboran yang tepat hingga mencapai lapisan tanah keras."
    if cost["title"] == "Mobilisasi Alat Bore Pile":
        cost["text"] = "Mesin mini crane: Rp2-3 juta | Strauss pile (bore pile manual): Rp1-1,5 juta."
    if cost["title"] == "Minimal Order":
        cost["text"] = "Mesin mini crane & gawangan: 200 meter | Strauss Pile (Manual): 100 meter (di bawah itu silakan hubungi kami)."

# Save changes
with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
