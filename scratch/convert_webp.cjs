const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgsDir = path.join(__dirname, '../public/imgs');

const filesToConvert = [
    'header-beranda-bore-pile.jpg',
    'layanan-bore-pile-mesin-mini-crane.jpg',
    'hasil-lubang-borepile.jpg',
    'borepile-meruya-jakarta.jpg',
    'borepile-mesin-biru.jpg',
    'borepile-gedung-universitas-paramadina.jpg',
    'bore-pile-rumah-di-pik.jpg',
    'borepile-asrama-pesantren-az-zikra-bogor-agung-perkasa.jpg',
    'borepile-di-pinggir-sungai.jpg',
    'perakitan-besi-tulangan.jpg'
];

async function convert() {
    for (const file of filesToConvert) {
        const inputPath = path.join(imgsDir, file);
        if (fs.existsSync(inputPath)) {
            const outputPath = path.join(imgsDir, file.replace('.jpg', '.webp'));
            try {
                await sharp(inputPath)
                    .webp({ quality: 75 })
                    .toFile(outputPath);
                console.log(`Converted ${file} to WebP`);
                // Optional: remove old jpg
                // fs.unlinkSync(inputPath);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
}

convert();

