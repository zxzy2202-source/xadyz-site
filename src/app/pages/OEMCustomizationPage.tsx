import React from 'react';
import { PageShell } from '@/app/components/PageShell';
import { SEO } from '@/app/components/SEO';
import { ManufacturingNav } from '@/app/components/manufacturing';
import { MANUFACTURING_NAV_ITEMS } from '@/app/lib/manufacturingNavConfig';
import { PageHero } from '@/app/components/hero/PageHero';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { getIcon } from '@/app/lib/iconMap';
import { content } from './OEMCustomizationPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.factoryLine, alt: "OEM customization production" },
  hero: {
    src: PLACEHOLDERS.hero.factoryLine,
    alt: "Custom printed thermal labels OEM samples",
    overlay: "dark",
    focal: "left",
  },
  gallery: [
    { src: PLACEHOLDERS.gallery.g1, alt: "Custom thermal label production" },
    { src: PLACEHOLDERS.gallery.g2, alt: "OEM printing and packaging" },
    { src: PLACEHOLDERS.gallery.g3, alt: "Custom product samples" },
  ],
  cards: {},
  proofs: [],
};

interface OEMCustomizationPageProps {
  lang: 'en' | 'ru' | 'zh';
}

export function OEMCustomizationPage({ lang }: OEMCustomizationPageProps) {
  const t = content[lang];

  return (
    <>
      <SEO
        title={`${t.hero.title} | Zhixin Paper - B2B Thermal Paper Supplier`}
        description={t.hero.description}
        lang={lang}
      />
      <PageShell lang={lang} hero={(
        <div className="-mt-32 pt-32 mb-20">
          <PageHero
            eyebrow={t.hero.subtitle}
            title={t.hero.title}
            description={t.hero.description}
            image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
            overlay={pageAssets.hero.overlay}
            placeholderKey="oem_customization_hero"
          />
        </div>
      )}>
        <div className="-mt-8 mb-10">
          <ManufacturingNav lang={lang} items={MANUFACTURING_NAV_ITEMS[lang]} />
        </div>

        {/* Services Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.services.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.services.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.services.items.map((service, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="mb-6">{getIcon(service.icon, 48, 'text-blue-600')}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.process.title}</h2>
              <p className="text-xl text-gray-600">{t.process.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.process.steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < t.process.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-blue-200 -z-10" />
                  )}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-600 text-white text-3xl font-bold mb-6">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t.capabilities.title}</h2>
              <p className="text-xl text-blue-200">{t.capabilities.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.capabilities.specs.map((spec, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 text-center">
                  <div className="text-sm text-blue-200 mb-2">{spec.label}</div>
                  <div className="text-3xl font-bold">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.industries.title}</h2>
              <p className="text-xl text-gray-600">{t.industries.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.industries.list.map((industry, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
                  <div className="font-semibold text-lg text-gray-900">{industry}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">{t.cta.title}</h2>
            <p className="text-xl text-blue-100 mb-8">{t.cta.description}</p>
            <a
              href={`/${lang}/contact`}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
            >
              {t.cta.button}
            </a>
          </div>
        </section>
      </PageShell>
    </>
  );
}
