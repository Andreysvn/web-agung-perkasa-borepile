const fs = require('fs');

let template = fs.readFileSync('recovered_30cm.astro', 'utf8');

const diameters = ['30cm', '40cm', '50cm', '60cm', '80cm'];

for (const d of diameters) {
    let out = template.replace(/30cm/g, d);
    
    out = out.replace(/priceMap\[`m\$\{pageData\.diameterNum\}`\] \|\| m30;/g, `priceMap[\`m\${pageData.diameterNum}\`] || '<span class="text-konsultasi">Hubungi Kami</span>';`);
    out = out.replace(/priceMap\[`mn\$\{pageData\.diameterNum\}`\] \|\| mn20;/g, `priceMap[\`mn\${pageData.diameterNum}\`] || '';`);
    
    out = out.replace(/\.replace\('\{manual\}', manualPrice\)/g, `.replace('{manual}', manualPrice || '')`);
    
    out = out.replace(/<span set:html=\{project\.costCalc\}><\/span>/g, `<span set:html={project.costCalc ? project.costCalc.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), manualPrice || '') : ''}></span>`);
    
    out = out.replace(/a: item\.a\.replace\(\/<\[\^>\]\*\>\?\/gm, ''\)/g, `a: item.a.replace(/<[^>]*>?/gm, '').replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), manualPrice || '')`);

    out = out.replace(/<p set:html=\{item\.a\}><\/p>/g, `<p set:html={item.a.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), manualPrice || '')}></p>`);
    
    const regex = /<div class="project-text">[\s\S]*?<\/div>\s*<\/div>/;
    const safeText = `{project.imageOnly ? null : (
                            <div class="project-text">
                                <div class="info-card">
                                    <h3>{project.title}</h3>
                                    <p>
                                    {project.specs && <Fragment><strong>Spesifikasi:</strong> {project.specs}<br/></Fragment>}
                                    {project.costCalc && <Fragment><strong>Biaya jasa:</strong> <span set:html={project.costCalc.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), manualPrice || '')}></span><br/></Fragment>}
                                    {project.mobilization && <Fragment><strong>+ mobilisasi:</strong> {project.mobilization}<br/></Fragment>}
                                    {project.total && <Fragment><strong>Total:</strong> <span set:html={project.total}></span><br/></Fragment>}
                                    {project.time && <Fragment><strong>Waktu:</strong> {project.time}</Fragment>}
                                    </p>
                                </div>
                            </div>
    )}`;
    out = out.replace(regex, safeText);
    
    const mesinStart = out.indexOf('<h3>Bore Pile Mesin');
    const mesinEnd = out.indexOf('</div>', mesinStart) + 6;
    if (mesinStart !== -1 && mesinEnd !== -1) {
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
        out = out.substring(0, mesinStart) + dynamicMesinTable + out.substring(mesinEnd);
    }
    
    const manualStart = out.indexOf('<h3>Bore Pile Manual');
    const manualEnd = out.indexOf('</section>', manualStart);
    if (manualStart !== -1 && manualEnd !== -1) {
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
        out = out.substring(0, manualStart) + dynamicManualTable + out.substring(manualEnd);
    }
    
    // Safely insert priceRange inside localBusinessSchema right after areaServed array end
    out = out.replace(/"areaServed": \[[\s\S]*?\]/m, `$&,
    ...(pageData.priceRange ? { "priceRange": pageData.priceRange } : {})`);

    fs.writeFileSync(`src/pages/harga/bore-pile/${d}/index.astro`, out);
    console.log(`Generated ${d}`);
}
