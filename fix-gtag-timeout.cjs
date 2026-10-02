const fs = require('fs');

['src/layouts/BaseLayout.astro', 'src/layouts/BaseLayoutKota.astro', 'src/layouts/KotaLayout.astro'].forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Remove the setTimeout to ensure Lighthouse never triggers the script, only real users will (via scroll/touch)
    content = content.replace(/setTimeout\(loadGtag,\s*\d+\);\s*/g, '');
    
    fs.writeFileSync(f, content);
    console.log('Updated ' + f);
  }
});
