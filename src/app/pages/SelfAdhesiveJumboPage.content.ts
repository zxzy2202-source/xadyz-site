/**
 * SelfAdhesiveJumboPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface Spec {
  label: string;
  value: string;
}

export interface SelfAdhesiveJumboContent {
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
}

export const content: Record<Lang, SelfAdhesiveJumboContent> = {
  en: {
    title: 'Self-Adhesive Jumbo Rolls Manufacturer | Zhixin Paper',
    desc: 'Zhixin Paper supplies self-adhesive jumbo rolls for label production and converting. Wholesale thermal self-adhesive materials from China.',
    h1: 'Self-Adhesive Jumbo Rolls for Label Production',
    heroDesc: 'Zhixin Paper supplies high-quality self-adhesive jumbo rolls for label converters and processing plants. Stable adhesive layer and uniform liner thickness for high-speed slitting and label manufacturing.',
    forWho: 'Designed for Label Converters',
    benefits: ['Stable adhesive layer for high-speed die-cutting', 'Uniform liner thickness for easy separation', 'Customizable coating types (thermal/thermal transfer)', 'Direct manufacturer prices, large volume support', 'Professional export packaging for container shipping'],
    specs: [
      { label: 'Material Type', value: 'Thermal Self-Adhesive / Thermal Transfer' },
      { label: 'Facestock Weight', value: '60gsm / 70gsm / 80gsm' },
      { label: 'Liner Type', value: 'White Glassine / Yellow Glassine / CCK' },
      { label: 'Width', value: '650mm / 800mm / 1000mm / Custom' },
      { label: 'Outer Diameter', value: 'up to 1000mm' },
      { label: 'Core ID', value: '76mm (3 inch)' },
    ],
    ctaTitle: 'Request Self-Adhesive Jumbo Pricing',
    advantagesTitle: 'Our Advantages',
    specsTitle: 'Technical Specifications',
    logisticsTitle: 'Logistics',
    logisticsDesc: 'We provide direct container shipping for self-adhesive jumbo rolls. Professional moisture-proof packaging suitable for sea and rail transport, ensuring material quality remains intact.',
  },

  ru: {
    title: 'Самоклеящиеся Jumbo-рулоны оптом | Завод Zhixin Paper',
    desc: 'Zhixin Paper поставляет самоклеящиеся jumbo-рулоны для производства этикеток и переработки. Оптовые термочувствительные самоклеящиеся материалы из Китая.',
    h1: 'Самоклеящиеся Jumbo-рулоны для производства этикеток',
    heroDesc: 'Zhixin Paper поставляет высококачественные самоклеящиеся jumbo-рулоны для переработчиков этикеток и производственных предприятий. Стабильный клеевой слой и равномерная толщина подложки для высокоскоростной резки и производства этикеток.',
    forWho: 'Для переработчиков этикеток',
    benefits: ['Стабильный клеевой слой для высокоскоростной высечки', 'Равномерная толщина подложки для легкого разделения', 'Настраиваемые типы покрытия (термо/термотрансферное)', 'Цены напрямую от производителя, поддержка крупных объемов', 'Профессиональная экспортная упаковка для контейнерных перевозок'],
    specs: [
      { label: 'Тип материала', value: 'Термо самоклеящаяся / Термотрансферная' },
      { label: 'Плотность лицевого слоя', value: '60г/м² / 70г/м² / 80г/м²' },
      { label: 'Тип подложки', value: 'Белая глассин / Желтая глассин / CCK' },
      { label: 'Ширина полотна', value: '650мм / 800мм / 1000мм / индивидуальная' },
      { label: 'Внешний диаметр', value: 'до 1000мм' },
      { label: 'Внутренняя втулка', value: '76мм (3 дюйма)' },
    ],
    ctaTitle: 'Запросить цену на самоклеящиеся Jumbo-рулоны',
    advantagesTitle: 'Наши преимущества',
    specsTitle: 'Технические характеристики',
    logisticsTitle: 'Логистика',
    logisticsDesc: 'Мы обеспечиваем прямую контейнерную доставку самоклеящихся jumbo-рулонов. Профессиональная влагозащитная упаковка, подходящая для морских и железнодорожных перевозок, гарантирует сохранность качества материала.',
  },

  zh: {
    title: '自粘性Jumbo大卷材料供应商 | 志信纸业',
    desc: '志信纸业供应自粘性Jumbo大卷原材料，适用于标签生产和分切加工。热敏自粘材料批发。',
    h1: '自粘性Jumbo大卷（标签生产原料）',
    heroDesc: '志信纸业为标签加工厂和分切商提供高质量自粘性Jumbo大卷材料。稳定的粘性层、均匀的底纸厚度，适合高速分切和标签生产。',
    forWho: '为标签加工厂设计',
    benefits: ['稳定的粘性层，适合高速模切', '底纸厚度均匀，易于分离', '可定制涂层类型（热敏/热转印）', '工厂直接价格，支持大批量订单', '专业出口包装，适合集装箱运输'],
    specs: [
      { label: '材料类型', value: '热敏自粘 / 热转印自粘' },
      { label: '面材克重', value: '60gsm / 70gsm / 80gsm' },
      { label: '底纸类型', value: '白格拉辛 / 黄格拉辛 / CCK' },
      { label: '宽度', value: '650mm / 800mm / 1000mm / 定制' },
      { label: '外径', value: '最大1000mm' },
      { label: '纸芯内径', value: '76mm (3英寸)' },
    ],
    ctaTitle: '询问Jumbo自粘材料价格',
    advantagesTitle: '我们的优势',
    specsTitle: '技术规格',
    logisticsTitle: '物流信息',
    logisticsDesc: '我们提供Jumbo自粘大卷的集装箱直发服务。专业防潮包装，适合海运和铁路运输，确保材料品质不受损。',
  },
};
