# AGENTS.md

Catatan: `CLAUDE.md` adalah salinan file ini. Jika isinya berbeda, ikuti file ini. `README.md` hanyalah boilerplate starter Astro — abaikan.

## Project

Website **Agung Perkasa Borepile** (jasa bore pile & strauss pile, seluruh konten Bahasa Indonesia) di Astro. **Migrasi dari HTML legacy SELESAI** (2026-08-23, 33 halaman, terverifikasi identik dengan situs lama; sumber legacy masih bisa dilihat lewat riwayat git).

Fase sekarang: **pemeliharaan, optimasi, dan ekspansi**. Target pemilik:

- Optimasi teknikal & konten halaman existing — **prioritas halaman jasa** (banyak yang kontennya masih salinan legacy tipis).
- **Ekspansi SEO lokal ke seluruh wilayah Jawa** — akan ada banyak halaman kota/area baru.
- Halaman **jasa & harga rutin di-update**; **artikel baru berkala**.
- Membangun sinyal **E-E-A-T**: konten terbaru, terlengkap, tepercaya di niche bore pile.
- **Performa (prioritas pemilik 2026-08-24): web harus kencang & cepat** — dikerjakan TANPA mengubah tampilan/konten. Baseline pasca-revert v2: 8 file CSS ±235 KB + 8 JS ±103 KB semuanya unminified & berisi rule/kode tak terpakai; ditambah beban pihak ketiga (Font Awesome CDN, GTM, Ahrefs, Google Maps embed). Arah: minify/bersihkan CSS-JS, pangkas yang nganggur, kendalikan beban pihak ketiga; ukur dengan PageSpeed/CWV dulu biar prioritasnya jelas.
- **Efisiensi perawatan lewat satu sumber data** — tanggal, harga, kontak, dan data apa pun yang berulang antar halaman wajib hidup di `src/data/*.json` / frontmatter (lihat pola `harga.json`), bukan di-hardcode per halaman. Konsolidasi boleh dilakukan bertahap selama output build tetap ringan dan konten terverifikasi tidak berubah (`tools/verify-renovasi.ps1` bisa dipakai sebagai alat banding sebelum-vs-sesudah).

Prinsip efisiensi wajib: **jangan membuat halaman baru dengan menyalin markup lama satu-satu**. Bangun/maintain sistem data-driven — satu entri data (JSON/frontmatter) → satu halaman lengkap dengan meta + schema. Rawat template sekali, semua halaman ikut.

## Arah kerja aktif (keputusan pemilik 2026-08-25): benahi sistem dulu dari halaman jasa

**Roadmap lengkap + keputusan final pemilik ada di `docs/roadmap-2026-08-25.md` — baca dulu sebelum mengerjakan apa pun di repo ini.** Ringkasan:

1. **Fase 1 AKTIF: konsolidasi template data-driven, DIMULAI DARI 9 halaman jasa kota** (`/jasa/bore-pile/{jakarta,...}.html`) karena harus cepat tayang publik; setelah itu 5 halaman harga diameter; sisanya menyusul (area flat, galeri, artikel). Tujuan akhirnya tetap sesuai daftar target pemilik di atas.
2. Keputusan final pemilik: nomor WA tunggal `6285710277854`; TANPA testimoni (kecuali screenshot asli suatu saat); kalkulator TETAP ada di tiap halaman jasa; Maps boleh semua halaman + catatan "Kantor pusat Jakarta"; ikon Font Awesome diganti saat halaman pindah ke template; redesign modern paling akhir; urutan Template → Ekspansi → Konten → Performa → Desain.
3. **JANGAN rollout FA→SVG massal manual ke sisa 31 halaman lagi** — pola pilot sudah terbukti; penerapannya terjadi otomatis saat tiap halaman dimigrasi ke template.
4. Temuan audit yang wajib dibenahi begitu halaman masuk template: harga hardcode di halaman diameter (35–39 literal Rp per file, `harga.json` cuma disentuh 2 titik); tahun "2026" hardcode di title/H1 banyak halaman → jadikan satu sumber; link salah slug gaya lama `/jasa/bore-pile-bekasi.html` padahal URL benar `/jasa/bore-pile/bekasi.html` (targetnya ADA, boleh langsung dibetulkan), ditambah link mati `/harga/` dan `/jasa/strauss-pile/`; kartu artikel identik di 28 dari 33 halaman → jadikan satu komponen; fallback `onerror` ikon alat malah memakai logo perusahaan (jakarta & harga 2026); file yatim `public/css/jasaaaa.css` + `public/js/blog.js` (0 referensi); preconnect `unpkg.com` nganggur di 28 halaman; `public/imgs/bore-pile-semarang.png` ukuran 1,9 MB PNG → konversi WebP.
5. Konten panjang per kota masih menempel di 9 file `.astro` mandiri (masing-masing ±950 baris dengan struktur section identik: kalkulator, tabel harga, faktor, biaya tambahan, tips diameter, contoh proyek ×3, portofolio, wilayah layanan, FAQ, artikel, footer); `src/data/borepile-kota.json` baru berisi metadata ringkas — **konten unik per kota harus diekstrak ke data dulu** sebelum template dinamis dibuat.

## Renovasi desain (DIHENTIKAN sementara oleh pemilik, 2026-08-24)

**Status: semua 33 halaman kembali memakai desain legacy.** Pemilik sudah cek visual pilot v2 dan tidak menyukainya, jadi `/harga/bore-pile-2026.html` dikembalikan ke desain lama penuh (halaman `.astro` mandiri ala halaman harga lainnya: CSS `/css/harga.css`, JS `/js/script.js` + `/js/harga-calculator.js` + injeksi `window.__PRICING__`, navbar/footer inline). Verifikasi pasca-revert: `tools/verify-renovasi.ps1` (title/desc/canonical/h1/h2-h3/JSON-LD) lolos semua dan teks terlihat 100% identik dengan snapshot pra-v2 (`%TEMP%\opencode\renovasi-snapshot\harga-bore-pile-2026-before.html`; snapshot juga tersalin aman sebagai acuan).

Konsekuensi yang berlaku sekarang:

1. **Aset v2 DORMAN** — masih ada di repo tapi tidak direferensikan halaman mana pun, jangan dipakai/diperluas tanpa instruksi: `src/styles/tokens.css` + `base.css`, `public/fonts/plus-jakarta-sans-latin-var.woff2`, komponen `src/components/global/v2/*`, blok `src/components/ui/*`, port kalkulator `src/scripts/harga-calculator.ts`, wiring dual-mode di `BaseLayout`.
2. **Desain navbar v2 diarsipkan** eksplisit di `docs/arsip-desain/navbar-v2/` (`Navbar.astro` + `CATATAN.md` berisi daftar dependensinya kalau mau dihidupkan lagi).
3. **Renovasi pause sampai pemilik putuskan arah baru.** Dokumen lama (`docs/superpowers/specs/2026-08-24-renovasi-design.md`, rencana batch) hanya referensi historis; keputusan desain yang tadinya "dikunci" sudah tidak aktif. Aturan yang tetap berlaku kapan pun renovasi dilanjutkan: SEO/konten tidak boleh berubah saat ganti kulit (verifikasi via `tools/verify-renovasi.ps1`), file legacy `public/css|js` jangan diedit selama masih dipakai, NOL dependensi baru.

## Optimasi performa (pilot selesai 2026-08-25; rollout lanjut lewat migrasi template)

Pilot optimasi **tanpa mengubah desain/konten** sudah selesai di 2 halaman: `/harga/bore-pile-2026.html` dan `/jasa/bore-pile/jakarta.html`. Perubahan: Font Awesome CDN (~300 KB) diganti SVG inline via komponen `src/components/icons/FaIcon.astro` (7 ikon: arrow-up, calendar-alt regular, chevron-down, facebook-f, instagram, newspaper, whatsapp; path resmi FA Free 6.4.0; tag `<i class="fas|far|fab fa-*">` dipertahankan sebagai wrapper agar semua CSS legacy yang menyasar `.fa-*`/elemen `i` tetap berlaku), eksekusi GTM ditunda sampai event `window load` (tracking tetap jalan), preconnect cdnjs/unpkg dibuang di kedua halaman tsb. Hasil terukur (Lighthouse mobile lokal): transfer -295 KB (-41% s/d -54%), LCP 2,7 dtk → 1,7 dtk, skor 93–95 → 98–99. Verifikasi: teks & SEO identik 100% vs snapshot (`tools/verify-renovasi.ps1` + diff teks penuh); snapshot before/after di `%TEMP%\opencode\perf-before|after`.

Aturan rollout & catatan penting:

1. **31 halaman lain masih pakai Font Awesome CDN** — sesuai keputusan pemilik 2026-08-25, TIDAK ada mass-edit manual; pola SVG inline + GTM defer diterapkan otomatis saat tiap halaman dimigrasi ke template (lihat seksi Arah kerja aktif).
2. Cara ganti: hapus `<link rel="preload">`+noscript FA dan preconnect cdnjs/unpkg, ganti tiap `<i class="..."></i>` jadi `<FaIcon class="..." />`, bungkus isi skrip GTM dengan `window.addEventListener('load', ...)`. Cek dulu daftar ikon unik per halaman (bisa lebih dari 7) — kalau ada ikon baru, ambil path SVG-nya dari paket `@fortawesome/fontawesome-free@6.4.0` (perhatikan style solid/regular/brands harus sesuai prefix `fas/far/fab`), tambahkan ke map `ICONS` di `FaIcon.astro`.
3. **Bahaya encoding**: JANGAN edit file .astro via `Get-Content`/`Set-Content` PowerShell biasa — PS 5.1 membaca UTF-8 tanpa BOM sebagai ANSI dan merusak semua karakter non-ASCII (emoji 📌📍, Ø, ×, →). Sudah pernah terjadi & berhasil dipulihkan. Pakai tool Edit/Write, atau `[IO.File]::ReadAllBytes`/`WriteAllText` dengan `UTF8Encoding($false)`.
4. Faktanya sudah efisien, jangan disentuh lagi: iframe Google Maps & hampir semua gambar sudah `loading="lazy"`; CSS/JS lokal sudah dikompres Brotli oleh hosting (style.css hanya ~10 KB over-the-wire); hosting = Hostinger/LiteSpeed.
5. Ukur performa: PSI API anonim sering 429 dari IP ini; alternatif andal = Lighthouse lokal via `npx lighthouse <url> --quiet --chrome-flags="--headless=new"` (Chrome + Node tersedia), atau preview server `npm run preview` di port 4321 untuk menguji hasil build sebelum deploy.

## Perintah

- `npm run dev` — dev server di `localhost:4321`. Cek dulu apakah sudah berjalan; jangan menjalankan dua server.
- `npm run build` — satu-satunya verifikasi otomatis (tidak ada script lint/test/typecheck). Wajib lolos sebelum task dinyatakan selesai.
- `npm run preview` — serve hasil build dari `dist/`.
- Node >= 22.12.0 (lihat `engines` di package.json). Satu-satunya dependency adalah `astro` — jangan menambah library/framework untuk masalah yang bisa diselesaikan Astro atau vanilla browser API.

## Arsitektur

- `astro.config.mjs` memakai `build.format: 'file'` → setiap route menghasilkan `/path.html`, bukan `/path/index.html`. `site` diset ke domain produksi — jangan dihapus.
- Tidak ada lagi `.html` konten di `public/`. URL lama gaya direktori (`/jasa/`, `/x/index.html`) di-redirect 301 oleh `public/.htaccess` menuju `/x.html` (hosting produksi: Hostinger, Apache/LiteSpeed; deploy = upload isi `dist/` ke `public_html/`). Kalau suatu saat menambah URL direktori-style lagi, tambahkan rule `RewriteRule ^x(/index\.html)?/?$ /x.html [R=301,L]`.
- 33 halaman Astro: `/`, `/jasa/`, `/jasa/bore-pile/` (hub kota), 9 halaman kota (`/jasa/bore-pile/{jakarta,bandung,bekasi,bogor,depok,karawang,semarang,surabaya,tangerang}.html`), 8 halaman area flat (`/jasa/bore-pile-{cikarang,bintaro,bsd,cibubur,ciputat,karawaci,pamulang,tangerang-selatan}.html`), `/jasa/strauss-pile/jakarta.html`, `/harga/bore-pile-2026.html`, `/harga/bore-pile-{30,40,50,60,80}cm.html`, `/artikel.html` + 3 artikel (`bore-pile-vs-strauss-pile`, `borepile-vs-tiang-pancang`, `proses-bore-pile`), `/galeri/gallery.html`, `/alat.html`.
- Satu sumber data wajib (jangan hardcode nilainya di halaman):
  - `src/data/config.json` — identitas, kontak (WA/telp/email), sosial media, meta default.
  - `src/data/harga.json` — semua harga + `priceUpdatedAt`. Alur update harga = edit JSON ini → build; tanggal di halaman harga terinterpolasi via `Intl.DateTimeFormat('id-ID')` (pola: `src/pages/harga/bore-pile-30cm.astro`).
  - `src/data/borepile-kota.json`, `src/data/galeri.json`.
  - `src/data/harga-arsip-hidrolik.json` — arsip mesin hidrolik/SANY nonaktif; belum direferensikan, jangan dihapus.
- Komponen: `BaseLayout` (`src/layouts/`) dual-mode — prop `design: 'legacy' | 'v2'` (default legacy) + `localBusinessOverride`. Mode v2 memuat `tokens.css`+`base.css` via `ApxStyles` + preload font, TIDAK memuat `/css/style.css` & `/js/script.js`; komponen global otomatis diambil dari `src/components/global/v2/*` (namespace class `apx-*`). Saat ini TIDAK ada halaman yang memakai mode v2; `index.astro` memakai BaseLayout mode legacy, dan `/harga/bore-pile-2026.html` halaman `.astro` mandiri ala legacy seperti sibling harga lainnya. Halaman lain menyalin `<head>` + navbar/footer inline ala legacy — belum boleh di-swap ke komponen tanpa instruksi karena tidak 100% identik.
- Schema identitas berulang (Organization/WebSite/LocalBusiness) dibangun lewat `src/lib/schema.js` (`schemaPhone` = format rapat tanpa spasi), dirender `<script type="application/ld+json" set:html={JSON.stringify(...)}>` — jangan menulis isi script JSON-LD sebagai template literal. Blok schema unik per halaman (BreadcrumbList, FAQPage, Product, dll.) ditulis literal di halamannya.
- CSS/JS tetap vanilla di `public/css/` & `public/js/`, path absolut (`/css/style.css`, `/js/script.js`); perilaku JS lama harus sama persis.
- `public/js/jasa.js` — UI dasar (navbar, mobile menu, dropdown, scroll-top, FAQ) untuk `jasa/index.astro`. Sudah ringan (130 baris), tidak ada search.
- `public/js/harga.js` — All-in-one (navbar + mobile menu + FAQ + kalkulator + scroll-top) untuk halaman harga. Termasuk interactive diameter/machine choice-grid.
- `public/js/proses.js` — Interactive UI untuk `artikel/proses-bore-pile.html`: scroll-triggered animations, sticky progress bar, step navigation, toggle details, FAQ, comparison accordion. Rewrite dari versi lama (2026-08-26).
- `public/js/blog.js` — DIHAPUS (2026-08-26). File mati, tidak direferensikan halaman manapun. Filter artikel di-handle inline di `artikel/index.astro`.

## Aturan kerja

- 33 halaman hasil migrasi adalah baseline legacy: jangan ubah desain/konten/URL/fungsinya tanpa instruksi eksplisit. Task optimasi boleh menyentuhnya hanya sebatas scope yang diminta.
- Perubahan seminimal mungkin; jangan refactor di luar scope task.
- Bug lama yang tidak menghalangi task: biarkan dan laporkan, jangan perbaiki sendiri.
- Semua konten dan copywriting dalam Bahasa Indonesia.
- Kalau membuat halaman baru (ekspansi wilayah/artikel), gunakan pola template data-driven yang konsisten — jangan tiru gaya markup legacy per-halaman yang tidak seragam.

## Backlog optimasi (dikerjakan per instruksi, jangan mass-edit sekaligus)

- Halaman jasa & area: konten tipis, struktur heading/meta perlu audit; prioritas pemilik.
- 8 halaman area flat masih konten versi lama persis — menunggu optimasi.
- Nomor WA ganda tersebar di beberapa halaman (`6285710277854` standar vs `6282233569632`) — keputusan pemilik: seragamkan ke `6285710277854`; eksekusinya saat halaman masuk template.
- Navbar/footer/WA-float inline di halaman migrasi belum diganti komponen Astro (menunggu verifikasi visual).
- **Galeri** perlu paginasi/load-more (keputusan pemilik 2026-08-26: pakai "load more" modern). Gambar bisa JPG/WebP terserah pemilik.
- **Halaman harga diameter** belum punya FAQ schema (2026-08-26). Breadcrumb schema juga belum ada di beberapa halaman.
- **Google Ads script** load tanpa `defer` di 5 halaman kota (Jakarta, Bekasi, Bogor, Depok, Tangerang) — perlu dikonsistenkan via GTM.

## SEO

- `public/sitemap.xml` dan `public/robots.txt` dikelola manual — update keduanya setiap menambah/mengubah URL. Saat ini 33 URL = 33 halaman; pertahankan sinkron. Setelah deploy, submit ulang sitemap di Google Search Console.
- **Konsistensi og:url**: Sudah diperbaiki massal 2026-08-26 (24 file). Pastikan og:url = canonical di semua halaman baru. Pola: halaman `src/pages/x/y/index.astro` → canonical + og:url = `/x/y.html`.
- Canonical di-hardcode ke domain produksi `https://agungperkasaborepile.com`.
- Link internal mati di markup inline hasil salinan legacy (mis. `/artikel/artikel.html`, `/harga/harga-*`, link ke artikel/subhalaman alat yang belum ada) dipertahankan apa adanya selama halamannya memang belum dibuat; begitu halaman tujuan dibuat, barulah linknya boleh diperbaiki. Komponen `Navbar`/`Footer` Astro boleh langsung dibereskan (sudah: strauss-pile → jakarta.html, harga → bore-pile-2026.html, galeri → gallery.html).

## Git

Working tree hampir selalu berisi perubahan WIP milik pengguna yang belum di-commit — jangan revert, stash, atau overwrite. Jangan commit/push tanpa diminta. Remote: `github.com/Andreysvn/web-agung-perkasa-borepile`.

Referensi: dokumentasi resmi Astro di https://docs.astro.build — baca dulu sebelum menebak API Astro.
