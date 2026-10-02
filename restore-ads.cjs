const fs = require('fs');
const path = require('path');

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.astro')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Restore Google Ads props
            const props = '\n    hasGoogleAds={true}\n    googleAdsId="AW-16649506462"';
            
            if (content.includes('<KotaLayout') && !content.includes('hasGoogleAds={true}')) {
                content = content.replace(/<KotaLayout/, '<KotaLayout' + props);
            } else if (content.includes('<BaseLayoutKota') && !content.includes('hasGoogleAds={true}')) {
                content = content.replace(/<BaseLayoutKota/, '<BaseLayoutKota' + props);
            } else if (content.includes('<BaseLayout') && !content.includes('hasGoogleAds={true}') && fullPath.includes('harga')) {
                // We know harga/bore-pile-2026.astro had it
                content = content.replace(/<BaseLayout/, '<BaseLayout' + props);
            }
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log('Restored Google Ads to ' + fullPath);
            }
        }
    });
}
walk('src/pages');
console.log('Done restoring ads!');
