-- ========================================
-- 修复缺失列和表 - 解决后台报错
-- ========================================
-- 错误1: column leads.lead_type does not exist
-- 错误2: column assets.type does not exist
-- 错误3: Could not find the table 'public.evidence_tags'
-- ========================================

-- 1. 修复 leads 表：添加 lead_type
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'inquiry';

-- 更新现有数据（必须在添加约束前）
UPDATE leads SET lead_type = 'inquiry' WHERE lead_type IS NULL;

-- 允许的值（若约束已存在可跳过）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_lead_type_check'
  ) THEN
    ALTER TABLE leads ADD CONSTRAINT leads_lead_type_check 
    CHECK (lead_type IN ('tender', 'distributor', 'oem', 'inquiry', 'contact'));
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 2. 修复 leads 表：添加 lead_level（若缺失）
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS lead_level TEXT;

-- 3. 修复 assets 表：添加缺失列
-- 若使用旧 schema（file_name），补充 title
ALTER TABLE assets ADD COLUMN IF NOT EXISTS title TEXT;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='assets' AND column_name='file_name') THEN
    UPDATE assets SET title = COALESCE(NULLIF(title,''), file_name) WHERE title IS NULL OR title = '';
  ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='assets' AND column_name='file_url') THEN
    UPDATE assets SET title = COALESCE(NULLIF(title,''), file_url) WHERE title IS NULL OR title = '';
  END IF;
END $$;
-- 添加 type 列
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'product';

-- 为 type 设置允许值（若不存在 constraints）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'assets_type_check'
  ) THEN
    ALTER TABLE assets ADD CONSTRAINT assets_type_check 
    CHECK (type IN ('banner','factory','product','material','qc','packaging','container','document'));
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 将 type 为空的记录设为默认值
UPDATE assets SET type = 'product' WHERE type IS NULL OR type = '';

-- 4. 修复 assets 表：添加 approved 列（若缺失）
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT false;

-- 从 status 映射到 approved（仅当 status 列存在时）
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema='public' AND table_name='assets' AND column_name='status'
  ) THEN
    UPDATE assets SET approved = (status = 'approved') WHERE status IS NOT NULL;
  END IF;
END $$;

-- 5. 修复 assets 表：添加 notes、usage_pages、evidence_tags 列
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS usage_pages TEXT[] DEFAULT '{}';
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS evidence_tags TEXT[] DEFAULT '{}';

-- 6. 创建 evidence_tags 表
CREATE TABLE IF NOT EXISTS evidence_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tag_key TEXT NOT NULL UNIQUE,
  tag_label TEXT NOT NULL,
  description TEXT NULL
);

CREATE INDEX IF NOT EXISTS idx_evidence_tags_tag_key ON evidence_tags(tag_key);

-- 7. 启用 RLS 并添加策略（若 evidence_tags 表是新创建的）
ALTER TABLE evidence_tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "evidence_tags_select_authenticated" ON evidence_tags;
CREATE POLICY "evidence_tags_select_authenticated"
ON evidence_tags FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "evidence_tags_insert_ops" ON evidence_tags;
CREATE POLICY "evidence_tags_insert_ops"
ON evidence_tags FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "evidence_tags_delete_admin" ON evidence_tags;
CREATE POLICY "evidence_tags_delete_admin"
ON evidence_tags FOR DELETE TO authenticated USING (true);

-- 8. 索引
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON leads(lead_type);
CREATE INDEX IF NOT EXISTS idx_assets_type ON assets(type);

-- 完成
SELECT '修复完成！请刷新后台页面。' AS status;
