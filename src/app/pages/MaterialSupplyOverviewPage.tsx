import React from 'react';
import { Link } from 'react-router';
import { Header } from '@/app/components/Header';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { ArrowRight, CheckCircle2, Package, Factory, Shield } from 'lucide-react';
import { PageShell } from '@/app/components/PageShell';
import { ProductPageCta } from '@/app/components/landing';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { content } from './MaterialSupplyOverviewPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.warehouse, alt: 'Material supply warehouse' },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: 'Raw material warehouse for thermal, self-adhesive and NCR materials',
    overlay: 'light',
    focal: 'center',
  },
  gallery: [
    { src: PLACEHOLDERS.gallery.g1, alt: 'Thermal and self-adhesive materials' },
    { src: PLACEHOLDERS.gallery.g2, alt: 'NCR and paper materials storage' },
    { src: PLACEHOLDERS.gallery.g3, alt: 'Material supply and converting' },
  ],
  cards: {
    'thermal-jumbo': { src: PLACEHOLDERS.material.jumboRolls, alt: 'Thermal jumbo rolls for converters' },
    'self-adhesive': { src: PLACEHOLDERS.material.adhesiveJumbo, alt: 'Self-adhesive jumbo rolls and sheets' },
    ncr: { src: PLACEHOLDERS.material.ncrJumbo, alt: 'NCR carbonless materials' },
  },
  proofs: [],
};

interface MaterialSupplyOverviewPageProps {
  lang?: 'en' | 'ru' | 'zh';
}

export const MaterialSupplyOverviewPage: React.FC<MaterialSupplyOverviewPageProps> = ({ lang = 'en' }) => {
  const t = content[lang];

  return (
    <>
      <SEO title={t.seo.title} description={t.seo.description} keywords={t.seo.keywords} lang={lang} />

      <Header />

      <main className="pt-32 pb-20">
        <div className="-mt-32 pt-32 mb-20">
          <PageHero
            title={t.hero.h1}
            description={t.hero.subheading ? `${t.hero.subheading} ${t.hero.intro}` : t.hero.intro}
            primaryCta={t.hero.primaryCTA ? { label: t.hero.primaryCTA, href: t.hero.primaryCTALink } : undefined}
            image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
            overlay={pageAssets.hero.overlay}
            placeholderKey="material_supply_hero"
          />
        </div>

        {/* Breadcrumb */}
        <div className="w-full bg-gray-50 py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb lang={lang} />
          </div>
        </div>

        {/* 02: Material Categories (3 Cards) */}
        <section id="categories" className="bg-gradient-to-br from-gray-50 to-white py-20 mb-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t.materialCategories.sectionTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.materialCategories.categories.map((category) => (
                <div key={category.id} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-6 text-base">{category.desc}</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {category.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={category.ctaLink} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:scale-105 transition-all">
                    {category.cta}
                    <ArrowRight size={20} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03: Supply Model & Partnership */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.supplyModel.sectionTitle}</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">{t.supplyModel.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.supplyModel.features.map((feature, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4">
                  <Package size={32} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{feature.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 04: Quality & Sourcing Assurance */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-16 mb-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.qualityAssurance.sectionTitle}</h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto">{t.qualityAssurance.intro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.qualityAssurance.features.map((feature, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Shield size={32} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05: Applications Teaser */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.applicationsTeaser.sectionTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.applicationsTeaser.items.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4">
                  <Factory size={28} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 06: Finished Products Cross-link */}
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">
                {lang === 'zh' ? '采购成品？' : lang === 'ru' ? 'Нужна готовая продукция?' : 'Need Finished Products?'}
              </p>
              <h3 className="text-2xl font-bold text-white">
                {lang === 'zh' ? '热敏纸卷、热敏标签与 NCR 表格，工厂直供' : lang === 'ru' ? 'Термобумага в рулонах, этикетки и NCR-формы — прямо с завода' : 'Thermal Paper Rolls, Labels & NCR Forms — Direct from Factory'}
              </h3>
            </div>
            <a
              href={`/${lang}/products`}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              {lang === 'zh' ? '查看成品产品 →' : lang === 'ru' ? 'Смотреть готовую продукцию →' : 'View Finished Products →'}
            </a>
          </div>
        </section>

        {/* 07: CTA Block */}
        <ProductPageCta lang={lang} />
      </main>

      <Footer />
    </>
  );
};
