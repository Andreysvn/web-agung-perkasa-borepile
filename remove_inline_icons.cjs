
const fs = require("fs");
const path = require("path");

function walkDir(d) {
    fs.readdirSync(d).forEach(file => {
        const fullPath = path.join(d, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith(".astro")) {
            let content = fs.readFileSync(fullPath, "utf8");
            
            const regex = /<img[^>]+width="24"[^>]*height="24"[^>]*>/g;
            if (regex.test(content)) {
                content = content.replace(regex, "");
                fs.writeFileSync(fullPath, content);
                console.log("Removed from " + fullPath);
            }
        }
    });
}

walkDir("./src");

