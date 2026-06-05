/**
 * ProductionPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface ShippingFeature {
  label: string;
  desc: string;
}

export interface FactoryStat {
  value: string;
  label: string;
  icon: string;
}

export interface ProductionLine {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface ProductionContent {
  title: string;
  desc: string;
  h1: string;
  heroDesc: string;
  capacityTitle: string;
  capacities: string[];
  qcTitle: string;
  qcDesc: string;
  qcIntro: string;
  qcPoints: string[];
  shippingTitle: string;
  shippingIntro: string;
  shippingFeatures: ShippingFeature[];
  cooperationTitle: string;
  factoryTitle: string;
  factoryIntro: string;
  factoryStats: FactoryStat[];
  productionTitle: string;
  productionIntro: string;
  lines: ProductionLine[];
}

export const content: Record<Lang, ProductionContent> = {
  en: {
    title: 'Paper Production & Factory | Zhixin Paper',
    desc: 'Own production of thermal paper and labels in China. Modern equipment, quality control, packaging, and export worldwide.',
    h1: 'Own Production of Thermal Paper and Labels in China',
    heroDesc: 'Zhixin Paper is a manufacturer with its own factory in China. We control the entire process from cutting and printing to packaging and shipping.',
    capacityTitle: 'Production Capacity',
    capacities: ['High-speed cutting lines', 'Multi-color label printing lines', 'High-precision die-cutting equipment', 'Automated packaging systems', 'Professional production team'],
    qcTitle: 'Quality Control',
    qcDesc: 'Each batch of products undergoes multi-stage quality control before packaging and shipment.',
    qcIntro: 'We have implemented a 5-stage quality control system. Each product is checked for density, thermal print clarity, and adhesive layer strength.',
    qcPoints: ['Raw material incoming inspection', 'In-process sampling', 'Full product inspection', 'Pre-packaging re-check', 'Final inspection before dispatch'],
    shippingTitle: 'Packaging & Logistics',
    shippingIntro: 'Reliable export packaging (moisture-resistant film, reinforced pallets). We guarantee cargo safety during sea and rail transportation to Russia and CIS countries.',
    shippingFeatures: [
      { label: 'Moisture-Resistant Packaging', desc: 'Multi-layer moisture barrier for long sea freight and storage.' },
      { label: 'Reinforced Pallets', desc: 'Reinforced wood/plastic pallets for safe handling and transport.' },
    ],
    cooperationTitle: 'Cooperation',
    factoryTitle: 'Factory Facilities',
    factoryIntro: 'We own a modern manufacturing facility in China with comprehensive production lines and warehousing logistics, ensuring product quality and delivery efficiency.',
    factoryStats: [
      { value: '10,000+ sqm', label: 'Modern factory space', icon: 'factory' },
      { value: '30+ tons/day', label: 'Daily production capacity', icon: 'zap' },
      { value: '5,000+ tons', label: 'Warehousing capacity', icon: 'package' },
    ],
    productionTitle: 'Main Production Lines',
    productionIntro: 'We are equipped with various advanced production equipment covering the full process from thermal paper slitting to label printing and die-cutting.',
    lines: [
      { icon: 'settings', title: 'High-Speed Thermal Paper Slitting Lines', desc: 'Equipped with multiple imported high-speed slitting machines, max width 1650mm, slitting precision ±0.5mm, max speed 300m/min.', tags: ['Imported Equipment', 'High Precision', 'Large Width'] },
      { icon: 'package', title: 'Multi-Color Label Printing Lines', desc: 'Flexographic printing machines support 1-6 color printing, max printing width 420mm, supporting various printing methods like roll-to-roll and roll-to-sheet.', tags: ['Multi-Color', 'Flexography', 'Custom Printing'] },
      { icon: 'shield', title: 'High-Precision Die-Cutting Equipment', desc: 'Automatic die-cutting machines equipped with servo drive systems, die-cutting precision ±0.1mm, suitable for various shaped labels and complex die-cutting requirements.', tags: ['±0.1mm Precision', 'Automation', 'Custom Shapes'] },
    ],
  },

  ru: {
    title: 'Производство термобумаги и термоэтикеток | Завод Zhixin Paper',
    desc: 'Собственное производство термобумаги, термоэтикеток и jumbo рулонов в Китае. Современное оборудование, контроль качества, упаковка и экспорт в Россию и страны СНГ.',
    h1: 'Собственное производство термобумаги и термоэтикеток в Китае',
    heroDesc: 'Zhixin Paper — производитель термобумаги, термоэтикеток и jumbo рулонов с собственным заводом в Китае. Мы контролируем весь процесс — от резки и печати до упаковки и отгрузки.',
    capacityTitle: 'Производственные мощности',
    capacities: ['Линии резки термобумаги', 'Линии печати термобумаги и этикеток', 'Оборудование для высечки и упаковки', 'Автоматизированные системы упаковки', 'Профессиональная производственная команда'],
    qcTitle: 'Контроль качества',
    qcDesc: 'Каждая партия продукции проходит контроль качества перед упаковкой и отгрузкой.',
    qcIntro: 'Мы внедрили 5-этапную систему контроля качества. Каждое изделие проверяется на плотность, четкость термопечати и прочность клеевого слоя.',
    qcPoints: ['Входной контроль сырья', 'Выборочный контроль в процессе', 'Полная проверка готовой продукции', 'Повторная проверка перед упаковкой', 'Финальный контроль перед отгрузкой'],
    shippingTitle: 'Упаковка и отгрузка',
    shippingIntro: 'Надежная экспортная упаковка (влагостойкая пленка, усиленные поддоны). Гарантируем сохранность груза при морской и железнодорожной перевозке в Россию и СНГ.',
    shippingFeatures: [
      { label: 'Влагостойкая упаковка', desc: 'Многослойная защита от влаги для длительной морской перевозки и хранения.' },
      { label: 'Усиленные поддоны', desc: 'Усиленные деревянные/пластиковые поддоны для безопасной погрузки и транспортировки.' },
    ],
    cooperationTitle: 'Сотрудничество',
    factoryTitle: 'Производственные мощности',
    factoryIntro: 'Мы владеем современным производственным комплексом в Китае с полноценными производственными линиями и складской логистикой, гарантирующими качество продукции и эффективность поставок.',
    factoryStats: [
      { value: '10,000+ кв.м', label: 'Площадь современного завода', icon: 'factory' },
      { value: '30+ тонн/день', label: 'Суточная производительность', icon: 'zap' },
      { value: '5,000+ тонн', label: 'Складская вместимость', icon: 'package' },
    ],
    productionTitle: 'Основные производственные линии',
    productionIntro: 'Мы оснащены различными передовыми производственными оборудованиями, охватывающими полный цикл от резки термобумаги до печати этикеток и высечки.',
    lines: [
      { icon: 'settings', title: 'Высокоскоростные линии резки термобумаги', desc: 'Оборудованы несколькими импортными высокоскоростными резальными машинами, максимальная ширина 1650мм, точность резки ±0,5мм, максимальная скорость 300м/мин.', tags: ['Импортное оборудование', 'Высокая точность', 'Большая ширина'] },
      { icon: 'package', title: 'Многоцветные линии печати этикеток', desc: 'Флексографские печатные машины поддерживают печать от 1 до 6 цветов, максимальная ширина печати 420мм, поддержка различных методов печати рулон-рулон, рулон-лист.', tags: ['Многоцветная печать', 'Флексография', 'Индивидуальная печать'] },
      { icon: 'shield', title: 'Высокоточное высечное оборудование', desc: 'Автоматические высечные машины оснащены сервоприводом, точность высечки ±0,1мм, подходят для различных фигурных этикеток и сложных требований к высечке.', tags: ['±0,1мм точность', 'Автоматизация', 'Фигурная высечка'] },
    ],
  },

  zh: {
    title: '纸品生产及工厂 | 志信纸业',
    desc: '中国自有热敏纸及标签生产基地。现代化设备、质量管控、包装及全球出口。',
    h1: '中国自有热敏纸及标签生产基地',
    heroDesc: '志信纸业是拥有中国自有工厂的生产商。我们控制从分切、印刷到包装、发货的全过程。',
    capacityTitle: '生产能力',
    capacities: ['高速分切生产线', '多色标签印刷线', '高精度模切设备', '自动化包装系统', '专业生产团队'],
    qcTitle: '质量管控',
    qcDesc: '每批产品在包装和发货前都经过多阶段质量控制。',
    qcIntro: '我们实施了5阶段质量控制系统。每件产品都检查密度、热敏打印清晰度和粘合层强度。',
    qcPoints: ['原料入库检测', '生产过程中抽检', '成品全检', '包装前复检', '出库前最终检验'],
    shippingTitle: '包装与物流',
    shippingIntro: '可靠的出口包装（防潮膜、加固托盘）。保证货物在海运和铁路运输到俄罗斯及独联体国家时的安全。',
    shippingFeatures: [
      { label: '防潮包装', desc: '多层防潮膜保护，适合长途海运及仓储。' },
      { label: '加固托盘', desc: '加固木托/塑料托盘，确保装卸与运输安全。' },
    ],
    cooperationTitle: '合作咨询',
    factoryTitle: '工厂设施',
    factoryIntro: '我们在中国拥有现代化的生产基地，配备完善的生产线和仓储物流系统，确保产品质量和交付效率。',
    factoryStats: [
      { value: '10,000+ 平方米', label: '现代化厂房面积', icon: 'factory' },
      { value: '30+ 吨/天', label: '日产能力', icon: 'zap' },
      { value: '5,000+ 吨', label: '仓储容量', icon: 'package' },
    ],
    productionTitle: '主要生产线',
    productionIntro: '我们配备多种先进的生产设备，涵盖热敏纸分切、标签印刷、模切等全流程工序。',
    lines: [
      { icon: 'settings', title: '高速热敏纸分切生产线', desc: '配备多台进口高速分切机，最大幅宽1650mm，分切精度±0.5mm，最高速度300m/min。', tags: ['进口设备', '高精度', '大幅宽'] },
      { icon: 'package', title: '多色标签印刷生产线', desc: '柔版印刷机支持1-6色印刷，最大印刷宽度420mm，支持卷对卷、卷对单张等多种印刷方式。', tags: ['多色印刷', '柔版工艺', '定制印刷'] },
      { icon: 'shield', title: '高精度模切设备', desc: '自动模切机配备伺服驱动系统，模切精度±0.1mm，适用于各种异形标签和复杂模切需求。', tags: ['±0.1mm精度', '自动化', '异形模切'] },
    ],
  },
};
