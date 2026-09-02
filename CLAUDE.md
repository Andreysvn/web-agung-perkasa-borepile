# AGENTS.md

Catatan: `CLAUDE.md` adalah salinan file ini. Jika isinya berbeda, ikuti file ini. `README.md` hanyalah boilerplate starter Astro — abaikan.

## PERINGATAN PENTING UNTUK AI

**JANGAN ubah halaman tanpa konteks yang jelas.** Sebelumnya ada AI yang salah ubah halaman dan membuatnya acak-acakan. **Ikuti instruksi di bawah dengan tepat.**

---

## Project

Website **Agung Perkasa Borepile** (jasa bore pile & strauss pile, seluruh konten Bahasa Indonesia) di Astro. **Migrasi dari HTML legacy SELESAI** (2026-08-23, 33 halaman, terverifikasi identik dengan situs lama).

**Fase sekarang: Refactor untuk konsistensi, performa, dan kemudahan perawatan.**

### Target Pemilik

1. **Konsisten** - Semua halaman pakai layout yang sama
2. **Ringan** - Shared modules, tidak ada duplikasi
3. **Cepat** - Cache efektif, HTTP requests minimal
4. **Mudah dirawat** - Update 1 file → semua halaman ikut
5. **Design sama** - HTML output identik, CSS tetap sama

### Kontak

- **WhatsApp**: `6285710277854` (HANYA ini yang benar, jangan pakai nomor lain)
- **Domain**: `https://agungperkasaborepile.com`
- **Remote**: `github.com/Andreysvn/web-agung-perkasa-borepile`

---

## ATURAN PALING PENTING

### ❌ JANGAN LAKUKAN INI

1. **JANGAN ubah desain/konten** - Refactor hanya menyentuh kode, bukan tampilan
2. **JANGAN pakai nomor WA lain** - Hanya `6285710277854`
3. **JANGAN edit file CSS/JS legacy** di `public/css/` dan `public/js/` selama masih dipakai
4. **JANGAN tambah dependency baru** - Hanya pakai Astro dan vanilla JS
5. **JANGAN revert/stash/overwrite** working tree tanpa izin
6. **JANGAN commit/push** tanpa diminta
7. **JANGAN edit file .astro via PowerShell Get-Content/Set-Content** - Rusak encoding UTF-8

### ✅ WAJIB LAKUKAN INI

1. **Selalu test dengan `npm run build`** setelah ubah file
2. **Pastikan HTML output identik** dengan sebelum refactor
3. **Mulai dari Jakarta sebagai pilot** sebelum replikasi
4. **Backup dulu** sebelum ubah file besar
5. **Ikuti pola Jakarta** untuk semua halaman baru

---

## REFACTOR PLAN (Keputusan Pemilik 2026-09-02)

### Scope Awal

**41 halaman akan direfactor (kecuali beranda):**

| # | Kategori | Halaman | Jumlah |
|---|----------|---------|--------|
| 1 | **Kota** | Jakarta, Bandung, Bekasi, Bogor, Depok, Karawang, Semarang, Surabaya, Tangerang | 9 |
| 2 | **Harga** | 30cm, 40cm, 50cm, 60cm, 80cm | 5 |
| 3 | **Area** | Cikarang, Bintaro, BSD, Cibubur, Ciputat, Karawaci, Pamulang, Tangerang Selatan | 8 |
| 4 | **Artikel** | Index + 10 artikel | 11 |
| 5 | **Galeri** | Gallery + Gallery-2 | 2 |
| 6 | **Alat** | Index + 3 alat sub-pages | 4 |
| 7 | **Strauss Pile** | Jakarta | 1 |
| 8 | **Jasa** | Index (hub kota) | 1 |
| | **TOTAL** | | **41** |

**Beranda:** TIDAK DIREFACTOR (tetap pakai BaseLayout yang ada).

**Target akhir:** Ekspansi ke **100+ halaman local SEO** setelah fondasi solid.

### 4 Fase Pengerjaan

**⚠️ JANGAN skip urutan fase! Setiap fase WAJIB selesai dan diverifikasi sebelum lanjut.**

#### FASE 1 — Fondasi (Jakarta Pilot)

```
1. Buat shared scripts (6 files)
2. Buat KotaLayout.astro — membungkus SEMUANYA:
   - <head> lengkap (meta, OG, canonical, CSS)
   - Schema JSON-LD (Organization, LocalBusiness, Breadcrumb, FAQ, Service)
   - Navbar
   - <slot /> (konten spesifik kota)
   - Google Maps embed
   - Publisher box (identitas Agung Perkasa)
   - CtaBox
   - Footer
   - WhatsApp float + Scroll-top
   - JS scripts (navbar, faq, scrolltop, calculator)
3. Buat components (12 files)
4. Refactor JAKARTA sebagai PILOT menggunakan KotaLayout
   → Target: jakarta/index.astro menyusut ke ~30-50 baris
5. Test & verify Jakarta — npm run build lolos, tampilan identik
6. Standarisasi format JSON kota (buat template/schema wajib)
```

#### FASE 2 — Konsistensi (Replikasi + Bug Fix)

```
1. Replikasi Jakarta ke 8 kota lain (Bandung, Bekasi, dst.)
2. Replikasi ke 8 area flat (Bintaro, BSD, dst.)
3. Refactor halaman harga, artikel, galeri, alat, jasa, strauss pile
4. Fix bug performa yang sudah diketahui:
   - Font Awesome CDN → SVG inline di SEMUA halaman
   - Minify 3 CSS (artikel.css, gallery.css, proses.css)
   - Minify 6 JS files
   - Fix nomor WA salah di script.js (baris 225, 256)
5. Verifikasi semua 41 halaman: build lolos, tampilan identik dengan legacy
```

#### FASE 3 — Performa (PageSpeed Hijau)

```
1. Audit PageSpeed Insights (mobile & desktop) untuk halaman Jakarta
2. Optimasi berdasarkan hasil audit:
   - Critical CSS inline di <head> (above-the-fold)
   - Defer/async semua JS non-kritis
   - Lazy load semua gambar di bawah fold
   - Semua gambar format WebP dengan dimensi eksplisit (width/height)
   - Preload font/resource kritis
   - Eliminasi render-blocking resources
3. Optimasi Core Web Vitals:
   - LCP (Largest Contentful Paint) < 2.5s
   - INP (Interaction to Next Paint) < 200ms
   - CLS (Cumulative Layout Shift) < 0.1
4. Security headers (CSP, X-Frame-Options, X-Content-Type-Options)
5. Pastikan kompatibel Hostinger DAN Cloudflare Pages
6. Re-audit PageSpeed — target skor 90+ mobile, 95+ desktop
```

#### FASE 4 — Ekspansi 100+ Halaman Local SEO

```
1. Konversi halaman kota ke dynamic route [slug].astro
   → 1 file template + N file JSON = N halaman otomatis
   → Tambah kota baru = tambah 1 file JSON saja
2. Buat 100+ file JSON data kota/kecamatan/area baru
3. Setiap halaman otomatis dapat:
   - Kalkulator harga, tabel harga, FAQ
   - Maps embed, publisher box, schema markup
   - Navbar, footer, WhatsApp float konsisten
4. Pastikan konten unik per kota (BUKAN copy-paste thin content)
5. Auto-generate sitemap.xml untuk semua halaman
6. Verifikasi: build lolos, tidak ada thin content, schema valid
```

---

## TEKNIS REFACTOR

### 1. Shared Scripts (6 files)

```
src/scripts/shared/
├── navbar.js       → Navbar shrink, mobile menu, dropdown (~2KB)
├── faq.js          → FAQ accordion (~0.5KB)
├── scrolltop.js    → Scroll top button (~0.5KB)
├── calculator.js   → Kalkulator bore pile (~5KB)
├── lightbox.js     → Lightbox gallery (~1KB)
└── breadcrumb.js   → Breadcrumb active state (~0.5KB)
```

### 2. Layouts (6 files)

```
src/layouts/
├── KotaLayout.astro      ← 9 kota + 8 area = 17 halaman
├── HargaLayout.astro     ← 5 harga + 1 strauss pile = 6 halaman
├── ArtikelLayout.astro   ← 11 artikel
├── GaleriLayout.astro    ← 2 galeri
├── AlatLayout.astro      ← 4 alat
└── JasaLayout.astro      ← 1 jasa (hub kota)
```

### 3. Components (12 files)

```
src/components/
├── shared/
│   ├── Navbar.astro         → Navbar (props: activeItem)
│   ├── Footer.astro         → Footer (props: description)
│   ├── WhatsAppFloat.astro  → WhatsApp float button
│   ├── ScrollTop.astro      → Scroll top button
│   ├── CtaBox.astro         → CTA box section
│   ├── ArtikelSection.astro → Artikel section di atas footer
│   ├── Breadcrumb.astro     → Breadcrumb navigation
│   └── Hero.astro           → Hero section
├── city/
│   ├── Calculator.astro     → Kalkulator bore pile
│   ├── PriceTable.astro     → Tabel harga
│   ├── FAQ.astro            → FAQ accordion
│   └── Projects.astro       → Contoh proyek
```

---

## JAKARTA SEBAGAI PATOKAN

### File

```
src/pages/jasa/bore-pile/jakarta/index.astro (949 baris → ~80 baris setelah refactor)
```

### Struktur Section (Urutan Wajib)

1. Breadcrumb (Beranda > Jasa > Bore Pile Jakarta)
2. H1 + page-meta (update date, author, lokasi) + update-badge
3. CityHero (ilustrasi + deskripsi harga)
4. CityCalculator (kalkulator estimasi biaya)
5. PriceTable (tabel harga mesin + manual)
6. CityFactors (faktor yang mempengaruhi harga, 5 faktor)
7. CityAdditionalCosts (biaya tambahan)
8. CityTips (tips memilih diameter)
9. CityProjects (contoh hitungan proyek nyata + foto)
10. CityWhy (kenapa pilih Agung Perkasa)
11. CityEquipment (alat yang digunakan)
12. CityPortfolio (dokumentasi proyek)
13. CityKecamatan (wilayah layanan per kecamatan)
14. FaqSection (FAQ 6 pertanyaan)
15. CityArticles (artikel blog 3 artikel)
16. CityInternalLinks (link ke kota lain)
17. CtaBox ("Butuh jasa bore pile di Jakarta?" + tombol WA)
18. Maps (Google Maps embed)
19. Publisher box
20. Footer
21. WhatsApp float
22. Scroll-top button
23. Schema markup

### Data Jakarta

- **File**: `src/data/kota/jakarta.json` (380 baris)
- **Harga manual**: mulai Rp70.000/m (20cm)
- **Harga mesin**: mulai Rp120.000/m (30cm)
- **Kedalaman mesin**: 12-26 meter
- **Kedalaman manual**: 4-8 meter

### CSS & JS untuk Halaman Kota

- **CSS**: `/css/borepile-kota.css` (26.3KB, minified)
- **JS**: Shared scripts saja (navbar.js, faq.js, scrolltop.js, calculator.js)

---

## DATA SOURCES (Satu Sumber Data)

### File yang Sudah Ada

- `src/data/config.json` — identitas, kontak, sosial media
- `src/data/harga.json` — semua harga + `priceUpdatedAt`
- `src/data/borepile-kota.json` — data kota
- `src/data/galeri.json` — data galeri

### Prinsip

**Satu data, banyak halaman.** Kalau harga berubah, edit 1 file → semua halaman ikut.

---

## ARSITEKTUR ASTRO

- `astro.config.mjs` memakai `build.format: 'file'` → setiap route menghasilkan `/path.html`
- `site` diset ke domain produksi — jangan dihapus
- 44 halaman Astro total
- Satu sumber data wajib (jangan hardcode nilainya di halaman)

---

## PERFORMANCE

### Target

- **PageSpeed Insights**: 90+ mobile, 95+ desktop
- **Core Web Vitals**: LCP < 2.5s, INP < 200ms, CLS < 0.1
- **Total page weight**: < 500KB per halaman (termasuk gambar)

### Yang Sudah Dioptimasi

- Font Awesome CDN → SVG inline (7 ikon, hanya di Jakarta)
- GTM ditunda sampai `window load`
- Preconnect cdnjs/unpkg dibuang
- CSS/JS lokal sudah dikompres Brotli

### Yang Perlu Dioptimasi (Fase 2 & 3)

- [ ] 31 halaman lain masih pakai Font Awesome CDN → ubah ke SVG inline
- [ ] 3 CSS files belum minified (artikel.css, gallery.css, proses.css)
- [ ] 6 JS files belum minified
- [ ] WhatsApp number salah di `script.js` (lines 225, 256) → `6285710277854`
- [ ] Critical CSS inline di `<head>` untuk above-the-fold content
- [ ] Defer/async semua JS non-kritis
- [ ] Lazy load gambar di bawah fold (`loading="lazy"`)
- [ ] Semua gambar pakai format WebP + dimensi eksplisit (`width`/`height`) untuk CLS
- [ ] Preload resource kritis (CSS utama, font jika ada)
- [ ] Eliminasi render-blocking resources
- [ ] Hapus CSS/JS yang tidak terpakai (unused code)

---

## SEO TEKNIKAL

### Yang Sudah Ada

- Canonical di-hardcode ke domain produksi
- og:url = canonical di semua halaman
- Schema identitas (Organization/WebSite/LocalBusiness) di `src/lib/schema.js`
- Schema unik per halaman (Breadcrumb, FAQ, Service) ditulis inline
- Konten full Bahasa Indonesia, keyword lokal di setiap halaman kota

### Checklist Teknikal (Fase 2 & 3)

**Meta & Head:**
- [ ] Title tag unik per halaman (< 60 karakter)
- [ ] Meta description unik per halaman (< 160 karakter)
- [ ] Canonical URL benar di setiap halaman
- [ ] og:title, og:description, og:image di setiap halaman
- [ ] Favicon lengkap (sudah ada)

**Schema Markup:**
- [ ] Organization schema valid (sudah ada)
- [ ] LocalBusiness schema valid di setiap halaman kota
- [ ] BreadcrumbList schema di setiap halaman
- [ ] FAQPage schema di halaman yang punya FAQ
- [ ] Service schema di halaman jasa
- [ ] Validasi semua schema via Google Rich Results Test

**Crawlability & Indexing:**
- [ ] robots.txt benar (tidak memblokir halaman penting)
- [ ] sitemap.xml lengkap dan up-to-date (auto-generate untuk 100+ halaman)
- [ ] Tidak ada orphan pages (semua halaman punya internal link)
- [ ] Tidak ada broken links (internal maupun eksternal)
- [ ] Redirect 301 dari URL lama ke URL baru (`.htaccess` + `_redirects`)

**Gambar:**
- [ ] Semua gambar punya `alt` text deskriptif (Bahasa Indonesia)
- [ ] Format WebP untuk semua gambar konten
- [ ] Dimensi eksplisit (`width`/`height`) di setiap `<img>`
- [ ] Lazy loading untuk gambar di bawah fold

**Aksesibilitas (Mempengaruhi Skor Audit):**
- [ ] Heading hierarchy benar (H1 → H2 → H3, tidak loncat)
- [ ] Semua link punya teks deskriptif (bukan "klik di sini")
- [ ] Semua tombol/link interaktif punya `aria-label` jika perlu
- [ ] Kontras warna memenuhi WCAG AA (jangan ubah warna, cek saja)
- [ ] Semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)

**Security (Mempengaruhi Skor Audit):**
- [ ] HTTPS aktif (sudah ada via hosting)
- [ ] Security headers: `X-Content-Type-Options: nosniff`
- [ ] Security headers: `X-Frame-Options: DENY`
- [ ] Security headers: `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] Tidak ada mixed content (HTTP di halaman HTTPS)

---

## PERINTAH

- `npm run dev` — dev server di `localhost:4321`
- `npm run build` — verifikasi otomatis (wajib lolos)
- `npm run preview` — serve hasil build dari `dist/`
- Node >= 22.12.0

---

## ATURAN KERJA

1. 33 halaman hasil migrasi adalah baseline legacy: **jangan ubah desain/konten/URL/fungsinya** tanpa instruksi eksplisit
2. Perubahan seminimal mungkin; **jangan refactor di luar scope task**
3. Bug lama yang tidak menghalangi task: **biarkan dan laporkan**, jangan perbaiki sendiri
4. Semua konten dan copywriting dalam **Bahasa Indonesia**
5. Kalau membuat halaman baru, **gunakan pola Jakarta sebagai patokan**

---

## GIT

Working tree hampir selalu berisi perubahan WIP milik pengguna yang belum di-commit — **jangan revert, stash, atau overwrite**. Jangan commit/push tanpa diminta.

---

## REFERENSI

- Dokumentasi Astro: https://docs.astro.build
- Baca dulu sebelum menebak API Astro
