# Renovasi Desain — Batch 1 (Fondasi + Pilot Harga 2026) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun fondasi desain v2 (tokens, base style, ikon ✓SVG, komponen kulit baru, prop `design` di BaseLayout) dan memigrasikan halaman pilot `/harga/bore-pile-2026.html` ke kulit baru tanpa mengubah satu pun teks/meta/schema.

**Architecture:** Mode ganda di `BaseLayout` (`design='legacy'|'v2'`). Halaman v2 memuat `tokens.css` + `base.css` lewat komponen `ApxStyles` (is:global, hanya dirender saat v2), TIDAK memuat `/css/style.css` maupun `/js/script.js` legacy. Komponen global versi baru hidup di `src/components/global/v2/`; halaman lama tetap memakai komponen lama apa adanya. Interaktivitas ditulis ulang vanilla per komponen; FAQ pakai `<details>` native.

**Tech Stack:** Astro (satu-satunya dependency), vanilla CSS (scoped + is:global), vanilla JS, font self-host WOFF2.

**Spec:** `docs/superpowers/specs/2026-08-24-renovasi-design.md`

## Global Constraints

- **NOL dependensi baru** (`package.json` tidak boleh berubah).
- **Isolasi besi:** `public/css/*` dan `public/js/*` TIDAK BOLEH diedit. Semua file baru bernama `apx-*` atau hidup di `src/components/**`, `src/styles/**`, `public/fonts/`.
- **Konten halaman pilot identik:** semua teks, urutan heading, alt gambar, href, dan isi blok JSON-LD (Organization, LocalBusiness, BreadcrumbList, Product, FAQPage) sama persis dengan sebelum migrasi. Yang berubah hanya class/wrapper/markup penampil.
- SEO head identik: title, description, canonical, robots, og/twitter, geo — nilai-nilainya disalin apa adanya ke props BaseLayout / markup.
- `public/sitemap.xml`, `robots.txt`, `.htaccess`: tidak disentuh.
- Verifikasi otomatis satu-satunya: `npm run build` harus lolos. Tidak ada lint/test framework.
- **Jangan `git commit`** — working tree milik pemilik; commit hanya kalau pemilik minta.
- Token warna (verbatim dari spec): navy `#0d2b52`, navy-2 `#1a3a6e`, blue `#3498db`, orange `#d35400`, orange-2 hover `#b84700`, wa `#25d366`, wa-2 hover `#1da851`, tint `#f0f7ff`, bg `#ffffff`, text `#1e293b`, muted `#64748b`, border `#e2e8f0`.
- Font: Plus Jakarta Sans variable WOFF2 tunggal `public/fonts/plus-jakarta-sans-latin-var.woff2` (@font-face weight 400 800), preload sekali, `font-display: swap`.
- Budget per halaman v2: CSS â‰¤ 25 KB ter-minify, JS â‰¤ 10 KB, nol request CDN pihak ketiga untuk font/ikon ✓(FA & Google Fonts tidak dimuat di halaman v2).

---

### Task 1: Snapshot baseline halaman pilot

**Files:**
- Create: `%TEMP%\opencode\renovasi-snapshot\harga-bore-pile-2026-before.html` (di luar repo)

**Interfaces:**
- Consumes: hasil `npm run build` saat ini.
- Produces: file baseline yang dibandingkan Task 9.

- [ ] **Step 1: Build kondisi sekarang**

Run: `npm run build`
Expected: build sukses, `dist/harga/bore-pile-2026.html` ada.

- [ ] **Step 2: Salin hasil build sebagai baseline**

```powershell
New-Item -ItemType Directory -Force -Path "$env:TEMP\opencode\renovasi-snapshot" | Out-Null
Copy-Item dist\harga\bore-pile-2026.html "$env:TEMP\opencode\renovasi-snapshot\harga-bore-pile-2026-before.html"
```
Expected: file tersalin.

---

### Task 2: Font Plus Jakarta Sans self-host

**Files:**
- Create: `public/fonts/plus-jakarta-sans-latin-400.woff2`, `-600.woff2`, `-800.woff2`

**Interfaces:**
- Produces: tiga file WOFF2 dengan nama persis di atas, dipakai `base.css` (Task 3).

- [ ] **Step 1: Ambil daftar URL woff2 dari Google Fonts**

```powershell
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
$css = Invoke-RestMethod -Uri "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" -Headers @{ "User-Agent" = $ua }
$css | Select-String -Pattern "/\* latin \*/|url\((https://[^)]+\.woff2)\)|font-weight: (\d+)" -AllMatches
```
Expected: output menampilkan per blok `/* latin */` sebuah URL `.woff2` + `font-weight` 400/600/800. Catat pasangan (weight → URL latin; abaikan blok subset lain seperti latin-ext/vietnamese).

- [ ] **Step 2: Unduh tiga file latin**

Untuk tiap pasangan dari Step 1:

```powershell
Invoke-WebRequest -Uri "<URL_400>" -OutFile public\fonts\plus-jakarta-sans-latin-400.woff2
Invoke-WebRequest -Uri "<URL_600>" -OutFile public\fonts\plus-jakarta-sans-latin-600.woff2
Invoke-WebRequest -Uri "<URL_800>" -OutFile public\fonts\plus-jakarta-sans-latin-800.woff2
Get-ChildItem public\fonts | Select-Object Name, Length
```
Expected: 3 file ada, masing-masing ~15–30 KB. Kalau total > 120 KB, ulangi dengan subset lain yang lebih kecil — jangan lanjut.

---

### Task 3: Tokens + base style

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`

**Interfaces:**
- Consumes: font dari Task 2.
- Produces: variabel `--apx-*` + kelas dasar `.apx-container`, `.apx-btn`, `.apx-btn-wa`, `.skip-link` — dipakai semua komponen v2 dan halaman pilot.

- [ ] **Step 1: Tulis `src/styles/tokens.css`**

```css
:root {
  --apx-navy: #0d2b52;
  --apx-navy-2: #1a3a6e;
  --apx-blue: #3498db;
  --apx-orange: #d35400;
  --apx-orange-2: #b84700;
  --apx-wa: #25d366;
  --apx-wa-2: #1da851;
  --apx-tint: #f0f7ff;
  --apx-bg: #ffffff;
  --apx-text: #1e293b;
  --apx-muted: #64748b;
  --apx-border: #e2e8f0;
  --apx-radius-sm: 8px;
  --apx-radius: 12px;
  --apx-radius-lg: 16px;
  --apx-shadow-1: 0 1px 3px rgb(13 43 82 / .08);
  --apx-shadow-2: 0 8px 24px rgb(13 43 82 / .12);
  --apx-container: 1140px;
  --apx-font: "Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif;
}
```

- [ ] **Step 2: Tulis `src/styles/base.css`**

```css
@font-face {
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/plus-jakarta-sans-latin-400.woff2") format("woff2");
}
@font-face {
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("/fonts/plus-jakarta-sans-latin-600.woff2") format("woff2");
}
@font-face {
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url("/fonts/plus-jakarta-sans-latin-800.woff2") format("woff2");
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: var(--apx-font);
  font-size: 16px;
  line-height: 1.6;
  color: var(--apx-text);
  background: var(--apx-bg);
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; height: auto; }
a { color: var(--apx-blue); }

.apx-container { max-width: var(--apx-container); margin-inline: auto; padding-inline: 20px; }

.apx-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; border-radius: var(--apx-radius-sm);
  background: var(--apx-orange); color: #fff; font-weight: 600;
  text-decoration: none; border: none; cursor: pointer; font-size: 16px;
  transition: background .2s ease;
}
.apx-btn:hover { background: var(--apx-orange-2); color: #fff; }
.apx-btn-wa { background: var(--apx-wa); }
.apx-btn-wa:hover { background: var(--apx-wa-2); }
.apx-btn-outline {
  background: transparent; color: #fff;
  box-shadow: inset 0 0 0 2px rgb(255 255 255 / .55);
}
.apx-btn-outline:hover { background: rgb(255 255 255 / .12); color: #fff; }

.skip-link {
  position: absolute; left: -9999px; top: 0;
  background: var(--apx-navy); color: #fff; padding: 10px 18px; z-index: 2000;
}
.skip-link:focus { left: 0; }

@media (max-width: 768px) {
  .apx-container { padding-inline: 16px; }
}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: sukses (file belum direferensikan — build hanya memastikan tidak ada yang rusak).

---

### Task 4: Komponen Icon (SVG inline)

**Files:**
- Create: `src/components/ui/Icon.astro`

**Interfaces:**
- Produces: `import Icon from '../ui/Icon.astro'` → `<Icon name="whatsapp" size={24} />`.
- Nama ikon ✓yang wajib tersedia (kebutuhan pilot + footer/navbar v2): `chevron-down`, `arrow-up`, `arrow-right`, `newspaper`, `calendar`, `whatsapp`, `facebook`, `instagram`, `map-pin`, `phone`, `mail`, `check`, `shield`.

- [ ] **Step 1: Buat kerangka komponen**

```astro
---
// src/components/ui/Icon.astro — SVG inline, sumber path: Bootstrap Icons 1.11.3 (MIT)
const icons: Record<string, string> = {};
const { name, size = 20 } = Astro.props;
const d = icons[name];
---
{d && (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
)}
```

- [ ] **Step 2: Isi peta path dari Bootstrap Icons**

Untuk tiap nama di daftar Interfaces, unduh SVG resminya dan salin isi atribut `d`:

```powershell
$icons = @{
  "chevron-down" = "chevron-down"; "arrow-up" = "arrow-up"; "arrow-right" = "arrow-right";
  "newspaper" = "newspaper"; "calendar" = "calendar3"; "whatsapp" = "whatsapp";
  "facebook" = "facebook-f"; "instagram" = "instagram"; "map-pin" = "geo-alt";
  "phone" = "telephone-fill"; "mail" = "envelope"; "check" = "check-lg"; "shield" = "shield-check"
}
foreach ($k in $icons.Keys) {
  $svg = Invoke-RestMethod "https://unpkg.com/bootstrap-icons@1.11.3/icons/$($icons[$k]).svg"
  Write-Host "== $k =="; $svg.path.d.Substring(0, 80) "..."
}
```
Catat string `d` lengkap tiap ikon, lalu isi peta `icons` di `Icon.astro`, contoh entri:

```ts
const icons: Record<string, string> = {
  "chevron-down": "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z",
  // ...isi semua 13 nama dari output perintah di atas
};
```
Expected: peta berisi 13 entri non-kosong; tidak ada nama yang dipakai komponen lain tapi hilang dari peta.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: sukses.

---

### Task 5: ApxStyles + prop `design` di BaseLayout

**Files:**
- Create: `src/components/global/v2/ApxStyles.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: `src/styles/tokens.css`, `src/styles/base.css` (Task 3).
- Produces: prop baru `design?: 'legacy' | 'v2'` (default `'legacy'`); saat `'v2'`: muat ApxStyles + preload font, TIDAK memuat `/css/style.css` & `/js/script.js`; komponen global dirender dari `./v2/*`.

- [ ] **Step 1: Buat `ApxStyles.astro`**

```astro
---
// src/components/global/v2/ApxStyles.astro
import '../styles/tokens.css';
import '../styles/base.css';
---
```

Frontmatter kosong + import CSS: Astro menyatukan kedua file sebagai satu stylesheet halaman (ter-minify) hanya saat komponen ini dirender.

- [ ] **Step 2: Ubah BaseLayout**

Di frontmatter `BaseLayout.astro` tambahkan import + prop:

```astro
import ApxStyles from '../components/global/v2/ApxStyles.astro';
import NavbarV2 from '../components/global/v2/Navbar.astro';
import FooterV2 from '../components/global/v2/Footer.astro';
import WhatsAppFloatV2 from '../components/global/v2/WhatsAppFloat.astro';
import ScrollTopV2 from '../components/global/v2/ScrollTop.astro';

export interface Props {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  ogType?: string;
  bodyClass?: string;
  design?: 'legacy' | 'v2';
}

const {
  title,
  description = config.meta.description,
  keywords = config.meta.keywords,
  image = config.meta.ogImage,
  ogType = 'website',
  bodyClass = '',
  design = 'legacy'
} = Astro.props;

const isV2 = design === 'v2';
```

Di `<head>`: bungkus CSS legacy & tambahkan blok v2 (font preload + ApxStyles):

```astro
{!isV2 && <link rel="stylesheet" href="/css/style.css" />}
{isV2 && (
  <>
    <link rel="preload" href="/fonts/plus-jakarta-sans-latin-var.woff2" as="font" type="font/woff2" crossorigin />
    <ApxStyles />
  </>
)}
```

Di body: pilih varian komponen & gate script legacy:

```astro
{isV2 ? <NavbarV2 /> : <Navbar />}
<main id="main-content"><slot /></main>
{isV2 ? <FooterV2 /> : <Footer />}
{isV2 ? <WhatsAppFloatV2 /> : <WhatsAppFloat />}
{isV2 ? <ScrollTopV2 /> : <ScrollTop />}
{!isV2 && <script src="/js/script.js" defer></script>}
```

Catatan: preconnect cdnjs/unpkg & Font Awesome preload di head juga harus digate `!isV2` (halaman v2 nol CDN untuk UI); GTM/GTag/Ahrefs **tetap jalan di dua mode** (bukan urusan UI).

- [ ] **Step 3: Pastikan legacy tidak berubah**

Run: `npm run build`, lalu:

```powershell
Select-String -Path dist\index.html -Pattern "css/style.css|js/script.js" | Measure-Object | Select-Object -ExpandProperty Count
```
Expected: â‰¥ 2 (index.astro legacy masih memuat keduanya).

---

### Task 6: Navbar v2 + Footer v2

**Files:**
- Create: `src/components/global/v2/Navbar.astro`
- Create: `src/components/global/v2/Footer.astro`

**Interfaces:**
- Consumes: `Icon.astro` (Task 4), token (Task 3), `config.json`.
- Produces: navbar sticky putih + menu mobile navy; footer navy. ID `mobile-menu` & perilaku toggle dipertahankan.

- [ ] **Step 1: Navbar v2**

Salin struktur link dari `src/components/global/Navbar.astro` apa adanya (href & label sama), ganti kulitnya:

```astro
---
// src/components/global/v2/Navbar.astro
import Icon from '../ui/Icon.astro';
import config from '../../../data/config.json';
---
<nav class="apx-nav" aria-label="Navigasi utama">
  <div class="apx-container apx-nav-inner">
    <a href="/" class="apx-nav-logo" aria-label="Agung Perkasa Borepile - Beranda">
      <img src="/imgs/logo-agung-perkasa-transparan.webp" alt="Logo Agung Perkasa Borepile" width="42" height="42" />
      <span>Agung Perkasa <br />Borepile</span>
    </a>
    <button class="apx-nav-toggle" id="mobile-menu" aria-label="Menu navigasi" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="apx-nav-menu" role="list">
      <li role="listitem"><a href="/">Beranda</a></li>
      <li class="dropdown" role="listitem">
        <span class="dropbtn">Layanan <Icon name="chevron-down" size={14} /></span>
        <ul class="dropdown-content">
          <li><a href="/jasa/bore-pile/">Jasa Bore Pile Mesin (Mini Crane)</a></li>
          <li><a href="/jasa/strauss-pile/jakarta.html">Jasa Strauss Pile (Manual)</a></li>
        </ul>
      </li>
      <li class="dropdown" role="listitem">
        <span class="dropbtn">Alat <Icon name="chevron-down" size={14} /></span>
        <ul class="dropdown-content">
          <li><a href="/alat/index.html#bore-pile">Bore Pile</a></li>
          <li><a href="/alat/index.html#strauss-pile">Strauss Pile</a></li>
        </ul>
      </li>
      <li role="listitem"><a href="/artikel/">Artikel</a></li>
      <li role="listitem"><a href="/#about">Tentang Kami</a></li>
      <li role="listitem"><a href="/#faq">FAQ</a></li>
      <li role="listitem"><a href="/galeri/gallery.html" class="btn-nav">Galeri</a></li>
      <li role="listitem">
        <a href={`https://wa.me/${config.company.whatsapp}?text=Halo%20Pak%2C%20Saya%20dari%20website%20ingin%20menanyakan%20terkait%20penawaran%20harga.`}
           class="apx-nav-wa" target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" size={16} /> Chat WA
        </a>
      </li>
    </ul>
  </div>
</nav>

<style>
  .apx-nav { position: sticky; top: 0; z-index: 1000; background: #fff; border-bottom: 1px solid var(--apx-border); }
  .apx-nav-inner { display: flex; align-items: center; justify-content: space-between; min-height: 64px; gap: 16px; }
  .apx-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--apx-navy); font-weight: 800; font-size: .85rem; line-height: 1.15; }
  .apx-nav-logo img { object-fit: contain; }
  .apx-nav-menu { display: flex; align-items: center; gap: 2px; list-style: none; margin: 0; padding: 0; }
  .apx-nav-menu > li { position: relative; }
  .apx-nav-menu a, .apx-nav-menu .dropbtn { display: inline-flex; align-items: center; gap: 5px; padding: 8px 12px; color: var(--apx-text); text-decoration: none; font-weight: 600; font-size: .95rem; border-radius: var(--apx-radius-sm); cursor: pointer; }
  .apx-nav-menu a:hover, .apx-nav-menu .dropbtn:hover { color: var(--apx-navy); background: var(--apx-tint); }
  .btn-nav { color: var(--apx-orange); }
  .apx-nav-wa { background: var(--apx-wa); color: #fff !important; }
  .apx-nav-wa:hover { background: var(--apx-wa-2); color: #fff !important; }
  .dropdown-content { position: absolute; top: 100%; left: 0; min-width: 240px; background: #fff; border: 1px solid var(--apx-border); border-radius: var(--apx-radius-sm); box-shadow: var(--apx-shadow-2); list-style: none; margin: 0; padding: 6px; opacity: 0; visibility: hidden; transform: translateY(6px); transition: all .2s ease; }
  .dropdown:hover .dropdown-content, .dropdown:focus-within .dropdown-content { opacity: 1; visibility: visible; transform: translateY(0); }
  .dropdown-content a { display: block; font-weight: 500; }
  .apx-nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: 0; padding: 8px; cursor: pointer; }
  .apx-nav-toggle span { width: 22px; height: 2px; background: var(--apx-navy); border-radius: 2px; transition: transform .2s ease, opacity .2s ease; }
  .apx-nav-toggle[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .apx-nav-toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
  .apx-nav-toggle[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  @media (max-width: 900px) {
    .apx-nav-toggle { display: flex; }
    .apx-nav-menu { display: none; position: fixed; inset: 64px 0 0; background: var(--apx-navy); flex-direction: column; align-items: stretch; padding: 16px; overflow-y: auto; }
    .apx-nav.menu-open .apx-nav-menu, .apx-nav:has(.apx-nav-toggle[aria-expanded="true"]) .apx-nav-menu { display: flex; }
    .apx-nav-menu a, .apx-nav-menu .dropbtn { color: #fff; padding: 13px 14px; border-radius: var(--apx-radius-sm); font-size: 1rem; }
    .apx-nav-menu a:hover { background: var(--apx-navy-2); color: #fff; }
    .dropdown-content { position: static; opacity: 1; visibility: visible; transform: none; box-shadow: none; border: 0; background: var(--apx-navy-2); }
    .dropdown-content a { color: rgb(255 255 255 / .85); }
  }
</style>

<script>
  const btn = document.getElementById('mobile-menu');
  btn?.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
  });
</script>
```

- [ ] **Step 2: Footer v2**

Struktur kolom sama dengan `src/components/global/Footer.astro` (judul, urutan link, teks kontak dari `config.json` — salin apa adanya), ganti kulit:

```astro
---
// src/components/global/v2/Footer.astro
import Icon from '../ui/Icon.astro';
import config from '../../../data/config.json';
---
<footer class="apx-footer">
  <div class="apx-container apx-footer-grid">
    <div>
      <h3>{config.siteName}</h3>
      <p>Spesialis pondasi borepile mesin & manual dengan pengalaman lebih dari 10 tahun di JABODETABEK dan seluruh Pulau Jawa.</p>
      <div class="apx-social">
        <a href={config.company.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Icon name="facebook" size={16} /></a>
        <a href={config.company.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="instagram" size={16} /></a>
      </div>
    </div>
    <div>
      <h3>Layanan</h3>
      <ul>
        <li><a href="/jasa/bore-pile/">Jasa Bore Pile</a></li>
        <li><a href="/jasa/strauss-pile/jakarta.html">Jasa Strauss Pile</a></li>
        <li><a href="/harga/bore-pile-2026.html">Kalkulator Biaya Bore Pile</a></li>
        <li><a href="/#contact">Konsultasi Pondasi Dalam</a></li>
      </ul>
    </div>
    <div>
      <h3>Tentang Kami</h3>
      <ul>
        <li><a href="/#about">Tentang Kami</a></li>
        <li><a href="/galeri/gallery.html">Galeri</a></li>
        <li><a href="/artikel/">Blog Artikel</a></li>
      </ul>
    </div>
    <div>
      <h3>Kontak</h3>
      <ul>
        <li><Icon name="map-pin" size={14} /> {config.company.address}</li>
        <li><Icon name="phone" size={14} /> {config.company.phone}</li>
        <li><Icon name="mail" size={14} /> {config.company.email}</li>
      </ul>
    </div>
  </div>
  <div class="apx-footer-bottom">
    <div class="apx-container">
      <p>&copy; {new Date().getFullYear()} {config.siteName}. All Rights Reserved.</p>
    </div>
  </div>
</footer>

<style>
  .apx-footer { background: var(--apx-navy); color: rgb(255 255 255 / .75); margin-top: 64px; font-size: .9rem; }
  .apx-footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; padding-block: 48px 32px; }
  .apx-footer h3 { color: #fff; font-size: 1rem; margin: 0 0 14px; font-weight: 800; }
  .apx-footer ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
  .apx-footer a { color: rgb(255 255 255 / .75); text-decoration: none; }
  .apx-footer a:hover { color: #fff; }
  .apx-footer li { display: flex; gap: 8px; align-items: baseline; }
  .apx-footer li :global(svg) { flex-shrink: 0; color: var(--apx-blue); transform: translateY(2px); }
  .apx-social { display: flex; gap: 10px; margin-top: 14px; }
  .apx-social a { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: rgb(255 255 255 / .1); color: #fff; transition: background .2s ease; }
  .apx-social a:hover { background: var(--apx-orange); }
  .apx-footer-bottom { border-top: 1px solid rgb(255 255 255 / .12); padding-block: 14px; font-size: .78rem; color: rgb(255 255 255 / .5); }
  .apx-footer-bottom p { margin: 0; }
</style>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: sukses.

---

### Task 7: WhatsAppFloat v2 + ScrollTop v2

**Files:**
- Create: `src/components/global/v2/WhatsAppFloat.astro`
- Create: `src/components/global/v2/ScrollTop.astro`

**Interfaces:**
- Consumes: `Icon.astro`, `config.json`.
- Produces: float hijau WA (posisi/perilaku sama seperti aslinya), tombol ke atas navy (muncul setelah 300px scroll).

- [ ] **Step 1: WhatsAppFloat v2**

```astro
---
// src/components/global/v2/WhatsAppFloat.astro
import Icon from '../ui/Icon.astro';
import config from '../../../data/config.json';
---
<a href={`https://wa.me/${config.company.whatsapp}?text=Halo%20Pak%2C%20Saya%20dari%20website%20ingin%20menanyakan%20terkait%20penawaran%20harga%20bore%20pile.`}
   class="apx-wa-float" target="_blank" rel="noopener noreferrer" aria-label="Chat konsultasi melalui WhatsApp">
  <Icon name="whatsapp" size={28} />
</a>

<style>
  .apx-wa-float {
    position: fixed; bottom: 20px; right: 20px; z-index: 100;
    display: grid; place-items: center; width: 55px; height: 55px;
    border-radius: 50%; background: var(--apx-wa); color: #fff;
    box-shadow: var(--apx-shadow-2); transition: background .2s ease, transform .2s ease;
  }
  .apx-wa-float:hover { background: var(--apx-wa-2); transform: scale(1.06); }
  @media (max-width: 768px) { .apx-wa-float { width: 50px; height: 50px; right: 16px; bottom: 16px; } }
</style>
```

- [ ] **Step 2: ScrollTop v2**

```astro
---
// src/components/global/v2/ScrollTop.astro
import Icon from '../ui/Icon.astro';
---
<button class="apx-scrolltop" id="scrollTop" aria-label="Kembali ke atas">
  <Icon name="arrow-up" size={20} />
</button>

<style>
  .apx-scrolltop {
    position: fixed; bottom: 88px; right: 21px; z-index: 99;
    display: grid; place-items: center; width: 45px; height: 45px;
    border: 0; border-radius: 50%; background: var(--apx-navy); color: #fff;
    cursor: pointer; opacity: 0; visibility: hidden; transition: all .25s ease;
  }
  .apx-scrolltop.active { opacity: 1; visibility: visible; }
  .apx-scrolltop:hover { background: var(--apx-navy-2); }
  @media (max-width: 768px) { .apx-scrolltop { width: 40px; height: 40px; right: 17px; bottom: 78px; } }
</style>

<script>
  const btn = document.getElementById('scrollTop');
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    btn?.classList.toggle('active', window.scrollY > 300);
  }, { passive: true });
</script>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: sukses.

---

### Task 8: Komponen ui inti (SectionTitle, InfoCard, PriceTable, FaqAccordion, CtaBar, Breadcrumb)

**Files:**
- Create: `src/components/ui/SectionTitle.astro`
- Create: `src/components/ui/InfoCard.astro`
- Create: `src/components/ui/PriceTable.astro`
- Create: `src/components/ui/FaqAccordion.astro`
- Create: `src/components/ui/CtaBar.astro`
- Create: `src/components/ui/Breadcrumb.astro`

**Interfaces:**
- Consumes: `Icon.astro`, token.
- Produces (signature yang dipakai Task 9):
  - `<SectionTitle label="HARGA" title="…">` slot opsional subteks.
  - `<InfoCard title="…">` slot isi; prop `highlight?: boolean`.
  - `<PriceTable caption="…" head={[…]} rows={[[…], …]} highlightRows={[2]} />` — `highlightRows` = indeks baris 0-based yang diberi latar tint (menggantikan `style="background:#f9f9f9"` legacy).
  - `<FaqAccordion items={[{ q: "…", a: "…" }]} />`.
  - `<CtaBar waText="…" />` — judul/subteks fix sesuai pilot; tombol oranye "Minta Penawaran" (anchor `#contact` tidak ada di halaman ini → tombol utama = WA hijau + sekunder tel: oranye outline).
  - `<Breadcrumb items={[{ name: "Beranda", href: "/" }, …]} />` — item terakhir tanpa href, `aria-current="page"`.

- [ ] **Step 1: SectionTitle**

```astro
---
// src/components/ui/SectionTitle.astro
interface Props { label?: string; title: string }
const { label, title } = Astro.props;
---
<div class="apx-st">
  {label && <span class="apx-st-label">{label}</span>}
  <h2 class="apx-st-title">{title}</h2>
  <slot />
</div>
<style>
  .apx-st { margin-bottom: 24px; }
  .apx-st-label { display: inline-block; font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--apx-orange); margin-bottom: 6px; }
  .apx-st-title { font-size: clamp(22px, 3vw, 28px); line-height: 1.25; font-weight: 800; color: var(--apx-navy); margin: 0; }
</style>
```

- [ ] **Step 2: InfoCard**

```astro
---
// src/components/ui/InfoCard.astro
interface Props { title: string; highlight?: boolean }
const { title, highlight = false } = Astro.props;
---
<article class:list={["apx-card", { "apx-card-hi": highlight }]}>
  <h3>{title}</h3>
  <slot />
</article>
<style>
  .apx-card { background: #fff; border: 1px solid var(--apx-border); border-radius: var(--apx-radius); padding: 20px; box-shadow: var(--apx-shadow-1); }
  .apx-card-hi { border-left: 3px solid var(--apx-orange); }
  .apx-card h3 { margin: 0 0 8px; font-size: 1rem; font-weight: 800; color: var(--apx-navy); }
  .apx-card :global(p) { margin: 0; color: var(--apx-text); font-size: .95rem; }
</style>
```

- [ ] **Step 3: PriceTable**

```astro
---
// src/components/ui/PriceTable.astro
interface Props { caption: string; head: string[]; rows: (string | number)[][]; highlightRows?: number[] }
const { caption, head, rows, highlightRows = [] } = Astro.props;
---
<div class="apx-tablewrap">
  <table class="apx-table">
    <caption>{caption}</caption>
    <thead><tr>{head.map((h) => <th scope="col">{h}</th>)}</tr></thead>
    <tbody>
      {rows.map((cells, i) => (
        <tr class:list={{ "is-tint": highlightRows.includes(i) }}>
          {cells.map((c, j) => (
            <td data-label={head[j]}>{j === 1 ? <Fragment set:html={c} /> : c}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
<style>
  .apx-tablewrap { overflow-x: auto; border: 1px solid var(--apx-border); border-radius: var(--apx-radius); box-shadow: var(--apx-shadow-1); }
  .apx-table { width: 100%; border-collapse: collapse; font-size: .92rem; }
  .apx-table caption { text-align: left; padding: 10px 14px; font-size: .8rem; color: var(--apx-muted); }
  .apx-table th { background: var(--apx-navy); color: #fff; text-align: left; padding: 12px 14px; font-weight: 700; white-space: nowrap; }
  .apx-table td { padding: 11px 14px; border-top: 1px solid var(--apx-border); vertical-align: top; }
  .apx-table tbody tr:nth-child(even):not(.is-tint) { background: var(--apx-tint); }
  .apx-table tr.is-tint { background: #f9f9f9; }
  .apx-table td:nth-child(2) { color: var(--apx-orange); font-weight: 800; white-space: nowrap; }
  @media (max-width: 640px) {
    .apx-table thead { display: none; }
    .apx-table tr { display: block; border-top: 1px solid var(--apx-border); padding: 6px 0; }
    .apx-table td { display: flex; justify-content: space-between; gap: 12px; border: 0; }
    .apx-table td::before { content: attr(data-label); color: var(--apx-muted); font-weight: 600; }
  }
</style>
```

- [ ] **Step 4: FaqAccordion**

```astro
---
// src/components/ui/FaqAccordion.astro
import Icon from './Icon.astro';
interface Props { items: { q: string; a: string }[] }
const { items } = Astro.props;
---
<div class="apx-faq">
  {items.map((item) => (
    <details class="apx-faq-item">
      <summary>
        <span>{item.q}</span>
        <Icon name="chevron-down" size={16} />
      </summary>
      <div class="apx-faq-a" set:html={item.a} />
    </details>
  ))}
</div>
<style>
  .apx-faq { display: grid; gap: 10px; }
  .apx-faq-item { border: 1px solid var(--apx-border); border-radius: var(--apx-radius); background: #fff; }
  .apx-faq-item[open] { box-shadow: var(--apx-shadow-1); }
  .apx-faq summary { list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 15px 18px; font-weight: 700; color: var(--apx-navy); cursor: pointer; }
  .apx-faq summary::-webkit-details-marker { display: none; }
  .apx-faq summary :global(svg) { flex-shrink: 0; color: var(--apx-blue); transition: transform .2s ease; }
  .apx-faq-item[open] summary :global(svg) { transform: rotate(180deg); }
  .apx-faq-a { padding: 0 18px 15px; color: var(--apx-text); font-size: .95rem; }
</style>
```

- [ ] **Step 5: CtaBar**

```astro
---
// src/components/ui/CtaBar.astro
import Icon from './Icon.astro';
import config from '../../data/config.json';
interface Props { waMessage: string }
const { waMessage } = Astro.props;
const waHref = `https://wa.me/${config.company.whatsapp}?text=${encodeURIComponent(waMessage)}`;
---
<section class="apx-ctabar">
  <div class="apx-container apx-ctabar-inner">
    <div>
      <h2>Butuh bore pile untuk proyek Anda?</h2>
      <p>Dapatkan penawaran harga bore pile 2026 terbaru</p>
    </div>
    <div class="apx-ctabar-actions">
      <a href={waHref} class="apx-btn apx-btn-wa" target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} /> Konsultasi Gratis via WA</a>
      <a href={`tel:${config.company.phone.replace(/\s/g, '')}`} class="apx-btn apx-btn-outline"><Icon name="phone" size={16} /> {config.company.phone}</a>
    </div>
  </div>
</section>
<style>
  .apx-ctabar { background: linear-gradient(135deg, var(--apx-navy), var(--apx-navy-2)); color: #fff; margin-block: 48px; }
  .apx-ctabar-inner { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; justify-content: space-between; padding-block: 36px; }
  .apx-ctabar h2 { margin: 0 0 4px; font-size: clamp(20px, 3vw, 26px); font-weight: 800; }
  .apx-ctabar p { margin: 0; color: rgb(255 255 255 / .75); }
  .apx-ctabar-actions { display: flex; flex-wrap: wrap; gap: 12px; }
</style>
```

Catatan: judul/subteks CtaBar di atas mengikuti teks `cta-box` pilot ("Butuh bore pile untuk proyek Anda?" / "Dapatkan penawaran harga bore pile 2026 terbaru"). Karena itu blok `cta-box` lama di halaman pilot DIGANTI komponen ini (teks sama, bukan duplikat).

- [ ] **Step 6: Breadcrumb**

```astro
---
// src/components/ui/Breadcrumb.astro
import Icon from './Icon.astro';
interface Props { items: { name: string; href?: string }[] }
const { items } = Astro.props;
---
<nav class="apx-breadcrumb" aria-label="Breadcrumb navigasi">
  {items.map((item, i) => (
    <>
      {i > 0 && <Icon name="chevron-down" size={12} />}
      {item.href ? <a href={item.href}>{item.name}</a> : <span aria-current="page">{item.name}</span>}
    </>
  ))}
</nav>
<style>
  .apx-breadcrumb { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; font-size: .82rem; color: var(--apx-muted); margin-bottom: 16px; }
  .apx-breadcrumb a { color: var(--apx-muted); text-decoration: none; }
  .apx-breadcrumb a:hover { color: var(--apx-blue); text-decoration: underline; }
  .apx-breadcrumb [aria-current] { color: var(--apx-navy); font-weight: 700; }
  .apx-breadcrumb :global(svg) { transform: rotate(-90deg); color: var(--apx-border); }
</style>
```

- [ ] **Step 7: Build**

Run: `npm run build`
Expected: sukses.

---

### Task 9: Port kalkulator harga (vanilla)

**Files:**
- Create: `src/scripts/harga-calculator.ts` (atau `.js`)

**Interfaces:**
- Consumes: JSON pricing dari atribut `data-pricing` pada root section kalkulator (disuntik Task 10), elemen dengan ID sama seperti aslinya: `machineSelectRow`, `machineSelect`, `machineChoices`, `diameterSelect`, `diameterChoices`, `priceInput`, `depthInput`, `pointsInput`, `totalPrice`, `detailPrice`, `estimationTime`, `orderInfo`.
- Produces: fungsi global `window.sendToWA()` (dipanggil atribut `onclick` tombol pilot).

- [ ] **Step 1: Baca sumber**

Baca penuh `public/js/harga-calculator.js` (407 baris). Pahami: toggle metode mesin/manual, chips pilihan mesin & diameter, format rupiah pada input, hitung total = kedalaman × harga × titik, estimasi waktu dari `equipment.*.speed`, peringatan minimal order, format pesan WA di `sendToWA()`.

- [ ] **Step 2: Tulis port**

Buat modul yang mengekspor fungsi `initCalculator(root)` dan `sendToWA()`, membaca pricing dari `(document.getElementById('calculator-heading').closest('section')).querySelector('[data-pricing]').dataset.pricing` (JSON string). Salin logika & format keluaran **persis** dari file sumber (angka, pemisah ribuan `id-ID`, teks peringatan minimal order, format pesan WA). Ganti referensi class legacy (`method-btn`, dst.) dengan class `apx-calc-*` yang akan dipakai markup Task 10. Daftarkan sebagai modul halaman: `<script> import ... </script>` di pilot (Astro bundle + defer otomatis).

Acceptance (dicek manual setelah Task 10):
- Input: Mesin, Mini Crane, 30cm, kedalaman 12, 16 titik, harga kosong → hasil & teks estimasi waktu SAMA dengan kalkulator di `npm run preview` versi legacy (bandingkan angka `totalPrice`, `detailPrice`, `estimationTime`, `orderInfo`).
- `sendToWA()` membuka URL `wa.me` dengan teks pesan format sama seperti versi lama (nomor tujuan sama).

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: sukses (belum dipakai halaman).

---

### Task 10: Migrasi halaman pilot ke v2

**Files:**
- Modify: `src/pages/harga/bore-pile-2026.astro` (rewrite penuh, konten disalin dari versi lama)

**Interfaces:**
- Consumes: semua task sebelumnya.
- Produces: `/harga/bore-pile-2026.html` berkulit v2; konten & schema identik baseline Task 1.

- [ ] **Step 1: Frontmatter baru**

Simpan SEMUA nilai meta/schema dari file lama (title, description, og:*, twitter:*, orgLd, localBusinessLd argumen, formattedUpdate). Frontmatter baru:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumb from '../../components/ui/Breadcrumb.astro';
import InfoCard from '../../components/ui/InfoCard.astro';
import PriceTable from '../../components/ui/PriceTable.astro';
import FaqAccordion from '../../components/ui/FaqAccordion.astro';
import CtaBar from '../../components/ui/CtaBar.astro';
import Icon from '../../components/ui/Icon.astro';
import pricing from '../../data/harga.json';

const formattedUpdate = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric', month: 'long', year: 'numeric'
}).format(new Date(`${pricing.priceUpdatedAt}T00:00:00`));

// salin persis dari file lama:
const TITLE = "Harga Bore Pile 2026 Terbaru Per Meter | Kalkulator & Biaya Bore Pile";
const DESCRIPTION = "Harga bore pile 2026 terbaru seluruh Pulau Jawa. Mesin mulai Rp120.000/m, manual Rp75.000/m. Kalkulator estimasi biaya otomatis. Konsultasi gratis.";
const OG_TITLE = "Harga Bore Pile 2026 Terbaru | Kalkulator Biaya | Agung Perkasa";
const OG_DESCRIPTION = "Harga bore pile 2026 terbaru seluruh Pulau Jawa. Kalkulator estimasi biaya bore pile mesin & manual. Konsultasi gratis.";
const TW_TITLE = "Harga Bore Pile 2026 Terbaru | Agung Perkasa";
const TW_DESCRIPTION = "Harga bore pile 2026 terbaru. Kalkulator estimasi biaya otomatis. Konsultasi gratis.";
const WA_MSG = "Halo Pak, Saya dari website ingin menanyakan terkait penawaran harga bore pile 2026.";

const faqItems = [ /* 8 item: q = teks pertanyaan persis; a = paragraf jawaban persis (boleh berisi <strong>, lihat file lama baris 651-731) */ ];
---
```

OG image & type: `ogType="article"`, `image="https://agungperkasaborepile.com/imgs/logo-agung-perkasa.webp"`.

- [ ] **Step 2: Kerangka body dengan BaseLayout**

```astro
<BaseLayout title={TITLE} description={DESCRIPTION} ogType="article" design="v2">
  <!-- GTM noscript: salin persis dari file lama (baris 91) -->
  <a href="#main-content" class="skip-link">Langsung ke konten utama</a>
  <main id="main-content">
    <div class="apx-container apx-post">
      <!-- header halaman -->
      <header class="apx-post-hero">
        <nav-yang-sudah-di-render-BaseLayout tidak diulang />
        <Breadcrumb items={[
          { name: "Beranda", href: "/" },
          { name: "Harga", href: "/harga/" },
          { name: "Harga Bore Pile 2026" },
        ]} />
        <div class="apx-badge">Harga terbaru {formattedUpdate} | Konsultasi gratis</div>
        <h1 class="apx-post-title">Harga Bore Pile 2026 Terbaru Per Meter</h1>
        <p class="apx-post-meta">Update: {formattedUpdate} | <span>Agung Perkasa</span> | <span>Lokasi: Melayani JABODETABEK & Seluruh Pulau Jawa</span></p>
      </header>
      ...
```

Hapus baris komentar palsu `<nav-yang-sudah...>` — BaseLayout merender navbar; halaman mulai dari header. Struktur lanjutan: setiap section legacy dibungkus `<section class="apx-section">` (atau `apx-section alt` untuk latar tint) dengan ISI TEKS DISALIN PERSIS:

| Bagian lama (baris) | Kulit baru |
|---|---|
| illustration-row (161–171) | `apx-figure-row`: foto + teks sama, `width/height` sudah ada |
| calculator-box (173–238) | `apx-calc`: markup ID sama semua (machineSelect, dst.), tombol metode `class="apx-calc-method"`, `data-pricing={JSON.stringify(pricing)}` di root section, tombol WA `onclick="sendToWA()"`, note sama |
| tabel harga (241–286) | `PriceTable` ×2 (head `["Diameter","Harga (Rp/m)","Kedalaman Maks","Cocok Untuk"]`, rows dari `pricing.mesin`/`pricing.manual`; sel harga: `item.price ? \`Rp${item.price.toLocaleString('id-ID')}\` : 'Hubungi Kami'` — cek baseline: sel asli hanya angka + strong; ikuti baseline) |
| factors (289–320) | grid `InfoCard` ×5 + `sondir-note` → `apx-note` |
| biaya tambahan (323–331) | grid `InfoCard` ×4 |
| tips (333–340) | `apx-tips` (daftar sama) |
| contoh proyek (343–415) | `apx-project` kartu: foto + InfoCard, teks spesifikasi disalin persis termasuk `<strong class="price-total">` |
| perbandingan (418–463) | `PriceTable` dengan `highlightRows={[2,4]}` (baris 50cm & 80cm bergaris `#f9f9f9` di lama) + paragraf hint sama |
| keuntungan (466–474) | grid `InfoCard` ×4 |
| material (481–505) | grid `InfoCard` ×3 + hint |
| garansi (508–511) | `apx-guarantee` (blok tint hijau lembut → ubah ke tint biru brand; teks sama) |
| why-section + portfolio + equip (516–644) | `apx-why`: reasons-grid → InfoCard ringkas; portfolio grid foto sama (width/height sudah ada); equip grid sama (ikon ✓SVG lokal `/imgs/icons/*.svg` tetap dipakai) |
| FAQ (647–732) | `<FaqAccordion items={faqItems} />` — teks dari `faqItems` persis sama |
| cta-box (735–739) | `<CtaBar waMessage={WA_MSG} />` |
| internal-link-box (742–753) | `apx-links` (semua href & label sama) |

Bagian DI LUAR `main` tetap dirender dalam BaseLayout slot secara berurutan: artikel-section (759–821, kartu artikel pakai `Icon` untuk calendar/newspaper, teks sama), area layanan (824–834, `apx-area` grid, teks sama), maps (837–864, iframe & alamat sama), publisher-box (867–875, teks sama). Navbar/Footer/WA-float/scroll-top TIDAK ditulis di halaman (otomatis dari BaseLayout v2).

- [ ] **Step 3: Schema — salin 4 blok literal**

Blok `BreadcrumbList`, `Product`, `FAQPage` dari file lama (baris 933–1059) disalin **apa adanya** sebagai `<script type="application/ld+json">` literal. Blok Organization & LocalBusiness TIDAK disalin lagi — BaseLayout sudah me-render keduanya; pastikan argumen `localBusinessSchema({...})` di BaseLayout menghasilkan field sama: description pilot berbeda dari default BaseLayout!

  **Konflik diketahui:** BaseLayout me-render LocalBusiness dengan description default situs, sedangkan pilot punya description sendiri + `areaServed`. Solusi: tambah prop opsional `localBusinessOverride?: object` di BaseLayout — jika ada, dipakai menggantikan argumen default. Isi dengan objek persis dari pilot lama (baris 8–17).

- [ ] **Step 4: Scoped style halaman**

Tulis `<style>` di akhir file halaman berisi: `.apx-post` (max-width 860px), `.apx-post-hero` (latar navy, teks putih, radius bawah, padding 40px 24px; title putih 800 clamp(26px,4vw,38px)), `.apx-badge` (pill oranye), `.apx-post-meta` (rgb putih .75), `.apx-section` (padding-block 40px; `.alt` background tint, full-bleed via negative margin tidak perlu — cukup latar di wrapper luar), grid `.apx-grid` (repeat(auto-fit,minmax(220px,1fr)); gap 16px), `.apx-calc` (kartu putih border, result blok navy: label putih, `#totalPrice` oranye 800 32px), `.apx-note`, `.apx-tips`, `.apx-project`, `.apx-guarantee`, `.apx-why`, `.apx-links`, `.apx-area`, `.apx-publisher`. Semua warna via `var(--apx-*)`.

- [ ] **Step 5: Build + verifikasi identik**

Run: `npm run build`

Lalu jalankan verifikasi (simpan sebagai `tools/verify-renovasi.ps1` di repo — boleh dibuat, bukan file legacy):

```powershell
param([string]$Before, [string]$After)
function Extract($path) {
  $h = Get-Content $path -Raw
  $title = [regex]::Match($h, '<title>(.*?)</title>').Groups[1].Value
  $desc  = [regex]::Match($h, '<meta name="description" content="(.*?)"').Groups[1].Value
  $canon = [regex]::Match($h, '<link rel="canonical" href="(.*?)"').Groups[1].Value
  $h1    = ([regex]::Matches($h, '<h1[^>]*>(.*?)</h1>') | ForEach-Object { $_.Groups[1].Value.Trim() }) -join "`n"
  $hx    = ([regex]::Matches($h, '<h[23][^>]*>(.*?)</h[23]>') | ForEach-Object { $_.Groups[1].Value.Trim() }) -join "`n"
  $ld    = ([regex]::Matches($h, '<script type="application/ld\+json"[^>]*>(.*?)</script>', 'Singleline') |
            ForEach-Object { ($_ .Groups[1].Value | ConvertFrom-Json) }) |
            ForEach-Object { $_ | ConvertTo-Json -Depth 32 -Compress } | Sort-Object
  [pscustomobject]@{ title=$title; desc=$desc; canon=$canon; h1=$h1; hx=$hx; ld=($ld -join "`n") }
}
$b = Extract $Before; $a = Extract $After
$fail = 0
foreach ($k in 'title','desc','canon','h1','hx','ld') {
  if (($b.$k -ne $a.$k)) { Write-Host "BEDA: $k" -ForegroundColor Red; $fail++ }
  else { Write-Host "OK: $k" -ForegroundColor Green }
}
exit $fail
```
(Hati-hati typo: `$_.Groups[1]` tanpa spasi.) Jalankan:

```powershell
npm run build; if ($?) {
  powershell -File tools\verify-renovasi.ps1 `
    -Before "$env:TEMP\opencode\renovasi-snapshot\harga-bore-pile-2026-before.html" `
    -After "dist\harga\bore-pile-2026.html"
}
```
Expected: `OK:` untuk keenam kunci; exit code 0. Kalau BEDA: perbaiki halaman sampai lolos — JANGAN ubah baseline.

Catatan: `hx` bisa beda jika komponen menambah/mengubah heading — bandingkan manual; teks heading konten HARUS sama, heading fungsional komponen (mis. h2 CtaBar yang menggantikan h3 cta-box lama) diterima asal teksnya sama persis dengan yang lama.

- [ ] **Step 6: Verifikasi manual interaksi**

Run: `npm run preview`, buka `http://localhost:4321/harga/bore-pile-2026.html`
Cek: navbar sticky & dropdown & menu mobile jalan; kalkulator hitung sama dengan acceptance Task 9; FAQ buka-tutup; float WA & scroll-top muncul; tidak ada request ke `cdnjs.cloudflare.com`/`unpkg.com`/`fonts.googleapis.com` di tab Network (UI); console bersih.

---

### Task 11: PageSpeed & serah terima

**Files:** tidak ada perubahan file.

- [ ] **Step 1: PSI mobile**

```powershell
$r = Invoke-RestMethod "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://agungperkasaborepile.com/harga/bore-pile-2026.html&strategy=mobile"
```
Catatan: URL produksi belum berkulit baru — gunakan hasil deploy atau `npm run preview` + PSI via Chrome Lighthouse lokal (`npx` tidak boleh — pakai Chrome DevTools → Lighthouse mobile) terhadap `localhost:4321`. Expected: Performance â‰¥ 90 mobile; catat LCP/CLS.

- [ ] **Step 2: Laporkan ke pemilik**

Sertakan: hasil verifikasi identik (6×OK), skor Lighthouse, screenshot desktop+mobile, daftar file baru. Tunggu cek visual pemilik SEBELUM batch berikutnya. Jangan commit kecuali diminta.

---

## Self-Review

1. **Spec coverage:** tokens ✓(T3) font ✓(T2,T3) ikon ✓(T2,T3) token-map ✓
2. **Placeholder scan:** Task 9 Step 2 merujuk file sumber untuk port — disengaja (port 1:1 dari file nyata, bukan TBD). Task 10 faqItems merujuk baris file lama dengan instruksi "persis sama" — sumber jelas dan terukur.
3. **Type consistency:** nama komponen/props konsisten (`design`, `ApxStyles`, `items`, `rows`, `highlightRows`, `waMessage`, `data-pricing`, `__APX_PRICING__` → dirapikan jadi data-attribute saja di T9/T10).
