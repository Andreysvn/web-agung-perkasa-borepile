# Spec Desain Renovasi — Agung Perkasa Borepile

Tanggal: 2026-08-24
Status: Disetujui pemilik (arah visual Bold Navy, halaman pilot harga 2026)

## 1. Latar belakang & tujuan

Situs hasil migrasi (33 halaman Astro) masih memakai kulit legacy: 8 file CSS
(~235 KB unminified, banyak rule mati & duplikasi navbar/footer) dan 8 file JS
(~104 KB). Renovasi mengganti kulit menjadi desain baru yang:

- terlihat profesional dan modern satu brand (navy + aksen oranye),
- cepat di mobile — **PageSpeed Insights mobile wajib hijau**,
- ringan dirawat: data-driven, satu template untuk banyak halaman,
- tanpa bug, konsisten antar halaman, **bukan "AI slop"**.

Rilis bertahap per batch. Selama migrasi, halaman lama & baru hidup
berdampingan tanpa saling menyentuh.

## 2. Keputusan yang sudah dikunci

Dari AGENTS.md (tidak dibuka lagi):

1. Biru = warna utama, campuran aksen oranye, logo dipertahankan.
2. Rilis bertahap per halaman/batch; deploy kapan saja aman.
3. Renovasi = ganti kulit. Teks/gambar/struktur konten tiap halaman tetap
   persis; optimasi konten adalah fase terpisah sesudahnya.
4. Vanilla CSS + design tokens (`src/styles/tokens.css`) + styling scoped
   per-komponen Astro. **NOL dependensi baru.**
5. Isolasi total: `public/css/*` dan `public/js/*` tidak boleh diedit selama
   masih ada halaman yang memakainya.
6. `BaseLayout` pintu tunggal; blok reusable: Hero, SectionTitle, Card,
   PriceTable, FAQ accordion, CTA bar, Breadcrumb, ArtikelCard.
7. Target Core Web Vitals hijau mobile (LCP < 2,5 dtk, CLS < 0,1).
8. SEO tidak boleh turun: URL, title, description, canonical, heading,
   schema JSON-LD, isi teks identik.

Dari sesi brainstorming 2026-08-24 (tambahan):

9. Font: **Plus Jakarta Sans** (ringan, mudah dibaca). Kalau pemilik tidak
   suka, ganti cukup dengan menukar file font + satu blok `@font-face`.
10. Ikon: halaman v2 pakai **inline SVG** (tanpa Font Awesome CDN).
    Beranda boleh tetap FA sampai gilirannya di Batch 6.
11. Arah visual: **Bold Navy** — hero/section gelap navy dengan teks putih,
    konten di bawahnya terang. Bukan gradasi norak ala AI.
12. Tombol WhatsApp tetap **hijau WhatsApp** (`--apx-wa: #25d366`, hover
    `#1da851`), kontras teks putih. Oranye hanya CTA non-WA.
13. Halaman pertama yang pindah kulit: **`/harga/bore-pile-2026.html`**.
14. Kalkulator harga ditulis ulang vanilla; angka dibaca dari
    `src/data/harga.json` saat build — nol harga hardcode.

## 3. Design tokens

File: `src/styles/tokens.css` (CSS custom properties pada `:root`, prefix
`--apx-`).

### Warna

| Token | Nilai | Pemakaian |
|---|---|---|
| `--apx-navy` | `#0d2b52` | Hero gelap, navbar mobile, footer, blok hasil kalkulator |
| `--apx-navy-2` | `#1a3a6e` | Hover/gradasi halus di blok navy, tabel header |
| `--apx-blue` | `#3498db` | Link, ikon info, aksen sekunder |
| `--apx-orange` | `#d35400` | CTA utama non-WA, angka harga, label section |
| `--apx-orange-2` | `#b84700` | Hover oranye |
| `--apx-wa` | `#25d366` | Tombol/konten WhatsApp |
| `--apx-wa-2` | `#1da851` | Hover WA |
| `--apx-tint` | `#f0f7ff` | Background section genap |
| `--apx-bg` | `#ffffff` | Background dasar |
| `--apx-text` | `#1e293b` | Teks utama |
| `--apx-muted` | `#64748b` | Teks sekunder |
| `--apx-border` | `#e2e8f0` | Garis kartu/tabel |

Kontras minimum AA (4.5:1) untuk teks body; putih di atas navy ≈ 13:1;
putih di atas oranye hanya untuk teks ≥ 18px bold / tombol besar.

### Tipografi

- Keluarga: `"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif`.
- File WOFF2 subset latin di `public/fonts/`; preload 2 weight: 400 & 800.
  Weight lain (500/600/700) dimuat via `@font-face` biasa,
  `font-display: swap`. Total transfer font ≤ ~120 KB.
- Skala (desktop → mobile turun satu tingkat): 14 / 16 / 18 / 22 / 28 / 36 /
  48 px. Line-height 1.6 body, 1.2 heading. H2 navy `#0d2b52` bold 800.

### Spasi, radius, shadow

- Spasi kelipatan 4px; section padding desktop 72px, mobile 48px.
- Radius: 8px (input/kecil), 12px (kartu), 16px (panel besar).
- Shadow 2 level: `0 1px 3px rgb(13 43 82 / .08)` dan
  `0 8px 24px rgb(13 43 82 / .12)`.
- Container maksimum 1140px, padding sisi 20px (16px mobile).

## 4. Komponen (kulit Bold Navy)

Semua komponen di `src/components/ui/`, styling scoped di file masing-masing,
ikon via `Icon.astro`.

- **Icon.astro** — peta `name → path SVG inline`, stroke `currentColor`,
  ukuran via prop. Hanya ikon yang benar-benar dipakai. Tanpa CDN.
- **Navbar** — putih solid, logo kiri, link tengah, tombol "Chat WhatsApp"
  hijau kanan. Mobile: hamburger → panel navy full. Sticky top dengan border
  bawah tipis. Markup & perilaku JS sama seperti komponen existing, hanya
  kulit baru.
- **Hero** — blok navy `#0d2b52`: H1 putih besar, subteks abu terang
  (`#cbd5e1`), dua tombol (oranye = aksi utama, outline putih = sekunder),
  foto proyek asli dalam panel membulat di kanan/di bawah (bukan background
  blur generik). Pola dekoratif minimal: lingkaran garis tipis opacity rendah.
- **SectionTitle** — label kecil uppercase oranye + H2 navy 800 +
  subteks muted opsional.
- **Card layanan/kota/info (InfoCard)** — putih, border `--apx-border`,
  radius 12px, ikon SVG biru, judul navy, border-left oranye 3px pada varian
  highlight.
- **PriceTable** — wrapper `.table-responsive`; header navy teks putih;
  baris selang-seling putih/`--apx-tint`; kolom harga oranye bold;
  sticky first row saat scroll horizontal mobile.
- **FaqAccordion** — `<details>/<summary>` native, ikon plus/minus CSS,
  animasi rotasi ikon saja. Nol JS.
- **CtaBar** — strip navy sebelum footer: judul putih + tombol oranye
  ("Minta Penawaran") + hijau ("Chat WhatsApp").
- **Breadcrumb** — link muted, item terakhir navy semibold, chevron SVG kecil.
- **WhatsAppFloat** — bulat hijau `--apx-wa` kanan-bawah, ikon WA SVG putih,
  label muncul saat hover desktop. Perilaku muncul setelah scroll tetap sama.
- **ScrollTop** — bulat navy, panah putih; perilaku sama.
- **ArtikelCard** — thumbnail rasio 16:9 dengan `width/height`, judul navy,
  tanggal muted, badge kategori oranye.

## 5. Arsitektur teknis

```
src/styles/tokens.css      token warna/font/spasi/radius/shadow
src/styles/base.css        reset mini + @font-face + tipografi dasar
src/components/ui/*.astro  Hero, SectionTitle, InfoCard, PriceTable,
                           FaqAccordion, CtaBar, Breadcrumb, ArtikelCard, Icon
src/layouts/BaseLayout.astro
src/pages/harga/bore-pile-2026.astro   ← pilot Batch 1
```

- **BaseLayout** mendapat prop `design?: 'legacy' | 'v2'` (default
  `'legacy'`). `'v2'` → muat `tokens.css` + `base.css`, **tidak** memuat
  `/css/style.css` maupun `/js/script.js`; Navbar/Footer/WAFloat/ScrollTop
  otomatis berkulit baru dengan script kecil masing-masing.
  `'legacy'` → perilaku sekarang persis (32 halaman lain tidak tersentuh).
- Head/meta/schema/analytics GTM/GTag/Ahrefs **tidak berubah** di kedua mode.
- Halaman v2 menuliskan layout section dengan class `apx-*` di markup halaman
  sendiri (scoped `<style>` di halaman), komponen ui punya style scoped
  internal.
- **Isolasi besi:** nol edit `public/css/*` & `public/js/*` sampai semua
  halaman pindah (Batch 6). Tidak ada selector baru yang menembus file legacy.
- **JS:** Halaman `v2` **tidak memuat** `/js/script.js` legacy. Perilaku
  interaktif ditulis ulang sebagai script vanilla kecil yang hidup di
  komponennya masing-masing (di-bundle Astro, defer otomatis): toggle menu
  mobile Navbar, muncul-setelah-scroll WhatsAppFloat & ScrollTop. FAQ pakai
  `<details>` native (nol JS). Kalkulator = satu script vanilla di halaman
  pilot; angka dibaca dari `src/data/harga.json` lewat frontmatter
  (data-attribute JSON), nol harga hardcode.

## 6. Aturan anti "AI slop"

- Foto asli proyek/alat dari `public/imgs/` — bukan ilustrasi/placeholder.
- Angka nyata dari konten existing (kedalaman 30m, beban 15–120 ton, harga
  aktual) — konten tidak direkayasa ulang saat migrasi.
- Gradasi dilarang kecuali navy→navy-2 sangat halus pada blok hero/CTA.
- Tanpa emoji di UI, tanpa badge "✨ NEW", tanpa glow/neumorphism.
- Hierarki jelas: satu H1, urutan heading logis, satu aksi utama per section.
- Ritme antar-section konsisten: terang → tint → terang; blok navy hanya
  hero, CTA bar, footer.

## 7. Performa & budget

Per halaman v2 (gzip/transfer kira-kira):

| Item | Budget |
|---|---|
| CSS ter-minify (Astro otomatis) | ≤ 25 KB |
| JS interaktif | ≤ 10 KB |
| Font | ≤ 120 KB, preload 400+800 saja |
| Request pihak ketiga untuk UI | 0 (FA & Google Fonts CDN tidak dimuat) |

- Semua `<img>` wajib `width` + `height` + `loading="lazy"`, kecuali gambar
  hero: `fetchpriority="high"` tanpa lazy.
- LCP target: elemen hero (teks/foto) < 2,5 dtk mobile; CLS < 0,1.
- Verifikasi tiap batch: PageSpeed Insights (mobile) skor hijau pada halaman
  pilot sebelum lanjut batch berikutnya.

## 8. Jaminan SEO

Saat sebuah halaman pindah ke v2:

1. URL tidak berubah (`build.format: 'file'`, `.htaccess` tidak disentuh).
2. Title, description, canonical, robots meta, og/twitter identik.
3. Urutan & isi heading identik; semua teks paragraf/daftar/tabel identik.
4. Blok JSON-LD halaman (BreadcrumbList, Product/Service, FAQPage, dsb.)
   disalin apa adanya; schema identitas dari `BaseLayout` otomatis sama.
5. Alt text gambar dipertahankan; gambar sama URL-nya.
6. `public/sitemap.xml` & `robots.txt` tidak berubah (tidak ada URL baru).

Verifikasi: build lama vs baru dibandingkan dengan teknik
`verify-page.ps1` (ada di riwayat git): ekstrak title/description/canonical/
heading/schema/teks dari HTML hasil build, diff harus kosong.

## 9. Rencana batch

| Batch | Isi | Selesai jika |
|---|---|---|
| **1 (pilot)** | tokens + base.css + Icon + Navbar/Footer/WAFloat/ScrollTop v2 + komponen ui inti + migrasi `harga/bore-pile-2026.html` | Build lolos; konten/schema identik; PSI mobile hijau; cek visual pemilik OK |
| 2 | 5 halaman harga diameter (30/40/50/60/80cm) reuse pola pilot | idem, tanpa PSI wajib (spot-check) |
| 3 | Hub `/jasa/`, hub `/jasa/bore-pile/`, 9 halaman kota | idem |
| 4 | 8 halaman area flat | idem |
| 5 | Index artikel + 3 artikel + galeri + alat (ArtikelCard) | idem |
| 6 | Homepage (modal perbandingan dsb.) + hapus CSS/JS legacy + bersihkan `.htaccess` bila perlu | Legacy files tidak lagi direferensikan |

Setiap batch: `npm run build` wajib lolos, verifikasi identik, cek visual
pemilik sebelum lanjut. Berhenti kapan pun aman karena halaman lama tetap
utuh.

## 10. Yang tidak termasuk (out of scope)

- Optimasi/menulis ulang konten (fase terpisah setelah renovasi).
- Konsolidasi nomor WA ganda (menunggu keputusan pemilik).
- Perbaikan link internal mati warisan legacy yang halamannya belum ada.
- Menambah dependensi/framework/library apa pun.
