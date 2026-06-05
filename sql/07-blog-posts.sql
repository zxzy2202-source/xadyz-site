-- ========================================
-- 博客文章表（后台管理 + 前台展示）
-- SEO / GEO 优化字段
-- ========================================

-- 1. 创建 blog_posts 表
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 内容
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('en', 'ru', 'zh')),
  excerpt TEXT,
  body TEXT,
  category TEXT,
  cover_image_url TEXT,
  read_time TEXT,

  -- 发布
  published_at TIMESTAMP WITH TIME ZONE,
  is_draft BOOLEAN DEFAULT true,

  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  og_image_url TEXT,
  canonical_url TEXT,

  -- GEO（地区/语言定向）
  target_region TEXT,
  hreflang_alternates JSONB,

  UNIQUE(slug, language)
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_language ON blog_posts(language);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_draft ON blog_posts(is_draft);

COMMENT ON TABLE blog_posts IS '博客文章，支持 SEO/GEO 字段，后台管理';
COMMENT ON COLUMN blog_posts.hreflang_alternates IS 'JSON: { "en": "/en/resources/blog-insights/xxx", "ru": "...", "zh": "..." }';
COMMENT ON COLUMN blog_posts.target_region IS '目标地区：如 CIS, EU, Global';

-- 2. 启用 RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 3. 策略：匿名可读已发布文章（前台展示）
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (
    is_draft = false
    AND published_at IS NOT NULL
    AND published_at <= NOW()
  );

-- 4. 策略：认证用户（后台）可读全部
CREATE POLICY "Authenticated can read all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

-- 5. 策略：后台可写（ops 及以上）
CREATE POLICY "Staff can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

CREATE POLICY "Staff can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

CREATE POLICY "Staff can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('admin', 'owner')
  );

-- 6. updated_at 触发器
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

SELECT 'blog_posts table and RLS created ✅' AS status;
