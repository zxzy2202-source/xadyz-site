/**
 * FactoryJournalPage 数据与三语言 UI 文本
 * 包含：类型定义、mock 数据、UI 翻译字符串
 */

export type Lang = 'en' | 'ru' | 'zh';

// ── 类型定义 ──────────────────────────────────────────────────────────────────

export interface WeeklyUpdateMock {
  id: string;
  productionId: string;
  weekOf: string;
  title: string;
  productType: string;
  quantity: string;
  specs: string;
  destination: string;
  leadTime: string;
  fullSpecs: string;
  qcTests: string[];
  productionNotes: string;
  postedDate: string;
}

export interface ClientCaseMock {
  id: string;
  caseId: string;
  weekOf: string;
  title: string;
  client: string;
  problem: string;
  rootCause: string;
  solution: string;
  result: string;
  technicalSpecs: string;
  tags: string[];
  solvedDate: string;
  verified: boolean;
}

export interface BehindScenesMock {
  title: string;
  subtitle: string;
  month: string;
  stat: string;
  statLabel?: string;
  desc: string;
}

// ── Mock 数据 ─────────────────────────────────────────────────────────────────

export const WEEKLY_UPDATES_MOCK: Record<Lang, WeeklyUpdateMock[]> = {
  en: [
    { id: 'w1', productionId: '#009', weekOf: '2026-02-10', title: 'Thermal Paper Roll Production - 57x40mm', productType: 'Thermal Roll', quantity: '120,000 rolls', specs: '57mm x 40mm', destination: 'Uzbekistan', leadTime: '14 days', fullSpecs: '57mm x 40mm, 48gsm base paper, BPA-free coating, individual shrink-wrapped', qcTests: ['Thermal sensitivity test: Passed at 0.24mJ/mm²', 'Print density verification: ≥1.18 OD', 'Image fade resistance: 5+ years (dark storage)'], productionNotes: 'Standard production run with optimized coating for hot climate markets.', postedDate: '2026-02-13' },
    { id: 'w2', productionId: '#008', weekOf: '2026-02-03', title: 'Shipping Label Production - 4x6 inch', productType: 'Label', quantity: '180,000 labels (on rolls)', specs: '4" x 6" direct thermal labels', destination: 'Dubai, UAE', leadTime: '10 days', fullSpecs: '4" x 6" direct thermal labels, perforated, 500 labels per roll', qcTests: ['Adhesive peel strength: 8.5 N/25mm (meets requirement)', 'Edge quality inspection: Clean cuts, no burrs', 'Temperature resistance test: Stable at 50°C storage'], productionNotes: 'Used premium adhesive coating for hot climate stability. Customer operates warehouse without climate control.', postedDate: '2026-02-08' },
    { id: 'w3', productionId: '#007', weekOf: '2026-02-03', title: 'Thermal Paper Roll Production - 80x80mm', productType: 'Thermal Roll', quantity: '45,000 rolls', specs: '80mm x 80mm', destination: 'Rotterdam, Netherlands', leadTime: '12 days', fullSpecs: '80mm x 80mm, 55gsm base paper, customer logo printed in blue', qcTests: ['Thermal sensitivity test: Passed at 0.25mJ/mm²', 'Print density verification: ≥1.20 OD', 'Core tightness check: Zero defects in sample batch'], productionNotes: 'This order used our upgraded slitting machine with enhanced tension control. Customer requested tighter core winding to prevent unrolling during sea freight.', postedDate: '2026-02-07' },
  ],
  zh: [
    { id: 'w1', productionId: '#009', weekOf: '2026-02-10', title: '热敏纸卷生产 - 57×40mm', productType: '热敏纸卷', quantity: '120,000 卷', specs: '57mm × 40mm', destination: '乌兹别克斯坦', leadTime: '14 天', fullSpecs: '57mm × 40mm，48gsm 基纸，BPA-free 涂层，单卷热缩膜包装', qcTests: ['热敏灵敏度测试：0.24mJ/mm² 通过', '打印密度验证：≥1.18 OD', '图像耐褪色：5+ 年（避光储存）'], productionNotes: '常规生产批次，针对高温市场优化涂层配方。', postedDate: '2026-02-13' },
    { id: 'w2', productionId: '#008', weekOf: '2026-02-03', title: '热敏标签生产 - 4×6 英寸', productType: '标签', quantity: '180,000 枚（卷装）', specs: '4" × 6" 直热标签', destination: '迪拜，阿联酋', leadTime: '10 天', fullSpecs: '4" × 6" 直热标签，打孔，500 枚/卷', qcTests: ['剥离强度：8.5 N/25mm（达标）', '边缘质量：切口平整无毛刺', '耐温测试：50°C 储存稳定'], productionNotes: '采用耐高温胶水，客户仓库无温控。', postedDate: '2026-02-08' },
    { id: 'w3', productionId: '#007', weekOf: '2026-02-03', title: '热敏纸卷生产 - 80×80mm', productType: '热敏纸卷', quantity: '45,000 卷', specs: '80mm × 80mm', destination: '鹿特丹，荷兰', leadTime: '12 天', fullSpecs: '80mm × 80mm，55gsm 基纸，客户蓝色 Logo 印刷', qcTests: ['热敏灵敏度：0.25mJ/mm² 通过', '打印密度：≥1.20 OD', '卷芯紧度：抽检零缺陷'], productionNotes: '使用升级分切机，张力控制更好，客户要求卷芯更紧以防海运松动。', postedDate: '2026-02-07' },
  ],
  ru: [
    { id: 'w1', productionId: '#009', weekOf: '2026-02-10', title: 'Производство терморулонов 57×40мм', productType: 'Терморулон', quantity: '120 000 рулонов', specs: '57мм × 40мм', destination: 'Узбекистан', leadTime: '14 дней', fullSpecs: '57мм × 40мм, 48г/м², BPA-free, индивидуальная упаковка', qcTests: ['Термочувствительность: 0,24 мДж/мм² — пройдено', 'Плотность печати: ≥1,18 OD', 'Устойчивость изображения: 5+ лет'], productionNotes: 'Стандартный производственный цикл с оптимизированным покрытием для жаркого климата.', postedDate: '2026-02-13' },
    { id: 'w2', productionId: '#008', weekOf: '2026-02-03', title: 'Термоэтикетки 4×6 дюймов', productType: 'Этикетка', quantity: '180 000 этикеток (в рулонах)', specs: '4" × 6" прямая термопечать', destination: 'Дубай, ОАЭ', leadTime: '10 дней', fullSpecs: '4" × 6", перфорированные, 500 этикеток на рулон', qcTests: ['Адгезия: 8,5 Н/25мм', 'Качество кромки: чистый рез', 'Температурная стабильность: 50°C'], productionNotes: 'Премиальное клеевое покрытие для жаркого климата.', postedDate: '2026-02-08' },
    { id: 'w3', productionId: '#007', weekOf: '2026-02-03', title: 'Терморулоны 80×80мм', productType: 'Терморулон', quantity: '45 000 рулонов', specs: '80мм × 80мм', destination: 'Роттердам, Нидерланды', leadTime: '12 дней', fullSpecs: '80мм × 80мм, 55г/м², логотип клиента синим цветом', qcTests: ['Чувствительность: 0,25 мДж/мм²', 'Плотность печати: ≥1,20 OD', 'Проверка намотки: без дефектов'], productionNotes: 'Использована новая машина с улучшенным контролем натяжения.', postedDate: '2026-02-07' },
  ],
};

export const CLIENT_CASES_MOCK: Record<Lang, ClientCaseMock[]> = {
  en: [
    { id: 'c1', caseId: '#007', weekOf: '2026-02-03', title: 'Problem Solved #007', client: 'Retail chain from Turkey', problem: 'Customer experienced intermittent paper jams in Epson TM-T88VI printers. Issue appeared only during summer months when store temperature exceeded 35°C.', rootCause: "Thermal paper curl increased significantly at high ambient temperatures due to differential expansion between coating layer and base paper. Curl exceeded printer's feed tolerance of 8mm.", solution: 'Reformulated with balanced coating on both sides (back-coating added at 1.5 g/m²). Adjusted base paper grain direction to reduce temperature-induced curl. Tested at 40°C for 72 hours.', result: 'Curl reduced from 12mm to 3mm at 40°C. Customer ran 3-month summer trial with zero paper jams across 120 terminals. Now standard formulation for all Middle East/Mediterranean orders.', technicalSpecs: 'Back-coating: 1.5 g/m²; Base paper grain: cross-direction; Curl at 40°C: <4mm', tags: ['#curl', '#high-temperature', '#Epson', '#anti-curl'], solvedDate: '2026-02-05', verified: true },
    { id: 'c2', caseId: '#006', weekOf: '2026-01-27', title: 'Problem Solved #006', client: 'Government tender supplier from Poland', problem: "Needed certified thermal paper for official receipt printing but standard product couldn't meet phenol-free requirement for EU tender specification.", rootCause: 'Standard BPA-based sensitizer coating contains trace phenol compounds detected in EU lab tests. New EU regulation requires phenol-free verification for government procurement.', solution: 'Developed alternative formulation using phenol-free sensitizer (vitamin C based). Submitted samples to SGS for REACH compliance testing. Achieved certification within 15 days.', result: 'Client won government tender with our certified product. Now ordering 20,000 rolls monthly. This formulation has become our standard EU-compliant product line.', technicalSpecs: 'Sensitizer: Ascorbic acid derivative; Certification: SGS REACH; Performance: 0.26mJ/mm²; Shelf life: 3 years', tags: ['#phenol-free', '#EU-compliance', '#REACH', '#government'], solvedDate: '2026-02-02', verified: true },
    { id: 'c3', caseId: '#005', weekOf: '2026-01-27', title: 'Problem Solved #005', client: 'Logistics company from Kazakhstan', problem: 'Customer reported that thermal paper rolls were leaving residue on printer heads after 2-3 months of use. Maintenance costs increasing due to frequent head cleaning.', rootCause: 'Standard coating formula not optimized for high-volume printing environments (customer prints 500+ receipts daily per terminal). Coating material accumulation over time.', solution: 'Switched to low-residue coating formulation typically used for high-speed POS systems. Adjusted coating thickness from 6g/m² to 4.5g/m² while maintaining thermal sensitivity.', result: 'Customer tested for 6 weeks. Printer head cleaning frequency reduced from weekly to monthly. No degradation in print quality or darkness. Estimated 80% reduction in maintenance costs.', technicalSpecs: 'Base paper: 48gsm; Coating: 4.5g/m² low-residue; Sensitivity: 0.28mJ/mm²; Image stability: 5+ years', tags: ['#residue', '#printer-head', '#high-volume', '#maintenance'], solvedDate: '2026-01-30', verified: true },
  ],
  zh: [
    { id: 'c1', caseId: '#007', weekOf: '2026-02-03', title: '问题解决 #007', client: '土耳其零售连锁', problem: '客户反映 Epson TM-T88VI 打印机在夏季（店内超过 35°C）间歇性卡纸。', rootCause: '高温下涂层与基纸膨胀差异导致卷曲增大，超过打印机 8mm 进纸容差。', solution: '双面涂层平衡（背面 1.5g/m²），调整基纸纹向减少温致卷曲，40°C 72 小时测试。', result: '40°C 卷曲从 12mm 降至 3mm，客户 120 台终端 3 个月夏季试用零卡纸，现为标准中东/地中海配方。', technicalSpecs: '背涂 1.5g/m²；基纸纹向：横向；40°C 卷曲 <4mm', tags: ['#卷曲', '#高温', '#Epson', '#防卷'], solvedDate: '2026-02-05', verified: true },
    { id: 'c2', caseId: '#006', weekOf: '2026-01-27', title: '问题解决 #006', client: '波兰政府招标供应商', problem: '需要酚-free 认证热敏纸用于官方收据，标准产品无法满足欧盟招标要求。', rootCause: '标准 BPA 敏化剂含痕量酚类，EU 实验室检出；新政要求政府采购酚-free 验证。', solution: '开发酚-free 敏化剂配方（维生素 C 基），送 SGS REACH 检测，15 天内获证。', result: '客户中标，现月订 2 万卷，该配方已成为标准欧盟合规产品线。', technicalSpecs: '敏化剂：抗坏血酸衍生物；SGS REACH 认证；灵敏度 0.26mJ/mm²；保质期 3 年', tags: ['#酚free', '#欧盟合规', '#REACH', '#政府'], solvedDate: '2026-02-02', verified: true },
    { id: 'c3', caseId: '#005', weekOf: '2026-01-27', title: '问题解决 #005', client: '哈萨克斯坦物流公司', problem: '客户反馈热敏纸卷使用 2–3 个月后打印头残留增加，维护成本上升。', rootCause: '标准涂层未针对高印量（单终端日打 500+ 张）优化，涂层随时间积累。', solution: '改用高速 POS 用低残留涂层，涂层克重从 6g/m² 调至 4.5g/m²，保持热敏性。', result: '6 周测试后，打印头清洁从每周改为每月，打印质量不变，维护成本约降 80%。', technicalSpecs: '基纸 48gsm；涂层 4.5g/m² 低残留；0.28mJ/mm²；图像稳定性 5+ 年', tags: ['#残留', '#打印头', '#高印量', '#维护'], solvedDate: '2026-01-30', verified: true },
  ],
  ru: [
    { id: 'c1', caseId: '#007', weekOf: '2026-02-03', title: 'Проблема решена #007', client: 'Розничная сеть из Турции', problem: 'Периодические застревания в принтерах Epson TM-T88VI летом при температуре выше 35°C.', rootCause: 'Повышенная curl бумаги из-за разницы расширения покрытия и основы при высокой температуре.', solution: 'Двустороннее покрытие (обратная сторона 1,5 г/м²), изменение направления волокон, тест 40°C 72ч.', result: 'Curl снижен с 12мм до 3мм при 40°C. 120 терминалов, 3 месяца — zero jams. Стандарт для Ближнего Востока.', technicalSpecs: 'Обратное покрытие 1,5 г/м²; Curl при 40°C <4мм', tags: ['#curl', '#жаркийклимат', '#Epson'], solvedDate: '2026-02-05', verified: true },
    { id: 'c2', caseId: '#006', weekOf: '2026-01-27', title: 'Проблема решена #006', client: 'Польский поставщик госзаказа', problem: 'Требовалась phenol-free термобумага для официальных чеков по EU тендеру.', rootCause: 'Стандартный BPA-сенсибилизатор содержит следы фенола, выявленные в EU-лаборатории.', solution: 'Формула на основе витамина C, SGS REACH сертификация за 15 дней.', result: 'Клиент выиграл тендер. Ежемесячный заказ 20 000 рулонов. Стандарт EU-линейки.', technicalSpecs: 'SGS REACH; 0,26 мДж/мм²; срок хранения 3 года', tags: ['#phenol-free', '#REACH', '#EU'], solvedDate: '2026-02-02', verified: true },
    { id: 'c3', caseId: '#005', weekOf: '2026-01-27', title: 'Проблема решена #005', client: 'Логистическая компания из Казахстана', problem: 'Остатки покрытия на печатающей головке через 2–3 месяца, рост затрат на обслуживание.', rootCause: 'Стандартное покрытие не рассчитано на высокий объем печати (500+ чеков/день на терминал).', solution: 'Низкоостаточное покрытие 4,5 г/м², сохранена чувствительность.', result: 'Чистка головки: с еженедельной до ежемесячной. Качество печати без изменений. Снижение затрат ~80%.', technicalSpecs: '48 г/м²; 4,5 г/м² low-residue; 0,28 мДж/мм²', tags: ['#остатки', '#головка', '#объем'], solvedDate: '2026-01-30', verified: true },
  ],
};

export const BEHIND_SCENES_MOCK: Record<Lang, BehindScenesMock[]> = {
  en: [
    { title: 'QC Laboratory — February 2026', subtitle: 'Quality control laboratory', month: 'February 2026', stat: '347', statLabel: 'Material Inspections', desc: 'This month our QC team processed 347 incoming material inspections. 12 batches rejected for not meeting our base paper smoothness standard (≥500 seconds Bekk method). Rejection rate of 3.5% — well below industry average of 6%.' },
    { title: 'Machine Maintenance Cycle', subtitle: 'Planned Downtime', month: 'February 2026', stat: '6h', statLabel: 'Planned Downtime', desc: 'Completed scheduled maintenance on Coating Line #2 — replaced doctor blade assembly and recalibrated coating gap sensors. Downtime: 6 hours. Line returned to production with coating weight variation reduced from ±4% to ±1.5%.' },
    { title: 'Operator Certification Program', subtitle: 'Certified Operators', month: 'February 2026', stat: '28/32', statLabel: 'Certified Operators', desc: 'Three operators completed advanced slitting machine certification this month. Training covered tension control optimization, blade replacement procedures, and quality checkpoint protocols. Total certified operators: 28 out of 32 production staff.' },
    { title: 'Warehouse Optimization', subtitle: 'Faster Loading', month: 'January 2026', stat: '38%', statLabel: 'Faster Loading', desc: 'Reorganized finished goods warehouse using ABC classification. A-category products (80x80mm, 57x40mm rolls) moved to front zones for faster loading. Average truck loading time reduced from 45 minutes to 28 minutes.' },
  ],
  zh: [
    { title: '质检实验室 — 2026年2月', subtitle: '质量控制实验室', month: '2026年2月', stat: '347', statLabel: '原料检验批次', desc: '本月 QC 团队完成 347 批来料检验，12 批因基纸平滑度未达 Bekk ≥500 秒被拒收，拒收率 3.5%，低于行业平均 6%。' },
    { title: '设备维护周期', subtitle: '计划停机', month: '2026年2月', stat: '6小时', statLabel: '计划停机', desc: '涂布线 #2 定期维护：更换刮刀组件、校准涂布间隙，停机 6 小时。复产后涂层克重偏差从 ±4% 降至 ±1.5%。' },
    { title: '操作员认证计划', subtitle: '持证操作员', month: '2026年2月', stat: '28/32', statLabel: '持证操作员', desc: '本月 3 名操作员完成高级分切机认证，培训涵盖张力控制、换刀流程与质检节点。32 名生产人员中 28 人已持证。' },
    { title: '仓库优化', subtitle: '装车提速', month: '2026年1月', stat: '38%', statLabel: '装车提速', desc: '按 ABC 分类重组成品库，A 类（80×80、57×40 卷）前置，平均装车时间从 45 分钟降至 28 分钟。' },
  ],
  ru: [
    { title: 'Лаборатория ОК — февраль 2026', subtitle: 'Контроль качества', month: 'Февраль 2026', stat: '347', statLabel: 'Проверок материалов', desc: 'За месяц ОК-команда провела 347 входных проверок. 12 партий отклонены по гладкости бумаги (Bekk ≥500 сек). Уровень отклонений 3,5% — ниже среднего 6%.' },
    { title: 'Цикл техобслуживания', subtitle: 'Плановый простой', month: 'Февраль 2026', stat: '6ч', statLabel: 'Плановый простой', desc: 'Обслуживание линии покрытия №2: замена ракеля, калибровка датчиков. Простой 6 ч. Вариация покрытия снижена с ±4% до ±1,5%.' },
    { title: 'Сертификация операторов', subtitle: 'Сертифицированные операторы', month: 'Февраль 2026', stat: '28/32', statLabel: 'Сертифицированы', desc: 'Трое операторов завершили продвинутую сертификацию по резальным машинам. Всего: 28 из 32 сотрудников.' },
    { title: 'Оптимизация склада', subtitle: 'Быстрая загрузка', month: 'Январь 2026', stat: '38%', statLabel: 'Ускорение загрузки', desc: 'Реорганизация склада по ABC. A-категория вынесена в переднюю зону. Время загрузки сокращено с 45 до 28 минут.' },
  ],
};

export const BEHIND_STATS = { uptime: '99.2%', rejection: '3.5%', certified: '28/32' };

// ── UI 翻译字符串 ──────────────────────────────────────────────────────────────

export const UI_TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    heroTitle: 'Factory Journal: Weekly Production Record',
    heroSubtitle: 'Real Production. Real Orders. Real Solutions.',
    heroDesc: 'Real production updates from our thermal paper manufacturing facility. See real orders, real quantities, and how we solve client problems every week.',
    heroNote: 'Updated every week from our factory in China.',
    heroBadge: 'Updated Weekly',
    heroLastUpdatedPrefix: 'Last updated',
    heroLastUpdatedFallback: 'Awaiting first update',
    weeklyTitle: 'Weekly Production Highlights',
    weeklySubtitle: 'What we produced and shipped this week',
    casesTitle: 'Real Client Challenges & Our Solutions',
    casesSubtitle: 'Real problems. Real fixes. Real results.',
    caseClient: 'Client',
    caseProblem: 'Problem',
    caseRootCause: 'Root Cause',
    caseSolution: 'Our Solution',
    caseResult: 'Result',
    behindTitle: 'Behind the Production Floor',
    behindSubtitle: 'A living factory — not a trading company.',
    transparencyTitle: 'Why We Publish Our Production Activity',
    transparencySubtitle: 'Transparency builds trust. This page is our public production record.',
    transparencyP1: 'We believe serious buyers deserve real evidence. That is why we publish weekly records of what we actually produce and ship.',
    transparencyP2: 'You can see real orders, real quantities, destinations, and the way we handle quality control on our production floor.',
    transparencyP3: 'We also document real client problems and how we solved them, so you can judge our technical capability.',
    transparencyP4: 'Over time this becomes a searchable archive of our factory performance, not just marketing claims.',
    ctaTitle: 'Work With a Real Factory',
    ctaSubtitle: 'Get a quote or reach out to our production team.',
    ctaQuote: 'Get a Quote',
    ctaContact: 'Contact Our Production Team',
    weeklyIntro: 'Real orders, real specifications, real quality results — documented as they happen on our production floor.',
    viewAllUpdates: 'View all updates',
    casesIntro: 'Real technical challenges from our customers, diagnosed and solved by our engineering team. Every case is documented and verified.',
    viewAllCases: 'View all cases',
    quantity: 'Quantity',
    specs: 'Specs',
    destination: 'Destination',
    leadTime: 'Lead Time',
    fullSpecs: 'Full Specifications',
    qualityControl: 'Quality Control',
    showNotes: 'Show Production Notes',
    hideNotes: 'Hide Production Notes',
    posted: 'Posted',
    byProductionTeam: 'by Production Team',
    published: 'Published',
    showTechDetails: 'Show Technical Details',
    hideTechDetails: 'Hide Technical Details',
    solved: 'Solved',
    verified: 'Verified',
    behindIntro: "Beyond the production numbers, here's what happens behind the scenes — from machine maintenance to operator training.",
    productionUptime: 'Production Uptime',
    materialRejection: 'Material Rejection Rate',
    certifiedOperators: 'Certified Operators',
    archiveTitle: 'Production Archive & Search',
    archiveIntro: 'Browse our complete production history. Filter by product type, region, or search for specific entries.',
    productionUpdatesCount: 'Production Updates',
    problemsSolvedCount: 'Problems Solved',
    searchPlaceholder: 'Search entries by keyword...',
    filters: 'Filters',
    seoTitle: 'Factory Journal – Real Production Updates & Client Solutions | Zhixin Paper',
    seoDesc: 'Live record of our weekly manufacturing: thermal paper rolls, 4×6 labels, OEM printing, and real client problem-solving cases. Updated weekly.',
  },
  zh: {
    heroTitle: '工厂日志：每周生产记录',
    heroSubtitle: '真实生产 · 真实订单 · 真实方案',
    heroDesc: '从自有工厂每周输出的真实生产更新，记录热敏纸卷和热敏标签的实际订单、数量与解决方案。',
    heroNote: '自中国生产工厂每周更新一次。',
    heroBadge: '每周更新',
    heroLastUpdatedPrefix: '最近更新',
    heroLastUpdatedFallback: '等待发布第一条更新',
    weeklyTitle: '每周生产亮点',
    weeklySubtitle: '本周生产与发货一览',
    casesTitle: '客户问题与我们的解决方案',
    casesSubtitle: '真实问题 · 真实解决 · 真实结果',
    caseClient: '客户',
    caseProblem: '问题',
    caseRootCause: '技术原因',
    caseSolution: '我们的方案',
    caseResult: '结果',
    behindTitle: '生产线背后',
    behindSubtitle: '让客户知道你是活的工厂，不是贸易公司。',
    transparencyTitle: '为什么公开我们的生产活动',
    transparencySubtitle: '透明建立信任，这一页就是我们的公开生产记录。',
    transparencyP1: '我们相信，认真负责的采购应该看到真实证据，因此我们每周公开自己实际生产与发货的记录。',
    transparencyP2: '你可以看到真实的订单、数量、目的地，以及我们在生产现场如何做质量控制。',
    transparencyP3: '我们也记录客户遇到的真实问题，以及我们给出的技术解决方案，方便你判断我们的能力。',
    transparencyP4: '随着时间积累，这将变成一份可检索的工厂表现档案，而不是几句营销文案。',
    ctaTitle: '与真实工厂合作',
    ctaSubtitle: '获取报价或联系生产团队。',
    ctaQuote: '获取报价',
    ctaContact: '联系生产团队',
    weeklyIntro: '真实订单、真实规格、真实质检结果 — 在生产现场实时记录。',
    viewAllUpdates: '查看全部更新',
    casesIntro: '来自客户的真实技术难题，由我们的工程团队诊断与解决，每个案例均有记录和验证。',
    viewAllCases: '查看全部案例',
    quantity: '数量',
    specs: '规格',
    destination: '目的地',
    leadTime: '交期',
    fullSpecs: '完整规格',
    qualityControl: '质量检验',
    showNotes: '展开生产备注',
    hideNotes: '收起生产备注',
    posted: '发布',
    byProductionTeam: '生产团队',
    published: '已发布',
    showTechDetails: '展开技术细节',
    hideTechDetails: '收起技术细节',
    solved: '解决日期',
    verified: '已验证',
    behindIntro: '除了生产数据，这里展示生产线背后的工作 — 从设备维护到操作员培训。',
    productionUptime: '生产稼动率',
    materialRejection: '原料拒收率',
    certifiedOperators: '持证操作员',
    archiveTitle: '生产档案与检索',
    archiveIntro: '浏览完整生产历史。按产品类型、地区筛选，或搜索关键词。',
    productionUpdatesCount: '生产更新',
    problemsSolvedCount: '问题解决',
    searchPlaceholder: '按关键词搜索...',
    filters: '筛选',
    seoTitle: '工厂日志 – 真实生产更新与客户案例 | 智鑫纸业',
    seoDesc: '每周记录热敏纸卷、4×6 标签、OEM 印刷生产及客户问题解决案例。每周更新。',
  },
  ru: {
    heroTitle: 'Заводской журнал: еженедельные отчеты',
    heroSubtitle: 'Реальное производство. Реальные заказы. Реальные решения.',
    heroDesc: 'Еженедельные обновления прямо с нашего завода по производству термобумаги: реальные заказы, объемы и решенные задачи клиентов.',
    heroNote: 'Обновляется каждую неделю на нашем заводе в Китае.',
    heroBadge: 'Обновляется еженедельно',
    heroLastUpdatedPrefix: 'Последнее обновление',
    heroLastUpdatedFallback: 'Ожидаем первую запись',
    weeklyTitle: 'Еженедельные производственные новости',
    weeklySubtitle: 'Что мы произвели и отправили на этой неделе',
    casesTitle: 'Реальные проблемы клиентов и наши решения',
    casesSubtitle: 'Реальные проблемы. Реальные решения. Реальные результаты.',
    caseClient: 'Клиент',
    caseProblem: 'Проблема',
    caseRootCause: 'Причина',
    caseSolution: 'Наше решение',
    caseResult: 'Результат',
    behindTitle: 'За кулисами производства',
    behindSubtitle: 'Живой завод — не торговая компания.',
    transparencyTitle: 'Зачем мы публикуем производственную активность',
    transparencySubtitle: 'Прозрачность строит доверие. Эта страница — наш публичный производственный журнал.',
    transparencyP1: 'Мы считаем, что серьезным покупателям нужны реальные доказательства, поэтому публикуем еженедельные отчеты о том, что действительно производим и отправляем.',
    transparencyP2: 'Вы видите реальные заказы, объемы, направления отгрузки и то, как мы проводим контроль качества на производстве.',
    transparencyP3: 'Мы также документируем реальные проблемы клиентов и решения, чтобы вы могли оценить наш технический уровень.',
    transparencyP4: 'Со временем это становится архивом работы завода, а не просто маркетинговыми заявлениями.',
    ctaTitle: 'Работайте с реальным заводом',
    ctaSubtitle: 'Получите предложение или свяжитесь с нашей производственной командой.',
    ctaQuote: 'Запросить цену',
    ctaContact: 'Связаться с производственной командой',
    weeklyIntro: 'Реальные заказы, спецификации и результаты QC — документируются прямо на производстве.',
    viewAllUpdates: 'Все обновления',
    casesIntro: 'Реальные технические задачи от клиентов, диагностированы и решены нашими инженерами. Каждый кейс задокументирован и проверен.',
    viewAllCases: 'Все кейсы',
    quantity: 'Количество',
    specs: 'Спецификация',
    destination: 'Направление',
    leadTime: 'Срок поставки',
    fullSpecs: 'Полная спецификация',
    qualityControl: 'Контроль качества',
    showNotes: 'Показать производственные заметки',
    hideNotes: 'Скрыть заметки',
    posted: 'Опубликовано',
    byProductionTeam: 'производственной командой',
    published: 'Опубликовано',
    showTechDetails: 'Показать технические детали',
    hideTechDetails: 'Скрыть детали',
    solved: 'Решено',
    verified: 'Проверено',
    behindIntro: 'Помимо производственных показателей — обслуживание оборудования, обучение операторов.',
    productionUptime: 'Время работы',
    materialRejection: 'Отклонение материалов',
    certifiedOperators: 'Сертифицированные операторы',
    archiveTitle: 'Архив производства и поиск',
    archiveIntro: 'Полная история производства. Фильтр по типу продукции, региону или поиск.',
    productionUpdatesCount: 'Производственные обновления',
    problemsSolvedCount: 'Решенные проблемы',
    searchPlaceholder: 'Поиск по ключевым словам...',
    filters: 'Фильтры',
    seoTitle: 'Заводской журнал – Производственные новости и кейсы | Zhixin Paper',
    seoDesc: 'Еженедельные отчеты о производстве терморулонов, этикеток 4×6, OEM печати и решении проблем клиентов.',
  },
};
