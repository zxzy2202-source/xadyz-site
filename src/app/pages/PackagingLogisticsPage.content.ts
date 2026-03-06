/**
 * PackagingLogisticsPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface StandardItem {
  icon: string;
  title: string;
  description: string;
}

export interface DocumentItem {
  icon: string;
  title: string;
  description: string;
}

export interface ShippingItem {
  icon: string;
  title: string;
  time: string;
  description: string;
}

export interface ToolItem {
  icon: string;
  title: string;
  description: string;
}

export interface PhotoItem {
  key: string;
  title: string;
  description: string;
  placeholderKey: string;
}

export interface PackagingLogisticsContent {
  hero: { title: string; subtitle: string; description: string };
  seo: { titleSuffix: string; keywords: string };
  standards: { title: string; description: string; items: StandardItem[] };
  documentation: { title: string; description: string; items: DocumentItem[] };
  shipping: { title: string; description: string; items: ShippingItem[] };
  tools: { title: string; description: string; items: ToolItem[] };
  photos: { title: string; description: string; items: PhotoItem[] };
  cta: { title: string; description: string; button: string };
}

export const content: Record<Lang, PackagingLogisticsContent> = {
  en: {
    hero: {
      title: 'Packaging & Export Logistics',
      subtitle: 'Complete Guide for International Shipping',
      description: 'Comprehensive information on export packaging standards, logistics documentation, and shipping solutions for CIS markets.',
    },
    seo: {
      titleSuffix: 'Zhixin Paper - B2B Thermal Paper Supplier',
      keywords: 'export packaging standards, logistics documentation, container loading, sea freight, rail freight, CIS shipping, thermal paper export',
    },
    standards: {
      title: 'Export Packaging Standards',
      description: 'Professional packaging solutions to ensure product safety during international transport',
      items: [
        { icon: 'package', title: 'Export Wooden Crates', description: 'Fumigated wooden crates meeting ISPM 15 standards for international shipping.' },
        { icon: 'package', title: 'Pallet Loading', description: 'Optimized pallet configurations for container loading and warehouse efficiency.' },
        { icon: 'package', title: 'Moisture Protection', description: 'Waterproof wrapping and desiccants to protect products during sea freight.' },
      ],
    },
    documentation: {
      title: 'Logistics Documentation',
      description: 'Essential documents for smooth customs clearance and delivery',
      items: [
        { icon: 'file', title: 'Commercial Invoice', description: 'Detailed product specifications, pricing, and shipping terms.' },
        { icon: 'file', title: 'Packing List', description: 'Complete inventory of cartons, dimensions, and weights.' },
        { icon: 'file', title: 'Certificate of Origin', description: 'Form A or standard CO for preferential tariff treatment.' },
        { icon: 'file', title: 'Bill of Lading', description: 'Ocean or rail B/L as proof of shipment and title document.' },
      ],
    },
    shipping: {
      title: 'Shipping Options',
      description: 'Flexible logistics solutions for Russia and CIS countries',
      items: [
        { icon: 'ship', title: 'Sea Freight', time: '25-35 days', description: 'Most economical option for bulk orders. Direct routes to major Russian ports.' },
        { icon: 'truck', title: 'Rail Freight', time: '18-25 days', description: 'Balanced option combining speed and cost. China-Europe railway network.' },
        { icon: 'truck', title: 'Air Freight', time: '5-7 days', description: 'Fastest delivery for urgent orders. Direct flights to Moscow, St. Petersburg.' },
      ],
    },
    tools: {
      title: 'Logistics Calculators',
      description: 'Practical tools to plan your shipments',
      items: [
        { icon: 'calculator', title: 'Container Loading Calculator', description: 'Calculate optimal pallet configuration for 20ft/40ft containers.' },
        { icon: 'calculator', title: 'Freight Cost Estimator', description: 'Estimate shipping costs for different modes and destinations.' },
        { icon: 'calculator', title: 'Lead Time Calculator', description: 'Calculate total delivery time including production and transit.' },
      ],
    },
    photos: {
      title: 'Packaging & Logistics Photos',
      description: 'Visual examples of how your goods are packed and loaded before shipment',
      items: [
        { key: 'inner', title: 'Inner Packing', description: 'Example of inner packing for individual rolls or bundles.', placeholderKey: 'packaging_inner_packing' },
        { key: 'carton', title: 'Carton Packing', description: 'Standard export cartons with labels and protection.', placeholderKey: 'packaging_carton_packing' },
        { key: 'pallet', title: 'Palletizing', description: 'Stretch-wrapped pallets ready for warehouse handling.', placeholderKey: 'packaging_pallet_packing' },
        { key: 'shipping', title: 'Logistics & Loading', description: 'Container loading and final shipment preparation.', placeholderKey: 'packaging_logistics_shipping' },
      ],
    },
    cta: {
      title: 'Need Logistics Support?',
      description: 'Our experienced team can help with customs clearance, documentation, and door-to-door delivery',
      button: 'Contact Logistics Team',
    },
  },

  ru: {
    hero: {
      title: 'Упаковка и экспортная логистика',
      subtitle: 'Полное руководство по международной доставке',
      description: 'Исчерпывающая информация о стандартах экспортной упаковки, логистической документации и решениях для доставки на рынки СНГ.',
    },
    seo: {
      titleSuffix: 'Zhixin Paper - Поставщик термобумаги B2B',
      keywords: 'экспортная упаковка, логистическая документация, загрузка контейнера, морские перевозки, железнодорожные перевозки, доставка в СНГ, экспорт термобумаги',
    },
    standards: {
      title: 'Стандарты экспортной упаковки',
      description: 'Профессиональные упаковочные решения для обеспечения безопасности продукции при международной транспортировке',
      items: [
        { icon: 'package', title: 'Экспортные деревянные ящики', description: 'Фумигированные деревянные ящики, соответствующие стандартам ISPM 15 для международных перевозок.' },
        { icon: 'package', title: 'Погрузка на паллеты', description: 'Оптимизированные конфигурации паллет для загрузки контейнеров и складской эффективности.' },
        { icon: 'package', title: 'Защита от влаги', description: 'Водонепроницаемая упаковка и осушители для защиты продукции при морских перевозках.' },
      ],
    },
    documentation: {
      title: 'Логистическая документация',
      description: 'Необходимые документы для плавного таможенного оформления и доставки',
      items: [
        { icon: 'file', title: 'Коммерческий инвойс', description: 'Подробные характеристики продукции, цены и условия доставки.' },
        { icon: 'file', title: 'Упаковочный лист', description: 'Полная инвентаризация коробок, размеров и весов.' },
        { icon: 'file', title: 'Сертификат происхождения', description: 'Форма A или стандартный СО для преференциального тарифного режима.' },
        { icon: 'file', title: 'Коносамент', description: 'Морской или железнодорожный коносамент как подтверждение отправки и правоустанавливающий документ.' },
      ],
    },
    shipping: {
      title: 'Варианты доставки',
      description: 'Гибкие логистические решения для России и стран СНГ',
      items: [
        { icon: 'ship', title: 'Морские перевозки', time: '25-35 дней', description: 'Наиболее экономичный вариант для оптовых заказов. Прямые маршруты в крупные российские порты.' },
        { icon: 'truck', title: 'Железнодорожные перевозки', time: '18-25 дней', description: 'Сбалансированный вариант, сочетающий скорость и стоимость. Сеть железных дорог Китай-Европа.' },
        { icon: 'truck', title: 'Авиаперевозки', time: '5-7 дней', description: 'Самая быстрая доставка для срочных заказов. Прямые рейсы в Москву, Санкт-Петербург.' },
      ],
    },
    tools: {
      title: 'Логистические калькуляторы',
      description: 'Практические инструменты для планирования ваших отправок',
      items: [
        { icon: 'calculator', title: 'Калькулятор загрузки контейнера', description: 'Рассчитайте оптимальную конфигурацию паллет для контейнеров 20ft/40ft.' },
        { icon: 'calculator', title: 'Оценка стоимости доставки', description: 'Оцените стоимость доставки для различных способов и направлений.' },
        { icon: 'calculator', title: 'Калькулятор сроков доставки', description: 'Рассчитайте общее время доставки, включая производство и транзит.' },
      ],
    },
    photos: {
      title: 'Фото упаковки и логистики',
      description: 'Примеры внутренней упаковки, коробок, паллетирования и загрузки контейнеров',
      items: [
        { key: 'inner', title: 'Внутренняя упаковка', description: 'Пример внутренней упаковки рулонов или комплектов.', placeholderKey: 'packaging_inner_packing' },
        { key: 'carton', title: 'Картонные коробки', description: 'Стандартные экспортные коробки с маркировкой и защитой.', placeholderKey: 'packaging_carton_packing' },
        { key: 'pallet', title: 'Укладка на паллеты', description: 'Паллеты, обмотанные стретч-пленкой, готовые к складской обработке.', placeholderKey: 'packaging_pallet_packing' },
        { key: 'shipping', title: 'Логистика и погрузка', description: 'Погрузка контейнера и финальная подготовка к отгрузке.', placeholderKey: 'packaging_logistics_shipping' },
      ],
    },
    cta: {
      title: 'Нужна логистическая поддержка?',
      description: 'Наша опытная команда может помочь с таможенным оформлением, документацией и доставкой до двери',
      button: 'Связаться с отделом логистики',
    },
  },

  zh: {
    hero: {
      title: '包装与出口物流',
      subtitle: '国际运输完整指南',
      description: '关于出口包装标准、物流文档和独联体市场运输解决方案的全面信息。',
    },
    seo: {
      titleSuffix: '志信纸业 - B2B热敏纸供应商',
      keywords: '出口包装标准, 物流文档, 集装箱装载, 海运, 铁路运输, 独联体运输, 热敏纸出口',
    },
    standards: {
      title: '出口包装标准',
      description: '专业的包装解决方案，确保产品在国际运输中的安全',
      items: [
        { icon: 'package', title: '出口木箱', description: '符合ISPM 15标准的熏蒸木箱，用于国际运输。' },
        { icon: 'package', title: '托盘装载', description: '优化的托盘配置，提高集装箱装载和仓库效率。' },
        { icon: 'package', title: '防潮保护', description: '防水包装和干燥剂，保护产品在海运过程中不受潮。' },
      ],
    },
    documentation: {
      title: '物流文档',
      description: '顺利清关和交付所需的重要文件',
      items: [
        { icon: 'file', title: '商业发票', description: '详细的产品规格、价格和运输条款。' },
        { icon: 'file', title: '装箱单', description: '纸箱、尺寸和重量的完整清单。' },
        { icon: 'file', title: '原产地证明', description: 'A表或标准CO，用于优惠关税待遇。' },
        { icon: 'file', title: '提单', description: '海运或铁路提单作为装运证明和所有权文件。' },
      ],
    },
    shipping: {
      title: '运输选项',
      description: '针对俄罗斯和独联体国家的灵活物流解决方案',
      items: [
        { icon: 'ship', title: '海运', time: '25-35天', description: '大批量订单最经济的选择。直达俄罗斯主要港口的航线。' },
        { icon: 'truck', title: '铁路运输', time: '18-25天', description: '兼顾速度和成本的平衡选择。中欧铁路网络。' },
        { icon: 'truck', title: '空运', time: '5-7天', description: '紧急订单的最快交付方式。直飞莫斯科、圣彼得堡。' },
      ],
    },
    tools: {
      title: '物流计算器',
      description: '规划您的货运的实用工具',
      items: [
        { icon: 'calculator', title: '集装箱装载计算器', description: '计算20英尺/40英尺集装箱的最佳托盘配置。' },
        { icon: 'calculator', title: '运费估算器', description: '估算不同运输方式和目的地的运输成本。' },
        { icon: 'calculator', title: '交货期计算器', description: '计算包括生产和运输在内的总交货时间。' },
      ],
    },
    photos: {
      title: '包装与物流实拍',
      description: '从内包装、纸箱、托盘到装柜发运的完整展示',
      items: [
        { key: 'inner', title: '内包装', description: '展示单卷/小包的内包装形式。', placeholderKey: 'packaging_inner_packing' },
        { key: 'carton', title: '纸箱包装', description: '标准出口纸箱的码放与标识。', placeholderKey: 'packaging_carton_packing' },
        { key: 'pallet', title: '托盘打包', description: '拉伸膜包裹后的整托展示。', placeholderKey: 'packaging_pallet_packing' },
        { key: 'shipping', title: '物流发货', description: '装柜/装车及发运现场照片。', placeholderKey: 'packaging_logistics_shipping' },
      ],
    },
    cta: {
      title: '需要物流支持？',
      description: '我们经验丰富的团队可以帮助您处理清关、文档和门到门配送',
      button: '联系物流团队',
    },
  },
};
