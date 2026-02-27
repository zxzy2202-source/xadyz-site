import React from 'react';
import { motion } from 'motion/react';
import { CONTACT } from '@/app/lib/contactConfig';
import { Phone, Send, FileText, Copy, Layers, Settings, Truck, CheckCircle } from 'lucide-react';
import { PageHero } from '@/app/components/hero/PageHero';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { Header } from '@/app/components/Header';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';
import { content } from './NCRSheetsPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.warehouse, alt: 'NCR sheets warehouse' },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: 'NCR carbonless sheets stacked with moisture-proof packaging',
    overlay: 'light',
    focal: 'center',
  },
  gallery: [
    { src: PLACEHOLDERS.material.ncrSheets, alt: 'NCR carbonless sheets' },
    { src: PLACEHOLDERS.gallery.g2, alt: 'NCR sheets stacked after slitting' },
    { src: PLACEHOLDERS.proof.warehousePallets, alt: 'NCR sheets on pallets' },
  ],
  cards: {},
  proofs: [],
};

const getAppIcon = (iconName: string, size = 32) => {
  switch (iconName) {
    case 'file': return <FileText size={size} />;
    case 'copy': return <Copy size={size} />;
    case 'layers': return <Layers size={size} />;
    default: return <FileText size={size} />;
  }
};

export const NCRSheetsPage = ({ lang }: { lang: 'en' | 'ru' | 'zh' }) => {
  const t = content[lang];

  const hreflangs = {
    en: '/en/material-supply/ncr-sheets',
    ru: '/ru/material-supply/ncr-sheets',
    zh: '/zh/material-supply/ncr-sheets',
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
          placeholderKey="ncr_sheets"
        />

        {/* Breadcrumb */}
        <div className="w-full bg-gray-50 py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb lang={lang} />
          </div>
        </div>

        {/* NCR Layers Visual */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
              {t.layersTitle}
            </h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {t.ncrLayers.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`${layer.bgColor} ${layer.textColor} p-6 rounded-2xl shadow-lg flex items-center justify-between`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center font-black text-lg shadow">
                      {layer.name}
                    </div>
                    <p className="font-semibold text-lg">{layer.desc}</p>
                  </div>
                  <Copy className="opacity-50" size={24} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-24 px-4 bg-gray-50">
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
                  className="bg-white p-8 rounded-2xl shadow-lg text-center"
                >
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
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
        <section className="py-24 px-4 bg-white">
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
                      className="flex items-start gap-4 p-5 bg-indigo-50 rounded-2xl border border-indigo-100"
                    >
                      <div className="h-8 w-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
                        <CheckCircle size={18} />
                      </div>
                      <p className="font-semibold text-gray-800">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Settings className="text-indigo-400" size={28} />
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

                <div className="mt-10 p-6 bg-indigo-600/20 border border-indigo-400/30 rounded-2xl">
                  <p className="text-sm font-bold text-indigo-300 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <Truck size={16} />
                    {t.logisticsTitle}
                  </p>
                  <p className="text-gray-300 leading-relaxed text-sm">{t.logisticsDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Size Options Visual */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
              {lang === 'zh' ? '常见尺寸选项' : lang === 'ru' ? 'Стандартные размеры' : 'Common Size Options'}
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'A4', size: '210×297mm', popular: true },
                { name: 'A5', size: '148×210mm', popular: false },
                { name: 'A3', size: '297×420mm', popular: false },
                { name: lang === 'zh' ? '定制' : lang === 'ru' ? 'Индивидуальный' : 'Custom', size: lang === 'zh' ? '按需' : lang === 'ru' ? 'По запросу' : 'On Demand', popular: false },
              ].map((sizeOpt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-2xl shadow-lg text-center ${sizeOpt.popular ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white' : 'bg-white'}`}
                >
                  {sizeOpt.popular && (
                    <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold mb-3">
                      {lang === 'zh' ? '最常用' : lang === 'ru' ? 'Самый популярный' : 'Most Popular'}
                    </div>
                  )}
                  <div className={`text-3xl font-black mb-2 ${sizeOpt.popular ? 'text-white' : 'text-indigo-600'}`}>
                    {sizeOpt.name}
                  </div>
                  <div className={`text-sm ${sizeOpt.popular ? 'text-indigo-100' : 'text-gray-600'}`}>
                    {sizeOpt.size}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">{t.ctaTitle}</h2>
            <p className="text-xl text-indigo-100 mb-12">
              {lang === 'zh'
                ? '提供CB、CFB、CF全套片材报价。支持样品测试和多种颜色选择。'
                : lang === 'ru'
                ? 'Полный комплект цен на листы CB, CFB, CF. Образцы для тестирования и выбор цветов.'
                : 'Complete pricing for CB, CFB, CF sheets. Sample testing and multiple color options available.'}
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
