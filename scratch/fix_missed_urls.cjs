const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

const targets = [
    path.join(__dirname, '../src'),
    path.join(__dirname, '../public')
];

let modifiedFiles = 0;

targets.forEach(dir => {
    walkDir(dir, function(filePath) {
        if (filePath.match(/\.(astro|json|js|xml|txt)$/)) {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;
            
            // Fix index.html in XML
            content = content.replace(/\/index\.html<\/loc>/g, '/</loc>');
            
            // 1. Escaped quotes in JSON: \.html\" -> /\"
            content = content.replace(/\.html\\"/g, '/\\"');
            
            // 2. XML / HTML tags like <loc>... .html</loc> -> /</loc>
            content = content.replace(/\.html<\/loc>/g, '/</loc>');
            
            // 3. Template literals in JS/Astro: .html` -> /`
            content = content.replace(/\.html`/g, '/`');
            
            // 4. Markdown links in llms.txt: .html) -> /)
            content = content.replace(/\.html\)/g, '/)');
            
            // Fix double slashes just in case (but not https://)
            // Be careful not to replace https://
            // We just replaced .html with / so we don't have double slash issues from this script,
            // but earlier I replaced `index.html` with empty string. 
            // The previous script handled .html" -> /"
            
            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                modifiedFiles++;
                console.log(`Updated: ${filePath}`);
            }
        }
    });
});

console.log(`Fixed missed URLs in ${modifiedFiles} files.`);

