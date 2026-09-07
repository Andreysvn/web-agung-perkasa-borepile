with open("src/data/kota/jakarta.json", "rb") as f:
    raw = f.read()

# Let's see exactly what bytes make up the detail string!
idx = raw.find(b"Bore pile mini crane")
print(raw[idx:idx+50])
