const fs = require('fs');

['src/layouts/BaseLayout.astro', 'src/layouts/BaseLayoutKota.astro', 'src/layouts/KotaLayout.astro'].forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    // Replace .css or .css?v=X with .css?v=10 to forcefully bust cache
    content = content.replace(/\.css(\?v=\d+)?/g, '.css?v=10');
    fs.writeFileSync(f, content);
    console.log('Updated ' + f);
  }
});
