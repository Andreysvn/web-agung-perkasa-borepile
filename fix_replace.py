import json

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    content = f.read()

# The actual characters from the `cat` output
content = content.replace("AEo", "Ø")
content = content.replace("A,?o'", "💡")

# Also let's just replace the word if there are still strange things
import re
# If it says "crane A...40cm" just make it "crane Ø40cm"
content = re.sub(r'crane A[^\s]*40cm', 'crane Ø40cm', content)
content = re.sub(r'crane A[^\s]*30cm', 'crane Ø30cm', content)

with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    f.write(content)

print("Replaced instances:")
with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    for line in f:
        if 'Ø' in line or '💡' in line or 'crane' in line:
            print(line.strip())
