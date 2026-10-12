// src/lib/schema.js
// Satu sumber untuk fragmen JSON-LD identitas yang berulang di banyak halaman.
// Nilai diambil dari src/data/config.json agar "ubah satu, keubah semua".
import config from '../data/config.json';

const siteUrl = config.siteUrl;
const schemaPhone = config.company.phone.replace(/\s+/g, '');

export { schemaPhone };

export const organizationSchema = (overrides = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  'name': config.siteName,
  'url': `${siteUrl}/`,
  'logo': `${siteUrl}/imgs/logo-agung-perkasa-transparan.png`,
  'sameAs': [
    config.company.social.facebook,
    config.company.social.instagram
  ],
  ...overrides
});

export const websiteSchema = (overrides = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  'name': config.siteName,
  'url': `${siteUrl}/`,
  'publisher': {
    '@id': `${siteUrl}/#organization`
  },
  ...overrides
});

export const localBusinessSchema = (overrides = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#localbusiness`,
  'name': config.siteName,
  'url': `${siteUrl}/`,
  'parentOrganization': {
    '@id': `${siteUrl}/#organization`
  },
  'image': `${siteUrl}/imgs/logo-agung-perkasa-transparan.png`,
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Jl. Sunter Muara II, RT.17/RW.05, Sunter Agung',
    'addressLocality': 'Jakarta Utara',
    'addressRegion': 'DKI Jakarta',
    'postalCode': '14350',
    'addressCountry': 'ID'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': -6.1493743,
    'longitude': 106.8534975
  },
  'telephone': schemaPhone,
  'priceRange': 'Rp75.000 - Rp360.000',
  'openingHours': ['Mo-Su 07:00-23:00'],
  ...overrides
});

export const productSchema = ({
  name,
  description,
  image,
  canonical,
  brand = config.siteName,
  lowPrice = 125000,
  highPrice = 360000,
  price = 125000,
  offerCount = 5,
  priceValidUntil = '2027-12-31',
  overrides = {}
} = {}) => {
  const imageUrl = image
    ? (image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : '/' + image}`)
    : `${siteUrl}/imgs/logo-agung-perkasa.webp`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': name,
    'description': description,
    'image': imageUrl,
    'brand': {
      '@type': 'Brand',
      'name': brand
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'IDR',
      'lowPrice': String(lowPrice),
      'highPrice': String(highPrice),
      'price': String(price),
      'offerCount': String(offerCount),
      'availability': 'https://schema.org/InStock',
      'priceValidUntil': priceValidUntil,
      ...(canonical ? { 'url': canonical } : {})
    },
    ...overrides
  };
};

