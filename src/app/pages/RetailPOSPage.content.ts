/**
 * RetailPOSPage 三语言内容数据
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

export interface RetailPOSContent {
  seo: { title: string; description: string; keywords: string };
  hero: { h1: string; subheading: string; intro: string };
  overview: { sectionTitle: string; content: string; highlights: string[] };
  applications: { sectionTitle: string; apps: AppItem[] };
  products: { sectionTitle: string; items: ProductItem[] };
  benefits: { sectionTitle: string; items: BenefitItem[] };
  cta: { headline: string; subtext: string; primaryButton: string; primaryLink: string; secondaryButton: string; secondaryLink: string };
}

export const content: Record<Lang, RetailPOSContent> = {
  en: {
    seo: {
      title: 'Retail & POS Thermal Paper Solutions | Receipt Paper for Retail Stores | Zhixin',
      description: 'High-quality thermal paper rolls for retail POS systems, receipt printers, and daily transactions. Factory-direct supply with custom printing options.',
      keywords: 'retail thermal paper, POS receipt paper, retail receipt rolls, thermal paper for stores, custom printed receipts, POS thermal solutions',
    },
    hero: {
      h1: 'Retail & POS Solutions',
      subheading: 'Thermal paper rolls for receipt printing and daily transactions',
      intro: 'Reliable thermal paper solutions for retail stores, POS systems, and high-volume transaction environments.',
    },
    overview: {
      sectionTitle: 'Thermal Paper for Retail Operations',
      content: 'Our thermal paper rolls are designed specifically for retail point-of-sale systems, supporting millions of daily transactions across stores of all sizes. From small retailers to large chain operations, we provide consistent quality and reliable supply.',
      highlights: [
        'High-speed printing compatibility',
        'Clear, long-lasting print quality',
        'Standard and custom sizes available',
        'Custom branding options',
      ],
    },
    applications: {
      sectionTitle: 'Key Retail Applications',
      apps: [
        { icon: 'store', title: 'Retail Stores', desc: 'Receipt paper for daily transactions, returns, and customer records' },
        { icon: 'creditCard', title: 'POS Systems', desc: 'Compatible with all major POS terminals and receipt printers' },
        { icon: 'shoppingBag', title: 'Chain Retail', desc: 'Standardized supply for multi-location retail operations' },
        { icon: 'receipt', title: 'Custom Receipts', desc: 'Branded receipts with logos, promotions, and store information' },
      ],
    },
    products: {
      sectionTitle: 'Recommended Products',
      items: [
        {
          title: 'Blank Thermal Rolls',
          desc: 'Standard thermal paper rolls ready for printing',
          specs: ['Common sizes: 80mm, 57mm', 'Various roll lengths available', 'Compatible with all thermal printers'],
          link: '/en/thermal-paper-rolls/blank',
          cta: 'View Product',
        },
        {
          title: 'Printed Thermal Rolls',
          desc: 'Custom-printed thermal rolls with your branding',
          specs: ['Logo printing', 'Promotional messages', 'Store information pre-printed'],
          link: '/en/thermal-paper-rolls/printed',
          cta: 'View Product',
        },
      ],
    },
    benefits: {
      sectionTitle: 'Why Choose Our Retail Solutions',
      items: [
        { icon: 'zap', title: 'Fast Production', desc: 'Quick turnaround for standard and custom orders' },
        { icon: 'shield', title: 'Consistent Quality', desc: 'Batch-to-batch consistency for reliable performance' },
        { icon: 'checkCircle2', title: 'Flexible Supply', desc: 'From small batches to container-load volumes' },
      ],
    },
    cta: {
      headline: 'Ready to source thermal paper for your retail operations?',
      subtext: 'Get a quote or request samples for your POS systems.',
      primaryButton: 'Request Quote',
      primaryLink: '/en/contact',
      secondaryButton: 'View All Products',
      secondaryLink: '/en/products',
    },
  },

  ru: {
    seo: {
      title: 'Термобумага для ритейла и POS | Чековая бумага для магазинов | Zhixin',
      description: 'Качественные термо-рулоны для POS-систем, чековых принтеров и ежедневных транзакций. Прямые поставки с завода с возможностью индивидуальной печати.',
      keywords: 'термобумага для ритейла, чековая бумага POS, рулоны для чеков, термобумага для магазинов, чеки с печатью, термобумага для кассовых систем',
    },
    hero: {
      h1: 'Решения для ритейла и POS',
      subheading: 'Термобумага в рулонах для печати чеков и ежедневных транзакций',
      intro: 'Надёжные решения для розничных магазинов, POS-систем и высоконагруженных торговых точек.',
    },
    overview: {
      sectionTitle: 'Термобумага для торговых операций',
      content: 'Наши термо-рулоны разработаны специально для розничных POS-систем и поддерживают миллионы ежедневных транзакций в магазинах любого масштаба. От небольших магазинов до крупных торговых сетей — мы обеспечиваем стабильное качество и надёжные поставки.',
      highlights: [
        'Совместимость с высокоскоростной печатью',
        'Чёткое и долговечное качество печати',
        'Стандартные и индивидуальные размеры',
        'Возможность нанесения брендинга',
      ],
    },
    applications: {
      sectionTitle: 'Основные применения в ритейле',
      apps: [
        { icon: 'store', title: 'Розничные магазины', desc: 'Чековая бумага для ежедневных транзакций, возвратов и клиентских записей' },
        { icon: 'creditCard', title: 'POS-системы', desc: 'Совместимы со всеми основными POS-терминалами и чековыми принтерами' },
        { icon: 'shoppingBag', title: 'Торговые сети', desc: 'Стандартизированные поставки для сетей с несколькими точками' },
        { icon: 'receipt', title: 'Кастомные чеки', desc: 'Брендированные чеки с логотипами, акциями и информацией о магазине' },
      ],
    },
    products: {
      sectionTitle: 'Рекомендуемые продукты',
      items: [
        {
          title: 'Пустые термо-рулоны',
          desc: 'Стандартные термо-рулоны, готовые к печати',
          specs: ['Популярные размеры: 80мм, 57мм', 'Различная длина рулонов', 'Совместимы со всеми термопринтерами'],
          link: '/ru/thermal-paper-rolls/blank',
          cta: 'Смотреть продукт',
        },
        {
          title: 'Термо-рулоны с печатью',
          desc: 'Индивидуальная печать с вашим брендингом',
          specs: ['Печать логотипа', 'Рекламные сообщения', 'Предварительно напечатанная информация о магазине'],
          link: '/ru/thermal-paper-rolls/printed',
          cta: 'Смотреть продукт',
        },
      ],
    },
    benefits: {
      sectionTitle: 'Почему выбирают наши решения для ритейла',
      items: [
        { icon: 'zap', title: 'Быстрое производство', desc: 'Короткие сроки для стандартных и индивидуальных заказов' },
        { icon: 'shield', title: 'Стабильное качество', desc: 'Постоянство качества от партии к партии' },
        { icon: 'checkCircle2', title: 'Гибкие поставки', desc: 'От небольших партий до контейнерных объёмов' },
      ],
    },
    cta: {
      headline: 'Готовы заказать термобумагу для ваших магазинов?',
      subtext: 'Получите коммерческое предложение или запросите образцы для ваших POS-систем.',
      primaryButton: 'Запросить КП',
      primaryLink: '/ru/contact',
      secondaryButton: 'Все продукты',
      secondaryLink: '/ru/products',
    },
  },

  zh: {
    seo: {
      title: '零售与POS热敏纸解决方案 | 收据纸供应 | 志信纸业',
      description: '为零售POS系统、收据打印机和日常交易提供优质热敏纸卷。工厂直供，支持定制印刷。',
      keywords: '零售热敏纸, POS收据纸, 零售收据卷, 商店热敏纸, 定制印刷收据, POS热敏解决方案',
    },
    hero: {
      h1: '零售与POS解决方案',
      subheading: '用于收据打印和日常交易的热敏纸卷',
      intro: '为零售商店、POS系统和高交易量环境提供可靠的热敏纸解决方案。',
    },
    overview: {
      sectionTitle: '零售运营热敏纸',
      content: '我们的热敏纸卷专为零售POS系统设计，支持各种规模商店的数百万日常交易。从小型零售商到大型连锁店，我们提供一致的品质和可靠的供应。',
      highlights: [
        '兼容高速打印',
        '清晰持久的打印质量',
        '标准和定制尺寸可选',
        '支持定制品牌选项',
      ],
    },
    applications: {
      sectionTitle: '主要零售应用',
      apps: [
        { icon: 'store', title: '零售商店', desc: '用于日常交易、退货和客户记录的收据纸' },
        { icon: 'creditCard', title: 'POS系统', desc: '兼容所有主流POS终端和收据打印机' },
        { icon: 'shoppingBag', title: '连锁零售', desc: '为多门店零售运营提供标准化供应' },
        { icon: 'receipt', title: '定制收据', desc: '印有logo、促销信息和商店信息的品牌收据' },
      ],
    },
    products: {
      sectionTitle: '推荐产品',
      items: [
        {
          title: '空白热敏纸卷',
          desc: '标准热敏纸卷，可直接打印',
          specs: ['常见尺寸：80mm、57mm', '多种卷长可选', '兼容所有热敏打印机'],
          link: '/zh/thermal-paper-rolls/blank',
          cta: '查看产品',
        },
        {
          title: '印刷热敏纸卷',
          desc: '带有您品牌的定制印刷热敏纸卷',
          specs: ['Logo印刷', '促销信息', '预印商店信息'],
          link: '/zh/thermal-paper-rolls/printed',
          cta: '查看产品',
        },
      ],
    },
    benefits: {
      sectionTitle: '为什么选择我们的零售解决方案',
      items: [
        { icon: 'zap', title: '快速生产', desc: '标准和定制订单快速交付' },
        { icon: 'shield', title: '一致品质', desc: '批次间品质一致，性能可靠' },
        { icon: 'checkCircle2', title: '灵活供应', desc: '从小批量到整柜货量' },
      ],
    },
    cta: {
      headline: '准备为您的零售运营采购热敏纸？',
      subtext: '获取报价或为您的POS系统申请样品。',
      primaryButton: '索取报价',
      primaryLink: '/zh/contact',
      secondaryButton: '查看所有产品',
      secondaryLink: '/zh/products',
    },
  },
};
