
const fs = require("fs");
const path = require("path");

const basePath = path.join("c:", "Users", "Asus", "OneDrive", "Dokumen", "web-agung-perkasa-borepile-main", "web-agung-perkasa-borepile-main");

const bigCities = ["bogor", "depok", "tangerang", "bandung", "karawang", "semarang", "surabaya"];
const smallCities = ["bintaro", "bsd", "cibubur", "cikarang", "ciputat", "karawaci", "pamulang", "tangerang-selatan"];

function fixTemplate(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, "utf8");

    const soilMatch = content.match(/import CitySoil from '(.*?)components\/city\/CitySoil\.astro';/);
    if (!soilMatch) return;
    const prefix = soilMatch[1];

    if (!content.includes("import MaterialPackages")) {
        content = content.replace(
            /import CitySoil from '.*?';/,
            `import CitySoil from '${prefix}components/city/CitySoil.astro';\nimport MaterialPackages from '${prefix}components/shared/MaterialPackages.astro';\nimport CityGuarantee from '${prefix}components/city/CityGuarantee.astro';`
        );
    }

    if (!content.includes("ogImage={cityData.heroImage}")) {
        content = content.replace(
            /ogDescription=\{`Jasa Bore Pile \$\{cityData\.name\} terpercaya\. Harga Mesin mulai dari Rp.*?\/m, manual Rp.*?\/m\.(.*?)`\}/,
            `ogDescription={\`Jasa Bore Pile \${cityData.name} terpercaya. Harga Mesin mulai dari Rp\${mesinMulai}/m, manual Rp\${manualMulai}/m.$1\`}\n    ogImage={cityData.heroImage}`
        );
    }

    content = content.replace(
        /<PriceTable localPrices=\{cityData\.localPrices\} cityName=\{cityData\.name\} \/>/g,
        `<PriceTable cityName={cityData.name} />`
    );

    if (!content.includes("<MaterialPackages")) {
        content = content.replace(
            /<!-- Section 8: Tips -->\s*<CityTips items=\{cityData\.tips\} \/>/,
            `<!-- Section 8: Tips -->\n    <CityTips items={cityData.tips} />\n\n    <!-- Section 8.5: Material Packages -->\n    <MaterialPackages packages={pricing.materialPackages} />`
        );
    }
    
    if (!content.includes("<CityGuarantee")) {
        content = content.replace(
            /<!-- Section 9\.5: Soil Reasoning -->\s*<CitySoil soilReasons=\{cityData\.soilReasons\} \/>/,
            `<!-- Section 9.5: Soil Reasoning -->\n    <CitySoil soilReasons={cityData.soilReasons} />\n\n    <!-- Section 9.8: Garansi -->\n    <CityGuarantee />`
        );
    }

    fs.writeFileSync(file, content);
}

function fixJson(file) {
    if (!fs.existsSync(file)) return;
    let data = JSON.parse(fs.readFileSync(file, "utf8"));
    let modified = false;

    if (data.mobilizationCost && data.additionalCosts && data.additionalCosts[0]) {
        data.additionalCosts[0].text = `${data.mobilizationCost}. Biaya disesuaikan dengan jarak lokasi proyek.`;
        modified = true;
    }

    if (data.soilReasons && data.soilReasons.description) {
        if (data.soilReasons.description.includes("Cengkareng") || data.soilReasons.description.includes("Pondok Gede") || data.soilReasons.description.includes("Bekasi Utara")) {
            data.soilReasons.description = `Wilayah ${data.name} memiliki kondisi tanah yang <strong>bervariasi dan di beberapa tempat cukup lunak</strong>. Metode bore pile menjadi solusi pondasi paling tepat karena:`;
            modified = true;
        }
    }
    
    if (data.soilReasons && data.soilReasons.points) {
        data.soilReasons.points.forEach(p => {
            if (p.desc.includes("Bekasi Utara") && data.name !== "Bekasi") {
                p.desc = p.desc.replace(/seperti di Bekasi Utara(\.)?/g, "di wilayah Anda.");
                modified = true;
            }
        });
    }

    if (data.soilReasons && data.soilReasons.conclusion) {
        if (data.soilReasons.conclusion.includes("PIK") || data.soilReasons.conclusion.includes("Sunter") || data.soilReasons.conclusion.includes("Bekasi Utara")) {
            data.soilReasons.conclusion = `<p>Setiap lokasi memiliki karakteristik tanah yang berbeda. Kami dapat menyesuaikan teknik bore pile untuk memastikan keberhasilan proyek di setiap wilayah di ${data.name}.</p><p><strong>Portofolio kami di ${data.name}:</strong> Kami telah berpengalaman mengerjakan berbagai proyek rumah, ruko, gudang dan bangunan lain di seluruh wilayah ${data.name} dan sekitarnya.</p>`;
            modified = true;
        }
    }

    if (["Semarang", "Surabaya"].includes(data.name)) {
        data.internalLinks = [
            { href: "/jasa/bore-pile/semarang.html", label: "Semarang" },
            { href: "/jasa/bore-pile/surabaya.html", label: "Surabaya" },
            { href: "/harga/bore-pile-2026.html", label: "Harga Bore Pile 2026" }
        ].filter(l => l.label !== data.name);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
    }
}

console.log("Syncing Templates...");
bigCities.forEach(city => {
    fixTemplate(path.join(basePath, `src/pages/jasa/bore-pile/${city}/index.astro`));
});
smallCities.forEach(city => {
    fixTemplate(path.join(basePath, `src/pages/jasa/bore-pile-${city}.astro`));
});

console.log("Fixing JSON Data...");
const allCities = [...bigCities, ...smallCities, "bekasi"];
allCities.forEach(city => {
    fixJson(path.join(basePath, `src/data/kota/${city}.json`));
});

console.log("Done.");

