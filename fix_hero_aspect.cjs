
const fs = require("fs");
const path = require("path");

function walkDir(d) {
    fs.readdirSync(d).forEach(file => {
        const fullPath = path.join(d, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith(".json")) {
            let content = fs.readFileSync(fullPath, "utf8");
            
            let modified = false;
            if (content.includes('"heroWidth": 350')) {
                content = content.replace(/"heroWidth": 350/g, `"heroWidth": 372`);
                modified = true;
            }
            if (content.includes('"heroHeight": 372')) {
                content = content.replace(/"heroHeight": 372/g, `"heroHeight": 350`);
                modified = true;
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log("Updated " + fullPath);
            }
        }
    });
}

walkDir("./src/data");

