/**
 * 页面素材规范 - 逐页配置
 * 命名规则: {page}-{topic}-{scene}.webp
 * Alt 规则: 只写事实，不写营销
 *
 * 使用方式: 后台 page-assets 映射时可参考此结构
 * 前端: getPageAssets(pageKey) 获取当前页素材
 */

export type PageKey =
  | 'home'
  | 'products'
  | 'thermalPaper'
  | 'thermalLabels'
  | 'ncrForms'
  | 'materialSupply'
  | 'jumboRolls'
  | 'selfAdhesiveJumbo'
  | 'selfAdhesiveSheets'
  | 'ncrJumbo'
  | 'ncrSheets'
  | 'applications'
  | 'retailPos'
  | 'logisticsWarehousing'
  | 'supermarkets'
  | 'bankingFinance'
  | 'governmentTenders'
  | 'healthcare'
  | 'manufacturing'
  | 'factoryOverview'
  | 'productionLines'
  | 'qualityControl'
  | 'packagingShipping'
  | 'certifications'
  | 'oemCustomization'
  | 'resources'
  | 'blogInsights'
  | 'packagingLogistics'
  | 'toolsCalculators'
  | 'faqs'
  | 'about'
  | 'contact'
  | 'requestTenderPack';

export interface PageImage {
  /** 建议文件名（public/images/ 下） */
  src: string;
  /** Alt 文本模板（ factual only） */
  alt: string;
  /** 用途说明 */
  usage?: string;
}

export interface PageAssetsConfig {
  pageKey: PageKey;
  pagePath: string;
  label: string;
  /** 本页建议图片总数 */
  imageCount: string;
  hero: PageImage;
  gallery: PageImage[];
  cards?: Record<string, PageImage>;
  trust?: PageImage;
}

/** 全站页面素材规范 */
export const PAGE_ASSETS_SPEC: Record<PageKey, PageAssetsConfig> = {
  home: {
    pageKey: 'home',
    pagePath: '/',
    label: '首页',
    imageCount: '6-9 张（含 1 张 hero）',
    hero: {
      src: '/images/home-hero-factory-line.webp',
      alt: 'Thermal paper slitting and rewinding production line in Zhixin Paper factory',
      usage: '超广角产线，有人操作更真实',
    },
    gallery: [
      { src: '/images/home-proof-equipment.webp', alt: 'Slitting machine with control panel', usage: '设备：分切机/印刷机' },
      { src: '/images/home-proof-warehouse.webp', alt: 'Jumbo rolls stacked in warehouse', usage: '仓库：巨型卷/托盘堆叠' },
      { src: '/images/home-proof-qc.webp', alt: 'Quality inspection sampling and testing', usage: '质检：取样/测试仪器' },
      { src: '/images/home-proof-container.webp', alt: 'Container loading for shipment', usage: '装柜：集装箱装货' },
    ],
    trust: { src: '/images/home-trust-container.webp', alt: 'Container loading for export', usage: '底部信任图' },
  },

  products: {
    pageKey: 'products',
    pagePath: '/products',
    label: '产品总览',
    imageCount: '3-6 张',
    hero: {
      src: '/images/products-hero-overview.webp',
      alt: 'Thermal paper rolls, thermal labels and NCR forms product overview',
    },
    gallery: [
      { src: '/images/products-thermal-rolls-packaging.webp', alt: 'Thermal paper rolls packaging', usage: '热敏卷代表图' },
      { src: '/images/products-thermal-labels-packaging.webp', alt: 'Thermal labels rolls with barcode print sample', usage: '热敏标签代表图' },
      { src: '/images/products-ncr-forms-packaging.webp', alt: 'NCR multi-part forms edge detail', usage: 'NCR 代表图' },
    ],
    cards: {
      product1: { src: '/images/products-thermal-rolls-packaging.webp', alt: 'Thermal paper rolls for POS and retail' },
      product2: { src: '/images/products-thermal-labels-packaging.webp', alt: 'Thermal labels for logistics and retail' },
      product3: { src: '/images/products-ncr-forms-packaging.webp', alt: 'NCR carbonless forms for documentation' },
    },
  },

  thermalPaper: {
    pageKey: 'thermalPaper',
    pagePath: '/thermal-paper-rolls',
    label: '热敏纸卷',
    imageCount: '6-10 张',
    hero: {
      src: '/images/thermal-paper-hero-production.webp',
      alt: 'Thermal paper rolls production and packaging',
    },
    gallery: [
      { src: '/images/thermal-paper-closeup-surface.webp', alt: 'Thermal paper surface and coating consistency' },
      { src: '/images/thermal-paper-specs-diameter.webp', alt: 'Thermal paper roll diameter and core dimensions' },
      { src: '/images/thermal-paper-packaging-single.webp', alt: 'Single roll packaging' },
      { src: '/images/thermal-paper-packaging-pallet.webp', alt: 'Thermal paper rolls on pallet' },
      { src: '/images/thermal-paper-pos-scene.webp', alt: 'POS receipt printing in retail store' },
      { src: '/images/thermal-paper-slitting-process.webp', alt: 'Thermal paper slitting and rewinding process' },
    ],
    trust: { src: '/images/thermal-paper-container-loading.webp', alt: 'Thermal paper rolls container loading' },
  },

  thermalLabels: {
    pageKey: 'thermalLabels',
    pagePath: '/thermal-labels',
    label: '热敏标签',
    imageCount: '6-10 张',
    hero: {
      src: '/images/thermal-labels-hero-production.webp',
      alt: 'Thermal label rolls production line',
    },
    gallery: [
      { src: '/images/thermal-labels-closeup-adhesive.webp', alt: 'Thermal label adhesive and release liner structure' },
      { src: '/images/thermal-labels-print-sample-barcode.webp', alt: 'Thermal label barcode print sample' },
      { src: '/images/thermal-labels-logistics-scene.webp', alt: 'Shipping labels in logistics warehouse' },
      { src: '/images/thermal-labels-die-cutting.webp', alt: 'Label die cutting process' },
      { src: '/images/thermal-labels-packaging-rolls.webp', alt: 'Thermal label rolls packaging' },
    ],
  },

  ncrForms: {
    pageKey: 'ncrForms',
    pagePath: '/ncr-forms',
    label: 'NCR 表格',
    imageCount: '5-8 张',
    hero: {
      src: '/images/ncr-forms-hero-multipart.webp',
      alt: 'NCR multi-part forms with color-coded edges',
    },
    gallery: [
      { src: '/images/ncr-forms-edge-layers.webp', alt: 'NCR form color-coded edge layers' },
      { src: '/images/ncr-forms-continuous-perforation.webp', alt: 'Continuous form perforation and tractor feed holes' },
      { src: '/images/ncr-forms-print-sample.webp', alt: 'NCR form printed table lines and numbering' },
      { src: '/images/ncr-forms-packaging-bundles.webp', alt: 'NCR forms bundled packaging' },
    ],
  },

  materialSupply: {
    pageKey: 'materialSupply',
    pagePath: '/material-supply',
    label: '材料供应总览',
    imageCount: '4-6 张',
    hero: {
      src: '/images/material-supply-hero-warehouse.webp',
      alt: 'Raw material warehouse - thermal jumbo, self-adhesive and NCR materials',
    },
    cards: {
      thermalJumbo: { src: '/images/material-jumbo-warehouse.webp', alt: 'Thermal jumbo rolls in warehouse' },
      selfAdhesive: { src: '/images/material-self-adhesive-structure.webp', alt: 'Self-adhesive roll layer structure' },
      sheets: { src: '/images/material-sheets-stacked.webp', alt: 'Self-adhesive sheets stacked with corner protection' },
      ncr: { src: '/images/material-ncr-rolls.webp', alt: 'NCR jumbo rolls storage' },
    },
  },

  jumboRolls: {
    pageKey: 'jumboRolls',
    pagePath: '/material-supply/thermal-jumbo-rolls',
    label: '热敏 Jumbo 大卷',
    imageCount: '6-9 张',
    hero: {
      src: '/images/jumbo-hero-warehouse.webp',
      alt: 'Thermal jumbo rolls warehouse storage',
    },
    gallery: [
      { src: '/images/jumbo-closeup-76mm-core.webp', alt: 'Thermal jumbo roll 76mm core and 795mm width' },
      { src: '/images/jumbo-rewinding-ready.webp', alt: 'Jumbo rolls ready for slitting' },
      { src: '/images/jumbo-packaging-wrap.webp', alt: 'Jumbo roll kraft paper and stretch wrap packaging' },
    ],
    trust: { src: '/images/jumbo-container-loading.webp', alt: 'Jumbo rolls container loading' },
  },

  selfAdhesiveJumbo: {
    pageKey: 'selfAdhesiveJumbo',
    pagePath: '/material-supply/self-adhesive-jumbo-rolls',
    label: '不干胶卷材',
    imageCount: '5-7 张',
    hero: {
      src: '/images/self-adhesive-hero-structure.webp',
      alt: 'Self-adhesive roll adhesive and release liner layer structure',
    },
    gallery: [
      { src: '/images/self-adhesive-closeup-layers.webp', alt: 'Adhesive and silicone release liner close-up' },
      { src: '/images/self-adhesive-packaging.webp', alt: 'Self-adhesive jumbo roll packaging' },
    ],
  },

  selfAdhesiveSheets: {
    pageKey: 'selfAdhesiveSheets',
    pagePath: '/material-supply/self-adhesive-sheets',
    label: '不干胶平张',
    imageCount: '4-6 张',
    hero: {
      src: '/images/self-adhesive-sheets-hero-stacked.webp',
      alt: 'Self-adhesive sheets stacked with corner protection',
    },
    gallery: [
      { src: '/images/self-adhesive-sheets-pallet.webp', alt: 'Sheets palletized with stretch wrap' },
    ],
  },

  ncrJumbo: {
    pageKey: 'ncrJumbo',
    pagePath: '/material-supply/ncr-jumbo-rolls',
    label: 'NCR 卷材',
    imageCount: '4-6 张',
    hero: {
      src: '/images/ncr-jumbo-hero-warehouse.webp',
      alt: 'NCR carbonless jumbo rolls warehouse',
    },
    gallery: [
      { src: '/images/ncr-jumbo-edge-layers.webp', alt: 'NCR jumbo roll CB CFB CF layer edges' },
      { src: '/images/ncr-jumbo-packaging.webp', alt: 'NCR jumbo roll packaging' },
    ],
  },

  ncrSheets: {
    pageKey: 'ncrSheets',
    pagePath: '/material-supply/ncr-sheets',
    label: 'NCR 平张',
    imageCount: '4-5 张',
    hero: {
      src: '/images/ncr-sheets-hero-stacked.webp',
      alt: 'NCR carbonless sheets stacked and packaged',
    },
    gallery: [
      { src: '/images/ncr-sheets-moisture-packaging.webp', alt: 'NCR sheets moisture-resistant packaging' },
    ],
  },

  applications: {
    pageKey: 'applications',
    pagePath: '/applications',
    label: '应用场景总览',
    imageCount: '6-12 张',
    hero: {
      src: '/images/applications-hero-industrial.webp',
      alt: 'Thermal paper and labels in industrial applications',
    },
    gallery: [
      { src: '/images/applications-retail-pos.webp', alt: 'POS receipt printing at retail counter' },
      { src: '/images/applications-logistics.webp', alt: 'Shipping labels in warehouse' },
      { src: '/images/applications-supermarket.webp', alt: 'Supermarket receipt and scale labels' },
    ],
  },

  retailPos: {
    pageKey: 'retailPos',
    pagePath: '/applications/retail-pos',
    label: '零售与 POS',
    imageCount: '3-5 张',
    hero: {
      src: '/images/retail-pos-hero-counter.webp',
      alt: 'POS terminal with thermal receipt paper at retail counter',
    },
    gallery: [
      { src: '/images/retail-pos-receipt-rolls.webp', alt: 'Thermal receipt rolls at checkout' },
      { src: '/images/retail-pos-slitting-evidence.webp', alt: 'Thermal paper slitting line for retail rolls' },
    ],
  },

  logisticsWarehousing: {
    pageKey: 'logisticsWarehousing',
    pagePath: '/applications/logistics-warehousing',
    label: '物流与仓储',
    imageCount: '4-6 张',
    hero: {
      src: '/images/logistics-hero-warehouse.webp',
      alt: 'Shipping labels on packages in logistics warehouse',
    },
    gallery: [
      { src: '/images/logistics-label-printing.webp', alt: 'Thermal label printing for shipment' },
      { src: '/images/logistics-sorting-conveyor.webp', alt: 'Labels on packages on conveyor' },
    ],
  },

  supermarkets: {
    pageKey: 'supermarkets',
    pagePath: '/applications/supermarkets',
    label: '超市',
    imageCount: '3-4 张',
    hero: {
      src: '/images/supermarkets-hero-checkout.webp',
      alt: 'Supermarket checkout with receipt and scale labels',
    },
    gallery: [
      { src: '/images/supermarkets-receipt-scale.webp', alt: 'Receipt and price scale labels' },
    ],
  },

  bankingFinance: {
    pageKey: 'bankingFinance',
    pagePath: '/applications/banking-finance',
    label: '银行与金融',
    imageCount: '3-4 张',
    hero: {
      src: '/images/banking-hero-atm.webp',
      alt: 'ATM thermal receipt and transaction slip' },
    gallery: [
      { src: '/images/banking-queue-machine.webp', alt: 'Queue ticket machine receipt' },
    ],
  },

  governmentTenders: {
    pageKey: 'governmentTenders',
    pagePath: '/applications/government-tenders',
    label: '政府投标',
    imageCount: '4-6 张',
    hero: {
      src: '/images/govt-hero-documentation.webp',
      alt: 'Tender documentation package with certificates',
    },
    gallery: [
      { src: '/images/govt-certificates.webp', alt: 'ISO FSC compliance certificates' },
      { src: '/images/govt-delivery-evidence.webp', alt: 'Project delivery documentation' },
    ],
  },

  healthcare: {
    pageKey: 'healthcare',
    pagePath: '/applications/healthcare',
    label: '医疗健康',
    imageCount: '3-4 张',
    hero: {
      src: '/images/healthcare-hero-labels.webp',
      alt: 'Medical and pharmacy thermal labels',
    },
    gallery: [
      { src: '/images/healthcare-wristband.webp', alt: 'Patient wristband labels' },
      { src: '/images/healthcare-pharmacy-labels.webp', alt: 'Pharmacy label printing' },
    ],
  },

  manufacturing: {
    pageKey: 'manufacturing',
    pagePath: '/manufacturing',
    label: '生产制造总览',
    imageCount: '12-24 张',
    hero: {
      src: '/images/manufacturing-hero-overview.webp',
      alt: 'Factory production facility overview',
    },
    gallery: [
      { src: '/images/manufacturing-factory-floor.webp', alt: 'Factory floor production area' },
      { src: '/images/manufacturing-slitting-line.webp', alt: 'Thermal paper slitting line' },
      { src: '/images/manufacturing-printing.webp', alt: 'Flexographic printing process' },
    ],
  },

  factoryOverview: {
    pageKey: 'factoryOverview',
    pagePath: '/manufacturing/factory-overview',
    label: '工厂概览',
    imageCount: '3-6 张',
    hero: {
      src: '/images/factory-hero-exterior.webp',
      alt: 'Zhixin Paper factory exterior and main entrance',
    },
    gallery: [
      { src: '/images/factory-floor-layout.webp', alt: 'Factory floor layout and flow' },
    ],
  },

  productionLines: {
    pageKey: 'productionLines',
    pagePath: '/manufacturing/production-lines',
    label: '生产线',
    imageCount: '3-6 张',
    hero: {
      src: '/images/production-hero-slitting.webp',
      alt: 'Thermal paper slitting and rewinding production line',
    },
    gallery: [
      { src: '/images/production-rewinding.webp', alt: 'Paper rewinding machine' },
      { src: '/images/production-die-cutting.webp', alt: 'Label die cutting equipment' },
    ],
  },

  qualityControl: {
    pageKey: 'qualityControl',
    pagePath: '/manufacturing/quality-control',
    label: '质量控制',
    imageCount: '3-6 张',
    hero: {
      src: '/images/quality-hero-lab.webp',
      alt: 'Quality control testing lab with inspection equipment',
    },
    gallery: [
      { src: '/images/quality-sampling.webp', alt: 'Quality sampling and testing' },
      { src: '/images/quality-records.webp', alt: 'Quality inspection records' },
    ],
  },

  packagingShipping: {
    pageKey: 'packagingShipping',
    pagePath: '/manufacturing/packaging-shipping',
    label: '包装运输',
    imageCount: '3-6 张',
    hero: {
      src: '/images/packaging-hero-loading.webp',
      alt: 'Finished goods packaging and container loading',
    },
    gallery: [
      { src: '/images/packaging-pallet-wrap.webp', alt: 'Palletized goods with stretch wrap' },
      { src: '/images/packaging-container.webp', alt: 'Container loading for export' },
    ],
  },

  certifications: {
    pageKey: 'certifications',
    pagePath: '/manufacturing/certifications',
    label: '认证证书',
    imageCount: '3-6 张',
    hero: {
      src: '/images/certs-hero-wall.webp',
      alt: 'ISO 9001 FSC quality certifications',
    },
    gallery: [
      { src: '/images/certs-iso-detail.webp', alt: 'ISO 9001 certification document' },
      { src: '/images/certs-fsc-detail.webp', alt: 'FSC certification document' },
    ],
  },

  oemCustomization: {
    pageKey: 'oemCustomization',
    pagePath: '/manufacturing/oem-customization',
    label: 'OEM 与定制',
    imageCount: '3-6 张',
    hero: {
      src: '/images/oem-hero-custom-labels.webp',
      alt: 'Custom printed thermal labels OEM samples',
    },
    gallery: [
      { src: '/images/oem-packaging-custom.webp', alt: 'Custom packaging for OEM orders' },
      { src: '/images/oem-print-comparison.webp', alt: 'Printed vs blank label comparison' },
    ],
  },

  resources: {
    pageKey: 'resources',
    pagePath: '/resources',
    label: '资源中心',
    imageCount: '3-4 张',
    hero: {
      src: '/images/resources-hero-knowledge.webp',
      alt: 'Resource center knowledge hub' },
    gallery: [],
  },

  blogInsights: {
    pageKey: 'blogInsights',
    pagePath: '/resources/blog-insights',
    label: '博客与洞察',
    imageCount: '每篇 2-4 张',
    hero: {
      src: '/images/blog-hero-factory-detail.webp',
      alt: 'Factory detail for blog featured image',
    },
    gallery: [],
  },

  packagingLogistics: {
    pageKey: 'packagingLogistics',
    pagePath: '/manufacturing/packaging-shipping',
    label: '包装与物流',
    imageCount: '4-6 张',
    hero: {
      src: '/images/pkg-logistics-hero-container.webp',
      alt: 'Packaging and container loading process',
    },
    gallery: [
      { src: '/images/pkg-box-pallet.webp', alt: 'Carton and pallet packaging' },
      { src: '/images/pkg-stretch-corner.webp', alt: 'Stretch wrap and corner protection' },
      { src: '/images/pkg-container-loading.webp', alt: 'Container loading for shipment' },
    ],
  },

  toolsCalculators: {
    pageKey: 'toolsCalculators',
    pagePath: '/resources/tools-calculators',
    label: '工具与计算器',
    imageCount: '1 张（可选）',
    hero: {
      src: '/images/tools-hero-tech-bg.webp',
      alt: 'Technical background for tools section',
    },
    gallery: [],
  },

  faqs: {
    pageKey: 'faqs',
    pagePath: '/resources/faqs',
    label: '常见问题',
    imageCount: '1 张（可选）',
    hero: {
      src: '/images/faqs-hero-support.webp',
      alt: 'Support and information background',
    },
    gallery: [],
  },

  about: {
    pageKey: 'about',
    pagePath: '/about',
    label: '关于我们',
    imageCount: '4-8 张',
    hero: {
      src: '/images/about-hero-production.webp',
      alt: 'Jumbo production line in Zhixin Paper factory',
    },
    gallery: [
      { src: '/images/about-factory-gate.webp', alt: 'Factory gate exterior' },
      { src: '/images/about-timeline-old.webp', alt: 'Historical factory photo 2009' },
      { src: '/images/about-team-photo.webp', alt: 'Zhixin Paper team photo' },
    ],
  },

  contact: {
    pageKey: 'contact',
    pagePath: '/contact',
    label: '联系我们',
    imageCount: '1-2 张',
    hero: {
      src: '/images/contact-hero-office.webp',
      alt: 'Office or factory entrance for contact',
    },
    gallery: [],
  },

  requestTenderPack: {
    pageKey: 'requestTenderPack',
    pagePath: '/request-tender-pack',
    label: '申请投标资料包',
    imageCount: '3-4 张',
    hero: {
      src: '/images/tender-hero-certificates.webp',
      alt: 'Certificate wall and quality documentation',
    },
    gallery: [
      { src: '/images/tender-qc-evidence.webp', alt: 'Quality control evidence' },
      { src: '/images/tender-container-loading.webp', alt: 'Container loading for delivery' },
      { src: '/images/tender-factory-exterior.webp', alt: 'Factory exterior' },
    ],
  },
};

/** 根据路径获取页面素材配置 */
export function getPageAssetsForPath(pathname: string): PageAssetsConfig | undefined {
  const normalized = pathname.replace(/^\/[a-z]{2}/, '') || '/';
  const pathToKey: Record<string, PageKey> = {
    '/': 'home',
    '/products': 'products',
    '/thermal-paper-rolls': 'thermalPaper',
    '/thermal-labels': 'thermalLabels',
    '/ncr-forms': 'ncrForms',
    '/material-supply': 'materialSupply',
    '/material-supply/thermal-jumbo-rolls': 'jumboRolls',
    '/material-supply/self-adhesive-jumbo-rolls': 'selfAdhesiveJumbo',
    '/material-supply/self-adhesive-sheets': 'selfAdhesiveSheets',
    '/material-supply/ncr-jumbo-rolls': 'ncrJumbo',
    '/material-supply/ncr-sheets': 'ncrSheets',
    '/applications': 'applications',
    '/applications/retail-pos': 'retailPos',
    '/applications/logistics-warehousing': 'logisticsWarehousing',
    '/applications/supermarkets': 'supermarkets',
    '/applications/banking-finance': 'bankingFinance',
    '/applications/government-tenders': 'governmentTenders',
    '/applications/healthcare': 'healthcare',
    '/manufacturing': 'manufacturing',
    '/manufacturing/factory-overview': 'factoryOverview',
    '/manufacturing/production-lines': 'productionLines',
    '/manufacturing/quality-control': 'qualityControl',
    '/manufacturing/packaging-shipping': 'packagingShipping',
    '/manufacturing/certifications': 'certifications',
    '/manufacturing/oem-customization': 'oemCustomization',
    '/resources': 'resources',
    '/resources/blog-insights': 'blogInsights',
    '/resources/packaging-logistics': 'packagingLogistics',
    '/resources/tools-calculators': 'toolsCalculators',
    '/resources/faqs': 'faqs',
    '/about': 'about',
    '/contact': 'contact',
    '/request-tender-pack': 'requestTenderPack',
  };
  for (const [path, key] of Object.entries(pathToKey)) {
    if (normalized === path || (path !== '/' && normalized.startsWith(path))) {
      return PAGE_ASSETS_SPEC[key];
    }
  }
  return PAGE_ASSETS_SPEC.home;
}
