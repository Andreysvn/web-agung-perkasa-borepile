const fs = require('fs');
const path = require('path');

const kotaCssPath = 'public/css/borepile-kota.css';
let kotaCss = fs.readFileSync(kotaCssPath, 'utf8');

if (!kotaCss.includes('Accessibility Contrast Fix for WCAG')) {
    kotaCss += `\n/* Accessibility Contrast Fix for WCAG */\n.breadcrumb a, .faq-answer a, p a:not([class*="btn"]), li a:not([class*="btn"]) {\n  text-decoration: underline;\n  color: #0369a1;\n  font-weight: 500;\n}\n.breadcrumb a:hover, .faq-answer a:hover, p a:not([class*="btn"]):hover, li a:not([class*="btn"]):hover {\n  color: #075985;\n}\n`;
    fs.writeFileSync(kotaCssPath, kotaCss);
    console.log('Added accessibility fix to borepile-kota.css');
}

// Bust cache again for good measure
['src/layouts/BaseLayout.astro', 'src/layouts/BaseLayoutKota.astro', 'src/layouts/KotaLayout.astro'].forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/\.css\?v=\d+/g, '.css?v=11');
    fs.writeFileSync(f, content);
  }
});
console.log('Busted cache to v=11');
