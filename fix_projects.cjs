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

    // Make projects mapping robust
    const projectRegex = /<div class="project-text">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\)\)/;
    
    // We match from `<div class="project-text">` to the end of the `))} ` mapping.
    // Let's do it safer.

    const safeProjectText = `{project.imageOnly ? null : (
                            <div class="project-text">
                                <div class="info-card">
                                    <h3>{project.title}</h3>
                                    <p>
                                    {project.specs && <Fragment><strong>Spesifikasi:</strong> {project.specs}<br></Fragment>}
                                    {project.costCalc && <Fragment><strong>Biaya jasa:</strong> <span set:html={project.costCalc.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), manualPrice)}></span><br></Fragment>}
                                    {project.mobilization && <Fragment><strong>+ mobilisasi:</strong> {project.mobilization}<br></Fragment>}
                                    {project.total && <Fragment><strong>Total:</strong> <span set:html={project.total}></span><br></Fragment>}
                                    {project.time && <Fragment><strong>Waktu:</strong> {project.time}</Fragment>}
                                    </p>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                ))}`;

    // Actually, let's just replace between `<div class="project-text">` and `</div>\n                        </div>\n                    </div>\n                ))}`
    // Since each template has slightly different `{m50}` hardcoding...
    
    // Replace the entire `{pageData.projects.map(...)` block!
    const mapRegex = /\{pageData\.projects\.map\([\s\S]*?\}\)/;
    
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
                                    {project.costCalc && <Fragment><strong>Biaya jasa:</strong> <span set:html={project.costCalc.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), manualPrice)}></span><br/></Fragment>}
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
                
    c = c.replace(mapRegex, newMap);
    
    
    // ALSO FIX FAQ REPLACE `{m50}` or `{m60}`
    const faqRegex = /<p set:html=\{item\.a\.replace\('[^']*',\s*m\d+\)\}<\/p>/g;
    c = c.replace(/<p set:html=\{item\.a\.replace\('[^']*',\s*m\d+\)\}<\/p>/g, "<p set:html={item.a.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), manualPrice)}></p>");

    // ALSO FIX FAQ SCHEMA REPLACE
    c = c.replace(/a:\s*item\.a\.replace\(\/<\[\^>\]\*\>\?\/\w+,\s*''\)\.replace\('[^']*',\s*m\d+\)/g, "a: item.a.replace(/<[^>]*>?/gm, '').replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), manualPrice)");

    fs.writeFileSync(file, c);
}
