import React from 'react';
import { PageShell } from '@/app/components/PageShell';
import { ResourcesFooter } from '@/app/components/ResourcesFooter';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { BreadcrumbNav } from '@/app/components/BreadcrumbNav';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { BookOpen, Calculator, HelpCircle, FileText, TrendingUp, Download } from 'lucide-react';
import { content } from './ResourcesCenterPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.warehouse, alt: 'Resources center knowledge hub' },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: 'Resources center knowledge hub for thermal paper industry',
    overlay: 'light',
    focal: 'center',
  },
  gallery: [],
  cards: {
    blog: { src: PLACEHOLDERS.gallery.g1, alt: 'Blog and industry insights' },
    packaging: { src: PLACEHOLDERS.gallery.g2, alt: 'Packaging and logistics' },
    tools: { src: PLACEHOLDERS.gallery.g3, alt: 'Tools and calculators' },
    faqs: { src: PLACEHOLDERS.gallery.g1, alt: 'Frequently asked questions' },
  },
  proofs: [],
};

interface ResourcesCenterPageProps {
  lang: 'en' | 'ru' | 'zh';
}

export function ResourcesCenterPage({ lang }: ResourcesCenterPageProps) {
  const t = content[lang];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'book':
        return <BookOpen className="w-12 h-12 text-blue-600" />;
      case 'calculator':
        return <Calculator className="w-12 h-12 text-blue-600" />;
      case 'help':
        return <HelpCircle className="w-12 h-12 text-blue-600" />;
      case 'file':
        return <FileText className="w-12 h-12 text-blue-600" />;
      case 'trending':
        return <TrendingUp className="w-12 h-12 text-blue-600" />;
      case 'download':
        return <Download className="w-12 h-12 text-blue-600" />;
      default:
        return <BookOpen className="w-12 h-12 text-blue-600" />;
    }
  };

  return (
    <>
      <SEO
        title={`${t.hero.title} | Zhixin Paper - B2B Thermal Paper Supplier`}
        description={t.hero.description}
        lang={lang}
      />
      <PageShell
        lang={lang}
        footer={<ResourcesFooter lang={lang} />}
        hero={(
          <div className="relative -mt-32 pt-32 mb-20">
            <div className="absolute top-0 left-0 right-0 z-10">
              <BreadcrumbNav lang={lang} />
            </div>
            <PageHero
              eyebrow={t.hero.subtitle}
              title={t.hero.title}
              description={t.hero.description}
              image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
              overlay={pageAssets.hero.overlay}
              placeholderKey="resources_hero"
            />
          </div>
        )}
      >
        {/* Resource Sections Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t.sections.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.sections.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.sections.items.map((item, index) => (
                <a
                  key={index}
                  href={item.link.startsWith('/') ? `/${lang}${item.link}` : `/${lang}/resources/${item.link}`}
                  className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="mb-6 transform group-hover:scale-110 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              {t.featured.title}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {t.featured.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-[16/9]">
                    <ImagePlaceholder
                      type="section"
                      aspectRatio="16:9"
                      description={item.title}
                      placeholderKey="resources_featured_card"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm font-semibold text-blue-600 mb-2">
                      {item.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item.description}
                    </p>
                    <div className="text-sm text-gray-500">
                      {item.readTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">{t.support.title}</h2>
            <p className="text-xl text-blue-100 mb-8">
              {t.support.description}
            </p>
            <a
              href={`/${lang}/contact`}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
            >
              {t.support.button}
            </a>
          </div>
        </section>

      </PageShell>
    </>
  );
}
