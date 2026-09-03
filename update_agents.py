import re

with open("AGENTS.md", "r", encoding="utf-8") as f:
    text = f.read()

# Replace Phase 1
phase1_old = """#### FASE 1 — Fondasi (Jakarta Pilot) - **SELESAI (Menunggu fix visual minor)**

- [x] Standarisasi format JSON & Props Komponen (7 prop mismatch diperbaiki).
- [x] Buat `KotaLayout.astro` (Membungkus Head, Meta, Navbar, Footer, Schema, Maps, CTA, WA, dll).
- [x] Buat komponen baru yang kurang (Breadcrumb, PageMeta, Maps, Publisher, dll).
- [x] Refactor `jakarta/index.astro` menjadi ringkas dengan `KotaLayout`.
- [x] Test build lolos (44 halaman, 0 error) dan HTML output terverifikasi memiliki 29/29 elemen penting.
- [ ] *Pending: Fix error tulisan (typo/mojibake/styling) berdasarkan temuan visual pemilik.*"""

phase1_new = """#### FASE 1 — Fondasi (Jakarta Pilot) - **SELESAI (100% APPROVED)**

- [x] Standarisasi format JSON & Props Komponen (7 prop mismatch diperbaiki).
- [x] Buat `KotaLayout.astro` (Membungkus Head, Meta, Navbar, Footer, Schema, Maps, CTA, WA, dll).
- [x] Buat komponen baru yang kurang (Breadcrumb, PageMeta, Maps, Publisher, dll).
- [x] Refactor `jakarta/index.astro` menjadi ringkas dengan `KotaLayout`.
- [x] Test build lolos (44 halaman, 0 error) dan HTML output terverifikasi.
- [x] **Fix Visual & Tipografi Selesai**: 
      - Mojibake (Ø, ×) dibersihkan dari seluruh JSON.
      - Scroll-top fix (Cyan #06b6d4, polos).
      - Kalkulator kontras (Bg biru pastel, form putih, garis putus-putus).
      - SVG Inline Icon (0 HTTP request untuk kaca pembesar dan ikon lain, tanpa FontAwesome).
      - Layout fix (CTA artikel masuk ke dalam container).
      - Copywriting EYD (spasi, tanda baca, huruf kapital dirapikan tanpa mengubah gaya bahasa asli pengguna)."""

text = text.replace(phase1_old, phase1_new)

# In case there are encoding differences, let's use regex
text = re.sub(r'#### FASE 1.*?temuan visual pemilik\.\*', phase1_new, text, flags=re.DOTALL)

with open("AGENTS.md", "w", encoding="utf-8") as f:
    f.write(text)

with open("CLAUDE.md", "w", encoding="utf-8") as f:
    f.write(text)
