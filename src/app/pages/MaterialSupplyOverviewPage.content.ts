/**
 * MaterialSupplyOverviewPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface MaterialCategory {
  id: string;
  title: string;
  desc: string;
  bullets: string[];
  cta: string;
  ctaLink: string;
}

export interface FeatureItem {
  title: string;
  desc: string;
  icon?: string;
}

export interface MaterialSupplyContent {
  seo: { title: string; description: string; keywords: string };
  hero: { h1: string; subheading: string; intro: string; primaryCTA: string; primaryCTALink: string };
  materialCategories: { sectionTitle: string; categories: MaterialCategory[] };
  supplyModel: { sectionTitle: string; intro: string; features: FeatureItem[] };
  qualityAssurance: { sectionTitle: string; intro: string; features: FeatureItem[] };
  applicationsTeaser: { sectionTitle: string; items: FeatureItem[] };
  ctaBlock: { headline: string; subtext: string; button: string; buttonLink: string };
}

export const content: Record<Lang, MaterialSupplyContent> = {
  en: {
    seo: {
      title: 'Material Supply for Converting & Projects | Thermal, Self-Adhesive, NCR | Zhixin',
      description: 'Stable supply of thermal, self-adhesive, and NCR materials for converters, distributors, and project-based procurement. Long-term cooperation focus.',
      keywords: 'thermal jumbo rolls supplier, self-adhesive material supply, NCR paper materials, paper converter supply, long-term material supply',
    },
    hero: {
      h1: 'Material Supply for Converting and Long-Term Projects',
      subheading: 'Thermal, self-adhesive, and NCR materials with stable sourcing',
      intro: 'We supply paper and label materials sourced from qualified partner mills, supporting converters, distributors, and project-based procurement.',
      primaryCTA: 'View Material Categories',
      primaryCTALink: '#categories',
    },
    materialCategories: {
      sectionTitle: 'Material Categories',
      categories: [
        { id: 'thermal-jumbo', title: 'Thermal Jumbo Rolls', desc: 'Thermal paper jumbo rolls for cutting, converting, and large-volume supply.', bullets: ['Stable coating performance', 'Suitable for POS and receipt applications', 'Consistent quality across batches'], cta: 'View Details', ctaLink: '/en/material-supply/thermal-jumbo-rolls' },
        { id: 'self-adhesive', title: 'Self-Adhesive Materials', desc: 'Self-adhesive paper materials supplied in rolls and sheets.', bullets: ['Jumbo rolls and sheet formats', 'Suitable for printing and die-cutting', 'Stable adhesive options'], cta: 'View Details', ctaLink: '/en/material-supply/self-adhesive-jumbo-rolls' },
        { id: 'ncr', title: 'NCR Materials', desc: 'Carbonless paper materials for forms and documentation production.', bullets: ['Supplied in jumbo rolls and sheets', 'Suitable for multi-part forms', 'Stable image transfer performance'], cta: 'View Details', ctaLink: '/en/material-supply/ncr-jumbo-rolls' },
      ],
    },
    supplyModel: {
      sectionTitle: 'Supply Model & Partnership',
      intro: 'We focus on long-term material supply rather than one-off trading. Our supply model supports stable planning, consistent quality, and project-based purchasing requirements.',
      features: [
        { title: 'Long-term cooperation', desc: '', icon: 'clock' },
        { title: 'Batch consistency', desc: '', icon: 'shield' },
        { title: 'Contract-based supply', desc: '', icon: 'file' },
      ],
    },
    qualityAssurance: {
      sectionTitle: 'Quality & Sourcing Assurance',
      intro: 'Materials are sourced from qualified partner mills and inspected before delivery to ensure consistent performance for converting and industrial use.',
      features: [
        { title: 'Qualified sourcing', desc: '', icon: 'award' },
        { title: 'Incoming inspection', desc: '', icon: 'shield' },
        { title: 'Batch traceability', desc: '', icon: 'truck' },
      ],
    },
    applicationsTeaser: {
      sectionTitle: 'Applications & Target Customers',
      items: [
        { title: 'Paper converters', desc: '', icon: 'printer' },
        { title: 'Label printers', desc: '', icon: 'barcode' },
        { title: 'Distributors', desc: '', icon: 'truck' },
        { title: 'Project-based procurement', desc: '', icon: 'briefcase' },
      ],
    },
    ctaBlock: {
      headline: 'Need stable material supply for your production?',
      subtext: 'Contact us to discuss specifications and long-term cooperation.',
      button: 'Contact Us',
      buttonLink: '/en/contact',
    },
  },

  ru: {
    seo: {
      title: 'Поставка материалов для переработки и проектов | Термо, самоклейка, NCR | Zhixin',
      description: 'Стабильная поставка термобумаги, самоклеящихся и NCR материалов для переработчиков, дистрибьюторов и проектных закупок. Фокус на долгосрочное сотрудничество.',
      keywords: 'поставщик термобумаги jumbo, поставка самоклеящихся материалов, NCR бумажные материалы, поставка для конвертеров, долгосрочная поставка материалов',
    },
    hero: {
      h1: 'Поставка материалов для переработки и долгосрочных проектов',
      subheading: 'Термобумага, самоклеящиеся и NCR материалы со стабильными поставками',
      intro: 'Мы поставляем бумажные и этикеточные материалы от проверенных фабрик для переработчиков, дистрибьюторов и проектов.',
      primaryCTA: 'Смотреть категории материалов',
      primaryCTALink: '#categories',
    },
    materialCategories: {
      sectionTitle: 'Категории материалов',
      categories: [
        { id: 'thermal-jumbo', title: 'Термобумага Jumbo', desc: 'Jumbo-рулоны термобумаги для резки, конвертинга и крупных объемов.', bullets: ['Стабильное термопокрытие', 'Подходит для POS и чековой печати', 'Одинаковое качество партий'], cta: 'Подробнее', ctaLink: '/ru/material-supply/thermal-jumbo-rolls' },
        { id: 'self-adhesive', title: 'Самоклеящиеся материалы', desc: 'Самоклеящиеся бумажные материалы в рулонах и листах.', bullets: ['Форматы jumbo и листы', 'Подходит для печати и высечки', 'Стабильный клеевой слой'], cta: 'Подробнее', ctaLink: '/ru/material-supply/self-adhesive-jumbo-rolls' },
        { id: 'ncr', title: 'Материалы NCR', desc: 'Безуглеродная бумага для производства форм и документации.', bullets: ['Поставка в рулонах и листах', 'Подходит для многослойных форм', 'Стабильная передача изображения'], cta: 'Подробнее', ctaLink: '/ru/material-supply/ncr-jumbo-rolls' },
      ],
    },
    supplyModel: {
      sectionTitle: 'Модель поставок и партнерство',
      intro: 'Мы ориентируемся на долгосрочное сотрудничество, а не разовые сделки. Модель поставок обеспечивает стабильное планирование и одинаковое качество партий.',
      features: [
        { title: 'Долгосрочное сотрудничество', desc: '', icon: 'clock' },
        { title: 'Стабильность партий', desc: '', icon: 'shield' },
        { title: 'Контрактные поставки', desc: '', icon: 'file' },
      ],
    },
    qualityAssurance: {
      sectionTitle: 'Качество и гарантии поставок',
      intro: 'Материалы поставляются от проверенных фабрик и проходят входной контроль перед отгрузкой для обеспечения стабильных характеристик при переработке.',
      features: [
        { title: 'Проверенные источники', desc: '', icon: 'award' },
        { title: 'Входной контроль', desc: '', icon: 'shield' },
        { title: 'Прослеживаемость партий', desc: '', icon: 'truck' },
      ],
    },
    applicationsTeaser: {
      sectionTitle: 'Применение и целевые клиенты',
      items: [
        { title: 'Бумажные конвертеры', desc: '', icon: 'printer' },
        { title: 'Типографии этикеток', desc: '', icon: 'barcode' },
        { title: 'Дистрибьюторы', desc: '', icon: 'truck' },
        { title: 'Проектные закупки', desc: '', icon: 'briefcase' },
      ],
    },
    ctaBlock: {
      headline: 'Нужны стабильные поставки материалов?',
      subtext: 'Свяжитесь с нами для обсуждения спецификаций и сотрудничества.',
      button: 'Связаться с нами',
      buttonLink: '/ru/contact',
    },
  },

  zh: {
    seo: {
      title: '原材料供应 - 分切与项目用 | 热敏、自粘、NCR | 志信纸业',
      description: '稳定供应热敏、自粘和NCR材料，服务分切厂、分销商和项目采购。专注长期合作。',
      keywords: '热敏大卷供应商, 自粘材料供应, NCR纸材料, 纸张分切供应, 长期材料供应',
    },
    hero: {
      h1: '分切与长期项目的原材料供应',
      subheading: '稳定采购的热敏、自粘和NCR材料',
      intro: '我们从合格的合作工厂采购纸张和标签材料，支持分切厂、分销商和基于项目的采购。',
      primaryCTA: '查看材料类别',
      primaryCTALink: '#categories',
    },
    materialCategories: {
      sectionTitle: '材料类别',
      categories: [
        { id: 'thermal-jumbo', title: '热敏大卷', desc: '用于分切、加工和大批量供应的热敏纸大卷。', bullets: ['稳定的涂层性能', '适合POS和小票应用', '批次间质量一致'], cta: '查看详情', ctaLink: '/zh/material-supply/thermal-jumbo-rolls' },
        { id: 'self-adhesive', title: '自粘材料', desc: '卷装和片材供应的自粘纸材料。', bullets: ['大卷和片材格式', '适合印刷和模切', '稳定的粘合剂选项'], cta: '查看详情', ctaLink: '/zh/material-supply/self-adhesive-jumbo-rolls' },
        { id: 'ncr', title: 'NCR材料', desc: '用于表格和文档生产的无碳复写纸材料。', bullets: ['大卷和片材供应', '适合多联表格', '稳定的图像转印性能'], cta: '查看详情', ctaLink: '/zh/material-supply/ncr-jumbo-rolls' },
      ],
    },
    supplyModel: {
      sectionTitle: '供应模式与合作',
      intro: '我们专注于长期材料供应而非一次性交易。我们的供应模式支持稳定规划、一致质量和基于项目的采购需求。',
      features: [
        { title: '长期合作', desc: '', icon: 'clock' },
        { title: '批次一致性', desc: '', icon: 'shield' },
        { title: '基于合同的供应', desc: '', icon: 'file' },
      ],
    },
    qualityAssurance: {
      sectionTitle: '质量与采购保证',
      intro: '材料从合格的合作工厂采购，并在交付前进行检验，以确保分切和工业使用的一致性能。',
      features: [
        { title: '合格采购', desc: '', icon: 'award' },
        { title: '进货检验', desc: '', icon: 'shield' },
        { title: '批次可追溯性', desc: '', icon: 'truck' },
      ],
    },
    applicationsTeaser: {
      sectionTitle: '应用与目标客户',
      items: [
        { title: '纸张分切厂', desc: '', icon: 'printer' },
        { title: '标签印刷厂', desc: '', icon: 'barcode' },
        { title: '分销商', desc: '', icon: 'truck' },
        { title: '项目采购', desc: '', icon: 'briefcase' },
      ],
    },
    ctaBlock: {
      headline: '需要稳定的生产材料供应？',
      subtext: '联系我们讨论规格和长期合作。',
      button: '联系我们',
      buttonLink: '/zh/contact',
    },
  },
};
