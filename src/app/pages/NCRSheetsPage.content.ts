/**
 * NCRSheetsPage 三语言内容数据
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

export interface NcrLayer {
  name: string;
  desc: string;
  bgColor: string;
  textColor: string;
}

export interface NCRSheetsContent {
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
  layersTitle: string;
  applications: ApplicationItem[];
  ncrLayers: NcrLayer[];
}

export const content: Record<Lang, NCRSheetsContent> = {
  en: {
    title: 'NCR Carbonless Sheets (Cut Sheets) Supplier | Zhixin Paper',
    desc: 'Zhixin Paper supplies NCR carbonless sheets in A4 and custom sizes for form printing and invoice making. Wholesale CB, CFB, CF paper.',
    h1: 'NCR Carbonless Sheets (A4 & Custom Sizes)',
    heroDesc: 'Zhixin Paper supplies high-quality NCR carbonless sheets for form printers and invoice makers. Available in A4, A3, and custom sizes, CB, CFB, CF layers in stock, ready for printing.',
    forWho: 'Designed for Form Printers',
    benefits: ['A4, A3, and custom sizes in stock', 'CB, CFB, CF layers supplied separately', 'Clear color development, stable copying effect', 'Supports offset and digital printing', 'Direct factory prices, bulk discounts'],
    specs: [
      { label: 'Paper Type', value: 'CB (Top) / CFB (Middle) / CF (Bottom)' },
      { label: 'Standard Sizes', value: 'A4 (210×297mm) / A3 / A5 / Custom' },
      { label: 'Weight', value: '48gsm / 52gsm / 55gsm / 60gsm' },
      { label: 'Color Development', value: 'Microcapsule technology' },
      { label: 'Packaging', value: '500 sheets/pack / 1000 sheets/pack / Custom' },
      { label: 'Color Options', value: 'White / Colored (Pink, Blue, Yellow, Green)' },
    ],
    ctaTitle: 'Request NCR Sheets Pricing',
    advantagesTitle: 'Product Advantages',
    specsTitle: 'Technical Specifications',
    logisticsTitle: 'Logistics',
    logisticsDesc: 'NCR sheets are packed in cartons, supporting LCL and FCL exports. Moisture-proof packaging ensures paper quality during long-distance transport.',
    applicationsTitle: 'Applications',
    layersTitle: 'NCR Three-Layer Explanation',
    applications: [
      { icon: 'file', title: 'Business Forms', desc: 'Invoices, receipts, order forms' },
      { icon: 'copy', title: 'Delivery Notes', desc: 'Shipping slips, warehouse in/out forms' },
      { icon: 'layers', title: 'Medical Forms', desc: 'Medical records, prescriptions, lab forms' },
    ],
    ncrLayers: [
      { name: 'CB', desc: 'Top sheet, coated with microcapsules', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
      { name: 'CFB', desc: 'Middle sheet, double-sided coating', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
      { name: 'CF', desc: 'Bottom sheet, coated with colorant', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    ],
  },

  ru: {
    title: 'NCR безуглеродные листы (резаные листы) оптом | Zhixin Paper',
    desc: 'Zhixin Paper поставляет NCR безуглеродные листы формата A4 и индивидуальных размеров для печати бланков и счетов. Оптовые поставки CB, CFB, CF бумаги.',
    h1: 'NCR безуглеродные листы (A4 и индивидуальные размеры)',
    heroDesc: 'Zhixin Paper поставляет высококачественные NCR безуглеродные листы для типографий бланков и производителей счетов. Доступны форматы A4, A3 и индивидуальные размеры, CB, CFB, CF слои на складе, готовы к печати.',
    forWho: 'Для типографий бланков',
    benefits: ['Форматы A4, A3 и индивидуальные размеры на складе', 'CB, CFB, CF слои поставляются отдельно', 'Чёткое проявление цвета, стабильный эффект копирования', 'Поддержка офсетной и цифровой печати', 'Заводские цены, скидки при крупных заказах'],
    specs: [
      { label: 'Тип бумаги', value: 'CB (верхний) / CFB (средний) / CF (нижний)' },
      { label: 'Стандартные размеры', value: 'A4 (210×297мм) / A3 / A5 / индивидуальные' },
      { label: 'Плотность', value: '48г/м² / 52г/м² / 55г/м² / 60г/м²' },
      { label: 'Проявление цвета', value: 'Технология микрокапсул' },
      { label: 'Упаковка', value: '500 листов/пачка / 1000 листов/пачка / индивидуальная' },
      { label: 'Цветовые варианты', value: 'Белый / Цветные (розовый, синий, желтый, зеленый)' },
    ],
    ctaTitle: 'Запросить цену на NCR листы',
    advantagesTitle: 'Преимущества продукта',
    specsTitle: 'Технические характеристики',
    logisticsTitle: 'Логистика',
    logisticsDesc: 'NCR листы упакованы в картонные коробки, поддерживаем сборные и полные контейнерные грузы. Влагозащитная упаковка гарантирует качество бумаги при длительной транспортировке.',
    applicationsTitle: 'Применение',
    layersTitle: 'Объяснение NCR трёхслойной бумаги',
    applications: [
      { icon: 'file', title: 'Деловые бланки', desc: 'Счета, квитанции, бланки заказов' },
      { icon: 'copy', title: 'Накладные', desc: 'Транспортные накладные, складские документы' },
      { icon: 'layers', title: 'Медицинские бланки', desc: 'Медицинские карты, рецепты, лабораторные формы' },
    ],
    ncrLayers: [
      { name: 'CB', desc: 'Верхний лист, покрыт микрокапсулами', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
      { name: 'CFB', desc: 'Средний лист, двустороннее покрытие', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
      { name: 'CF', desc: 'Нижний лист, покрыт красителем', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    ],
  },

  zh: {
    title: 'NCR无碳复写片材（分切片）供应商 | 志信纸业',
    desc: '志信纸业提供NCR无碳复写片材，A4及定制尺寸，适用于表格印刷和票据制作。CB、CFB、CF纸批发。',
    h1: 'NCR无碳复写片材（A4及定制尺寸）',
    heroDesc: '志信纸业为表格印刷厂和票据制作商提供高质量NCR无碳复写片材。支持A4、A3及定制尺寸，CB、CFB、CF三层纸现货供应，适合直接印刷。',
    forWho: '为表格印刷厂设计',
    benefits: ['A4、A3及定制尺寸现货供应', 'CB、CFB、CF三层纸独立供应', '显色清晰，复写效果稳定', '支持胶印、数码印刷', '工厂直接价格，大批量优惠'],
    specs: [
      { label: '纸张类型', value: 'CB（上纸）/ CFB（中纸）/ CF（下纸）' },
      { label: '常规尺寸', value: 'A4 (210×297mm) / A3 / A5 / 定制' },
      { label: '克重', value: '48gsm / 52gsm / 55gsm / 60gsm' },
      { label: '显色方式', value: '微胶囊显色技术' },
      { label: '包装方式', value: '500张/包 / 1000张/包 / 定制' },
      { label: '颜色选项', value: '白色 / 彩色（粉、蓝、黄、绿）' },
    ],
    ctaTitle: '询问NCR片材价格',
    advantagesTitle: '产品优势',
    specsTitle: '技术规格',
    logisticsTitle: '物流信息',
    logisticsDesc: 'NCR片材采用纸箱包装，支持拼柜和整柜出口。防潮包装确保长途运输中纸张品质不受影响。',
    applicationsTitle: '应用场景',
    layersTitle: 'NCR三层纸说明',
    applications: [
      { icon: 'file', title: '商业表格', desc: '发票、收据、订单表格' },
      { icon: 'copy', title: '票据制作', desc: '送货单、入库单、出库单' },
      { icon: 'layers', title: '医疗表单', desc: '病历、处方单、检验单' },
    ],
    ncrLayers: [
      { name: 'CB', desc: '涂有微胶囊的上层纸，受压后释放显色剂', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
      { name: 'CFB', desc: '中层纸，上面涂显色剂，下面涂微胶囊', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
      { name: 'CF', desc: '涂有显色剂的下层纸，接收复写内容', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    ],
  },
};
