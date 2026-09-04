filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the inner <main id="main-content">
content = content.replace('<main id="main-content">', '', 1)

# The corresponding </main> was before the articles section.
# Wait, let's find </main> and remove it.
# Actually, looking at my previous extraction:
# <main id="main-content"> ... </main> <!-- ===== ARTIKEL SECTION ===== -->
# So there is a </main> in the middle of the file!
content = content.replace('</main>', '', 1)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed duplicate <main> tags!")
