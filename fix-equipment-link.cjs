const fs = require('fs');

let c = fs.readFileSync('src/components/city/CityEquipment.astro', 'utf8');

const getUrlFunc = `
function getEquipmentUrl(name) {
    const n = name.toLowerCase();
    if (n.includes('gawang')) return '/alat/gawangan/';
    if (n.includes('strauss') || n.includes('manual')) return '/alat/strauss-pile/';
    return '/alat/mini-crane/';
}
`;

c = c.replace('const { equipment, cityName } = Astro.props;', 'const { equipment, cityName } = Astro.props;\n' + getUrlFunc);

c = c.replace(
    '<span class="equip-tag">{config.siteName.split(\' \')[0]}</span>',
    '<div style="margin-top: auto; padding-top: 15px;"><a href={getEquipmentUrl(item.name)} style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 600; color: #1a3a6e; text-decoration: none; padding: 6px 14px; border-radius: 20px; background: #e8f0fe; transition: all 0.2s;">Lihat Detail <span style="font-size:0.7rem;">&rarr;</span></a></div>'
);

fs.writeFileSync('src/components/city/CityEquipment.astro', c);
console.log('Fixed CityEquipment');

