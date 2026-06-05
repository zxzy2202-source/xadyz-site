/**
 * NCRJumboPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface Spec {
  label: string;
  value: string;
}

export interface NcrLayer {
  name: string;
  desc: string;
  color: string;
}

export interface NCRJumboContent {
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
  layersTitle: string;
  ncrLayers: NcrLayer[];
}

export const content: Record<Lang, NCRJumboContent> = {
  en: {
    title: 'NCR Carbonless Jumbo Rolls Manufacturer | Zhixin Paper',
    desc: 'Zhixin Paper supplies NCR carbonless jumbo rolls for form manufacturers and invoice printers. Wholesale CB, CFB, CF paper from China.',
    h1: 'NCR Carbonless Jumbo Rolls (Base Paper)',
    heroDesc: 'Zhixin Paper supplies high-quality NCR carbonless jumbo rolls for form manufacturers, invoice printers, and converters. Stable supply of CB, CFB, CF layers, suitable for slitting and printing conversion.',
    forWho: 'Designed for Form Manufacturers',
    benefits: ['Stable supply of CB, CFB, CF three-layer paper', 'Clear color development, excellent copy effect', 'Uniform density across roll for high-speed slitting', 'Direct manufacturer prices, long-term cooperation', 'Professional export packaging, moisture and pressure resistant'],
    specs: [
      { label: 'Paper Type', value: 'CB (Top) / CFB (Middle) / CF (Bottom)' },
      { label: 'Weight', value: '48gsm / 52gsm / 55gsm / 60gsm' },
      { label: 'Width', value: '500mm / 650mm / 800mm / 900mm / Custom' },
      { label: 'Outer Diameter', value: 'up to 1000mm' },
      { label: 'Core ID', value: '76mm (3 inch)' },
      { label: 'Color Development', value: 'Microcapsule technology' },
    ],
    ctaTitle: 'Request NCR Jumbo Roll Pricing',
    advantagesTitle: 'Product Advantages',
    specsTitle: 'Technical Specifications',
    logisticsTitle: 'Logistics',
    logisticsDesc: 'NCR Jumbo rolls use moisture-proof packaging, supporting FCL and LCL container exports. Ensures paper remains dry and maintains shape during long-distance transport.',
    layersTitle: 'NCR Three-Layer Structure',
    ncrLayers: [
      { name: 'CB (Top Sheet)', desc: 'Coated with microcapsules, releases colorant when pressed', color: 'blue' },
      { name: 'CFB (Middle Sheet)', desc: 'Middle sheet with colorant on top and microcapsules below', color: 'purple' },
      { name: 'CF (Bottom Sheet)', desc: 'Coated with colorant, receives copied content', color: 'green' },
    ],
  },

  ru: {
    title: 'NCR безуглеродные Jumbo-рулоны оптом | Завод Zhixin Paper',
    desc: 'Zhixin Paper поставляет NCR безуглеродные jumbo-рулоны для производителей бланков и счетов. Оптовые поставки CB, CFB, CF бумаги из Китая.',
    h1: 'NCR безуглеродные Jumbo-рулоны (базовая бумага)',
    heroDesc: 'Zhixin Paper поставляет высококачественные NCR безуглеродные jumbo-рулоны для производителей бланков, счетов и переработчиков. Стабильные поставки CB, CFB, CF слоёв, подходящие для резки и печатной конверсии.',
    forWho: 'Для производителей бланков',
    benefits: ['Стабильные поставки трёхслойной бумаги CB, CFB, CF', 'Чёткое проявление цвета, отличный эффект копирования', 'Равномерная плотность по всему рулону для высокоскоростной резки', 'Цены напрямую от производителя, долгосрочное сотрудничество', 'Профессиональная экспортная упаковка, влаго- и прессостойкая'],
    specs: [
      { label: 'Тип бумаги', value: 'CB (верхний) / CFB (средний) / CF (нижний)' },
      { label: 'Плотность', value: '48г/м² / 52г/м² / 55г/м² / 60г/м²' },
      { label: 'Ширина полотна', value: '500мм / 650мм / 800мм / 900мм / индивидуальная' },
      { label: 'Внешний диаметр', value: 'до 1000мм' },
      { label: 'Внутренняя втулка', value: '76мм (3 дюйма)' },
      { label: 'Проявление цвета', value: 'Технология микрокапсул' },
    ],
    ctaTitle: 'Запросить цену на NCR Jumbo-рулоны',
    advantagesTitle: 'Преимущества продукта',
    specsTitle: 'Технические характеристики',
    logisticsTitle: 'Логистика',
    logisticsDesc: 'NCR Jumbo-рулоны упакованы влагозащитной упаковкой, поддерживаем полные и сборные контейнерные грузы. Гарантируем, что бумага останется сухой и сохранит форму при длительной транспортировке.',
    layersTitle: 'Структура NCR трёхслойной бумаги',
    ncrLayers: [
      { name: 'CB (верхний лист)', desc: 'Покрыт микрокапсулами, выделяет краситель при нажатии', color: 'blue' },
      { name: 'CFB (средний лист)', desc: 'Средний лист с красителем сверху и микрокапсулами снизу', color: 'purple' },
      { name: 'CF (нижний лист)', desc: 'Покрыт красителем, принимает копируемое содержимое', color: 'green' },
    ],
  },

  zh: {
    title: 'NCR无碳复写Jumbo大卷原纸生产商 | 志信纸业',
    desc: '志信纸业供应NCR无碳复写Jumbo大卷原纸，适用于表格厂和票据印刷厂。CB、CFB、CF纸批发。',
    h1: 'NCR无碳复写Jumbo大卷（原纸）',
    heroDesc: '志信纸业为表格厂、票据印刷厂和加工商提供高质量NCR无碳复写Jumbo大卷原纸。CB、CFB、CF三层纸稳定供应，适合后续分切和印刷加工。',
    forWho: '为表格加工厂设计',
    benefits: ['CB、CFB、CF三层纸稳定供应', '显色清晰，复写效果优异', '整卷密度均匀，适合高速分切', '工厂直接价格，支持长期合作', '专业出口包装，防潮防压'],
    specs: [
      { label: '纸张类型', value: 'CB（上纸）/ CFB（中纸）/ CF（下纸）' },
      { label: '克重', value: '48gsm / 52gsm / 55gsm / 60gsm' },
      { label: '宽度', value: '500mm / 650mm / 800mm / 900mm / 定制' },
      { label: '外径', value: '最大1000mm' },
      { label: '纸芯内径', value: '76mm (3英寸)' },
      { label: '显色方式', value: '微胶囊显色' },
    ],
    ctaTitle: '询问NCR Jumbo大卷价格',
    advantagesTitle: '产品优势',
    specsTitle: '技术规格',
    logisticsTitle: '物流信息',
    logisticsDesc: 'NCR Jumbo大卷采用防潮包装，支持集装箱整柜和拼柜出口。确保长途运输中纸张不受潮、不变形。',
    layersTitle: 'NCR三层结构说明',
    ncrLayers: [
      { name: 'CB（上纸）', desc: '涂有微胶囊的上层纸，受压后释放显色剂', color: 'blue' },
      { name: 'CFB（中纸）', desc: '中层纸，上面涂显色剂，下面涂微胶囊', color: 'purple' },
      { name: 'CF（下纸）', desc: '涂有显色剂的下层纸，接收复写内容', color: 'green' },
    ],
  },
};
