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
let anomaliesFound = false;

const anomalyRegexes = [
    { name: "String 'undefined'", regex: /\bundefined\b/g },
    { name: "String 'null' (outside of json-ld)", regex: /(?<!")\bnull\b(?!")/g },
    { name: "String 'NaN'", regex: /\bNaN\b/g },
    { name: "[object Object]", regex: /\[object Object\]/g },
    { name: "Empty href", regex: /href=""/g },
    { name: "Unresolved Astro variable", regex: /\{[a-zA-Z0-9_\.]+\}/g },
    { name: "Empty heading", regex: /<h[1-6][^>]*>\s*<\/h[1-6]>/g }
];

htmlFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    
    // We want to ignore the JSON-LD schemas which naturally have "null" or might have schema templates.
    // So let's strip out script tags first for the text checks.
    const textContent = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    anomalyRegexes.forEach(rule => {
        // Only check unresolved variables and empty tags outside scripts
        const targetContent = (rule.name === "Unresolved Astro variable" || rule.name.includes("Empty")) ? textContent : content;
        
        let match;
        while ((match = rule.regex.exec(targetContent)) !== null) {
            // Ignore some false positives
            if (rule.name === "String 'null' (outside of json-ld)" && match[0] === 'null') {
                // Ignore if it's inside an onerror="this.onerror=null;"
                const context = targetContent.substring(match.index - 20, match.index + 20);
                if (context.includes('onerror=null')) continue;
            }
            if (rule.name === "Unresolved Astro variable") {
                 // Check if it's a CSS template or something valid like { display: none }
                 const context = targetContent.substring(match.index - 5, match.index + 20);
                 if (context.includes('style') || context.includes('@media')) continue;
            }
            
            console.log(`Anomaly [${rule.name}] found in ${f}:`);
            console.log(`Context: ...${targetContent.substring(Math.max(0, match.index - 30), Math.min(targetContent.length, match.index + 30))}...`);
            anomaliesFound = true;
        }
    });
});

if (!anomaliesFound) {
    console.log("No anomalies found! HTML is clean.");
}

