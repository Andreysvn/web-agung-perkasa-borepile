with open("src/data/kota/jakarta.json", "rb") as f:
    raw = f.read()

# Replace "Ã˜" (Ø)
raw = raw.replace(b"\xc3\x83\xcb\x9c", b"Diameter ")
# Replace "ðŸ’¡" (💡)
raw = raw.replace(b"\xc3\xb0\xc5\xb8\xe2\x80\x9c\xc5\x92", b"\xf0\x9f\x92\xa1")

# Let's also check if there are any other common double-encodings
# Like "Ã¢â‚¬â€œ" (dash)
raw = raw.replace(b"\xc3\xa2\xe2\x82\xac\xe2\x80\x9c", b"-")

with open("src/data/kota/jakarta.json", "wb") as f:
    f.write(raw)
