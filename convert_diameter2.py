import os
import shutil

diameters = ["30", "40", "50", "60", "80"]

text_data = {
    "30": {
        "title": "Harga Bore Pile 30cm Terbaru 2026 Per Meter | Agung Perkasa",
        "desc": "Harga bore pile diameter 30cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp120.000/m, manual Rp70.000/m. Kalkulator estimasi biaya. Konsultasi gratis.",
        "h1": "Harga Bore Pile Diameter 30cm Terbaru 2026",
        "suitable": "rumah tinggal 1-3 lantai",
        "imgCaption": "Bore pile mini crane diameter 30cm untuk perumahan mewah",
        "paragraph": "<strong>Bore pile diameter 30cm</strong> adalah ukuran yang paling sering digunakan untuk rumah tinggal 1-3 lantai. Karena ukurannya yang efisien, alat yang digunakan pun bisa lebih fleksibel (mini crane atau manual), sehingga sangat cocok untuk proyek perumahan di gang sempit maupun perumahan elit."
    },
    "40": {
        "title": "Harga Bore Pile 40cm Terbaru 2026 Per Meter | Agung Perkasa",
        "desc": "Harga bore pile diameter 40cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp135.000/m, manual mulai Rp120.000/m. Kalkulator estimasi biaya. Konsultasi gratis.",
        "h1": "Harga Bore Pile Diameter 40cm Terbaru 2026",
        "suitable": "ruko dan kantor 2-3 lantai",
        "imgCaption": "Bore pile mini crane diameter 40cm untuk proyek ruko dan kantor",
        "paragraph": "<strong>Bore pile diameter 40cm</strong> adalah ukuran yang sering digunakan untuk bangunan komersial menengah seperti ruko, rukan, atau kantor 2-3 lantai. Daya dukungnya jauh lebih besar dibanding 30cm, sehingga mampu menahan beban struktur bentang menengah."
    },
    "50": {
        "title": "Harga Bore Pile 50cm Terbaru 2026 Per Meter | Agung Perkasa",
        "desc": "Harga bore pile diameter 50cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp190.000/m. Kalkulator estimasi biaya. Konsultasi gratis.",
        "h1": "Harga Bore Pile Diameter 50cm Terbaru 2026",
        "suitable": "gudang, pabrik kecil, dan gedung",
        "imgCaption": "Bore pile mini crane diameter 50cm untuk pabrik dan gudang",
        "paragraph": "<strong>Bore pile diameter 50cm</strong> adalah ukuran standar untuk bangunan industri seperti gudang, pabrik kecil, dan gedung 3-5 lantai. Hanya bisa dikerjakan dengan metode mesin (mini crane) karena beratnya volume tanah yang harus diangkat."
    },
    "60": {
        "title": "Harga Bore Pile 60cm Terbaru 2026 Per Meter | Agung Perkasa",
        "desc": "Harga bore pile diameter 60cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp260.000/m. Harga terbaik untuk proyek gedung bertingkat.",
        "h1": "Harga Bore Pile Diameter 60cm Terbaru 2026",
        "suitable": "gedung bertingkat 5-8 lantai",
        "imgCaption": "Pengeboran bore pile diameter 60cm untuk gedung bertingkat",
        "paragraph": "<strong>Bore pile diameter 60cm</strong> adalah spesifikasi untuk proyek *heavy duty* seperti gedung bertingkat tinggi (5-8 lantai), jembatan bentang menengah, atau fasilitas industri berat. Mengharuskan penggunaan crane kapasitas besar."
    },
    "80": {
        "title": "Harga Bore Pile 80cm Terbaru 2026 Per Meter | Agung Perkasa",
        "desc": "Harga bore pile diameter 80cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp300.000/m. Harga terbaik untuk proyek infrastruktur dan gedung.",
        "h1": "Harga Bore Pile Diameter 80cm Terbaru 2026",
        "suitable": "gedung tinggi dan infrastruktur",
        "imgCaption": "Pengeboran pondasi dalam bore pile diameter 80cm",
        "paragraph": "<strong>Bore pile diameter 80cm</strong> adalah ukuran raksasa yang diperuntukkan bagi gedung tinggi (high-rise building) dan proyek infrastruktur masif seperti flyover atau jembatan panjang. Pengerjaannya membutuhkan *heavy machinery* (mesin bor crane hidrolik)."
    }
}

content = """---
import config from '../../../../data/config.json';
import pricing from '../../../../data/harga.json';
import KotaLayout from '../../../../layouts/KotaLayout.astro';
import PriceTable from '../../../../components/shared/PriceTable.astro';
import FaIcon from '../../../../components/icons/FaIcon.astro';

export function getStaticPaths() {
  return [
    { params: { diameter: '30cm' } },
    { params: { diameter: '40cm' } },
    { params: { diameter: '50cm' } },
    { params: { diameter: '60cm' } },
    { params: { diameter: '80cm' } }
  ];
}

const { diameter } = Astro.params;
const diameterNum = diameter.replace('cm', '');

const textData = {
    "30": {
        "title": "Harga Bore Pile 30cm Terbaru 2026 Per Meter | Agung Perkasa",
        "desc": "Harga bore pile diameter 30cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp120.000/m, manual Rp70.000/m. Kalkulator estimasi biaya. Konsultasi gratis.",
        "h1": "Harga Bore Pile Diameter 30cm Terbaru 2026",
        "suitable": "rumah tinggal 1-3 lantai",
        "imgCaption": "Bore pile mini crane diameter 30cm untuk perumahan mewah",
        "paragraph": "<strong>Bore pile diameter 30cm</strong> adalah ukuran yang paling sering digunakan untuk rumah tinggal 1-3 lantai. Karena ukurannya yang efisien, alat yang digunakan pun bisa lebih fleksibel (mini crane atau manual), sehingga sangat cocok untuk proyek perumahan di gang sempit maupun perumahan elit."
    },
    "40": {
        "title": "Harga Bore Pile 40cm Terbaru 2026 Per Meter | Agung Perkasa",
        "desc": "Harga bore pile diameter 40cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp135.000/m, manual mulai Rp120.000/m. Kalkulator estimasi biaya. Konsultasi gratis.",
        "h1": "Harga Bore Pile Diameter 40cm Terbaru 2026",
        "suitable": "ruko dan kantor 2-3 lantai",
        "imgCaption": "Bore pile mini crane diameter 40cm untuk proyek ruko dan kantor",
        "paragraph": "<strong>Bore pile diameter 40cm</strong> adalah ukuran yang sering digunakan untuk bangunan komersial menengah seperti ruko, rukan, atau kantor 2-3 lantai. Daya dukungnya jauh lebih besar dibanding 30cm, sehingga mampu menahan beban struktur bentang menengah."
    },
    "50": {
        "title": "Harga Bore Pile 50cm Terbaru 2026 Per Meter | Agung Perkasa",
        "desc": "Harga bore pile diameter 50cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp190.000/m. Kalkulator estimasi biaya. Konsultasi gratis.",
        "h1": "Harga Bore Pile Diameter 50cm Terbaru 2026",
        "suitable": "gudang, pabrik kecil, dan gedung",
        "imgCaption": "Bore pile mini crane diameter 50cm untuk pabrik dan gudang",
        "paragraph": "<strong>Bore pile diameter 50cm</strong> adalah ukuran standar untuk bangunan industri seperti gudang, pabrik kecil, dan gedung 3-5 lantai. Hanya bisa dikerjakan dengan metode mesin (mini crane) karena beratnya volume tanah yang harus diangkat."
    },
    "60": {
        "title": "Harga Bore Pile 60cm Terbaru 2026 Per Meter | Agung Perkasa",
        "desc": "Harga bore pile diameter 60cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp260.000/m. Harga terbaik untuk proyek gedung bertingkat.",
        "h1": "Harga Bore Pile Diameter 60cm Terbaru 2026",
        "suitable": "gedung bertingkat 5-8 lantai",
        "imgCaption": "Pengeboran bore pile diameter 60cm untuk gedung bertingkat",
        "paragraph": "<strong>Bore pile diameter 60cm</strong> adalah spesifikasi untuk proyek *heavy duty* seperti gedung bertingkat tinggi (5-8 lantai), jembatan bentang menengah, atau fasilitas industri berat. Mengharuskan penggunaan crane kapasitas besar."
    },
    "80": {
        "title": "Harga Bore Pile 80cm Terbaru 2026 Per Meter | Agung Perkasa",
        "desc": "Harga bore pile diameter 80cm terbaru 2026 seluruh Pulau Jawa. Mesin mulai Rp300.000/m. Harga terbaik untuk proyek infrastruktur dan gedung.",
        "h1": "Harga Bore Pile Diameter 80cm Terbaru 2026",
        "suitable": "gedung tinggi dan infrastruktur",
        "imgCaption": "Pengeboran pondasi dalam bore pile diameter 80cm",
        "paragraph": "<strong>Bore pile diameter 80cm</strong> adalah ukuran raksasa yang diperuntukkan bagi gedung tinggi (high-rise building) dan proyek infrastruktur masif seperti flyover atau jembatan panjang. Pengerjaannya membutuhkan *heavy machinery* (mesin bor crane hidrolik)."
    }
};

const currentData = textData[diameterNum];

const breadcrumbItems = [
    { name: "Beranda", url: "https://agungperkasaborepile.com/" },
    { name: "Harga", url: "https://agungperkasaborepile.com/harga/bore-pile-2026.html" },
    { name: `Bore Pile ${diameter}`, url: `https://agungperkasaborepile.com/harga/bore-pile/${diameter}.html` }
];
---
<KotaLayout 
    title={currentData.title}
    description={currentData.desc}
    canonical={`https://agungperkasaborepile.com/harga/bore-pile/${diameter}.html`}
    cityName="Pulau Jawa"
    citySlug="jawa"
    geoRegion="ID-JW"
    geoPlacename="Pulau Jawa, Indonesia"
    breadcrumbItems={breadcrumbItems}
    localBusinessDesc={currentData.desc}
>
    <!-- BREADCRUMB -->
    <nav class="breadcrumb" aria-label="Breadcrumb navigasi">
        <a href="/">Beranda</a>
        <span class="separator">&nbsp;/&nbsp;</span>
        <a href="/harga/bore-pile-2026.html">Harga</a>
        <span class="separator">&nbsp;/&nbsp;</span>
        <span class="current" aria-current="page">Bore Pile {diameter}</span>
    </nav>
    
    <!-- H1 -->
    <h1 style="color: var(--primary-color); font-size: 1.8rem; margin-bottom: 10px;">{currentData.h1}</h1>
    <div style="margin-bottom: 20px; color: #6c757d; font-size: 0.85rem;">
        <span>Spesialisasi Diameter {diameter}</span> |
        <span>Tim Agung Perkasa</span>
    </div>

    <div class="update-badge">
        Harga terbaru 2026 | {currentData.suitable}
    </div>

    <!-- LEAD SINGKAT + GAMBAR -->
    <div class="illustration-row">
        <div class="illustration-img">
            <img src="/imgs/borepile-dan-truk-molen.webp" alt={`Proses pengeboran bore pile diameter ${diameter}`} width="400" height="250" fetchpriority="high">
            <div class="caption">{currentData.imgCaption}</div>
        </div>
        <div class="illustration-text">
            <p set:html={currentData.paragraph}></p>
        </div>
    </div>
    
    <div style="margin-top: 2rem;">
        <PriceTable />
    </div>

    <!-- ARTIKEL TERKAIT -->
    <section class="blog" style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
        <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Bacaan Terkait</h2>
        <div class="blog-grid projects-grid">
            <div class="project-card">
                <img src="/imgs/borepile-dekat-dinding.webp" alt="Harga Bore Pile 2026" loading="lazy" width="400" height="250">
                <div class="project-info">
                    <h3>Harga Bore Pile 2026</h3>
                    <p>Lihat harga terbaru untuk semua diameter bore pile terbaru 2026, lengkap dengan kalkulator estimasi biaya.</p>
                    <a href="/harga/bore-pile-2026.html" class="btn btn-primary">Baca Artikel &rarr;</a>
                </div>
            </div>
            <div class="project-card">
                <img src="/imgs/hasil-lubang-borepile.webp" alt="Bore Pile vs Tiang Pancang" loading="lazy" width="400" height="250">
                <div class="project-info">
                    <h3>Bore Pile VS Tiang Pancang</h3>
                    <p>Perbedaan mendasar antara bore pile dan tiang pancang, kelebihan, kekurangan, serta biaya yang perlu Anda persiapkan.</p>
                    <a href="/artikel/borepile-vs-tiang-pancang.html" class="btn btn-primary">Baca Artikel &rarr;</a>
                </div>
            </div>
        </div>
    </section>
</KotaLayout>
"""

with open("src/pages/harga/bore-pile/[diameter].astro", "w", encoding="utf-8") as f:
    f.write(content)

# Delete the old folders
for folder in folders:
    shutil.rmtree(f"{base_dir}/{folder}", ignore_errors=True)

print("Dynamic pricing pages generated and legacy folders removed!")
