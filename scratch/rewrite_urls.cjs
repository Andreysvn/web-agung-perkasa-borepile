const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let modifiedFiles = 0;

walkDir(srcDir, function(filePath) {
    if (filePath.endsWith('.astro') || filePath.endsWith('.json') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // 1. Fix index.html specially
        content = content.replace(/\/index\.html/g, '/');
        
        // 2. Replace .html" with /" (for hrefs and canonicals)
        content = content.replace(/\.html"/g, '/"');
        
        // 3. Replace .html# with /# (for anchor links)
        content = content.replace(/\.html#/g, '/#');
        
        // 4. Replace .html' with /' (just in case there are single quotes)
        content = content.replace(/\.html'/g, "/'");
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            modifiedFiles++;
        }
    }
});

console.log(`Replaced URLs in ${modifiedFiles} files.`);

