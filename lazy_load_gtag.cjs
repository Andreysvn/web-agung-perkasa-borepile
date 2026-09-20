
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
            let modified = false;

            // Replace <script async src="https://www.googletagmanager.com/gtag/js?id=..."></script>
            // Replace <script defer src="https://www.googletagmanager.com/gtag/js?id=..."></script>
            // Replace <script is:inline defer src="https://www.googletagmanager.com/gtag/js?id=..."></script>
            
            const gtagRegex = /<script[^>]*src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=([^"']+)["'][^>]*><\/script>/g;
            
            if (gtagRegex.test(content)) {
                content = content.replace(gtagRegex, (match, id) => {
                    return `
<script is:inline type="text/javascript">
  let gtagLoaded = false;
  function loadGtag() {
    if (gtagLoaded) return;
    gtagLoaded = true;
    let script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + "${id}";
    script.async = true;
    document.head.appendChild(script);
  }
  window.addEventListener("scroll", loadGtag, {once: true});
  window.addEventListener("mousemove", loadGtag, {once: true});
  window.addEventListener("touchstart", loadGtag, {once: true});
  setTimeout(loadGtag, 3500);
</script>
`;
                });
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log("Updated Gtag in " + fullPath);
            }
        }
    });
}

walkDir(dir);

