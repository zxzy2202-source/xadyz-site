import React from 'react';
import { useLocation } from 'react-router';
import { Globe, Factory, TrendingUp, Award, Users, Send, Mail, Package, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { Header } from '@/app/components/Header';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { CONTACT } from '@/app/lib/contactConfig';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { content } from './AboutPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.factoryLine, alt: "Zhixin Paper thermal paper production facility" },
  hero: {
    src: PLACEHOLDERS.hero.factoryLine,
    alt: "Thermal paper production line in Zhixin Paper factory",
    overlay: "dark",
    focal: "center",
  },
  gallery: [
    { src: PLACEHOLDERS.gallery.g1, alt: "Zhixin Paper factory overview" },
    { src: PLACEHOLDERS.gallery.g2, alt: "Production and warehouse facility" },
    { src: PLACEHOLDERS.gallery.g3, alt: "Thermal paper manufacturing" },
  ],
  cards: {},
  proofs: [
    { src: PLACEHOLDERS.proof.teamPhoto, alt: "Zhixin Paper team photo", tag: "team" },
    { src: PLACEHOLDERS.proof.certificatesWall, alt: "Quality certifications wall", tag: "cert" },
  ],
};

export const AboutPage = () => {
  const location = useLocation();
  const lang = location.pathname.startsWith('/ru') ? 'ru' : location.pathname.startsWith('/zh') ? 'zh' : 'en';

  const t = content[lang];

  return (
    <>
      <SEO
        title={t.title}
        description={t.description}
        lang={lang}
        canonical={`/${lang}/about`}
        hreflangs={{
          en: '/en/about',
          ru: '/ru/about',
          zh: '/zh/about'
        }}
      />
      <Header />

      <main className="min-h-screen bg-white">
        <PageHero
          title={t.heroTitle}
          description={t.heroSubtitle ? `${t.heroSubtitle} ${t.heroDescription}` : t.heroDescription}
          image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
          overlay={pageAssets.hero.overlay}
          align="center"
          placeholderKey="about_hero"
        />

        {/* Breadcrumb */}
        <div className="w-full bg-gray-50 py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb lang={lang} />
          </div>
        </div>

        {/* Company Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-black text-gray-900 mb-12 text-center italic">
              {t.overviewTitle}
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center p-6 bg-blue-50 rounded-2xl"
              >
                <div className="text-4xl font-black text-blue-600 mb-2">2009</div>
                <div className="font-bold text-gray-900 mb-2 italic">{t.overviewYear}</div>
                <div className="text-sm text-gray-600 italic">{t.overviewYearDesc}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center p-6 bg-green-50 rounded-2xl"
              >
                <Factory className="mx-auto mb-2 text-green-600" size={40} />
                <div className="font-bold text-gray-900 mb-2 italic">{t.overviewFactory}</div>
                <div className="text-sm text-gray-600 italic">{t.overviewFactoryDesc}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center p-6 bg-purple-50 rounded-2xl"
              >
                <Globe className="mx-auto mb-2 text-purple-600" size={40} />
                <div className="font-bold text-gray-900 mb-2 italic">{t.overviewExport}</div>
                <div className="text-sm text-gray-600 italic">{t.overviewExportDesc}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center p-6 bg-orange-50 rounded-2xl"
              >
                <TrendingUp className="mx-auto mb-2 text-orange-600" size={40} />
                <div className="font-bold text-gray-900 mb-2 italic">{t.overviewCapacity}</div>
                <div className="text-sm text-gray-600 italic">{t.overviewCapacityDesc}</div>
              </motion.div>
            </div>

            {/* Company Story */}
            <div className="prose prose-lg max-w-4xl mx-auto">
              <p className="text-gray-700 leading-relaxed mb-6 italic text-lg">{t.overviewText1}</p>
              <p className="text-gray-700 leading-relaxed mb-6 italic text-lg">{t.overviewText2}</p>
              <p className="text-gray-700 leading-relaxed italic text-lg">{t.overviewText3}</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-black text-gray-900 mb-16 text-center italic">
              {t.whyTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Factory className="text-blue-600 mb-4" size={40} />, title: t.reason1Title, desc: t.reason1Desc },
                { icon: <Globe className="text-green-600 mb-4" size={40} />, title: t.reason2Title, desc: t.reason2Desc, delay: 0.1 },
                { icon: <Award className="text-purple-600 mb-4" size={40} />, title: t.reason3Title, desc: t.reason3Desc, delay: 0.2 },
                { icon: <Users className="text-orange-600 mb-4" size={40} />, title: t.reason4Title, desc: t.reason4Desc, delay: 0.3 },
                { icon: <Send className="text-blue-400 mb-4" size={40} />, title: t.reason5Title, desc: t.reason5Desc, delay: 0.4 },
                { icon: <Package className="text-red-600 mb-4" size={40} />, title: t.reason6Title, desc: t.reason6Desc, delay: 0.5 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (item as { delay?: number }).delay ?? 0 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  {item.icon}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 italic">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed italic">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Production Lines */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 text-center italic">
              {t.productionLinesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.productionLines?.map((line, idx) => (
                <motion.div
                  key={line.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3 italic">{line.title}</h3>
                  <p className="text-gray-600 leading-relaxed italic">{line.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Factory Showcase */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-gray-900 mb-4 italic">{t.factoryTitle}</h2>
              <p className="text-xl text-gray-600 italic">{t.factorySubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { key: 'gate', placeholderKey: 'about_factory_gate', title: t.factory1Title, desc: t.factory1Desc },
                { key: 'slitting', placeholderKey: 'about_factory_slitting', title: t.factory2Title, desc: t.factory2Desc, delay: 0.1 },
                { key: 'printing', placeholderKey: 'about_factory_printing', title: t.factory3Title, desc: t.factory3Desc, delay: 0.2 },
                { key: 'ncr', placeholderKey: 'about_factory_ncr', title: t.factory4Title, desc: t.factory4Desc, delay: 0.3 },
              ].map((item) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (item as { delay?: number }).delay ?? 0 }}
                  className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImagePlaceholder
                      type="factory"
                      aspectRatio="4:3"
                      placeholderKey={item.placeholderKey}
                      className="w-full h-full hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 italic">{item.title}</h3>
                    <p className="text-gray-600 italic">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-white mb-6 italic">{t.ctaTitle}</h2>
              <p className="text-xl text-blue-100 mb-10 italic">{t.ctaDesc}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Phone size={24} />
                  {t.ctaWhatsApp}
                </a>

                <a
                  href={CONTACT.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-blue-400 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Send size={24} />
                  {t.ctaTelegram}
                </a>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Mail size={24} />
                  {t.ctaEmail}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};
