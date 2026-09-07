import os

filepath = "src/layouts/BaseLayout.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add <slot name="head" /> right before </head>
if '<slot name="head" />' not in content:
    content = content.replace('</head>', '    <slot name="head" />\n</head>')
    
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added head slot to BaseLayout!")
