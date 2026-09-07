# CLAUDE.md

**PENTING UNTUK CLAUDE:** File ini adalah *System Instructions* dan *Source of Truth* utama Anda. Baca dan patuhi seluruh aturan di sini sebelum melakukan modifikasi kode apa pun. Jika isi file ini berbeda dengan ingatan Anda atau instruksi sebelumnya, **ikuti file ini.**

## 1. Project & Scope

Migrasi website **Agung Perkasa Borepile** (jasa bore pile & strauss pile, seluruh konten Bahasa Indonesia) dari situs statis HTML/CSS/JS ke Astro. 
**Ini project migrasi, bukan redesign.** Website lama di folder `public/` adalah *source of truth*. 
- **DILARANG** mengubah desain, layout, dan URL.
- **DILARANG** mengubah copywriting atau menambah konten buatan sendiri tanpa instruksi eksplisit.
- **DILARANG** menghapus fitur, asset, atau metadata SEO yang sudah ada.

## 2. Perintah Dasar & Lingkungan

- `npm run dev` — Dev server di `localhost:4321`. Cek dulu apakah sudah berjalan; jangan menjalankan dua server.
- `npm run build` — Satu-satunya verifikasi otomatis (tidak ada script lint/test/typecheck). Wajib lolos sebelum task dinyatakan selesai.
- `npm run preview` — Serve hasil build dari `dist/`.
- **Node >= 22.12.0** (lihat `engines` di package.json). 
- **Tech Stack:** Astro dan Vanilla JS/CSS. **JANGAN** menggunakan React, Vue, Svelte, jQuery, atau library eksternal untuk masalah yang bisa diselesaikan Astro atau vanilla browser API (Mostly zero-JS). Gunakan JS klien hanya untuk kalkulator, menu mobile, FAQ, atau filter.

## 3. Aturan Bisnis Utama (CRITICAL)

- **Hydraulic / SANY:** Metode ini sudah **TIDAK DIGUNAKAN**. Hapus semua referensinya dari halaman aktif yang sedang dimigrasi. Namun, **jangan menghapus** data arsipnya di `src/data/harga-arsip-hidrolik.json` atau asset gambarnya.
- **Harga Manual:** Harga resmi mulai dari **Rp75.000/m**.
- **Minimum Order:** Gawangan minimum order adalah **200 meter**.
- **Data Source:** Selalu gunakan file JSON di `src/data/` sebagai sumber data tunggal (hindari hardcode di komponen):
  - `harga.json` (semua harga aktif & tanggal update)
  - `config.json` (identitas, kontak, WhatsApp, meta default)
  - `borepile-kota.json` (data spesifik tiap kota)

## 4. Model Migrasi (Non-Obvious)

Situs lama hidup sebagai file statis di `public/` dan dilayani apa adanya; halaman dimigrasikan bertahap ke `src/pages/`. Keduanya hidup berdampingan.

- **Referensi Legacy:** Snapshot website lama ada di `public/save web design juni 2026/` dan backup homepage di `public/legacy-index.html`. Gunakan ini untuk komparasi hasil akhir.
- **Format Routing:** `astro.config.mjs` memakai `build.format: 'file'`. Route `/x` akan menghasilkan `/x.html`, bukan `/x/index.html`.
- **Resep Migrasi 1 Halaman:**
  1. Buat `src/pages/<route>.astro`.
  2. Salin HTML legacy *verbatim*, termasuk seluruh `<head>` (title, description, canonical, OG, schema). Canonical di-hardcode ke `https://agungperkasaborepile.com`.
  3. Hubungkan data terstruktur dari JSON.
  4. Jika URL lama berakhiran `.html`, hapus file legacy di `public/`. Jika URL lama berupa direktori (`/x/index.html`), ganti file index lama dengan stub *meta-refresh* menuju `/x.html` yang baru (contoh: `public/jasa/index.html`).
- **Asset:** CSS/JS tetap vanilla di `public/css/` dan `public/js/`. Referensikan dengan path absolut. Perilaku JS lama harus sama persis.
- **Komponen:** Gunakan `Navbar`, `Footer`, `WhatsAppFloat`, `ScrollTop` di `src/components/global/` sebelum membuat baru.

## 5. Aturan Khusus Halaman Kota (SEO & Responsive)

- **SEO Unik:** Setiap halaman kota (contoh: Jakarta, Bekasi, Depok) harus punya Title, Meta Description, H1, Canonical, Area Layanan, Gambar, dan Konten lokal yang **RELEVAN DAN UNIK**.
- **Anti-Duplikasi:** Meskipun template sama, isi lokal harus berbeda. **JANGAN** sekadar *copy-paste* file Jakarta mentah-mentah ke kota lain tanpa menyesuaikan konteks kotanya.
- **Responsive:** Pastikan mobile-friendly, tidak ada *horizontal overflow*, dan proporsional di viewport 360px, 390px, 768px, hingga desktop.
- **File Terkait:** 
  - CSS: `public/css/borepile-kota.css`
  - JS Legacy: `public/js/borepile-kota.js`

## 6. Status Progress Saat Ini

**Sudah dimigrasikan ke Astro:**
- `/` (Beranda - `src/pages/index.astro`)
- `/harga/bore-pile-2026.html` (Harga Utama)
- `/jasa/` (Pusat Jasa)
- `/jasa/bore-pile/jakarta.html` (Pilot Halaman Kota - `src/pages/jasa/bore-pile/jakarta/index.astro`)
- Kalkulator JS sudah diekstrak ke `public/js/harga-calculator.js` dan membaca `src/data/harga.json`.

**Known Issues (JANGAN DIPERBAIKI tanpa diminta):**
- `BaseLayout` memakai `Astro.url.href` untuk canonical padahal `site` tidak diset di config (jadi localhost pada build).
- Tiga blok JSON-LD schema di `BaseLayout` dirender kosong pada hasil build.
*(Catatan: Halaman migrasi yang menyalin head manual tidak terdampak).*

## 7. Aturan Kerja & Git

- **Prioritas Pilihan:** Konten asli > desain > fungsi > URL > SEO > responsive > perbaikan bug.
- Jika hasil Astro berbeda dari legacy (visual/DOM), cari penyebabnya dan samakan. Jangan berasumsi versi baru lebih baik.
- **Git:** Working tree hampir selalu berisi perubahan WIP milik pengguna. JANGAN me-revert, stash, mereset git, atau menimpa file di luar scope. JANGAN `commit`/`push` tanpa diminta pengguna. Remote: `github.com/Andreysvn/web-agung-perkasa-borepile`.

---

## 🎯 Current Task (Tugas Saat Ini)

**Lanjutkan migrasi halaman kota berikutnya: BEKASI.**

**Instruksi Eksekusi:**
1. Buka dan baca HTML lama Bekasi di `public/` sebagai referensi.
2. Buat `src/pages/jasa/bore-pile/bekasi/index.astro` (atau ikuti struktur URL legacy).
3. Gunakan data Bekasi dari `src/data/borepile-kota.json`.
4. Buat metadata SEO unik (title, description, canonical) spesifik untuk Bekasi, jangan sampai duplikat dengan Jakarta.
5. Hubungkan harga, tanggal update, minimum order (gawangan 200m), dan script kalkulator ke data pusat.
6. Bersihkan semua teks/gambar terkait **hydraulic/SANY** dari halaman aktif Bekasi.
7. Pastikan tidak ada horizontal overflow di resolusi mobile.
8. Ganti file index legacy Bekasi dengan stub *meta-refresh* (jika URL aslinya adalah folder).
9. Jalankan `npm run build` untuk validasi.
10. Laporkan ringkasan file yang Anda buat/ubah.