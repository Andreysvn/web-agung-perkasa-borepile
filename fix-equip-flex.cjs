const fs = require('fs');
let c = fs.readFileSync('src/components/city/CityEquipment.astro', 'utf8');

c = c.replace('<div class="equip-info">', '<div class="equip-info" style="display: flex; flex-direction: column; flex: 1;">');
c = c.replace('<div style="margin-top: 10px;">', '<div style="margin-top: auto; padding-top: 15px;">');

fs.writeFileSync('src/components/city/CityEquipment.astro', c);
console.log('Fixed equip-info flex');

