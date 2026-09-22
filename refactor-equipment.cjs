const fs = require('fs');

const folders = ['30cm', '40cm', '50cm', '60cm', '80cm'];

folders.forEach(folder => {
    const file = `src/pages/harga/bore-pile/${folder}/index.astro`;
    if (!fs.existsSync(file)) return;
    
    let c = fs.readFileSync(file, 'utf8');
    
    // Import CityEquipment if not already imported
    if (!c.includes('import CityEquipment')) {
        c = c.replace('import CityGuarantee from \'../../../../components/city/CityGuarantee.astro\';', 
                      'import CityGuarantee from \'../../../../components/city/CityGuarantee.astro\';\nimport CityEquipment from \'../../../../components/city/CityEquipment.astro\';');
    }
    
    // Find the hardcoded equipment block
    const startTag = '<h3 class="equip-title">Alat yang Kami gunakan di lapangan</h3>';
    const endTag = '<!-- ===== FAQ ===== -->';
    
    const startIdx = c.indexOf(startTag);
    const endIdx = c.indexOf(endTag);
    
    if (startIdx !== -1 && endIdx !== -1) {
        // The original code has an extra `</div>` right before `<!-- ===== FAQ ===== -->`
        // We MUST preserve it!
        const replacement = `<CityEquipment equipment={{ items: pageData.equipment, description: \`Kami memiliki beberapa alat untuk pekerjaan bore pile diameter \${pageData.diameter}, antara lain:\` }} cityName="" />\n            </div>\n\n            `;
        
        c = c.substring(0, startIdx) + replacement + c.substring(endIdx);
        fs.writeFileSync(file, c);
        console.log(`Refactored ${file}`);
    }
});

