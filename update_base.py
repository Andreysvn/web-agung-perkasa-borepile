filepath = "src/layouts/BaseLayout.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the prop
content = content.replace(
    'description?: string;',
    'description?: string;\n  disableGlobalCss?: boolean;'
)
content = content.replace(
    'includeWebsiteSchema = true',
    'includeWebsiteSchema = true,\n    disableGlobalCss = false'
)

# Update the css inclusion
content = content.replace(
    '{!isV2 && <link rel="stylesheet" href="/css/style.css" />}',
    '{!isV2 && !disableGlobalCss && <link rel="stylesheet" href="/css/style.css" />}'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated BaseLayout.astro to support disableGlobalCss!")
