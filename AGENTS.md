# AGENTS.md

File ini adalah panduan utama untuk seluruh AI Agent yang bekerja pada project ini
(Claude, OpenCode, Cursor, dan agent lainnya).

File ini merupakan **SOURCE OF TRUTH** untuk aturan development, migrasi,
preservasi konten, routing, SEO, data, asset, dan standar pengerjaan project.

---

# 1. PROJECT

Project ini adalah migrasi website:

**Agung Perkasa Borepile**

Bidang usaha:

* Bore Pile
* Strauss Pile
* Jasa Pondasi
* Deep Foundation
* Construction Services

Bahasa website:

**Bahasa Indonesia**

Framework target:

**Astro**

Website lama:

**HTML + CSS + JavaScript statis**

Website legacy yang berada di dalam project merupakan **SOURCE OF TRUTH**
untuk:

* desain
* layout
* struktur HTML
* konten
* gambar
* asset
* navigasi
* CTA
* tabel
* FAQ
* kalkulator
* fitur JavaScript
* metadata
* schema
* internal linking

## Prinsip Utama

**PROJECT INI ADALAH MIGRASI, BUKAN REDESIGN.**

Tujuan utama adalah memindahkan website lama ke Astro dengan hasil
yang semirip mungkin terhadap versi legacy secara:

* visual
* struktur
* konten
* fungsi
* URL
* SEO

Jika implementasi Astro berbeda dari versi legacy, jangan langsung menganggap
versi Astro lebih baik.

Gunakan versi legacy sebagai referensi utama.

---

# 2. PRIORITAS KERJA

Urutan prioritas:

1. Preserve konten website lama.
2. Preserve desain website lama.
3. Preserve struktur dan fitur website lama.
4. Perbaiki error migrasi Astro.
5. Perbaiki fungsi yang rusak.
6. Pertahankan URL lama.
7. Pertahankan dan perbaiki SEO teknis.
8. Pastikan data konsisten.
9. Pastikan responsive.
10. Cleanup kecil hanya jika aman dan tidak mengubah hasil akhir.

## Jangan melakukan:

* redesign
* mengganti warna
* mengganti font
* mengganti layout
* mengganti spacing tanpa alasan
* mengganti copywriting tanpa instruksi
* menghapus section
* menghapus konten
* menghapus gambar
* menghapus CTA
* menghapus tabel
* menghapus FAQ
* menghapus kalkulator
* menghapus internal link
* menghapus metadata
* menghapus schema
* mengganti harga tanpa sumber
* mengganti alamat tanpa sumber
* mengganti nomor WhatsApp tanpa sumber
* mengganti identitas bisnis
* mengganti URL tanpa alasan
* membuat data palsu
* membuat portofolio palsu
* membuat schema palsu
* menambahkan framework JavaScript baru
* melakukan refactor besar di luar scope task
* mengubah konfigurasi Astro tanpa alasan kuat

Jika menemukan masalah di luar scope task:

**jangan langsung mengubahnya.**

Catat di laporan akhir.

---

# 3. PERINTAH DASAR

## Development

```bash
npm run dev
```

Dev server:

```text
localhost:4321
```

Sebelum menjalankan dev server:

* cek apakah server sudah berjalan
* jangan menjalankan dua dev server sekaligus

## Build

```bash
npm run build
```

`npm run build` adalah verifikasi otomatis utama project.

Task tidak boleh dinyatakan selesai apabila build gagal.

## Preview

```bash
npm run preview
```

## Node

Gunakan versi Node yang ditentukan oleh `package.json`.

Minimum saat ini:

```text
Node >= 22.12.0
```

---

# 4. TEKNOLOGI

Framework utama:

**Astro**

Arsitektur target:

**Mostly Zero-JS**

Gunakan:

* Astro
* HTML
* CSS
* Vanilla JavaScript

JavaScript hanya digunakan jika memang diperlukan untuk:

* mobile navigation
* calculator
* FAQ accordion
* filter
* slider
* modal
* interactive UI
* tracking
* fitur legacy yang memang membutuhkan JavaScript

## Jangan menggunakan

* React
* Vue
* Svelte
* jQuery
* framework frontend tambahan

untuk sesuatu yang dapat dilakukan dengan Astro atau browser API standar.

Jangan menambahkan dependency baru tanpa alasan yang jelas.

---

# 5. LEGACY WEBSITE = SOURCE OF TRUTH

Sebelum memigrasikan atau memperbaiki halaman:

**WAJIB membaca halaman legacy yang sesuai.**

Referensi legacy utama:

```text
public/
```

Jika tersedia:

```text
public/save web design juni 2026/
public/legacy-index.html
```

Jangan mengandalkan:

* ingatan
* asumsi
* halaman kota lain
* template lain
* hasil implementasi sebelumnya

## Workflow wajib

Sebelum membuat atau memperbaiki halaman:

1. Temukan file HTML legacy yang sesuai.
2. Baca seluruh HTML.
3. Identifikasi CSS yang digunakan.
4. Identifikasi JavaScript yang digunakan.
5. Identifikasi gambar/asset yang digunakan.
6. Identifikasi metadata SEO.
7. Identifikasi schema.
8. Identifikasi internal link.
9. Identifikasi konten dan struktur.
10. Baru implementasikan atau perbaiki versi Astro.

## Dilarang

Jangan melakukan:

```text
copy halaman Jakarta
â†’ ganti "Jakarta" menjadi "Bekasi"
â†’ selesai
```

Setiap halaman harus dibandingkan dengan halaman legacy-nya sendiri.

---

# 6. MODEL MIGRASI

Website legacy dan Astro boleh hidup berdampingan selama proses migrasi.

### Halaman belum dimigrasikan

Tetap gunakan halaman legacy.

### Halaman sudah dimigrasikan

Gunakan versi Astro.

Jangan menghapus halaman legacy secara sembarangan.

Migrasi dilakukan secara bertahap dan per route.

Untuk setiap halaman yang dimigrasikan:

* pertahankan URL
* pertahankan konten
* pertahankan desain
* pertahankan asset
* pertahankan fungsi
* pertahankan metadata
* pertahankan struktur SEO

---

# 7. ROUTING & URL

URL merupakan bagian penting dari migrasi SEO.

Sebelum membuat route Astro:

1. Periksa URL legacy.
2. Periksa struktur folder legacy.
3. Periksa `astro.config.mjs`.
4. Periksa `build.format`.
5. Periksa route Astro yang sudah ada.
6. Tentukan URL final.
7. Pastikan canonical menggunakan URL final tersebut.

## Build format

Project menggunakan:

```js
build: {
  format: 'file'
}
```

apabila konfigurasi tersebut masih aktif.

Dengan format ini, route dapat menghasilkan:

```text
/path.html
```

bukan:

```text
/path/index.html
```

## Prinsip

Jika URL legacy adalah:

```text
/jasa/bore-pile-jakarta.html
```

usahakan URL tersebut tetap digunakan.

Jika URL legacy menggunakan:

```text
/x/index.html
```

dan route Astro final menjadi:

```text
/x.html
```

maka URL lama dapat diarahkan satu arah ke URL baru.

## Redirect rules

Redirect harus:

* satu arah
* tidak loop
* tidak chain berlebihan
* tidak bertentangan dengan canonical

Jangan membuat:

```text
A â†’ B â†’ C
```

jika:

```text
A â†’ C
```

sudah cukup.

---

# 8. CANONICAL

Setiap halaman production harus mempunyai satu canonical yang benar.

Domain production:

```text
https://agungperkasaborepile.com
```

Canonical harus konsisten dengan:

* URL final
* `og:url`
* BreadcrumbList
* schema
* internal linking

Jangan menghasilkan:

```text
http://localhost:4321/...
```

atau URL development lainnya sebagai canonical production.

---

# 9. SINGLE SOURCE OF TRUTH DATA

Gunakan data terstruktur dari file berikut jika relevan:

### Harga

```text
src/data/harga.json
```

### Konfigurasi perusahaan

```text
src/data/config.json
```

### Data kota

```text
src/data/borepile-kota.json
```

### Arsip hydraulic

```text
src/data/harga-arsip-hidrolik.json
```

Data hydraulic adalah arsip.

**Tidak boleh dirender di halaman aktif.**

Namun:

```text
src/data/harga-arsip-hidrolik.json
```

**jangan dihapus.**

---

# 10. BISNIS & HARGA

## Hydraulic / SANY

Metode Hydraulic/SANY:

**Sudah tidak digunakan pada layanan aktif.**

Karena itu:

* hapus referensi Hydraulic/SANY dari halaman aktif
* jangan menampilkan harga hydraulic aktif
* jangan menampilkan alat hydraulic sebagai layanan aktif
* jangan memasukkan hydraulic ke kalkulator aktif

Tetapi:

```text
src/data/harga-arsip-hidrolik.json
```

harus tetap dipertahankan sebagai arsip.

## Harga Manual

Harga Manual resmi saat ini:

```text
Rp75.000/m
```

## Gawangan

Minimum order Gawangan:

```text
200 meter
```

Gunakan data pusat jika informasi tersebut sudah tersedia di:

```text
src/data/harga.json
```

## Konflik Harga

Jika ditemukan:

* harga paragraf berbeda
* harga tabel berbeda
* harga calculator berbeda
* harga schema berbeda
* harga JSON berbeda

jangan memilih secara asal.

Cari sumber kebenaran.

Prioritas:

1. Data pusat resmi.
2. Legacy jika merupakan data historis.
3. Konteks halaman.
4. Jika masih ambigu â†’ laporkan.

---

# 11. CONTENT PRESERVATION

Semua konten legacy harus dipertahankan kecuali ada instruksi eksplisit
untuk mengubahnya.

Pertahankan:

* H1
* H2
* H3
* H4
* paragraf
* list
* tabel
* FAQ
* portfolio
* contoh proyek
* CTA
* WhatsApp
* Google Maps
* artikel
* internal link
* external link
* gambar
* alt text
* navbar
* footer
* area layanan
* kalkulator
* metadata
* schema

## Copywriting

Jangan rewriting copywriting hanya karena:

* lebih SEO-friendly
* terdengar lebih profesional
* terlihat lebih natural
* ingin menambah keyword

Selama task adalah migrasi/bug fixing:

**pertahankan teks legacy.**

Jika menemukan typo yang tidak menyebabkan error:

laporkan terlebih dahulu daripada mengubah isi.

---

# 12. HALAMAN KOTA / AREA LAYANAN

Aturan ini berlaku untuk seluruh city/area pages.

Contoh:

* Jakarta
* Bekasi
* Depok
* Tangerang
* Bogor
* Tangerang Selatan
* Bandung
* Karawang
* Cikarang
* Surabaya
* dan wilayah lain yang tersedia di project

Gunakan:

```text
src/data/borepile-kota.json
```

untuk data terstruktur kota.

Setiap halaman kota harus memiliki:

* Title
* Meta Description
* H1
* Canonical
* Area layanan
* Gambar
* Konten lokal
* CTA
* Internal links
* Informasi yang sesuai wilayah

## Unique Local Content

Template teknis boleh digunakan.

Namun jangan membuat halaman:

```text
copy Jakarta
â†’ replace Jakarta dengan Bekasi
```

Konten lokal harus berasal dari:

* halaman legacy kota tersebut
* data kota
* informasi proyek yang benar
* data bisnis yang nyata

Jangan membuat klaim lokasi yang tidak memiliki sumber.

---

# 13. CITY DATA VALIDATION

Jika menggunakan:

```js
const city = cities.find((item) => item.slug === 'jakarta');
```

WAJIB validasi.

Contoh:

```js
const city = cities.find((item) => item.slug === 'jakarta');

if (!city) {
  throw new Error(
    'City "jakarta" tidak ditemukan di borepile-kota.json'
  );
}
```

Jangan membuat fallback data palsu.

Jangan menggunakan:

```js
city || {}
```

untuk menutupi data yang hilang.

Jika city tidak ditemukan:

**build harus gagal dengan error yang jelas.**

---

# 14. HTML STRUCTURE
## Migrasi ke BaseLayout
Saat memigrasikan halaman lama (raw HTML) menjadi komponen Astro yang menggunakan <BaseLayout>:
1. **Jangan memaksakan semua konten masuk ke dalam kontainer sempit** (contoh: memaksakan semuanya masuk .blog-container). Jika halaman asli memiliki section *full-width* di luar kontainer teks, pastikan struktur komponen Astro meniru kerangka tersebut dengan akurat.
2. Halaman ore-pile-2026.astro adalah **template patokan** untuk seluruh halaman harga (30cm, 40cm, dst).


Audit semua halaman hasil migrasi.

Pastikan:

* tag balance
* `<div>` balance
* `<section>` balance
* `<article>` balance
* `<nav>` balance
* `<header>` valid
* `<footer>` valid
* `<ul>/<li>` valid
* `<form>` valid
* `<button>` valid
* `<label>` valid
* heading hierarchy masuk akal
* nested element valid
* tidak ada closing tag yang hilang

Jika CSS legacy bergantung pada struktur DOM tertentu:

**pertahankan struktur tersebut.**

Jangan mengubah class name tanpa alasan.

---

# 15. CSS
## Dynamic JS Classes (WARNING)
Jangan pernah menghapus class CSS hanya karena class tersebut tidak ditemukan di file statis .astro atau .html.
Banyak class (seperti .choice-button pada kalkulator) di-generate secara dinamis oleh JavaScript.
Menghapus class ini saat "merapikan" CSS akan membuat fitur tersebut kehilangan styling (tampil telanjang).


CSS legacy merupakan referensi visual utama.

Pertahankan CSS legacy apabila masih relevan.

Contoh:

```text
public/css/borepile-kota.css
```

## Jangan mengubah:

* warna
* font
* ukuran
* spacing
* layout
* breakpoint
* border
* shadow
* animation

kecuali perubahan tersebut diperlukan untuk memperbaiki bug akibat migrasi.

Jika CSS rusak setelah migrasi:

perbaiki **sesedikit mungkin**.

Tujuan:

```text
Astro â‰ˆ Legacy
```

bukan:

```text
Astro redesign
```

---

# 16. JAVASCRIPT
## Konflik Global JS pada BaseLayout
<BaseLayout> secara default memuat /js/script.js. Jika halaman yang dimigrasikan memiliki file JS mandiri sendiri (contoh: harga.js yang mengatur kalkulator & navigasinya sendiri), ini dapat menyebabkan *double-initialization* (seperti *scroll-to-top* atau *navbar toggle* berjalan dua kali).
Gunakan *prop* disableGlobalJs={true} pada <BaseLayout> jika halaman tersebut tidak membutuhkan script.js standar.


Audit seluruh JavaScript yang digunakan setiap halaman.

Contoh:

```text
public/js/jasa.js
public/js/harga-calculator.js
public/js/borepile-kota.js
```

Pastikan:

* script ditemukan
* path benar
* script dijalankan
* selector benar
* fungsi tidak undefined
* event listener bekerja
* calculator bekerja
* navbar bekerja
* FAQ bekerja
* WhatsApp bekerja
* scroll-top bekerja jika ada
* fitur legacy tetap bekerja

## Inline handler

Jika terdapat:

```html
onclick="sendToWA()"
```

jangan langsung menghapus.

Cari dahulu definisi fungsi tersebut.

Jika dipindahkan ke event listener:

**perilaku harus tetap sama.**

Jangan mengganti vanilla JavaScript menjadi framework.

---

# 17. CALCULATOR

Jika halaman memiliki kalkulator:

wajib memeriksa:

* method selector
* machine selector
* diameter
* harga
* kedalaman
* jumlah titik
* total biaya
* estimasi waktu
* minimum order
* order information
* WhatsApp CTA

Harga calculator harus konsisten dengan pricing source.

Jangan membuat calculator menggunakan harga yang berbeda dari harga aktif
kecuali memang merupakan data historis yang sengaja ditampilkan.

---

# 18. IMAGE & ASSET AUDIT

Audit semua asset:

* WebP
* JPG/JPEG
* PNG
* SVG
* favicon
* manifest
* CSS
* JS
* font

Pastikan:

* path benar
* file ada
* extension benar
* case sesuai
* alt text ada
* width/height dipertahankan
* lazy loading sesuai
* `fetchpriority="high"` dipertahankan untuk hero/LCP apabila memang digunakan

Jangan:

* mengganti gambar
* mengganti nama file
* menghapus asset
* mengkonversi gambar
* mengompres gambar

kecuali diminta secara eksplisit.

---

# 19. SEO META

Audit setiap halaman:

```text
<title>
<meta name="description">
<meta name="robots">
<link rel="canonical">
og:title
og:description
og:type
og:url
og:image
og:site_name
twitter:title
twitter:description
twitter:image
```

Geo metadata boleh dipertahankan jika memang sudah digunakan.

## Rules

* setiap halaman harus punya title yang sesuai
* setiap halaman harus memiliki meta description
* canonical harus benar
* tidak boleh canonical localhost
* `og:url` harus sesuai canonical
* jangan keyword stuffing
* jangan membuat metadata palsu
* jangan mengubah metadata legacy tanpa alasan

---

# 20. SCHEMA / JSON-LD

Audit seluruh JSON-LD.

Jenis yang mungkin digunakan:

* Organization
* LocalBusiness
* BreadcrumbList
* WebSite
* Service
* Offer
* OfferCatalog
* FAQPage
* Article
* BlogPosting
* ImageObject
* Person jika memang relevan

## Rules

Schema harus:

* valid JSON
* sesuai dengan konten halaman
* tidak palsu
* tidak kontradiktif
* URL konsisten
* nama bisnis konsisten
* harga konsisten
* area layanan konsisten

## Service vs Product

Karena bisnis ini menjual jasa:

**gunakan `Service` untuk layanan.**

Jangan menggunakan `Product` hanya untuk mengejar SEO.

Gunakan Product hanya jika memang konten tersebut secara semantik benar-benar
merupakan product dan memenuhi kebutuhan struktur datanya.

## Helper Schema

Jika tersedia:

```text
src/lib/schema.js
```

dan helper seperti:

```js
organizationSchema()
localBusinessSchema()
```

gunakan helper tersebut.

Jangan membuat LocalBusiness duplikat yang bertentangan.

## FAQ Schema

FAQPage hanya boleh memuat pertanyaan dan jawaban yang benar-benar muncul
di halaman.

Jangan membuat FAQ schema tersembunyi.

---

# 21. SEARCHACTION

Jika terdapat:

```json
"@type": "SearchAction"
```

pastikan route pencarian memang benar-benar ada dan bekerja.

Jika website tidak mempunyai search page yang berfungsi:

**hapus SearchAction.**

Jangan membuat route dummy hanya untuk schema.

---

# 22. ANALYTICS & TRACKING

Pertahankan tracking yang memang digunakan project:

* Google Tag Manager
* Google Ads
* Ahrefs Analytics
* tracking lainnya yang memang sudah ada

Jangan:

* mengubah ID
* menghapus tracking
* membuat duplicate initialization

Pastikan script tidak dimuat dua kali.

Jika `preconnect` atau `dns-prefetch` tidak digunakan:

boleh dihapus jika aman.

Jangan menambahkan tracker baru tanpa instruksi.

---

# 23. ACCESSIBILITY

Pertahankan:

* skip link
* `aria-label`
* `aria-expanded`
* `aria-current`
* `aria-live`
* image alt

Untuk button:

gunakan:

```html
type="button"
```

jika button bukan submit.

FAQ accordion harus tetap dapat digunakan dengan keyboard dan tetap memiliki
accessible name.

Jangan mengubah desain untuk accessibility apabila tidak diperlukan.

---

# 24. EXTERNAL LINKS

Audit semua external link.

Untuk link yang menggunakan:

```html
target="_blank"
```

pastikan:

```html
rel="noopener noreferrer"
```

Gunakan untuk:

* Google Maps
* WhatsApp
* Facebook
* Instagram
* sumber akademik
* external reference

Jangan mengganti sumber legacy tanpa alasan.

Jika sebuah sumber terlihat meragukan atau tidak bisa diverifikasi:

laporkan, jangan mengarang sumber pengganti.

---

# 25. GOOGLE MAPS

Pertahankan Google Maps apabila memang terdapat pada halaman legacy.

Pastikan:

* iframe valid
* lokasi benar
* `title` ada
* `loading="lazy"`
* `allowfullscreen`
* `referrerpolicy`

Jangan mengganti lokasi bisnis.

---

# 26. INTERNAL LINKING

Audit seluruh internal link.

Cari:

* 404
* path lama
* path salah
* route yang tidak ada
* extension yang salah
* case mismatch
* link menuju URL legacy yang seharusnya sudah diarahkan

Pertahankan struktur silo website.

Contoh:

```text
Beranda
  â†“
Jasa
  â†“
Layanan
  â†“
Area Layanan
  â†“
Harga
  â†“
Artikel
  â†“
Proyek / Galeri
```

Jangan mengubah internal linking secara agresif saat migrasi.

---

# 27. RESPONSIVE

Website harus tetap nyaman digunakan pada:

```text
360px
390px
768px
1024px
1366px
1920px
```

Minimal pastikan:

* tidak ada horizontal overflow
* navbar mobile bekerja
* gambar tidak keluar container
* tabel dapat digunakan pada mobile
* button tidak terpotong
* text tidak keluar viewport
* calculator usable
* cards tidak memaksa fixed width
* iframe Maps tidak overflow

## Important

Responsive fix boleh dilakukan jika migrasi menyebabkan layout legacy rusak.

Tetapi:

**jangan redesign responsive.**

---

# 28. CONTENT CONSISTENCY

Cari informasi bisnis yang diulang di banyak halaman:

* nama perusahaan
* alamat
* nomor telepon
* WhatsApp
* email
* harga
* minimum order
* diameter
* kedalaman
* area layanan
* pengalaman
* jenis alat
* layanan

Bandingkan semuanya.

Jika terdapat konflik:

jangan memilih secara asal.

Cari:

1. data pusat
2. legacy
3. konfigurasi
4. data resmi bisnis

Jika tetap ambigu:

masukkan ke laporan sebagai:

**CONTENT CONFLICT**

---

# 29. DUPLICATE CONTENT / SEO CANNIBALIZATION

Saat membuat halaman baru:

jangan hanya menggandakan halaman lama dan mengganti nama kota.

Setiap halaman harus memiliki tujuan pencarian yang jelas.

Contoh:

```text
/jasa/bore-pile-jakarta.html
```

fokus pada:

```text
Jasa Bore Pile Jakarta
```

sedangkan:

```text
/jasa/strauss-pile-jakarta.html
```

fokus pada:

```text
Jasa Strauss Pile Jakarta
```

Halaman boleh memiliki topik yang berhubungan.

Namun:

* konten utama harus berbeda
* intent harus berbeda
* H1 harus berbeda
* metadata harus berbeda
* section utama harus sesuai layanan
* internal linking harus membantu hubungan antar halaman

Jangan membuat halaman yang hampir 100% identik.

---

# 30. BUILD VALIDATION

Setelah perubahan:

```bash
npm run build
```

Jika build gagal:

1. Baca error.
2. Cari root cause.
3. Perbaiki root cause.
4. Jalankan build kembali.

Jangan:

* menghapus fitur
* menghapus import
* menghapus halaman
* menghapus script
* menonaktifkan functionality

hanya agar build berhasil.

---

# 31. RUNTIME VALIDATION

Jika memungkinkan:

```bash
npm run dev
```

Kemudian periksa halaman melalui browser.

Audit:

* console
* network
* DOM
* responsive
* image
* CSS
* JS
* calculator
* FAQ
* menu
* CTA
* link

Cari:

* JavaScript error
* 404 asset
* broken image
* broken CSS
* broken route
* hydration error
* null selector
* calculator error

---

# 32. WHOLE PROJECT AUDIT

Saat diminta melakukan audit project secara keseluruhan:

**jangan hanya memeriksa satu file.**

Scan seluruh:

```text
src/pages/**
src/components/**
src/layouts/**
src/data/**
src/lib/**
public/**
```

Jika masih ada halaman legacy:

bandingkan dengan halaman Astro.

Buat inventory:

* semua route
* semua halaman
* semua asset
* semua JS
* semua CSS
* semua data
* semua schema
* semua link

Cari:

* halaman hilang
* route hilang
* asset hilang
* link rusak
* schema rusak
* SEO regression
* content regression
* visual regression

---

# 33. GIT SAFETY

Jangan melakukan:

* `git reset`
* `git reset --hard`
* `git revert`
* `git stash`
* overwrite file WIP
* commit
* push

kecuali secara eksplisit diminta.

Jangan menghapus perubahan manual yang belum di-commit.

Sebelum mengubah file:

perhatikan perubahan yang sudah ada.

Jika terdapat WIP:

**jangan menimpa tanpa alasan.**

Repository:

```text
github.com/Andreysvn/web-agung-perkasa-borepile
```

---

# 34. PLUGIN / SKILL

Jika project atau task membutuhkan kemampuan dari skill/plugin yang tersedia:

**gunakan skill/plugin yang relevan.**

Jangan mengabaikan skill yang sudah terinstall jika skill tersebut memang relevan
dengan pekerjaan.

Namun jangan menambahkan plugin baru hanya untuk hal yang dapat dilakukan
dengan tool bawaan atau project yang sudah tersedia.

---

# 35. TASK SCOPE

AGENTS.md ini berisi **aturan permanen project**.

Task spesifik tidak boleh ditanam permanen di file ini.

Contoh task:

```text
Migrasikan halaman Bekasi.
```

atau:

```text
Audit halaman Jakarta.
```

atau:

```text
Perbaiki semua canonical.
```

Task tersebut diberikan melalui prompt terpisah.

Agent harus mengikuti AGENTS.md sebagai aturan project,
kemudian mengikuti task prompt sebagai pekerjaan yang sedang dikerjakan.

Jika task bertentangan dengan aturan permanen:

jangan langsung mengambil keputusan.

Prioritaskan aturan AGENTS.md kecuali user secara eksplisit meminta perubahan
terhadap aturan tersebut.

---

# 36. FINAL VERIFICATION

Sebelum menyatakan task selesai, minimal pastikan:

* build berhasil
* route benar
* canonical benar
* metadata tidak rusak
* schema valid
* asset tidak missing
* CSS bekerja
* JS bekerja
* calculator bekerja jika ada
* navbar bekerja
* FAQ bekerja jika ada
* CTA bekerja
* WhatsApp bekerja
* responsive tidak overflow
* konten tidak hilang
* desain tidak berubah secara tidak sengaja
* tidak ada perubahan data bisnis tanpa sumber

---

# 37. FINAL REPORT

Setelah selesai, berikan laporan:

## BUILD

* PASS / FAIL
* error yang ditemukan
* error yang diperbaiki

## ROUTING

* route yang diperiksa
* route yang diperbaiki
* route yang bermasalah

## ASTRO

* import
* variable
* component
* layout
* HTML structure

## SEO

* title
* meta description
* canonical
* Open Graph
* Twitter Card
* robots
* schema

## DATA

* config.json
* harga.json
* borepile-kota.json
* data arsip
* konflik data

## JAVASCRIPT

* navbar
* calculator
* FAQ
* WhatsApp
* gallery
* interactive features

## ASSETS

* image
* CSS
* JS
* favicon
* manifest

## CONTENT PARITY

Daftar konten yang hilang atau berubah jika ada.

## VISUAL PARITY

Daftar bagian yang berbeda dari legacy jika ditemukan.

## BROKEN LINKS

Daftar link rusak.

## CONTENT CONFLICT

Daftar informasi bisnis yang masih bertentangan.

## FILES CHANGED

Tampilkan hanya file yang benar-benar diubah.

## OUT OF SCOPE

Tampilkan masalah yang ditemukan tetapi sengaja tidak diubah
karena berada di luar scope task.

## FINAL STATUS

Gunakan:

```text
READY
```

hanya jika seluruh kriteria penting terpenuhi.

Jika belum:

```text
NOT READY
```

dan jelaskan apa yang masih kurang.

---

# 38. GOLDEN RULE

Selalu ingat:

```text
MIGRATION FIRST.
PRESERVE LEGACY.
FIX WHAT IS BROKEN.
DO NOT REDESIGN.
DO NOT INVENT DATA.
DO NOT BREAK SEO.
DO NOT OVERWRITE WIP.
```

Website Astro harus menjadi evolusi teknis dari website legacy,
bukan website baru yang hanya memiliki konten yang sama.


