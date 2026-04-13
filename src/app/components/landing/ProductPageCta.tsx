import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export interface ProductPageCtaProps {
  lang: 'zh' | 'en' | 'ru';
  primaryLink?: string;
  secondaryLink?: string;
  headline?: string;
  subtext?: string;
  primaryButton?: string;
  secondaryButton?: string;
}

const translations = {
  zh: {
    headline: '需要报价或样品？',
    subtext: '联系销售团队，获取产品规格、报价或样品。24 小时内回复。',
    primaryButton: '索取报价',
    secondaryButton: '申请样品',
  },
  en: {
    headline: 'Need a Quote or Sample?',
    subtext: 'Contact our team for specs, pricing, or samples. We reply within 24 hours.',
    primaryButton: 'Request Quote',
    secondaryButton: 'Request Samples',
  },
  ru: {
    headline: 'Нужен расчёт или образец?',
    subtext: 'Свяжитесь с нами для спецификаций, цен или образцов. Ответ в течение 24 часов.',
    primaryButton: 'Запросить расчёт',
    secondaryButton: 'Запросить образцы',
  },
};

export function ProductPageCta({
  lang,
  primaryLink,
  secondaryLink,
  headline,
  subtext,
  primaryButton,
  secondaryButton,
}: ProductPageCtaProps) {
  const t = translations[lang];
  const primaryTo = primaryLink ?? `/${lang}/contact?intent=quote`;
  const secondaryTo = secondaryLink ?? `/${lang}/contact?intent=sample`;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-10 md:p-12 text-center text-white shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{headline ?? t.headline}</h2>
        <p className="text-lg md:text-xl mb-8 text-blue-100">{subtext ?? t.subtext}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to={primaryTo}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all shadow-xl"
          >
            {primaryButton ?? t.primaryButton}
            <ArrowRight size={20} />
          </Link>
          <Link
            to={secondaryTo}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/60 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
          >
            {secondaryButton ?? t.secondaryButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
