import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { supabasePublic } from '@/app/lib/supabasePublicClient';
import {
  PRODUCT_KEYS,
  PRODUCT_INTEREST_OPTIONS,
  getProductLabel,
  type LeadTypeKey,
  type ProductInterestKey,
} from '@/app/lib/leadConfig';
import { CONTACT } from '@/app/lib/contactConfig';
import { Send, CheckCircle, MessageCircle, Mail, Clock, Shield, Globe } from 'lucide-react';

export interface ContactInquiryFormProps {
  lang: 'en' | 'ru' | 'zh';
}

const translations = {
  zh: {
    title: '在线询盘',
    subtitle: '填写采购信息，我们将在 24 小时内回复',
    inquiryType: '询盘类型',
    companyName: '公司名称',
    companyNamePlaceholder: '您的公司名称',
    contactPerson: '联系人',
    contactPersonPlaceholder: '姓名',
    email: '电子邮箱',
    emailPlaceholder: 'email@company.com',
    phone: '电话',
    phonePlaceholder: '+86 138 0000 0000',
    country: '国家',
    countryPlaceholder: '选择国家',
    productsInterest: '感兴趣的产品',
    productsInterestHint: '可多选',
    estimatedQuantity: '预计采购量',
    estimatedQuantityPlaceholder: '例如：10,000 卷 / 月 或 1 个柜',
    customization: '定制需求',
    customizationPlaceholder: '请选择当前需求',
    message: '留言内容',
    messagePlaceholder: '产品规格、数量、交期等需求...',
    submitBtn: '提交询盘',
    submitting: '提交中...',
    successTitle: '提交成功',
    successMsg: '我们将在24小时内回复您的询盘。',
    errorMsg: '提交失败，请稍后重试或直接联系我们。',
  },
  en: {
    title: 'Online Inquiry',
    subtitle: 'Share your buying requirements and we\'ll reply within 24 hours',
    inquiryType: 'Inquiry Type',
    companyName: 'Company Name',
    companyNamePlaceholder: 'Your company',
    contactPerson: 'Contact Person',
    contactPersonPlaceholder: 'Full name',
    email: 'Email',
    emailPlaceholder: 'email@company.com',
    phone: 'Phone',
    phonePlaceholder: '+1 234 567 8900',
    country: 'Country',
    countryPlaceholder: 'Select country',
    productsInterest: 'Products of Interest',
    productsInterestHint: 'Select all that apply',
    estimatedQuantity: 'Estimated Quantity',
    estimatedQuantityPlaceholder: 'For example: 10,000 rolls / month or 1 container',
    customization: 'Customization Need',
    customizationPlaceholder: 'Select your current requirement',
    message: 'Message',
    messagePlaceholder: 'Specs, quantity, lead time, or other requirements...',
    submitBtn: 'Submit Inquiry',
    submitting: 'Sending...',
    successTitle: 'Submitted Successfully',
    successMsg: 'We will reply within 24 hours.',
    errorMsg: 'Submission failed. Please try again or contact us directly.',
  },
  ru: {
    title: 'Онлайн-запрос',
    subtitle: 'Опишите закупочную задачу, и мы ответим в течение 24 часов',
    inquiryType: 'Тип запроса',
    companyName: 'Компания',
    companyNamePlaceholder: 'Название компании',
    contactPerson: 'Контактное лицо',
    contactPersonPlaceholder: 'Имя',
    email: 'Email',
    emailPlaceholder: 'email@company.com',
    phone: 'Телефон',
    phonePlaceholder: '+7 900 123 45 67',
    country: 'Страна',
    countryPlaceholder: 'Выберите страну',
    productsInterest: 'Интересующие продукты',
    productsInterestHint: 'Выберите все подходящие',
    estimatedQuantity: 'Планируемый объём',
    estimatedQuantityPlaceholder: 'Например: 10 000 рулонов / месяц или 1 контейнер',
    customization: 'Потребность в кастомизации',
    customizationPlaceholder: 'Выберите подходящий вариант',
    message: 'Сообщение',
    messagePlaceholder: 'Характеристики, количество, сроки...',
    submitBtn: 'Отправить запрос',
    submitting: 'Отправка...',
    successTitle: 'Отправлено',
    successMsg: 'Мы ответим в течение 24 часов.',
    errorMsg: 'Ошибка отправки. Попробуйте снова или свяжитесь напрямую.',
  },
};

const VALID_PRODUCT_KEYS = new Set(PRODUCT_KEYS);
const VALID_INTENTS = new Set(['quote', 'sample', 'tender', 'contact']);

type InquiryIntent = 'quote' | 'sample' | 'tender' | 'contact';

const intentLabels: Record<
  InquiryIntent,
  { zh: string; en: string; ru: string }
> = {
  quote: { zh: '获取报价', en: 'Request Quote', ru: 'Запросить расчёт' },
  sample: { zh: '申请样品', en: 'Request Samples', ru: 'Запросить образцы' },
  tender: { zh: '项目 / 投标支持', en: 'Tender / Project Support', ru: 'Тендер / проектная поддержка' },
  contact: { zh: '一般咨询', en: 'General Contact', ru: 'Общий запрос' },
};

const customizationLabels = {
  none: { zh: '暂不需要定制', en: 'No customization yet', ru: 'Пока без кастомизации' },
  oem_printing: { zh: '需要 OEM 印刷', en: 'Need OEM printing', ru: 'Нужна OEM-печать' },
  custom_size: { zh: '需要定制尺寸', en: 'Need custom sizes', ru: 'Нужны нестандартные размеры' },
  private_label: { zh: '需要私标包装', en: 'Need private-label packaging', ru: 'Нужна упаковка private label' },
};

const formModeCopy = {
  quote: {
    zh: {
      title: '索取报价与供货方案',
      subtitle: '填写规格、采购量级、交付国家和时间要求，我们会准备更准确的工厂报价。',
      checklist: ['产品与目标规格', '月度或项目采购量', '交付市场与时间要求'],
      submitLabel: '索取报价',
      messagePlaceholder: '请补充尺寸、克重、包装方式、交期或贸易条款要求...',
      successTitle: '报价请求已提交',
      successMsg: '我们会根据您的采购信息尽快回复报价和交付建议。',
    },
    en: {
      title: 'Request Pricing & Supply Terms',
      subtitle: 'Share specs, order volume, destination, and timing so we can prepare a more accurate factory quote.',
      checklist: ['Product and target specification', 'Monthly or project quantity', 'Delivery market and target timing'],
      submitLabel: 'Request Quote',
      messagePlaceholder: 'Add size, grammage, packing format, lead time, or Incoterm requirements...',
      successTitle: 'Quote Request Submitted',
      successMsg: 'We will review your buying requirements and reply with pricing and delivery guidance shortly.',
    },
    ru: {
      title: 'Запросить расчёт и условия поставки',
      subtitle: 'Укажите характеристики, объём, страну поставки и сроки, чтобы мы подготовили точный заводской расчёт.',
      checklist: ['Продукт и нужная спецификация', 'Месячный или проектный объём', 'Рынок поставки и сроки'],
      submitLabel: 'Запросить расчёт',
      messagePlaceholder: 'Укажите размер, плотность, формат упаковки, сроки или требования по Incoterm...',
      successTitle: 'Запрос на расчёт отправлен',
      successMsg: 'Мы изучим вашу закупочную задачу и скоро вернёмся с расчётом и рекомендацией по поставке.',
    },
  },
  sample: {
    zh: {
      title: '申请样品测试',
      subtitle: '告诉我们要测试的材料或规格，我们会按样品流程准备建议。',
      checklist: ['需要测试的产品', '尺寸、胶水或印刷要求', '收件国家与联系人'],
      submitLabel: '申请样品',
      messagePlaceholder: '请说明样品用途、测试标准、期望数量或快递要求...',
      successTitle: '样品申请已提交',
      successMsg: '我们会确认样品方案并尽快与您安排寄送。',
    },
    en: {
      title: 'Request Samples for Evaluation',
      subtitle: 'Tell us which material or format you want to test and we will prepare the right sample workflow.',
      checklist: ['Product to sample', 'Size, adhesive, or print requirement', 'Shipping country and receiver details'],
      submitLabel: 'Request Samples',
      messagePlaceholder: 'Explain the sample purpose, testing standard, quantity needed, or courier preference...',
      successTitle: 'Sample Request Submitted',
      successMsg: 'We will confirm the sample setup and coordinate shipment with you shortly.',
    },
    ru: {
      title: 'Запросить образцы для тестирования',
      subtitle: 'Сообщите, какой материал или формат нужно проверить, и мы подготовим правильный сценарий отправки образцов.',
      checklist: ['Какой продукт нужен на тест', 'Размер, клей или печатные требования', 'Страна доставки и получатель'],
      submitLabel: 'Запросить образцы',
      messagePlaceholder: 'Опишите цель теста, стандарт проверки, нужное количество образцов или пожелания по доставке...',
      successTitle: 'Запрос на образцы отправлен',
      successMsg: 'Мы подтвердим состав образцов и скоро свяжемся по отправке.',
    },
  },
  tender: {
    zh: {
      title: '提交项目 / 投标需求',
      subtitle: '用于资质文件、产能说明、合规证明和投标支持的初步沟通。',
      checklist: ['项目阶段与截止时间', '所需证书或投标资料', '产品范围与项目量级'],
      submitLabel: '申请投标支持',
      messagePlaceholder: '请说明项目背景、资质清单、年需求量和投标截止时间...',
      successTitle: '投标支持请求已提交',
      successMsg: '我们会核对资料需求，并尽快回复适用的资质与支持方案。',
    },
    en: {
      title: 'Share Tender or Project Requirements',
      subtitle: 'Use this workflow for compliance documents, capacity proof, and supplier support before bidding or approval.',
      checklist: ['Tender stage and deadline', 'Certificates or documents requested', 'Products and annual/project volume'],
      submitLabel: 'Request Tender Support',
      messagePlaceholder: 'Describe the project scope, compliance list, expected volume, and submission deadline...',
      successTitle: 'Tender Support Request Submitted',
      successMsg: 'We will review the document requirements and reply with the relevant support package shortly.',
    },
    ru: {
      title: 'Передать требования по тендеру или проекту',
      subtitle: 'Используйте эту форму для запроса сертификатов, подтверждения мощностей и поддержки поставщика до подачи заявки.',
      checklist: ['Стадия тендера и дедлайн', 'Какие документы требуются', 'Продукты и объём проекта'],
      submitLabel: 'Запросить тендерную поддержку',
      messagePlaceholder: 'Опишите проект, список нужных документов, объём и крайний срок подачи...',
      successTitle: 'Запрос на тендерную поддержку отправлен',
      successMsg: 'Мы проверим требования к документам и скоро вернёмся с подходящим пакетом поддержки.',
    },
  },
  contact: {
    zh: {
      title: '在线询盘',
      subtitle: '填写采购信息，我们将在 24 小时内回复。',
      checklist: ['感兴趣的产品', '预计采购量与国家', '是否需要定制'],
      submitLabel: '提交询盘',
      messagePlaceholder: '产品规格、数量、交期等需求...',
      successTitle: '提交成功',
      successMsg: '我们将在24小时内回复您的询盘。',
    },
    en: {
      title: 'Online Inquiry',
      subtitle: 'Share your buying requirements and we\'ll reply within 24 hours.',
      checklist: ['Product interest', 'Expected volume and country', 'Whether customization is needed'],
      submitLabel: 'Submit Inquiry',
      messagePlaceholder: 'Specs, quantity, lead time, or other requirements...',
      successTitle: 'Submitted Successfully',
      successMsg: 'We will reply within 24 hours.',
    },
    ru: {
      title: 'Онлайн-запрос',
      subtitle: 'Опишите закупочную задачу, и мы ответим в течение 24 часов.',
      checklist: ['Интересующий продукт', 'Планируемый объём и страна', 'Нужна ли кастомизация'],
      submitLabel: 'Отправить запрос',
      messagePlaceholder: 'Характеристики, количество, сроки...',
      successTitle: 'Отправлено',
      successMsg: 'Мы ответим в течение 24 часов.',
    },
  },
} as const;

export function ContactInquiryForm({ lang }: ContactInquiryFormProps) {
  const t = translations[lang];
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    inquiryType: 'contact' as InquiryIntent,
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    productsInterest: [] as string[],
    estimatedQuantity: '',
    customization: 'none',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedIntent, setSubmittedIntent] = useState<InquiryIntent>('contact');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const intent = searchParams.get('intent');
    const inquiry = searchParams.get('inquiry');
    const products = searchParams.get('products');
    const keys: string[] = [];
    const nextIntent =
      intent && VALID_INTENTS.has(intent) ? (intent as InquiryIntent) : null;
    if (inquiry && VALID_PRODUCT_KEYS.has(inquiry as ProductInterestKey)) {
      keys.push(inquiry);
    }
    if (products) {
      products.split(',').forEach((k) => {
        const key = k.trim();
        if (key && VALID_PRODUCT_KEYS.has(key as ProductInterestKey)) keys.push(key);
      });
    }
    setFormData((prev) => ({
      ...prev,
      inquiryType: nextIntent ?? prev.inquiryType,
      productsInterest: keys.length > 0 ? [...new Set(keys)] : prev.productsInterest,
    }));
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const toggleProduct = (key: string) => {
    setFormData((prev) => ({
      ...prev,
      productsInterest: prev.productsInterest.includes(key)
        ? prev.productsInterest.filter((k) => k !== key)
        : [...prev.productsInterest, key],
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      setSubmittedIntent(formData.inquiryType);
      const productsInterested =
        formData.productsInterest.length > 0 ? formData.productsInterest : null;
      const productInterest = productsInterested
        ? productsInterested.map((k) => getProductLabel(k, lang)).join(', ')
        : null;
      const leadType: LeadTypeKey =
        formData.inquiryType === 'tender'
          ? 'tender'
          : formData.inquiryType === 'contact'
            ? 'contact'
            : 'inquiry';
      const inquirySummary = [
        `${t.inquiryType}: ${intentLabels[formData.inquiryType][lang]}`,
        `${t.estimatedQuantity}: ${formData.estimatedQuantity.trim() || 'N/A'}`,
        `${t.customization}: ${customizationLabels[formData.customization as keyof typeof customizationLabels][lang]}`,
        formData.message.trim(),
      ]
        .filter(Boolean)
        .join('\n');

      const { error: err } = await supabasePublic.from('leads').insert({
        company_name: formData.companyName.trim(),
        contact_name: formData.contactPerson.trim() || null,
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        country: formData.country.trim(),
        notes: inquirySummary || null,
        lead_type: leadType,
        source: formData.inquiryType === 'tender' ? 'tender_form' : 'contact_form',
        page_url:
          typeof window !== 'undefined' ? window.location.href : null,
        status: 'new',
        products_interested: productsInterested,
        product_interest: productInterest,
      });

      if (err) throw err;
      setSubmitted(true);
      setFormData({
        inquiryType: 'contact',
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: '',
        productsInterest: [],
        estimatedQuantity: '',
        customization: 'none',
        message: '',
      });
    } catch (err: unknown) {
      setError(t.errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickContactItems = {
    zh: [
      { icon: <MessageCircle size={20} className="text-green-500" />, label: 'WhatsApp', sub: '24h 内快速回复', href: CONTACT.whatsappUrl },
      { icon: <MessageCircle size={20} className="text-sky-500" />, label: 'Telegram', sub: '长期沟通首选', href: CONTACT.telegramUrl },
      { icon: <Mail size={20} className="text-gray-500" />, label: CONTACT.email, sub: '正式询盘', href: `mailto:${CONTACT.email}` },
    ],
    en: [
      { icon: <MessageCircle size={20} className="text-green-500" />, label: 'WhatsApp', sub: 'Quick reply within 24h', href: CONTACT.whatsappUrl },
      { icon: <MessageCircle size={20} className="text-sky-500" />, label: 'Telegram', sub: 'For long-term communication', href: CONTACT.telegramUrl },
      { icon: <Mail size={20} className="text-gray-500" />, label: CONTACT.email, sub: 'Formal inquiries', href: `mailto:${CONTACT.email}` },
    ],
    ru: [
      { icon: <MessageCircle size={20} className="text-green-500" />, label: 'WhatsApp', sub: 'Ответ в течение 24ч', href: CONTACT.whatsappUrl },
      { icon: <MessageCircle size={20} className="text-sky-500" />, label: 'Telegram', sub: 'Для долгосрочного общения', href: CONTACT.telegramUrl },
      { icon: <Mail size={20} className="text-gray-500" />, label: CONTACT.email, sub: 'Официальные запросы', href: `mailto:${CONTACT.email}` },
    ],
  };

  const trustItems = {
    zh: [
      { icon: <Clock size={16} />, text: '24小时内回复' },
      { icon: <Shield size={16} />, text: 'ISO 9001 认证' },
      { icon: <Globe size={16} />, text: '已服务50+国家' },
    ],
    en: [
      { icon: <Clock size={16} />, text: 'Reply within 24h' },
      { icon: <Shield size={16} />, text: 'ISO 9001 certified' },
      { icon: <Globe size={16} />, text: '50+ countries served' },
    ],
    ru: [
      { icon: <Clock size={16} />, text: 'Ответ в течение 24ч' },
      { icon: <Shield size={16} />, text: 'Сертификат ISO 9001' },
      { icon: <Globe size={16} />, text: 'Поставки в 50+ стран' },
    ],
  };

  const quickContacts = quickContactItems[lang];
  const trusts = trustItems[lang];
  const modeCopy = formModeCopy[formData.inquiryType][lang];
  const submittedCopy = formModeCopy[submittedIntent][lang];

  if (submitted) {
    return (
      <section className="px-4 mb-16">
        <div className="max-w-2xl mx-auto bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
          <CheckCircle size={48} className="text-emerald-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">{submittedCopy.successTitle}</h3>
          <p className="text-gray-600">{submittedCopy.successMsg}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 mb-16">
      <div className="max-w-6xl mx-auto">
        <h2 id="contact-inquiry-form" className="text-2xl font-bold text-gray-900 mb-2 text-center">{modeCopy.title}</h2>
        <p className="text-gray-500 text-center mb-6">{modeCopy.subtitle}</p>

        <div className="max-w-4xl mx-auto mb-10 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
          <div className="grid gap-3 md:grid-cols-3">
            {modeCopy.checklist.map((item) => (
              <div key={item} className="rounded-xl bg-white/80 px-4 py-3 text-sm font-medium text-blue-900 border border-blue-100">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form — 3 columns */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.inquiryType} *
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  {(Object.keys(intentLabels) as InquiryIntent[]).map((key) => (
                    <option key={key} value={key}>
                      {intentLabels[key][lang]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.companyName} *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder={t.companyNamePlaceholder}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.contactPerson} *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  placeholder={t.contactPersonPlaceholder}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.email} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.emailPlaceholder}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.country} *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  placeholder={t.countryPlaceholder}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.estimatedQuantity}
                </label>
                <input
                  type="text"
                  name="estimatedQuantity"
                  value={formData.estimatedQuantity}
                  onChange={handleChange}
                  placeholder={t.estimatedQuantityPlaceholder}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.customization}
                </label>
                <select
                  name="customization"
                  value={formData.customization}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="none">{customizationLabels.none[lang]}</option>
                  <option value="oem_printing">{customizationLabels.oem_printing[lang]}</option>
                  <option value="custom_size">{customizationLabels.custom_size[lang]}</option>
                  <option value="private_label">{customizationLabels.private_label[lang]}</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t.productsInterest}
                <span className="text-xs font-normal text-gray-400 ml-2">{t.productsInterestHint}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_KEYS.map((key) => (
                  <label
                    key={key}
                    className={`flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-full border text-sm transition-colors ${
                      formData.productsInterest.includes(key)
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.productsInterest.includes(key)}
                      onChange={() => toggleProduct(key)}
                      className="sr-only"
                    />
                    {PRODUCT_INTEREST_OPTIONS[key][lang]}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder={modeCopy.messagePlaceholder}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              />
            </div>

            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Send size={18} />
              {isSubmitting ? t.submitting : modeCopy.submitLabel}
            </button>
          </form>

          {/* Right panel — 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Quick contact */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                {lang === 'zh' ? '快捷联系' : lang === 'ru' ? 'Связаться быстро' : 'Contact Directly'}
              </p>
              <div className="flex flex-col gap-3">
                {quickContacts.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.sub}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
              <div className="flex flex-col gap-3">
                {trusts.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-blue-800">
                    <span className="text-blue-500 flex-shrink-0">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
