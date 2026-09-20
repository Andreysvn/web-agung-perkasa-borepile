const fs = require('fs');

// Read 30cm index.astro as the base template
let template = fs.readFileSync('src/pages/harga/bore-pile/30cm/index.astro', 'utf8');

// Replace specific 30cm references to be dynamic tokens
template = template.replace(/30cm\.json/g, '{{DIAMETER}}.json');

// We also need to fix the map regex that was buggy, but wait, 30cm is working!
// We can just fix the template string right here.
// Find the project mapping block and replace it with the safe one:
const startIdx = template.indexOf('{pageData.projects.map(');
const endIdx = template.indexOf('))} ', startIdx) + 4;
const endIdx2 = template.indexOf('))}', startIdx) + 3;
let actualEnd = endIdx > startIdx && endIdx < startIdx + 5000 ? endIdx : endIdx2;

if (startIdx !== -1 && actualEnd !== -1) {
    const newMap = `{pageData.projects.map(project => (
                    <div class="project-card">
                        <div class="project-row">
                            <div class="project-img">
                                {project.imageFallback ? (
                                    <img src={project.image} onerror={\`this.src='\${project.imageFallback}'; this.onerror=null;\`}
                                         alt={project.imageAlt} 
                                         loading="lazy"
                                         data-lightbox />
                                ) : (
                                    <img src={project.image} 
                                         alt={project.imageAlt} 
                                         loading="lazy"
                                         data-lightbox />
                                )}
                                <div class="project-caption">{project.caption}</div>
                            </div>
                            {project.imageOnly ? null : (
                            <div class="project-text">
                                <div class="info-card">
                                    <h3>{project.title}</h3>
                                    <p>
                                    {project.specs && <Fragment><strong>Spesifikasi:</strong> {project.specs}<br/></Fragment>}
                                    {project.costCalc && <Fragment><strong>Biaya jasa:</strong> <span set:html={project.costCalc.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), (typeof manualPrice !== 'undefined' ? manualPrice : ''))}></span><br/></Fragment>}
                                    {project.mobilization && <Fragment><strong>+ mobilisasi:</strong> {project.mobilization}<br/></Fragment>}
                                    {project.total && <Fragment><strong>Total:</strong> <span set:html={project.total}></span><br/></Fragment>}
                                    {project.time && <Fragment><strong>Waktu:</strong> {project.time}</Fragment>}
                                    </p>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                ))}`;
    template = template.substring(0, startIdx) + newMap + template.substring(actualEnd);
}

// Fix FAQ replacements:
template = template.replace(/<p set:html=\{item\.a\.replace\('[^']*',\s*m30\)\}<\/p>/g,
    "<p set:html={item.a.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), (typeof manualPrice !== 'undefined' ? manualPrice : ''))}></p>"
);

template = template.replace(/a:\s*item\.a\.replace\(\/<\[\^>\]\*\>\?\/\w+,\s*''\)\.replace\('[^']*',\s*m30\)/g, 
    "a: item.a.replace(/<[^>]*>?/gm, '').replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), (typeof manualPrice !== 'undefined' ? manualPrice : ''))"
);

// Fix the manual table mapping:
const manualTableStart = template.indexOf('<h3>Bore Pile Manual (Strauss Pile)</h3>');
if (manualTableStart !== -1) {
    const manualTableEnd = template.indexOf('</section>', manualTableStart);
    if (manualTableEnd !== -1) {
        // Replace this section with a dynamic loop over all manual pricing + highlight
        const dynamicManualTable = `{pageData.showManualHighlight !== false && (
    <Fragment>
        <h3>Bore Pile Manual (Strauss Pile)</h3>
        <div class="table-responsive">
            <table class="price-table">
                <caption>Tabel harga bore pile manual (strauss pile) per meter</caption>
                <thead>
                    <tr><th>Diameter</th><th>Harga (Rp/m)</th><th>Kedalaman Maks</th><th>Cocok Untuk</th></tr>
                </thead>
                <tbody>
                    <tr><td>20 cm</td><td>{mn20}</td><td>10 meter</td><td>Area sangat sempit</td></tr>
                    <tr><td>25 cm</td><td>{mn25}</td><td>10 meter</td><td>Gang kecil</td></tr>
                    {pageData.diameterNum === 30 ? (
                        <tr class="row-highlight">
                            <td><strong>{pageData.manualHighlight?.diameter}</strong></td>
                            <td><strong>{pageData.manualHighlight?.price || mn30}</strong></td>
                            <td><strong>{pageData.manualHighlight?.maxDepth}</strong></td>
                            <td><strong>{pageData.manualHighlight?.suitable}</strong></td>
                        </tr>
                    ) : (
                        <tr><td>30 cm</td><td>{mn30}</td><td>10 meter</td><td>Rumah 1-2 lantai</td></tr>
                    )}
                    {pageData.diameterNum === 40 ? (
                        <tr class="row-highlight">
                            <td><strong>{pageData.manualHighlight?.diameter}</strong></td>
                            <td><strong>{pageData.manualHighlight?.price || mn40}</strong></td>
                            <td><strong>{pageData.manualHighlight?.maxDepth}</strong></td>
                            <td><strong>{pageData.manualHighlight?.suitable}</strong></td>
                        </tr>
                    ) : (
                        <tr><td>40 cm</td><td>{mn40}</td><td>10 meter</td><td>Ruko, kantor, bangunan 2 lantai</td></tr>
                    )}
                </tbody>
            </table>
        </div>
        {pageData.manualNote && <p class="price-hint" set:html={pageData.manualNote}></p>}
    </Fragment>
)}
`;
        template = template.substring(0, manualTableStart) + dynamicManualTable + template.substring(manualTableEnd);
    }
}


// Fix the Mesin table mapping:
const mesinTableStart = template.indexOf('<h3>Bore Pile Mesin (Mini Crane &amp; Gawangan)</h3>');
if (mesinTableStart !== -1) {
    const mesinTableEnd = template.indexOf('</div>', mesinTableStart) + 6;
    if (mesinTableEnd !== -1) {
        const dynamicMesinTable = `<h3>Bore Pile Mesin (Mini Crane &amp; Gawangan)</h3>
        <div class="table-responsive">
            <table class="price-table">
                <caption>Tabel harga bore pile mesin (mini crane &amp; gawangan) per meter</caption>
                <thead>
                    <tr><th>Diameter</th><th>Harga (Rp/m)</th><th>Kedalaman Maks</th><th>Cocok Untuk</th></tr>
                </thead>
                <tbody>
                    {pageData.diameterNum === 30 ? (
                        <tr class="row-highlight">
                            <td><strong>{pageData.mesinHighlight?.diameter}</strong></td>
                            <td><strong>{pageData.mesinHighlight?.price || m30}</strong></td>
                            <td><strong>{pageData.mesinHighlight?.maxDepth}</strong></td>
                            <td><strong>{pageData.mesinHighlight?.suitable}</strong></td>
                        </tr>
                    ) : (
                        <tr><td>30 cm</td><td>{m30}</td><td>30 meter</td><td>Rumah 1-2 lantai</td></tr>
                    )}
                    {pageData.diameterNum === 40 ? (
                        <tr class="row-highlight">
                            <td><strong>{pageData.mesinHighlight?.diameter}</strong></td>
                            <td><strong>{pageData.mesinHighlight?.price || m40}</strong></td>
                            <td><strong>{pageData.mesinHighlight?.maxDepth}</strong></td>
                            <td><strong>{pageData.mesinHighlight?.suitable}</strong></td>
                        </tr>
                    ) : (
                        <tr><td>40 cm</td><td>{m40}</td><td>30 meter</td><td>Ruko, kantor 2-3 lantai</td></tr>
                    )}
                    {pageData.diameterNum === 50 ? (
                        <tr class="row-highlight">
                            <td><strong>{pageData.mesinHighlight?.diameter}</strong></td>
                            <td><strong>{pageData.mesinHighlight?.price || m50}</strong></td>
                            <td><strong>{pageData.mesinHighlight?.maxDepth}</strong></td>
                            <td><strong>{pageData.mesinHighlight?.suitable}</strong></td>
                        </tr>
                    ) : (
                        <tr><td>50 cm</td><td>{m50}</td><td>30 meter</td><td>Gudang, pabrik kecil</td></tr>
                    )}
                    {pageData.diameterNum === 60 ? (
                        <tr class="row-highlight">
                            <td><strong>{pageData.mesinHighlight?.diameter}</strong></td>
                            <td><strong><span set:html={pageData.mesinHighlight?.price || '<span class="text-konsultasi">Hubungi Kami</span>'}></span></strong></td>
                            <td><strong>{pageData.mesinHighlight?.maxDepth}</strong></td>
                            <td><strong>{pageData.mesinHighlight?.suitable}</strong></td>
                        </tr>
                    ) : (
                        <tr><td>60 cm</td><td><span class="text-konsultasi">Hubungi Kami</span></td><td>30 meter</td><td>Hotel 3-4 lantai, gedung 4-5 lantai, rumah sakit</td></tr>
                    )}
                    {pageData.diameterNum === 80 ? (
                        <tr class="row-highlight">
                            <td><strong>{pageData.mesinHighlight?.diameter}</strong></td>
                            <td><strong><span set:html={pageData.mesinHighlight?.price || '<span class="text-konsultasi">Hubungi Kami</span>'}></span></strong></td>
                            <td><strong>{pageData.mesinHighlight?.maxDepth}</strong></td>
                            <td><strong>{pageData.mesinHighlight?.suitable}</strong></td>
                        </tr>
                    ) : (
                        <tr><td>80 cm</td><td><span class="text-konsultasi">Hubungi Kami</span></td><td>30 meter</td><td>Gedung 5-8 lantai, apartemen, hotel</td></tr>
                    )}
                </tbody>
            </table>
        </div>`;
        template = template.substring(0, mesinTableStart) + dynamicMesinTable + template.substring(mesinTableEnd);
    }
}

// Ensure the localBusinessSchema handles `priceRange` if pageData defines it.
template = template.replace(
    /"description": businessDesc,/g,
    `"description": businessDesc,
    ...(pageData.priceRange ? { "priceRange": pageData.priceRange } : {}),`
);

// We need to fix the fallback variable assignment. 
// 30cm had `const mesinPrice = priceMap['m30'] || m30;`
// We need it to be dynamic:
template = template.replace(/const mesinPrice = priceMap\[.*\] \|\| m30;/g, "const mesinPrice = priceMap[`m${pageData.diameterNum}`] || '<span class=\"text-konsultasi\">Hubungi Kami</span>';");
template = template.replace(/const manualPrice = priceMap\[.*\] \|\| mn20;/g, "const manualPrice = priceMap[`mn${pageData.diameterNum}`] || '';");


const diameters = ['40cm', '50cm', '60cm', '80cm'];

for (const d of diameters) {
    let output = template.replace(/\{\{DIAMETER\}\}/g, d);
    fs.writeFileSync(`src/pages/harga/bore-pile/${d}/index.astro`, output);
    console.log(`Generated ${d}`);
}
// Also update 30cm to have these robustness fixes!
let output30 = template.replace(/\{\{DIAMETER\}\}/g, '30cm');
fs.writeFileSync(`src/pages/harga/bore-pile/30cm/index.astro`, output30);
console.log(`Generated 30cm`);

