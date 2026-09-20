const fs = require('fs');

const files = [
    'src/pages/harga/bore-pile/30cm/index.astro',
    'src/pages/harga/bore-pile/40cm/index.astro',
    'src/pages/harga/bore-pile/50cm/index.astro',
    'src/pages/harga/bore-pile/60cm/index.astro',
    'src/pages/harga/bore-pile/80cm/index.astro'
];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let c = fs.readFileSync(file, 'utf8');

    // 1. We replace the ENTIRE {pageData.projects.map...} block
    const startIdx = c.indexOf('{pageData.projects.map(');
    const endIdx = c.indexOf('))} ', startIdx) + 4; // match `))} ` if exists, else try `))}`
    const endIdx2 = c.indexOf('))}', startIdx) + 3;
    
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
        c = c.substring(0, startIdx) + newMap + c.substring(actualEnd);
    }
    
    // 2. Fix the FAQ section replacing in the HTML output
    // <p set:html={item.a.replace('{m50}', m50)}></p>
    c = c.replace(/<p set:html=\{item\.a\.replace\([^}]+\)\}<\/p>/g,
        "<p set:html={item.a.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), (typeof manualPrice !== 'undefined' ? manualPrice : ''))}></p>"
    );
    
    // 3. Fix the JSON-LD FAQ replacing
    // a: item.a.replace(/<[^>]*>?/gm, '').replace('{m50}', m50)
    // we just use string replacement on a known pattern
    c = c.replace(/a:\s*item\.a\.replace\(\/<\[\^>\]\*\>\?\/\w+,\s*''\)\.replace\([^}]+\)/g, 
        "a: item.a.replace(/<[^>]*>?/gm, '').replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), (typeof manualPrice !== 'undefined' ? manualPrice : ''))"
    );

    fs.writeFileSync(file, c);
}
