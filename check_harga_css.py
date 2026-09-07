with open("public/css/harga.css", "r", encoding="utf-8") as f:
    lines = f.readlines()

def print_css_block(start_marker):
    capture = False
    for line in lines:
        if start_marker in line:
            capture = True
        if capture:
            print(line.rstrip())
            if "}" in line:
                capture = False
                break

print("--- BREADCRUMB ---")
print_css_block(".breadcrumb")
print("--- TITLE ---")
print_css_block(".page-title")
print("--- META ---")
print_css_block(".page-meta")
print("--- ILLUSTRATION ---")
print_css_block(".illustration-row")
