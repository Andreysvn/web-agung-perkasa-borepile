import os
import glob

def check_file(file):
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            if '\ufffd' in content or 'AEo' in content or 'A,' in content:
                # Need to be careful with A, because it could be part of a real sentence, e.g. "CTA, "
                # So let's only flag if it looks like Mojibake
                import re
                if '\ufffd' in content:
                    print(f"Found \\ufffd in {file}")
                if 'AEo' in content:
                    print(f"Found AEo in {file}")
                if re.search(r'A,\?o', content):
                    print(f"Found A,?o in {file}")
    except Exception as e:
        pass

for ext in ['*.astro', '*.json', '*.js', '*.css']:
    for f in glob.glob(f"src/**/{ext}", recursive=True):
        check_file(f)
