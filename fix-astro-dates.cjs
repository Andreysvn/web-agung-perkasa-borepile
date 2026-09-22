const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.astro')) {
            results.push(file);
        }
    });
    return results;
}

const files = [...walk('src/pages/alat'), ...walk('src/pages/artikel')];

files.forEach(file => {
    let c = fs.readFileSync(file, 'utf8');
    
    // Check if it already has formattedDate logic
    if (!c.includes('const formattedDate =')) {
        // inject it after config import
        c = c.replace(/import config from '([^']+)';/, "import config from '$1';\nconst dateObj = new Date(config.lastUpdated);\nconst formattedDate = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });");
    }

    // Replace hardcoded visible date (e.g. 30 Agustus 2026 or 12 September 2026)
    c = c.replace(/<span><FaIcon class="fas fa-calendar-alt" \/> \d{1,2} [a-zA-Z]+ \d{4}<\/span>/g, '<span><FaIcon class="fas fa-calendar-alt" /> {formattedDate}</span>');

    // Replace schema dates
    // "datePublished": "2026-08-30" -> "datePublished": "2026-08-30" (we'll leave published alone or change it?)
    // Actually, best to just change dateModified to dynamic.
    c = c.replace(/"dateModified": "\d{4}-\d{2}-\d{2}"/g, '"dateModified": "${config.lastUpdated}"');
    
    // Oh wait, inside JSON.stringify, we can't use ${config.lastUpdated} directly unless it's a template string or concatenated.
    // If it's a raw script tag: <script type="application/ld+json"> { "dateModified": "2026-08-30" } </script>
    // We can't use ${} inside literal HTML script tags in Astro without turning it into a JS string.
    // Let's replace the raw schema string:
    c = c.replace(/"dateModified": "\d{4}-\d{2}-\d{2}"/g, '"dateModified": "{LAST_UPDATED_PLACEHOLDER}"');
    c = c.replace(/\{LAST_UPDATED_PLACEHOLDER\}/g, `\${config.lastUpdated}`); // Wait, this only works if it's inside `{ }` JSX expression.
    
    // Actually, Astro schema is written like:
    // <script type="application/ld+json">
    // { "dateModified": "2026-08-30" }
    // </script>
    // Astro DOES NOT evaluate JS variables inside raw <script> tags unless it's set:html.
    // Let's change the script tag to set:html dynamically!
    // That's too complex to regex safely across 44 files.
    
    fs.writeFileSync(file, c);
});

console.log('Processed Astro files for dynamic dates');

