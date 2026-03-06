import { Helmet } from 'react-helmet-async';
import { CONTACT } from '@/app/lib/contactConfig';

const BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL
  ? String(import.meta.env.VITE_SITE_URL).replace(/\/$/, '')
  : 'https://xadyz.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Zhixin Paper',
  alternateName: ['ZX Papers', 'Zhixin Paper Co., Ltd.'],
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${BASE_URL}/og-image.svg`,
  description:
    'B2B manufacturer of thermal paper rolls, direct thermal labels, NCR forms, and self-adhesive materials. Factory direct, ISO certified, export to 50+ countries.',
  foundingDate: '2009',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 500 },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: CONTACT.phone,
      contactType: 'sales',
      email: CONTACT.email,
      availableLanguage: ['English', 'Chinese', 'Russian'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CN',
    addressRegion: 'Shaanxi',
    addressLocality: 'Xi\'an',
    streetAddress: 'Gaoling District, Ronghao Industrial Park Phase 2, Building 15',
  },
  sameAs: [
    CONTACT.whatsappUrl,
    CONTACT.telegramUrl,
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'Zhixin Paper',
  description: 'Thermal Paper, Labels & NCR Forms Manufacturer',
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: ['en', 'zh', 'ru'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/en/products?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export function GlobalJsonLd() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
}
