with open("src/data/kota/jakarta.json", "rb") as f:
    raw = f.read()

idx = raw.find(b"5m ")
print(raw[idx:idx+30])
