const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
}

const htmlFiles = walk('dist');
let missingImgs = 0;
let brokenLinks = 0;
let imgs = new Set();
let links = new Set();

htmlFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    
    // Check images
    const imgMatches = content.matchAll(/src="(\/imgs\/[^"]+)"/g);
    for (const m of imgMatches) {
        imgs.add(m[1]);
    }
    
    // Check links
    const linkMatches = content.matchAll(/href="(\/[^"]*\.html)"/g);
    for (const m of linkMatches) {
        links.add(m[1]);
    }
});

for (const img of imgs) {
    const fp = path.join('public', img);
    if (!fs.existsSync(fp)) {
        console.log('MISSING IMG:', img);
        missingImgs++;
    }
}

for (const link of links) {
    const fp = path.join('dist', link);
    if (!fs.existsSync(fp)) {
        console.log('BROKEN LINK:', link);
        brokenLinks++;
    }
}

console.log(`Audit complete. Missing Images: ${missingImgs}, Broken Links: ${brokenLinks}`);

