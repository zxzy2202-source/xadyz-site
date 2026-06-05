/**
 * AboutPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface ProductionLine {
  title: string;
  desc: string;
}

export interface AboutContent {
  // SEO
  title: string;
  description: string;
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  // Company Overview
  overviewTitle: string;
  overviewYear: string;
  overviewYearDesc: string;
  overviewFactory: string;
  overviewFactoryDesc: string;
  overviewExport: string;
  overviewExportDesc: string;
  overviewCapacity: string;
  overviewCapacityDesc: string;
  overviewText1: string;
  overviewText2: string;
  overviewText3: string;
  // Why Choose Us
  whyTitle: string;
  reason1Title: string;
  reason1Desc: string;
  reason2Title: string;
  reason2Desc: string;
  reason3Title: string;
  reason3Desc: string;
  reason4Title: string;
  reason4Desc: string;
  reason5Title: string;
  reason5Desc: string;
  reason6Title: string;
  reason6Desc: string;
  // Production Lines
  productionLinesTitle: string;
  productionLines: ProductionLine[];
  // Factory Showcase
  factoryTitle: string;
  factorySubtitle: string;
  factory1Title: string;
  factory1Desc: string;
  factory2Title: string;
  factory2Desc: string;
  factory3Title: string;
  factory3Desc: string;
  factory4Title: string;
  factory4Desc: string;
  // CTA
  ctaTitle: string;
  ctaDesc: string;
  ctaWhatsApp: string;
  ctaTelegram: string;
  ctaEmail: string;
}

export const content: Record<Lang, AboutContent> = {
  en: {
    title: "About Zhixin Paper — Thermal Paper Manufacturer Since 2009",
    description: "Zhixin Paper is a professional manufacturer of thermal paper, thermal labels, and jumbo rolls with its own factory in China. Stable supply to distributors in Russia, Kazakhstan, and CIS countries since 2009.",
    heroTitle: "About Zhixin Paper",
    heroSubtitle: "Professional Thermal Paper Manufacturer with Our Own Factory in China",
    heroDescription: "Since 2009, we have been providing stable wholesale supply of thermal paper, thermal labels, and jumbo rolls to distributors in Russia, Kazakhstan, and other CIS countries.",
    overviewTitle: "Our Story",
    overviewYear: "Founded in 2009",
    overviewYearDesc: "Over 15 years of thermal paper manufacturing experience",
    overviewFactory: "Own Factory",
    overviewFactoryDesc: "Production facility with complete equipment",
    overviewExport: "Export to CIS",
    overviewExportDesc: "Regular supply to Russia, Kazakhstan, Uzbekistan",
    overviewCapacity: "Production Capacity",
    overviewCapacityDesc: "Ability to fulfill large orders with consistent quality",
    overviewText1: "Zhixin Paper was established in 2009 as a specialized manufacturing enterprise focused on producing thermal paper, thermal labels, and jumbo rolls.",
    overviewText2: "Over 15 years of operation, we have built a stable production base and established long-term partnerships with distributors in Russia, Kazakhstan, Uzbekistan, and other CIS countries.",
    overviewText3: "Our factory is equipped with modern thermal paper production and slitting lines, ensuring consistent product quality and timely delivery of large orders.",
    whyTitle: "Why Choose Us",
    reason1Title: "Own Factory — Not a Trading Company",
    reason1Desc: "We have a complete production facility equipped with jumbo roll production, thermal paper slitting, and thermal label printing equipment. We control the entire process from raw materials to finished products.",
    reason2Title: "15+ Years of CIS Market Experience",
    reason2Desc: "We understand the specifics of Russian and Kazakhstan markets, requirements for documents, packaging, and logistics. Our managers speak Russian.",
    reason3Title: "Consistent Quality & Certifications",
    reason3Desc: "Every batch undergoes multi-stage quality control. We provide all necessary certificates and documents for customs clearance.",
    reason4Title: "Flexible Terms for Distributors",
    reason4Desc: "We work with wholesale clients and understand the importance of stable supply. Payment terms available for long-term partners.",
    reason5Title: "Quick Response",
    reason5Desc: "WhatsApp and Telegram for instant communication. Reply to inquiries within 2-4 hours (GMT+8, China time).",
    reason6Title: "Complete Production Cycle",
    reason6Desc: "From jumbo roll production to thermal paper slitting in any format and thermal label printing with your custom design.",
    productionLinesTitle: "Our Production Lines",
    productionLines: [
      { title: "Thermal Paper Roll Printing Line", desc: "Printing thermal receipt rolls with logos and promotional content for retail chains and project customers." },
      { title: "Thermal Paper Slitting Lines", desc: "Multiple slitting lines converting jumbo rolls into 80×80, 80×70, 57×40 mm and other common POS sizes." },
      { title: "NCR Form Production Line", desc: "Production of multi-part NCR forms for invoices, delivery notes, contracts and government tender documentation." },
    ],
    factoryTitle: "Our Factory",
    factorySubtitle: "Real Photos of Our Production Facility",
    factory1Title: "Factory Entrance",
    factory1Desc: "Zhixin Paper's production base is not a virtual office, but a real factory with complete equipment.",
    factory2Title: "Thermal Paper Roll Slitting Lines",
    factory2Desc: "Slitting jumbo rolls into finished rolls such as 80×80, 80×70, 57×40 mm and other common POS and terminal sizes.",
    factory3Title: "Thermal Paper Roll Printing Line",
    factory3Desc: "Printing logos, promotions and project-specific content on thermal receipt rolls for retail chains and projects.",
    factory4Title: "NCR Form Production Line",
    factory4Desc: "Multi-part NCR form production for invoices, delivery notes, contracts and government tender documents.",
    ctaTitle: "Ready to Start Cooperation?",
    ctaDesc: "Contact us via WhatsApp or Telegram to receive our product catalog and current prices.",
    ctaWhatsApp: "WhatsApp",
    ctaTelegram: "Telegram",
    ctaEmail: "Send Email",
  },

  ru: {
    title: "О компании Zhixin Paper — Производитель термобумаги в Китае с 2009 года",
    description: "Zhixin Paper — профессиональный производитель термобумаги, термоэтикеток и Jumbo рулонов с собственным заводом в Китае. Стабильные поставки для дистрибьюторов в России и СНГ с 2009 года.",
    heroTitle: "О компании Zhixin Paper",
    heroSubtitle: "Профессиональный производитель термобумаги с собственным заводом в Китае",
    heroDescription: "С 2009 года мы обеспечиваем стабильные оптовые поставки термобумаги, термоэтикеток и Jumbo рулонов для дистрибьюторов в России, Казахстане и других странах СНГ.",
    overviewTitle: "Наша история",
    overviewYear: "Основана в 2009 году",
    overviewYearDesc: "Более 15 лет опыта производства термобумаги",
    overviewFactory: "Собственный завод",
    overviewFactoryDesc: "Производственная база с полным циклом оборудования",
    overviewExport: "Экспорт в СНГ",
    overviewExportDesc: "Постоянные поставки в Россию, Казахстан, Узбекистан",
    overviewCapacity: "Производительность",
    overviewCapacityDesc: "Способность выполнять крупные заказы со стабильным качеством",
    overviewText1: "Zhixin Paper была основана в 2009 году как специализированное производственное предприятие, занимающееся изготовлением термобумаги, термоэтикеток и Jumbo рулонов.",
    overviewText2: "За более чем 15 лет работы мы выстроили стабильную производственную базу, наладили долгосрочные партнерства с дистрибьюторами в России, Казахстане, Узбекистане и других странах СНГ.",
    overviewText3: "Наш завод оснащен современными линиями по производству и нарезке термобумаги, что позволяет гарантировать стабильное качество продукции и своевременную отгрузку крупных заказов.",
    whyTitle: "Почему выбирают нас",
    reason1Title: "Собственный завод — не торговая компания",
    reason1Desc: "У нас есть полноценная производственная база с оборудованием для производства Jumbo рулонов, нарезки термобумаги и печати термоэтикеток. Мы контролируем весь процесс от сырья до готовой продукции.",
    reason2Title: "15+ лет опыта работы с СНГ рынком",
    reason2Desc: "Мы понимаем специфику российского и казахстанского рынков, требования к документам, упаковке и логистике. Наши менеджеры говорят по-русски.",
    reason3Title: "Стабильное качество и сертификаты",
    reason3Desc: "Каждая партия проходит многоступенчатый контроль качества. Мы предоставляем все необходимые сертификаты и документы для таможенного оформления.",
    reason4Title: "Гибкие условия для дистрибьюторов",
    reason4Desc: "Мы работаем с оптовыми клиентами и понимаем важность стабильных поставок. Возможна работа с отсрочкой платежа для постоянных партнеров.",
    reason5Title: "Быстрая обратная связь",
    reason5Desc: "WhatsApp и Telegram для оперативного общения. Ответ на запрос в течение 2-4 часов (GMT+8, китайское время).",
    reason6Title: "Полный цикл производства",
    reason6Desc: "От производства Jumbo рулонов до нарезки термобумаги любых форматов и печати термоэтикеток с вашим дизайном.",
    productionLinesTitle: "Наши производственные линии",
    productionLines: [
      { title: "Линия печати термочеков", desc: "Производство и печать термочеков с логотипами и рекламой для крупных розничных сетей и проектов." },
      { title: "Линии резки термобумаги", desc: "Несколько линий по резке термобумаги в рулоны 80×80, 80×70, 57×40 и другие форматы для POS и терминалов." },
      { title: "Линия производства NCR-форм", desc: "Производство многослойных NCR-форм для бухгалтерии, логистики, госпроектов и тендеров." },
    ],
    factoryTitle: "Наш завод",
    factorySubtitle: "Реальные фотографии нашего производства",
    factory1Title: "Вход на территорию завода",
    factory1Desc: "Производственная база Zhixin Paper — это не виртуальный офис, а реальный завод с полным циклом оборудования.",
    factory2Title: "Линия резки термобумаги в рулоны",
    factory2Desc: "Линии по резке Jumbo рулонов в готовые рулоны 80×80, 80×70, 57×40 мм и другие форматы для POS и терминалов.",
    factory3Title: "Линия печати термочеков",
    factory3Desc: "Производство и печать терморулонов с логотипами и рекламой для розничных сетей и проектов.",
    factory4Title: "Линия производства NCR-форм",
    factory4Desc: "Производство многослойных NCR-форм для счетов-фактур, накладных, договоров и тендерной документации.",
    ctaTitle: "Готовы начать сотрудничество?",
    ctaDesc: "Свяжитесь с нами через WhatsApp или Telegram для получения каталога продукции и акуальных цен.",
    ctaWhatsApp: "Написать в WhatsApp",
    ctaTelegram: "Написать в Telegram",
    ctaEmail: "Отправить Email",
  },

  zh: {
    title: "关于智鑫纸业 — 自 2009 年起专业生产热敏纸的制造商",
    description: "智鑫纸业成立于 2009 年，是一家专注于热敏纸、热敏标签及热敏巨型卷生产的制造型工厂。我们拥有自有生产车间和配套设备，稳定供应俄罗斯、哈萨克斯坦等独联体国家市场。",
    heroTitle: "关于智鑫纸业",
    heroSubtitle: "拥有自有工厂的专业热敏纸制造商",
    heroDescription: "自 2009 年成立以来，我们为俄罗斯、哈萨克斯坦及其他独联体国家的经销商提供稳定的热敏纸、热敏标签及 Jumbo 卷批发供应服务。",
    overviewTitle: "我们的历史",
    overviewYear: "成立于 2009 年",
    overviewYearDesc: "超过 15 年的热敏纸生产经验",
    overviewFactory: "自有工厂",
    overviewFactoryDesc: "拥有全套设备的生产基地",
    overviewExport: "出口至独联体",
    overviewExportDesc: "长期供应俄罗斯、哈萨克斯坦、乌兹别克斯坦",
    overviewCapacity: "生产能力",
    overviewCapacityDesc: "能够以稳定质量完成大批量订单",
    overviewText1: "智鑫纸业成立于 2009 年，是一家专业从事热敏纸、热敏标签及 Jumbo 卷生产的制造型企业。",
    overviewText2: "15 年来，我们建立了稳定的生产基地，与俄罗斯、哈萨克斯坦、乌兹别克斯坦等独联体国家的经销商建立了长期合作关系。",
    overviewText3: "我们的工厂配备现代化的热敏纸生产和分切生产线，能够保证产品质量稳定并及时交付大批量订单。",
    whyTitle: "为什么选择我们",
    reason1Title: "自有工厂 — 非贸易公司",
    reason1Desc: "我们拥有完整的生产基地，配备 Jumbo 卷生产设备、热敏纸分切设备和热敏标签印刷设备。我们控制从原材料到成品的整个流程。",
    reason2Title: "15+ 年独联体市场经验",
    reason2Desc: "我们了解俄罗斯和哈萨克斯坦市场的特点，熟悉文件、包装和物流要求。我们的经理会说俄语。",
    reason3Title: "稳定质量与认证",
    reason3Desc: "每批产品都经过多级质量控制。我们提供海关清关所需的所有证书和文件。",
    reason4Title: "灵活的经销商合作条件",
    reason4Desc: "我们与批发客户合作，理解稳定供应的重要性。长期合作伙伴可享受账期支付。",
    reason5Title: "快速响应",
    reason5Desc: "通过 WhatsApp 和 Telegram 进行即时沟通。在 2-4 小时内回复询价（GMT+8 中国时间）。",
    reason6Title: "全流程生产",
    reason6Desc: "从 Jumbo 卷生产到任意规格热敏纸分切，以及按您设计印刷的热敏标签。",
    productionLinesTitle: "我们的生产线",
    productionLines: [
      { title: "热敏纸卷印刷生产线", desc: "用于在热敏纸卷背面或票据上印刷品牌 Logo、广告信息和促销内容，服务于连锁零售和项目客户。" },
      { title: "热敏纸卷分切生产线", desc: "多条分切线可生产 80×80、80×70、57×40 等常用规格热敏纸卷，并按客户要求定制长度和卷径。" },
      { title: "热敏标签印刷生产线", desc: "高精度热敏标签印刷线，可在 4\"×6\"、4\"×4\" 等标签上印刷品牌 Logo、条码和电商/物流信息。" },
      { title: "热敏标签分切生产线", desc: "将大卷标签材料分切成 4\"×6\"、4\"×4\"、58×40 等常见规格标签卷，并控制好排版方向和卷向。" },
      { title: "NCR Form 生产线", desc: "多联无碳复写 NCR 表单生产线，支持发票、送货单、合同及各类项目表单的定制生产。" },
    ],
    factoryTitle: "我们的工厂",
    factorySubtitle: "真实的生产现场照片",
    factory1Title: "工厂入口",
    factory1Desc: "智鑫纸业的生产基地不是虚拟办公室，而是拥有全套设备的真实工厂。",
    factory2Title: "热敏纸卷分切生产线",
    factory2Desc: "将 Jumbo 卷分切成 80×80、80×70、57×40 等主流规格热敏纸卷的分切生产线，可按客户要求调整长度和卷径。",
    factory3Title: "热敏纸卷印刷生产线",
    factory3Desc: "在热敏纸卷上印刷品牌 Logo、广告或项目专用信息的印刷生产线，服务连锁零售和工程项目。",
    factory4Title: "NCR Form 生产线",
    factory4Desc: "多联无碳 NCR 表单生产线，用于发票、送货单、合同以及各类政府/企业项目表单。",
    ctaTitle: "准备开始合作了吗？",
    ctaDesc: "通过 WhatsApp 或 Telegram 联系我们，获取产品目录和最新报价。",
    ctaWhatsApp: "WhatsApp 联系",
    ctaTelegram: "Telegram 联系",
    ctaEmail: "发送邮件",
  },
};
