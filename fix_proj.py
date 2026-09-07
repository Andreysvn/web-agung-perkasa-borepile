with open("src/components/city/CityProjects.astro", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    '<img src={project.image} alt={project.imageAlt || \'\'} loading="lazy">',
    '<img src={project.image} alt={project.imageAlt || \'\'} loading="lazy" data-lightbox="true" style="cursor: pointer;" title="Klik untuk memperbesar">'
)

# Might also have a broken string from the previous failed replacement, let's fix it by completely rewriting that line if it's broken.
import re
# First, let's just restore the file if it's badly broken.
# Actually let's just do a regex replace that covers any broken state.
content = re.sub(r'<img src=\{project\.image\} alt=\{project\.imageAlt.*?>', '<img src={project.image} alt={project.imageAlt || \'\'} loading="lazy" data-lightbox="true" style="cursor: pointer;" title="Klik untuk memperbesar">', content)

with open("src/components/city/CityProjects.astro", "w", encoding="utf-8") as f:
    f.write(content)
