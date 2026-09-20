const fs = require('fs');

function fixTemplate(file, is40cm) {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf8');

    // Fix Manual Table
    const manualRegex = /<tbody>\s*<tr><td>20 cm<\/td>[\s\S]*?<\/tbody>/;
    
    let manualReplacement = `<tbody>
                <tr><td>20 cm</td><td>{mn20}</td><td>10 meter</td><td>Area sangat sempit</td></tr>
                <tr><td>25 cm</td><td>{mn25}</td><td>10 meter</td><td>Gang kecil</td></tr>
                <tr><td>30 cm</td><td>{mn30}</td><td>10 meter</td><td>Rumah 1-2 lantai</td></tr>
                <tr class="row-highlight">
                    <td><strong>{pageData.manualHighlight.diameter}</strong></td>
                    <td><strong>{pageData.manualHighlight.price}</strong></td>
                    <td><strong>{pageData.manualHighlight.maxDepth}</strong></td>
                    <td><strong>{pageData.manualHighlight.suitable}</strong></td>
                </tr>
            </tbody>`;
            
    if (!is40cm) { // for 60cm and 80cm which use 50cm's static table
       manualReplacement = `<tbody>
                <tr><td>20 cm</td><td>{mn20}</td><td>10 meter</td><td>Area sangat sempit</td></tr>
                <tr><td>25 cm</td><td>{mn25}</td><td>10 meter</td><td>Gang kecil</td></tr>
                <tr><td>30 cm</td><td>{mn30}</td><td>10 meter</td><td>Rumah 1-2 lantai</td></tr>
                <tr><td>40 cm</td><td>{mn40}</td><td>10 meter</td><td>Ruko, kantor, bangunan 2 lantai</td></tr>
            </tbody>`;
    }

    c = c.replace(manualRegex, manualReplacement);
    
    // Fix Mesin table for 40cm (it was based on 30cm which hardcoded 40cm and 50cm)
    if (is40cm) {
        const mesinRegex = /<tbody>\s*<tr class="row-highlight">[\s\S]*?<\/tbody>/;
        const mesinReplacement = `<tbody>
                <tr><td>30 cm</td><td>{m30}</td><td>30 meter</td><td>Rumah 1-2 lantai</td></tr>
                <tr class="row-highlight">
                    <td><strong>{pageData.mesinHighlight.diameter}</strong></td>
                    <td><strong>{pageData.mesinHighlight.price || mesinPrice}</strong></td>
                    <td><strong>{pageData.mesinHighlight.maxDepth}</strong></td>
                    <td><strong>{pageData.mesinHighlight.suitable}</strong></td>
                </tr>
                <tr><td>50 cm</td><td>{m50}</td><td>30 meter</td><td>Gudang, pabrik kecil</td></tr>
            </tbody>`;
        c = c.replace(mesinRegex, mesinReplacement);
    }

    fs.writeFileSync(file, c);
}

fixTemplate('src/pages/harga/bore-pile/40cm/index.astro', true);
fixTemplate('src/pages/harga/bore-pile/60cm/index.astro', false);
fixTemplate('src/pages/harga/bore-pile/80cm/index.astro', false);
