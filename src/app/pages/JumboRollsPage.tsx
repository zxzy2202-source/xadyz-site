import React from 'react';
import { useLocation } from 'react-router';
import { CheckCircle, Layers, Package, Phone, Send, Settings, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '@/app/components/Header';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { PageHero } from '@/app/components/hero/PageHero';
import { SEO } from '@/app/components/SEO';
import { CONTACT } from '@/app/lib/contactConfig';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { content } from './JumboRollsPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.warehouse, alt: 'Thermal jumbo rolls warehouse' },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: 'Thermal jumbo rolls stacked in warehouse',
    overlay: 'light',
    focal: 'center',
  },
  gallery: [
    { src: PLACEHOLDERS.material.jumboRolls, alt: 'Thermal jumbo rolls for slitting' },
    { src: PLACEHOLDERS.proof.warehousePallets, alt: 'Jumbo rolls on pallets in warehouse' },
    { src: PLACEHOLDERS.proof.containerLoading, alt: 'Container loading for jumbo roll shipment' },
  ],
  cards: {},
  proofs: [],
};

export const JumboRollsPage = ({ lang, type }: { lang: 'en' | 'ru' | 'zh'; type?: string }) => {
  const t = content[lang];
  const location = useLocation();
  const isMaterialSupply = location.pathname.includes('/material-supply/thermal-jumbo-rolls');

  const hreflangs = isMaterialSupply
    ? { en: '/en/material-supply/thermal-jumbo-rolls', ru: '/ru/material-supply/thermal-jumbo-rolls', zh: '/zh/material-supply/thermal-jumbo-rolls' }
    : { en: '/en/jumbo-rolls', ru: '/ru/jumbo-rolls', zh: '/zh/jumbo-rolls' };
  const canonical = hreflangs[lang];

  let h1 = t.h1;
  let title = t.title;

  if (!isMaterialSupply && type === 'converters') {
    h1 = lang === 'zh' ? '分切商用Jumbo大卷' : lang === 'ru' ? 'Jumbo рулоны для переработчиков' : 'Jumbo Rolls for Converters';
    title = lang === 'zh' ? '分切厂用Jumbo大卷热敏纸 | 志信纸业' : lang === 'ru' ? 'Jumbo рулоны термобумаги для заводов | Zhixin Paper' : 'Jumbo Thermal Rolls for Paper Factories | Zhixin Paper';
  } else if (!isMaterialSupply && type === 'thermal') {
    h1 = lang === 'zh' ? 'Jumbo大卷热敏原纸' : lang === 'ru' ? 'Термобумага в Jumbo рулонах' : 'Thermal Paper in Jumbo Rolls';
    title = lang === 'zh' ? 'Jumbo大卷热敏纸批发 | 志信纸业' : lang === 'ru' ? 'Термобумага в джамбо рулонах оптом | Zhixin Paper' : 'Thermal Paper Jumbo Rolls Manufacturer | Zhixin Paper';
  }

  const getSubDesc = () => {
    if (lang === 'ru') {
      if (type === 'converters') return 'Мастер-рулоны (Jumbo) для перерабатывающих предприятий. Стабильное качество покрытия, отсутствие пыли и высокая прочность для скоростной резки на POS-рулоны.';
      if (type === 'thermal') return 'Прямые поставки jumbo-рулонов термобумаги различной плотности (48г/м2 - 70г/м2). Идеально подходит для производства чековой ленты и билетов.';
      return t.heroDesc;
    }
    if (type === 'converters') return 'Master rolls (Jumbo) for processing plants. Stable coating quality, dust-free, and high strength for high-speed slitting into POS rolls.';
    if (type === 'thermal') return 'Direct supplies of thermal paper jumbo rolls of various densities (48gsm - 70gsm). Ideal for manufacturing receipt rolls and tickets.';
    return t.heroDesc;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEO title={title} description={t.desc} lang={lang} canonical={canonical} hreflangs={hreflangs} />
      <Header />

      <main className="pt-20">
        <PageHero
          eyebrow={t.forWho}
          title={h1}
          description={getSubDesc()}
          primaryCta={{ label: 'WhatsApp', href: CONTACT.whatsappUrl }}
          secondaryCta={{ label: 'Telegram', href: CONTACT.telegramUrl }}
          image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
          overlay={pageAssets.hero.overlay}
          placeholderKey="thermal_jumbo_rolls"
        />

        {/* Breadcrumb */}
        <div className="w-full bg-gray-50 py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb lang={lang} />
          </div>
        </div>

        {/* Benefits & Specs Section */}
        <section className="py-24 px-4 bg-white" aria-labelledby="advantages-heading">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 id="advantages-heading" className="text-3xl font-bold mb-10 text-gray-900">{t.advantagesTitle}</h2>
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

        {/* Packaging & Shipping Gallery */}
        <section className="py-24 px-4 bg-white" aria-label={t.packagingTitle + ', ' + t.shippingTitle}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 px-8 pt-8 pb-4 flex items-center gap-3">
                  <Package className="text-blue-600" size={28} />
                  {t.packagingTitle}
                </h3>
                <p className="text-gray-600 px-8 pb-6">{t.packagingDesc}</p>
                <div className="grid grid-cols-2 gap-2 p-4 pt-0">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <ImagePlaceholder type="material" aspectRatio="4:3" size="md" description={t.packagingImg1} placeholderKey="thermal_jumbo_rolls_packaging_1" />
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <ImagePlaceholder type="material" aspectRatio="4:3" size="md" description={t.packagingImg2} placeholderKey="thermal_jumbo_rolls_packaging_2" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 px-8 pt-8 pb-4 flex items-center gap-3">
                  <Truck className="text-blue-600" size={28} />
                  {t.shippingTitle}
                </h3>
                <p className="text-gray-600 px-8 pb-6">{t.shippingDesc}</p>
                <div className="grid grid-cols-2 gap-2 p-4 pt-0">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <ImagePlaceholder type="factory" aspectRatio="4:3" size="md" description={t.shippingImg1} placeholderKey="thermal_jumbo_rolls_shipping_1" />
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <ImagePlaceholder type="factory" aspectRatio="4:3" size="md" description={t.shippingImg2} placeholderKey="thermal_jumbo_rolls_shipping_2" />
                  </div>
                </div>
              </motion.div>
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
                <h3 className="text-xl font-bold mb-4">{t.featureCoating}</h3>
                <p className="text-gray-600">{t.featureCoatingDesc}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">{t.featureDirect}</h3>
                <p className="text-gray-600">{t.featureDirectDesc}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">{t.featureCustom}</h3>
                <p className="text-gray-600">{t.featureCustomDesc}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-t-[4rem]" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold mb-8">{t.ctaTitle}</h2>
            <p className="text-xl text-blue-100 mb-12">{t.ctaSubtext}</p>
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
