import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { supabasePublic } from '@/app/lib/supabasePublicClient';
import {
  PRODUCT_KEYS,
  PRODUCT_INTEREST_OPTIONS,
  getProductLabel,
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
    subtitle: '填写表单，我们将在24小时内回复',
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
    subtitle: 'Fill out the form and we\'ll reply within 24 hours',
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
    subtitle: 'Заполните форму, мы ответим в течение 24 часов',
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

export function ContactInquiryForm({ lang }: ContactInquiryFormProps) {
  const t = translations[lang];
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    productsInterest: [] as string[],
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const inquiry = searchParams.get('inquiry');
    const products = searchParams.get('products');
    const keys: string[] = [];
    if (inquiry && VALID_PRODUCT_KEYS.has(inquiry as ProductInterestKey)) {
      keys.push(inquiry);
    }
    if (products) {
      products.split(',').forEach((k) => {
        const key = k.trim();
        if (key && VALID_PRODUCT_KEYS.has(key as ProductInterestKey)) keys.push(key);
      });
    }
    if (keys.length > 0) {
      setFormData((prev) => ({ ...prev, productsInterest: [...new Set(keys)] }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const productsInterested =
        formData.productsInterest.length > 0 ? formData.productsInterest : null;
      // 使用当前语言生成产品兴趣标签，避免所有线索都记录为中文
      const productInterest = productsInterested
        ? productsInterested.map((k) => getProductLabel(k, lang)).join(', ')
        : null;

      const { error: err } = await supabasePublic.from('leads').insert({
        company_name: formData.companyName.trim(),
        contact_name: formData.contactPerson.trim() || null,
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        country: formData.country.trim(),
        notes: formData.message.trim() || null,
        lead_type: 'inquiry',
        source: 'contact_form',
        page_url:
          typeof window !== 'undefined' ? window.location.href : null,
        status: 'new',
        products_interested: productsInterested,
        product_interest: productInterest,
      });

      if (err) throw err;
      setSubmitted(true);
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: '',
        productsInterest: [],
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

  if (submitted) {
    return (
      <section className="px-4 mb-16">
        <div className="max-w-2xl mx-auto bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
          <CheckCircle size={48} className="text-emerald-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t.successTitle}</h3>
          <p className="text-gray-600">{t.successMsg}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 mb-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{t.title}</h2>
        <p className="text-gray-500 text-center mb-10">{t.subtitle}</p>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form — 3 columns */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
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
                placeholder={t.messagePlaceholder}
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
              {isSubmitting ? t.submitting : t.submitBtn}
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
