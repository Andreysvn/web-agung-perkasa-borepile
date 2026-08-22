# CLAUDE.md

## Tentang Project

Project ini adalah migrasi website **Agung Perkasa Borepile** dari website lama berbasis HTML, CSS, dan JavaScript menjadi website berbasis Astro.

Website lama adalah **source of truth**.

Tujuan utama Claude adalah memigrasikan website ke Astro dengan hasil yang semirip mungkin dengan website lama.

### PENTING

**Ini adalah project migrasi, bukan redesign.**

Jangan mengubah desain, konten, struktur visual, fungsi, URL, atau SEO tanpa instruksi eksplisit.

---

# Aturan Utama Claude

## 1. Jangan Menebak

Sebelum mengubah kode:

* Periksa file yang berkaitan.
* Periksa struktur project.
* Periksa implementasi website lama.
* Cari component atau utility yang sudah ada.
* Pahami hubungan antara HTML, CSS, JavaScript, dan asset.

Jangan langsung membuat implementasi berdasarkan asumsi.

Jika informasi yang dibutuhkan tersedia di project, **baca project terlebih dahulu sebelum bertanya atau membuat asumsi**.

---

# 2. Website Lama Adalah Referensi Utama

Ketika memigrasikan halaman dari website lama:

1. Baca HTML asli.
2. Baca CSS yang digunakan.
3. Baca JavaScript yang digunakan.
4. Periksa asset dan gambar.
5. Periksa link.
6. Periksa metadata.
7. Pahami responsive behavior.
8. Baru buat implementasi Astro.

Jangan menganggap kode lama harus diubah hanya karena struktur kodenya terlihat kurang modern.

Yang harus dipertahankan adalah **hasil akhir website**.

---

# 3. Jangan Redesign

Claude **dilarang melakukan redesign secara otomatis**.

Jangan:

* Mengubah warna.
* Mengubah font.
* Mengubah layout.
* Mengubah spacing.
* Mengubah ukuran elemen.
* Mengubah navbar.
* Mengubah footer.
* Mengubah button.
* Mengubah card.
* Mengubah hero.
* Mengubah gambar.
* Mengubah animasi.
* Mengubah responsive behavior.
* Mengubah copywriting.
* Mengubah struktur konten.

Jika Claude merasa desain dapat dibuat lebih bagus:

> **Jangan ubah.**

Perbaikan desain hanya boleh dilakukan jika pengguna secara eksplisit meminta redesign.

---

# 4. Pertahankan Konten

Jangan mengubah isi website lama.

Pertahankan:

* Judul
* Heading
* Paragraph
* Deskripsi layanan
* Harga
* Informasi bisnis
* Kontak
* WhatsApp
* Alamat
* CTA
* FAQ
* Tabel
* Link
* Image
* Alt text
* Metadata
* Schema

Jangan membuat copywriting baru kecuali diminta.

Jangan menghapus konten yang dianggap "tidak penting".

---

# 5. Migrasi ke Astro

Gunakan Astro sebagai framework utama.

Utamakan:

* `.astro` components
* Astro pages
* Astro layouts
* Static generation
* Reusable components jika memang diperlukan

Jangan menggunakan React, Vue, Svelte, atau framework lain hanya untuk menyelesaikan masalah sederhana yang dapat ditangani langsung oleh Astro atau browser.

Jika project memang sudah menggunakan framework component tertentu, pertahankan penggunaan tersebut selama masih diperlukan.

---

# 6. Componentization

Gunakan component yang reusable jika memang masuk akal.

Contoh:

```text
Header
Navbar
Footer
Hero
Button
Breadcrumb
Gallery
FAQ
CTA
WhatsAppButton
```

Namun jangan membuat component hanya demi membuat component.

Sebelum membuat component baru:

1. Cari component yang sudah ada.
2. Jika bisa digunakan kembali, gunakan kembali.
3. Jika tidak ada, baru buat component baru.
4. Jangan melakukan abstraksi berlebihan.

Prioritasnya adalah **hasil website**, bukan jumlah component.

---

# 7. CSS

Pertahankan CSS lama selama masih relevan.

Jangan mengganti seluruh CSS hanya karena Astro memiliki cara lain untuk mengelola style.

Pertahankan:

* warna
* typography
* spacing
* layout
* breakpoint
* media query
* animation
* transition
* hover
* responsive behavior

Jika perlu melakukan perubahan CSS untuk memperbaiki bug, ubah seminimal mungkin.

Setelah perubahan CSS, pastikan tidak merusak halaman lain.

---

# 8. JavaScript

Pertahankan seluruh fungsi JavaScript website lama.

Sebelum menghapus atau mengganti JavaScript:

1. Cari semua tempat JavaScript tersebut digunakan.
2. Pahami fungsinya.
3. Pastikan tidak ada dependency tersembunyi.
4. Pastikan behavior tetap sama setelah migrasi.

Jika JavaScript perlu disesuaikan dengan Astro, lakukan perubahan seminimal mungkin.

---

# 9. URL dan SEO

Jangan mengubah URL website lama tanpa instruksi.

Pertahankan:

* URL
* internal links
* canonical
* title
* meta description
* heading hierarchy
* alt text
* structured data
* sitemap
* robots.txt
* Open Graph

SEO tidak boleh mengalami regression akibat migrasi.

---

# 10. Asset

Sebelum membuat atau mencari asset baru:

> Periksa asset yang sudah tersedia di project.

Gunakan asset lama jika tersedia.

Jangan mengganti gambar hanya karena ada gambar yang menurut Claude lebih bagus.

Pertahankan:

* gambar
* icon
* font
* logo
* favicon
* video
* asset lainnya

---

# Workflow Claude

Gunakan workflow berikut ketika mengerjakan task.

## Tahap 1 — Inspect

Sebelum coding:

* Periksa struktur project.
* Periksa file terkait.
* Periksa implementasi lama.
* Periksa component yang tersedia.
* Periksa asset.

Jangan langsung melakukan perubahan besar.

---

## Tahap 2 — Plan

Pahami apa yang harus dimigrasikan.

Identifikasi:

* halaman yang terpengaruh
* component yang diperlukan
* CSS yang diperlukan
* JavaScript yang diperlukan
* asset yang diperlukan
* kemungkinan masalah responsive
* kemungkinan masalah routing
* kemungkinan masalah SEO

Untuk perubahan kecil, tidak perlu membuat rencana panjang.

---

## Tahap 3 — Implement

Implementasikan perubahan sekecil mungkin.

Prinsip:

> **Minimal change, maximum compatibility.**

Jangan melakukan refactor besar yang tidak berhubungan dengan task.

---

## Tahap 4 — Verify

Setelah perubahan:

1. Jalankan development server.
2. Periksa halaman.
3. Periksa console.
4. Periksa layout.
5. Periksa responsive.
6. Periksa link.
7. Periksa asset.
8. Periksa fungsi JavaScript.

Jika memungkinkan, bandingkan dengan website lama.

---

## Tahap 5 — Fix

Jika terdapat:

* error
* bug
* missing asset
* CSS conflict
* routing problem
* JavaScript error
* responsive issue
* hydration issue

perbaiki masalah tersebut.

Jangan mengubah desain untuk menyelesaikan bug jika bug dapat diperbaiki dengan perubahan yang lebih kecil.

---

# Development Server

Saat menjalankan development server, gunakan:

```bash
astro dev --background
```

Untuk mengelola server:

```bash
astro dev status
astro dev logs
astro dev stop
```

Sebelum menjalankan server baru, periksa apakah server sudah berjalan.

Jangan menjalankan beberapa development server yang tidak diperlukan.

---

# Testing dan Build

Setelah perubahan yang signifikan, jalankan pemeriksaan yang tersedia di project.

Minimal pastikan:

```bash
npm run build
```

berhasil.

Jika project memiliki:

* lint
* typecheck
* test

jalankan pemeriksaan yang relevan.

Jangan menganggap pekerjaan selesai hanya karena halaman terlihat benar di browser jika production build masih gagal.

---

# Saat Menemukan Bug Lama

Jika menemukan bug yang sudah ada sebelum migrasi:

* Jangan otomatis memperbaikinya jika tidak diperlukan.
* Tentukan apakah bug tersebut mempengaruhi migrasi.
* Jika tidak berhubungan dengan task, jangan melakukan perubahan besar.

Jika bug menghambat fungsi website atau menyebabkan migrasi gagal:

> Perbaiki dengan perubahan seminimal mungkin.

---

# Saat Menemukan Fitur yang Kurang

Jika website Astro belum memiliki fitur yang ada di website lama:

1. Periksa implementasi website lama.
2. Pahami behavior-nya.
3. Implementasikan kembali di Astro.
4. Pertahankan desain dan behavior asli.

Jangan membuat versi baru hanya karena lebih mudah.

---

# Saat Menemukan Perbedaan Visual

Jika versi Astro terlihat berbeda dengan website lama:

**Jangan langsung menganggap versi Astro lebih baik.**

Cari penyebab perbedaannya.

Periksa:

* CSS
* inherited styles
* font
* ukuran container
* margin
* padding
* breakpoint
* image size
* image aspect ratio
* JavaScript
* DOM structure

Kemudian perbaiki agar hasilnya kembali mendekati website lama.

---

# Dokumentasi Astro

Gunakan dokumentasi resmi Astro sebagai referensi:

https://docs.astro.build

Untuk routing:

https://docs.astro.build/en/guides/routing/

Untuk Astro Components:

https://docs.astro.build/en/basics/astro-components/

Untuk framework components:

https://docs.astro.build/en/guides/framework-components/

Untuk content:

https://docs.astro.build/en/guides/content-collections/

Untuk styling:

https://docs.astro.build/en/guides/styling/

Untuk internationalization:

https://docs.astro.build/en/guides/internationalization/

Jika menghadapi masalah Astro yang tidak jelas, **gunakan dokumentasi resmi terlebih dahulu daripada menebak API Astro**.

---

# Dependency

Jangan install dependency baru tanpa alasan yang jelas.

Sebelum menggunakan package baru:

1. Periksa apakah Astro sudah memiliki solusi.
2. Periksa dependency yang sudah tersedia.
3. Gunakan browser API jika sudah mencukupi.
4. Gunakan dependency baru hanya jika benar-benar diperlukan.

Jangan menambahkan library hanya untuk menyelesaikan masalah sederhana.

---

# Git

Jangan melakukan operasi Git yang berisiko tanpa instruksi.

Jangan:

* `git reset --hard`
* `git clean -fd`
* force push
* menghapus branch
* menghapus commit

tanpa instruksi eksplisit.

Jangan mengubah pekerjaan pengguna yang belum di-commit.

Jika terdapat perubahan lokal yang bukan bagian dari task, **jangan hapus atau overwrite perubahan tersebut**.

---

# Aturan Keamanan Perubahan

Sebelum melakukan perubahan besar:

* Pastikan file yang akan diubah memang berkaitan dengan task.
* Jangan mengubah file yang tidak diperlukan.
* Jangan menghapus file lama sebelum memastikan migrasi sudah berhasil.
* Jangan melakukan mass replacement tanpa memahami dampaknya.

Jika sebuah perubahan berpotensi mempengaruhi banyak halaman, periksa dampaknya terlebih dahulu.

---

# Prioritas

Jika harus memilih antara beberapa hal, gunakan urutan prioritas berikut:

1. **Konten asli**
2. **Desain asli**
3. **Fungsi asli**
4. **URL**
5. **SEO**
6. **Responsive behavior**
7. **Perbaikan bug**
8. **Maintainability**
9. **Code cleanliness**
10. **Optimisasi tambahan**

Jangan mengorbankan nomor 1–7 hanya demi nomor 8–10.

---

# Definition of Done

Task migrasi dianggap selesai jika:

* Konten asli tetap ada.
* Desain tetap sama.
* Layout tetap sama.
* Responsive tetap bekerja.
* JavaScript tetap bekerja.
* Semua link bekerja.
* Asset berhasil dimuat.
* URL tetap benar.
* SEO tetap terjaga.
* Tidak ada error akibat migrasi.
* Production build berhasil.

Hasil akhirnya harus terlihat seperti:

> **Website Agung Perkasa Borepile yang sama, tetapi dibangun menggunakan Astro.**

Bukan redesign.

Bukan rebranding.

Bukan website baru.

**Ini adalah migrasi.**

---

# Prinsip Terakhir

Selalu ingat:

> **Jangan mengubah sesuatu hanya karena bisa diubah.**

> **Jangan memperbaiki sesuatu yang sebenarnya tidak rusak.**

> **Jangan mendesain ulang sesuatu yang tidak diminta untuk didesain ulang.**

> **Jika ada fitur di website lama, migrasikan.**

> **Jika migrasi menyebabkan bug, perbaiki.**

> **Jika kurang, rebuild berdasarkan implementasi website lama.**

> **Website lama adalah referensi utama.**
