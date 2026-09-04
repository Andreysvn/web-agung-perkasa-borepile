import re

with open("scratch/original_2026.astro", "r", encoding="utf-8") as f:
    orig = f.read()

# Extract from <main id="main-content"> to <Footer />
match = re.search(r'(<main id="main-content">.*?)\s*<Footer />', orig, re.DOTALL)
if not match:
    print("Could not find main content block!")
    exit(1)

main_content = match.group(1)

# Current file
with open("src/pages/harga/bore-pile-2026.astro", "r", encoding="utf-8") as f:
    current = f.read()

header_match = re.search(r'(---.*?<main id="main-content">)', current, re.DOTALL)
if not header_match:
    print("Could not find header in current file!")
    exit(1)
header_content = header_match.group(1)

footer_match = re.search(r'(<script type="application/ld\+json".*?</BaseLayout>)', current, re.DOTALL)
if not footer_match:
    print("Could not find footer scripts in current file!")
    exit(1)
footer_content = footer_match.group(1)

# Replace RAW HTML Maps/Publisher/FAQ with components in main_content
# Maps
map_regex = r'<!-- ===== MAPS ===== -->.*?</div>\s*</div>\s*</div>'
main_content = re.sub(map_regex, '<GoogleMapsEmbed cityName="Jakarta" />', main_content, flags=re.DOTALL)

# Publisher
pub_regex = r'<!-- ===== PUBLISHER BOX ===== -->.*?</div>\s*</div>\s*</div>'
main_content = re.sub(pub_regex, '<PublisherBox />', main_content, flags=re.DOTALL)

# FAQ
faq_regex = r'<!-- ===== FAQ ===== -->.*?</section>'
main_content = re.sub(faq_regex, '<FaqSection \n            sectionTitle="Pertanyaan Umum Seputar Harga Bore Pile 2026"\n            faq={pricingFaqs} \n            addSchema={false} \n        />', main_content, flags=re.DOTALL)

# Remove the opening tag since it's already in header_content
main_content = main_content.replace('<main id="main-content">', '', 1)

final_content = header_content + "\n" + main_content + "\n    \n    " + footer_content

with open("src/pages/harga/bore-pile-2026.astro", "w", encoding="utf-8") as f:
    f.write(final_content)

print("Restored ALL original content sections successfully!")
