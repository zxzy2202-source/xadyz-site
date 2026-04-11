/**
 * LandingPage 三语言内容数据
 * 页面组件从此文件导入，不直接内联。
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}

export interface ProductSeriesItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  link: string;
  cta: string;
}

export interface ComplianceBadge {
  label: string;
  desc: string;
}

export interface StrengthItem {
  icon: string;
  title: string;
  desc: string;
}

export interface ManufacturingItem {
  icon: string;
  label: string;
  desc: string;
}

export interface ApplicationItem {
  icon: string;
  title: string;
  link: string;
}

export interface LandingContent {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    subheading: string;
    intro: string;
    primaryCTA: string;
    primaryCTALink: string;
    secondaryCTA: string;
    secondaryCTALink: string;
  };
  statistics: {
    items: StatItem[];
  };
  /** 工厂简介两栏区块（图文并排，区别于 manufacturingSnapshot 列表区块） */
  aboutSection: {
    sectionTitle: string;
    intro: string;
  };
  productSeries: {
    sectionTitle: string;
    series: ProductSeriesItem[];
  };
  compliance: {
    sectionTitle: string;
    subtext: string;
    cta: string;
    ctaLink: string;
    badges: ComplianceBadge[];
  };
  whyChooseUs: {
    sectionTitle: string;
    strengths: StrengthItem[];
  };
  manufacturingSnapshot: {
    sectionTitle: string;
    intro: string;
    items: ManufacturingItem[];
    cta: string;
    ctaLink: string;
  };
  applicationsTeaser: {
    sectionTitle: string;
    items: ApplicationItem[];
    cta: string;
    ctaLink: string;
  };
  materialSupplyTeaser: {
    sectionTitle: string;
    intro: string;
    cta: string;
    ctaLink: string;
  };
  ctaBlock: {
    headline: string;
    subtext: string;
    button: string;
    buttonLink: string;
  };
}

export const content: Record<Lang, LandingContent> = {
  en: {
    seo: {
      title: 'Thermal Paper & Labels Manufacturer | FSC-Certified | Russia & CIS Markets | Zhixin',
      description:
        'Top-tier thermal paper rolls, thermal labels, and NCR forms for Russia, Kazakhstan and CIS markets. 30 tons daily, 200,000 rolls daily. BPA-free, FSC-certified. Factory direct.',
      keywords:
        'thermal paper manufacturer Russia Kazakhstan CIS, thermal till rolls, shipping labels, FSC certified thermal paper, BPA-free receipt paper, OEM thermal labels wholesale',
    },

    hero: {
      eyebrow: 'Thermal Paper & Label Manufacturer',
      h1: 'FSC-Certified Thermal Paper & Labels. Factory Direct. Your Supply Chain Never Breaks.',
      subheading: '30 tons daily printing · 200,000 rolls daily · 65-person team',
      intro:
        'In-house manufacturing for thermal rolls, labels, and NCR forms. Long-term supply, OEM customization, and project procurement for wholesalers, retailers, and brand owners.',
      primaryCTA: 'View Products',
      primaryCTALink: '/en/products',
      secondaryCTA: 'Request Free Sample Kit',
      secondaryCTALink: '/en/contact',
    },

    statistics: {
      items: [
        { value: '65', label: 'Total Staff', icon: 'users' },
        { value: '30 Tons', label: 'Daily Printing', icon: 'factory' },
        { value: '200,000', label: 'Rolls Daily Slitting', icon: 'package' },
        { value: '10', label: 'International Sales Experts', icon: 'globe' },
      ],
    },

    aboutSection: {
      sectionTitle: 'Established Factory. Reliable Supply.',
      intro:
        'Founded in 2009, Zhixin Paper operates a 5,000 m² facility with 65 dedicated staff. We manufacture thermal rolls, labels, and NCR forms entirely in-house — 15 slitting lines and 4 printing lines, no outsourcing, full traceability from raw material to shipment.',
    },

    productSeries: {
      sectionTitle: 'Core Products',
      series: [
        {
          id: 'thermal-till',
          icon: 'receipt',
          title: 'Thermal Till Rolls (POS)',
          desc: 'For retail, receipts, and POS systems',
          link: '/en/thermal-paper-rolls',
          cta: 'Learn More',
        },
        {
          id: 'shipping-labels',
          icon: 'tag',
          title: 'Shipping Labels (Direct Thermal)',
          desc: 'For logistics, DHL, DPD, and barcode tracking',
          link: '/en/thermal-labels',
          cta: 'Learn More',
        },
        {
          id: 'pre-printed',
          icon: 'file',
          title: 'Pre-printed Advertising Rolls',
          desc: 'Back-print coupons and brand marketing for supermarkets',
          link: '/en/thermal-paper-rolls/printed',
          cta: 'Learn More',
        },
      ],
    },

    compliance: {
      sectionTitle: 'Compliance & Certifications',
      subtext: 'Meeting CIS market standards and international quality requirements',
      cta: 'View All Certifications',
      ctaLink: '/en/manufacturing/certifications',
      badges: [
        { label: 'BPA FREE', desc: 'Bisphenol A free' },
        { label: 'FSC Certified', desc: 'Responsible forestry' },
        { label: 'ISO 9001', desc: 'Quality management' },
        { label: 'SGS Tested', desc: 'Third-party verified' },
      ],
    },

    whyChooseUs: {
      sectionTitle: 'Why Choose Us',
      strengths: [
        {
          icon: 'factory',
          title: 'In-house manufacturing',
          desc: 'Full control from raw material to finished product — no third-party dependency, faster lead times.',
        },
        {
          icon: 'shield',
          title: 'Stable quality and batch consistency',
          desc: 'Strict QC on every batch: roll weight, paper width, thermal sensitivity, and peel force tested.',
        },
        {
          icon: 'package',
          title: 'OEM & customization support',
          desc: 'Custom sizes, core diameters, back-print, and branded packaging tailored to your buyer requirements.',
        },
        {
          icon: 'globe',
          title: 'Export and project experience',
          desc: 'Serving CIS and Central Asian wholesalers since 2009, familiar with Russia/Kazakhstan import requirements and documentation.',
        },
      ],
    },

    manufacturingSnapshot: {
      sectionTitle: 'Scalable Capacity: Your Supply Chain Never Breaks',
      intro:
        '15 slitting machines and 4 printing lines running continuously. In-house QC lab, export-ready packaging, and flexible MOQ for project and repeat orders.',
      items: [
        { icon: 'receipt', label: 'Thermal Paper Rolls', desc: '80 mm, 57 mm and custom widths for any POS terminal' },
        { icon: 'tag', label: 'Thermal Labels', desc: 'Direct thermal for DHL, DPD, Amazon, and barcode printing' },
        { icon: 'file', label: 'NCR Forms', desc: '2/3-ply carbonless for receipts, delivery notes, and tenders' },
        { icon: 'factory', label: '30 tons daily capacity', desc: '15 slitting + 4 printing lines, scalable for large orders' },
      ],
      cta: 'View Manufacturing',
      ctaLink: '/en/manufacturing',
    },

    applicationsTeaser: {
      sectionTitle: 'Applications & Industries',
      items: [
        { icon: 'store', title: 'Retail & POS', link: '/en/applications/retail-pos' },
        { icon: 'truck', title: 'Logistics & Warehousing', link: '/en/applications/logistics-warehousing' },
        { icon: 'cart', title: 'Supermarkets', link: '/en/applications/supermarkets' },
        { icon: 'briefcase', title: 'Government & Tenders', link: '/en/applications/government-tenders' },
      ],
      cta: 'View All Applications',
      ctaLink: '/en/applications',
    },

    materialSupplyTeaser: {
      sectionTitle: 'Material Supply',
      intro:
        'In addition to finished products, we also supply thermal, self-adhesive, and NCR materials with stable sourcing.',
      cta: 'View Material Supply',
      ctaLink: '/en/material-supply',
    },

    ctaBlock: {
      headline: 'Request a Free Sample Kit',
      subtext:
        'Professional inquiry response within 2 hours. Contact us for specifications, samples, and project support.',
      button: 'Send Inquiry',
      buttonLink: '/en/contact',
    },
  },

  ru: {
    seo: {
      title: 'Производитель термобумаги и термоэтикеток | Заводские поставки | Zhixin',
      description:
        'Термобумага, термоэтикетки и NCR-формы собственного производства для международного бизнеса. Производство с OEM-кастомизацией и проектной поддержкой.',
      keywords:
        'производитель термобумаги, завод термоэтикеток, поставщик NCR форм, OEM термобумага, заводские термопродукты',
    },

    hero: {
      eyebrow: 'Производитель термобумаги и этикеток',
      h1: 'Термобумага и этикетки с собственного завода. Прямые поставки. Стабильная логистика.',
      subheading: '30 т печати в день · 200 000 рулонов · OEM и проектные закупки',
      intro:
        'Готовая продукция: термобумага, термоэтикетки, NCR-формы. Долгосрочные контракты, кастомизация и поддержка оптовиков, ритейлеров и брендов.',
      primaryCTA: 'Смотреть продукцию',
      primaryCTALink: '/ru/products',
      secondaryCTA: 'Запросить тендерный пакет',
      secondaryCTALink: '/ru/request-tender-pack',
    },

    statistics: {
      items: [
        { value: '65', label: 'Сотрудников всего', icon: 'users' },
        { value: '30 т', label: 'Печать в день', icon: 'factory' },
        { value: '200 000', label: 'Рулонов в день', icon: 'package' },
        { value: '10', label: 'Международных экспертов', icon: 'globe' },
      ],
    },

    aboutSection: {
      sectionTitle: 'Собственный завод. Надёжные поставки.',
      intro:
        'Основана в 2009 году, Zhixin Paper управляет заводом площадью 5 000 м² с 65 сотрудниками. Мы производим термобумагу, этикетки и NCR-формы на собственном оборудовании — 15 линий нарезки, 4 печатные линии, без аутсорсинга, с полной прослеживаемостью от сырья до отгрузки.',
    },

    productSeries: {
      sectionTitle: 'Продукция нашего производства',
      series: [
        {
          id: 'thermal-paper',
          icon: 'receipt',
          title: 'Термобумага в рулонах',
          desc: 'Для POS, розницы и печати чеков',
          link: '/ru/thermal-paper-rolls',
          cta: 'Подробнее',
        },
        {
          id: 'thermal-labels',
          icon: 'tag',
          title: 'Термоэтикетки (рулоны)',
          desc: 'Для логистики, доставки и штрихкодирования',
          link: '/ru/thermal-labels',
          cta: 'Подробнее',
        },
        {
          id: 'ncr-forms',
          icon: 'file',
          title: 'NCR-формы',
          desc: 'Для государственных, тендерных и финансовых документов',
          link: '/ru/ncr-forms',
          cta: 'Подробнее',
        },
      ],
    },

    compliance: {
      sectionTitle: 'Сертификация и соответствие',
      subtext: 'Соответствие международным стандартам',
      cta: 'Все сертификаты',
      ctaLink: '/ru/manufacturing/certifications',
      badges: [
        { label: 'BPA FREE', desc: 'Без бисфенола А' },
        { label: 'FSC Certified', desc: 'Ответственная заготовка' },
        { label: 'ISO 9001', desc: 'Система менеджмента качества' },
        { label: 'SGS Tested', desc: 'Независимая верификация' },
      ],
    },

    whyChooseUs: {
      sectionTitle: 'Почему выбирают нас',
      strengths: [
        {
          icon: 'factory',
          title: 'Собственное производство',
          desc: 'Полный контроль от сырья до готовой продукции — без привлечения третьих сторон, сокращённые сроки.',
        },
        {
          icon: 'shield',
          title: 'Стабильное качество партий',
          desc: 'Строгий контроль каждой партии: вес рулона, ширина бумаги, термочувствительность и усилие отрыва.',
        },
        {
          icon: 'package',
          title: 'OEM и кастомизация',
          desc: 'Индивидуальные размеры, диаметры втулок, задняя печать и фирменная упаковка под ваши требования.',
        },
        {
          icon: 'globe',
          title: 'Опыт экспортных и проектных поставок',
          desc: 'Работаем с оптовиками России, Казахстана и стран СНГ с 2009 года, знаем требования к документации и логистике.',
        },
      ],
    },

    manufacturingSnapshot: {
      sectionTitle: 'Производственные возможности',
      intro:
        '15 линий нарезки и 4 печатные линии работают непрерывно. Собственная лаборатория ОТК, экспортная упаковка и гибкий MOQ для проектных и повторных заказов.',
      items: [
        { icon: 'receipt', label: 'Термобумага в рулонах', desc: '80 мм, 57 мм и нестандартные ширины для любых POS-терминалов' },
        { icon: 'tag', label: 'Термоэтикетки', desc: 'Прямая термопечать для DHL, DPD, Amazon и штрихкодирования' },
        { icon: 'file', label: 'NCR-формы', desc: '2/3-слойные для чеков, накладных и тендерной документации' },
        { icon: 'factory', label: '30 т печати в день', desc: '15 нарезных + 4 печатные линии, масштабируется под крупные заказы' },
      ],
      cta: 'Смотреть производство',
      ctaLink: '/ru/manufacturing',
    },

    applicationsTeaser: {
      sectionTitle: 'Применение и отрасли',
      items: [
        { icon: 'store', title: 'Ритейл и POS', link: '/ru/applications/retail-pos' },
        { icon: 'truck', title: 'Логистика и склад', link: '/ru/applications/logistics-warehousing' },
        { icon: 'cart', title: 'Супермаркеты', link: '/ru/applications/supermarkets' },
        { icon: 'briefcase', title: 'Государственные тендеры', link: '/ru/applications/government-tenders' },
      ],
      cta: 'Все отрасли',
      ctaLink: '/ru/applications',
    },

    materialSupplyTeaser: {
      sectionTitle: 'Поставка материалов',
      intro: 'Помимо готовой продукции, мы также поставляем термобумагу, самоклеящиеся и NCR материалы.',
      cta: 'Смотреть материалы',
      ctaLink: '/ru/material-supply',
    },

    ctaBlock: {
      headline: 'Ищете надежного производственного партнера?',
      subtext: 'Свяжитесь с нами для получения спецификаций, образцов и проектной поддержки.',
      button: 'Связаться с нами',
      buttonLink: '/ru/contact',
    },
  },

  zh: {
    seo: {
      title: '热敏纸与热敏标签生产厂家 | 工厂直供 | 志信纸业',
      description: '自有工厂生产的热敏纸卷、热敏标签和NCR表格，服务全球业务。内部生产支持OEM定制和项目采购。',
      keywords: '热敏纸厂家, 热敏标签工厂, NCR表格供应商, OEM热敏纸, 工厂直供热敏产品',
    },

    hero: {
      eyebrow: '热敏纸与标签制造商',
      h1: '热敏纸与标签工厂直供 · 产能稳定 · 供应链可靠',
      subheading: '日印刷 30 吨 · 日分切 20 万卷 · 自有工厂 · OEM 定制',
      intro: '热敏纸卷、热敏标签、NCR 表格自有工厂生产。长期供应、项目采购，服务批发商、零售与品牌客户。',
      primaryCTA: '查看产品',
      primaryCTALink: '/zh/products',
      secondaryCTA: '索取投标包',
      secondaryCTALink: '/zh/request-tender-pack',
    },

    statistics: {
      items: [
        { value: '65', label: '全体员工', icon: 'users' },
        { value: '30吨', label: '日印刷产能', icon: 'factory' },
        { value: '20万', label: '日分切卷数', icon: 'package' },
        { value: '10', label: '国际销售专员', icon: 'globe' },
      ],
    },

    aboutSection: {
      sectionTitle: '自有工厂，稳定供应',
      intro:
        '志信纸业成立于2009年，拥有5000平方米厂房和65名专职员工。15条分切线、4条印刷线全程在厂运营，热敏纸卷、热敏标签、NCR表格完全自主生产，不依赖外包，原料到出货全程可追溯。',
    },

    productSeries: {
      sectionTitle: '我们的工厂制造产品',
      series: [
        {
          id: 'thermal-paper',
          icon: 'receipt',
          title: '热敏纸卷',
          desc: '用于POS、零售和小票打印',
          link: '/zh/thermal-paper-rolls',
          cta: '了解更多',
        },
        {
          id: 'thermal-labels',
          icon: 'tag',
          title: '热敏标签（卷装）',
          desc: '用于物流、快递和条码追踪',
          link: '/zh/thermal-labels',
          cta: '了解更多',
        },
        {
          id: 'ncr-forms',
          icon: 'file',
          title: 'NCR表格',
          desc: '用于政府、投标和财务文档',
          link: '/zh/ncr-forms',
          cta: '了解更多',
        },
      ],
    },

    compliance: {
      sectionTitle: '合规与认证',
      subtext: '符合独联体市场标准及国际质量要求',
      cta: '查看全部认证',
      ctaLink: '/zh/manufacturing/certifications',
      badges: [
        { label: 'BPA FREE', desc: '双酚A游离' },
        { label: 'FSC Certified', desc: '可持续林业' },
        { label: 'ISO 9001', desc: '质量管理体系' },
        { label: 'SGS Tested', desc: '第三方检测' },
      ],
    },

    whyChooseUs: {
      sectionTitle: '为什么选择我们',
      strengths: [
        {
          icon: 'factory',
          title: '自有工厂生产',
          desc: '从原材料到成品全程自主控制，不依赖第三方，交期更快。',
        },
        {
          icon: 'shield',
          title: '稳定的质量和批次一致性',
          desc: '每批次严格检测：卷重、纸宽、热敏灵敏度和剥离力，确保批批一致。',
        },
        {
          icon: 'package',
          title: 'OEM与定制支持',
          desc: '可定制尺寸、纸芯直径、背面印刷和品牌包装，满足您的买家要求。',
        },
        {
          icon: 'globe',
          title: '出口和项目经验',
          desc: '自2009年起服务俄罗斯、哈萨克斯坦及独联体批发商，熟悉进口要求和文件规范。',
        },
      ],
    },

    manufacturingSnapshot: {
      sectionTitle: '生产能力：供应链从不断链',
      intro: '15条分切线和4条印刷线持续运转，自有品质实验室，出口包装就绪，项目与返单均支持灵活MOQ。',
      items: [
        { icon: 'receipt', label: '热敏纸卷', desc: '80mm、57mm及定制宽度，适配各类POS终端' },
        { icon: 'tag', label: '直接热敏标签', desc: '适用于DHL、顺丰、Amazon和条码打印' },
        { icon: 'file', label: 'NCR 表格', desc: '二/三联无碳复写，适用于收据、送货单和投标文件' },
        { icon: 'factory', label: '日产能 30 吨', desc: '15分切 + 4印刷线，可承接大宗订单' },
      ],
      cta: '查看生产',
      ctaLink: '/zh/manufacturing',
    },

    applicationsTeaser: {
      sectionTitle: '应用与行业',
      items: [
        { icon: 'store', title: '零售与POS', link: '/zh/applications/retail-pos' },
        { icon: 'truck', title: '物流与仓储', link: '/zh/applications/logistics-warehousing' },
        { icon: 'cart', title: '超市', link: '/zh/applications/supermarkets' },
        { icon: 'briefcase', title: '政府与投标', link: '/zh/applications/government-tenders' },
      ],
      cta: '查看所有应用',
      ctaLink: '/zh/applications',
    },

    materialSupplyTeaser: {
      sectionTitle: '原材料供应',
      intro: '除成品外，我们还提供稳定采购的热敏、自粘和NCR材料。',
      cta: '查看原材料供应',
      ctaLink: '/zh/material-supply',
    },

    ctaBlock: {
      headline: '寻找可靠的制造合作伙伴？',
      subtext: '联系我们获取规格、样品和项目支持。',
      button: '联系我们',
      buttonLink: '/zh/contact',
    },
  },
};
