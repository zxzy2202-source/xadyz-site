/**
 * 静态博客文章（无 Strapi 时使用）
 * 列表与详情页通过 slug 关联
 */

export type StaticPostLang = 'en' | 'ru' | 'zh';

export interface StaticBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  publishedAt: string; // ISO date
  readTime: string;
}

const POSTS: Record<StaticPostLang, Record<string, Omit<StaticBlogPost, 'slug'>>> = {
  en: {
    'future-of-thermal-paper-russian-retail': {
      title: 'The Future of Thermal Paper in Russian Retail',
      excerpt: 'An in-depth analysis of emerging trends, digital transformation, and growth opportunities in the Russian thermal paper market for 2025-2027.',
      category: 'Market Analysis',
      publishedAt: '2025-02-01',
      readTime: '12 min read',
      body: `
        <p>The Russian retail and logistics sector continues to rely on thermal paper for receipts, labels, and documentation. Despite digital initiatives, demand for reliable thermal media remains strong.</p>
        <h2>Market drivers</h2>
        <p>Key factors include expansion of retail chains, growth in e-commerce and parcel shipping, and regulatory requirements for fiscal documentation. BPA-free and FSC-certified options are increasingly requested by buyers.</p>
        <h2>Outlook</h2>
        <p>Suppliers who can offer stable quality, clear documentation, and flexible volumes are well positioned. Direct manufacturer relationships help secure consistent supply and competitive pricing.</p>
      `,
    },
    'understanding-bpa-free-thermal-paper': {
      title: 'Understanding BPA-Free Thermal Paper Technology',
      excerpt: 'Comprehensive guide to BPA-free alternatives, their benefits, and applications in modern retail environments.',
      category: 'Technical Guide',
      publishedAt: '2025-01-15',
      readTime: '8 min read',
      body: `
        <p>BPA-free thermal paper uses alternative sensitizers instead of bisphenol A, meeting strict health and safety standards for food contact and general use.</p>
        <h2>Why BPA-free matters</h2>
        <p>Regulations in the EU and other regions restrict or ban BPA in thermal paper. Choosing BPA-free products ensures compliance and supports sustainability goals.</p>
        <h2>Performance</h2>
        <p>Modern BPA-free formulations deliver print clarity and image stability comparable to traditional coatings. We offer both standard and BPA-free options across our thermal paper range.</p>
      `,
    },
    'digital-transformation-cis-logistics': {
      title: 'Digital Transformation in CIS Logistics',
      excerpt: 'How thermal paper labels are evolving to support digital tracking and warehouse automation across CIS countries.',
      category: 'Market Trends',
      publishedAt: '2025-01-10',
      readTime: '10 min read',
      body: `
        <p>Logistics and warehouse operations in the CIS are adopting more automated systems. Thermal labels remain essential for barcodes, shipping documents, and last-mile delivery.</p>
        <h2>Label requirements</h2>
        <p>Consistent adhesive performance, clear barcode printing, and reliable roll feeding are critical. Our thermal label range is designed for high-speed printers and varied environmental conditions.</p>
        <h2>Integration</h2>
        <p>Compatibility with common label printers and software helps operators avoid downtime. We provide technical specifications and samples to support integration and testing.</p>
      `,
    },
    'fsc-certification-for-business': {
      title: 'FSC Certification: Why It Matters for Your Business',
      excerpt: 'The environmental and business case for choosing FSC-certified thermal paper products.',
      category: 'Sustainability',
      publishedAt: '2024-12-15',
      readTime: '6 min read',
      body: `
        <p>FSC (Forest Stewardship Council) certification indicates that paper comes from responsibly managed forests. Many tenders and corporate policies now require or prefer FSC materials.</p>
        <h2>Benefits</h2>
        <p>FSC-certified thermal paper helps meet sustainability reporting goals and can be a differentiator in public procurement and B2B contracts.</p>
        <h2>Our offering</h2>
        <p>We supply FSC-certified thermal paper and can provide chain-of-custody documentation to support your own certifications and audits.</p>
      `,
    },
    'optimizing-pos-operations-retail': {
      title: 'Optimizing POS Operations for Major Retail Chain',
      excerpt: 'How we helped a leading Russian retailer reduce costs and improve efficiency with custom thermal paper solutions.',
      category: 'Case Study',
      publishedAt: '2024-12-01',
      readTime: '7 min read',
      body: `
        <p>A large retail client needed stable supply of thermal receipt rolls in multiple sizes, with consistent quality and predictable lead times.</p>
        <h2>Approach</h2>
        <p>We aligned production schedules with their demand, standardized specifications to reduce SKU complexity, and provided dedicated support for quality and logistics.</p>
        <h2>Results</h2>
        <p>Reduced stockouts, lower total cost through volume agreements, and a clear audit trail for compliance. The partnership has continued for several years.</p>
      `,
    },
    'eu-reach-compliance-importers': {
      title: 'EU REACH Compliance: What Importers Need to Know',
      excerpt: 'Essential information about REACH regulations and how our products meet all European requirements.',
      category: 'Regulatory',
      publishedAt: '2024-11-20',
      readTime: '9 min read',
      body: `
        <p>REACH regulates chemicals in products placed on the EU market. Thermal paper and related materials must comply with substance restrictions and communication requirements.</p>
        <h2>Our compliance</h2>
        <p>We provide documentation and declarations to support importers. Our BPA-free and standard thermal papers are produced with compliance in mind for major export markets.</p>
        <h2>Documentation</h2>
        <p>Request our technical and compliance pack for specifications, test reports, and safety data. We update documentation as regulations evolve.</p>
      `,
    },
  },
  ru: {
    'future-of-thermal-paper-russian-retail': {
      title: 'Будущее термобумаги в российской розничной торговле',
      excerpt: 'Углубленный анализ новых тенденций, цифровой трансформации и возможностей роста на российском рынке термобумаги на 2025-2027 годы.',
      category: 'Анализ рынка',
      publishedAt: '2025-02-01',
      readTime: '12 мин чтения',
      body: `
        <p>Российский ритейл и логистика по-прежнему зависят от термобумаги для чеков, этикеток и документов. Несмотря на цифровизацию, спрос на надёжные термоматериалы остаётся высоким.</p>
        <h2>Драйверы рынка</h2>
        <p>Среди факторов — расширение розничных сетей, рост e-commerce и доставки, требования к фискальной документации. Покупатели всё чаще запрашивают варианты без BPA и с сертификацией FSC.</p>
        <h2>Перспективы</h2>
        <p>Поставщики, способные обеспечить стабильное качество, понятную документацию и гибкие объёмы, имеют хорошие позиции. Прямые контакты с производителем помогают гарантировать стабильные поставки и конкурентные цены.</p>
      `,
    },
    'understanding-bpa-free-thermal-paper': {
      title: 'Понимание технологии термобумаги без BPA',
      excerpt: 'Комплексное руководство по альтернативам без BPA, их преимуществам и применению в современной розничной торговле.',
      category: 'Техническое руководство',
      publishedAt: '2025-01-15',
      readTime: '8 мин чтения',
      body: `
        <p>Термобумага без BPA использует альтернативные сенсибилизаторы вместо бисфенола А и соответствует строгим требованиям по безопасности для контакта с пищевыми продуктами.</p>
        <h2>Зачем нужна термобумага без BPA</h2>
        <p>В ЕС и других регионах действуют ограничения или запреты на BPA в термобумаге. Выбор безуглеродных продуктов обеспечивает соответствие и поддерживает экологические цели.</p>
        <h2>Качество печати</h2>
        <p>Современные составы без BPA обеспечивают чёткость и стабильность изображения, сопоставимые с традиционными покрытиями. Мы предлагаем стандартные и безуглеродные варианты в ассортименте термобумаги.</p>
      `,
    },
    'digital-transformation-cis-logistics': {
      title: 'Цифровая трансформация в логистике СНГ',
      excerpt: 'Как термоэтикетки эволюционируют для поддержки цифрового отслеживания и автоматизации складов в странах СНГ.',
      category: 'Рыночные тенденции',
      publishedAt: '2025-01-10',
      readTime: '10 мин чтения',
      body: `
        <p>Логистика и склады в СНГ внедряют более автоматизированные системы. Термоэтикетки по-прежнему необходимы для штрихкодов, отгрузочных документов и доставки.</p>
        <h2>Требования к этикеткам</h2>
        <p>Важны стабильная клейкость, чёткая печать штрихкодов и надёжная подача рулонов. Наш ассортимент термоэтикеток рассчитан на высокоскоростные принтеры и разные условия эксплуатации.</p>
        <h2>Интеграция</h2>
        <p>Совместимость с распространёнными принтерами и ПО помогает избежать простоев. Мы предоставляем спецификации и образцы для интеграции и тестов.</p>
      `,
    },
    'fsc-certification-for-business': {
      title: 'Сертификация FSC: почему это важно для вашего бизнеса',
      excerpt: 'Экологические и бизнес-аргументы в пользу выбора продукции из термобумаги с сертификацией FSC.',
      category: 'Устойчивое развитие',
      publishedAt: '2024-12-15',
      readTime: '6 мин чтения',
      body: `
        <p>Сертификация FSC показывает, что бумага произведена из ответственно управляемых лесов. Многие тендеры и корпоративные политики требуют или предпочитают материалы FSC.</p>
        <h2>Преимущества</h2>
        <p>Термобумага с FSC помогает выполнять цели по отчётности в области устойчивого развития и может быть преимуществом в госзакупках и B2B-контрактах.</p>
        <h2>Наше предложение</h2>
        <p>Мы поставляем термобумагу с сертификацией FSC и предоставляем документацию по цепочке поставок для ваших аудитов и сертификаций.</p>
      `,
    },
    'optimizing-pos-operations-retail': {
      title: 'Оптимизация POS-операций для крупной розничной сети',
      excerpt: 'Как мы помогли ведущему российскому ритейлеру снизить затраты и повысить эффективность с помощью решений из термобумаги.',
      category: 'Кейс-стади',
      publishedAt: '2024-12-01',
      readTime: '7 мин чтения',
      body: `
        <p>Крупный розничный клиент нуждался в стабильных поставках термочеков в разных размерах с постоянным качеством и предсказуемыми сроками.</p>
        <h2>Подход</h2>
        <p>Мы согласовали графики производства с их спросом, унифицировали спецификации для сокращения количества SKU и обеспечили поддержку по качеству и логистике.</p>
        <h2>Результаты</h2>
        <p>Сокращение дефицита, снижение совокупных затрат за счёт объёмных соглашений и прозрачная история для аудита. Сотрудничество продолжается несколько лет.</p>
      `,
    },
    'eu-reach-compliance-importers': {
      title: 'Соответствие EU REACH: что нужно знать импортерам',
      excerpt: 'Важная информация о регламенте REACH и о том, как наша продукция соответствует европейским требованиям.',
      category: 'Регуляторное',
      publishedAt: '2024-11-20',
      readTime: '9 мин чтения',
      body: `
        <p>REACH регулирует использование химических веществ в продуктах на рынке ЕС. Термобумага и сопутствующие материалы должны соответствовать ограничениям и требованиям по информированию.</p>
        <h2>Наше соответствие</h2>
        <p>Мы предоставляем документацию и декларации для импортёров. Наша термобумага с BPA и без производится с учётом требований основных экспортных рынков.</p>
        <h2>Документация</h2>
        <p>Запросите технический и соответственный пакет: спецификации, отчёты испытаний, паспорта безопасности. Мы обновляем документацию при изменении регуляций.</p>
      `,
    },
  },
  zh: {
    'future-of-thermal-paper-russian-retail': {
      title: '俄罗斯零售业热敏纸的未来',
      excerpt: '对2025-2027年俄罗斯热敏纸市场新兴趋势、数字化转型和增长机会的深入分析。',
      category: '市场分析',
      publishedAt: '2025-02-01',
      readTime: '12分钟阅读',
      body: `
        <p>俄罗斯零售与物流行业仍依赖热敏纸用于小票、标签和单据。尽管数字化推进，对可靠热敏介质的需求依然强劲。</p>
        <h2>市场驱动</h2>
        <p>主要因素包括零售网络扩张、电商与包裹配送增长、以及财税文档的合规要求。采购方对无BPA和FSC认证产品的需求日益增加。</p>
        <h2>展望</h2>
        <p>能提供稳定质量、清晰文档和灵活批量的供应商更具优势。与生产商直接合作有利于保障稳定供应与有竞争力的价格。</p>
      `,
    },
    'understanding-bpa-free-thermal-paper': {
      title: '了解无BPA热敏纸技术',
      excerpt: '无BPA替代品、其优势及在现代零售环境中应用的综合指南。',
      category: '技术指南',
      publishedAt: '2025-01-15',
      readTime: '8分钟阅读',
      body: `
        <p>无BPA热敏纸使用替代显色剂而非双酚A，满足食品接触和日常使用的健康与安全标准。</p>
        <h2>为何选择无BPA</h2>
        <p>欧盟等地区对热敏纸中的BPA有严格限制或禁令。选择无BPA产品有助于合规并支持可持续发展目标。</p>
        <h2>性能</h2>
        <p>现代无BPA配方在打印清晰度与图像稳定性上可与传统涂层媲美。我们在热敏纸系列中提供标准与无BPA两种选项。</p>
      `,
    },
    'digital-transformation-cis-logistics': {
      title: '独联体物流的数字化转型',
      excerpt: '热敏纸标签如何发展以支持独联体国家的数字追踪与仓储自动化。',
      category: '市场趋势',
      publishedAt: '2025-01-10',
      readTime: '10分钟阅读',
      body: `
        <p>独联体地区的物流与仓储正在采用更多自动化系统。热敏标签仍是条码、货运单据和最后一公里配送的必备品。</p>
        <h2>标签要求</h2>
        <p>粘性稳定、条码清晰、卷料走纸可靠至关重要。我们的热敏标签系列面向高速打印机和不同环境条件设计。</p>
        <h2>集成</h2>
        <p>与常见标签打印机和软件的兼容性有助于减少停机。我们提供技术规格与样品，支持集成与测试。</p>
      `,
    },
    'fsc-certification-for-business': {
      title: 'FSC认证：为什么对您的业务很重要',
      excerpt: '选择FSC认证热敏纸产品的环境与商业理由。',
      category: '可持续发展',
      publishedAt: '2024-12-15',
      readTime: '6分钟阅读',
      body: `
        <p>FSC（森林管理委员会）认证表明纸张来自负责任管理的森林。许多招标与企业政策要求或偏好FSC材料。</p>
        <h2>益处</h2>
        <p>FSC认证热敏纸有助于达成可持续发展报告目标，并可在政府采购与B2B合同中形成差异化。</p>
        <h2>我们的供应</h2>
        <p>我们供应FSC认证热敏纸，并可提供产销监管链文档以支持您的认证与审核。</p>
      `,
    },
    'optimizing-pos-operations-retail': {
      title: '优化大型零售连锁的POS运营',
      excerpt: '我们如何帮助一家领先的俄罗斯零售商通过定制热敏纸解决方案降低成本并提高效率。',
      category: '案例研究',
      publishedAt: '2024-12-01',
      readTime: '7分钟阅读',
      body: `
        <p>某大型零售客户需要多种规格的热敏收据纸稳定供应，并保证质量一致、交期可预期。</p>
        <h2>做法</h2>
        <p>我们将生产计划与其需求对齐，统一规格以降低SKU复杂度，并在质量与物流上提供专项支持。</p>
        <h2>结果</h2>
        <p>缺货减少、通过批量协议降低总成本，并建立清晰的合规追溯。合作已持续数年。</p>
      `,
    },
    'eu-reach-compliance-importers': {
      title: 'EU REACH合规性：进口商需要知道什么',
      excerpt: '关于REACH法规的基本信息以及我们的产品如何满足欧洲要求。',
      category: '法规',
      publishedAt: '2024-11-20',
      readTime: '9分钟阅读',
      body: `
        <p>REACH对投放欧盟市场的产品中的化学品进行监管。热敏纸及相关材料须符合物质限制与信息传递要求。</p>
        <h2>我们的合规</h2>
        <p>我们提供文档与声明以支持进口商。我们的无BPA及标准热敏纸在生产中考虑主要出口市场的合规要求。</p>
        <h2>文档</h2>
        <p>可索取我们的技术与合规包，含规格、测试报告与安全数据。我们随法规更新而更新文档。</p>
      `,
    },
  },
};

/** 所有静态文章的 slug 列表（用于列表页顺序） */
export const STATIC_BLOG_SLUGS: string[] = [
  'future-of-thermal-paper-russian-retail',
  'understanding-bpa-free-thermal-paper',
  'digital-transformation-cis-logistics',
  'fsc-certification-for-business',
  'optimizing-pos-operations-retail',
  'eu-reach-compliance-importers',
];

/** 根据 slug 和语言获取静态文章 */
export function getStaticBlogPost(slug: string, lang: StaticPostLang): StaticBlogPost | null {
  const byLang = POSTS[lang];
  if (!byLang) return null;
  const raw = byLang[slug];
  if (!raw) return null;
  return { ...raw, slug };
}

/** 获取所有静态文章（用于列表），按 STATIC_BLOG_SLUGS 顺序 */
export function getAllStaticBlogPosts(lang: StaticPostLang): StaticBlogPost[] {
  return STATIC_BLOG_SLUGS.map((slug) => getStaticBlogPost(slug, lang)).filter(
    (p): p is StaticBlogPost => p !== null
  );
}
