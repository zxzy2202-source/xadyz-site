/**
 * ContactsPage 三语言内容数据
 */

import { CONTACT } from '@/app/lib/contactConfig';

export type Lang = 'en' | 'ru' | 'zh';

export interface ContactsContent {
  title: string;
  desc: string;
  keywords: string;
  h1: string;
  heroDesc: string;
  methodsTitle: string;
  waNote: string;
  tgNote: string;
  emailNote: string;
  phoneNote: string;
  ctaTitle: string;
  responseNote: string;
  tenderPackLabel: string;
}

export const content: Record<Lang, ContactsContent> = {
  zh: {
    title: '联系热敏纸生产商 | 志信纸业',
    desc: '直接联系中国热敏纸及标签生产商。WhatsApp、Telegram、邮件。服务全球客户。',
    keywords: '热敏纸厂家联系方式, 热敏纸批发, 热敏标签供应商, 志信纸业',
    h1: '直接联系生产商',
    heroDesc: '如果您正在寻找稳定的热敏纸、热敏标签或Jumbo大卷批发供应商——请直接联系我们。',
    methodsTitle: '联系方式',
    waNote: '（24小时内回复）',
    tgNote: '（方便长期沟通）',
    emailNote: '（正式询盘）',
    phoneNote: '（直接致电）',
    ctaTitle: '准备讨论您的订单？',
    responseNote: `通常在 ${CONTACT.responseTime} 小时内回复（周一至周五 北京时间）。`,
    tenderPackLabel: '索取投标资料包',
  },
  en: {
    title: 'Contact Thermal Paper Manufacturer | Zhixin Paper',
    desc: 'Contact the manufacturer of thermal paper and labels in China directly. WhatsApp, Telegram, Email. We work with clients worldwide.',
    keywords: 'thermal paper manufacturer contact, thermal paper wholesale, thermal labels supplier, Zhixin Paper',
    h1: 'Contact the Manufacturer Directly',
    heroDesc: 'If you are looking for a stable manufacturer of thermal paper, thermal labels, or jumbo rolls for wholesale supplies — contact us directly.',
    methodsTitle: 'Our Contacts',
    waNote: '(Response within 24 hours)',
    tgNote: '(Convenient for long-term communication)',
    emailNote: '(For formal inquiries)',
    phoneNote: '(Direct call)',
    ctaTitle: 'Ready to discuss your order?',
    responseNote: `We typically reply within ${CONTACT.responseTime}h (Mon–Fri GMT+8).`,
    tenderPackLabel: 'Request Tender Pack',
  },
  ru: {
    title: 'Контакты производителя термобумаги и этикеток | Zhixin Paper',
    desc: 'Свяжитесь напрямую с производителем термобумаги и термоэтикеток в Китае. WhatsApp, Telegram, Email. Работаем с клиентами по всему миру.',
    keywords: 'контакты производителя термобумаги, оптовая термобумага, поставщик термоэтикеток',
    h1: 'Связаться с производителем напрямую',
    heroDesc: 'Работаем с Россией и СНГ с 2009 года. Если вы ищете стабильного производителя термобумаги, термоэтикеток или jumbo рулонов для оптовых поставок — свяжитесь с нами напрямую.',
    methodsTitle: 'Наши контакты',
    waNote: '(Ответ в течение 24 часов)',
    tgNote: '(Удобно для долгосрочного общения)',
    emailNote: '(Для официальных запросов)',
    phoneNote: '(Прямой звонок)',
    ctaTitle: 'Готовы обсудить заказ?',
    responseNote: `Обычно отвечаем в течение ${CONTACT.responseTime} ч (пн–пт GMT+8).`,
    tenderPackLabel: 'Запросить тендерный пакет',
  },
};
