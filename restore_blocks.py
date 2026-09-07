import re

with open("scratch/original_2026.astro", "r", encoding="utf-8") as f:
    orig = f.read()

def extract_section(section_name):
    # Match the start comment to the next <!-- ===== or to <div class="articles-cta">
    regex = rf'(<!-- ===== {section_name} ===== -->.*?)(?=<!-- =====|<section class="project-examples-section">|<div class="articles-cta">|<footer)'
    match = re.search(regex, orig, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

factors = extract_section("FAKTOR YANG MEMPENGARUHI HARGA")
extra_costs = extract_section("ESTIMASI BIAYA TAMBAHAN")
projects = extract_section("CONTOH PROYEK NYATA")
benefits = extract_section("KEUNTUNGAN")
materials = extract_section("MATERIAL DARI KAMI")
commitment = extract_section("KOMITMEN & GARANSI")

print("Factors found:", bool(factors))
print("Extra costs found:", bool(extra_costs))
print("Projects found:", bool(projects))
print("Benefits found:", bool(benefits))
print("Materials found:", bool(materials))
print("Commitment found:", bool(commitment))

# Let's insert these into the current file!
with open("src/pages/harga/bore-pile-2026.astro", "r", encoding="utf-8") as f:
    current = f.read()

# We need to insert them right before the Area Layanan section
insert_idx = current.find('<!-- ===== AREA LAYANAN ===== -->')
if insert_idx == -1:
    print("Could not find insertion point!")
    exit(1)

content_to_insert = f"\n\n{factors}\n\n{extra_costs}\n\n{projects}\n\n{benefits}\n\n{materials}\n\n{commitment}\n\n"
new_content = current[:insert_idx] + content_to_insert + current[insert_idx:]

with open("src/pages/harga/bore-pile-2026.astro", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Restored successfully!")
