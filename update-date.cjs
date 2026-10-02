const fs = require('fs');
const path = require('path');

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.json')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('2026-09-22')) {
                content = content.replace(/"2026-09-22"/g, '"2026-10-02"');
                fs.writeFileSync(fullPath, content);
                console.log('Updated ' + fullPath);
            }
        }
    });
}

walk('src/data');
console.log('Done replacing dates in JSON files.');
