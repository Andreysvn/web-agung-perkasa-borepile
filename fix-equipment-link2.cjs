const fs = require('fs');
let c = fs.readFileSync('src/components/city/CityEquipment.astro', 'utf8');

const oldButton = '<div style="margin-top: auto; padding-top: 15px;"><a href={getEquipmentUrl(item.name)} style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 600; color: #1a3a6e; text-decoration: none; padding: 6px 14px; border-radius: 20px; background: #e8f0fe; transition: all 0.2s;">Lihat Detail <span style="font-size:0.7rem;">&rarr;</span></a></div>';

const newStructure = '<span class="equip-tag">{config.siteName.split(\' \')[0]}</span>\n                <div style="margin-top: 10px;">\n                    <a href={getEquipmentUrl(item.name)} style="font-size: 0.8rem; font-weight: 600; color: #1a3a6e; text-decoration: underline;">Lihat Detail {item.name}</a>\n                </div>';

c = c.replace(oldButton, newStructure);

fs.writeFileSync('src/components/city/CityEquipment.astro', c);
console.log('Fixed link design');

