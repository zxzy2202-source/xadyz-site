/**
 * ThermalPaperPage 三语言内容数据
 * 页面组件从此文件导入，不直接内联。
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface ProductType {
  id: string;
  title: string;
  shortDesc: string;
  bullets: string[];
  cta: string;
  ctaLink: string;
}

export interface ManufacturingItem {
  icon: string;
  label: string;
  value: string;
}

export interface ApplicationItem {
  icon: string;
  title: string;
  desc: string;
  link: string;
}

export interface CustomizationOption {
  icon: string;
  title: string;
  desc: string;
}

export interface QualityItem {
  title: string;
  desc: string;
}

export interface ThermalPaperContent {
  hero: { h1: string; subheading: string; intro: string };
  overview: { paragraph: string; features: { title: string; desc: string }[] };
  productTypes: { sectionTitle: string; types: ProductType[] };
  manufacturing: { sectionTitle: string; intro: string; items: ManufacturingItem[] };
  applications: { sectionTitle: string; items: ApplicationItem[] };
  customization: { sectionTitle: string; intro: string; options: CustomizationOption[] };
  quality: { sectionTitle: string; items: QualityItem[] };
  ctaBlock: { headline: string; subtext: string; button: string; buttonLink: string };
  seo: { title: string; description: string; keywords: string };
}

export const content: Record<Lang, ThermalPaperContent> = {
  en: {
    hero: {
      h1: 'Thermal Paper Rolls for Repeat POS Supply and Project Procurement',
      subheading: 'Blank and printed thermal paper rolls produced in-house for retail chains, distributors, and contract buyers.',
      intro: 'We supply thermal paper rolls with stable coating, clean converting, and flexible OEM options for long-term replenishment, retail programs, and project-based orders.'
    },
    overview: {
      paragraph: 'Thermal paper rolls are widely used for receipt printing in retail, service, and automated transaction systems. Our production focuses on stable coating, clean cutting, and consistent performance across batches.',
      features: [
        {
          title: 'Stable thermal coating for clear image density',
          desc: 'Uniform thermal coating ensures consistent print darkness and fade resistance, suitable for long-term record keeping.'
        },
        {
          title: 'Clean cutting and tight winding',
          desc: 'Precise slitting and tight roll winding reduce paper jams and ensure smooth feeding in all standard POS printers.'
        },
        {
          title: 'Typical sizes for global POS and terminals: 80×80, 80×70, 57×40 mm (3 1/8"×230\', 2 1/4"×85\')',
          desc: 'Custom roll lengths, core sizes, and outer diameters available for specific printer models and high-volume requirements.'
        }
      ]
    },
    productTypes: {
      sectionTitle: 'Product Options',
      types: [
        {
          id: 'blank',
          title: 'Blank Thermal Paper Rolls',
          shortDesc: 'Standard thermal paper rolls for distributors and regular supply.',
          bullets: ['Compatible with common POS printers', 'Consistent quality across batches', 'Flexible sizing options'],
          cta: 'Request Samples',
          ctaLink: '/en/contact?intent=sample&inquiry=thermal_paper_rolls'
        },
        {
          id: 'printed',
          title: 'Printed Thermal Paper Rolls',
          shortDesc: 'Custom printed thermal rolls for branding and project use.',
          bullets: ['Logo and layout printing', 'Suitable for retail chains and projects', 'Stable print registration'],
          cta: 'Request Samples',
          ctaLink: '/en/contact?intent=sample&inquiry=thermal_paper_rolls'
        },
        {
          id: 'supply',
          title: 'Supply Options',
          shortDesc: 'Flexible supply models for different purchasing needs.',
          bullets: ['Regular and contract-based supply', 'Stable lead time planning', 'Export packaging support'],
          cta: 'Request Samples',
          ctaLink: '/en/contact?intent=sample&inquiry=thermal_paper_rolls'
        }
      ]
    },
    manufacturing: {
      sectionTitle: 'Manufacturing Capability',
      intro: 'Produced on dedicated converting lines, our thermal paper rolls are manufactured with controlled processes to ensure consistent output for both distribution and project-based orders.',
      items: [
        { icon: 'factory', label: 'Multiple converting lines', value: '' },
        { icon: 'clock', label: 'Stable daily output', value: '' },
        { icon: 'shield', label: 'In-process quality control', value: '' },
        { icon: 'globe', label: 'Export experience', value: '' }
      ]
    },
    applications: {
      sectionTitle: 'Application Scenarios',
      items: [
        { icon: 'store', title: 'Retail & POS systems', desc: 'Receipt printing for cashier counters, self-checkout, and payment terminals in retail environments.', link: '/en/applications/retail-pos' },
        { icon: 'store', title: 'Supermarkets', desc: 'High-volume receipt rolls for supermarket POS lanes with reliable daily throughput and consistent print quality.', link: '/en/applications/supermarkets' },
        { icon: 'coffee', title: 'Hospitality and service', desc: 'Order tickets, billing receipts, and kitchen printouts for restaurants, hotels, and service businesses.', link: '/en/applications/retail-pos' },
        { icon: 'briefcase', title: 'Government and project procurement', desc: 'Bulk supply for public sector offices, transit systems, and large-scale institutional procurement.', link: '/en/applications/government-tenders' }
      ]
    },
    customization: {
      sectionTitle: 'Customization & OEM',
      intro: 'We support customization to meet different operational and branding needs.',
      options: [
        { icon: 'box', title: 'Roll size and core options', desc: 'Width, length, and core diameter customized to fit your POS hardware and storage requirements.' },
        { icon: 'printer', title: 'Custom printing and layout', desc: 'Logo, back printing, and promotional messages printed on the thermal paper surface or backing.' },
        { icon: 'package', title: 'Packaging and palletizing', desc: 'Shrink-wrapped rolls, boxed units, or pallet shipments — labeled and documented for retail or project delivery.' }
      ]
    },
    quality: {
      sectionTitle: 'Quality & Compliance',
      items: [
        { title: 'Batch consistency control', desc: 'Coating weight and print density measured on each production batch to ensure uniform output across orders.' },
        { title: 'Pre-shipment inspection', desc: 'Rolls are inspected for cuts, splices, winding tension, and overall print performance before dispatch.' },
        { title: 'Project documentation support', desc: 'Test reports, CoA, and product specifications provided for tender buyers and large-volume project orders.' }
      ]
    },
    ctaBlock: {
      headline: 'Need pricing or samples for your thermal paper program?',
      subtext: 'Send us your size, quantity, and destination market. We can support repeat supply, OEM printing, and procurement review.',
      button: 'Request a Quote',
      buttonLink: '/en/contact?intent=quote&inquiry=thermal_paper_rolls'
    },
    seo: {
      title: 'Thermal Paper Rolls Manufacturer | POS & ATM Receipt Paper | Zhixin',
      description: 'Factory-manufactured thermal paper rolls for POS, retail, and project procurement. Blank and printed options with stable supply.',
      keywords: 'thermal paper rolls, POS paper, receipt paper manufacturer, thermal paper factory, OEM thermal rolls, blank thermal paper'
    }
  },

  ru: {
    hero: {
      h1: 'Термобумага в рулонах для регулярных поставок и проектных закупок',
      subheading: 'Пустые и печатные рулоны собственного производства для ритейла, дистрибьюторов и контрактных закупок.',
      intro: 'Мы поставляем термобумагу с контролируемым покрытием, аккуратной намоткой и гибкими OEM-опциями для повторных заказов, сетевой розницы и проектов.'
    },
    overview: {
      paragraph: 'Термобумага в рулонах широко используется для печати чеков в розничной торговле, сервисе и автоматизированных системах. Мы делаем акцент на стабильное покрытие и одинаковое качество партий.',
      features: [
        {
          title: 'Стабильное термочувствительное покрытие',
          desc: 'Равномерное покрытие обеспечивает стабильную плотность печати и устойчивость к выцветанию для долгосрочного хранения записей.'
        },
        {
          title: 'Чистая резка и плотная намотка',
          desc: 'Точная нарезка и плотная намотка снижают замятия и обеспечивают стабильную подачу бумаги во всех стандартных POS-принтерах.'
        },
        {
          title: 'Типичные размеры для POS и терминалов: 80×80, 80×70, 57×40 мм (3 1/8"×230\', 2 1/4"×85\')',
          desc: 'Нестандартные длины рулонов, диаметры втулок и внешние диаметры доступны для конкретных моделей принтеров и крупных заказов.'
        }
      ]
    },
    productTypes: {
      sectionTitle: 'Варианты продукции',
      types: [
        {
          id: 'blank',
          title: 'Пустые рулоны термобумаги',
          shortDesc: 'Стандартные рулоны термобумаги для дистрибьюторов и регулярных поставок.',
          bullets: ['Совместимы с большинством POS-принтеров', 'Стабильное качество партий', 'Гибкие размеры под заказ'],
          cta: 'Запросить образцы',
          ctaLink: '/ru/contact?intent=sample&inquiry=thermal_paper_rolls'
        },
        {
          id: 'printed',
          title: 'Печатные рулоны термобумаги',
          shortDesc: 'Термобумага с печатью для брендинга и проектных заказов.',
          bullets: ['Печать логотипов и макетов', 'Подходит для сетевой розницы и проектов', 'Стабильное совмещение печати'],
          cta: 'Запросить образцы',
          ctaLink: '/ru/contact?intent=sample&inquiry=thermal_paper_rolls'
        },
        {
          id: 'supply',
          title: 'Варианты поставки',
          shortDesc: 'Гибкие модели поставок под разные потребности клиентов.',
          bullets: ['Регулярные и контрактные поставки', 'Планируемые сроки производства', 'Экспортная упаковка'],
          cta: 'Запросить образцы',
          ctaLink: '/ru/contact?intent=sample&inquiry=thermal_paper_rolls'
        }
      ]
    },
    manufacturing: {
      sectionTitle: 'Производственные возможности',
      intro: 'Производство термобумаги осуществляется на специализированных линиях с контролем всех этапов, что обеспечивает стабильное качество для дистрибьюторов и проектных клиентов.',
      items: [
        { icon: 'factory', label: 'Несколько линий резки и перемотки', value: '' },
        { icon: 'clock', label: 'Стабильный суточный объем', value: '' },
        { icon: 'shield', label: 'Контроль качества в процессе', value: '' },
        { icon: 'globe', label: 'Опыт экспортных поставок', value: '' }
      ]
    },
    applications: {
      sectionTitle: 'Сценарии применения',
      items: [
        { icon: 'store', title: 'Розница и POS-системы', desc: 'Печать чеков на кассах, терминалах самообслуживания и платежных устройствах в торговых точках.', link: '/ru/applications/retail-pos' },
        { icon: 'store', title: 'Супермаркеты', desc: 'Крупнообъемные рулоны для кассовых лент супермаркетов со стабильной ежедневной пропускной способностью.', link: '/ru/applications/supermarkets' },
        { icon: 'coffee', title: 'Гостиницы и сервис', desc: 'Чеки заказов, счета и кухонные распечатки для ресторанов, отелей и предприятий сервиса.', link: '/ru/applications/retail-pos' },
        { icon: 'briefcase', title: 'Государственные и проектные закупки', desc: 'Оптовые поставки для государственных учреждений, транспортных систем и крупных институциональных закупок.', link: '/ru/applications/government-tenders' }
      ]
    },
    customization: {
      sectionTitle: 'Кастомизация и OEM',
      intro: 'Мы поддерживаем кастомизацию под разные требования бизнеса и бренда.',
      options: [
        { icon: 'box', title: 'Размеры рулонов и втулки', desc: 'Ширина, длина и диаметр втулки настраиваются под ваше оборудование и требования к хранению.' },
        { icon: 'printer', title: 'Индивидуальная печать', desc: 'Логотип, нанесение на оборотную сторону и рекламные сообщения на поверхности или подложке термобумаги.' },
        { icon: 'package', title: 'Упаковка и паллетирование', desc: 'Рулоны в термоусадочной пленке, коробках или на паллетах — с маркировкой и документами для розничной или проектной поставки.' }
      ]
    },
    quality: {
      sectionTitle: 'Качество и соответствие',
      items: [
        { title: 'Контроль стабильности партий', desc: 'Вес покрытия и плотность печати измеряются в каждой партии для обеспечения единого качества заказов.' },
        { title: 'Проверка перед отгрузкой', desc: 'Рулоны проверяются на порезы, склейки, натяжение намотки и общее качество печати перед отправкой.' },
        { title: 'Поддержка проектной документации', desc: 'Протоколы испытаний, CoA и технические характеристики предоставляются для тендерных закупок и крупных проектных заказов.' }
      ]
    },
    ctaBlock: {
      headline: 'Нужны цены или образцы по программе закупки термобумаги?',
      subtext: 'Отправьте размер, объём и рынок поставки. Мы поддержим повторные поставки, OEM-печать и закупочное согласование.',
      button: 'Запросить расчет',
      buttonLink: '/ru/contact?intent=quote&inquiry=thermal_paper_rolls'
    },
    seo: {
      title: 'Термобумага в рулонах — Производитель | POS и чековая печать | Zhixin',
      description: 'Термобумага собственного производства для POS, розницы и проектных закупок. Пустые и печатные варианты со стабильными поставками.',
      keywords: 'термобумага в рулонах, POS бумага, производитель чековой бумаги, завод термобумаги, OEM термобумага, пустая термобумага'
    }
  },

  zh: {
    hero: {
      h1: '适合长期补货与项目采购的热敏纸卷',
      subheading: '空白卷与印刷卷均由自有工厂生产，适用于零售连锁、分销商和合同采购。',
      intro: '我们提供涂层稳定、分切整齐、支持 OEM 的热敏纸卷方案，适合持续补货、连锁零售和项目型订单。'
    },
    overview: {
      paragraph: '热敏纸卷广泛应用于零售、服务和自动交易系统的收据打印。我们的生产专注于稳定涂层、清洁切割和批次间的一致性能。',
      features: [
        {
          title: '稳定的热敏涂层，确保清晰图像密度',
          desc: '均匀涂层保证批次间打印浓度一致，防褪色性能适合长期档案保存需求。'
        },
        {
          title: '清洁切割和紧密卷绕',
          desc: '精密分切和紧密卷绕减少卡纸现象，确保在所有主流 POS 打印机中顺畅走纸。'
        },
        {
          title: '常用品种：80×80、80×70、57×40mm（3 1/8"×230\'，2 1/4"×85\'），适配主流 POS 和终端设备',
          desc: '可按客户指定打印机型号和大批量需求定制卷长、纸芯内径和外径规格。'
        }
      ]
    },
    productTypes: {
      sectionTitle: '产品选项',
      types: [
        {
          id: 'blank',
          title: '空白热敏纸卷',
          shortDesc: '适用于分销商和常规供应的标准热敏纸卷。',
          bullets: ['兼容常见POS打印机', '批次间质量一致', '灵活的尺寸选项'],
          cta: '申请样品',
          ctaLink: '/zh/contact?intent=sample&inquiry=thermal_paper_rolls'
        },
        {
          id: 'printed',
          title: '印刷热敏纸卷',
          shortDesc: '用于品牌和项目的定制印刷热敏卷。',
          bullets: ['标识和版式印刷', '适合连锁零售和项目', '稳定的印刷套准'],
          cta: '申请样品',
          ctaLink: '/zh/contact?intent=sample&inquiry=thermal_paper_rolls'
        },
        {
          id: 'supply',
          title: '供应选项',
          shortDesc: '针对不同采购需求的灵活供应模式。',
          bullets: ['常规和基于合同的供应', '稳定的交期规划', '出口包装支持'],
          cta: '申请样品',
          ctaLink: '/zh/contact?intent=sample&inquiry=thermal_paper_rolls'
        }
      ]
    },
    manufacturing: {
      sectionTitle: '生产能力',
      intro: '在专用分切线上生产，我们的热敏纸卷通过受控工艺制造，确保分销和项目订单的一致产出。',
      items: [
        { icon: 'factory', label: '多条分切线', value: '' },
        { icon: 'clock', label: '稳定的日产量', value: '' },
        { icon: 'shield', label: '过程质量控制', value: '' },
        { icon: 'globe', label: '出口经验', value: '' }
      ]
    },
    applications: {
      sectionTitle: '应用场景',
      items: [
        { icon: 'store', title: '零售与POS系统', desc: '用于零售收银台、自助结账机和支付终端的小票打印。', link: '/zh/applications/retail-pos' },
        { icon: 'store', title: '超市', desc: '适用于超市收银通道的大批量收据卷，日产能稳定，打印质量一致。', link: '/zh/applications/supermarkets' },
        { icon: 'coffee', title: '餐饮和服务业', desc: '适用于餐厅、酒店和服务业的点单小票、账单打印和厨房出票。', link: '/zh/applications/retail-pos' },
        { icon: 'briefcase', title: '政府和项目采购', desc: '面向政府机关、公共交通系统及大型机构的集中批量采购供应。', link: '/zh/applications/government-tenders' }
      ]
    },
    customization: {
      sectionTitle: '定制化与OEM',
      intro: '我们支持定制化以满足不同的运营和品牌需求。',
      options: [
        { icon: 'box', title: '卷材尺寸和纸芯选项', desc: '宽度、卷长和纸芯内径可按您的 POS 设备和仓储需求定制。' },
        { icon: 'printer', title: '定制印刷和版式', desc: '支持标识、背面印刷和促销信息印刷，附着于热敏纸正面或底纸上。' },
        { icon: 'package', title: '包装和码放', desc: '提供收缩膜卷装、箱装或托盘装，含标签和国际运输单据，适合零售和项目交付。' }
      ]
    },
    quality: {
      sectionTitle: '质量与合规',
      items: [
        { title: '批次一致性控制', desc: '每批次检测涂层克重和打印浓度，确保订单间输出均匀一致。' },
        { title: '出货前检验', desc: '发货前对每卷进行切口、拼接、卷绕张力和整体打印质量检查。' },
        { title: '项目文档支持', desc: '可为招投标采购和大批量项目订单提供检测报告、CoA 及产品技术规格书。' }
      ]
    },
    ctaBlock: {
      headline: '如果你正在采购热敏纸卷的报价或样品',
      subtext: '告诉我们规格、数量区间和目的市场，我们可以支持长期供货、OEM 印刷和采购审核。',
      button: '索取报价',
      buttonLink: '/zh/contact?intent=quote&inquiry=thermal_paper_rolls'
    },
    seo: {
      title: '热敏纸卷生产厂家 | POS与ATM收据纸 | 志信纸业',
      description: '工厂自产热敏纸卷，适用于POS、零售和项目采购。空白和印刷选项，供应稳定。',
      keywords: '热敏纸卷, POS纸, 收据纸厂家, 热敏纸工厂, OEM热敏卷, 空白热敏纸'
    }
  }
};
