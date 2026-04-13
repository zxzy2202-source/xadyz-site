import React from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '@/app/components/Header';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';
import {
  FileText, Download, CheckCircle, Mail, Send,
  Award, BarChart2, Layers, ClipboardList, DollarSign, Building2,
  Clock, Shield, Globe, MessageCircle,
  CheckCircle2, Package, ArrowRight,
} from 'lucide-react';
import { CONTACT } from '@/app/lib/contactConfig';
import { supabasePublic } from '@/app/lib/supabasePublicClient';
import { PRODUCT_KEYS, PRODUCT_INTEREST_OPTIONS, getProductLabel } from '@/app/lib/leadConfig';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { content } from './RequestTenderPackPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.proof.certificatesWall, alt: 'Tender pack documentation' },
  hero: {
    src: PLACEHOLDERS.proof.certificatesWall,
    alt: 'Certificate wall and quality documentation',
    overlay: 'dark',
    focal: 'center',
  },
  gallery: [
    { src: PLACEHOLDERS.proof.certificatesWall, alt: 'Certificate wall' },
    { src: PLACEHOLDERS.proof.qualityInspection, alt: 'Quality control evidence' },
    { src: PLACEHOLDERS.proof.containerLoading, alt: 'Container loading for delivery' },
  ],
  cards: {},
  proofs: [
    { src: PLACEHOLDERS.proof.certificatesWall, alt: 'Quality certifications', tag: 'cert' },
    { src: PLACEHOLDERS.proof.qualityInspection, alt: 'Quality inspection', tag: 'quality' },
    { src: PLACEHOLDERS.proof.containerLoading, alt: 'Container loading', tag: 'shipping' },
  ],
};

// Icons for the 6 "What's Included" items
const ITEM_ICONS = [
  <Award size={22} />,
  <ClipboardList size={22} />,
  <BarChart2 size={22} />,
  <Layers size={22} />,
  <DollarSign size={22} />,
  <Building2 size={22} />,
];

const ITEM_COLORS = [
  { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  { bg: 'bg-violet-50', icon: 'text-violet-600', border: 'border-violet-100' },
  { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-100' },
  { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100' },
  { bg: 'bg-rose-50', icon: 'text-rose-600', border: 'border-rose-100' },
  { bg: 'bg-sky-50', icon: 'text-sky-600', border: 'border-sky-100' },
];

interface RequestTenderPackPageProps {
  lang: 'en' | 'ru' | 'zh';
}

export const RequestTenderPackPage: React.FC<RequestTenderPackPageProps> = ({ lang }) => {
  const t = content[lang];
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = React.useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    projectType: '',
    productsInterest: [] as string[],
    additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const inquiry = searchParams.get('inquiry');
    const products = searchParams.get('products');
    const keys: string[] = [];
    if (inquiry && PRODUCT_KEYS.includes(inquiry as typeof PRODUCT_KEYS[number])) {
      keys.push(inquiry);
    }
    if (products) {
      products.split(',').forEach((k) => {
        const key = k.trim();
        if (PRODUCT_KEYS.includes(key as typeof PRODUCT_KEYS[number])) {
          keys.push(key);
        }
      });
    }
    if (keys.length > 0) {
      setFormData((prev) => ({ ...prev, productsInterest: [...new Set(keys)] }));
    }
  }, [searchParams]);

  const toggleProduct = (key: string) => {
    setFormData((prev) => ({
      ...prev,
      productsInterest: prev.productsInterest.includes(key)
        ? prev.productsInterest.filter((k) => k !== key)
        : [...prev.productsInterest, key],
    }));
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const notes = [
        `${t.projectType}: ${formData.projectType}`,
        formData.additionalInfo.trim(),
      ]
        .filter(Boolean)
        .join('\n\n');
      const productsInterested = formData.productsInterest.length > 0 ? formData.productsInterest : null;
      const productInterest = productsInterested
        ? productsInterested.map((k) => getProductLabel(k, lang)).join(', ')
        : null;
      const { error: err } = await supabasePublic.from('leads').insert({
        company_name: formData.companyName.trim(),
        contact_name: formData.contactPerson.trim() || null,
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        country: formData.country.trim(),
        notes: notes || null,
        lead_type: 'tender',
        source: 'tender_form',
        page_url: typeof window !== 'undefined' ? window.location.href : null,
        status: 'new',
        products_interested: productsInterested,
        product_interest: productInterest,
      });
      if (err) throw err;
      setSubmitted(true);
      setFormData({ companyName: '', contactPerson: '', email: '', phone: '', country: '', projectType: '', productsInterest: [], additionalInfo: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trust metrics (inline, lang-aware)
  const trustItems = {
    en: [
      { icon: <Shield size={20} className="text-blue-500" />, text: 'ISO 9001 Certified' },
      { icon: <Award size={20} className="text-amber-500" />, text: 'FSC · BPA-free' },
      { icon: <Globe size={20} className="text-emerald-500" />, text: '50+ Countries' },
      { icon: <Clock size={20} className="text-violet-500" />, text: '24h Delivery' },
    ],
    ru: [
      { icon: <Shield size={20} className="text-blue-500" />, text: 'ISO 9001' },
      { icon: <Award size={20} className="text-amber-500" />, text: 'FSC · BPA-free' },
      { icon: <Globe size={20} className="text-emerald-500" />, text: '50+ стран' },
      { icon: <Clock size={20} className="text-violet-500" />, text: 'Ответ за 24 ч' },
    ],
    zh: [
      { icon: <Shield size={20} className="text-blue-500" />, text: 'ISO 9001 认证' },
      { icon: <Award size={20} className="text-amber-500" />, text: 'FSC · BPA-free' },
      { icon: <Globe size={20} className="text-emerald-500" />, text: '50+ 国家' },
      { icon: <Clock size={20} className="text-violet-500" />, text: '24小时内回复' },
    ],
  };

  // "What happens next" steps
  const nextSteps = {
    en: [
      { step: '01', title: 'Submit the form', desc: 'Fill in your contact and project details.' },
      { step: '02', title: 'We prepare the pack', desc: 'Our team compiles a tailored documentation set.' },
      { step: '03', title: 'Receive within 24h', desc: 'The full pack is sent to your email address.' },
    ],
    ru: [
      { step: '01', title: 'Отправьте форму', desc: 'Заполните контактные данные и детали проекта.' },
      { step: '02', title: 'Готовим документы', desc: 'Команда формирует пакет под ваш запрос.' },
      { step: '03', title: 'Получение за 24 ч', desc: 'Полный пакет отправляется на ваш email.' },
    ],
    zh: [
      { step: '01', title: '提交表单', desc: '填写联系信息和项目详情。' },
      { step: '02', title: '我们准备资料', desc: '团队为您整理定制化文档套件。' },
      { step: '03', title: '24小时内收到', desc: '完整资料包将发送至您的邮箱。' },
    ],
  };

  const trusts = trustItems[lang];
  const steps = nextSteps[lang];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEO
        title={t.title}
        description={t.description}
        lang={lang}
        canonical={`/${lang}/request-tender-pack`}
        hreflangs={{ en: '/en/request-tender-pack', ru: '/ru/request-tender-pack', zh: '/zh/request-tender-pack' }}
      />
      <Header />

      <main className="pt-[120px]">

        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="relative py-20 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white overflow-hidden">
          {/* subtle background pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-sm font-semibold">
              <FileText size={16} />
              {t.heroTag}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight">{t.h1}</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-10">{t.subtitle}</p>
            {/* Trust strip inside hero */}
            <div className="flex flex-wrap justify-center gap-3">
              {trusts.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  {item.icon}
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Breadcrumb ────────────────────────────────────────── */}
        <div className="w-full bg-gray-50 py-3 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb lang={lang} />
          </div>
        </div>

        {/* ─── What's Included ───────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black mb-4">{t.whatsIncluded}</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t.whatsIncludedDesc}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.items.map((item, index) => {
                const color = ITEM_COLORS[index % ITEM_COLORS.length];
                return (
                  <div key={index} className={`rounded-2xl border ${color.border} bg-white p-6 hover:shadow-md transition-shadow`}>
                    <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center ${color.icon} mb-4`}>
                      {ITEM_ICONS[index % ITEM_ICONS.length]}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Form + What Happens Next ──────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black mb-4">{t.formTitle}</h2>
              <p className="text-lg text-gray-500">{t.formSubtitle}</p>
            </div>

            {submitted ? (
              /* ── Success State ── */
              <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-emerald-200 shadow-sm p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">
                  {lang === 'zh' ? '申请已提交' : lang === 'ru' ? 'Запрос отправлен' : 'Request Submitted'}
                </h3>
                <p className="text-gray-500 mb-8">{t.successMsg}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors">
                    <MessageCircle size={18} /> WhatsApp
                  </a>
                  <a href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-xl transition-colors">
                    <Mail size={18} /> {CONTACT.email}
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-5 gap-8 items-start">

                {/* ── Form (3 cols) ── */}
                <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-7 md:p-9">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.companyName} *</label>
                      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required
                        placeholder={t.companyNamePlaceholder}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contactPerson} *</label>
                      <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required
                        placeholder={t.contactPersonPlaceholder}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.email} *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required
                        placeholder={t.emailPlaceholder}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.phone} *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                        placeholder={t.phonePlaceholder}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.country} *</label>
                      <input type="text" name="country" value={formData.country} onChange={handleChange} required
                        placeholder={t.countryPlaceholder}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.projectType} *</label>
                      <select name="projectType" value={formData.projectType} onChange={handleChange} required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors">
                        <option value="">{t.projectTypePlaceholder}</option>
                        {t.projectTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Products — pill tags */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {t.productsInterest}
                      <span className="ml-2 text-xs font-normal text-gray-400">{t.productsInterestHint}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCT_KEYS.map((key) => (
                        <label key={key}
                          className={`flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-full border text-sm transition-colors ${
                            formData.productsInterest.includes(key)
                              ? 'bg-blue-50 border-blue-300 text-blue-700'
                              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}>
                          <input type="checkbox" checked={formData.productsInterest.includes(key)}
                            onChange={() => toggleProduct(key)} className="sr-only" />
                          {PRODUCT_INTEREST_OPTIONS[key][lang]}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.additionalInfo}</label>
                    <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={4}
                      placeholder={t.additionalInfoPlaceholder}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none transition-colors" />
                  </div>

                  {error && (
                    <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
                    <Download size={20} />
                    {isSubmitting ? t.submitting : t.submitBtn}
                  </button>
                </form>

                {/* ── Right panel (2 cols) ── */}
                <div className="lg:col-span-2 flex flex-col gap-5">

                  {/* What happens next */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                      {lang === 'zh' ? '接下来会发生什么' : lang === 'ru' ? 'Что будет дальше' : 'What Happens Next'}
                    </p>
                    <ol className="flex flex-col gap-5">
                      {steps.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600 text-white text-xs font-extrabold flex items-center justify-center shadow-sm">
                            {s.step}
                          </div>
                          <div className="pt-1">
                            <div className="text-sm font-bold text-gray-900">{s.title}</div>
                            <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Quick contact */}
                  <div className="bg-blue-600 rounded-2xl p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">
                      {lang === 'zh' ? '更快的方式' : lang === 'ru' ? 'Быстрее через мессенджер' : 'Faster via Messenger'}
                    </p>
                    <div className="flex flex-col gap-3">
                      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 bg-white/15 hover:bg-white/25 rounded-xl transition-colors text-sm font-semibold">
                        <MessageCircle size={18} className="text-green-300" />
                        WhatsApp
                        <ArrowRight size={14} className="ml-auto opacity-60" />
                      </a>
                      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 bg-white/15 hover:bg-white/25 rounded-xl transition-colors text-sm font-semibold">
                        <Send size={18} className="text-sky-300" />
                        Telegram
                        <ArrowRight size={14} className="ml-auto opacity-60" />
                      </a>
                      <a href={`mailto:${CONTACT.email}`}
                        className="flex items-center gap-3 px-4 py-3 bg-white/15 hover:bg-white/25 rounded-xl transition-colors text-sm font-semibold">
                        <Mail size={18} className="text-blue-200" />
                        {CONTACT.email}
                        <ArrowRight size={14} className="ml-auto opacity-60" />
                      </a>
                    </div>
                  </div>

                  {/* Cert badges */}
                  <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: <Award size={18} className="text-blue-600" />, label: 'ISO 9001' },
                        { icon: <CheckCircle size={18} className="text-emerald-600" />, label: 'FSC' },
                        { icon: <Shield size={18} className="text-amber-600" />, label: 'BPA-free' },
                        { icon: <Package size={18} className="text-violet-600" />, label: 'REACH / RoHS' },
                      ].map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                          {badge.icon}
                          {badge.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
