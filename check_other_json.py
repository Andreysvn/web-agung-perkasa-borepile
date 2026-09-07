files = ["src/data/harga.json", "src/data/borepile-kota.json", "src/data/faq-shared.json", "src/data/galeri.json"]
for filepath in files:
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            count = content.count("\ufffd")
            if count > 0:
                print(f"{filepath} has {count} errors")
    except Exception as e:
        pass
