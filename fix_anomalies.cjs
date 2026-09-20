const fs = require('fs');
const path = require('path');

const pricing = JSON.parse(fs.readFileSync('src/data/harga.json', 'utf8'));
const priceMap = {};
pricing.mesin.forEach(p => {
    priceMap[`{m${p.diameter}}`] = p.price ? p.price.toLocaleString('id-ID') : 'Hubungi Kami';
});
pricing.manual.forEach(p => {
    priceMap[`{mn${p.diameter}}`] = p.price ? p.price.toLocaleString('id-ID') : 'Hubungi Kami';
});

// Hardcode missing ones if any
priceMap['{m60}'] = 'Hubungi Kami';
priceMap['{m80}'] = 'Hubungi Kami';

// Let's also fix 60cm having {m50} by mistake
function fixText(text) {
    if (typeof text !== 'string') return text;
    
    // Fix encoding bugs
    text = text.replace(/m\u00C2\u00B2/g, 'm²'); // Â²
    text = text.replace(/mA/g, 'm²');
    text = text.replace(/m\u00C3\u00B2/g, 'm²');
    text = text.replace(/mÂ²/g, 'm²');
    text = text.replace(/m\u00C2\u00B3/g, 'm³'); // Â³
    
    text = text.replace(/\u00C3\u0097/g, '×'); // Ã× -> ×
    text = text.replace(/\u00C2\u00D7/g, '×'); // Â× -> ×
    text = text.replace(/A-/g, '×'); // In case it was mangled to A-
    text = text.replace(/A\u0097/g, '×');
    
    // Sometimes '×' is mangled as 'A' followed by some invisible char
    text = text.replace(/ Rp/g, ' Rp'); // clean up spaces
    
    // Fix `{m50}` in 60cm/80cm if it was copy-pasted
    // Actually, let's just replace all price variables
    for (const [key, val] of Object.entries(priceMap)) {
        text = text.split(key).join(val);
    }
    
    return text;
}

function traverse(obj) {
    if (Array.isArray(obj)) {
        obj.forEach((item, i) => {
            if (typeof item === 'string') obj[i] = fixText(item);
            else if (typeof item === 'object' && item !== null) traverse(item);
        });
    } else if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = fixText(obj[key]);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                traverse(obj[key]);
            }
        }
    }
}

const dir = 'src/data/harga-diameter';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

files.forEach(f => {
    const fp = path.join(dir, f);
    let data = JSON.parse(fs.readFileSync(fp, 'utf8'));
    
    // Specific fix for 60cm copy-paste error
    if (f === '60cm.json') {
        let str = JSON.stringify(data);
        str = str.replace(/\{m50\}/g, '{m60}'); // fix copy paste error before traversing
        data = JSON.parse(str);
    }
    if (f === '80cm.json') {
        let str = JSON.stringify(data);
        str = str.replace(/\{m50\}/g, '{m80}');
        data = JSON.parse(str);
    }
    
    traverse(data);
    fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
});

console.log("Fixed anomalies in JSON files.");

