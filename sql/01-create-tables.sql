-- ========================================
-- 志信纸业 B2B Admin - 数据表创建脚本
-- ========================================

-- 1. 用户角色表
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'supervisor', 'ops', 'sales')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. 线索表
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  source TEXT CHECK (source IN ('website', 'yandex', 'direct', 'referral', 'other')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost')),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  products_interested TEXT[],
  estimated_value DECIMAL(12,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 线索活动记录表
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('note', 'email', 'call', 'meeting', 'status_change', 'assignment')),
  content TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 线索文件表
CREATE TABLE IF NOT EXISTS lead_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 素材库表
CREATE TABLE IF NOT EXISTS assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video', 'document', 'other')),
  file_url TEXT NOT NULL,
  file_size INTEGER,
  category TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 占位符表 (存储网站上所有需要替换的占位符)
CREATE TABLE IF NOT EXISTS placeholders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  placeholder_key TEXT NOT NULL UNIQUE,
  page_path TEXT NOT NULL,
  section_name TEXT,
  element_description TEXT,
  placeholder_type TEXT CHECK (placeholder_type IN ('hero', 'product', 'factory', 'banner', 'icon', 'other')),
  required_dimensions TEXT,
  status TEXT DEFAULT 'missing' CHECK (status IN ('missing', 'replaced')),
  asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 占位符绑定表 (历史绑定记录，可选)
CREATE TABLE IF NOT EXISTS placeholder_bindings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  placeholder_key TEXT NOT NULL UNIQUE,
  asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  page_path TEXT NOT NULL,
  element_name TEXT,
  last_updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提升查询性能
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created_at ON lead_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
CREATE INDEX IF NOT EXISTS idx_assets_category ON assets(category);
CREATE INDEX IF NOT EXISTS idx_placeholders_status ON placeholders(status);
CREATE INDEX IF NOT EXISTS idx_placeholders_page_path ON placeholders(page_path);
CREATE INDEX IF NOT EXISTS idx_placeholder_bindings_key ON placeholder_bindings(placeholder_key);

-- 更新 updated_at 触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_user_roles_updated_at ON user_roles;
CREATE TRIGGER update_user_roles_updated_at BEFORE UPDATE ON user_roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_assets_updated_at ON assets;
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_placeholders_updated_at ON placeholders;
CREATE TRIGGER update_placeholders_updated_at BEFORE UPDATE ON placeholders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_placeholder_bindings_updated_at ON placeholder_bindings;
CREATE TRIGGER update_placeholder_bindings_updated_at BEFORE UPDATE ON placeholder_bindings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 显示创建成功消息
SELECT 'Tables created successfully! ✅' AS status;