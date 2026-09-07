code = '''---
interface Props {
    portfolio: {
        title?: string;
        subtitle?: string;
        heading?: string;
        items: Array<{
            image: string;
            imageAlt: string;
            label: string;
            detail: string;
            width?: string;
            height?: string;
        }>;
    };
    cityName: string;
}

const { portfolio, cityName } = Astro.props;
const title = portfolio.title || `Portofolio Proyek Bore Pile di ${cityName}`;
const subtitle = portfolio.subtitle || `Berikut beberapa proyek bore pile yang sudah kami kerjakan di berbagai wilayah ${cityName}.`;
const heading = portfolio.heading || `Dokumentasi proyek bore pile ${cityName.toLowerCase()}:`;
---

<section class="portfolio-city-section">
    <div class="portfolio-city-header">
        <h2 class="section-title">{title}</h2>
        <p class="section-subtitle">{subtitle}</p>
    </div>

    <div class="portfolio-city-box">
        <p class="portfolio-city-heading">{heading}</p>
        <div class="portfolio-city-grid">
            {portfolio.items.map((item) => (
                <div class="portfolio-city-item">
                    <div class="portfolio-image-wrapper">
                        <img src={item.image} alt={item.imageAlt} loading="lazy" width={item.width || '400'} height={item.height || '300'} data-lightbox="true" title="Klik untuk memperbesar" style="cursor: pointer;">
                    </div>
                    <div class="portfolio-city-caption">
                        <span class="portfolio-city-label">{item.label}</span>
                        <span class="portfolio-city-detail">{item.detail}</span>
                    </div>
                </div>
            ))}
        </div>
        <p class="portfolio-city-link">
            Ingin lihat lebih banyak? 
            <a href="/galeri/gallery.html">Kunjungi galeri proyek kami &rarr;</a>
        </p>
    </div>
</section>
'''

with open('src/components/city/CityPortfolio.astro', 'w', encoding='utf-8') as f:
    f.write(code)
