import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { CONTACT } from '@/app/lib/contactConfig';
import { PageShell } from '@/app/components/PageShell';
import { ContactMethods, ContactCtaSection, ContactCustomerTypes, ContactInquiryForm } from '@/app/components/contact';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { content } from './ContactsPage.content';
import { Factory, Globe, Award, Clock } from 'lucide-react';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.warehouse, alt: 'Zhixin Paper warehouse and contact' },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: 'Zhixin Paper warehouse facility',
    overlay: 'light',
    focal: 'center',
  },
  gallery: [
    { src: PLACEHOLDERS.gallery.g1, alt: 'Zhixin Paper facility overview' },
    { src: PLACEHOLDERS.gallery.g2, alt: 'Thermal paper products' },
  ],
  cards: {},
  proofs: [],
};

export const ContactsPage = ({ lang }: { lang: 'en' | 'ru' | 'zh' }) => {
  const t = content[lang];

  const heroContent = (
    <div className="-mt-32 pt-32">
      <PageHero
        title={t.h1}
        description={t.heroDesc}
        image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
        overlay={pageAssets.hero.overlay}
        placeholderKey="contact_hero"
      />
    </div>
  );

  const contactPointJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Zhixin Paper',
      url: 'https://xadyz.com',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: CONTACT.phone,
        email: CONTACT.email,
        contactType: 'customer service',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Russian', 'Chinese'],
        hoursAvailable: CONTACT.workingHours,
      },
    },
  };

  return (
    <>
      <SEO
        title={t.title}
        description={t.desc}
        keywords={t.keywords}
        lang={lang}
        canonical={lang === 'zh' ? '/zh/contact' : lang === 'ru' ? '/ru/contact' : '/en/contact'}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(contactPointJsonLd)}</script>
      </Helmet>
      <PageShell lang={lang} hero={heroContent}>

        {/* Trust Bar */}
        <section className="px-4 mb-14">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Factory size={22} className="text-blue-600" />, value: '15+', label: lang === 'zh' ? '年生产经验' : lang === 'ru' ? 'лет опыта' : 'Years in Manufacturing' },
                { icon: <Globe size={22} className="text-emerald-600" />, value: '50+', label: lang === 'zh' ? '出口国家' : lang === 'ru' ? 'стран экспорта' : 'Export Countries' },
                { icon: <Award size={22} className="text-amber-600" />, value: 'ISO', label: lang === 'zh' ? '9001 认证工厂' : lang === 'ru' ? '9001 Сертификат' : '9001 Certified Factory' },
                { icon: <Clock size={22} className="text-violet-600" />, value: '24h', label: lang === 'zh' ? '内快速回复' : lang === 'ru' ? 'ответ на запрос' : 'Response Guarantee' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900 leading-none">{item.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5 leading-snug">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactCustomerTypes lang={lang} />
        <ContactInquiryForm lang={lang} />
        <ContactMethods
          methodsTitle={t.methodsTitle}
          waNote={t.waNote}
          tgNote={t.tgNote}
          emailNote={t.emailNote}
          phoneNote={t.phoneNote}
        />
        <section className="px-4 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 text-sm">
              <strong>{CONTACT.workingHours}</strong> · {CONTACT.timezone}
            </p>
          </div>
        </section>
        <ContactCtaSection
          ctaTitle={t.ctaTitle}
          responseNote={t.responseNote}
          tenderPackLabel={t.tenderPackLabel}
          tenderPackPath={`/${lang}/request-tender-pack`}
        />
      </PageShell>
    </>
  );
};
