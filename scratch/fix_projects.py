import re

with open('src/pages/harga/bore-pile-2026.astro', 'r', encoding='utf-8') as f:
    html = f.read()

# Add the import
import_stmt = "import CityCalculator from '../../components/city/CityCalculator.astro';\nimport CityProjects from '../../components/city/CityProjects.astro';"
html = html.replace("import CityCalculator from '../../components/city/CityCalculator.astro';", import_stmt)

# Match the raw HTML block
# It starts at <!-- ===== CONTOH PROYEK NYATA ===== -->
# and ends right before <!-- ===== PERBANDINGAN DIAMETER ===== -->

pattern = re.compile(r'<!-- ===== CONTOH PROYEK NYATA ===== -->.*?<!-- ===== PERBANDINGAN DIAMETER ===== -->', re.DOTALL)

replacement = """<!-- ===== CONTOH PROYEK NYATA ===== -->
    <CityProjects projects={pageData.projects} note={pageData.projectNote} cityName="" />

    <!-- ===== PERBANDINGAN DIAMETER ===== -->"""

html = pattern.sub(replacement, html)

with open('src/pages/harga/bore-pile-2026.astro', 'w', encoding='utf-8') as f:
    f.write(html)

