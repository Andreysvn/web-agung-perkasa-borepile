import json

with open('src/data/kota/jakarta.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['soilReasons']['description'] = 'Jakarta dikenal dengan kondisi tanahnya yang <strong>lunak dan rawan penurunan (land subsidence)</strong>, terutama di wilayah <a href="https://lib.ui.ac.id/detail?id=20238696&lokasi=lokal" target="_blank" rel="noopener noreferrer">Jakarta Utara</a>, <a href="https://www.academia.edu/99027747/" target="_blank" rel="noopener noreferrer">Cengkareng</a>, dan <a href="https://iopscience.iop.org/article/10.1088/1755-1315/1374/1/012033" target="_blank" rel="noopener noreferrer">Pondok Gede</a>. Metode bore pile menjadi solusi pondasi paling tepat karena:'

data['soilReasons']['points'] = [
    {
        'title': 'Kedalaman hingga 30 meter',
        'desc': 'mampu menembus lapisan tanah lunak hingga <a href="https://journal.jgu.ac.id/index.php/jgers/article/view/40" target="_blank" rel="noopener noreferrer">mencapai tanah keras</a>'
    },
    {
        'title': 'Diameter fleksibel (30-120cm)',
        'desc': 'bisa disesuaikan dengan <a href="https://library.gunadarma.ac.id/repository/perencanaan-fondasi-bored-pile-pada-gedung-perkantoran-10-lantai-di-jakarta-pusat-skripsi" target="_blank" rel="noopener noreferrer">beban bangunan</a>'
    },
    {
        'title': 'Minim getaran',
        'desc': 'aman untuk bangunan di sekitar proyek, jadi tidak merusak tanah dan dinding tetangga anda'
    },
    {
        'title': 'Minim polusi suara',
        'desc': 'suaranya tidak terlalu mengganggu tetangga sekitar proyek, apalagi jika proyek dilakukan di area padat, tapi terkadang ada tetangga yang merasa terganggu oleh suara yang dihasilkan, jadi kami juga menyediakan solusi untuk mengurangi suaranya (misal diberikan peredam suara)'
    },
    {
        'title': 'Metode wash boring',
        'desc': 'bor basah sangat efektif untuk tanah berair atau rawa seperti di Jakarta Utara'
    }
]

data['soilReasons']['conclusion'] = '<p>Setiap lokasi memiliki karakteristik tanah yang berbeda, contohnya seperti <a href="https://lib.ui.ac.id/detail?id=20490200&lokasi=lokal" target="_blank" rel="noopener noreferrer">tanah di Jakarta Utara yang sebagian berpasir</a>, kami dapat menyesuaikan teknik bore pile untuk memastikan keberhasilan proyek di setiap wilayah di Jakarta.</p><p><strong>Portofolio kami di Jakarta:</strong> Kami pernah mengerjakan bore pile di gudang Dunex Sunter, selain itu kami juga sering mengerjakan proyek rumah,ruko, gedung dan bangunan lain di Seluruh Wilayah Jakarta, seperti PIK, PIK 2, Puri Kembangan, Pondok Indah, Mangga Besar, Cempaka Putih, Kuningan, Sumur Batu, Sunter dll.</p>'

with open('src/data/kota/jakarta.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
