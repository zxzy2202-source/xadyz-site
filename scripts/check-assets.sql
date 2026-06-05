-- ========================================
-- 志信纸业 - 后台素材库检查SQL脚本
-- 用于在Supabase后台快速检查素材状态
-- ========================================

-- 🔍 查询1：素材总数统计
-- ========================================
SELECT 
  COUNT(*) as total_assets,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_count,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
  COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_count
FROM assets;

-- 预期结果示例：
-- total_assets | approved_count | pending_count | rejected_count
-- 54           | 48             | 5             | 1


-- 🏷️ 查询2：按分类统计
-- ========================================
SELECT 
  COALESCE(category, 'uncategorized') as category,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM assets), 1) as percentage
FROM assets
GROUP BY category
ORDER BY count DESC;

-- 预期结果示例：
-- category  | count | percentage
-- product   | 18    | 33.3%
-- factory   | 12    | 22.2%
-- material  | 8     | 14.8%
-- banner    | 6     | 11.1%
-- other     | 8     | 14.8%
-- doc       | 2     | 3.7%


-- 📊 查询3：按文件类型统计
-- ========================================
SELECT 
  file_type,
  COUNT(*) as count,
  ROUND(AVG(file_size) / 1024, 1) as avg_size_kb,
  ROUND(SUM(file_size) / 1024 / 1024, 2) as total_size_mb
FROM assets
GROUP BY file_type
ORDER BY count DESC;

-- 预期结果示例：
-- file_type | count | avg_size_kb | total_size_mb
-- image     | 50    | 650.5       | 31.77
-- document  | 4     | 2500.0      | 9.77


-- 📅 查询4：最近上传的素材（最新10条）
-- ========================================
SELECT 
  file_name,
  category,
  status,
  ROUND(file_size / 1024, 1) as size_kb,
  created_at
FROM assets
ORDER BY created_at DESC
LIMIT 10;


-- ⏱️ 查询5：待审核素材列表
-- ========================================
SELECT 
  id,
  file_name,
  category,
  ROUND(file_size / 1024, 1) as size_kb,
  created_at,
  EXTRACT(DAY FROM (NOW() - created_at)) as days_waiting
FROM assets
WHERE status = 'pending'
ORDER BY created_at ASC;


-- 🔴 查询6：已拒绝素材列表（需要处理）
-- ========================================
SELECT 
  id,
  file_name,
  category,
  status,
  created_at
FROM assets
WHERE status = 'rejected'
ORDER BY created_at DESC;


-- 📏 查询7：文件大小异常检查
-- ========================================
-- 查找过大的图片（>3MB）
SELECT 
  file_name,
  category,
  ROUND(file_size / 1024 / 1024, 2) as size_mb,
  file_url
FROM assets
WHERE file_type = 'image' AND file_size > 3 * 1024 * 1024
ORDER BY file_size DESC;

-- 查找过小的图片（<50KB，可能质量太低）
SELECT 
  file_name,
  category,
  ROUND(file_size / 1024, 1) as size_kb,
  file_url
FROM assets
WHERE file_type = 'image' AND file_size < 50 * 1024
ORDER BY file_size ASC;


-- 🔍 查询8：缺失分类的素材
-- ========================================
SELECT 
  id,
  file_name,
  file_type,
  status,
  created_at
FROM assets
WHERE category IS NULL OR category = 'other'
ORDER BY created_at DESC;


-- 📋 查询9：各分类的已批准素材数量
-- ========================================
SELECT 
  category,
  COUNT(*) as approved_count
FROM assets
WHERE status = 'approved'
GROUP BY category
ORDER BY approved_count DESC;

-- 理想结果（54个素材的目标分布）：
-- category  | approved_count
-- product   | 18
-- factory   | 12
-- material  | 8
-- banner    | 6
-- other     | 8
-- doc       | 2


-- 👤 查询10：按上传者统计
-- ========================================
SELECT 
  uploaded_by,
  COUNT(*) as uploads_count,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_count,
  MIN(created_at) as first_upload,
  MAX(created_at) as last_upload
FROM assets
GROUP BY uploaded_by
ORDER BY uploads_count DESC;


-- 🏆 查询11：素材库健康度评分
-- ========================================
WITH stats AS (
  SELECT 
    COUNT(*) as total,
    COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
    COUNT(CASE WHEN category IS NOT NULL AND category != 'other' THEN 1 END) as categorized,
    COUNT(DISTINCT category) as unique_categories
  FROM assets
)
SELECT 
  total as total_assets,
  approved as approved_assets,
  ROUND(approved * 100.0 / NULLIF(total, 0), 1) as approval_rate,
  categorized as categorized_assets,
  ROUND(categorized * 100.0 / NULLIF(total, 0), 1) as categorization_rate,
  unique_categories,
  CASE 
    WHEN total >= 54 AND approved * 100.0 / NULLIF(total, 0) >= 90 AND unique_categories >= 5 
    THEN '✅ 优秀'
    WHEN total >= 40 AND approved * 100.0 / NULLIF(total, 0) >= 70 AND unique_categories >= 4 
    THEN '✓ 良好'
    WHEN total >= 20 AND approved * 100.0 / NULLIF(total, 0) >= 50 AND unique_categories >= 3 
    THEN '⚠️ 及格'
    ELSE '❌ 需改进'
  END as health_score
FROM stats;

-- 评分标准：
-- ✅ 优秀：≥54个素材，≥90%已批准，≥5个分类
-- ✓ 良好：≥40个素材，≥70%已批准，≥4个分类
-- ⚠️ 及格：≥20个素材，≥50%已批准，≥3个分类
-- ❌ 需改进：低于及格标准


-- 🔗 查询12：素材与占位符关联检查
-- ========================================
-- 检查有多少占位符已经关联了素材
SELECT 
  COUNT(*) as total_placeholders,
  COUNT(CASE WHEN status = 'replaced' THEN 1 END) as replaced_count,
  COUNT(CASE WHEN status = 'missing' THEN 1 END) as missing_count,
  ROUND(COUNT(CASE WHEN status = 'replaced' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0), 1) as replacement_rate
FROM placeholders;

-- 预期结果：
-- total_placeholders | replaced_count | missing_count | replacement_rate
-- 98                 | 45             | 53            | 45.9%


-- 📝 查询13：生成素材清单报告（用于文档）
-- ========================================
SELECT 
  ROW_NUMBER() OVER (PARTITION BY category ORDER BY created_at) as seq,
  category,
  file_name,
  status,
  ROUND(file_size / 1024, 1) as size_kb,
  TO_CHAR(created_at, 'YYYY-MM-DD') as upload_date
FROM assets
ORDER BY 
  CASE category
    WHEN 'banner' THEN 1
    WHEN 'factory' THEN 2
    WHEN 'product' THEN 3
    WHEN 'material' THEN 4
    WHEN 'doc' THEN 5
    ELSE 6
  END,
  created_at;


-- 🧹 查询14：重复文件名检查
-- ========================================
SELECT 
  file_name,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::TEXT, ', ') as asset_ids
FROM assets
GROUP BY file_name
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;


-- 📊 查询15：存储空间使用统计
-- ========================================
SELECT 
  ROUND(SUM(file_size) / 1024 / 1024, 2) as total_storage_mb,
  ROUND(AVG(file_size) / 1024, 1) as avg_file_size_kb,
  MAX(file_size) / 1024 / 1024 as largest_file_mb,
  MIN(file_size) / 1024 as smallest_file_kb
FROM assets;


-- ========================================
-- 🎯 快速诊断命令（一键执行）
-- ========================================
-- 将以下查询结果复制粘贴到项目文档或Slack
SELECT 
  '素材总数' as metric,
  COUNT(*)::TEXT as value
FROM assets
UNION ALL
SELECT 
  '已批准素材',
  COUNT(*)::TEXT
FROM assets WHERE status = 'approved'
UNION ALL
SELECT 
  '待审核素材',
  COUNT(*)::TEXT
FROM assets WHERE status = 'pending'
UNION ALL
SELECT 
  '分类数量',
  COUNT(DISTINCT category)::TEXT
FROM assets
UNION ALL
SELECT 
  '总存储空间(MB)',
  ROUND(SUM(file_size) / 1024 / 1024, 2)::TEXT
FROM assets
UNION ALL
SELECT 
  '平均文件大小(KB)',
  ROUND(AVG(file_size) / 1024, 1)::TEXT
FROM assets;


-- ========================================
-- 💡 使用说明
-- ========================================
/*
在Supabase后台使用方法：
1. 登录 https://supabase.com/dashboard
2. 选择项目 dpitlvjqgoixfozdpkji
3. 左侧菜单 → SQL Editor
4. 复制需要的查询 → 粘贴 → Run
5. 查看结果表格

常用查询组合：
- 日常检查：查询1 + 查询2 + 查询5
- 质量检查：查询7 + 查询8 + 查询14
- 统计报告：查询11 + 查询12 + 查询15
- 问题排查：查询6 + 查询7 + 查询14

快捷键：
- Ctrl/Cmd + Enter: 执行查询
- Ctrl/Cmd + A: 全选
- Ctrl/Cmd + C: 复制结果
*/


-- ========================================
-- 📝 维护记录模板
-- ========================================
/*
素材库检查记录 - 2026-02-04

[ ] 查询1: 素材总数 = ___ 个
[ ] 查询2: 分类完整度 = ____%
[ ] 查询5: 待审核素材 = ___ 个
[ ] 查询11: 健康度评分 = ___

处理动作：
1. _______________
2. _______________
3. _______________

下次检查日期：___________
*/
