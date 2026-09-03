with open("dist/preview-desain.html", "r", encoding="utf-8") as f:
    content = f.read()
    
# Find index of AEo
idx = content.find("AEo")
if idx != -1:
    print(f"Found AEo: {content[max(0, idx-50):idx+50]}")
else:
    print("AEo not found")
    
idx2 = content.find("A,")
if idx2 != -1:
    print(f"Found A,: {content[max(0, idx2-50):idx2+50]}")
