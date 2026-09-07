with open("src/data/kota/jakarta.json", "rb") as f:
    raw = f.read()

idx = raw.find(b"Note:</strong> Harga")
print(raw[idx-20:idx+20])
