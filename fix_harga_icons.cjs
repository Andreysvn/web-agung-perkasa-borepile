
const fs = require("fs");
const path = require("path");

const dirs = ["30cm", "40cm", "50cm", "60cm", "80cm"];
dirs.forEach(d => {
    const p = path.join("src/pages/harga/bore-pile", d, "index.astro");
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, "utf8");
        content = content.replace(/<img src="\/imgs\/logo-agung-perkasa\.webp" alt=\{equip\.logoAlt\} width="24" height="24" onerror=\{`this\.src='\$\{equip\.image\}'`\}>/g, 
            `<img src="/imgs/logo-agung-perkasa-icon.webp" alt={equip.logoAlt} width="24" height="24" onerror={\`this.src='\${equip.image}'\`}>`);
        // Just generic replace to be safe
        content = content.replace(/"\/imgs\/logo-agung-perkasa\.webp" alt=\{equip\.logoAlt\} width="24"/g, `"/imgs/logo-agung-perkasa-icon.webp" alt={equip.logoAlt} width="24"`);
        
        fs.writeFileSync(p, content);
        console.log("Updated " + p);
    }
});

