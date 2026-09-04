import re

with open("src/pages/harga/bore-pile-2026.astro", "r", encoding="utf-8") as f:
    orig = f.read()

orig = orig.replace('<CityCalculator />', '<CityCalculator pricing={pricing} />')
orig = orig.replace('<PriceTable />', '<PriceTable pricing={pricing} />')

with open("src/pages/harga/bore-pile-2026.astro", "w", encoding="utf-8") as f:
    f.write(orig)

print("Fixed component props!")
