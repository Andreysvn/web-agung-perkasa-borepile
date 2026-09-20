const fs = require('fs');

const oldH = fs.readFileSync('dist_old.html', 'utf16le').replace(/\s+/g, ' '); // Wait, git show redirected in powershell is utf16le? 
// No, let's just re-fetch with node to be safe.
const cp = require('child_process');
const o = cp.execSync('git show HEAD~1:dist/harga/bore-pile-2026.html', {encoding:'utf8'}).replace(/\s+/g, ' ');
const n = cp.execSync('git show HEAD:dist/harga/bore-pile-2026.html', {encoding:'utf8'}).replace(/\s+/g, ' ');

// Find where they diverge
let i = 0;
while (i < o.length && i < n.length && o[i] === n[i]) {
    i++;
}

console.log("Diverges at", i);
console.log("OLD context:", o.substring(i - 100, i + 300));
console.log("NEW context:", n.substring(i - 100, i + 300));

// Let's also do a reverse search to find what block is missing
let j = 1;
while (j < o.length && j < n.length && o[o.length - j] === n[n.length - j]) {
    j++;
}
console.log("Re-converges at", o.length - j, "in old");
console.log("Missing content from OLD:", o.substring(i, o.length - j));
