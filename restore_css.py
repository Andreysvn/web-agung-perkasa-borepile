import os

# Base files
with open("public/css/borepile-kota.css", "r", encoding="utf-8") as f:
    kota = f.read()

with open("public/css/modern-draft-arsip.css", "r", encoding="utf-8") as f:
    draft = f.read()

# I will remove the duplicate NAVBAR and FOOTER section from the draft BEFORE appending it, 
# because borepile-kota.css ALREADY HAS the Navbar and Footer styles.
# Wait, let's just append them as before, because that's what was working!
# The only issue earlier was the CTA WhatsApp button color on Jakarta, which I've fixed in borepile-kota.css!

with open("public/css/modern-harga.css", "w", encoding="utf-8") as f:
    f.write(kota)
    f.write("\n\n/* MODERN DRAFT APPENDED */\n\n")
    f.write(draft)
    
    # Extra necessary styles
    f.write("""
/* LEGACY GRID FALLBACKS */
.area-grid-detail {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
@media (max-width: 768px) {
  .area-grid-detail {
    grid-template-columns: 1fr;
  }
}
.maps-container {
  margin: 2rem 0;
}
.publisher-box {
  background: var(--bg-surface);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin: 2rem 0;
  border-left: 4px solid var(--brand-primary);
}
""")

print("Restored modern-harga.css from borepile-kota.css + draft!")
