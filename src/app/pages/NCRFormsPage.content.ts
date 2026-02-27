/**
 * NCRFormsPage 三语言内容数据
 * 页面组件从此文件导入，不直接内联。
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface NCRFormsContent {
  hero: { h1: string; subheading: string; intro: string };
  overview: { paragraph: string; features: { title: string; desc: string }[] };
  productTypes: {
    sectionTitle: string;
    types: { id: string; title: string; shortDesc: string; bullets: string[]; cta: string; ctaLink: string }[];
  };
  manufacturing: { sectionTitle: string; intro: string; items: { icon: string; label: string; value: string }[] };
  applications: { sectionTitle: string; items: { icon: string; title: string; desc: string; link: string }[] };
  customization: { sectionTitle: string; intro: string; options: { icon: string; title: string; desc: string }[] };
  quality: { sectionTitle: string; items: { title: string; desc: string }[] };
  ctaBlock: { headline: string; subtext: string; button: string; buttonLink: string };
  seo: { title: string; description: string; keywords: string };
}

export const content: Record<Lang, NCRFormsContent> = {
  en: {
    hero: {
      h1: 'NCR Forms (Carbonless Forms)',
      subheading: 'In-house manufactured carbonless forms for documentation and projects',
      intro: 'We manufacture NCR forms on dedicated converting and printing lines, supplying blank, printed, and continuous forms for business, finance, and government project requirements.'
    },
    overview: {
      paragraph: 'NCR forms are multi-part carbonless documents used for invoices, delivery notes, and official records. Our production focuses on clean image transfer, accurate registration, and stable paper feeding across different formats.',
      features: [
        {
          title: 'Clear image transfer without carbon paper',
          desc: 'Micro-encapsulated coating on each ply ensures legible copies with consistent ink density, even on the third or fourth copy sheet.'
        },
        {
          title: 'Accurate alignment across multiple plies',
          desc: 'Precise ply registration ensures printed text, fields, and barcodes align correctly across all copies in a set.'
        },
        {
          title: 'Suitable for standard and continuous printing',
          desc: 'Available in cut-sheet sets and tractor-feed continuous formats, compatible with dot matrix, inkjet, and offset printing.'
        }
      ]
    },
    productTypes: {
      sectionTitle: 'Product Options',
      types: [
        {
          id: 'blank',
          title: 'Blank NCR Forms',
          shortDesc: 'Standard carbonless forms for general documentation and distribution.',
          bullets: ['Multiple ply options available', 'Clean and consistent image transfer', 'Smooth feeding performance'],
          cta: 'Request Info',
          ctaLink: '/en/contact'
        },
        {
          id: 'printed',
          title: 'Printed NCR Forms',
          shortDesc: 'Custom printed NCR forms for branding and official documentation.',
          bullets: ['Custom layouts and numbering', 'Suitable for accounting and logistics', 'Stable print registration'],
          cta: 'Request Info',
          ctaLink: '/en/contact'
        },
        {
          id: 'continuous',
          title: 'Continuous NCR Forms',
          shortDesc: 'Tractor-feed NCR forms for dot matrix and legacy printing systems.',
          bullets: ['Side perforation for continuous feeding', 'Compatible with dot matrix printers', 'Widely used in government and project systems'],
          cta: 'Request Info',
          ctaLink: '/en/contact'
        }
      ]
    },
    manufacturing: {
      sectionTitle: 'Manufacturing Capability',
      intro: 'NCR forms are produced on dedicated converting and printing lines, allowing us to control ply alignment, print quality, and batch consistency for long-term and tender-based supply.',
      items: [
        { icon: 'factory', label: 'Dedicated NCR production lines', value: '' },
        { icon: 'clock', label: 'Stable daily output', value: '' },
        { icon: 'shield', label: 'In-process inspection', value: '' },
        { icon: 'globe', label: 'Export and project experience', value: '' }
      ]
    },
    applications: {
      sectionTitle: 'Application Scenarios',
      items: [
        { icon: 'file', title: 'Invoices and delivery notes', desc: 'Multi-part forms for sales invoices, purchase orders, and delivery documentation with instant duplicate copies.', link: '/en/applications/retail-pos' },
        { icon: 'calculator', title: 'Accounting and financial records', desc: 'Receipts, vouchers, and financial transaction records requiring simultaneous duplicate or triplicate copies.', link: '/en/applications/banking-finance' },
        { icon: 'briefcase', title: 'Government and tender documentation', desc: 'Official forms, permits, and multi-copy records for public administration, customs, and tender-based procurement.', link: '/en/applications/government-tenders' },
        { icon: 'building', title: 'Logistics and warehouse documentation', desc: 'Packing lists, goods receipt notes, and dispatch records for warehouse operations and supply chain management.', link: '/en/applications/logistics-warehousing' }
      ]
    },
    customization: {
      sectionTitle: 'Customization & OEM',
      intro: 'We support customization for different documentation systems and workflows.',
      options: [
        { icon: 'box', title: 'Form size and layout', desc: 'A4, A5, letter, and custom sizes available; layouts designed to match your existing forms or system templates.' },
        { icon: 'printer', title: 'Printing and numbering', desc: 'Custom pre-printed fields, logos, sequential serial numbering, and color-coded ply differentiation.' },
        { icon: 'package', title: 'Packaging and palletizing', desc: 'Forms supplied in pads, books, or boxes — export-ready with labeling and shipping documentation.' }
      ]
    },
    quality: {
      sectionTitle: 'Quality & Compliance',
      items: [
        { title: 'Consistent copy quality across plies', desc: 'Coating transfer and image density tested on each ply to ensure readability on all copies in a set.' },
        { title: 'Batch inspection before shipment', desc: 'Pre-shipment quality checks on ply alignment, perforation, binding, and overall print registration.' },
        { title: 'Documentation support for tenders', desc: 'Product specifications, test certificates, and samples available for government and institutional buyers.' }
      ]
    },
    ctaBlock: {
      headline: 'Looking for reliable NCR forms for your project?',
      subtext: 'Contact our team for specifications, samples, and tender support.',
      button: 'Request Tender Pack',
      buttonLink: '/en/request-tender-pack'
    },
    seo: {
      title: 'NCR Forms Manufacturer | Carbonless Forms for Business & Government | Zhixin',
      description: 'In-house manufactured NCR carbonless forms for invoices, accounting, and government projects. Blank, printed, and continuous options available.',
      keywords: 'NCR forms, carbonless forms, NCR paper manufacturer, invoice forms, continuous forms, government forms, tender documentation'
    }
  },

  ru: {
    hero: {
      h1: 'NCR-формы (безуглеродные формы)',
      subheading: 'Безуглеродные формы собственного производства для документов и проектов',
      intro: 'Мы производим NCR-формы на специализированных линиях, поставляя пустые, печатные и непрерывные формы для бизнеса, финансовых организаций и государственных проектов.'
    },
    overview: {
      paragraph: 'NCR-формы — это многослойные безуглеродные документы, используемые для счетов, накладных и официальных записей. Мы уделяем особое внимание четкости копирования и точности совмещения слоев.',
      features: [
        {
          title: 'Четкая передача изображения без копирки',
          desc: 'Микрокапсульное покрытие на каждом слое обеспечивает разборчивые копии со стабильной плотностью чернил, даже на третьем или четвёртом слое.'
        },
        {
          title: 'Точное совмещение слоев',
          desc: 'Точная регистрация слоёв гарантирует корректное выравнивание текста, полей и штрихкодов по всем копиям в наборе.'
        },
        {
          title: 'Подходит для стандартной и непрерывной печати',
          desc: 'Доступно в виде листовых наборов и форматов с тракторной подачей, совместимых с матричными, струйными и офсетными принтерами.'
        }
      ]
    },
    productTypes: {
      sectionTitle: 'Варианты продукции',
      types: [
        {
          id: 'blank',
          title: 'Пустые NCR-формы',
          shortDesc: 'Стандартные безуглеродные формы для общего документооборота.',
          bullets: ['Различное количество слоев', 'Четкая и стабильная копия', 'Плавная подача бумаги'],
          cta: 'Запросить информацию',
          ctaLink: '/ru/contact'
        },
        {
          id: 'printed',
          title: 'Печатные NCR-формы',
          shortDesc: 'Безуглеродные формы с печатью для брендинга и официальных документов.',
          bullets: ['Индивидуальные макеты и нумерация', 'Подходит для бухгалтерии и логистики', 'Стабильное совмещение печати'],
          cta: 'Запросить информацию',
          ctaLink: '/ru/contact'
        },
        {
          id: 'continuous',
          title: 'Непрерывные NCR-формы',
          shortDesc: 'NCR-формы с перфорацией для матричных и непрерывных принтеров.',
          bullets: ['Боковая перфорация для непрерывной подачи', 'Совместимы с матричными принтерами', 'Широко применяются в государственных системах'],
          cta: 'Запросить информацию',
          ctaLink: '/ru/contact'
        }
      ]
    },
    manufacturing: {
      sectionTitle: 'Производственные возможности',
      intro: 'Производство NCR-форм осуществляется на специализированных линиях, что позволяет контролировать совмещение слоев, качество печати и стабильность партий для контрактных и тендерных поставок.',
      items: [
        { icon: 'factory', label: 'Специализированные линии NCR', value: '' },
        { icon: 'clock', label: 'Стабильный суточный объем', value: '' },
        { icon: 'shield', label: 'Контроль в процессе производства', value: '' },
        { icon: 'globe', label: 'Опыт проектных и экспортных поставок', value: '' }
      ]
    },
    applications: {
      sectionTitle: 'Сценарии применения',
      items: [
        { icon: 'file', title: 'Счета и накладные', desc: 'Многослойные формы для счетов-фактур, заказов на покупку и товарно-сопроводительных документов с мгновенными дублирующими копиями.', link: '/ru/applications/retail-pos' },
        { icon: 'calculator', title: 'Бухгалтерские и финансовые документы', desc: 'Квитанции, ваучеры и финансовые записи, требующие одновременного получения дубликатов или триплетов.', link: '/ru/applications/banking-finance' },
        { icon: 'briefcase', title: 'Государственные и тендерные документы', desc: 'Официальные бланки, разрешения и многокопийные документы для государственного управления, таможни и тендерных закупок.', link: '/ru/applications/government-tenders' },
        { icon: 'building', title: 'Логистическая документация', desc: 'Упаковочные листы, приходные ордера и документы отгрузки для складских операций и управления цепочкой поставок.', link: '/ru/applications/logistics-warehousing' }
      ]
    },
    customization: {
      sectionTitle: 'Кастомизация и OEM',
      intro: 'Мы поддерживаем кастомизацию под различные системы документооборота.',
      options: [
        { icon: 'box', title: 'Размеры и макеты форм', desc: 'A4, A5, Letter и нестандартные размеры; макеты разрабатываются под существующие бланки или системные шаблоны.' },
        { icon: 'printer', title: 'Печать и нумерация', desc: 'Нанесение фирменных полей, логотипов, последовательных серийных номеров и цветовой дифференциации слоёв.' },
        { icon: 'package', title: 'Упаковка и паллетирование', desc: 'Поставка в блокнотах, книжках или коробках — с экспортной маркировкой и транспортными документами.' }
      ]
    },
    quality: {
      sectionTitle: 'Качество и соответствие',
      items: [
        { title: 'Стабильное качество копирования слоев', desc: 'Перенос покрытия и плотность изображения проверяются на каждом слое для обеспечения читаемости всех копий в наборе.' },
        { title: 'Проверка партий перед отгрузкой', desc: 'Предотгрузочный контроль совмещения слоёв, перфорации, скрепления и общего совмещения печати.' },
        { title: 'Поддержка тендерной документации', desc: 'Технические характеристики, сертификаты испытаний и образцы предоставляются государственным и институциональным покупателям.' }
      ]
    },
    ctaBlock: {
      headline: 'Ищете надежные NCR-формы для проекта?',
      subtext: 'Свяжитесь с нами для получения спецификаций, образцов и тендерной поддержки.',
      button: 'Запросить тендерный пакет',
      buttonLink: '/ru/request-tender-pack'
    },
    seo: {
      title: 'NCR-формы — Производитель | Безуглеродные формы для бизнеса и государства | Zhixin',
      description: 'NCR безуглеродные формы собственного производства для счетов, бухгалтерии и государственных проектов. Пустые, печатные и непрерывные варианты.',
      keywords: 'NCR формы, безуглеродные формы, производитель NCR бумаги, формы для счетов, непрерывные формы, государственные формы, тендерная документация'
    }
  },

  zh: {
    hero: {
      h1: 'NCR表格（无碳复写表格）',
      subheading: '自有工厂生产的无碳复写表格，用于文档和项目',
      intro: '我们在专用分切和印刷线上生产NCR表格，为商业、金融和政府项目需求提供空白、印刷和连续表格。'
    },
    overview: {
      paragraph: 'NCR表格是用于发票、送货单和官方记录的多联无碳文档。我们的生产专注于清晰的图像转印、精确的套准和不同格式下的稳定送纸。',
      features: [
        {
          title: '无需复写纸的清晰图像转印',
          desc: '每层微胶囊涂层确保复写字迹清晰，即使第三联、第四联也具备稳定的墨色浓度。'
        },
        {
          title: '多层间的精确对齐',
          desc: '精确的多层套准确保印刷文字、填写栏位和条码在每联之间准确对应。'
        },
        {
          title: '适合标准和连续打印',
          desc: '提供裁切单套本和牵引进纸连续本两种格式，兼容点阵、喷墨和胶印设备。'
        }
      ]
    },
    productTypes: {
      sectionTitle: '产品选项',
      types: [
        {
          id: 'blank',
          title: '空白NCR表格',
          shortDesc: '用于一般文档和分销的标准无碳表格。',
          bullets: ['多种层数选项', '清晰一致的图像转印', '顺畅的送纸性能'],
          cta: '索取信息',
          ctaLink: '/zh/contact'
        },
        {
          id: 'printed',
          title: '印刷NCR表格',
          shortDesc: '用于品牌和官方文档的定制印刷NCR表格。',
          bullets: ['定制版式和编号', '适合会计和物流', '稳定的印刷套准'],
          cta: '索取信息',
          ctaLink: '/zh/contact'
        },
        {
          id: 'continuous',
          title: '连续NCR表格',
          shortDesc: '用于点阵和传统打印系统的牵引进纸NCR表格。',
          bullets: ['侧边穿孔用于连续进纸', '兼容点阵打印机', '广泛用于政府和项目系统'],
          cta: '索取信息',
          ctaLink: '/zh/contact'
        }
      ]
    },
    manufacturing: {
      sectionTitle: '生产能力',
      intro: 'NCR表格在专用分切和印刷线上生产，使我们能够控制长期和投标供应的层对齐、打印质量和批次一致性。',
      items: [
        { icon: 'factory', label: '专用NCR生产线', value: '' },
        { icon: 'clock', label: '稳定的日产量', value: '' },
        { icon: 'shield', label: '过程检验', value: '' },
        { icon: 'globe', label: '出口和项目经验', value: '' }
      ]
    },
    applications: {
      sectionTitle: '应用场景',
      items: [
        { icon: 'file', title: '发票和送货单', desc: '用于销售发票、采购订单和送货文件的多联表格，可即时获得副本。', link: '/zh/applications/retail-pos' },
        { icon: 'calculator', title: '会计和财务记录', desc: '需要同时生成两联或三联副本的收据、凭证和财务交易记录。', link: '/zh/applications/banking-finance' },
        { icon: 'briefcase', title: '政府和投标文档', desc: '用于政务管理、海关通关和招投标采购的官方表格、许可证及多联记录。', link: '/zh/applications/government-tenders' },
        { icon: 'building', title: '物流和仓库文档', desc: '用于仓库运营和供应链管理的装箱单、收货确认单和发货记录。', link: '/zh/applications/logistics-warehousing' }
      ]
    },
    customization: {
      sectionTitle: '定制化与OEM',
      intro: '我们支持针对不同文档系统和工作流程的定制。',
      options: [
        { icon: 'box', title: '表格尺寸和版式', desc: '提供A4、A5、信纸及定制尺寸；版式设计可匹配现有表格或系统模板。' },
        { icon: 'printer', title: '印刷和编号', desc: '支持定制预印栏目、标识、流水编号及各联颜色区分。' },
        { icon: 'package', title: '包装和码放', desc: '提供便携本、装订册或箱装形式，含出口标签和运输单据，适合零售和项目交付。' }
      ]
    },
    quality: {
      sectionTitle: '质量与合规',
      items: [
        { title: '各层间一致的复写质量', desc: '每层涂层转印效果和墨色浓度均经检测，确保每套表格所有联次清晰可读。' },
        { title: '出货前批次检验', desc: '发货前对层间对齐、穿孔、装订和整体印刷套准进行全面质量检查。' },
        { title: '投标文档支持', desc: '可为政府和机构采购方提供产品规格书、检测证书和实物样品。' }
      ]
    },
    ctaBlock: {
      headline: '为您的项目寻找可靠的NCR表格？',
      subtext: '联系我们的团队获取规格、样品和投标支持。',
      button: '索取投标包',
      buttonLink: '/zh/request-tender-pack'
    },
    seo: {
      title: 'NCR表格生产厂家 | 商业与政府无碳复写表格 | 志信纸业',
      description: '自有工厂生产的NCR无碳表格，适用于发票、会计和政府项目。空白、印刷和连续选项。',
      keywords: 'NCR表格, 无碳复写表格, NCR纸厂家, 发票表格, 连续表格, 政府表格, 投标文档'
    }
  }
};
