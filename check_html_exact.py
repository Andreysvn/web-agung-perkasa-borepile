with open("dist/preview-desain.html", "r", encoding="utf-8") as f:
    content = f.read()
    
# Find index of \ufffd
idx = content.find("\ufffd")
if idx != -1:
    print(f"Found replacement char: {content[max(0, idx-50):idx+50]}")
