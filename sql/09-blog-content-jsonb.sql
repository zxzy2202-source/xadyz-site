-- ========================================
-- 博客 content 结构化 JSONB
-- 升级 posts 正文为 JSON 结构，支持模块化编辑
-- ========================================

-- 添加 content 列（保留 body 用于兼容 / 降级）
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN blog_posts.content IS '结构化正文：hero/problem/solution/useCasesAndProcess/comparisonFaqCta';
