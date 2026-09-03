import re

with open('public/css/modern-draft.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove old .cta-box styles
css = re.sub(r'\.cta-box \{.*?\n.*?\}', '', css, flags=re.DOTALL)
css = re.sub(r'@media \(min-width: 768px\) \{ \.cta-box \{ padding: 3rem; \} \}', '', css)
css = re.sub(r'\.cta-box h3 \{.*?\}', '', css)
css = re.sub(r'@media \(min-width: 768px\) \{ \.cta-box h3 \{.*?\} \}', '', css)
css = re.sub(r'\.cta-box p \{.*?\}', '', css)

# We need to remove .btn-wa-konsultasi from the shared button rule
css = css.replace('.btn-cta, .apx-btn, .btn-wa-konsultasi, .btn-articles-all', '.btn-cta, .apx-btn, .btn-articles-all')

# Append the modern clean CTA styles
modern_cta = '''
/* 8. CTA BOX (Clean & Modern) */
.cta-box {
    background: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-page) 100%);
    border: 1px solid var(--border-color);
    padding: 2.5rem 1.25rem;
    border-radius: 24px;
    text-align: center;
    margin: var(--space-xl) 0;
    box-shadow: 0 10px 40px rgba(0,0,0,.03);
    position: relative;
    overflow: hidden;
}
@media (min-width: 768px) { .cta-box { padding: 4rem 2rem; } }
.cta-box h3 {
    font-size: 1.5rem;
    color: var(--brand-primary);
    margin-bottom: 0.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
}
@media (min-width: 768px) { .cta-box h3 { font-size: 2rem; margin-bottom: 0.75rem; } }
.cta-box p {
    color: var(--text-body);
    font-size: 1.05rem;
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}
.btn-wa-konsultasi {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.9rem 2.25rem;
    background: #25D366;
    color: #fff !important;
    border-radius: 999px;
    font-weight: 600;
    font-size: 1.05rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 20px rgba(37, 211, 102, 0.25);
    text-decoration: none;
}
.btn-wa-konsultasi:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(37, 211, 102, 0.35);
    background: #20BA59;
}
'''

# insert it where the old one was (or just append it)
# I will just append it at the end for safety
css += '\n' + modern_cta

with open('public/css/modern-draft.css', 'w', encoding='utf-8') as f:
    f.write(css)

