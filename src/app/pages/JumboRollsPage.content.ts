/**
 * JumboRollsPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface Spec {
  label: string;
  value: string;
}

export interface JumboRollsContent {
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
  ctaSubtext: string;
  packagingTitle: string;
  packagingDesc: string;
  shippingTitle: string;
  shippingDesc: string;
  featureCoating: string;
  featureCoatingDesc: string;
  featureDirect: string;
  featureDirectDesc: string;
  featureCustom: string;
  featureCustomDesc: string;
  packagingImg1: string;
  packagingImg2: string;
  shippingImg1: string;
  shippingImg2: string;
}

export const content: Record<Lang, JumboRollsContent> = {
  en: {
    title: 'Jumbo Thermal Paper Rolls Manufacturer | Zhixin Paper',
    desc: 'Manufacturer of jumbo thermal paper rolls for converters and paper processing factories. Wholesale supplies from China.',
    h1: 'Jumbo Thermal Paper Rolls for Converters',
    heroDesc: 'Zhixin Paper supplies high-quality jumbo thermal rolls designed for further processing and slitting. Stable density and smooth coating for professional converting.',
    forWho: 'Designed for Converters',
    benefits: ['Stable coating for high-speed slitting', 'Uniform density across the roll', 'Professional packaging for export', 'Direct manufacturer prices', 'Custom technical specifications'],
    specs: [
      { label: 'Paper Grade', value: 'Premium / Standard' },
      { label: 'Weight', value: '48gsm / 55gsm / 65gsm / 70gsm' },
      { label: 'Width', value: '405mm / 560mm / 640mm / 800mm / 900mm' },
      { label: 'Outer Diameter', value: 'up to 1000mm' },
      { label: 'Core ID', value: '76mm (3 inch)' },
    ],
    ctaTitle: 'Request Jumbo Roll Pricing',
    advantagesTitle: 'Product Advantages',
    specsTitle: 'Technical Specifications',
    logisticsTitle: 'Logistics',
    logisticsDesc: 'We provide direct container shipping for thermal jumbo rolls. Professional moisture-proof packaging suitable for sea and rail transport, ensuring coating quality remains intact.',
    ctaSubtext: 'Contact us for detailed specifications and bulk pricing. Sample testing available.',
    packagingTitle: 'Packaging',
    packagingDesc: 'Professional moisture-proof wrapping and reinforced pallets for safe sea and rail freight',
    shippingTitle: 'Shipping & Delivery',
    shippingDesc: 'Direct container loading and reliable export logistics',
    featureCoating: 'Thermal Coating',
    featureCoatingDesc: 'Stable, responsive thermal coating for POS and ticket printing with clear, lasting image',
    featureDirect: 'Direct Supply',
    featureDirectDesc: 'No middlemen, direct from production line, better prices',
    featureCustom: 'Custom Specifications',
    featureCustomDesc: 'Customizable weight, width, grade and more for varied slitting needs',
    packagingImg1: 'Thermal jumbo rolls packaging image 1',
    packagingImg2: 'Thermal jumbo rolls packaging image 2',
    shippingImg1: 'Thermal jumbo rolls shipping image 1',
    shippingImg2: 'Thermal jumbo rolls shipping image 2',
  },

  ru: {
    title: 'Jumbo рулоны термобумаги оптом | Завод Zhixin Paper',
    desc: 'Производитель jumbo рулонов термобумаги для переработчиков и бумажных фабрик. Прямые оптовые поставки из Китая в Россию и СНГ.',
    h1: 'Jumbo рулоны термобумаги для переработчиков',
    heroDesc: 'Zhixin Paper поставляет высококачественные jumbo рулоны (мастер-рулоны) термобумаги для дальнейшей резки и переработки. Стабильная плотность и гладкое покрытие для профессионального производства.',
    forWho: 'Для переработчиков и заводов',
    benefits: ['Стабильное покрытие для высокоскоростной резки', 'Равномерная плотность по всей длине рулона', 'Профессиональная упаковка для экспорта', 'Цены напрямую от производителя', 'Индивидуальные технические спецификации'],
    specs: [
      { label: 'Марка бумаги', value: 'Премиум / Стандарт' },
      { label: 'Плотность', value: '48г/м2 / 55г/м2 / 65г/м2 / 70г/м2' },
      { label: 'Ширина полотна', value: '405мм / 560мм / 640мм / 800мм / 900мм' },
      { label: 'Внешний диаметр', value: 'до 1000мм' },
      { label: 'Внутренняя втулка', value: '76мм (3 дюйма)' },
    ],
    ctaTitle: 'Запросить цену на Jumbo рулоны',
    advantagesTitle: 'Наши преимущества',
    specsTitle: 'Технические характеристики',
    logisticsTitle: 'Логистика',
    logisticsDesc: 'Осуществляем поставки jumbo рулонов контейнерами напрямую с завода. Надежная влагозащитная упаковка для морской и железнодорожной перевозки.',
    ctaSubtext: 'Свяжитесь с нами для получения подробных спецификаций и оптовых цен. Доступны образцы для тестирования.',
    packagingTitle: 'Упаковка',
    packagingDesc: 'Профессиональная влагозащитная упаковка и усиленные поддоны для безопасной морской и железнодорожной перевозки',
    shippingTitle: 'Отгрузка и доставка',
    shippingDesc: 'Прямая загрузка в контейнеры и надежная экспортная логистика',
    featureCoating: 'Термопокрытие',
    featureCoatingDesc: 'Стабильное термопокрытие для POS-принтеров и билетопечати, четкое и стойкое изображение',
    featureDirect: 'Прямые поставки',
    featureDirectDesc: 'Без посредников, прямо с производственной линии, лучшие цены',
    featureCustom: 'Индивидуальные спецификации',
    featureCustomDesc: 'Настройка плотности, ширины, марки и других параметров под ваши нужды',
    packagingImg1: 'Упаковка терморулонов - изображение 1',
    packagingImg2: 'Упаковка терморулонов - изображение 2',
    shippingImg1: 'Отгрузка терморулонов - изображение 1',
    shippingImg2: 'Отгрузка терморулонов - изображение 2',
  },

  zh: {
    title: 'Jumbo大卷热敏原纸生产商 | 志信纸业',
    desc: '为分切商和纸品加工厂生产Jumbo大卷热敏原纸。从中国批发供应。',
    h1: 'Jumbo大卷热敏原纸（用于分切）',
    heroDesc: '志信纸业供应高质量Jumbo大卷热敏原纸，专为后续加工和分切设计。稳定的密度和光滑的涂层，适合专业分切。',
    forWho: '为分切商设计',
    benefits: ['稳定涂层适合高速分切', '整卷密度均匀', '专业出口包装', '工厂直接价格', '定制技术规格'],
    specs: [
      { label: '纸张等级', value: '优质 / 标准' },
      { label: '克重', value: '48gsm / 55gsm / 65gsm / 70gsm' },
      { label: '宽度', value: '405mm / 560mm / 640mm / 800mm / 900mm' },
      { label: '外径', value: '最大1000mm' },
      { label: '纸芯内径', value: '76mm (3英寸)' },
    ],
    ctaTitle: '询问Jumbo大卷价格',
    advantagesTitle: '产品优势',
    specsTitle: '技术规格',
    logisticsTitle: '物流信息',
    logisticsDesc: '我们提供Jumbo大卷的集装箱直发服务。专业防潮包装，适合海运和铁路运输，确保热敏涂层品质不受损。',
    ctaSubtext: '联系我们获取详细规格书和批量报价单。支持样品测试。',
    packagingTitle: '包装展示',
    packagingDesc: '专业防潮包装、加固托盘，确保长途海运与铁路运输中产品完好',
    shippingTitle: '发货展示',
    shippingDesc: '集装箱直发，可靠装柜与出口物流服务',
    featureCoating: '热敏涂层',
    featureCoatingDesc: '稳定灵敏的热敏涂层，适合POS小票机和票据打印，显色清晰持久',
    featureDirect: '工厂直供',
    featureDirectDesc: '取消中间商，从生产线直接发货，价格更优',
    featureCustom: '定制规格',
    featureCustomDesc: '支持克重、宽度、等级等多参数定制，满足不同分切需求',
    packagingImg1: '热敏大卷包装图1',
    packagingImg2: '热敏大卷包装图2',
    shippingImg1: '热敏大卷发货图1',
    shippingImg2: '热敏大卷发货图2',
  },
};
