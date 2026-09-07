btn_css = """
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
    margin-top: 1rem;
}
.btn-wa-konsultasi:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(37, 211, 102, 0.35);
    background: #20BA59;
}
"""

with open("public/css/borepile-kota.css", "a", encoding="utf-8") as f:
    f.write("\n" + btn_css)

print("Added btn-wa-konsultasi to borepile-kota.css")
