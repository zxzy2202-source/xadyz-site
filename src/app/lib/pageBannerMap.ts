/**
 * 页面 Banner 与素材对应关系
 * 用于后台占位符管理和前端动态加载
 *
 * 映射规则：
 * - pagePath: 页面路径（支持 /en/、/zh/ 等前缀）
 * - bannerKey: bannerConfig.hero 中的 key，作为默认图
 * - placeholderPattern: 占位符 key 的通配符，用于匹配 placeholders 表
 */

export const PAGE_BANNER_MAP: Array<{
  pagePath: string;
  bannerKey: string;
  placeholderPattern: string;
  label: string;
}> = [
  { pagePath: '/', bannerKey: 'landing', placeholderPattern: 'home_hero', label: '首页' },
  { pagePath: '/products', bannerKey: 'products', placeholderPattern: 'products_hero', label: '产品页' },
  { pagePath: '/thermal-paper-rolls', bannerKey: 'thermalPaper', placeholderPattern: 'thermal_paper_hero', label: '热敏纸' },
  { pagePath: '/thermal-labels', bannerKey: 'thermalLabels', placeholderPattern: 'thermal_labels_hero', label: '热敏标签' },
  { pagePath: '/ncr-forms', bannerKey: 'ncrForms', placeholderPattern: 'ncr_forms_hero', label: '无碳复写纸' },
  { pagePath: '/material-supply', bannerKey: 'materialSupply', placeholderPattern: 'material_supply_hero', label: '原料供应' },
  { pagePath: '/material-supply/thermal-jumbo-rolls', bannerKey: 'jumboRolls', placeholderPattern: 'jumbo_hero', label: '热敏大卷' },
  { pagePath: '/material-supply/self-adhesive-jumbo-rolls', bannerKey: 'selfAdhesiveJumbo', placeholderPattern: 'sa_jumbo_hero', label: '自粘大卷' },
  { pagePath: '/material-supply/self-adhesive-sheets', bannerKey: 'selfAdhesiveSheets', placeholderPattern: 'sa_sheets_hero', label: '自粘卷材' },
  { pagePath: '/material-supply/ncr-jumbo-rolls', bannerKey: 'ncrJumbo', placeholderPattern: 'ncr_jumbo_hero', label: '无碳大卷' },
  { pagePath: '/material-supply/ncr-sheets', bannerKey: 'ncrSheets', placeholderPattern: 'ncr_sheets_hero', label: '无碳卷材' },
  { pagePath: '/applications', bannerKey: 'applications', placeholderPattern: 'applications_hero', label: '应用方案' },
  { pagePath: '/applications/retail-pos', bannerKey: 'retailPOS', placeholderPattern: 'retail_pos_hero', label: '零售 POS' },
  { pagePath: '/applications/logistics-warehousing', bannerKey: 'logisticsWarehousing', placeholderPattern: 'logistics_hero', label: '物流仓储' },
  { pagePath: '/applications/supermarkets', bannerKey: 'supermarkets', placeholderPattern: 'supermarkets_hero', label: '商超' },
  { pagePath: '/applications/banking-finance', bannerKey: 'bankingFinance', placeholderPattern: 'banking_hero', label: '银行金融' },
  { pagePath: '/applications/government-tenders', bannerKey: 'governmentTenders', placeholderPattern: 'govt_hero', label: '政府招标' },
  { pagePath: '/applications/healthcare', bannerKey: 'healthcare', placeholderPattern: 'healthcare_hero', label: '医疗' },
  { pagePath: '/manufacturing', bannerKey: 'manufacturing', placeholderPattern: 'manufacturing_hero', label: '制造' },
  { pagePath: '/manufacturing/factory-overview', bannerKey: 'factoryOverview', placeholderPattern: 'factory_overview_hero', label: '工厂概览' },
  { pagePath: '/manufacturing/production-lines', bannerKey: 'productionLines', placeholderPattern: 'production_lines_hero', label: '生产线' },
  { pagePath: '/manufacturing/quality-control', bannerKey: 'qualityControl', placeholderPattern: 'quality_control_hero', label: '质量管控' },
  { pagePath: '/manufacturing/packaging-shipping', bannerKey: 'packagingShipping', placeholderPattern: 'packaging_shipping_hero', label: '包装物流' },
  { pagePath: '/manufacturing/certifications', bannerKey: 'certifications', placeholderPattern: 'certifications_hero', label: '认证资质' },
  { pagePath: '/manufacturing/oem-customization', bannerKey: 'oemCustomization', placeholderPattern: 'oem_customization_hero', label: 'OEM 定制' },
  { pagePath: '/manufacturing/factory-journal', bannerKey: 'factoryJournal', placeholderPattern: 'factory_journal_hero', label: '工厂日志' },
  { pagePath: '/resources', bannerKey: 'resources', placeholderPattern: 'resources_hero', label: '资源中心' },
  { pagePath: '/resources/blog-insights', bannerKey: 'blogInsights', placeholderPattern: 'blog_hero', label: '博客洞察' },
  { pagePath: '/resources/tools-calculators', bannerKey: 'toolsCalculators', placeholderPattern: 'tools_hero', label: '工具计算器' },
  { pagePath: '/resources/faqs', bannerKey: 'faqs', placeholderPattern: 'faqs_hero', label: '常见问题' },
  { pagePath: '/contact', bannerKey: 'contact', placeholderPattern: 'contact_hero', label: '联系我们' },
  { pagePath: '/request-tender-pack', bannerKey: 'requestTenderPack', placeholderPattern: 'request_tender_pack_hero', label: '申请投标资料包' },
  { pagePath: '/about', bannerKey: 'about', placeholderPattern: 'about_hero', label: '关于我们' },
];

/** 根据当前路径获取 banner 配置 */
export function getBannerConfigForPath(pathname: string): (typeof PAGE_BANNER_MAP)[0] | undefined {
  const normalized = pathname.replace(/^\/[a-z]{2}/, '') || '/';
  return PAGE_BANNER_MAP.find(
    (m) => normalized === m.pagePath || normalized.startsWith(m.pagePath + '/')
  ) || PAGE_BANNER_MAP.find((m) => m.pagePath === '/');
}
