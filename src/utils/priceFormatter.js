import pricing from '../data/harga.json';

const mesinMulai = pricing.mesin.find(item => item.price > 0)?.price || 120000;
const manualMulai = pricing.manual.find(item => item.price > 0)?.price || 75000;

export function formatPrices(text) {
    if (!text || typeof text !== 'string') return text;
    
    // Replace standard price tags
    let result = text.replace(/\{harga_mesin\}/g, mesinMulai.toLocaleString('id-ID'));
    result = result.replace(/\{harga_manual\}/g, manualMulai.toLocaleString('id-ID'));
    
    // Replace math formula tags e.g. {hitung:manual:6:26}
    // Output: 6m × Rp75.000 × 26 = Rp11.700.000
    result = result.replace(/\{hitung:(mesin|manual):(\d+):(\d+)\}/g, (match, type, depth, points) => {
        const price = type === 'mesin' ? mesinMulai : manualMulai;
        const total = price * parseInt(depth, 10) * parseInt(points, 10);
        return `${depth}m × Rp${price.toLocaleString('id-ID')} × ${points} = Rp${total.toLocaleString('id-ID')}`;
    });

    return result;
}
