-- ========================================
-- 博客 AI + 人工微调字段
-- ========================================

ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS ai_generated BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS human_verified BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS content_score INTEGER NOT NULL DEFAULT 0;
