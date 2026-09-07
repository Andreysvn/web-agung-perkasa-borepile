with open("src/data/kota/jakarta.json", "rb") as f:
    raw = f.read()

idx = raw.find(b"<strong>Note:</strong>")
print(raw[idx-20:idx+20])
