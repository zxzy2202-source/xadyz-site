/**
 * SupermarketsPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface AppItem {
  icon: string;
  title: string;
  desc: string;
}

export interface ProductItem {
  title: string;
  desc: string;
  specs: string[];
  link: string;
  cta: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  desc: string;
}

export interface SupermarketsContent {
  seo: { title: string; description: string; keywords: string };
  hero: { h1: string; subheading: string; intro: string };
  overview: { sectionTitle: string; content: string; highlights: string[] };
  applications: { sectionTitle: string; apps: AppItem[] };
  products: { sectionTitle: string; items: ProductItem[] };
  benefits: { sectionTitle: string; items: BenefitItem[] };
  cta: { headline: string; subtext: string; primaryButton: string; primaryLink: string; secondaryButton: string; secondaryLink: string };
}

export const content: Record<Lang, SupermarketsContent> = {
  en: {
    seo: {
      title: 'Supermarket Thermal Paper & Labels | Retail Chain Solutions | Zhixin',
      description: 'Thermal paper rolls and labels for supermarkets and retail chains. High-volume supply for POS systems, price tags, and customer receipts.',
      keywords: 'supermarket thermal paper, retail chain thermal rolls, price tag labels, supermarket receipt paper, high volume thermal paper, retail chain supplier',
    },
    hero: {
      h1: 'Supermarket & Retail Chain Solutions',
      subheading: 'Thermal paper and labels for high-volume retail operations',
      intro: 'Standardized, consistent supply of thermal products designed for multi-location supermarket and retail chain operations.',
    },
    overview: {
      sectionTitle: 'Thermal Solutions for Supermarket Operations',
      content: 'Supermarkets and retail chains require consistent, high-quality thermal products that work seamlessly across all locations. Our thermal paper and labels are manufactured to strict specifications, ensuring uniform performance and reliable supply for your entire network.',
      highlights: [
        'Standardized specifications across all batches',
        'High-volume production capacity',
        'Coordinated delivery to multiple locations',
        'Support for chain procurement teams',
      ],
    },
    applications: {
      sectionTitle: 'Key Supermarket Applications',
      apps: [
        { icon: 'shoppingCart', title: 'Checkout Receipts', desc: 'Thermal paper rolls for POS systems and customer receipts at checkout' },
        { icon: 'tag', title: 'Price Tags & Labels', desc: 'Thermal labels for pricing, promotions, and product identification' },
        { icon: 'receipt', title: 'Custom Branded Receipts', desc: 'Pre-printed thermal rolls with store branding and promotional messages' },
        { icon: 'users', title: 'Multi-Location Supply', desc: 'Coordinated supply chains for retail chains with multiple stores' },
      ],
    },
    products: {
      sectionTitle: 'Recommended Products',
      items: [
        {
          title: 'Thermal Paper Rolls',
          desc: 'Standard receipt paper for POS systems across all locations',
          specs: ['Common sizes: 80mm, 57mm', 'High-volume production', 'Batch consistency guaranteed'],
          link: '/en/thermal-paper-rolls',
          cta: 'View Product',
        },
        {
          title: 'Printed Thermal Rolls',
          desc: "Custom-branded receipts with your chain's logo and messaging",
          specs: ['Pre-printed headers/footers', 'Promotional space', 'Standardized across all stores'],
          link: '/en/thermal-paper-rolls/printed',
          cta: 'View Product',
        },
        {
          title: 'Thermal Labels',
          desc: 'Price tags and product labels for in-store use',
          specs: ['Various sizes available', 'Strong adhesive', 'Clear printing for barcodes'],
          link: '/en/thermal-labels',
          cta: 'View Product',
        },
      ],
    },
    benefits: {
      sectionTitle: 'Why Retail Chains Choose Us',
      items: [
        { icon: 'zap', title: 'High-Volume Capacity', desc: 'Production capacity to support large retail chains and continuous supply' },
        { icon: 'shield', title: 'Batch Consistency', desc: 'Strict quality control ensures uniform products across all orders' },
        { icon: 'checkCircle2', title: 'Procurement Support', desc: 'Dedicated support for chain procurement and logistics teams' },
      ],
    },
    cta: {
      headline: 'Ready to supply your supermarket chain?',
      subtext: 'Contact our retail chain team for volume pricing and supply coordination.',
      primaryButton: 'Contact Sales',
      primaryLink: '/en/contact',
      secondaryButton: 'View All Products',
      secondaryLink: '/en/products',
    },
  },

  ru: {
    seo: {
      title: 'Термобумага и этикетки для супермаркетов | Решения для торговых сетей | Zhixin',
      description: 'Термобумага и этикетки для супермаркетов и торговых сетей. Крупнообъёмные поставки для POS-систем, ценников и чеков покупателей.',
      keywords: 'термобумага для супермаркетов, термо-рулоны для торговых сетей, ценники этикетки, чековая бумага супермаркеты, крупнообъёмная термобумага, поставщик торговых сетей',
    },
    hero: {
      h1: 'Решения для супермаркетов и торговых сетей',
      subheading: 'Термобумага и этикетки для крупнообъёмных торговых операций',
      intro: 'Стандартизированные и стабильные поставки термопродукции для супермаркетов и торговых сетей с несколькими точками.',
    },
    overview: {
      sectionTitle: 'Термопродукция для супермаркетов',
      content: 'Супермаркеты и торговые сети требуют стабильных, качественных термопродуктов, которые работают одинаково во всех точках. Наша термобумага и этикетки производятся по строгим стандартам, обеспечивая единообразную работу и надёжные поставки для всей вашей сети.',
      highlights: [
        'Стандартизированные характеристики во всех партиях',
        'Высокие производственные мощности',
        'Координированная доставка в несколько точек',
        'Поддержка команд закупок сетей',
      ],
    },
    applications: {
      sectionTitle: 'Основные применения в супермаркетах',
      apps: [
        { icon: 'shoppingCart', title: 'Кассовые чеки', desc: 'Термобумага для POS-систем и чеков покупателей на кассах' },
        { icon: 'tag', title: 'Ценники и этикетки', desc: 'Термоэтикетки для цен, акций и идентификации товаров' },
        { icon: 'receipt', title: 'Брендированные чеки', desc: 'Предварительно напечатанные термо-рулоны с брендингом магазина и рекламными сообщениями' },
        { icon: 'users', title: 'Поставки в несколько точек', desc: 'Координированные цепочки поставок для торговых сетей с несколькими магазинами' },
      ],
    },
    products: {
      sectionTitle: 'Рекомендуемые продукты',
      items: [
        {
          title: 'Термобумага в рулонах',
          desc: 'Стандартная чековая бумага для POS-систем во всех точках',
          specs: ['Популярные размеры: 80мм, 57мм', 'Крупнообъёмное производство', 'Гарантированное постоянство партий'],
          link: '/ru/thermal-paper-rolls',
          cta: 'Смотреть продукт',
        },
        {
          title: 'Термо-рулоны с печатью',
          desc: 'Индивидуальные брендированные чеки с логотипом и сообщениями вашей сети',
          specs: ['Предварительно напечатанные колонтитулы', 'Рекламное пространство', 'Стандартизированы для всех магазинов'],
          link: '/ru/thermal-paper-rolls/printed',
          cta: 'Смотреть продукт',
        },
        {
          title: 'Термоэтикетки',
          desc: 'Ценники и этикетки товаров для использования в магазине',
          specs: ['Различные размеры', 'Прочный клей', 'Чёткая печать для штрихкодов'],
          link: '/ru/thermal-labels',
          cta: 'Смотреть продукт',
        },
      ],
    },
    benefits: {
      sectionTitle: 'Почему торговые сети выбирают нас',
      items: [
        { icon: 'zap', title: 'Высокие объёмы', desc: 'Производственные мощности для крупных торговых сетей и непрерывных поставок' },
        { icon: 'shield', title: 'Постоянство партий', desc: 'Строгий контроль качества обеспечивает единообразие продукции во всех заказах' },
        { icon: 'checkCircle2', title: 'Поддержка закупок', desc: 'Выделенная поддержка для команд закупок и логистики сетей' },
      ],
    },
    cta: {
      headline: 'Готовы обеспечить поставки для вашей торговой сети?',
      subtext: 'Свяжитесь с нашей командой для получения цен на объёмы и координации поставок.',
      primaryButton: 'Связаться с отделом продаж',
      primaryLink: '/ru/contact',
      secondaryButton: 'Все продукты',
      secondaryLink: '/ru/products',
    },
  },

  zh: {
    seo: {
      title: '超市热敏纸与标签 | 连锁零售解决方案 | 志信纸业',
      description: '为超市和连锁零售提供热敏纸卷和标签。为POS系统、价格标签和顾客收据提供大批量供应。',
      keywords: '超市热敏纸, 连锁零售热敏纸卷, 价格标签, 超市收据纸, 大批量热敏纸, 零售连锁供应商',
    },
    hero: {
      h1: '超市与连锁零售解决方案',
      subheading: '为高交易量零售运营提供热敏纸和标签',
      intro: '为多门店超市和连锁零售运营设计的标准化、稳定供应的热敏产品。',
    },
    overview: {
      sectionTitle: '超市运营热敏解决方案',
      content: '超市和连锁零售需要一致、高质量的热敏产品，在所有门店无缝运行。我们的热敏纸和标签按照严格规格生产，确保整个网络的统一性能和可靠供应。',
      highlights: [
        '所有批次标准化规格',
        '大批量生产能力',
        '多门店协调配送',
        '支持连锁采购团队',
      ],
    },
    applications: {
      sectionTitle: '主要超市应用',
      apps: [
        { icon: 'shoppingCart', title: '收银收据', desc: '用于POS系统和收银台顾客收据的热敏纸卷' },
        { icon: 'tag', title: '价格标签', desc: '用于定价、促销和产品识别的热敏标签' },
        { icon: 'receipt', title: '定制品牌收据', desc: '预印有商店品牌和促销信息的热敏纸卷' },
        { icon: 'users', title: '多门店供应', desc: '为多门店连锁零售协调供应链' },
      ],
    },
    products: {
      sectionTitle: '推荐产品',
      items: [
        {
          title: '热敏纸卷',
          desc: '用于所有门店POS系统的标准收据纸',
          specs: ['常见尺寸：80mm、57mm', '大批量生产', '保证批次一致性'],
          link: '/zh/thermal-paper-rolls',
          cta: '查看产品',
        },
        {
          title: '印刷热敏纸卷',
          desc: '带有您连锁店logo和信息的定制品牌收据',
          specs: ['预印页眉/页脚', '促销空间', '所有门店标准化'],
          link: '/zh/thermal-paper-rolls/printed',
          cta: '查看产品',
        },
        {
          title: '热敏标签',
          desc: '用于店内使用的价格标签和产品标签',
          specs: ['多种尺寸可选', '强力粘性', '清晰打印条码'],
          link: '/zh/thermal-labels',
          cta: '查看产品',
        },
      ],
    },
    benefits: {
      sectionTitle: '为什么连锁零售选择我们',
      items: [
        { icon: 'zap', title: '大批量产能', desc: '生产能力支持大型连锁零售和持续供应' },
        { icon: 'shield', title: '批次一致性', desc: '严格质量控制确保所有订单产品统一' },
        { icon: 'checkCircle2', title: '采购支持', desc: '为连锁采购和物流团队提供专项支持' },
      ],
    },
    cta: {
      headline: '准备为您的超市连锁供应？',
      subtext: '联系我们的连锁零售团队获取批量定价和供应协调。',
      primaryButton: '联系销售',
      primaryLink: '/zh/contact',
      secondaryButton: '查看所有产品',
      secondaryLink: '/zh/products',
    },
  },
};
