import React from 'react';
import { Header } from '@/app/components/Header';
import { ResourcesFooter } from '@/app/components/ResourcesFooter';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { Package, Ship, FileText, Calculator, Truck, CheckCircle } from 'lucide-react';
import { content } from './PackagingLogisticsPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.proof.containerLoading, alt: "Packaging and logistics" },
  hero: {
    src: PLACEHOLDERS.proof.containerLoading,
    alt: "Container loading for export shipment",
    overlay: "dark",
    focal: "center",
  },
  gallery: [
    { src: PLACEHOLDERS.proof.containerLoading, alt: "Container loading process" },
    { src: PLACEHOLDERS.proof.warehousePallets, alt: "Warehouse pallets and packaging" },
    { src: PLACEHOLDERS.gallery.g2, alt: "Export packaging standards" },
  ],
  cards: {},
  proofs: [],
};

interface PackagingLogisticsPageProps {
  lang: 'en' | 'ru' | 'zh';
}

export function PackagingLogisticsPage({ lang }: PackagingLogisticsPageProps) {
  const t = content[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'package': return <Package className="w-12 h-12 text-blue-600" />;
      case 'ship': return <Ship className="w-12 h-12 text-blue-600" />;
      case 'file': return <FileText className="w-12 h-12 text-blue-600" />;
      case 'calculator': return <Calculator className="w-12 h-12 text-blue-600" />;
      case 'truck': return <Truck className="w-12 h-12 text-blue-600" />;
      default: return <Package className="w-12 h-12 text-blue-600" />;
    }
  };

  return (
    <>
      <SEO
        title={`${t.hero.title} | Zhixin Paper - B2B Thermal Paper Supplier`}
        description={t.hero.description}
        lang={lang}
      />
      <div className="min-h-screen flex flex-col bg-white">
        <Header lang={lang} />

        <PageHero
          eyebrow={t.hero.subtitle}
          title={t.hero.title}
          description={t.hero.description}
          image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
          overlay={pageAssets.hero.overlay}
          placeholderKey="packaging_shipping_hero"
        />

        {/* Packaging Standards Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.standards.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.standards.description}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {t.standards.items.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="mb-6">{getIcon(item.icon)}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packaging & Logistics Photos Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.photos.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.photos.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.photos.items.map((item) => (
                <div key={item.key} className="space-y-4">
                  <ImagePlaceholder
                    type="section"
                    aspectRatio="3:2"
                    placeholderKey={item.placeholderKey}
                    description={item.title}
                    className="rounded-xl overflow-hidden"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.documentation.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.documentation.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.documentation.items.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-colors">
                  <div className="mb-4">{getIcon(item.icon)}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping Options Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t.shipping.title}</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">{t.shipping.description}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {t.shipping.items.map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <div className="mb-6">{getIcon(item.icon)}</div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <div className="text-blue-200 font-semibold mb-4">{item.time}</div>
                  <p className="text-blue-100 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.tools.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.tools.description}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {t.tools.items.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                  <div className="mb-6">{getIcon(item.icon)}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.cta.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{t.cta.description}</p>
            <a
              href={`/${lang}/contact`}
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              {t.cta.button}
            </a>
          </div>
        </section>

        <ResourcesFooter lang={lang} />
      </div>
    </>
  );
}
