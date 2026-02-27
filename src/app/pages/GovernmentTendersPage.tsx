import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle2, FileText, Building2, Package, Shield } from 'lucide-react';
import { PageShell } from '@/app/components/PageShell';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { content } from './GovernmentTendersPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.application, alt: "Government tender documentation" },
  hero: {
    src: PLACEHOLDERS.hero.application,
    alt: "Tender documentation package with certificates",
    overlay: "dark",
    focal: "center",
  },
  gallery: [
    { src: PLACEHOLDERS.gallery.g1, alt: "Tender thermal paper and NCR" },
    { src: PLACEHOLDERS.gallery.g2, alt: "Government project supply" },
    { src: PLACEHOLDERS.proof.qualityInspection, alt: "Quality inspection" },
    { src: PLACEHOLDERS.proof.containerLoading, alt: "Container loading" },
  ],
  cards: {},
  proofs: [
    { src: PLACEHOLDERS.proof.qualityInspection, alt: "Quality inspection", tag: "quality" },
    { src: PLACEHOLDERS.proof.containerLoading, alt: "Container loading", tag: "shipping" },
  ],
};

interface GovernmentTendersPageProps {
  lang?: 'en' | 'ru' | 'zh';
}

export const GovernmentTendersPage: React.FC<GovernmentTendersPageProps> = ({ lang = 'en' }) => {
  const t = content[lang];

  return (
    <>
      <SEO
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
        lang={lang}
      />

      <PageShell lang={lang} hero={(
        <div className="-mt-32 pt-32 mb-20">
          <PageHero
            title={t.hero.h1}
            description={t.hero.subheading ? `${t.hero.subheading} ${t.hero.intro}` : t.hero.intro}
            primaryCta={t.hero.primaryCTA ? { label: t.hero.primaryCTA, href: t.hero.primaryCTALink } : undefined}
            secondaryCta={t.hero.secondaryCTA ? { label: t.hero.secondaryCTA, href: t.hero.secondaryCTALink } : undefined}
            image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
            overlay={pageAssets.hero.overlay}
            placeholderKey="govt_hero"
          />
        </div>
      )}>
        {/* 02: Qualification */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-16 mb-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                {t.qualification.sectionTitle}
              </h2>
              <p className="text-lg text-gray-700 mb-6 text-center">{t.qualification.intro}</p>
              <ul className="space-y-3 mb-8">
                {t.qualification.targetGroups.map((group, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={24} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{group}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-blue-600 text-white p-6 rounded-xl text-center">
                <p className="text-lg font-semibold">{t.qualification.callout}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 03: Supported Products */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.supportedProducts.sectionTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.supportedProducts.products.map((product, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-400 hover:shadow-xl transition-all text-center"
              >
                <div className="flex justify-center mb-4">
                  <Package size={40} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{product.title}</h3>
                <p className="text-gray-600">{product.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 04: Why We Fit */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20 mb-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t.capabilities.sectionTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.capabilities.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Shield size={28} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05: Documentation Support */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {t.documentation.sectionTitle}
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-center">{t.documentation.intro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {t.documentation.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4"
                >
                  <FileText size={20} className="text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center italic">{t.documentation.note}</p>
          </div>
        </section>

        {/* 06: Use Cases */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-20 mb-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t.useCases.sectionTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.useCases.cases.map((useCase, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-center mb-4">
                    <Building2 size={32} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-center">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm text-center">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07: Tender Request CTA */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">{t.tenderCTA.headline}</h2>
            <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">{t.tenderCTA.subtext}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={t.tenderCTA.primaryLink}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all shadow-xl"
              >
                {t.tenderCTA.primaryButton}
                <ArrowRight size={20} />
              </Link>
              <Link
                to={t.tenderCTA.secondaryLink}
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-700 text-white border-2 border-white font-bold rounded-xl hover:bg-blue-800 hover:scale-105 transition-all"
              >
                {t.tenderCTA.secondaryButton}
              </Link>
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
};
