with open("src/data/kota/jakarta.json", "rb") as f:
    raw = f.read()

# Replace double-encoded × with letter x
raw = raw.replace(b"\xc3\x83\xe2\x80\x94", b" x ")

with open("src/data/kota/jakarta.json", "wb") as f:
    f.write(raw)
