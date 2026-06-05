import React from 'react';
import { Link } from 'react-router';
import { FileText, Store, Package, MessageCircle, ArrowRight } from 'lucide-react';
import { CONTACT } from '@/app/lib/contactConfig';

export interface ContactCustomerTypesProps {
  lang: 'en' | 'ru' | 'zh';
}

const translations = {
  zh: {
    sectionTitle: '选择您的合作类型',
    sectionDesc: '根据您的需求选择相应入口，我们将为您提供更精准的服务',
    tender: {
      title: '招标 / 政府项目',
      desc: '政府招标、企业采购项目，需要资质证明、投标资料包',
      cta: '索取投标资料包',
      path: '/zh/request-tender-pack',
    },
    distributor: {
      title: '经销商 / 批发合作',
      desc: '长期批发热敏纸、标签、NCR 表单，稳定供货与价格',
      cta: 'WhatsApp 联系',
      note: '快速报价 · 支持大货',
    },
    oem: {
      title: 'OEM 定制',
      desc: '定制印刷、自有品牌、私人标签、专属包装设计',
      cta: '了解 OEM 服务',
      path: '/zh/manufacturing/oem-customization',
    },
    inquiry: {
      title: '产品询价 / 咨询',
      desc: '产品规格、样品、价格、交期等一般询盘',
      cta: '发起询盘',
      note: '邮件或即时通讯',
    },
  },
  en: {
    sectionTitle: 'Choose Your Partnership Type',
    sectionDesc: 'Select the right entry point for faster, more targeted support',
    tender: {
      title: 'Government / Tender Projects',
      desc: 'Bid documentation, certifications, and tender pack for procurement projects',
      cta: 'Request Tender Pack',
      path: '/en/request-tender-pack',
    },
    distributor: {
      title: 'Distributor / Wholesale',
      desc: 'Long-term wholesale of thermal paper, labels, NCR forms — stable supply and pricing',
      cta: 'Contact via WhatsApp',
      note: 'Quick quotes · Large orders supported',
    },
    oem: {
      title: 'OEM & Customization',
      desc: 'Custom printing, private label, bespoke packaging design',
      cta: 'Explore OEM Services',
      path: '/en/manufacturing/oem-customization',
    },
    inquiry: {
      title: 'Product Inquiry',
      desc: 'Specs, samples, pricing, lead times — general inquiries',
      cta: 'Send Inquiry',
      note: 'Email or instant messaging',
    },
  },
  ru: {
    sectionTitle: 'Выберите тип сотрудничества',
    sectionDesc: 'Выберите подходящий вариант для более быстрой и точной поддержки',
    tender: {
      title: 'Тендеры / Госпроекты',
      desc: 'Тендерная документация, сертификаты и пакет для госзакупок',
      cta: 'Запросить тендерный пакет',
      path: '/ru/request-tender-pack',
    },
    distributor: {
      title: 'Дистрибьютор / Опт',
      desc: 'Долгосрочные оптовые поставки термобумаги, этикеток, NCR — стабильные цены',
      cta: 'Связаться в WhatsApp',
      note: 'Быстрый расчёт · Крупные заказы',
    },
    oem: {
      title: 'OEM и кастомизация',
      desc: 'Печать под заказ, private label, упаковка под бренд',
      cta: 'Узнать об OEM',
      path: '/ru/manufacturing/oem-customization',
    },
    inquiry: {
      title: 'Запрос по продукту',
      desc: 'Характеристики, образцы, цены, сроки — общие запросы',
      cta: 'Отправить запрос',
      note: 'Email или мессенджер',
    },
  },
};

export function ContactCustomerTypes({ lang }: ContactCustomerTypesProps) {
  const t = translations[lang];

  const cards = [
    {
      id: 'tender',
      icon: <FileText size={26} />,
      title: t.tender.title,
      desc: t.tender.desc,
      cta: t.tender.cta,
      href: t.tender.path,
      type: 'link' as const,
      accent: 'blue',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      topBar: 'bg-blue-600',
      hoverBorder: 'hover:border-blue-400',
      ctaColor: 'text-blue-600 group-hover:text-blue-700',
    },
    {
      id: 'distributor',
      icon: <Store size={26} />,
      title: t.distributor.title,
      desc: t.distributor.desc,
      cta: t.distributor.cta,
      href: CONTACT.whatsappUrl,
      note: t.distributor.note,
      type: 'external' as const,
      accent: 'emerald',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      topBar: 'bg-emerald-500',
      hoverBorder: 'hover:border-emerald-400',
      ctaColor: 'text-emerald-600 group-hover:text-emerald-700',
    },
    {
      id: 'oem',
      icon: <Package size={26} />,
      title: t.oem.title,
      desc: t.oem.desc,
      cta: t.oem.cta,
      href: t.oem.path,
      type: 'link' as const,
      accent: 'amber',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      topBar: 'bg-amber-500',
      hoverBorder: 'hover:border-amber-400',
      ctaColor: 'text-amber-600 group-hover:text-amber-700',
    },
    {
      id: 'inquiry',
      icon: <MessageCircle size={26} />,
      title: t.inquiry.title,
      desc: t.inquiry.desc,
      cta: t.inquiry.cta,
      href: CONTACT.whatsappUrl,
      note: t.inquiry.note,
      type: 'external' as const,
      accent: 'violet',
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-600',
      topBar: 'bg-violet-500',
      hoverBorder: 'hover:border-violet-400',
      ctaColor: 'text-violet-600 group-hover:text-violet-700',
    },
  ];

  return (
    <section className="px-4 mb-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
          {t.sectionTitle}
        </h2>
        <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
          {t.sectionDesc}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card) => {
            const isExternal = card.type === 'external';
            const inner = (
              <>
                <div className={`h-1 w-full ${card.topBar} rounded-t-2xl -mx-6 -mt-6 mb-6`} style={{ marginLeft: '-1.5rem', marginRight: '-1.5rem', marginTop: '-1.5rem', width: 'calc(100% + 3rem)' }} />
                <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-4 ${card.iconColor}`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-gray-700 transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 flex-1 leading-relaxed">{card.desc}</p>
                <div className="flex items-center gap-1.5 mt-auto">
                  <span className={`inline-flex items-center gap-1 font-semibold text-sm ${card.ctaColor} transition-colors`}>
                    {card.cta}
                    <ArrowRight size={14} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                {card.note && (
                  <span className="text-xs text-gray-400 mt-1">{card.note}</span>
                )}
              </>
            );

            const baseClass = `group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 pt-0 overflow-hidden transition-all shadow-sm ${card.hoverBorder} hover:shadow-md`;

            if (isExternal) {
              return (
                <a key={card.id} href={card.href} target="_blank" rel="noopener noreferrer" className={baseClass}>
                  {inner}
                </a>
              );
            }
            return (
              <Link key={card.id} to={card.href} className={baseClass}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
