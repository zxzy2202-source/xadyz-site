/**
 * ProductsPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface CategoryItem {
  id: string;
  title: string;
  shortDesc: string;
  bullets: string[];
  cta: string;
  link: string;
}

export interface ManufacturingItem {
  icon: string;
  label: string;
  value: string;
}

export interface CustomizationOption {
  icon: string;
  title: string;
  desc: string;
}

export interface ApplicationItem {
  icon: string;
  title: string;
  desc: string;
  link: string;
}

export interface ProductsContent {
  seo: { title: string; description: string; keywords: string };
  hero: { h1: string; subheading: string; intro: string };
  categories: CategoryItem[];
  manufacturingProof: { sectionTitle: string; items: ManufacturingItem[] };
  customization: { sectionTitle: string; intro: string; options: CustomizationOption[] };
  applicationsTeaser: { sectionTitle: string; items: ApplicationItem[]; cta: string; ctaLink: string };
  ctaBlock: { headline: string; subtext: string; button: string; buttonLink: string };
}

export const content: Record<Lang, ProductsContent> = {
  en: {
    seo: {
      title: 'Thermal Paper & Label Products | Zhixin Paper',
      description: 'Factory-manufactured thermal paper rolls, labels, and NCR forms. Stable quality with customization capabilities for global business.',
      keywords: 'thermal paper manufacturer, thermal labels, NCR forms, POS paper, receipt paper, OEM thermal paper',
    },
    hero: {
      h1: 'Thermal Paper & Label Products',
      subheading: 'Stable quality for global business',
      intro: 'Factory-manufactured finished products with customization capabilities.',
    },
    categories: [
      { id: 'thermal-paper-rolls', title: 'Thermal Paper Rolls', shortDesc: 'For POS, ATM, and receipt printing', bullets: ['Stable image density', 'BPA-free options available', 'Custom sizes supported'], cta: 'View Category', link: '/en/thermal-paper-rolls' },
      { id: 'thermal-labels', title: 'Thermal Labels', shortDesc: 'For logistics, retail, and barcode systems', bullets: ['Strong adhesive options', 'Clear barcode printing', 'Custom shapes available'], cta: 'View Category', link: '/en/thermal-labels' },
      { id: 'ncr-forms', title: 'NCR Forms', shortDesc: 'Carbonless multi-part forms', bullets: ['Clean image transfer', 'Smooth paper feeding', 'OEM production supported'], cta: 'View Category', link: '/en/ncr-forms' },
    ],
    manufacturingProof: {
      sectionTitle: 'Manufacturing Capabilities',
      items: [
        { icon: 'factory', label: 'Annual Capacity', value: '5,000+ tons' },
        { icon: 'settings', label: 'Production Lines', value: '8 converting lines' },
        { icon: 'users', label: 'Quality System', value: 'ISO 9001 certified' },
        { icon: 'globe', label: 'Export Markets', value: '40+ countries' },
      ],
    },
    customization: {
      sectionTitle: 'Customization & OEM',
      intro: 'Flexible production to meet your specific requirements',
      options: [
        { icon: 'box', title: 'Size & Format', desc: 'Custom dimensions and roll configurations' },
        { icon: 'printer', title: 'Printing & Branding', desc: 'Logo printing and variable data' },
        { icon: 'package', title: 'Packaging', desc: 'Custom packaging and labeling' },
      ],
    },
    applicationsTeaser: {
      sectionTitle: 'Industry Solutions',
      items: [
        { icon: 'store', title: 'Retail & POS', desc: 'Receipt paper for retail systems', link: '/en/applications/retail-pos' },
        { icon: 'truck', title: 'Logistics', desc: 'Shipping labels and documentation', link: '/en/applications/logistics-warehousing' },
        { icon: 'cart', title: 'Supermarkets', desc: 'Price tags and labels', link: '/en/applications/supermarkets' },
        { icon: 'briefcase', title: 'Government & Tenders', desc: 'Forms for official projects', link: '/en/applications/government-tenders' },
      ],
      cta: 'View All Applications',
      ctaLink: '/en/applications',
    },
    ctaBlock: {
      headline: 'Need detailed specs or samples?',
      subtext: 'Request datasheets, samples, and pricing from our team.',
      button: 'Request a Quote',
      buttonLink: '/en/contact',
    },
  },

  ru: {
    seo: {
      title: 'Термобумага и термоэтикетки — Производитель | Zhixin Paper',
      description: 'Термобумага, термоэтикетки и NCR-формы собственного производства. Стабильное качество с возможностью кастомизации для международного бизнеса.',
      keywords: 'производитель термобумаги, термоэтикетки, NCR формы, POS бумага, чековая бумага, OEM термобумага',
    },
    hero: {
      h1: 'Термобумага и термоэтикетки',
      subheading: 'Стабильное качество для международного бизнеса',
      intro: 'Готовая продукция собственного производства с возможностью кастомизации.',
    },
    categories: [
      { id: 'thermal-paper-rolls', title: 'Термобумага в рулонах', shortDesc: 'Для POS, банкоматов и чековой печати', bullets: ['Стабильная плотность печати', 'Возможны варианты без BPA', 'Индивидуальные размеры'], cta: 'Смотреть категорию', link: '/ru/thermal-paper-rolls' },
      { id: 'thermal-labels', title: 'Термоэтикетки', shortDesc: 'Для логистики, ритейла и штрихкодов', bullets: ['Надежный клеевой слой', 'Четкая печать штрихкодов', 'Индивидуальная форма'], cta: 'Смотреть категорию', link: '/ru/thermal-labels' },
      { id: 'ncr-forms', title: 'NCR-формы', shortDesc: 'Безуглеродные многослойные формы', bullets: ['Четкая передача изображения', 'Плавная подача бумаги', 'Поддержка OEM'], cta: 'Смотреть категорию', link: '/ru/ncr-forms' },
    ],
    manufacturingProof: {
      sectionTitle: 'Производственные мощности',
      items: [
        { icon: 'factory', label: 'Годовая мощность', value: '5 000+ тонн' },
        { icon: 'settings', label: 'Производственные линии', value: '8 линий конвертинга' },
        { icon: 'users', label: 'Система качества', value: 'Сертификат ISO 9001' },
        { icon: 'globe', label: 'Экспортные рынки', value: '40+ стран' },
      ],
    },
    customization: {
      sectionTitle: 'Кастомизация и OEM',
      intro: 'Гибкое производство под ваши требования',
      options: [
        { icon: 'box', title: 'Размер и формат', desc: 'Индивидуальные размеры и конфигурации рулонов' },
        { icon: 'printer', title: 'Печать и брендинг', desc: 'Печать логотипа и переменных данных' },
        { icon: 'package', title: 'Упаковка', desc: 'Индивидуальная упаковка и маркировка' },
      ],
    },
    applicationsTeaser: {
      sectionTitle: 'Отраслевые решения',
      items: [
        { icon: 'store', title: 'Ритейл и POS', desc: 'Чековая бумага для ритейл-систем', link: '/ru/applications/retail-pos' },
        { icon: 'truck', title: 'Логистика', desc: 'Этикетки для доставки и документация', link: '/ru/applications/logistics-warehousing' },
        { icon: 'cart', title: 'Супермаркеты', desc: 'Ценники и этикетки', link: '/ru/applications/supermarkets' },
        { icon: 'briefcase', title: 'Государственные тендеры', desc: 'Формы для официальных проектов', link: '/ru/applications/government-tenders' },
      ],
      cta: 'Все отрасли',
      ctaLink: '/ru/applications',
    },
    ctaBlock: {
      headline: 'Нужны технические характеристики или образцы?',
      subtext: 'Запросите спецификации, образцы и цены у нашей команды.',
      button: 'Запросить расчет',
      buttonLink: '/ru/contact',
    },
  },

  zh: {
    seo: {
      title: '热敏纸卷与标签产品 — 生产厂家 | 志信纸业',
      description: '工厂自产热敏纸卷、标签和NCR表格。稳定质量，支持定制化生产，服务全球业务。',
      keywords: '热敏纸厂家, 热敏标签, NCR表格, POS纸, 收据纸, OEM热敏纸',
    },
    hero: {
      h1: '热敏纸卷与标签产品',
      subheading: '为全球业务提供稳定质量',
      intro: '工厂自产成品，支持定制化生产。',
    },
    categories: [
      { id: 'thermal-paper-rolls', title: '热敏纸卷', shortDesc: '适用于POS、ATM和收据打印', bullets: ['稳定的图像密度', '可提供无BPA选项', '支持定制尺寸'], cta: '查看分类', link: '/zh/thermal-paper-rolls' },
      { id: 'thermal-labels', title: '热敏标签', shortDesc: '适用于物流、零售和条码系统', bullets: ['强力粘合选项', '清晰条码打印', '可定制形状'], cta: '查看分类', link: '/zh/thermal-labels' },
      { id: 'ncr-forms', title: 'NCR表格', shortDesc: '无碳复写多联表格', bullets: ['清晰的图像转印', '顺畅的纸张进纸', '支持OEM生产'], cta: '查看分类', link: '/zh/ncr-forms' },
    ],
    manufacturingProof: {
      sectionTitle: '生产能力',
      items: [
        { icon: 'factory', label: '年产能', value: '5000+吨' },
        { icon: 'settings', label: '生产线', value: '8条分切线' },
        { icon: 'users', label: '质量体系', value: 'ISO 9001认证' },
        { icon: 'globe', label: '出口市场', value: '40+国家' },
      ],
    },
    customization: {
      sectionTitle: '定制化与OEM',
      intro: '灵活生产满足您的特定需求',
      options: [
        { icon: 'box', title: '尺寸与格式', desc: '定制尺寸和卷材配置' },
        { icon: 'printer', title: '印刷与品牌', desc: '标识印刷和可变数据' },
        { icon: 'package', title: '包装', desc: '定制包装和标签' },
      ],
    },
    applicationsTeaser: {
      sectionTitle: '行业解决方案',
      items: [
        { icon: 'store', title: '零售与POS', desc: '零售系统收据纸', link: '/zh/applications/retail-pos' },
        { icon: 'truck', title: '物流', desc: '快递标签和文档', link: '/zh/applications/logistics-warehousing' },
        { icon: 'cart', title: '超市', desc: '价格标签和标签', link: '/zh/applications/supermarkets' },
        { icon: 'briefcase', title: '政府投标', desc: '官方项目表格', link: '/zh/applications/government-tenders' },
      ],
      cta: '查看所有行业',
      ctaLink: '/zh/applications',
    },
    ctaBlock: {
      headline: '需要详细规格或样品？',
      subtext: '向我们的团队索取数据表、样品和报价。',
      button: '索取报价',
      buttonLink: '/zh/contact',
    },
  },
};
