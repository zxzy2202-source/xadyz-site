-- ========================================
-- 检查当前后台banner素材数量和详情
-- ========================================
-- 创建时间：2026-02-04
-- 用途：确认banner类别的实际素材数量
-- ========================================

-- 查询1：banner素材总数统计
SELECT 
  '📊 Banner素材统计' as info,
  COUNT(*) as 总数量,
  COUNT(*) FILTER (WHERE status = 'approved') as 已批准,
  COUNT(*) FILTER (WHERE status = 'pending') as 待审核,
  COUNT(*) FILTER (WHERE status = 'rejected') as 已拒绝
FROM assets
WHERE category = 'banner';

-- 查询2：所有banner素材详细列表
SELECT 
  id,
  filename as 文件名,
  category as 分类,
  status as 状态,
  created_at as 创建时间,
  updated_at as 更新时间,
  file_size as 文件大小,
  mime_type as 文件类型
FROM assets
WHERE category = 'banner'
ORDER BY created_at DESC;

-- 查询3：banner素材按状态分组
SELECT 
  status as 状态,
  COUNT(*) as 数量,
  ROUND(AVG(file_size)::numeric / 1024, 2) as 平均大小KB,
  MIN(created_at) as 最早上传,
  MAX(created_at) as 最近上传
FROM assets
WHERE category = 'banner'
GROUP BY status
ORDER BY 
  CASE status
    WHEN 'approved' THEN 1
    WHEN 'pending' THEN 2
    WHEN 'rejected' THEN 3
  END;

-- 查询4：所有分类的素材数量对比
SELECT 
  category as 分类,
  COUNT(*) as 数量,
  COUNT(*) FILTER (WHERE status = 'approved') as 已批准数量,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as 占比百分比
FROM assets
GROUP BY category
ORDER BY COUNT(*) DESC;

-- 查询5：检查是否有重复的banner文件名
SELECT 
  filename as 文件名,
  COUNT(*) as 重复次数,
  string_agg(status::text, ', ') as 状态列表,
  string_agg(id::text, ', ') as ID列表
FROM assets
WHERE category = 'banner'
GROUP BY filename
HAVING COUNT(*) > 1;

-- 查询6：最近上传的banner（最新10个）
SELECT 
  filename as 文件名,
  status as 状态,
  created_at as 上传时间,
  file_size as 文件大小,
  CASE 
    WHEN created_at > NOW() - INTERVAL '1 day' THEN '今天'
    WHEN created_at > NOW() - INTERVAL '2 days' THEN '昨天'
    WHEN created_at > NOW() - INTERVAL '7 days' THEN '本周'
    ELSE '更早'
  END as 上传时段
FROM assets
WHERE category = 'banner'
ORDER BY created_at DESC
LIMIT 10;

-- 查询7：banner文件大小分析
SELECT 
  '文件大小分析' as 指标,
  COUNT(*) as 文件数量,
  ROUND(MIN(file_size)::numeric / 1024, 2) as 最小KB,
  ROUND(MAX(file_size)::numeric / 1024, 2) as 最大KB,
  ROUND(AVG(file_size)::numeric / 1024, 2) as 平均KB,
  ROUND(SUM(file_size)::numeric / 1024 / 1024, 2) as 总大小MB
FROM assets
WHERE category = 'banner';

-- ========================================
-- 使用说明：
-- 1. 复制整个SQL到Supabase SQL Editor
-- 2. 点击Run运行
-- 3. 查看7个查询结果
-- 
-- 重点关注：
-- - 查询1：确认banner总数和状态分布
-- - 查询2：查看所有banner文件列表
-- - 查询6：确认昨天上传了哪些banner
-- ========================================
