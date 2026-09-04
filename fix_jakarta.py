import json
import re

def fix_mojibake(text):
    if not isinstance(text, str): return text
    text = re.sub(r'\bO(\d+cm)\b', r'Ø\1', text)
    text = text.replace('A~', 'Ø').replace('Ã˜', 'Ø').replace('A-', 'Ø')
    return text

def recursively_fix_dict(d):
    if isinstance(d, dict):
        for k, v in d.items():
            if isinstance(v, (dict, list)): recursively_fix_dict(v)
            elif isinstance(v, str): d[k] = fix_mojibake(v)
    elif isinstance(d, list):
        for i in range(len(d)):
            if isinstance(d[i], (dict, list)): recursively_fix_dict(d[i])
            elif isinstance(d[i], str): d[i] = fix_mojibake(d[i])

with open("src/data/kota/jakarta.json", "r", encoding="utf-8") as f:
    data = json.load(f)
recursively_fix_dict(data)
with open("src/data/kota/jakarta.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Jakarta JSON cleaned.")
