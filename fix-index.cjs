const fs = require('fs');

let c = fs.readFileSync('src/pages/index.astro', 'utf8');

// The leaked code is directly after the closing `---`
// Let's just find the closing `---` and the opening `<BaseLayout`
// and remove everything in between!

const lines = c.split('\n');
let closingDashIndex = -1;
let baseLayoutIndex = -1;

for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---' && closingDashIndex === -1) {
        closingDashIndex = i;
    } else if (lines[i].includes('<BaseLayout') && baseLayoutIndex === -1) {
        baseLayoutIndex = i;
    }
}

if (closingDashIndex !== -1 && baseLayoutIndex !== -1 && baseLayoutIndex > closingDashIndex) {
    // Remove the lines in between
    lines.splice(closingDashIndex + 1, baseLayoutIndex - closingDashIndex - 1);
    fs.writeFileSync('src/pages/index.astro', lines.join('\n'));
    console.log('Successfully removed leaked code');
} else {
    console.log('Could not find the bounds');
}
