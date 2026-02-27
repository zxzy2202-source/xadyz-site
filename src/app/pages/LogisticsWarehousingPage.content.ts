/**
 * LogisticsWarehousingPage 三语言内容数据
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

export interface LogisticsWarehousingContent {
  seo: { title: string; description: string; keywords: string };
  hero: { h1: string; subheading: string; intro: string };
  overview: { sectionTitle: string; content: string; highlights: string[] };
  applications: { sectionTitle: string; apps: AppItem[] };
  products: { sectionTitle: string; items: ProductItem[] };
  benefits: { sectionTitle: string; items: BenefitItem[] };
  cta: { headline: string; subtext: string; primaryButton: string; primaryLink: string; secondaryButton: string; secondaryLink: string };
}

export const content: Record<Lang, LogisticsWarehousingContent> = {
  en: {
    seo: {
      title: 'Logistics & Warehousing Thermal Labels | Shipping Labels & Barcode Solutions | Zhixin',
      description: 'High-performance thermal labels for logistics, shipping, tracking, and warehouse management. Compatible with major label printers and barcode systems.',
      keywords: 'logistics thermal labels, shipping labels, warehouse labels, barcode labels, tracking labels, thermal labels 4x6, logistics label rolls',
    },
    hero: {
      h1: 'Logistics & Warehousing Solutions',
      subheading: 'Thermal labels for shipping, tracking, and warehouse operations',
      intro: 'Durable and reliable thermal label solutions for high-volume logistics operations, from shipping to inventory management.',
    },
    overview: {
      sectionTitle: 'Thermal Labels for Logistics Operations',
      content: 'Our thermal label products are engineered for the demanding requirements of logistics and warehousing operations. From express delivery to long-term inventory tracking, our labels provide clear printing, strong adhesion, and reliable performance in various environments.',
      highlights: [
        'Compatible with Zebra, Datamax, and other major printers',
        'Strong adhesive for secure attachment',
        'Clear barcode and text printing',
        'Standard sizes: 4×6", 100×150mm, 100×100mm',
      ],
    },
    applications: {
      sectionTitle: 'Key Logistics Applications',
      apps: [
        { icon: 'truck', title: 'Express Delivery', desc: 'Shipping labels for courier services and express delivery operations' },
        { icon: 'package', title: 'Warehouse Management', desc: 'Inventory labels for tracking and identification in warehouses' },
        { icon: 'barcode', title: 'Barcode Printing', desc: 'High-resolution barcode labels for scanning and tracking systems' },
        { icon: 'mapPin', title: 'Address Labels', desc: 'Pre-printed or blank address labels for shipment identification' },
      ],
    },
    products: {
      sectionTitle: 'Recommended Products',
      items: [
        {
          title: 'Blank Thermal Labels',
          desc: 'Standard thermal label rolls for printing shipping information',
          specs: ['Common sizes: 4×6", 100×150mm', 'Compatible with all thermal label printers', 'Various adhesive options'],
          link: '/en/thermal-labels/blank',
          cta: 'View Product',
        },
        {
          title: 'Printed Thermal Labels',
          desc: 'Custom-printed labels with logos, company info, or fixed fields',
          specs: ['Pre-printed branding', 'Custom layout design', 'Reduced printing time'],
          link: '/en/thermal-labels/printed',
          cta: 'View Product',
        },
      ],
    },
    benefits: {
      sectionTitle: 'Why Choose Our Logistics Solutions',
      items: [
        { icon: 'zap', title: 'High-Speed Printing', desc: 'Optimized for fast label production in busy logistics centers' },
        { icon: 'shield', title: 'Reliable Adhesion', desc: 'Strong adhesive that stays secure during transit' },
        { icon: 'checkCircle2', title: 'Flexible Supply', desc: 'From small batches to container volumes for large operations' },
      ],
    },
    cta: {
      headline: 'Ready to source thermal labels for your logistics operations?',
      subtext: 'Get a quote or request samples for your label printers.',
      primaryButton: 'Request Quote',
      primaryLink: '/en/contact',
      secondaryButton: 'View All Products',
      secondaryLink: '/en/products',
    },
  },

  ru: {
    seo: {
      title: 'Термоэтикетки для логистики и склада | Транспортные этикетки | Zhixin',
      description: 'Высокопроизводительные термоэтикетки для логистики, доставки, отслеживания и управления складом. Совместимы с основными принтерами этикеток и системами штрихкодов.',
      keywords: 'логистические термоэтикетки, транспортные этикетки, складские этикетки, этикетки штрихкода, этикетки отслеживания, термоэтикетки 4x6, рулоны логистических этикеток',
    },
    hero: {
      h1: 'Решения для логистики и склада',
      subheading: 'Термоэтикетки для доставки, отслеживания и складских операций',
      intro: 'Прочные и надёжные термоэтикетки для высоконагруженных логистических операций — от доставки до управления запасами.',
    },
    overview: {
      sectionTitle: 'Термоэтикетки для логистических операций',
      content: 'Наши термоэтикетки разработаны с учётом высоких требований логистических и складских операций. От экспресс-доставки до долгосрочного учёта запасов — наши этикетки обеспечивают чёткую печать, прочную адгезию и надёжную работу в различных условиях.',
      highlights: [
        'Совместимы с Zebra, Datamax и другими основными принтерами',
        'Прочный клей для надёжного крепления',
        'Чёткая печать штрихкодов и текста',
        'Стандартные размеры: 4×6", 100×150мм, 100×100мм',
      ],
    },
    applications: {
      sectionTitle: 'Основные применения в логистике',
      apps: [
        { icon: 'truck', title: 'Экспресс-доставка', desc: 'Транспортные этикетки для курьерских служб и экспресс-доставки' },
        { icon: 'package', title: 'Управление складом', desc: 'Инвентарные этикетки для учёта и идентификации на складе' },
        { icon: 'barcode', title: 'Печать штрихкодов', desc: 'Высококачественные этикетки со штрихкодами для систем сканирования' },
        { icon: 'mapPin', title: 'Адресные этикетки', desc: 'Предварительно напечатанные или пустые адресные этикетки для идентификации отправлений' },
      ],
    },
    products: {
      sectionTitle: 'Рекомендуемые продукты',
      items: [
        {
          title: 'Пустые термоэтикетки',
          desc: 'Стандартные рулоны термоэтикеток для печати транспортной информации',
          specs: ['Популярные размеры: 4×6", 100×150мм', 'Совместимы со всеми принтерами термоэтикеток', 'Различные варианты клея'],
          link: '/ru/thermal-labels/blank',
          cta: 'Смотреть продукт',
        },
        {
          title: 'Термоэтикетки с печатью',
          desc: 'Индивидуальная печать с логотипами, информацией о компании или фиксированными полями',
          specs: ['Предварительно напечатанный брендинг', 'Индивидуальная разработка макета', 'Сокращение времени печати'],
          link: '/ru/thermal-labels/printed',
          cta: 'Смотреть продукт',
        },
      ],
    },
    benefits: {
      sectionTitle: 'Почему выбирают наши решения для логистики',
      items: [
        { icon: 'zap', title: 'Высокоскоростная печать', desc: 'Оптимизированы для быстрого производства этикеток в загруженных логистических центрах' },
        { icon: 'shield', title: 'Надёжное крепление', desc: 'Прочный клей, который надёжно держится во время транспортировки' },
        { icon: 'checkCircle2', title: 'Гибкие поставки', desc: 'От небольших партий до контейнерных объёмов для крупных операций' },
      ],
    },
    cta: {
      headline: 'Готовы заказать термоэтикетки для ваших логистических операций?',
      subtext: 'Получите коммерческое предложение или запросите образцы для ваших принтеров этикеток.',
      primaryButton: 'Запросить КП',
      primaryLink: '/ru/contact',
      secondaryButton: 'Все продукты',
      secondaryLink: '/ru/products',
    },
  },

  zh: {
    seo: {
      title: '物流与仓储热敏标签 | 快递标签和条码解决方案 | 志信纸业',
      description: '为物流、快递、追踪和仓库管理提供高性能热敏标签。兼容主流标签打印机和条码系统。',
      keywords: '物流热敏标签, 快递标签, 仓储标签, 条码标签, 追踪标签, 热敏标签4x6, 物流标签卷',
    },
    hero: {
      h1: '物流与仓储解决方案',
      subheading: '用于快递、追踪和仓库运营的热敏标签',
      intro: '为高交易量物流运营提供耐用可靠的热敏标签解决方案，从快递到库存管理。',
    },
    overview: {
      sectionTitle: '物流运营热敏标签',
      content: '我们的热敏标签产品专为物流和仓储运营的严格要求而设计。从快递到长期库存追踪，我们的标签提供清晰打印、强力粘附和在各种环境下的可靠性能。',
      highlights: [
        '兼容Zebra、Datamax等主流打印机',
        '强力粘性，确保牢固附着',
        '清晰的条码和文本打印',
        '标准尺寸：4×6英寸、100×150mm、100×100mm',
      ],
    },
    applications: {
      sectionTitle: '主要物流应用',
      apps: [
        { icon: 'truck', title: '快递配送', desc: '用于快递服务和快速配送运营的运单标签' },
        { icon: 'package', title: '仓库管理', desc: '用于仓库追踪和识别的库存标签' },
        { icon: 'barcode', title: '条码打印', desc: '用于扫描和追踪系统的高分辨率条码标签' },
        { icon: 'mapPin', title: '地址标签', desc: '预印或空白地址标签，用于货物识别' },
      ],
    },
    products: {
      sectionTitle: '推荐产品',
      items: [
        {
          title: '空白热敏标签',
          desc: '用于打印快递信息的标准热敏标签卷',
          specs: ['常见尺寸：4×6英寸、100×150mm', '兼容所有热敏标签打印机', '多种粘性选项'],
          link: '/zh/thermal-labels/blank',
          cta: '查看产品',
        },
        {
          title: '印刷热敏标签',
          desc: '带有logo、公司信息或固定字段的定制印刷标签',
          specs: ['预印品牌信息', '定制版式设计', '减少打印时间'],
          link: '/zh/thermal-labels/printed',
          cta: '查看产品',
        },
      ],
    },
    benefits: {
      sectionTitle: '为什么选择我们的物流解决方案',
      items: [
        { icon: 'zap', title: '高速打印', desc: '针对繁忙物流中心的快速标签生产进行优化' },
        { icon: 'shield', title: '可靠粘附', desc: '强力粘合剂，在运输过程中保持安全' },
        { icon: 'checkCircle2', title: '灵活供应', desc: '从小批量到大规模运营的整柜货量' },
      ],
    },
    cta: {
      headline: '准备为您的物流运营采购热敏标签？',
      subtext: '获取报价或为您的标签打印机申请样品。',
      primaryButton: '索取报价',
      primaryLink: '/zh/contact',
      secondaryButton: '查看所有产品',
      secondaryLink: '/zh/products',
    },
  },
};
