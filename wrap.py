import re

with open("src/components/city/CityProjects.astro", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the img tag with a wrapped version
content = re.sub(
    r'(<img src=\{project\.image\} alt=\{project\.imageAlt \|\| \x27\x27\} loading="lazy" data-lightbox="true" style="cursor: pointer;" title="Klik untuk memperbesar">)',
    r'<div class="project-img-wrapper">\1</div>',
    content
)

with open("src/components/city/CityProjects.astro", "w", encoding="utf-8") as f:
    f.write(content)
