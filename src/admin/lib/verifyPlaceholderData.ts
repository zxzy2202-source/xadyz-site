/**
 * 验证占位符数据生成是否正确
 * 在浏览器控制台运行来检查
 */

import { ACTUAL_PLACEHOLDERS_LIST, COMPLETE_PLACEHOLDERS_LIST } from './actualPlaceholdersData';

export function verifyPlaceholderData() {
  console.group('🔍 占位符数据验证');
  
  // 基础数据检查
  console.log('📊 基础占位符数量:', ACTUAL_PLACEHOLDERS_LIST.length);
  console.log('📊 扩展后占位符数量:', COMPLETE_PLACEHOLDERS_LIST.length);
  console.log('📊 预期扩展后数量:', ACTUAL_PLACEHOLDERS_LIST.length * 3);
  
  // 检查基础数据
  console.group('📋 基础占位符列表');
  ACTUAL_PLACEHOLDERS_LIST.forEach((p, i) => {
    console.log(`${i + 1}. ${p.placeholder_key}`, {
      page_path: p.page_path,
      type: p.placeholder_type,
      priority: p.priority,
    });
  });
  console.groupEnd();
  
  // 检查扩展数据
  console.group('📋 扩展后占位符示例（前6个）');
  COMPLETE_PLACEHOLDERS_LIST.slice(0, 6).forEach((p, i) => {
    console.log(`${i + 1}. ${p.placeholder_key}`, {
      page_path: p.page_path,
      type: p.placeholder_type,
      priority: p.priority,
    });
  });
  console.groupEnd();
  
  // 检查路径格式
  console.group('✅ 路径格式检查');
  const pathsCorrect = COMPLETE_PLACEHOLDERS_LIST.every(p => {
    return p.page_path.startsWith('/en/') || 
           p.page_path.startsWith('/ru/') || 
           p.page_path.startsWith('/zh/');
  });
  console.log('所有路径都有语言前缀:', pathsCorrect ? '✅' : '❌');
  
  // 显示所有唯一路径
  const uniquePaths = [...new Set(COMPLETE_PLACEHOLDERS_LIST.map(p => p.page_path))];
  console.log('唯一路径列表 (应该有18个):', uniquePaths.length);
  uniquePaths.forEach(path => console.log('  -', path));
  console.groupEnd();
  
  // 按语言分组统计
  console.group('📊 按语言分组');
  const byLang = {
    en: COMPLETE_PLACEHOLDERS_LIST.filter(p => p.page_path.startsWith('/en/')).length,
    ru: COMPLETE_PLACEHOLDERS_LIST.filter(p => p.page_path.startsWith('/ru/')).length,
    zh: COMPLETE_PLACEHOLDERS_LIST.filter(p => p.page_path.startsWith('/zh/')).length,
  };
  console.log('英文 (EN):', byLang.en, '个');
  console.log('俄文 (RU):', byLang.ru, '个');
  console.log('中文 (ZH):', byLang.zh, '个');
  console.groupEnd();
  
  // 按优先级统计
  console.group('📊 按优先级分组');
  const byPriority = {
    high: COMPLETE_PLACEHOLDERS_LIST.filter(p => p.priority === 'high').length,
    medium: COMPLETE_PLACEHOLDERS_LIST.filter(p => p.priority === 'medium').length,
    low: COMPLETE_PLACEHOLDERS_LIST.filter(p => p.priority === 'low').length,
  };
  console.log('高优先级 (HIGH):', byPriority.high, '个');
  console.log('中优先级 (MEDIUM):', byPriority.medium, '个');
  console.log('低优先级 (LOW):', byPriority.low, '个');
  console.groupEnd();
  
  // 按类型统计
  console.group('📊 按类型分组');
  const byType = {
    hero: COMPLETE_PLACEHOLDERS_LIST.filter(p => p.placeholder_type === 'hero').length,
    product: COMPLETE_PLACEHOLDERS_LIST.filter(p => p.placeholder_type === 'product').length,
    factory: COMPLETE_PLACEHOLDERS_LIST.filter(p => p.placeholder_type === 'factory').length,
    other: COMPLETE_PLACEHOLDERS_LIST.filter(p => !['hero', 'product', 'factory'].includes(p.placeholder_type)).length,
  };
  console.log('Hero类型:', byType.hero, '个');
  console.log('Product类型:', byType.product, '个');
  console.log('Factory类型:', byType.factory, '个');
  console.log('其他类型:', byType.other, '个');
  console.groupEnd();
  
  // 检查数据完整性
  console.group('✅ 数据完整性检查');
  const issues = [];
  
  COMPLETE_PLACEHOLDERS_LIST.forEach((p, i) => {
    if (!p.placeholder_key) issues.push(`第${i + 1}个: 缺少 placeholder_key`);
    if (!p.page_path) issues.push(`第${i + 1}个: 缺少 page_path`);
    if (!p.placeholder_type) issues.push(`第${i + 1}个: 缺少 placeholder_type`);
    if (!p.priority) issues.push(`第${i + 1}个: 缺少 priority`);
    if (!p.status) issues.push(`第${i + 1}个: 缺少 status`);
  });
  
  if (issues.length === 0) {
    console.log('✅ 所有数据字段完整！');
  } else {
    console.error('❌ 发现问题:', issues);
  }
  console.groupEnd();
  
  console.groupEnd();
  
  return {
    total: COMPLETE_PLACEHOLDERS_LIST.length,
    byLang,
    byPriority,
    byType,
    pathsCorrect,
    issues,
  };
}

// 自动运行
if (typeof window !== 'undefined') {
  console.log('💡 运行 verifyPlaceholderData() 来验证数据');
}
