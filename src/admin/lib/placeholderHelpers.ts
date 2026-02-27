import { supabase } from './supabaseClient';
import { COMPLETE_PLACEHOLDERS_LIST } from './completePlaceholdersData';

/**
 * 批量插入完整的占位符列表到数据库
 * 
 * 使用方法：
 * 1. 先清空现有占位符：deleteAllPlaceholders()
 * 2. 再插入新的：insertCompletePlaceholders()
 */
export async function insertCompletePlaceholders() {
  try {
    console.log(`准备插入 ${COMPLETE_PLACEHOLDERS_LIST.length} 个占位符...`);
    
    // 分批插入，每批100个（Supabase限制）
    const batchSize = 100;
    let inserted = 0;
    
    for (let i = 0; i < COMPLETE_PLACEHOLDERS_LIST.length; i += batchSize) {
      const batch = COMPLETE_PLACEHOLDERS_LIST.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('placeholders')
        .insert(batch)
        .select();
      
      if (error) {
        // 如果是重复键错误，记录并继续
        if (error.code === '23505') {
          console.warn(`批次 ${i / batchSize + 1} 有重复键，跳过...`);
          continue;
        }
        throw error;
      }
      
      inserted += data?.length || 0;
      console.log(`已插入 ${inserted}/${COMPLETE_PLACEHOLDERS_LIST.length} 个占位符`);
    }
    
    console.log(`✅ 成功插入 ${inserted} 个占位符！`);
    return { success: true, count: inserted };
  } catch (error: any) {
    console.error('❌ 插入占位符失败:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * 删除所有占位符（慎用！）
 */
export async function deleteAllPlaceholders() {
  if (!confirm('⚠️ 确定要删除所有占位符吗？此操作不可逆！')) {
    return { success: false, error: '用户取消操作' };
  }
  
  try {
    const { error } = await supabase
      .from('placeholders')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // 删除所有记录
    
    if (error) throw error;
    
    console.log('✅ 已清空所有占位符');
    return { success: true };
  } catch (error: any) {
    console.error('❌ 清空占位符失败:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * 获取占位符统计信息
 */
export async function getPlaceholderStats() {
  try {
    const { data, error } = await supabase
      .from('placeholders')
      .select('status, priority');
    
    if (error) throw error;
    
    const stats = {
      total: data.length,
      missing: data.filter(p => p.status === 'missing').length,
      replaced: data.filter(p => p.status === 'replaced').length,
      high_priority: data.filter(p => p.priority === 'high').length,
      medium_priority: data.filter(p => p.priority === 'medium').length,
      low_priority: data.filter(p => p.priority === 'low').length,
    };
    
    console.log('📊 占位符统计:', stats);
    return { success: true, stats }; // Fixed: Return object with success and stats
  } catch (error: any) {
    console.error('❌ 获取统计失败:', error.message);
    return { success: false, error: error.message };
  }
}