import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/app/components/Header';
import { ResourcesFooter } from '@/app/components/ResourcesFooter';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { BreadcrumbNav } from '@/app/components/BreadcrumbNav';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { ChevronDown, Search, HelpCircle, MessageCircle } from 'lucide-react';
import { content } from './FAQsPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.warehouse, alt: "Frequently asked questions" },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: "Frequently asked questions about thermal paper",
    overlay: "light",
    focal: "center",
  },
  gallery: [{ src: PLACEHOLDERS.gallery.g1, alt: "FAQ support and information" }],
  cards: {},
  proofs: [],
};

interface FAQsPageProps {
  lang: 'en' | 'ru' | 'zh';
}

export function FAQsPage({ lang }: FAQsPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const t = content[lang];

  const filteredFaqs = t.faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.en.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title={`${t.hero.title} | Zhixin Paper - B2B Thermal Paper Supplier`}
        description={t.hero.description}
        lang={lang}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-white">
        <Header lang={lang} />

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-10">
            <BreadcrumbNav lang={lang} />
          </div>
          <PageHero
            eyebrow={t.hero.subtitle}
            title={t.hero.title}
            description={t.hero.description}
            image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
            overlay={pageAssets.hero.overlay}
            placeholderKey="faqs_hero"
          />
        </div>

        {/* Search Section */}
        <section className="py-12 bg-gray-50 sticky top-0 z-10 shadow-sm">
          <div className="max-w-3xl mx-auto px-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search.placeholder}
                className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">{t.categories.title}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {t.categories.items.map((category, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors text-sm font-medium"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">{t.search.noResults}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-100 transition-colors"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left"
                    >
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-blue-600 mb-2">{faq.category}</div>
                        <div className="text-lg font-bold text-gray-900">{faq.question}</div>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-gray-400 flex-shrink-0 ml-4 transition-transform ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openIndex === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold mb-6">{t.contact.title}</h2>
            <p className="text-xl text-blue-100 mb-8">{t.contact.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`/${lang}/contact`}
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
              >
                {t.contact.button}
              </a>
              <span className="text-blue-200">{t.contact.or}</span>
              <div className="flex gap-4">
                <button className="text-white hover:text-blue-200 transition-colors font-medium underline">
                  {t.contact.phone}
                </button>
                <button className="text-white hover:text-blue-200 transition-colors font-medium underline">
                  {t.contact.email}
                </button>
              </div>
            </div>
          </div>
        </section>

        <ResourcesFooter lang={lang} />
      </div>
    </>
  );
}
