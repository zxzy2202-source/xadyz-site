import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export interface ProductPageCtaProps {
  lang: 'zh' | 'en' | 'ru';
  /** 可选：带语言前缀的链接，默认 `/${lang}/contact` */
  link?: string;
}

const translations = {
  zh: {
    headline: '需要报价或样品？',
    subtext: '联系销售团队，获取产品规格、报价或样品。24 小时内回复。',
    button: '索取报价',
  },
  en: {
    headline: 'Need a Quote or Sample?',
    subtext: 'Contact our team for specs, pricing, or samples. We reply within 24 hours.',
    button: 'Request Quote',
  },
  ru: {
    headline: 'Нужен расчёт или образец?',
    subtext: 'Свяжитесь с нами для спецификаций, цен или образцов. Ответ в течение 24 часов.',
    button: 'Запросить расчёт',
  },
};

export function ProductPageCta({ lang, link }: ProductPageCtaProps) {
  const t = translations[lang];
  const to = link ?? `/${lang}/contact`;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-10 md:p-12 text-center text-white shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.headline}</h2>
        <p className="text-lg md:text-xl mb-8 text-blue-100">{t.subtext}</p>
        <Link
          to={to}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all shadow-xl"
        >
          {t.button}
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
