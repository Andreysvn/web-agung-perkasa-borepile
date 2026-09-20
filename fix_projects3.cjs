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

    // Manually fix the specific lines
    
    // Fix costCalc replace
    c = c.replace(/<span set:html=\{project\.costCalc\.replace\('[^']*',\s*m\d+\)\}<\/span>/g,
        "<span set:html={project.costCalc ? project.costCalc.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), (typeof manualPrice !== 'undefined' ? manualPrice : '')) : ''}></span>"
    );

    // Some templates might have the exact string:
    // <span set:html={project.costCalc.replace('{m50}', m50)}></span>
    // Let's just do a generic replace:
    c = c.replace(/<span set:html=\{project\.costCalc\.replace\([^}]+\)\}<\/span>/g,
        "<span set:html={project.costCalc ? project.costCalc.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), (typeof manualPrice !== 'undefined' ? manualPrice : '')) : ''}></span>"
    );

    // Fix FAQ item.a.replace in template body
    // <p set:html={item.a.replace('{m50}', m50)}></p>
    c = c.replace(/<p set:html=\{item\.a\.replace\([^}]+\)\}<\/p>/g,
        "<p set:html={item.a.replace(new RegExp('{m' + pageData.diameterNum + '}', 'g'), mesinPrice).replace(new RegExp('{mn' + pageData.diameterNum + '}', 'g'), (typeof manualPrice !== 'undefined' ? manualPrice : ''))}></p>"
    );
    
    // Also we need to wrap the project text block in a check if imageOnly is true!
    // Since regex is hard, I will do:
    c = c.replace(/<div class="project-text">/g, "{project.imageOnly ? null : <div class=\"project-text\">");
    // And to close it, we replace the `</div>\n                              </div>\n                          </div>\n                      </div>\n                  ))}`
    // But this is fragile.
    // Instead I'll use a script to find and replace.

    fs.writeFileSync(file, c);
}

