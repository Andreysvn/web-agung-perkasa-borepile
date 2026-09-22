const fs = require('fs');
let c = fs.readFileSync('src/components/city/CityEquipment.astro', 'utf8');

c = c.replace(
    '<a href={getEquipmentUrl(item.name)} style="font-size: 0.8rem; font-weight: 600; color: #1a3a6e; text-decoration: underline;">Lihat Detail {item.name}</a>',
    '<a href={getEquipmentUrl(item.name)} style="display: inline-block; font-size: 0.75rem; font-weight: 600; color: #1a365d; text-decoration: none;">Lihat detail selengkapnya &rarr;</a>'
);

fs.writeFileSync('src/components/city/CityEquipment.astro', c);
console.log('Fixed link style');

