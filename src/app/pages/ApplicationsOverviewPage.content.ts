/**
 * ApplicationsOverviewPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface IndustryItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  typicalProducts: string[];
  link: string;
  cta: string;
  highlight?: boolean;
}

export interface ApplicationsOverviewContent {
  seo: { title: string; description: string; keywords: string };
  hero: { h1: string; subheading: string; intro: string };
  industryGrid: { sectionTitle: string; industries: IndustryItem[] };
  productMapping: { sectionTitle: string; intro: string };
  ctaBlock: { headline: string; subtext: string; button: string; buttonLink: string };
}

export const content: Record<Lang, ApplicationsOverviewContent> = {
  en: {
    seo: {
      title: 'Industry Applications | Retail, Logistics, Government & More | Zhixin',
      description: 'Thermal paper, labels, and NCR solutions for retail, logistics, finance, and government projects. Supporting daily operations and long-term procurement.',
      keywords: 'thermal paper applications, POS thermal paper, logistics labels, NCR forms government, retail thermal solutions, tender procurement',
    },
    hero: {
      h1: 'Industry Applications',
      subheading: 'Thermal paper, labels, and NCR solutions for different industries',
      intro: 'Our products are widely used across retail, logistics, finance, and government projects, supporting both daily operations and long-term procurement.',
    },
    industryGrid: {
      sectionTitle: 'Industries We Serve',
      industries: [
        { id: 'retail-pos', icon: 'store', title: 'Retail & POS', desc: 'Thermal paper rolls for receipt printing and daily transactions in retail stores and point-of-sale systems.', typicalProducts: ['Thermal Paper Rolls', 'Printed Thermal Rolls'], link: '/en/applications/retail-pos', cta: 'Learn More' },
        { id: 'logistics-warehousing', icon: 'truck', title: 'Logistics & Warehousing', desc: 'Thermal labels for shipping, tracking, and warehouse identification.', typicalProducts: ['Thermal Labels', 'Printed Logistics Labels'], link: '/en/applications/logistics-warehousing', cta: 'Learn More' },
        { id: 'supermarkets', icon: 'cart', title: 'Supermarkets & Retail Chains', desc: 'Thermal paper and printed products for high-volume and standardized retail operations.', typicalProducts: ['Thermal Paper Rolls', 'Printed Thermal Rolls'], link: '/en/applications/supermarkets', cta: 'Learn More' },
        { id: 'banking-finance', icon: 'building', title: 'Banking & Finance', desc: 'NCR forms and thermal paper for financial records, transaction slips, and internal documentation.', typicalProducts: ['NCR Forms', 'Thermal Paper Rolls'], link: '/en/applications/banking-finance', cta: 'Learn More' },
        { id: 'government-tenders', icon: 'briefcase', title: 'Government & Tenders', desc: 'Project-oriented supply of thermal products and NCR forms for public sector and tender-based procurement.', typicalProducts: ['NCR Forms (including continuous)', 'Thermal Paper Rolls'], link: '/en/applications/government-tenders', cta: 'Learn More', highlight: true },
        { id: 'healthcare', icon: 'heart', title: 'Healthcare & Services', desc: 'Thermal paper and labels for registration, records, and service documentation.', typicalProducts: ['Thermal Paper Rolls', 'Thermal Labels'], link: '/en/applications/healthcare', cta: 'Learn More' },
      ],
    },
    productMapping: {
      sectionTitle: 'Application → Product Matching',
      intro: 'Each industry has different operational requirements. Our team helps match the right product types, formats, and supply models based on your application.',
    },
    ctaBlock: {
      headline: 'Not sure which product fits your application?',
      subtext: 'Contact our team for technical guidance and project support.',
      button: 'Contact Us',
      buttonLink: '/en/contact',
    },
  },

  ru: {
    seo: {
      title: 'Отраслевые решения | Розница, логистика, госпроекты и др. | Zhixin',
      description: 'Термобумага, этикетки и NCR-решения для розницы, логистики, финансов и государственных проектов. Поддержка ежедневных операций и долгосрочных закупок.',
      keywords: 'применение термобумаги, POS термобумага, логистические этикетки, NCR формы госзакупки, термо решения для розницы, тендерные закупки',
    },
    hero: {
      h1: 'Отраслевые решения',
      subheading: 'Термобумага, этикетки и NCR-решения для различных отраслей',
      intro: 'Наша продукция широко используется в рознице, логистике, финансах и государственных проектах, поддерживая ежедневную работу и долгосрочные закупки.',
    },
    industryGrid: {
      sectionTitle: 'Отрасли, которые мы обслуживаем',
      industries: [
        { id: 'retail-pos', icon: 'store', title: 'Розница и POS', desc: 'Термобумага для печати чеков и ежедневных операций в розничных магазинах и POS-системах.', typicalProducts: ['Термобумага в рулонах', 'Печатная термобумага'], link: '/ru/applications/retail-pos', cta: 'Подробнее' },
        { id: 'logistics-warehousing', icon: 'truck', title: 'Логистика и склад', desc: 'Термоэтикетки для доставки, отслеживания и складской идентификации.', typicalProducts: ['Термоэтикетки в рулонах', 'Печатные логистические этикетки'], link: '/ru/applications/logistics-warehousing', cta: 'Подробнее' },
        { id: 'supermarkets', icon: 'cart', title: 'Супермаркеты и торговые сети', desc: 'Термобумага и печатная продукция для крупных и стандартизированных сетей.', typicalProducts: ['Термобумага в рулонах', 'Печатная термобумага'], link: '/ru/applications/supermarkets', cta: 'Подробнее' },
        { id: 'banking-finance', icon: 'building', title: 'Банки и финансы', desc: 'NCR-формы и термобумага для финансовых документов, квитанций и внутреннего учета.', typicalProducts: ['NCR-формы', 'Термобумага в рулонах'], link: '/ru/applications/banking-finance', cta: 'Подробнее' },
        { id: 'government-tenders', icon: 'briefcase', title: 'Государственные проекты и тендеры', desc: 'Проектные поставки термопродукции и NCR-форм для государственных и тендерных закупок.', typicalProducts: ['NCR-формы (включая непрерывные)', 'Термобумага в рулонах'], link: '/ru/applications/government-tenders', cta: 'Подробнее', highlight: true },
        { id: 'healthcare', icon: 'heart', title: 'Здавоохранение и сервис', desc: 'Термобумага и этикетки для регистрации, учета и сервисной документации.', typicalProducts: ['Термобумага в рулонах', 'Термоэтикетки'], link: '/ru/applications/healthcare', cta: 'Подробнее' },
      ],
    },
    productMapping: {
      sectionTitle: 'Подбор продукции для вашей отрасли',
      intro: 'Каждая отрасль имеет свои операционные требования. Мы помогаем подобрать подходящие продукты, форматы и модели поставок под конкретные задачи.',
    },
    ctaBlock: {
      headline: 'Не уверены, какая продукция вам подходит?',
      subtext: 'Свяжитесь с нами для консультации и проектной поддержки.',
      button: 'Связаться с нами',
      buttonLink: '/ru/contact',
    },
  },

  zh: {
    seo: {
      title: '行业应用 | 零售、物流、政府等 | 志信纸业',
      description: '热敏纸、标签和NCR解决方案，适用于零售、物流、金融和政府项目。支持日常运营和长期采购。',
      keywords: '热敏纸应用, POS热敏纸, 物流标签, NCR表格政府, 零售热敏解决方案, 投标采购',
    },
    hero: {
      h1: '行业应用',
      subheading: '适用于不同行业的热敏纸、标签和NCR解决方案',
      intro: '我们的产品广泛应用于零售、物流、金融和政府项目，支持日常运营和长期采购。',
    },
    industryGrid: {
      sectionTitle: '我们服务的行业',
      industries: [
        { id: 'retail-pos', icon: 'store', title: '零售与POS', desc: '用于零售店和POS系统小票打印和日常交易的热敏纸卷。', typicalProducts: ['热敏纸卷', '印刷热敏纸卷'], link: '/zh/applications/retail-pos', cta: '了解更多' },
        { id: 'logistics-warehousing', icon: 'truck', title: '物流与仓储', desc: '用于快递、追踪和仓库识别的热敏标签。', typicalProducts: ['热敏标签（卷装）', '印刷物流标签'], link: '/zh/applications/logistics-warehousing', cta: '了解更多' },
        { id: 'supermarkets', icon: 'cart', title: '超市与零售连锁', desc: '用于大批量和标准化零售运营的热敏纸和印刷产品。', typicalProducts: ['热敏纸卷', '印刷热敏纸卷'], link: '/zh/applications/supermarkets', cta: '了解更多' },
        { id: 'banking-finance', icon: 'building', title: '银行与金融', desc: '用于财务记录、交易凭证和内部文档的NCR表格和热敏纸。', typicalProducts: ['NCR表格', '热敏纸卷'], link: '/zh/applications/banking-finance', cta: '了解更多' },
        { id: 'government-tenders', icon: 'briefcase', title: '政府与投标', desc: '面向公共部门和基于投标的采购，项目导向热敏产品和NCR表格供应。', typicalProducts: ['NCR表格（包括连续表格）', '热敏纸卷'], link: '/zh/applications/government-tenders', cta: '了解更多', highlight: true },
        { id: 'healthcare', icon: 'heart', title: '医疗与服务', desc: '用于登记、记录和服务文档的热敏纸和标签。', typicalProducts: ['热敏纸卷', '热敏标签'], link: '/zh/applications/healthcare', cta: '了解更多' },
      ],
    },
    productMapping: {
      sectionTitle: '应用 → 产品匹配',
      intro: '每个行业都有不同的运营需求。我们的团队帮助根据您的应用匹配正确的产品类型、格式和供应模式。',
    },
    ctaBlock: {
      headline: '不确定哪种产品适合您的应用？',
      subtext: '联系我们的团队获取技术指导和项目支持。',
      button: '联系我们',
      buttonLink: '/zh/contact',
    },
  },
};
