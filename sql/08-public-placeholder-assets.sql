-- ========================================
-- 公开占位符-素材映射（供前台读取）
-- ========================================
-- 允许网站前台读取：已绑定素材的占位符及其图片 URL
-- ========================================

-- 创建公开视图：占位符 + 已绑定素材的 URL
-- 不再限制 approved，所有已绑定的素材都可以在前台显示
CREATE OR REPLACE VIEW public.placeholder_asset_urls AS
SELECT
  p.placeholder_key,
  p.page_path,
  p.section_name,
  p.placeholder_type,
  a.file_url,
  COALESCE(a.title, a.file_name) AS asset_title
FROM public.placeholders p
JOIN public.assets a ON p.asset_id = a.id
WHERE p.status = 'replaced' AND p.asset_id IS NOT NULL;

-- 允许匿名/公开读取此视图
GRANT SELECT ON public.placeholder_asset_urls TO anon;
GRANT SELECT ON public.placeholder_asset_urls TO authenticated;

SELECT 'placeholder_asset_urls 视图已创建，前台可读取' AS status;
