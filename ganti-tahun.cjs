const fs = require('fs');
const path = require('path');

const targetYear = process.argv[2];

if (!targetYear || !/^\d{4}$/.test(targetYear)) {
    console.error("❌ Gunakan perintah: node ganti-tahun.cjs 2027");
    process.exit(1);
}

const configPath = 'src/data/config.json';
let config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const currentYear = config.year || "2026";

if (currentYear === targetYear) {
    console.log(`Tahun sudah ${targetYear}, tidak ada yang perlu diubah.`);
    process.exit(0);
}

console.log(`🚀 Memulai proses ganti tahun dari ${currentYear} ke ${targetYear}...`);

// 1. GANTI NAMA FILE HARGA (ASTRO & JSON)
const oldAstroFile = `src/pages/harga/bore-pile-${currentYear}.astro`;
const newAstroFile = `src/pages/harga/bore-pile-${targetYear}.astro`;
if (fs.existsSync(oldAstroFile)) {
    fs.renameSync(oldAstroFile, newAstroFile);
    console.log(`✅ Rename file: ${oldAstroFile} -> ${newAstroFile}`);
}

const oldJsonFile = `src/data/harga-${currentYear}.json`;
const newJsonFile = `src/data/harga-${targetYear}.json`;
if (fs.existsSync(oldJsonFile)) {
    fs.renameSync(oldJsonFile, newJsonFile);
    console.log(`✅ Rename file: ${oldJsonFile} -> ${newJsonFile}`);
}

// 2. SISIR SELURUH FILE DALAM PROJECT UNTUK MENGGANTI URL & TEKS
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.astro') || file.endsWith('.json') || file.endsWith('.js') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src');
const yearRegex = new RegExp(`\\b${currentYear}\\b`, 'g');

files.forEach(file => {
    let original = fs.readFileSync(file, 'utf8');
    let c = original;
    
    // Ganti URL (internal links)
    const urlRegex = new RegExp(`/harga/bore-pile-${currentYear}/`, 'g');
    c = c.replace(urlRegex, `/harga/bore-pile-${targetYear}/`);
    
    // Ganti import file JSON di Astro
    const importRegex = new RegExp(`harga-${currentYear}\\.json`, 'g');
    c = c.replace(importRegex, `harga-${targetYear}.json`);
    
    // Ganti teks SEO yang mengandung tahun (khususnya untuk halaman Harga dan Kota)
    // Kita ganti kata "2026" jika didahului/diikuti kata "Harga", "Terbaru", "Bore Pile", dll.
    // Tapi karena kita ingin 'sapu bersih' SEO, kita bisa ganti semua tahun yang match,
    // ASALKAN BUKAN nama file gambar (webp/jpg/png).
    
    // Pecah jadi baris untuk menghindari merusak URL gambar
    let lines = c.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        // Jangan ganti tahun kalau ada ekstensi gambar di baris itu
        if (!line.match(/\.(webp|jpg|png|svg|jpeg|gif)/i)) {
            line = line.replace(yearRegex, targetYear);
        }
        lines[i] = line;
    }
    c = lines.join('\n');
    
    if (c !== original) {
        fs.writeFileSync(file, c);
    }
});

// 3. UPDATE CONFIG & HARGA.JSON TIMESTAMP
config.year = targetYear;
config.lastUpdated = new Date().toISOString().split('T')[0];
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

const hargaDataPath = 'src/data/harga.json';
let hargaData = JSON.parse(fs.readFileSync(hargaDataPath, 'utf8'));
hargaData.priceUpdatedAt = config.lastUpdated;
fs.writeFileSync(hargaDataPath, JSON.stringify(hargaData, null, 2));

console.log(`✅ SELESAI! Seluruh halaman, URL, dan tautan internal telah diperbarui ke ${targetYear}.`);
