
const fs = require("fs");
const path = require("path");

const dir = "./src";

function walkDir(d) {
    fs.readdirSync(d).forEach(file => {
        const fullPath = path.join(d, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith(".astro")) {
            let content = fs.readFileSync(fullPath, "utf8");
            
            // Regex to find standard GTM script block
            // It looks for "(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-P6GBTKJB');"
            // Since it might be multiline, we use a robust regex or simple string replacement.
            
            // Let's just replace the exact script tag contents
            let modified = false;
            
            const gtmRegex = /\(function\(w,d,s,l,i\)\{.*?\}\)\(window,document,'script','dataLayer','GTM-P6GBTKJB'\);/gs;
            if (gtmRegex.test(content)) {
                content = content.replace(gtmRegex, `
let gtmLoaded = false;
function loadGTM() {
  if (gtmLoaded) return;
  gtmLoaded = true;
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\"gtm.start\":
  new Date().getTime(),event:\"gtm.js\"});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!=\"dataLayer\"?\"&l=\"+l:\"\";j.async=true;j.src=
  \"https://www.googletagmanager.com/gtm.js?id=\"+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,\"script\",\"dataLayer\",\"GTM-P6GBTKJB\");
}
window.addEventListener(\"scroll\", loadGTM, {once: true});
window.addEventListener(\"mousemove\", loadGTM, {once: true});
window.addEventListener(\"touchstart\", loadGTM, {once: true});
setTimeout(loadGTM, 3500);
`);
                modified = true;
            }
            
            // Also we need to lazy load gtag for AW-16649506462 if present
            // <script is:inline defer src="https://www.googletagmanager.com/gtag/js?id=AW-16649506462"></script>
            // <script is:inline> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-16649506462'); </script>
            // Since GTM handles Google Ads typically, maybe AW is hardcoded too? Yes.
            // Let's wrap gtag in the same logic if it exists.
            
            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log("Updated GTM in " + fullPath);
            }
        }
    });
}

walkDir(dir);

