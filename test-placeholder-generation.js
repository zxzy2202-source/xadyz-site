/**
 * 测试占位符生成逻辑
 * 在浏览器控制台运行此代码来验证路径是否正确
 */

const ACTUAL_PLACEHOLDERS_LIST = [
  {
    placeholder_key: 'manufacturing_hero',
    page_path: '/manufacturing',
    section_name: 'Hero Section',
    element_description: 'Factory production facility',
    placeholder_type: 'hero',
    required_dimensions: '1600x900',
    required_ratio: '16:9',
    status: 'missing',
    priority: 'high',
  },
  {
    placeholder_key: 'thermal_jumbo_rolls',
    page_path: '/material-supply/thermal-jumbo-rolls',
    section_name: 'Product Image',
    element_description: 'Thermal jumbo rolls warehouse',
    placeholder_type: 'material',
    required_dimensions: '1200x800',
    required_ratio: '3:2',
    status: 'missing',
    priority: 'high',
  },
];

function expandToThreeLanguages() {
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

const result = expandToThreeLanguages();

console.log('生成的占位符数量:', result.length);
console.log('预期: 6个 (2个基础 × 3语言)');
console.log('\n生成的路径:');
result.forEach(p => {
  console.log(`- ${p.placeholder_key}: ${p.page_path}`);
});

console.log('\n预期路径应该是:');
console.log('- manufacturing_hero_en: /en/manufacturing');
console.log('- manufacturing_hero_ru: /ru/manufacturing');
console.log('- manufacturing_hero_zh: /zh/manufacturing');
console.log('- thermal_jumbo_rolls_en: /en/material-supply/thermal-jumbo-rolls');
console.log('- thermal_jumbo_rolls_ru: /ru/material-supply/thermal-jumbo-rolls');
console.log('- thermal_jumbo_rolls_zh: /zh/material-supply/thermal-jumbo-rolls');
