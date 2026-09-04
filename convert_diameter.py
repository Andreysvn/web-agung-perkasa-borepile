import os
import shutil

# Paths
base_dir = "src/pages/harga/bore-pile"
folders = ["30cm", "40cm", "50cm", "60cm", "80cm"]
template_file = f"{base_dir}/30cm/index.astro"

# We will read the 30cm file, convert it to a dynamic Astro component,
# wrap it in BaseLayout (or just keep its structure for now and parameterize it).
# Wait, actually, if I want to wrap it in BaseLayout, it requires extracting the head elements.
# Let's see the structure first.
