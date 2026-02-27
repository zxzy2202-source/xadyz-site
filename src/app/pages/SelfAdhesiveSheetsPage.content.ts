/**
 * SelfAdhesiveSheetsPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface Spec {
  label: string;
  value: string;
}

export interface ApplicationItem {
  icon: string;
  title: string;
  desc: string;
}

export interface SelfAdhesiveSheetsContent {
  title: string;
  desc: string;
  h1: string;
  heroDesc: string;
  forWho: string;
  benefits: string[];
  specs: Spec[];
  ctaTitle: string;
  advantagesTitle: string;
  specsTitle: string;
  logisticsTitle: string;
  logisticsDesc: string;
  applicationsTitle: string;
  applications: ApplicationItem[];
}

export const content: Record<Lang, SelfAdhesiveSheetsContent> = {
  en: {
    title: 'Self-Adhesive Sheets (Label Paper) Supplier | Zhixin Paper',
    desc: 'Zhixin Paper supplies A4 and custom-sized self-adhesive sheets for laser printing and label making. Wholesale thermal/thermal transfer adhesive sheets.',
    h1: 'Self-Adhesive Sheets (A4 & Custom Sizes)',
    heroDesc: 'Zhixin Paper supplies high-quality self-adhesive sheets for office suppliers and label printers. Available in A4, A3, and custom sizes, compatible with laser and inkjet printers.',
    forWho: 'Designed for Office & Print Traders',
    benefits: ['Standard A4 size, compatible with office printers', 'Customizable sizes and die-cut formats', 'Stable adhesive, resistant to curling', 'Supports thermal, thermal transfer, laser printing', 'Factory prices for bulk orders'],
    specs: [
      { label: 'Material Type', value: 'Thermal Self-Adhesive / Thermal Transfer / Plain' },
      { label: 'Standard Sizes', value: 'A4 (210×297mm) / A3 / Custom' },
      { label: 'Facestock Weight', value: '60gsm / 70gsm / 80gsm' },
      { label: 'Liner Type', value: 'White Glassine / Yellow Glassine' },
      { label: 'Packaging', value: '100 sheets/pack / 500 sheets/pack / Custom' },
      { label: 'Die-Cutting', value: 'Custom die-cut formats available' },
    ],
    ctaTitle: 'Request Self-Adhesive Sheets Pricing',
    advantagesTitle: 'Product Advantages',
    specsTitle: 'Technical Specifications',
    logisticsTitle: 'Logistics',
    logisticsDesc: 'Self-adhesive sheets are packed in cartons, supporting LCL and FCL exports. Moisture-proof packaging ensures quality during long-distance transport.',
    applicationsTitle: 'Applications',
    applications: [
      { icon: 'file', title: 'Office Label Printing', desc: 'A4 label sheets for office printers' },
      { icon: 'grid', title: 'Logistics Shipping Labels', desc: 'Custom sizes for shipping labels' },
      { icon: 'check', title: 'Product Stickers', desc: 'Small-batch custom product labels' },
    ],
  },

  ru: {
    title: 'Самоклеящиеся листы (этикеточная бумага) оптом | Zhixin Paper',
    desc: 'Zhixin Paper поставляет самоклеящиеся листы формата A4 и индивидуальных размеров для лазерной печати и производства этикеток. Оптовые термо/термотрансферные самоклеящиеся листы.',
    h1: 'Самоклеящиеся листы (A4 и индивидуальные размеры)',
    heroDesc: 'Zhixin Paper поставляет высококачественные самоклеящиеся листы для офисных поставщиков и производителей этикеток. Доступны форматы A4, A3 и индивидуальные размеры, совместимые с лазерными и струйными принтерами.',
    forWho: 'Для офисных и печатных компаний',
    benefits: ['Стандартный формат A4, совместим с офисными принтерами', 'Индивидуальные размеры и форматы высечки', 'Стабильный клеевой слой, устойчив к скручиванию', 'Поддержка термопечати, термотрансферной и лазерной печати', 'Заводские цены при крупных заказах'],
    specs: [
      { label: 'Тип материала', value: 'Термо самоклеящаяся / Термотрансферная / Обычная' },
      { label: 'Стандартные размеры', value: 'A4 (210×297мм) / A3 / индивидуальные' },
      { label: 'Плотность лицевого слоя', value: '60г/м² / 70г/м² / 80г/м²' },
      { label: 'Тип подложки', value: 'Белая глассин / Желтая глассин' },
      { label: 'Упаковка', value: '100 листов/пачка / 500 листов/пачка / индивидуальная' },
      { label: 'Высечка', value: 'Индивидуальные форматы высечки' },
    ],
    ctaTitle: 'Запросить цену на самоклеящиеся листы',
    advantagesTitle: 'Преимущества продукта',
    specsTitle: 'Технические характеристики',
    logisticsTitle: 'Логистика',
    logisticsDesc: 'Самоклеящиеся листы упакованы в картонные коробки, поддерживаем сборные и полные контейнерные грузы. Влагозащитная упаковка гарантирует качество при длительной транспортировке.',
    applicationsTitle: 'Применение',
    applications: [
      { icon: 'file', title: 'Офисная печать этикеток', desc: 'Листы A4 для офисных принтеров' },
      { icon: 'grid', title: 'Логистические транспортные этикетки', desc: 'Индивидуальные размеры для транспортных этикеток' },
      { icon: 'check', title: 'Продуктовые наклейки', desc: 'Малые партии индивидуальных этикеток' },
    ],
  },

  zh: {
    title: '自粘性片材（标签用纸）供应商 | 志信纸业',
    desc: '志信纸业提供A4和定制尺寸自粘性片材，适用于激光打印和标签制作。热敏/热转印自粘片材批发。',
    h1: '自粘性片材（A4及定制尺寸）',
    heroDesc: '志信纸业为办公用品商和标签打印商提供高质量自粘性片材。支持A4、A3及定制尺寸，适合激光打印机和喷墨打印机使用。',
    forWho: '为办公及打印商设计',
    benefits: ['标准A4尺寸，兼容办公打印机', '可定制任意尺寸和模切格式', '稳定的粘性，不易卷曲', '支持热敏、热转印、激光打印', '大批量订单享受工厂价格'],
    specs: [
      { label: '材料类型', value: '热敏自粘 / 热转印自粘 / 普通自粘' },
      { label: '常规尺寸', value: 'A4 (210×297mm) / A3 / 定制' },
      { label: '面材克重', value: '60gsm / 70gsm / 80gsm' },
      { label: '底纸类型', value: '白格拉辛 / 黄格拉辛' },
      { label: '包装方式', value: '100张/包 / 500张/包 / 定制' },
      { label: '模切格式', value: '支持定制模切版型' },
    ],
    ctaTitle: '询问自粘片材价格',
    advantagesTitle: '产品优势',
    specsTitle: '技术规格',
    logisticsTitle: '物流信息',
    logisticsDesc: '自粘片材采用纸箱包装，支持拼柜和整柜出口。防潮包装确保长途运输品质。',
    applicationsTitle: '应用场景',
    applications: [
      { icon: 'file', title: '办公标签打印', desc: 'A4标签纸，适用于办公室打印机' },
      { icon: 'grid', title: '物流快递标签', desc: '定制尺寸，适合快递单打印' },
      { icon: 'check', title: '产品贴纸', desc: '小批量定制产品标识贴纸' },
    ],
  },
};
