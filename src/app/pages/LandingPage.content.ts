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

export interface DecisionPathItem {
  id: string;
  title: string;
  desc: string;
  cta: string;
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
  decisionPaths: {
    sectionTitle: string;
    intro: string;
    items: DecisionPathItem[];
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
      eyebrow: 'Factory-Direct Thermal Paper Supply',
      h1: 'Factory-Direct Thermal Paper & Labels for Reliable B2B Supply',
      subheading: '15+ years · 30 tons daily printing · 200,000 rolls per day',
      intro:
        'Thermal paper rolls, thermal labels, and NCR forms for wholesalers, retail chains, project buyers, and brand owners. OEM support, export-ready packaging, and stable long-term supply.',
      primaryCTA: 'Request a Quote',
      primaryCTALink: '/en/contact?intent=quote',
      secondaryCTA: 'Get Free Samples',
      secondaryCTALink: '/en/contact?intent=sample',
    },

    statistics: {
      items: [
        { value: '15+', label: 'Years in Manufacturing', icon: 'users' },
        { value: '30 Tons', label: 'Daily Printing', icon: 'factory' },
        { value: '200,000', label: 'Rolls per Day', icon: 'package' },
        { value: 'OEM / Tender', label: 'Project Support', icon: 'globe' },
      ],
    },

    aboutSection: {
      sectionTitle: 'Real Factory Capacity, Not Just Catalog Claims',
      intro:
        'Founded in 2009, Zhixin Paper runs a 5,000 m² facility with in-house slitting, printing, quality control, and export packing. For procurement teams, this means clearer production visibility, more stable lead times, and fewer delivery surprises.',
    },

    productSeries: {
      sectionTitle: 'Choose the Product Line That Fits Your Buying Need',
      series: [
        {
          id: 'thermal-till',
          icon: 'receipt',
          title: 'Thermal Paper Rolls',
          desc: 'For POS receipts, ATM slips, supermarkets, and retail chains',
          link: '/en/thermal-paper-rolls',
          cta: 'View Product Details',
        },
        {
          id: 'shipping-labels',
          icon: 'tag',
          title: 'Thermal Labels',
          desc: 'For shipping labels, warehousing, barcode printing, and logistics',
          link: '/en/thermal-labels',
          cta: 'View Product Details',
        },
        {
          id: 'ncr-forms',
          icon: 'file',
          title: 'NCR Forms',
          desc: 'For invoices, delivery notes, and multi-copy business forms',
          link: '/en/ncr-forms',
          cta: 'View Product Details',
        },
      ],
    },

    compliance: {
      sectionTitle: 'Trust Signals Procurement Teams Actually Check',
      subtext: 'Compliance, testing, and documentation support for repeat orders and project review',
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
      sectionTitle: 'Why Buyers Choose a Supplier That Can Deliver Repeatedly',
      strengths: [
        {
          icon: 'factory',
          title: 'Stable long-term supply capacity',
          desc: 'Integrated production means better control over output, replenishment planning, and order continuity.',
        },
        {
          icon: 'shield',
          title: 'Consistent quality across batches',
          desc: 'Thermal sensitivity, width, weight, and converting quality are checked to reduce downstream complaints.',
        },
        {
          icon: 'package',
          title: 'OEM sizes, printing, and packaging',
          desc: 'Custom dimensions, private label packaging, and printed roll options for wholesale and branded supply.',
        },
        {
          icon: 'globe',
          title: 'Export execution and project support',
          desc: 'Suitable for distributor onboarding, procurement review, and tender-related document preparation.',
        },
      ],
    },

    manufacturingSnapshot: {
      sectionTitle: 'What Keeps Your Orders Moving',
      intro:
        'Production lines, QC workflow, warehouse handling, and container loading all affect delivery confidence. We show the operational side because B2B buyers need more than a catalog.',
      items: [
        { icon: 'factory', label: 'Production Lines', desc: '15 slitting lines and 4 printing lines for repeat supply and custom production' },
        { icon: 'shield', label: 'Quality Control', desc: 'Checks before packing and shipment to keep batches stable' },
        { icon: 'package', label: 'Warehouse & Packing', desc: 'Bulk order handling, pallet control, and export-ready packaging' },
        { icon: 'globe', label: 'Container Loading', desc: 'Operational support for international delivery and project dispatch' },
      ],
      cta: 'See Factory Capability',
      ctaLink: '/en/manufacturing',
    },

    applicationsTeaser: {
      sectionTitle: 'Built for Real Business Use Cases',
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
      sectionTitle: 'Need Raw Material Supply Too?',
      intro:
        'Besides finished products, we also support thermal, self-adhesive, and NCR material supply for converters and trade customers.',
      cta: 'View Material Supply',
      ctaLink: '/en/material-supply',
    },

    decisionPaths: {
      sectionTitle: 'Tell Us What Stage You Are In',
      intro: 'Choose the fastest path for pricing, sample evaluation, or tender support.',
      items: [
        {
          id: 'quote',
          title: 'Need Pricing?',
          desc: 'Best for buyers who already know product type, target quantity, or destination market.',
          cta: 'Request a Quote',
          link: '/en/contact?intent=quote',
        },
        {
          id: 'sample',
          title: 'Need Samples?',
          desc: 'Best for checking print quality, material feel, label performance, or packaging fit.',
          cta: 'Get Free Samples',
          link: '/en/contact?intent=sample',
        },
        {
          id: 'tender',
          title: 'Need Tender Support?',
          desc: 'Best for project procurement, distributor onboarding, or document review before approval.',
          cta: 'Request Tender Support',
          link: '/en/contact?intent=tender',
        },
      ],
    },

    ctaBlock: {
      headline: 'Request a Free Sample Kit',
      subtext:
        'Professional inquiry response within 24 hours. Contact us for specifications, samples, and project support.',
      button: 'Send Inquiry',
      buttonLink: '/en/contact?intent=quote',
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
      eyebrow: 'Прямые поставки термопродукции с завода',
      h1: 'Термобумага и этикетки напрямую с завода для стабильных B2B-поставок',
      subheading: '15+ лет · 30 т печати в день · 200 000 рулонов в день',
      intro:
        'Термобумага, термоэтикетки и NCR-формы для оптовиков, сетевой розницы, проектных закупок и брендов. OEM, экспортная упаковка и долгосрочные поставки.',
      primaryCTA: 'Запросить расчёт',
      primaryCTALink: '/ru/contact?intent=quote',
      secondaryCTA: 'Получить образцы',
      secondaryCTALink: '/ru/contact?intent=sample',
    },

    statistics: {
      items: [
        { value: '15+', label: 'Лет производства', icon: 'users' },
        { value: '30 т', label: 'Печать в день', icon: 'factory' },
        { value: '200 000', label: 'Рулонов в день', icon: 'package' },
        { value: 'OEM / Тендер', label: 'Поддержка проектов', icon: 'globe' },
      ],
    },

    aboutSection: {
      sectionTitle: 'Реальные производственные мощности, а не только каталог',
      intro:
        'Zhixin Paper работает с 2009 года и управляет собственным производством площадью 5 000 м². Для закупщика это означает прозрачность по линиям, контролю качества, упаковке и отгрузке, а значит меньше рисков по срокам и качеству.',
    },

    productSeries: {
      sectionTitle: 'Подберите продукт под ваш сценарий закупки',
      series: [
        {
          id: 'thermal-paper',
          icon: 'receipt',
          title: 'Термобумага в рулонах',
          desc: 'Для POS, чеков, банкоматов, супермаркетов и сетевой розницы',
          link: '/ru/thermal-paper-rolls',
          cta: 'Подробнее о продукте',
        },
        {
          id: 'thermal-labels',
          icon: 'tag',
          title: 'Термоэтикетки',
          desc: 'Для логистики, складов, доставки и печати штрихкодов',
          link: '/ru/thermal-labels',
          cta: 'Подробнее о продукте',
        },
        {
          id: 'ncr-forms',
          icon: 'file',
          title: 'NCR-формы',
          desc: 'Для накладных, счетов, многоэкземплярных и бизнес-документов',
          link: '/ru/ncr-forms',
          cta: 'Подробнее о продукте',
        },
      ],
    },

    compliance: {
      sectionTitle: 'Что проверяют отделы закупок и качества',
      subtext: 'Сертификация, тестирование и документальная готовность для повторных заказов и проектов',
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
      sectionTitle: 'Почему закупщики выбирают поставщика, который умеет отгружать повторно',
      strengths: [
        {
          icon: 'factory',
          title: 'Стабильные долгосрочные поставки',
          desc: 'Собственное производство упрощает планирование пополнения и снижает зависимость от внешних подрядчиков.',
        },
        {
          icon: 'shield',
          title: 'Стабильное качество партий',
          desc: 'Контроль чувствительности, ширины, веса и конвертинга помогает снизить претензии по повторным закупкам.',
        },
        {
          icon: 'package',
          title: 'OEM, размеры и упаковка под клиента',
          desc: 'Индивидуальные размеры, частная марка, брендированная упаковка и печать под оптовые и проектные поставки.',
        },
        {
          icon: 'globe',
          title: 'Экспорт и проектная поддержка',
          desc: 'Подходим для запуска дистрибьюции, закупочного согласования и тендерной документации.',
        },
      ],
    },

    manufacturingSnapshot: {
      sectionTitle: 'Что реально держит ваши поставки в графике',
      intro:
        'Для B2B-заказчика важны не только товары, но и производственные линии, контроль качества, склад и отгрузка. Поэтому мы показываем операционную сторону производства, а не только карточки товара.',
      items: [
        { icon: 'factory', label: 'Производственные линии', desc: '15 линий нарезки и 4 линии печати для повторных и нестандартных заказов' },
        { icon: 'shield', label: 'Контроль качества', desc: 'Проверки перед упаковкой и отгрузкой для стабильных партий' },
        { icon: 'package', label: 'Склад и упаковка', desc: 'Работа с паллетами, упаковкой и подготовкой к экспорту' },
        { icon: 'globe', label: 'Контейнерная отгрузка', desc: 'Поддержка международной логистики и проектных поставок' },
      ],
      cta: 'Посмотреть возможности завода',
      ctaLink: '/ru/manufacturing',
    },

    applicationsTeaser: {
      sectionTitle: 'Под реальные бизнес-сценарии',
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
      sectionTitle: 'Нужны ещё и сырьевые материалы?',
      intro: 'Помимо готовой продукции, мы поставляем термобумагу, самоклеящиеся и NCR материалы для конвертеров и трейдеров.',
      cta: 'Смотреть материалы',
      ctaLink: '/ru/material-supply',
    },

    decisionPaths: {
      sectionTitle: 'Скажите, на каком этапе закупки вы находитесь',
      intro: 'Выберите быстрый путь для расчёта, образцов или тендерной поддержки.',
      items: [
        {
          id: 'quote',
          title: 'Нужен расчёт?',
          desc: 'Для покупателей, у которых уже есть понимание продукта, объёма или рынка поставки.',
          cta: 'Запросить расчёт',
          link: '/ru/contact?intent=quote',
        },
        {
          id: 'sample',
          title: 'Нужны образцы?',
          desc: 'Для проверки качества печати, материала, размера или упаковки перед заказом.',
          cta: 'Получить образцы',
          link: '/ru/contact?intent=sample',
        },
        {
          id: 'tender',
          title: 'Нужна тендерная поддержка?',
          desc: 'Для проектных закупок, согласования поставщика или документальной проверки.',
          cta: 'Запросить поддержку',
          link: '/ru/contact?intent=tender',
        },
      ],
    },

    ctaBlock: {
      headline: 'Ищете надежного производственного партнера?',
      subtext: 'Свяжитесь с нами для получения спецификаций, образцов и проектной поддержки.',
      button: 'Связаться с нами',
      buttonLink: '/ru/contact?intent=quote',
    },
  },

  zh: {
    seo: {
      title: '热敏纸与热敏标签生产厂家 | 工厂直供 | 志信纸业',
      description: '自有工厂生产的热敏纸卷、热敏标签和NCR表格，服务全球业务。内部生产支持OEM定制和项目采购。',
      keywords: '热敏纸厂家, 热敏标签工厂, NCR表格供应商, OEM热敏纸, 工厂直供热敏产品',
    },

    hero: {
      eyebrow: '热敏纸工厂直供',
      h1: '热敏纸与标签工厂直供，稳定支持长期 B2B 采购',
      subheading: '15+ 年生产经验 · 日印刷 30 吨 · 日产 20 万卷',
      intro: '提供热敏纸卷、热敏标签、NCR 表格的规模化生产与定制服务，适用于批发、连锁零售、项目采购与品牌客户。',
      primaryCTA: '立即获取报价',
      primaryCTALink: '/zh/contact?intent=quote',
      secondaryCTA: '申请免费样品',
      secondaryCTALink: '/zh/contact?intent=sample',
    },

    statistics: {
      items: [
        { value: '15+', label: '年生产经验', icon: 'users' },
        { value: '30吨', label: '日印刷产能', icon: 'factory' },
        { value: '20万', label: '日产卷数', icon: 'package' },
        { value: 'OEM / 投标', label: '项目支持', icon: 'globe' },
      ],
    },

    aboutSection: {
      sectionTitle: '真实工厂能力，而不只是产品目录',
      intro:
        '志信纸业成立于2009年，拥有 5000 平方米厂房，自有分切、印刷、质检和出口包装流程。对采购方来说，这意味着更清晰的产线可见性、更稳定的交期，以及更低的履约风险。',
    },

    productSeries: {
      sectionTitle: '按采购需求快速选择产品线',
      series: [
        {
          id: 'thermal-paper',
          icon: 'receipt',
          title: '热敏纸卷',
          desc: '适用于 POS 小票、ATM 凭条、商超与连锁零售',
          link: '/zh/thermal-paper-rolls',
          cta: '查看产品详情',
        },
        {
          id: 'thermal-labels',
          icon: 'tag',
          title: '热敏标签',
          desc: '适用于物流面单、仓储标签、条码打印与配送流程',
          link: '/zh/thermal-labels',
          cta: '查看产品详情',
        },
        {
          id: 'ncr-forms',
          icon: 'file',
          title: 'NCR表格',
          desc: '适用于送货单、票据、业务单据和多联表单',
          link: '/zh/ncr-forms',
          cta: '查看产品详情',
        },
      ],
    },

    compliance: {
      sectionTitle: '采购团队真正会检查的信任信号',
      subtext: '认证、检测与文件配合能力，适用于重复采购和项目审查',
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
      sectionTitle: '为什么长期采购客户更看重稳定交付能力',
      strengths: [
        {
          icon: 'factory',
          title: '长期稳定供货',
          desc: '自有生产让补货计划更可控，也减少了对外部代工的依赖。',
        },
        {
          icon: 'shield',
          title: '批次质量更稳定',
          desc: '对热敏灵敏度、纸宽、卷重和加工质量进行检查，降低重复采购投诉风险。',
        },
        {
          icon: 'package',
          title: '支持 OEM、规格和包装定制',
          desc: '支持尺寸、印刷、品牌包装和私标需求，适合批发与项目订单。',
        },
        {
          icon: 'globe',
          title: '支持出口与项目资料',
          desc: '适用于供应商审核、项目采购、招投标资料准备和渠道合作。',
        },
      ],
    },

    manufacturingSnapshot: {
      sectionTitle: '真正决定交付稳定性的环节',
      intro: '对 B2B 客户来说，除了产品本身，更重要的是生产线、质检、仓储和装柜执行能力。这些决定了交付是否稳定。',
      items: [
        { icon: 'factory', label: '生产线', desc: '15 条分切线和 4 条印刷线支持返单与定制订单并行' },
        { icon: 'shield', label: '质检流程', desc: '包装和出货前的关键检查，保证批次稳定' },
        { icon: 'package', label: '仓储与包装', desc: '适合大货管理、托盘控制和出口包装' },
        { icon: 'globe', label: '装柜发运', desc: '支持国际运输和项目型发货安排' },
      ],
      cta: '查看工厂能力',
      ctaLink: '/zh/manufacturing',
    },

    applicationsTeaser: {
      sectionTitle: '围绕真实业务场景设计',
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
      sectionTitle: '如果你还需要原材料供应',
      intro: '除成品外，我们也支持热敏、自粘和 NCR 原材料供货，适合加工厂和贸易客户。',
      cta: '查看原材料供应',
      ctaLink: '/zh/material-supply',
    },

    decisionPaths: {
      sectionTitle: '告诉我们你现在处于哪个采购阶段',
      intro: '根据你的采购目标，选择最快的沟通入口。',
      items: [
        {
          id: 'quote',
          title: '我需要报价',
          desc: '适合已经有产品方向、数量区间或目标市场的采购客户。',
          cta: '立即获取报价',
          link: '/zh/contact?intent=quote',
        },
        {
          id: 'sample',
          title: '我需要样品',
          desc: '适合先测试纸张、标签、印刷效果或包装适配性的客户。',
          cta: '申请免费样品',
          link: '/zh/contact?intent=sample',
        },
        {
          id: 'tender',
          title: '我需要项目资料',
          desc: '适合投标、项目采购、渠道审核或供应商评估。',
          cta: '获取项目支持',
          link: '/zh/contact?intent=tender',
        },
      ],
    },

    ctaBlock: {
      headline: '寻找可靠的制造合作伙伴？',
      subtext: '联系我们获取规格、样品和项目支持。',
      button: '联系我们',
      buttonLink: '/zh/contact?intent=quote',
    },
  },
};
