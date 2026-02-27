import React from 'react';
import { SEO } from '@/app/components/SEO';
import { PageShell } from '@/app/components/PageShell';
import { PageHero } from '@/app/components/hero/PageHero';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { getIcon } from '@/app/lib/iconMap';
import { ProductCategoryCard, ManufacturingProofBar } from '@/app/components/products';
import { SectionCardGrid, ProductPageCta } from '@/app/components/landing';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { content } from './ProductsPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.warehouse, alt: "Thermal paper rolls and labels warehouse" },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: "Thermal paper rolls and labels warehouse",
    overlay: "light",
    focal: "center",
  },
  gallery: [
    { src: PLACEHOLDERS.gallery.g1, alt: "Thermal paper products overview" },
    { src: PLACEHOLDERS.gallery.g2, alt: "Label and roll packaging" },
    { src: PLACEHOLDERS.gallery.g3, alt: "NCR forms and thermal products" },
  ],
  cards: {
    "thermal-paper-rolls": { src: PLACEHOLDERS.product.thermalRolls, alt: "Thermal paper rolls for POS and receipt printing" },
    "thermal-labels": { src: PLACEHOLDERS.product.thermalLabels, alt: "Thermal labels for logistics and barcode systems" },
    "ncr-forms": { src: PLACEHOLDERS.product.ncrForms, alt: "NCR carbonless multi-part forms" },
  },
  proofs: [],
};

interface ProductsPageProps {
  lang?: 'en' | 'ru' | 'zh';
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ lang = 'en' }) => {
  const t = content[lang];

  const heroContent = (
    <PageHero
      title={t.hero.h1}
      description={t.hero.subheading ? `${t.hero.subheading} ${t.hero.intro}` : t.hero.intro}
      image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
      overlay={pageAssets.hero.overlay}
      placeholderKey="products_hero_banner"
    />
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
        {/* 02: Category Grid */}
        <section className="mb-24">
          <div className="mb-10">
            <ImagePlaceholder
              type="product"
              aspectRatio="16:9"
              description={t.hero.h1}
              size="xl"
              placeholderKey="products_category_grid"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.categories.map((category) => (
              <ProductCategoryCard key={category.id} {...category} />
            ))}
          </div>
        </section>

        {/* 03: Manufacturing Proof */}
        <ManufacturingProofBar
          sectionTitle={t.manufacturingProof.sectionTitle}
          items={t.manufacturingProof.items}
        />

        {/* 04: Customization & OEM */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.customization.sectionTitle}</h2>
            <p className="text-lg text-gray-600">{t.customization.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.customization.options.map((option, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:shadow-xl transition-all"
              >
                <div className="flex justify-center mb-4">{getIcon(option.icon, 28)}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
                <p className="text-gray-600">{option.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 05: Applications Teaser */}
        <SectionCardGrid
          sectionTitle={t.applicationsTeaser.sectionTitle}
          items={t.applicationsTeaser.items}
          cta={t.applicationsTeaser.cta}
          ctaLink={t.applicationsTeaser.ctaLink}
          variant="appWithDesc"
          background="blue"
          cardCta={lang === 'en' ? 'Learn more' : lang === 'ru' ? 'Подробнее' : '了解更多'}
        />

        {/* 06: CTA Block */}
        <ProductPageCta lang={lang} />
      </PageShell>
    </>
  );
};
