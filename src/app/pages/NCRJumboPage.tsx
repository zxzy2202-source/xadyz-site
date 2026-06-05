import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT } from '@/app/lib/contactConfig';
import { Phone, Send, Copy, CheckCircle, Settings, Truck, Package } from 'lucide-react';
import { PageHero } from '@/app/components/hero/PageHero';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { Header } from '@/app/components/Header';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';
import { content } from './NCRJumboPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.warehouse, alt: 'NCR jumbo rolls warehouse' },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: 'NCR carbonless jumbo rolls for form manufacturers',
    overlay: 'light',
    focal: 'center',
  },
  gallery: [
    { src: PLACEHOLDERS.material.ncrJumbo, alt: 'NCR jumbo rolls with color-coded edges' },
    { src: PLACEHOLDERS.gallery.g2, alt: 'NCR roll storage' },
    { src: PLACEHOLDERS.proof.warehousePallets, alt: 'NCR rolls on pallets' },
  ],
  cards: {},
  proofs: [],
};

export const NCRJumboPage = ({ lang }: { lang: 'en' | 'ru' | 'zh' }) => {
  const t = content[lang];

  const hreflangs = {
    en: '/en/material-supply/ncr-jumbo-rolls',
    ru: '/ru/material-supply/ncr-jumbo-rolls',
    zh: '/zh/material-supply/ncr-jumbo-rolls',
  };
  const canonical = hreflangs[lang];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-50 to-blue-100 border-blue-200',
      purple: 'from-purple-50 to-purple-100 border-purple-200',
      green: 'from-green-50 to-green-100 border-green-200',
    };
    return colors[color] || 'from-gray-50 to-gray-100 border-gray-200';
  };

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
          placeholderKey="ncr_jumbo_rolls"
        />

        {/* Breadcrumb */}
        <div className="w-full bg-gray-50 py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb lang={lang} />
          </div>
        </div>

        {/* NCR Layers Explanation */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
              {t.layersTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {t.ncrLayers.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`bg-gradient-to-br ${getColorClass(layer.color)} border-2 p-8 rounded-2xl shadow-lg`}
                >
                  <div className="text-center mb-6">
                    <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm font-bold rounded-full text-sm mb-4 shadow">
                      {layer.name}
                    </div>
                  </div>
                  <p className="text-gray-700 text-center leading-relaxed">{layer.desc}</p>
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
                      className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-green-100 shadow-sm"
                    >
                      <div className="h-8 w-8 bg-green-600 text-white rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-green-200">
                        <CheckCircle size={18} />
                      </div>
                      <p className="font-semibold text-gray-800">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Settings className="text-green-400" size={28} />
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

                <div className="mt-10 p-6 bg-green-600/20 border border-green-400/30 rounded-2xl">
                  <p className="text-sm font-bold text-green-300 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <Truck size={16} />
                    {t.logisticsTitle}
                  </p>
                  <p className="text-gray-300 leading-relaxed text-sm">{t.logisticsDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Features */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Copy size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {lang === 'zh' ? '无需碳纸' : lang === 'ru' ? 'Без копировальной бумаги' : 'No Carbon Required'}
                </h3>
                <p className="text-gray-700">
                  {lang === 'zh' ? '微胶囊技术实现无碳复写，环保清洁' : lang === 'ru' ? 'Технология микрокапсул для безуглеродного копирования, экологично и чисто' : 'Microcapsule technology for carbonless copying, eco-friendly and clean'}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {lang === 'zh' ? '工厂直供' : lang === 'ru' ? 'Прямо с завода' : 'Direct from Factory'}
                </h3>
                <p className="text-gray-700">
                  {lang === 'zh' ? 'CB、CFB、CF三种类型同时生产，一站式采购' : lang === 'ru' ? 'Одновременное производство CB, CFB, CF — закупка в одном месте' : 'CB, CFB, CF produced simultaneously, one-stop sourcing'}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {lang === 'zh' ? '稳定品质' : lang === 'ru' ? 'Стабильное качество' : 'Stable Quality'}
                </h3>
                <p className="text-gray-700">
                  {lang === 'zh' ? '严格的涂层控制，确保每卷显色效果一致' : lang === 'ru' ? 'Строгий контроль покрытия, гарантируем одинаковое проявление цвета в каждом рулоне' : 'Strict coating control ensures consistent color development in every roll'}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">{t.ctaTitle}</h2>
            <p className="text-xl text-green-100 mb-12">
              {lang === 'zh' ? '提供CB、CFB、CF全套材料报价。支持样品测试和技术参数定制。' : lang === 'ru' ? 'Полный комплект цен на материалы CB, CFB, CF. Образцы для тестирования и настройка технических параметров.' : 'Complete pricing for CB, CFB, CF materials. Sample testing and technical parameter customization available.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href={CONTACT.whatsappUrl} className="px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-transform">
                <Phone size={24} className="text-green-500" /> WhatsApp
              </a>
              <a href={CONTACT.telegramUrl} className="px-10 py-5 bg-blue-400 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-transform">
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
