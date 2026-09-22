const fs = require('fs');
let c = fs.readFileSync('src/components/city/CityEquipment.astro', 'utf8');

// First, make equip-info a flex column that takes up available space
c = c.replace('<div class="equip-info">', '<div class="equip-info" style="display: flex; flex-direction: column; flex: 1;">');

// Next, group the tag and the link together in a wrapper that is pushed to the bottom,
// and change the tag text to 'Agung Perkasa'
const oldContent = `<span class="equip-tag">{config.siteName.split(' ')[0]}</span>
                <div style="margin-top: 10px;">
                    <a href={getEquipmentUrl(item.name)} style="display: inline-block; font-size: 0.75rem; font-weight: 600; color: #1a365d; text-decoration: none;">Lihat detail selengkapnya &rarr;</a>
                </div>`;

const newContent = `<div style="margin-top: auto;">
                    <span class="equip-tag">Agung Perkasa</span>
                    <div style="margin-top: 10px;">
                        <a href={getEquipmentUrl(item.name)} style="display: inline-block; font-size: 0.75rem; font-weight: 600; color: #1a365d; text-decoration: none;">Lihat detail selengkapnya &rarr;</a>
                    </div>
                </div>`;

c = c.replace(oldContent, newContent);

fs.writeFileSync('src/components/city/CityEquipment.astro', c);
console.log('Fixed alignment and tag text');
