import os

filepath = "src/pages/harga/bore-pile/[diameter].astro"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix PriceTable props
content = content.replace('<PriceTable />', '<PriceTable localPrices={pricing} cityName="Jawa" />')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Props added to PriceTable!")
