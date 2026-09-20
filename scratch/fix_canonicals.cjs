
const fs = require("fs");
const path = require("path");

const basePath = path.join("c:", "Users", "Asus", "OneDrive", "Dokumen", "web-agung-perkasa-borepile-main", "web-agung-perkasa-borepile-main");
const smallCities = ["bintaro", "bsd", "cibubur", "cikarang", "ciputat", "karawaci", "pamulang", "tangerang-selatan"];

smallCities.forEach(city => {
    const file = path.join(basePath, `src/pages/jasa/bore-pile-${city}.astro`);
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, "utf8");
        // replace `https://agungperkasaborepile.com/jasa/bore-pile/${cityData.slug}.html` 
        // with `https://agungperkasaborepile.com/jasa/${cityData.slug}.html`
        content = content.replace(
            /const canonical = `https:\/\/agungperkasaborepile\.com\/jasa\/bore-pile\/\$\{cityData\.slug\}\.html`;/,
            "const canonical = `https://agungperkasaborepile.com/jasa/${cityData.slug}.html`;"
        );
        fs.writeFileSync(file, content);
    }
});
console.log("Canonicals fixed!");

