import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT } from '@/app/lib/contactConfig';
import { Phone, Send, Package, Settings, Truck, CheckCircle, Layers } from 'lucide-react';
import { PageHero } from '@/app/components/hero/PageHero';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { Header } from '@/app/components/Header';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';
import { content } from './SelfAdhesiveJumboPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.warehouse, alt: 'Self-adhesive jumbo rolls warehouse' },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: 'Self-adhesive jumbo rolls for label converters',
    overlay: 'light',
    focal: 'center',
  },
  gallery: [
    { src: PLACEHOLDERS.material.adhesiveJumbo, alt: 'Self-adhesive jumbo rolls' },
    { src: PLACEHOLDERS.gallery.g2, alt: 'Self-adhesive roll storage' },
    { src: PLACEHOLDERS.proof.containerLoading, alt: 'Container loading for self-adhesive shipment' },
  ],
  cards: {},
  proofs: [],
};

export const SelfAdhesiveJumboPage = ({ lang }: { lang: 'en' | 'ru' | 'zh' }) => {
  const t = content[lang];

  const hreflangs = {
    en: '/en/material-supply/self-adhesive-jumbo-rolls',
    ru: '/ru/material-supply/self-adhesive-jumbo-rolls',
    zh: '/zh/material-supply/self-adhesive-jumbo-rolls',
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
          placeholderKey="self_adhesive_jumbo_rolls"
        />

        {/* Breadcrumb */}
        <div className="w-full bg-gray-50 py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb lang={lang} />
          </div>
        </div>

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
                      className="flex items-start gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100"
                    >
                      <div className="h-8 w-8 bg-blue-600 text-white rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                        <CheckCircle size={18} />
                      </div>
                      <p className="font-semibold text-gray-800">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Settings className="text-blue-400" size={28} />
                  {t.specsTitle}
                </h2>
                <div className="space-y-4">
                  {t.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between border-b border-gray-800 pb-3 last:border-0">
                      <span className="text-gray-400 font-medium">{spec.label}</span>
                      <span className="text-white font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-blue-600/20 border border-blue-400/30 rounded-2xl">
                  <p className="text-sm font-bold text-blue-300 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <Truck size={16} />
                    {t.logisticsTitle}
                  </p>
                  <p className="text-gray-300 leading-relaxed text-sm">{t.logisticsDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Features Grid */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Layers className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {lang === 'zh' ? '多层结构' : lang === 'ru' ? 'Многослойная структура' : 'Multi-Layer Structure'}
                </h3>
                <p className="text-gray-600">
                  {lang === 'zh' ? '面材、粘合层、底纸三层结构，确保稳定的分离性能' : lang === 'ru' ? 'Трёхслойная структура: лицевой слой, клеевой слой, подложка для стабильного разделения' : 'Three-layer structure: facestock, adhesive, liner for stable separation'}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {lang === 'zh' ? '工厂直供' : lang === 'ru' ? 'Прямые поставки' : 'Direct Supply'}
                </h3>
                <p className="text-gray-600">
                  {lang === 'zh' ? '取消中间商，从生产线直接发货，价格更优' : lang === 'ru' ? 'Без посредников, прямо с производственной линии, лучшие цены' : 'No middlemen, direct from production line, better prices'}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {lang === 'zh' ? '定制规格' : lang === 'ru' ? 'Индивидуальные спецификации' : 'Custom Specifications'}
                </h3>
                <p className="text-gray-600">
                  {lang === 'zh' ? '支持克重、宽度、底纸类型等多项参数定制' : lang === 'ru' ? 'Настройка плотности, ширины, типа подложки и других параметров' : 'Customizable weight, width, liner type and more parameters'}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">{t.ctaTitle}</h2>
            <p className="text-xl text-blue-100 mb-12">
              {lang === 'zh' ? '联系我们获取详细规格书和批量报价单。支持样品测试。' : lang === 'ru' ? 'Свяжитесь с нами для получения подробных спецификаций и оптовых цен. Доступны образцы для тестирования.' : 'Contact us for detailed specifications and bulk pricing. Sample testing available.'}
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
