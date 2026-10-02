const fs = require('fs');
const path = require('path');

// 1. Fix Accessibility (style.css)
const styleFile = 'public/css/style.css';
let css = fs.readFileSync(styleFile, 'utf8');

// Remove the !important from global a
css = css.replace(/a \{ text-decoration: none !important; \}/g, 'a { text-decoration: none; }');
css = css.replace(/a:hover \{ text-decoration: underline !important; \}/g, 'a:hover { text-decoration: underline; }');

// Append accessibility styles
css += `
/* Accessibility Contrast Fix for WCAG */
.breadcrumb a, .faq-answer a, p a:not([class*="btn"]), li a:not([class*="btn"]) {
  text-decoration: underline;
  color: #0369a1;
  font-weight: 500;
}
.breadcrumb a:hover, .faq-answer a:hover, p a:not([class*="btn"]):hover, li a:not([class*="btn"]):hover {
  color: #075985;
}
`;
fs.writeFileSync(styleFile, css);
console.log('Fixed accessibility in style.css');

// 2. Remove Google Ads Tags from all Astro files to fix 404 Console Error
function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.astro')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Remove hasGoogleAds={true}
            content = content.replace(/hasGoogleAds=\{true\}\s*/g, '');
            // Remove googleAdsId="..."
            content = content.replace(/googleAdsId="[^"]+"\s*/g, '');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log('Removed Google Ads from ' + fullPath);
            }
        }
    });
}
walk('src/pages');
console.log('Done!');

