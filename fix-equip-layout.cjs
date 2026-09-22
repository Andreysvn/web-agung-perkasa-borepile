const fs = require('fs');
let c = fs.readFileSync('src/components/city/CityEquipment.astro', 'utf8');

c = c.replace('<div class="equip-info" style="display: flex; flex-direction: column; flex: 1;">', '<div class="equip-info">');
c = c.replace('<div style="margin-top: auto; padding-top: 15px;">', '<div style="margin-top: 10px;">');

fs.writeFileSync('src/components/city/CityEquipment.astro', c);
console.log('Reverted layout changes');

