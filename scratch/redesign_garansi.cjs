const fs = require('fs');

// 1. Add CSS
let css = fs.readFileSync('public/css/modern-harga.css', 'utf8');
const newCss = `
.guarantee-box {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%);
    border: 1px solid #c8e6c9;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 2rem 0;
    gap: 1.5rem;
    box-shadow: 0 4px 15px rgba(46, 125, 50, 0.08);
}
.guarantee-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.guarantee-content h3 {
    margin: 0 0 0.5rem 0;
    color: #1b5e20;
    font-size: 1.25rem;
}
.guarantee-content p {
    margin: 0;
    color: #2e7d32;
    line-height: 1.5;
}
@media (max-width: 600px) {
    .guarantee-box {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem 1rem;
    }
}
`;
if (!css.includes('.guarantee-box')) {
    fs.appendFileSync('public/css/modern-harga.css', newCss);
}

// 2. Replace HTML
let html = fs.readFileSync('src/pages/harga/bore-pile-2026.astro', 'utf8');
const oldHtml = `<!-- ===== KOMITMEN & GARANSI ===== -->
            <div style="background: #e8f5e9; padding: 1rem; border-radius: 12px; text-align: center; margin: 1rem 0;">
                <div style="font-size: 2rem; color: var(--primary-color);" aria-hidden="true">Garansi</div>
                <p style="margin: 0.5rem 0 0; color: #1a3a6e;">
                    <strong>Komitmen & Garansi Mutu</strong>
                    <br>Kami memberikan garansi penuh atas kualitas dalam pengerjaan proyek. Kami menjamin kualitas terbaik karena didukung oleh tim ahli kami yang sangat berpengalaman membuat pondasi dalam (khususnya bore pile)</p>
            </div>`;

const newHtml = `<!-- ===== KOMITMEN & GARANSI ===== -->
            <div class="guarantee-box">
                <div class="guarantee-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #2e7d32;">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <polyline points="9 12 11 14 15 10"></polyline>
                    </svg>
                </div>
                <div class="guarantee-content">
                    <h3>Komitmen & Garansi Mutu</h3>
                    <p>Kami memberikan garansi penuh atas kualitas dalam pengerjaan proyek. Kami menjamin kualitas terbaik karena didukung oleh tim ahli kami yang sangat berpengalaman membuat pondasi dalam (khususnya bore pile).</p>
                </div>
            </div>`;

html = html.replace(oldHtml, newHtml);
fs.writeFileSync('src/pages/harga/bore-pile-2026.astro', html, 'utf8');
