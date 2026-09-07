import re

with open("public/css/modern-draft.css", "r", encoding="utf-8") as f:
    modern_css = f.read()

with open("public/css/harga.css", "r", encoding="utf-8") as f:
    harga_css = f.read()

# We want to extract specific blocks from harga.css that are not in modern-draft.css.
# Since writing a full CSS parser in regex is hard, I will extract known specific blocks:
# .project-examples-section, .project-row, .project-img, .project-text, .project-note, .project-caption
# .articles-grid, .article-card, .article-image, .article-content, .article-meta, .article-category
# .equip-grid, .equip-img, .equip-info, .equip-icon-inline
# .proyek-jakarta-*
# .maps-container, .maps-card, .maps-title, .maps-address, .maps-btn
# .publisher-box, .publisher-content

# Instead of complex parsing, I'll extract these manually by searching for them.
# Even better: The user just said "copy dari sana, kalau ada yg beda bagian, nanti design baru di css harga modern yg baru"
# So if I just take `modern-draft.css`, save it as `modern-harga.css`, and append a block of the custom classes from harga.css, that perfectly fulfills the request!

custom_classes = """
/* ===== CUSTOM SECTIONS FOR HARGA ===== */
.project-examples-section { margin-top: 40px; }
.project-row { display: flex; gap: 20px; margin-bottom: 20px; align-items: center; background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
.project-img { flex: 0 0 350px; border-radius: 8px; overflow: hidden; }
.project-img img { width: 100%; height: auto; display: block; transition: transform 0.3s ease; }
.project-img img:hover { transform: scale(1.05); }
.project-text { flex: 1; }
.project-note { background: #f8f9fa; padding: 15px 20px; border-radius: 8px; border-left: 4px solid var(--primary-color); font-size: 0.9rem; margin-top: 15px; }
.project-caption { text-align: center; font-size: 0.85rem; color: #666; margin-top: 10px; font-style: italic; }

.articles-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; margin-top: 30px; }
.article-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.3s ease; display: flex; flex-direction: column; }
.article-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
.article-image { position: relative; height: 200px; overflow: hidden; }
.article-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.article-card:hover .article-image img { transform: scale(1.1); }
.article-category { position: absolute; top: 15px; left: 15px; background: var(--primary-color); color: #fff; padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; z-index: 1; }
.article-content { padding: 20px; flex: 1; display: flex; flex-direction: column; }
.article-content h3 { font-size: 1.1rem; margin: 0 0 10px; line-height: 1.4; }
.article-content h3 a { color: #1a3a6e; text-decoration: none; transition: color 0.2s ease; }
.article-content h3 a:hover { color: #d35400; }
.article-content p { color: #666; font-size: 0.9rem; line-height: 1.6; margin-bottom: 15px; flex: 1; }
.article-meta { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 15px; margin-top: auto; font-size: 0.8rem; color: #888; }
.read-more { color: #d35400; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: gap 0.2s ease; }
.article-card:hover .read-more { gap: 8px; }

.equip-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin: 30px 0 40px; }
.equip-card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(26,58,110,0.08); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid rgba(26,58,110,0.05); }
.equip-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(26,58,110,0.12); }
.equip-img { width: 100%; height: 240px; object-fit: contain; padding: 20px; background: #f8f9fa; border-bottom: 1px solid #eee; }
.equip-info { padding: 20px 24px 25px; }
.equip-icon-inline { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
.equip-icon-inline img { width: 32px; height: 32px; object-fit: contain; }
.equip-icon-inline h4 { margin: 0; color: #1a3a6e; font-size: 1.1rem; }
.equip-info p { color: #555; font-size: 0.9rem; line-height: 1.6; margin: 0 0 15px 0; }
.equip-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }
.equip-tag { background: #e8f0fe; color: #1a3a6e; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }

.proyek-jakarta-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 25px; }
.proyek-jakarta-item { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.3s ease; }
.proyek-jakarta-item:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
.proyek-jakarta-item img { width: 100%; height: 180px; object-fit: cover; }
.proyek-jakarta-caption { padding: 15px; }
.proyek-jakarta-label { display: block; font-weight: 600; color: #1a3a6e; margin-bottom: 5px; font-size: 0.9rem; }
.proyek-jakarta-detail { display: block; font-size: 0.75rem; color: #666; }

.maps-container { margin: 40px 0; }
.maps-card { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
.maps-title { margin: 0 0 10px 0; color: #1a3a6e; font-size: 1.2rem; }
.maps-address { color: #666; font-size: 0.9rem; margin-bottom: 20px; line-height: 1.6; }
.maps-embed-wrapper { border-radius: 8px; overflow: hidden; margin-bottom: 15px; }
.maps-embed-wrapper iframe { width: 100%; height: 250px; border: none; display: block; }
.maps-actions { display: flex; justify-content: center; }
.maps-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--primary-color); color: #fff; padding: 10px 24px; border-radius: 30px; text-decoration: none; font-weight: 600; font-size: 0.9rem; transition: background 0.3s ease; }
.maps-btn:hover { background: #11264a; }

.publisher-box { background: #f8f9fa; padding: 20px; border-radius: 12px; margin-top: 40px; display: flex; align-items: center; gap: 20px; border: 1px solid #eee; }
.publisher-box img { border-radius: 50%; }
.publisher-content h4 { margin: 0 0 5px 0; color: #1a3a6e; }
.publisher-content p { margin: 0; font-size: 0.9rem; color: #666; line-height: 1.5; }

@media (max-width: 768px) {
    .project-row { flex-direction: column; }
    .project-img { flex: none; width: 100%; }
}
"""

with open("public/css/modern-harga.css", "w", encoding="utf-8") as f:
    f.write(modern_css + "\n" + custom_classes)

print("Created modern-harga.css successfully!")
