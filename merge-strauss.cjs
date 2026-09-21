const fs = require('fs');
const path = require('path');

const currentPath = path.join(__dirname, 'src', 'pages', 'jasa', 'strauss-pile', 'jakarta', 'index.astro');
const oldPath = path.join(__dirname, 'src', 'pages', 'jasa', 'strauss-pile', 'jakarta', 'index_full.txt');

const currentContent = fs.readFileSync(currentPath, 'utf8');
const oldContent = fs.readFileSync(oldPath, 'utf8');

// Find where my new content ends (before SCHEMA MARKUP)
const currentParts = currentContent.split('<!-- ===== SCHEMA MARKUP ===== -->');
const topPart = currentParts[0].trim();

// Find where the old content should start (at <!-- ===== ARTIKEL ===== -->)
const oldParts = oldContent.split('<!-- ===== ARTIKEL ===== -->');
if (oldParts.length > 1) {
    let bottomPart = '<!-- ===== ARTIKEL ===== -->\n' + oldParts[1];
    
    // Remove the </BaseLayout> from topPart if it exists
    let finalTop = topPart.replace(/<\/BaseLayout>\s*$/, '');
    
    let finalContent = finalTop + '\n\n            ' + bottomPart;
    
    fs.writeFileSync(currentPath, finalContent);
    console.log('Successfully merged!');
} else {
    console.log('Could not find ARTIKEL section in old file. Trying internal link or Maps?');
    // Maybe it was written differently. Let's just look for ARTIKEL manually
}

