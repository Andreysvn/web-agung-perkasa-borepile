const cp = require('child_process');
const fs = require('fs');

const oldHtml = cp.execSync('git show HEAD~1:dist/harga/bore-pile/30cm.html', {encoding: 'utf8'});
const newHtml = fs.readFileSync('dist/harga/bore-pile/30cm.html', 'utf8');

// A very basic HTML diff by extracting all text content and standardizing tags
function normalize(html) {
    return html.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
}

const nOld = normalize(oldHtml);
const nNew = normalize(newHtml);

// Find first difference
let diffIndex = -1;
for(let i=0; i<Math.min(nOld.length, nNew.length); i++) {
    if(nOld[i] !== nNew[i]) {
        diffIndex = i;
        break;
    }
}

if (diffIndex !== -1) {
    console.log("DIFFERENCE FOUND AT INDEX", diffIndex);
    console.log("OLD:", nOld.substring(Math.max(0, diffIndex - 50), diffIndex + 100));
    console.log("NEW:", nNew.substring(Math.max(0, diffIndex - 50), diffIndex + 100));
} else {
    console.log("HTML IS EXACTLY IDENTICAL (ignoring whitespace)");
}

