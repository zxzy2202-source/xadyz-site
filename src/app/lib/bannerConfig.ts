/**
 * 集中管理 Banner 图配置
 * 真实图片 URL 与占位符描述统一在此维护
 */

const U = (id: string, w = 1920, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`;

/** 已有真实图片的页面 */
export const BANNER_IMAGES = {
  landing: 'https://i.ibb.co/5XhTcxwV/home-banner.jpg',
  about: {
    jumboProduction: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop&q=80',
    factoryGate: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&q=80',
    labelsProduction: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1200&h=800&fit=crop&q=80',
    jumboStock: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&h=800&fit=crop&q=80',
    containerInside: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=800&fit=crop&q=80',
  },
  /** 各页面 Hero Banner 图片（有则用真实图，无则用占位符） */
  hero: {
    products: U('1553413077-190dd305871c'),           // paper rolls warehouse
    thermalPaper: U('1586528116311-ad8dd3c8310d'),   // thermal paper production
    thermalLabels: U('1565688534245-05d6b5be184a'),  // labels production
    ncrForms: U('1578575437130-527eed3abbec'),       // industrial / documents
    materialSupply: U('1578575437130-527eed3abbec'), // industrial materials
    jumboRolls: U('1553413077-190dd305871c'),        // jumbo rolls stacked
    selfAdhesiveJumbo: U('1586528116311-ad8dd3c8310d'), // industrial rolls
    selfAdhesiveSheets: U('1565688534245-05d6b5be184a'), // sheets / labels
    ncrJumbo: U('1553413077-190dd305871c'),          // paper rolls
    ncrSheets: U('1578575437130-527eed3abbec'),      // industrial / documents
    applications: U('1581091226825-a6a2a5aee158'),   // factory / industrial
    governmentTenders: U('1581091226825-a6a2a5aee158'), // industrial / official
    retailPOS: U('1553413077-190dd305871c'),         // paper products
    logisticsWarehousing: U('1578575437130-527eed3abbec'), // warehouse logistics
    supermarkets: U('1553413077-190dd305871c'),      // retail products
    bankingFinance: U('1578575437130-527eed3abbec'), // documents / finance
    healthcare: U('1565688534245-05d6b5be184a'),     // labels / medical
    manufacturing: U('1581091226825-a6a2a5aee158'),  // factory overview
    factoryOverview: U('1581091226825-a6a2a5aee158'),
    productionLines: U('1565688534245-05d6b5be184a'),
    qualityControl: U('1581091226825-a6a2a5aee158'),
    packagingShipping: U('1578575437130-527eed3abbec'),
    certifications: U('1581091226825-a6a2a5aee158'), // factory / quality
    oemCustomization: U('1565688534245-05d6b5be184a'), // labels / custom
    factoryJournal: U('1581091226825-a6a2a5aee158'),  // factory / production
    resources: U('1578575437130-527eed3abbec'),      // documents / resources
    blogInsights: U('1578575437130-527eed3abbec'),   // industrial / insights
    toolsCalculators: U('1578575437130-527eed3abbec'), // office / tools
    faqs: U('1578575437130-527eed3abbec'),           // support / info
    packagingLogistics: U('1578575437130-527eed3abbec'), // shipping
    contact: U('1581091226825-a6a2a5aee158'),        // factory / communication
  },
} as const;

/** 各页面 Hero Banner 占位符描述（待替换为真实图片时在此更新 URL） */
export const BANNER_PLACEHOLDER = {
  products: 'Thermal paper rolls, labels and NCR forms products showcase - finished goods ready for distribution',
  thermalPaper: 'Thermal paper rolls for POS and retail printing - finished products ready for distribution',
  thermalLabels: 'Thermal labels for logistics, retail and industrial printing - blank and printed options',
  ncrForms: 'NCR carbonless forms for business documentation - multi-part forms for invoices and official records',
  materialSupply: 'Raw material supply - thermal jumbo rolls, self-adhesive materials, and NCR paper for converting and industrial use',
  jumboRolls: 'Thermal jumbo rolls warehouse - master rolls stacked for converters and slitting',
  selfAdhesiveJumbo: 'Self-adhesive jumbo rolls for label converters - thermal and non-thermal materials',
  selfAdhesiveSheets: 'Self-adhesive sheets for office suppliers and label printers - A4, A3 and custom sizes',
  ncrJumbo: 'NCR carbonless jumbo rolls for form manufacturers and invoice printers - CB, CFB, CF layers',
  ncrSheets: 'NCR carbonless sheets for form printers - A4, A3, CB, CFB, CF in stock',
  applications: 'Industry application solutions - retail, logistics, government, healthcare thermal paper and labels',
  governmentTenders: 'Government tenders thermal paper and NCR solutions - tender documentation supplies',
  retailPOS: 'Retail and POS thermal paper solutions - receipt rolls and till paper',
  logisticsWarehousing: 'Logistics and warehousing thermal label solutions - shipping and warehouse labels',
  supermarkets: 'Supermarket and retail chain thermal solutions - receipt and scale labels',
  bankingFinance: 'Banking and finance thermal paper and NCR solutions - ATM and transaction forms',
  healthcare: 'Healthcare thermal labels and medical documentation - compliance and patient records',
  manufacturing: 'Factory production facility overview - thermal paper and label manufacturing lines',
  factoryOverview: 'Factory building exterior and warehouse facility',
  productionLines: 'Production line machinery in operation - thermal paper and label manufacturing',
  qualityControl: 'Quality control testing lab with inspection equipment',
  packagingShipping: 'Packaging and shipping facility - finished goods ready for export',
  certifications: 'Quality Certifications Hero - ISO, FSC and compliance certificates',
  oemCustomization: 'OEM Customization Hero - custom thermal labels and printed products',
  factoryJournal: 'Factory Journal Hero - weekly production updates and real client cases',
  resources: 'Resources Center Hero - blog, tools and industry insights',
  blogInsights: 'Blog and Industry Insights Hero',
  toolsCalculators: 'Tools and Calculators Hero',
  faqs: 'FAQs Hero - frequently asked questions about thermal paper',
  packagingLogistics: 'Packaging and Logistics Hero - export and supply chain',
  contact: 'Contact us - customer service team or office communication',
} as const;
