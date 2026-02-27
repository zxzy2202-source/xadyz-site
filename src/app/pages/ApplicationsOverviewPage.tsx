import React from 'react';
import { PageShell } from '@/app/components/PageShell';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { IndustryCard } from '@/app/components/applications';
import { ProductPageCta } from '@/app/components/landing';
import { content } from './ApplicationsOverviewPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.application, alt: 'Thermal paper and labels in industrial applications' },
  hero: {
    src: PLACEHOLDERS.hero.application,
    alt: 'Thermal paper and labels in industrial applications',
    overlay: 'dark',
    focal: 'center',
  },
  gallery: [],
  cards: {
    'retail-pos': { src: PLACEHOLDERS.gallery.g1, alt: 'Retail POS thermal paper' },
    'logistics-warehousing': { src: PLACEHOLDERS.gallery.g2, alt: 'Logistics thermal labels' },
    supermarkets: { src: PLACEHOLDERS.gallery.g3, alt: 'Supermarket thermal products' },
    'banking-finance': { src: PLACEHOLDERS.gallery.g1, alt: 'Banking NCR and thermal' },
    'government-tenders': { src: PLACEHOLDERS.gallery.g2, alt: 'Government tender forms' },
    healthcare: { src: PLACEHOLDERS.gallery.g3, alt: 'Healthcare thermal labels' },
  },
  proofs: [],
};

interface ApplicationsOverviewPageProps {
  lang?: 'en' | 'ru' | 'zh';
}

export const ApplicationsOverviewPage: React.FC<ApplicationsOverviewPageProps> = ({ lang = 'en' }) => {
  const t = content[lang];

  const heroContent = (
    <div className="-mt-32 pt-32 mb-20">
      <PageHero
        title={t.hero.h1}
        description={t.hero.subheading ? `${t.hero.subheading} ${t.hero.intro}` : t.hero.intro}
        image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
        overlay={pageAssets.hero.overlay}
        placeholderKey="applications_hero"
      />
    </div>
  );

  return (
    <>
      <SEO
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
        lang={lang}
      />
      <PageShell lang={lang} hero={heroContent}>
        {/* 02: Industry Grid (6 Cards) */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20 mb-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t.industryGrid.sectionTitle}
            </h2>
            <div className="mb-12">
              <ImagePlaceholder
                type="application"
                aspectRatio="16:9"
                description={t.industryGrid.sectionTitle}
                size="lg"
                placeholderKey="applications_industry_grid"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.industryGrid.industries.map((industry) => (
                <IndustryCard
                  key={industry.id}
                  {...industry}
                  typicalProductsLabel={
                    lang === 'en' ? 'Typical Products:' : lang === 'ru' ? 'Типовая продукция:' : '典型产品：'
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* 03: Product Mapping */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t.productMapping.sectionTitle}
            </h2>
            <p className="text-lg text-gray-700">
              {t.productMapping.intro}
            </p>
          </div>
        </section>

        {/* 04: CTA Block */}
        <ProductPageCta lang={lang} />
      </PageShell>
    </>
  );
};
