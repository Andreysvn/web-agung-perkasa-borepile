# Arsip Desain Navbar v2 (renovasi 2026-08-24)

Desain navbar hasil renovasi Batch 1 yang diputuskan pemilik untuk **tidak dilanjutkan** (pilot `/harga/bore-pile-2026.html` dikembalikan ke desain legacy pada 2026-08-24 karena pemilik tidak menyukai desain baru). Disimpan di sini kalau-kalau nanti dibutuhkan lagi.

## Isi

- `Navbar.astro` — komponen navbar versi v2 (namespace class `apx-*`, biru navy + aksen oranye, font Plus Jakarta Sans).

## Kalau mau menghidupkan lagi

File ini butuh dependensi berikut yang saat ini masih ada di repo (tidak dihapus, tapi tidak direferensikan halaman mana pun):

- `src/styles/tokens.css` + `src/styles/base.css` — design token & kelas dasar `--apx-*` / `.apx-*`
- `src/components/global/v2/ApxStyles.astro` — pintu muat CSS di `<head>`
- `src/components/ui/Icon.astro` — ikon SVG
- `public/fonts/plus-jakarta-sans-latin-var.woff2` — font self-host (preload)
- Wiring dual-mode di `src/layouts/BaseLayout.astro` (`design="v2"`)

Cara pakai: import `Navbar.astro` ini (atau salin balik ke `src/components/global/v2/`) dan muat `ApxStyles` via BaseLayout mode `v2`. Lihat riwayat AGENTS.md bagian renovasi untuk konteks penuh.
