/**
 * 志信纸业 - 实际图片占位符位置扫描结果
 * 
 * 扫描时间：2026-02-03
 * 扫描方法：逐个检查页面组件代码，只记录实际存在的ImagePlaceholder使用
 */

export const ACTUAL_PLACEHOLDERS_LIST = [
  // ========== 1. LandingPage.tsx (首页) ==========
  // ✅ 有1个真实图片：Hero Banner (使用backgroundImage，已有图片URL)
  // ❌ 不需要占位符（已经有真实图片：https://i.ibb.co/5XhTcxwV/home-banner.jpg）
  
  // ========== 2. ProductionPage.tsx (生产制造页) ==========
  {
    placeholder_key: 'manufacturing_hero',
    page_path: '/manufacturing',
    section_name: 'Hero Section',
    element_description: 'Factory production facility - thermal paper and label manufacturing lines',
    placeholder_type: 'hero',
    required_dimensions: '1600x900',
    status: 'missing',
    priority: 'high',
  },

  // ========== 3. JumboRollsPage.tsx (热敏大卷原料页) ==========
  {
    placeholder_key: 'thermal_jumbo_rolls',
    page_path: '/material-supply/thermal-jumbo-rolls',
    section_name: 'Product Image',
    element_description: 'Thermal jumbo rolls warehouse - master rolls for converters and slitting',
    placeholder_type: 'product',
    required_dimensions: '1200x800',
    status: 'missing',
    priority: 'high',
  },

  // ========== 4. SelfAdhesiveJumboPage.tsx (不干胶大卷页) ==========
  {
    placeholder_key: 'self_adhesive_jumbo_rolls',
    page_path: '/material-supply/self-adhesive-jumbo-rolls',
    section_name: 'Product Image',
    element_description: 'Self-adhesive jumbo rolls warehouse - label stock for slitting and converting',
    placeholder_type: 'product',
    required_dimensions: '1200x800',
    status: 'missing',
    priority: 'high',
  },

  // ========== 5. SelfAdhesiveSheetsPage.tsx (不干胶页材页) ==========
  {
    placeholder_key: 'self_adhesive_sheets',
    page_path: '/material-supply/self-adhesive-sheets',
    section_name: 'Product Image',
    element_description: 'Self-adhesive label sheets in reams - pre-cut sheets for printing and packaging',
    placeholder_type: 'product',
    required_dimensions: '1200x800',
    status: 'missing',
    priority: 'medium',
  },

  // ========== 6. NCRJumboPage.tsx (NCR大卷页) ==========
  {
    placeholder_key: 'ncr_jumbo_rolls',
    page_path: '/material-supply/ncr-jumbo-rolls',
    section_name: 'Product Image',
    element_description: 'NCR carbonless jumbo rolls warehouse - multi-part forms base material',
    placeholder_type: 'product',
    required_dimensions: '1200x800',
    status: 'missing',
    priority: 'high',
  },

  // ========== 7. NCRSheetsPage.tsx (NCR页材页) ==========
  {
    placeholder_key: 'ncr_sheets',
    page_path: '/material-supply/ncr-sheets',
    section_name: 'Product Image',
    element_description: 'NCR carbonless paper sheets in reams - ready-to-print multi-part forms',
    placeholder_type: 'product',
    required_dimensions: '1200x800',
    status: 'missing',
    priority: 'medium',
  },

  // ========== 没有图片的页面（不需要占位符）==========
  // - AboutPage.tsx (纯文字内容)
  // - ProductsPage.tsx (产品目录导航页，纯文字+图标)
  // - ThermalPaperPage.tsx (产品详情页，纯文字)
  // - ThermalLabelsPage.tsx (产品详情页，纯文字)
  // - NCRFormsPage.tsx (产品详情页，纯文字)
  // - ContactsPage.tsx (联系表单页，纯文字)
  // - RequestTenderPackPage.tsx (询盘表单页，纯文字)
  // - GovernmentTendersPage.tsx (应用场景页，纯文字)
  // - ApplicationsOverviewPage.tsx (应用概览页，纯文字)
  // - MaterialSupplyOverviewPage.tsx (原料概览页，纯文字)
];

console.log(`实际图片占位符数量: ${ACTUAL_PLACEHOLDERS_LIST.length} 个`);

// ========== 三语言扩展 ==========
export function expandToThreeLanguages() {
  const languages = ['en', 'ru', 'zh'];
  const expanded = [];
  
  for (const placeholder of ACTUAL_PLACEHOLDERS_LIST) {
    for (const lang of languages) {
      expanded.push({
        ...placeholder,
        placeholder_key: `${placeholder.placeholder_key}_${lang}`,
        page_path: `/${lang}${placeholder.page_path}`,
      });
    }
  }
  
  return expanded;
}

// 扩展后的总数
const EXPANDED_LIST = expandToThreeLanguages();
console.log(`三语言扩展后: ${EXPANDED_LIST.length} 个占位符`);

export { EXPANDED_LIST as COMPLETE_PLACEHOLDERS_LIST };