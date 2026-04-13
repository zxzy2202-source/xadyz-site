/**
 * ThermalLabelsPage 三语言内容数据
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

export interface ThermalLabelsContent {
  hero: { h1: string; subheading: string; intro: string };
  overview: { paragraph: string; features: { title: string; desc: string }[] };
  productTypes: { sectionTitle: string; types: ProductType[] };
  manufacturing: { sectionTitle: string; intro: string; items: { icon: string; label: string; value: string }[] };
  applications: { sectionTitle: string; items: { icon: string; title: string; desc: string; link: string }[] };
  customization: { sectionTitle: string; intro: string; options: { icon: string; title: string; desc: string }[] };
  quality: { sectionTitle: string; items: { title: string; desc: string }[] };
  ctaBlock: { headline: string; subtext: string; button: string; buttonLink: string };
  seo: { title: string; description: string; keywords: string };
}

export const content: Record<Lang, ThermalLabelsContent> = {
  en: {
    hero: {
      h1: 'Thermal Labels for Logistics, Warehousing, and Repeat Fulfillment',
      subheading: 'In-house manufactured thermal labels for shipping, barcode operations, and branded labeling programs.',
      intro: 'We supply blank and printed thermal label rolls with stable adhesive performance, clear barcode printing, and OEM flexibility for logistics teams, distributors, and e-commerce operations.'
    },
    overview: {
      paragraph: 'Thermal labels are widely used for shipping, tracking, and identification in logistics and retail operations. Our production focuses on print clarity, adhesive stability, and consistent die-cut accuracy.',
      features: [
        {
          title: 'Clear thermal printing for barcodes',
          desc: 'High-sensitivity thermal coating ensures sharp, scannable barcodes even at high print speeds.'
        },
        {
          title: 'Stable adhesive performance',
          desc: 'Consistent peel strength across different surfaces — cartons, plastics, and glass — in varying temperature conditions.'
        },
        {
          title: 'Typical sizes: 4"×6", 4"×4" (100×150, 100×100 mm) for shipping labels; 58×40, 40×30 mm for retail and barcode labels',
          desc: 'Custom sizes and core dimensions available to match your printer model and operational requirements.'
        }
      ]
    },
    productTypes: {
      sectionTitle: 'Product Options',
      types: [
        {
          id: 'blank',
          title: 'Blank Thermal Labels',
          shortDesc: 'Standard thermal label rolls for logistics and distribution.',
          bullets: ['Compatible with common label printers', 'Stable adhesive options', 'Consistent label spacing'],
          cta: 'Request Samples',
          ctaLink: '/en/contact?intent=sample&inquiry=thermal_labels'
        },
        {
          id: 'printed',
          title: 'Printed Thermal Labels',
          shortDesc: 'Custom printed thermal labels for branding and tracking needs.',
          bullets: ['Logo and variable data printing', 'Suitable for logistics and e-commerce', 'Clear barcode readability'],
          cta: 'Request Samples',
          ctaLink: '/en/contact?intent=sample&inquiry=thermal_labels'
        },
        {
          id: 'supply',
          title: 'Supply Options',
          shortDesc: 'Flexible supply models for different labeling projects.',
          bullets: ['Regular and contract-based supply', 'Stable production scheduling', 'Export-ready packaging'],
          cta: 'Request Samples',
          ctaLink: '/en/contact?intent=sample&inquiry=thermal_labels'
        }
      ]
    },
    manufacturing: {
      sectionTitle: 'Manufacturing Capability',
      intro: 'Thermal labels are produced on in-house converting and printing lines, allowing us to control print quality, adhesive performance, and die-cut accuracy for long-term and project-based orders.',
      items: [
        { icon: 'factory', label: 'In-house printing and converting', value: '' },
        { icon: 'clock', label: 'Stable daily output', value: '' },
        { icon: 'shield', label: 'Adhesive and print inspection', value: '' },
        { icon: 'globe', label: 'Export experience', value: '' }
      ]
    },
    applications: {
      sectionTitle: 'Application Scenarios',
      items: [
        { icon: 'truck', title: 'Logistics & warehousing', desc: 'Shipping labels for parcels, pallets, and warehouse racking — compatible with DHL, DPD, and major courier systems.', link: '/en/applications/logistics-warehousing' },
        { icon: 'cart', title: 'E-commerce fulfillment', desc: 'High-volume label printing for order picking, packing slips, and last-mile delivery tracking.', link: '/en/applications/logistics-warehousing' },
        { icon: 'store', title: 'Retail labeling', desc: 'Price tags, shelf labels, and product identification labels for supermarkets and retail chains.', link: '/en/applications/retail-pos' },
        { icon: 'briefcase', title: 'Government and project logistics', desc: 'Labels for inventory tracking, asset management, and tender-based procurement projects.', link: '/en/applications/government-tenders' }
      ]
    },
    customization: {
      sectionTitle: 'Customization & OEM',
      intro: 'We support customized labeling solutions for different operational needs.',
      options: [
        { icon: 'box', title: 'Label size and shape', desc: 'Custom die-cut sizes, shapes, and core options to fit your label printer and workflow.' },
        { icon: 'barcode', title: 'Printing and data layout', desc: 'Logo, barcode, variable data, and sequential numbering printed with stable registration.' },
        { icon: 'package', title: 'Packaging and palletizing', desc: 'Export-ready packaging in rolls, boxes, or on pallets — labeled and documented for international shipment.' }
      ]
    },
    quality: {
      sectionTitle: 'Quality & Compliance',
      items: [
        { title: 'Consistent adhesive performance', desc: 'Adhesive strength tested across surface types and temperature ranges to ensure reliable application.' },
        { title: 'Print quality inspection', desc: 'Each production batch is checked for thermal sensitivity, barcode readability, and coating uniformity.' },
        { title: 'Batch control before shipment', desc: 'Pre-shipment sampling and quality records provided for project and tender buyers on request.' }
      ]
    },
    ctaBlock: {
      headline: 'Need pricing or samples for your thermal label workflow?',
      subtext: 'Share your label size, adhesive requirement, and shipping application. We support logistics, warehouse, and e-commerce programs.',
      button: 'Request a Quote',
      buttonLink: '/en/contact?intent=quote&inquiry=thermal_labels'
    },
    seo: {
      title: 'Thermal Labels Manufacturer | Logistics & Shipping Labels | Zhixin',
      description: 'In-house manufactured thermal label rolls for logistics, warehousing, and e-commerce. Blank and printed options with stable adhesive performance.',
      keywords: 'thermal labels, shipping labels, logistics labels, barcode labels manufacturer, thermal label rolls, OEM thermal labels'
    }
  },

  ru: {
    hero: {
      h1: 'Термоэтикетки для логистики, склада и регулярных поставок',
      subheading: 'Собственное производство термоэтикеток для отгрузок, штрихкодов и программ маркировки.',
      intro: 'Мы поставляем пустые и печатные термоэтикетки со стабильным клеевым слоем, чёткой печатью штрихкодов и OEM-вариантами для логистики, дистрибьюции и e-commerce.'
    },
    overview: {
      paragraph: 'Термоэтикетки широко применяются для доставки, отслеживания и идентификации в логистике и розничной торговле. Мы уеляем особое внимание четкости печати, стабильности клеевого слоя и точности высечки.',
      features: [
        {
          title: 'Четкая термопечать штрихкодов',
          desc: 'Высокочувствительное термопокрытие обеспечивает четкие, легко считываемые штрихкоды даже на высоких скоростях печати.'
        },
        {
          title: 'Стабильный клеевой слой',
          desc: 'Стабильная сила отрыва на разных поверхностях — картон, пластик, стекло — в различных температурных условиях.'
        },
        {
          title: 'Типичные размеры: 4"×6", 4"×4" (100×150, 100×100 мм) для транспортных этикеток; 58×40, 40×30 мм для розничных и штрихкодовых этикеток',
          desc: 'Нестандартные размеры и диаметры втулки доступны под ваш принтер и операционные требования.'
        }
      ]
    },
    productTypes: {
      sectionTitle: 'Варианты продукции',
      types: [
        {
          id: 'blank',
          title: 'Пустые термоэтикетки',
          shortDesc: 'Стандартные рулоны термоэтикеток для логистики и дистрибуции.',
          bullets: ['Совместимы с популярными принтерами этикеток', 'Надежный клеевой слой', 'Равномерный шаг этикеток'],
          cta: 'Запросить образцы',
          ctaLink: '/ru/contact?intent=sample&inquiry=thermal_labels'
        },
        {
          id: 'printed',
          title: 'Печатные термоэтикетки',
          shortDesc: 'Термоэтикетки с печатью для брендинга и отслеживания.',
          bullets: ['Печать логотипов и переменных данных', 'Подходит для логистики и e-commerce', 'Четкая читаемость штрихкодов'],
          cta: 'Запросить образцы',
          ctaLink: '/ru/contact?intent=sample&inquiry=thermal_labels'
        },
        {
          id: 'supply',
          title: 'Варианты поставки',
          shortDesc: 'Гибкие модели поставок для различных проектов маркировки.',
          bullets: ['Регулярные и контрактные поставки', 'Планируемое производство', 'Экспортная упаковка'],
          cta: 'Запросить образцы',
          ctaLink: '/ru/contact?intent=sample&inquiry=thermal_labels'
        }
      ]
    },
    manufacturing: {
      sectionTitle: 'Производственные возможности',
      intro: 'Производство термоэтикеток осуществляется на собственных линиях печати и конвертинга, что позволяет контролировать качество печати, клеевой слой и точность высечки.',
      items: [
        { icon: 'factory', label: 'Собственные линии печати и конвертинга', value: '' },
        { icon: 'clock', label: 'Стабильный суточный объем', value: '' },
        { icon: 'shield', label: 'Контроль клея и печати', value: '' },
        { icon: 'globe', label: 'Опыт экспортных поставок', value: '' }
      ]
    },
    applications: {
      sectionTitle: 'Сценарии применения',
      items: [
        { icon: 'truck', title: 'Логистика и склад', desc: 'Транспортные этикетки для посылок, поддонов и стеллажей — совместимы с DHL, DPD и ведущими курьерскими системами.', link: '/ru/applications/logistics-warehousing' },
        { icon: 'cart', title: 'E-commerce и фулфилмент', desc: 'Высокообъемная печать этикеток для комплектации заказов, упаковочных листов и отслеживания доставки.', link: '/ru/applications/logistics-warehousing' },
        { icon: 'store', title: 'Розничная маркировка', desc: 'Ценники, полочные этикетки и маркировка товаров для супермаркетов и розничных сетей.', link: '/ru/applications/retail-pos' },
        { icon: 'briefcase', title: 'Государственные и проектные поставки', desc: 'Этикетки для инвентаризации, управления активами и тендерных закупок.', link: '/ru/applications/government-tenders' }
      ]
    },
    customization: {
      sectionTitle: 'Кастомизация и OEM',
      intro: 'Мы поддерживаем индивидуальные решения по маркировке для различных операционных задач.',
      options: [
        { icon: 'box', title: 'Размер и форма этикеток', desc: 'Индивидуальная высечка, форма и диаметр втулки под ваш принтер и рабочий процесс.' },
        { icon: 'barcode', title: 'Печать и макет данных', desc: 'Логотип, штрихкод, переменные данные и последовательная нумерация со стабильным совмещением.' },
        { icon: 'package', title: 'Упаковка и паллетирование', desc: 'Экспортная упаковка в рулонах, коробках или на паллетах — с маркировкой и документами для международной отгрузки.' }
      ]
    },
    quality: {
      sectionTitle: 'Качество и соответствие',
      items: [
        { title: 'Стабильность клеевого слоя', desc: 'Сила адгезии проверяется на разных типах поверхностей и в разных температурных диапазонах.' },
        { title: 'Контроль качества печати', desc: 'Каждая партия проверяется по термочувствительности, читаемости штрихкодов и равномерности покрытия.' },
        { title: 'Проверка партий перед отгрузкой', desc: 'Предотгрузочное отбор проб и протоколы качества предоставляются проектным и тендерным покупателям по запросу.' }
      ]
    },
    ctaBlock: {
      headline: 'Нужны надежные термоэтикетки для логистики?',
      subtext: 'Свяжитесь с нами для получения спецификаций, образцов и проектной поддержки.',
      button: 'Запросить расчет',
      buttonLink: '/ru/contact'
    },
    seo: {
      title: 'Термоэтикетки — Производитель | Логистика и доставка | Zhixin',
      description: 'Термоэтикетки собственного производства для логистики, складов и e-commerce. Пустые и печатные варианты со стабильным клеевым слоем.',
      keywords: 'термоэтикетки, этикетки для доставки, логистические этикетки, производитель этикеток со штрихкодом, термоэтикетки в рулонах, OEM термоэтикетки'
    }
  },

  zh: {
    hero: {
      h1: '热敏标签',
      subheading: '自有工厂生产的热敏标签，用于物流和追踪',
      intro: '我们在自有工厂生产热敏标签卷，为物流、仓储和条码识别系统提供空白和印刷标签。'
    },
    overview: {
      paragraph: '热敏标签广泛用于物流和零售操作中的运输、追踪和识别。我们的生产专注于打印清晰度、粘合剂稳定性和一致的模切精度。',
      features: [
        {
          title: '清晰的条码热敏打印',
          desc: '高灵敏度热敏涂层确保即使在高打印速度下也能获得清晰、易扫描的条码。'
        },
        {
          title: '稳定的粘合剂性能',
          desc: '在纸箱、塑料、玻璃等不同表面及不同温度条件下，粘合强度稳定可靠。'
        },
        {
          title: '常用规格：4"×6"、4"×4"（100×150、100×100mm）用于运输标签；58×40、40×30mm 用于零售价签和条码标签',
          desc: '可根据您的打印机型号和操作需求定制标签尺寸和纸芯规格。'
        }
      ]
    },
    productTypes: {
      sectionTitle: '产品选项',
      types: [
        {
          id: 'blank',
          title: '空白热敏标签',
          shortDesc: '适用于物流和分销的标准热敏标签卷。',
          bullets: ['兼容常见标签打印机', '稳定的粘合剂选项', '一致的标签间距'],
          cta: '索取信息',
          ctaLink: '/zh/contact'
        },
        {
          id: 'printed',
          title: '印刷热敏标签',
          shortDesc: '用于品牌和追踪需求的定制印刷热敏标签。',
          bullets: ['标识和可变数据印刷', '适合物流和电商', '清晰的条码可读性'],
          cta: '索取信息',
          ctaLink: '/zh/contact'
        },
        {
          id: 'supply',
          title: '供应选项',
          shortDesc: '针对不同标签项目的灵活供应模式。',
          bullets: ['常规和基于合同的供应', '稳定的生产调度', '出口就绪包装'],
          cta: '索取信息',
          ctaLink: '/zh/contact'
        }
      ]
    },
    manufacturing: {
      sectionTitle: '生产能力',
      intro: '热敏标签在内部分切和印刷线上生产，使我们能够控制长期和项目订单的打印质量、粘合剂性能和模切精度。',
      items: [
        { icon: 'factory', label: '内部印刷和分切', value: '' },
        { icon: 'clock', label: '稳定的日产量', value: '' },
        { icon: 'shield', label: '粘合剂和打印检验', value: '' },
        { icon: 'globe', label: '出口经验', value: '' }
      ]
    },
    applications: {
      sectionTitle: '应用场景',
      items: [
        { icon: 'truck', title: '物流与仓储', desc: '用于快件、托盘和货架的运输标签，兼容顺丰、京东等主流物流及国际快递系统。', link: '/zh/applications/logistics-warehousing' },
        { icon: 'cart', title: '电商履约', desc: '支持大批量拣货、装箱清单打印及末端配送追踪的高效标签方案。', link: '/zh/applications/logistics-warehousing' },
        { icon: 'store', title: '零售标签', desc: '用于超市和零售连锁的价格标签、货架标签和商品标识标签。', link: '/zh/applications/retail-pos' },
        { icon: 'briefcase', title: '政府和项目物流', desc: '用于库存追踪、资产管理和基于招投标的采购项目标签需求。', link: '/zh/applications/government-tenders' }
      ]
    },
    customization: {
      sectionTitle: '定制化与OEM',
      intro: '我们支持针对不同运营需求的定制标签解决方案。',
      options: [
        { icon: 'box', title: '标签尺寸和形状', desc: '可定制模切尺寸、形状和纸芯规格，适配您的标签打印机和工作流程。' },
        { icon: 'barcode', title: '印刷和数据布局', desc: '支持标识、条码、可变数据及流水号印刷，套印稳定。' },
        { icon: 'package', title: '包装和码放', desc: '提供按卷、按箱或托盘装的出口包装，含标签和国际运输所需单据。' }
      ]
    },
    quality: {
      sectionTitle: '质量与合规',
      items: [
        { title: '一致的粘合剂性能', desc: '粘合强度经过多种表面类型和温度范围测试，确保稳定贴附。' },
        { title: '打印质量检验', desc: '每批次检验热敏灵敏度、条码可读性和涂层均匀性。' },
        { title: '出货前批次控制', desc: '可按需为项目和招投标采购方提供出货前抽检记录和质量报告。' }
      ]
    },
    ctaBlock: {
      headline: '需要可靠的物流热敏标签？',
      subtext: '联系我们的团队获取规格、样品和项目支持。',
      button: '索取报价',
      buttonLink: '/zh/contact'
    },
    seo: {
      title: '热敏标签生产厂家 | 物流与快递标签 | 志信纸业',
      description: '自有工厂生产的热敏标签卷，适用于物流、仓储和电商。空白和印刷选项，粘合剂性能稳定。',
      keywords: '热敏标签, 快递标签, 物流标签, 条码标签厂家, 热敏标签卷, OEM热敏标签'
    }
  }
};
