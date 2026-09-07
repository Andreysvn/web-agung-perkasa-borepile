import os
import glob

html_files = glob.glob('dist/**/*.html', recursive=True)
found = False
for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            if 'AEo' in content or 'A,' in content or '\ufffd' in content:
                print(f"Found anomaly in {file}")
                found = True
    except Exception as e:
        pass

if not found:
    print("No anomalies found in any HTML file in dist/")
