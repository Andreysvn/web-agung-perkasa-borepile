import re

filepath = "src/pages/harga/bore-pile-2026.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add PriceTable import
if 'import PriceTable' not in content:
    content = content.replace("import BaseLayout from '../../layouts/BaseLayout.astro';", "import BaseLayout from '../../layouts/BaseLayout.astro';\nimport PriceTable from '../../components/shared/PriceTable.astro';")

# Regex to match the entire table-heading section
table_regex = r'<section aria-labelledby="table-heading">.*?</section>'
content = re.sub(table_regex, '<PriceTable localPrices={pricing} cityName="Jawa" />', content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced manual tables with PriceTable component!")
