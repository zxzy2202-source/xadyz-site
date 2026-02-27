import React from 'react';
import { motion } from 'motion/react';
import { CONTACT } from '@/app/lib/contactConfig';
import { Phone, Send, FileText, Grid3x3, CheckCircle, Settings, Truck } from 'lucide-react';
import { PageHero } from '@/app/components/hero/PageHero';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { Header } from '@/app/components/Header';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';
import { content } from './SelfAdhesiveSheetsPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.warehouse, alt: 'Self-adhesive sheets warehouse' },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: 'Self-adhesive sheets stacked with corner protection',
    overlay: 'light',
    focal: 'center',
  },
  gallery: [
    { src: PLACEHOLDERS.material.adhesiveSheets, alt: 'Self-adhesive sheets for printing' },
    { src: PLACEHOLDERS.gallery.g2, alt: 'Self-adhesive sheets storage' },
    { src: PLACEHOLDERS.proof.warehousePallets, alt: 'Sheets stacked on pallets' },
  ],
  cards: {},
  proofs: [],
};

const getAppIcon = (iconName: string, size = 32) => {
  switch (iconName) {
    case 'file': return <FileText size={size} />;
    case 'grid': return <Grid3x3 size={size} />;
    case 'check': return <CheckCircle size={size} />;
    default: return <FileText size={size} />;
  }
};

export const SelfAdhesiveSheetsPage = ({ lang }: { lang: 'en' | 'ru' | 'zh' }) => {
  const t = content[lang];

  const hreflangs = {
    en: '/en/material-supply/self-adhesive-sheets',
    ru: '/ru/material-supply/self-adhesive-sheets',
    zh: '/zh/material-supply/self-adhesive-sheets',
  };
  const canonical = hreflangs[lang];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEO title={t.title} description={t.desc} lang={lang} canonical={canonical} hreflangs={hreflangs} />
      <Header />

      <main className="pt-20">
        <PageHero
          eyebrow={t.forWho}
          title={t.h1}
          description={t.heroDesc}
          primaryCta={{ label: 'WhatsApp', href: CONTACT.whatsappUrl }}
          secondaryCta={{ label: 'Telegram', href: CONTACT.telegramUrl }}
          image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
          overlay={pageAssets.hero.overlay}
          placeholderKey="self_adhesive_sheets"
        />

        {/* Breadcrumb */}
        <div className="w-full bg-gray-50 py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb lang={lang} />
          </div>
        </div>

        {/* Applications Section */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
              {t.applicationsTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {t.applications.map((app, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-lg text-center"
                >
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    {getAppIcon(app.icon)}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{app.title}</h3>
                  <p className="text-gray-600">{app.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits & Specs Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-10 text-gray-900">{t.advantagesTitle}</h2>
                <div className="space-y-6">
                  {t.benefits.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-purple-100 shadow-sm"
                    >
                      <div className="h-8 w-8 bg-purple-600 text-white rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-purple-200">
                        <CheckCircle size={18} />
                      </div>
                      <p className="font-semibold text-gray-800">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Settings className="text-purple-400" size={28} />
                  {t.specsTitle}
                </h2>
                <div className="space-y-4">
                  {t.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between border-b border-gray-800 pb-3 last:border-0">
                      <span className="text-gray-400 font-medium">{spec.label}</span>
                      <span className="text-white font-bold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-purple-600/20 border border-purple-400/30 rounded-2xl">
                  <p className="text-sm font-bold text-purple-300 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <Truck size={16} />
                    {t.logisticsTitle}
                  </p>
                  <p className="text-gray-300 leading-relaxed text-sm">{t.logisticsDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Size Comparison Visual */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
              {lang === 'zh' ? '常见规格对比' : lang === 'ru' ? 'Сравнение стандартных размеров' : 'Common Size Comparison'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-blue-600 text-white font-bold rounded-full text-sm mb-4">A4</div>
                  <p className="text-2xl font-bold text-gray-900">210 × 297mm</p>
                </div>
                <p className="text-gray-600 text-center">{lang === 'zh' ? '标准办公尺寸' : lang === 'ru' ? 'Стандартный офисный формат' : 'Standard Office Size'}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-purple-600 text-white font-bold rounded-full text-sm mb-4">A3</div>
                  <p className="text-2xl font-bold text-gray-900">297 × 420mm</p>
                </div>
                <p className="text-gray-600 text-center">{lang === 'zh' ? '大幅面标签' : lang === 'ru' ? 'Широкоформатные этикетки' : 'Large Format Labels'}</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-orange-600 text-white font-bold rounded-full text-sm mb-4">
                    {lang === 'zh' ? '定制' : lang === 'ru' ? 'Индивидуальный' : 'Custom'}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {lang === 'zh' ? '按需定制' : lang === 'ru' ? 'По требованию' : 'On Demand'}
                  </p>
                </div>
                <p className="text-gray-600 text-center">{lang === 'zh' ? '任意尺寸可定制' : lang === 'ru' ? 'Любые размеры под заказ' : 'Any Size Available'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">{t.ctaTitle}</h2>
            <p className="text-xl text-purple-100 mb-12">
              {lang === 'zh' ? '提供免费样品测试，确保材料符合您的打印设备要求。' : lang === 'ru' ? 'Бесплатные образцы для тестирования, чтобы убедиться в совместимости с вашим печатным оборудованием.' : 'Free sample testing to ensure material compatibility with your printing equipment.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-transform">
                <Phone size={24} className="text-green-500" /> WhatsApp
              </a>
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-blue-400 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-transform">
                <Send size={24} /> Telegram
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
