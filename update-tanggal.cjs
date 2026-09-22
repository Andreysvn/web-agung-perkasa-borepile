const fs = require('fs');
const path = require('path');

const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

// Helper to strip BOM
function readJson(file) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    return JSON.parse(content);
}

// 1. Update config.json
const configPath = 'src/data/config.json';
let config = readJson(configPath);
config.lastUpdated = today;
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

// 2. Update harga.json
const hargaPath = 'src/data/harga.json';
let harga = readJson(hargaPath);
harga.priceUpdatedAt = today;
fs.writeFileSync(hargaPath, JSON.stringify(harga, null, 2));

// 3. Update semua file Kota
const kotaDir = 'src/data/kota/';
const kotaFiles = fs.readdirSync(kotaDir).filter(f => f.endsWith('.json'));
kotaFiles.forEach(file => {
    const filePath = path.join(kotaDir, file);
    let data = readJson(filePath);
    if (data.priceUpdatedAt) {
        data.priceUpdatedAt = today;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
});

// 4. Update semua file Harga Diameter
const hargaDir = 'src/data/harga-diameter/';
const hargaFiles = fs.readdirSync(hargaDir).filter(f => f.endsWith('.json'));
hargaFiles.forEach(file => {
    const filePath = path.join(hargaDir, file);
    let data = readJson(filePath);
    data.priceUpdatedAt = today; // Force insert if missing
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log(`✅ BERHASIL! Tanggal 'Update Terakhir' di SELURUH HALAMAN KOTA DAN HARGA telah diubah ke hari ini: ${today}`);
