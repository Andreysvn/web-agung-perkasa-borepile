import re
filepath = "src/pages/harga/bore-pile/30cm/index.astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix PriceTable
content = content.replace(
    '<PriceTable highlightDiameter="30" />',
    '<PriceTable localPrices={pricing} cityName="Jawa" highlightDiameter="30" />'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed PriceTable props!")
