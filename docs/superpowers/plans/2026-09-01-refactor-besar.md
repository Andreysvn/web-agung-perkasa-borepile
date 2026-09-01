# Refactor Besar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor 41 halaman (kecuali beranda) agar konsisten, ringan, cepat, mudah dirawat, tanpa mengubah desain/konten.

**Architecture:** Shared layout + reusable components + shared scripts. Jakarta sebagai pilot/template.

**Tech Stack:** Astro, vanilla JavaScript, CSS existing

**Spec:** `AGENTS.md` (REFACTOR BESAR section)

---

## Global Constraints

- WhatsApp number: `6285710277854` (HANYA ini)
- Domain: `https://agungperkasaborepile.com`
- Tidak ubah desain/konten/visual
- Tidak tambah dependency baru
- Tidak edit CSS/JS legacy di `public/css/` dan `public/js/`
- Selalu test dengan `npm run build` setelah ubah file
- Node >= 22.12.0
- Edit file .astro pakai tool Edit/Write, JANGAN PowerShell Get-Content/Set-Content

---

## File Structure

### Shared Scripts (6 files baru)

```
src/scripts/shared/
├── navbar.js       → Navbar shrink, mobile menu, dropdown (~2KB)
├── faq.js          → FAQ accordion (~0.5KB)
├── scrolltop.js    → Scroll top button (~0.5KB)
├── calculator.js   → Kalkulator bore pile (~5KB)
├── lightbox.js     → Lightbox gallery (~1KB)
└── breadcrumb.js   → Breadcrumb active state (~0.5KB)
```

### Layouts (6 files baru)

```
src/layouts/
├── KotaLayout.astro      ← 9 kota + 8 area = 17 halaman
├── HargaLayout.astro     ← 5 harga + 1 strauss pile = 6 halaman
├── ArtikelLayout.astro   ← 11 artikel
├── GaleriLayout.astro    ← 2 galeri
├── AlatLayout.astro      ← 4 alat
└── JasaLayout.astro      ← 1 jasa (hub kota)
```

### Components (12 files baru)

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

## Task 1: Buat Shared Scripts

**Files:**
- Create: `src/scripts/shared/navbar.js`
- Create: `src/scripts/shared/faq.js`
- Create: `src/scripts/shared/scrolltop.js`
- Create: `src/scripts/shared/calculator.js`
- Create: `src/scripts/shared/lightbox.js`
- Create: `src/scripts/shared/breadcrumb.js`

- [ ] **Step 1: Buat folder `src/scripts/shared/`**

```bash
mkdir -p src/scripts/shared
```

- [ ] **Step 2: Buat `navbar.js`**

```javascript
// Navbar shrink
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('shrink', window.scrollY > 50);
  }, { passive: true });
}

// Mobile menu
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
if (mobileMenu && navMenu) {
  mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileMenu.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// Dropdown mobile
document.querySelectorAll('.dropdown .dropbtn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdown = this.closest('.dropdown');
      dropdown.classList.toggle('active');
      document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('active');
      });
    }
  });
});
```

- [ ] **Step 3: Buat `faq.js`**

```javascript
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    const answer = btn.nextElementSibling;
    if (answer) answer.classList.toggle('show');
  });
});
```

- [ ] **Step 4: Buat `scrolltop.js`**

```javascript
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('active', window.scrollY > 300);
  }, { passive: true });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
```

- [ ] **Step 5: Buat `calculator.js`**

```javascript
export function initCalculator(prices) {
  const diameterSelect = document.getElementById('diameterSelect');
  const depthInput = document.getElementById('depthInput');
  const pointsInput = document.getElementById('pointsInput');
  const totalPrice = document.getElementById('totalPrice');
  
  if (!diameterSelect || !depthInput || !pointsInput || !totalPrice) return;
  
  function hitungTotal() {
    const diameter = parseInt(diameterSelect.value);
    const kedalaman = parseFloat(depthInput.value);
    const titik = parseInt(pointsInput.value);
    const hargaPerMeter = prices[diameter] || 0;
    const total = hargaPerMeter * kedalaman * titik;
    totalPrice.textContent = 'Rp ' + total.toLocaleString('id-ID');
  }
  
  diameterSelect.addEventListener('change', hitungTotal);
  depthInput.addEventListener('input', hitungTotal);
  pointsInput.addEventListener('input', hitungTotal);
  hitungTotal();
}

window.sendToWA = function() {
  const diameter = document.getElementById('diameterSelect')?.value || '30';
  const kedalaman = document.getElementById('depthInput')?.value || '12';
  const titik = document.getElementById('pointsInput')?.value || '1';
  const msg = `Halo Pak, saya tertarik dengan jasa bore pile.\n\nDiameter: ${diameter}cm\nKedalaman: ${kedalaman}m\nJumlah Titik: ${titik}\n\nMohon info lebih lanjut.`;
  window.open(`https://wa.me/6285710277854?text=${encodeURIComponent(msg)}`, '_blank');
};
```

- [ ] **Step 6: Buat `lightbox.js`**

```javascript
export function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  let currentImages = [];
  let currentIndex = 0;
  
  function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex].src;
  }
  
  function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex].src;
  }
  
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
  
  return { openLightbox, closeLightbox };
}
```

- [ ] **Step 7: Buat `breadcrumb.js`**

```javascript
export function initBreadcrumb() {
  const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
  const currentPath = window.location.pathname;
  breadcrumbItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && currentPath.includes(href)) item.classList.add('active');
  });
}
```

- [ ] **Step 8: Test build** - Run: `npm run build`

- [ ] **Step 9: Commit** - `git add src/scripts/shared/ && git commit -m "feat: add shared scripts"`

---

## Task 2: Buat Shared Components

**Files:**
- Create: `src/components/shared/Navbar.astro`
- Create: `src/components/shared/Footer.astro`
- Create: `src/components/shared/WhatsAppFloat.astro`
- Create: `src/components/shared/ScrollTop.astro`
- Create: `src/components/shared/CtaBox.astro`
- Create: `src/components/shared/ArtikelSection.astro`
- Create: `src/components/shared/Breadcrumb.astro`
- Create: `src/components/shared/Hero.astro`
- Create: `src/components/city/Calculator.astro`
- Create: `src/components/city/PriceTable.astro`
- Create: `src/components/city/FAQ.astro`
- Create: `src/components/city/Projects.astro`

- [ ] **Step 1: Buat folder**

```bash
mkdir -p src/components/shared src/components/city
```

- [ ] **Step 2: Buat `Navbar.astro`** - Copy navbar HTML dari salah satu halaman existing, buat component dengan `activeItem` prop

- [ ] **Step 3: Buat `Footer.astro`** - Copy footer HTML, buat component dengan `description` prop

- [ ] **Step 4: Buat `WhatsAppFloat.astro`** - WhatsApp float button dengan link ke `6285710277854`

- [ ] **Step 5: Buat `ScrollTop.astro`** - Scroll top button

- [ ] **Step 6: Buat `CtaBox.astro`** - CTA box dengan `city` prop

- [ ] **Step 7: Buat `ArtikelSection.astro`** - Artikel section dengan `articles` array prop

- [ ] **Step 8: Buat `Breadcrumb.astro`** - Breadcrumb dengan `items` array prop

- [ ] **Step 9: Buat `Hero.astro`** - Hero section dengan `title` dan `description` props

- [ ] **Step 10: Buat `Calculator.astro`** - Calculator dengan `prices` object prop

- [ ] **Step 11: Buat `PriceTable.astro`** - Price table dengan `mesin` dan `manual` array props

- [ ] **Step 12: Buat `FAQ.astro`** - FAQ dengan `items` array prop

- [ ] **Step 13: Buat `Projects.astro`** - Projects dengan `projects` array prop

- [ ] **Step 14: Test build** - Run: `npm run build`

- [ ] **Step 15: Commit** - `git add src/components/ && git commit -m "feat: add shared components"`

---

## Task 3: Buat Layouts

**Files:**
- Create: `src/layouts/KotaLayout.astro`
- Create: `src/layouts/HargaLayout.astro`
- Create: `src/layouts/ArtikelLayout.astro`
- Create: `src/layouts/GaleriLayout.astro`
- Create: `src/layouts/AlatLayout.astro`
- Create: `src/layouts/JasaLayout.astro`

- [ ] **Step 1: Buat folder**

```bash
mkdir -p src/layouts
```

- [ ] **Step 2: Buat `KotaLayout.astro`** - Layout dengan Navbar, `<slot />`, CtaBox, ArtikelSection, Footer, WhatsAppFloat, ScrollTop, shared scripts. Props: title, description, canonical, activeItem, city

- [ ] **Step 3: Buat `HargaLayout.astro`** - Layout untuk halaman harga. Props: title, description, canonical, activeItem, diameter

- [ ] **Step 4: Buat `ArtikelLayout.astro`** - Layout untuk artikel. Props: title, description, canonical, activeItem

- [ ] **Step 5: Buat `GaleriLayout.astro`** - Layout untuk galeri. Props: title, description, canonical, activeItem

- [ ] **Step 6: Buat `AlatLayout.astro`** - Layout untuk alat. Props: title, description, canonical, activeItem

- [ ] **Step 7: Buat `JasaLayout.astro`** - Layout untuk jasa. Props: title, description, canonical, activeItem

- [ ] **Step 8: Test build** - Run: `npm run build`

- [ ] **Step 9: Commit** - `git add src/layouts/ && git commit -m "feat: add layouts"`

---

## Task 4: Refactor Jakarta sebagai PILOT

**⚠️ JANGAN SKIP TASK INI! Jakarta WAJIB selesai dulu sebagai patokan.**

**Files:**
- Modify: `src/pages/jasa/bore-pile/jakarta/index.astro` (949 baris → ~80 baris)

- [ ] **Step 1: Backup file jakarta/index.astro**

```bash
cp src/pages/jasa/bore-pile/jakarta/index.astro src/pages/jasa/bore-pile/jakarta/index.astro.backup
```

- [ ] **Step 2: Read file jakarta/index.astro** - Extract data: harga, FAQ, projects, kecamatan, articles, internal links

- [ ] **Step 3: Rewrite jakarta/index.astro** - Import KotaLayout + components, pass data sebagai props

- [ ] **Step 4: Test build** - Run: `npm run build`

- [ ] **Step 5: Test visual** - Run: `npm run preview`, buka `/jasa/bore-pile/jakarta.html`, pastikan tampilan sama persis

- [ ] **Step 6: Test fungsi** - Pastikan calculator, FAQ, WhatsApp link berfungsi

- [ ] **Step 7: Commit** - `git add src/pages/jasa/bore-pile/jakarta/ && git commit -m "refactor: jakarta using KotaLayout"`

---

## Task 5: Replikasi ke Halaman Lain

**HANYA setelah Jakarta diverifikasi berhasil.**

### 5a. Kota Lain (8 halaman)

- [ ] Bandung
- [ ] Bekasi
- [ ] Bogor
- [ ] Depok
- [ ] Karawang
- [ ] Semarang
- [ ] Surabaya
- [ ] Tangerang

### 5b. Harga (5 halaman)

- [ ] 30cm
- [ ] 40cm
- [ ] 50cm
- [ ] 60cm
- [ ] 80cm

### 5c. Area (8 halaman)

- [ ] Cikarang, Bintaro, BSD, Cibubur, Ciputat, Karawaci, Pamulang, Tangerang Selatan

### 5d. Artikel (11 halaman)

- [ ] Index + 10 artikel

### 5e. Galeri (2 halaman)

- [ ] Gallery + Gallery-2

### 5f. Alat (4 halaman)

- [ ] Index + 3 alat sub-pages

### 5g. Lainnya (2 halaman)

- [ ] Strauss Pile Jakarta
- [ ] Jasa Index

- [ ] **Final Test** - Run: `npm run build`, pastikan 44 halaman berhasil

- [ ] **Final Commit** - `git add -A && git commit -m "refactor: all pages using shared layouts"`

---

## Verification Checklist

Untuk SETIAP halaman yang di-refactor:

- [ ] `npm run build` berhasil
- [ ] HTML output identik dengan sebelumnya
- [ ] Tampilan visual sama persis
- [ ] Navbar berfungsi (mobile menu, dropdown, shrink)
- [ ] WhatsApp link benar (`6285710277854`)
- [ ] FAQ accordion berfungsi
- [ ] Calculator berfungsi (jika ada)
- [ ] Scroll top berfungsi
- [ ] Schema markup ada
- [ ] Canonical benar
- [ ] OG tags benar
