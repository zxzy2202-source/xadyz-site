import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { CONTACT } from '@/app/lib/contactConfig';
import { PageShell } from '@/app/components/PageShell';
import { ContactMethods, ContactCtaSection, ContactInquiryForm } from '@/app/components/contact';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { content } from './ContactsPage.content';
import { Factory, Globe, Award, Clock, ArrowRight, Send, Package, FileText, MessageCircle } from 'lucide-react';

type InquiryIntent = 'quote' | 'sample' | 'tender' | 'contact';

const INTENT_ORDER: InquiryIntent[] = ['quote', 'sample', 'tender', 'contact'];
const VALID_INTENTS = new Set(INTENT_ORDER);

const intentThemes: Record<
  InquiryIntent,
  {
    card: string;
    badge: string;
    iconWrap: string;
    iconColor: string;
    dot: string;
    summary: string;
  }
> = {
  quote: {
    card: 'border-blue-200 bg-blue-50/70 shadow-blue-100',
    badge: 'bg-blue-100 text-blue-700',
    iconWrap: 'bg-blue-100',
    iconColor: 'text-blue-700',
    dot: 'bg-blue-700',
    summary: 'bg-blue-900 text-white',
  },
  sample: {
    card: 'border-emerald-200 bg-emerald-50/70 shadow-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700',
    iconWrap: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    dot: 'bg-emerald-700',
    summary: 'bg-emerald-900 text-white',
  },
  tender: {
    card: 'border-amber-200 bg-amber-50/80 shadow-amber-100',
    badge: 'bg-amber-100 text-amber-700',
    iconWrap: 'bg-amber-100',
    iconColor: 'text-amber-700',
    dot: 'bg-amber-700',
    summary: 'bg-slate-900 text-white',
  },
  contact: {
    card: 'border-slate-200 bg-slate-50/80 shadow-slate-100',
    badge: 'bg-slate-100 text-slate-700',
    iconWrap: 'bg-slate-100',
    iconColor: 'text-slate-700',
    dot: 'bg-slate-700',
    summary: 'bg-slate-900 text-white',
  },
};

const intentIcons = {
  quote: Send,
  sample: Package,
  tender: FileText,
  contact: MessageCircle,
} as const;

const intentCopy = {
  en: {
    sectionTitle: 'Choose the fastest buying path',
    sectionDesc: 'Select the workflow that matches your next step so our first reply already includes the right information.',
    jumpToForm: 'Jump to Inquiry Form',
    tenderShortcut: 'Open Tender Pack Form',
    intents: {
      quote: {
        label: 'Quote',
        title: 'Factory Pricing',
        desc: 'For purchase planning, repeat supply, and bulk quotation.',
        cta: 'Prepare quote request',
        heroTitle: 'Request Factory Pricing for Thermal Paper, Labels, and NCR Forms',
        heroDesc: 'Share specifications, expected volume, destination market, and customization needs so we can quote faster and more accurately.',
        summaryTitle: 'A strong RFQ includes spec, volume, and destination.',
        summaryDesc: 'We use these details to confirm material choice, pricing range, and lead time in one response.',
        bullets: ['Product type and target specification', 'Monthly or project quantity', 'Delivery country and timing target'],
      },
      sample: {
        label: 'Samples',
        title: 'Validation Samples',
        desc: 'For print tests, adhesive checks, and supplier qualification.',
        cta: 'Prepare sample request',
        heroTitle: 'Request Samples Before You Approve the Order',
        heroDesc: 'Use this route when your team needs to test print quality, material fit, or packaging before placing a volume order.',
        summaryTitle: 'Sample requests move faster with testing context.',
        summaryDesc: 'Tell us what your team wants to validate so we can send the right material and format first time.',
        bullets: ['Which product or variant to test', 'Size, adhesive, or print requirement', 'Delivery address country and receiver'],
      },
      tender: {
        label: 'Tender',
        title: 'Project Documents',
        desc: 'For bidding, supplier approval, and procurement review.',
        cta: 'Prepare tender request',
        heroTitle: 'Collect the Documents Needed for Tenders and Project Procurement',
        heroDesc: 'Use this workflow when you need factory certificates, supplier information, compliance support, or project capacity confirmation.',
        summaryTitle: 'Tender support starts with document scope and deadline.',
        summaryDesc: 'We can align the right certificates, product files, and capacity statements once we understand the project stage.',
        bullets: ['Tender stage and submission deadline', 'Required certificates or compliance files', 'Relevant products and project volume'],
      },
      contact: {
        label: 'General',
        title: 'General Inquiry',
        desc: 'For product matching, timeline questions, or first contact.',
        cta: 'Open general inquiry',
        heroTitle: 'Contact the Manufacturer Directly',
        heroDesc: 'If you are evaluating thermal paper, thermal labels, or jumbo-roll supply, use the direct channel that best fits your buying stage.',
        summaryTitle: 'General inquiries work best when you share business context.',
        summaryDesc: 'We can guide you to the right product line, sample plan, or quotation path after the first reply.',
        bullets: ['Your product interest or application', 'Expected buying stage or project timeline', 'Whether you need stock supply or customization'],
      },
    },
  },
  ru: {
    sectionTitle: 'Выберите самый быстрый сценарий обращения',
    sectionDesc: 'Откройте нужный формат запроса, чтобы мы сразу ответили по делу: цена, образцы или документы.',
    jumpToForm: 'Перейти к форме',
    tenderShortcut: 'Открыть форму тендерного пакета',
    intents: {
      quote: {
        label: 'Расчёт',
        title: 'Заводская цена',
        desc: 'Для закупочного плана, регулярных поставок и оптового расчёта.',
        cta: 'Подготовить запрос на расчёт',
        heroTitle: 'Запросить заводской расчёт по термобумаге, этикеткам и NCR-формам',
        heroDesc: 'Укажите спецификацию, ожидаемый объём, рынок поставки и потребность в кастомизации, чтобы мы быстрее дали точный расчёт.',
        summaryTitle: 'Хороший RFQ начинается со спецификации, объёма и рынка поставки.',
        summaryDesc: 'Эти данные позволяют сразу подтвердить материал, ценовой диапазон и срок изготовления.',
        bullets: ['Тип продукта и нужная спецификация', 'Месячный или проектный объём', 'Страна поставки и нужный срок'],
      },
      sample: {
        label: 'Образцы',
        title: 'Тестовые образцы',
        desc: 'Для проверки печати, клея и квалификации поставщика.',
        cta: 'Подготовить запрос на образцы',
        heroTitle: 'Запросить образцы до согласования основного заказа',
        heroDesc: 'Используйте этот маршрут, если команде нужно проверить качество печати, материал или упаковку до объёмной закупки.',
        summaryTitle: 'Запрос на образцы идёт быстрее, если понятна цель теста.',
        summaryDesc: 'Сообщите, что именно вы валидируете, и мы подготовим нужный формат и материал с первого раза.',
        bullets: ['Какой продукт или вариант тестируется', 'Размер, клей или требования к печати', 'Страна доставки и получатель'],
      },
      tender: {
        label: 'Тендер',
        title: 'Проектные документы',
        desc: 'Для торгов, согласования поставщика и закупочной проверки.',
        cta: 'Подготовить тендерный запрос',
        heroTitle: 'Соберите документы для тендера и проектной закупки',
        heroDesc: 'Используйте этот сценарий, если нужны сертификаты завода, данные поставщика, подтверждение соответствия или мощности по проекту.',
        summaryTitle: 'Тендерная поддержка начинается с понимания пакета документов и дедлайна.',
        summaryDesc: 'Мы подберём нужные сертификаты, файлы по продукции и подтверждение мощностей после понимания стадии проекта.',
        bullets: ['Стадия тендера и срок подачи', 'Какие сертификаты или файлы нужны', 'Продукты и объём проекта'],
      },
      contact: {
        label: 'Общий',
        title: 'Общий запрос',
        desc: 'Для подбора продукта, вопросов по срокам или первого контакта.',
        cta: 'Открыть общий запрос',
        heroTitle: 'Связаться с производителем напрямую',
        heroDesc: 'Если вы оцениваете поставки термобумаги, термоэтикеток или jumbo-рулонов, выберите прямой канал под текущую стадию закупки.',
        summaryTitle: 'Общие запросы работают лучше, когда есть контекст бизнеса.',
        summaryDesc: 'После первого ответа мы подскажем нужную продуктовую линию, формат образцов или путь к расчёту.',
        bullets: ['Интересующий продукт или применение', 'Стадия закупки или сроки проекта', 'Нужна складская поставка или кастомизация'],
      },
    },
  },
  zh: {
    sectionTitle: '选择最适合当前采购阶段的入口',
    sectionDesc: '按报价、样品、投标或一般咨询进入，我们首轮回复就会更有针对性。',
    jumpToForm: '跳转到表单',
    tenderShortcut: '打开投标资料包表单',
    intents: {
      quote: {
        label: '报价',
        title: '工厂报价',
        desc: '适合批量采购、长期补货和价格评估。',
        cta: '准备报价需求',
        heroTitle: '索取热敏纸、标签和 NCR 表格的工厂报价',
        heroDesc: '提交规格、采购量级、目标市场和定制需求，我们可以更快给出准确报价。',
        summaryTitle: '高质量报价需求应包含规格、量级和交付市场。',
        summaryDesc: '这些信息可以帮助我们一次性确认材料、价格区间和交期。',
        bullets: ['产品类型与目标规格', '月采购量或项目总量', '交付国家与时间要求'],
      },
      sample: {
        label: '样品',
        title: '测试样品',
        desc: '适合印刷测试、胶水验证和供应商审核。',
        cta: '准备样品需求',
        heroTitle: '先申请样品，再确认大货订单',
        heroDesc: '如果您需要先测试打印效果、材料适配性或包装方案，请走样品流程。',
        summaryTitle: '样品申请提供测试背景后处理会更快。',
        summaryDesc: '告诉我们测试目的和验证重点，我们会更准确地准备样品材质与规格。',
        bullets: ['要测试的产品或型号', '尺寸、胶水或印刷要求', '收件国家与联系人信息'],
      },
      tender: {
        label: '投标',
        title: '项目资料',
        desc: '适合招投标、供应商审核和项目采购。',
        cta: '准备投标需求',
        heroTitle: '为投标和项目采购准备所需资料',
        heroDesc: '如果您需要工厂证书、供应商资料、合规文件或项目产能说明，请走此流程。',
        summaryTitle: '投标支持首先需要明确资料范围和截止时间。',
        summaryDesc: '了解项目阶段后，我们可以匹配相应证书、产品资料和产能说明。',
        bullets: ['项目阶段与截止日期', '所需证书或合规文件', '涉及产品与项目量级'],
      },
      contact: {
        label: '咨询',
        title: '一般咨询',
        desc: '适合产品匹配、交期问题或首次接触。',
        cta: '打开咨询表单',
        heroTitle: '直接联系生产厂家',
        heroDesc: '如果您正在评估热敏纸、热敏标签或大卷材料供应，请按当前采购阶段选择合适的沟通入口。',
        summaryTitle: '一般咨询最好先说明业务背景。',
        summaryDesc: '我们会根据您的场景，引导到合适的产品线、样品流程或报价路径。',
        bullets: ['关注的产品或应用场景', '当前采购阶段或项目时间', '是否需要常规供货或定制'],
      },
    },
  },
} as const;

function buildIntentUrl(
  lang: 'en' | 'ru' | 'zh',
  searchParams: URLSearchParams,
  intent: InquiryIntent
) {
  const params = new URLSearchParams(searchParams);
  if (intent === 'contact') {
    params.delete('intent');
  } else {
    params.set('intent', intent);
  }
  const query = params.toString();
  return `/${lang}/contact${query ? `?${query}` : ''}`;
}

function buildTenderPackPath(lang: 'en' | 'ru' | 'zh', searchParams: URLSearchParams) {
  const params = new URLSearchParams();
  const inquiry = searchParams.get('inquiry');
  const products = searchParams.get('products');

  if (inquiry) params.set('inquiry', inquiry);
  if (products) params.set('products', products);

  const query = params.toString();
  return `/${lang}/applications/request-tender-pack${query ? `?${query}` : ''}`;
}

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
  const [searchParams] = useSearchParams();
  const intentParam = searchParams.get('intent');
  const activeIntent: InquiryIntent =
    intentParam && VALID_INTENTS.has(intentParam as InquiryIntent)
      ? (intentParam as InquiryIntent)
      : 'contact';
  const copy = intentCopy[lang];
  const activeCopy = copy.intents[activeIntent];
  const activeTheme = intentThemes[activeIntent];
  const tenderPackPath = buildTenderPackPath(lang, searchParams);

  const heroContent = (
    <div className="-mt-32 pt-32">
      <PageHero
        title={activeCopy.heroTitle}
        description={activeCopy.heroDesc}
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
                { icon: <Clock size={22} className="text-violet-600" />, value: '24h', label: lang === 'zh' ? '24小时内快速回复' : lang === 'ru' ? 'ответ на запрос' : 'Response Guarantee' },
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

        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{copy.sectionTitle}</h2>
              <p className="text-gray-500 max-w-3xl">{copy.sectionDesc}</p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {INTENT_ORDER.map((intent) => {
                const card = copy.intents[intent];
                const theme = intentThemes[intent];
                const Icon = intentIcons[intent];
                const isActive = intent === activeIntent;

                return (
                  <Link
                    key={intent}
                    to={buildIntentUrl(lang, searchParams, intent)}
                    className={`group rounded-3xl border p-6 transition-all shadow-sm ${
                      isActive
                        ? `${theme.card} shadow-lg`
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${isActive ? theme.badge : 'bg-gray-100 text-gray-600'}`}>
                        {card.label}
                      </span>
                      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${isActive ? theme.iconWrap : 'bg-gray-100'} ${isActive ? theme.iconColor : 'text-gray-500'}`}>
                        <Icon size={20} />
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{card.desc}</p>
                    <div className="space-y-2 mb-5">
                      {card.bullets.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className={`mt-1 h-1.5 w-1.5 rounded-full ${isActive ? theme.dot : 'bg-gray-300'}`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <span className={`inline-flex items-center gap-2 text-sm font-semibold ${isActive ? theme.iconColor : 'text-gray-700'}`}>
                      {card.cta}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className={`mt-6 rounded-[2rem] p-6 md:p-8 ${activeTheme.summary}`}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-bold mb-2">{activeCopy.summaryTitle}</h3>
                  <p className="text-sm md:text-base text-white/80">{activeCopy.summaryDesc}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#contact-inquiry-form"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-900"
                  >
                    {copy.jumpToForm}
                    <ArrowRight size={14} />
                  </a>
                  {activeIntent === 'tender' && (
                    <Link
                      to={tenderPackPath}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      {copy.tenderShortcut}
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

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
          tenderPackPath={tenderPackPath}
        />
      </PageShell>
    </>
  );
};
