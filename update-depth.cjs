const fs = require('fs');
const path = require('path');

const kotaDir = path.join(__dirname, 'src', 'data', 'kota');
const hargaPath = path.join(__dirname, 'src', 'data', 'harga.json');

// 1. Update harga.json
let harga = JSON.parse(fs.readFileSync(hargaPath, 'utf8'));
if (harga.manual) {
    harga.manual.forEach(item => {
        if (item.maxDepth) {
            item.maxDepth = 6;
        }
    });
}
fs.writeFileSync(hargaPath, JSON.stringify(harga, null, 2));

// 2. Update kota JSON files
const files = fs.readdirSync(kotaDir).filter(f => f.endsWith('.json') && f !== 'index.json');

files.forEach(file => {
    const filePath = path.join(kotaDir, file);
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let modified = false;
    
    // Check projects
    if (data.projects) {
        data.projects.forEach(proj => {
            const isManual = proj.title.toLowerCase().includes('manual') || 
                             proj.title.toLowerCase().includes('strauss') ||
                             (proj.method && proj.method.toLowerCase().includes('manual')) ||
                             (proj.method && proj.method.toLowerCase().includes('strauss')) ||
                             (proj.specs && proj.specs.toLowerCase().includes('manual')) ||
                             (proj.specs && proj.specs.toLowerCase().includes('strauss'));
            
            if (isManual) {
                // Change depth in specs
                if (proj.specs && proj.specs.match(/kedalaman (\d+)m/i)) {
                    const depth = parseInt(proj.specs.match(/kedalaman (\d+)m/i)[1]);
                    if (depth > 6) {
                        proj.specs = proj.specs.replace(new RegExp(`kedalaman ${depth}m`, 'i'), 'kedalaman 6m');
                        modified = true;
                        
                        // Recalculate costCalc if it exists
                        if (proj.costCalc) {
                            // Find the points from specs or costCalc
                            // costCalc is like: "8m × Rp75.000 × 26 = Rp15.600.000"
                            const calcMatch = proj.costCalc.match(/(\d+)m × Rp([\d\.]+) × (\d+) = Rp([\d\.]+)/);
                            if (calcMatch) {
                                const priceStr = calcMatch[2].replace(/\./g, '');
                                const price = parseInt(priceStr);
                                const points = parseInt(calcMatch[3]);
                                const newTotal = 6 * price * points;
                                proj.costCalc = `6m × Rp${price.toLocaleString('id-ID')} × ${points} = Rp${newTotal.toLocaleString('id-ID')}`;
                            } else {
                                // another format? e.g. "8m x Rp75.000 x 26"
                                const calcMatch2 = proj.costCalc.match(/(\d+)m x Rp([\d\.]+) x (\d+)/i);
                                if (calcMatch2) {
                                    const priceStr = calcMatch2[2].replace(/\./g, '');
                                    const price = parseInt(priceStr);
                                    const points = parseInt(calcMatch2[3]);
                                    const newTotal = 6 * price * points;
                                    proj.costCalc = `6m × Rp${price.toLocaleString('id-ID')} × ${points} = Rp${newTotal.toLocaleString('id-ID')}`;
                                }
                            }
                        }
                        
                        // Recalculate total if it exists
                        if (proj.total) {
                            // Only update if we successfully parsed the price and points from somewhere
                             const calcMatch = proj.costCalc ? proj.costCalc.match(/= Rp([\d\.]+)/) : null;
                             if(calcMatch) {
                                 proj.total = `Rp ${calcMatch[1]}`;
                             }
                        }
                    }
                }
            }
        });
    }
    
    // String replacement for max depth texts
    let strData = JSON.stringify(data, null, 2);
    
    // Replace "hingga 8m", "maksimal 8 meter" etc specifically in manual contexts
    // This is hard to regex perfectly without false positives (mesin goes to 30m).
    // Let's just write back the JSON if modified
    if (modified) {
        fs.writeFileSync(filePath, strData);
        console.log(`Updated ${file}`);
    }
});

console.log('Script completed.');
