# Supabase 数据库配置指南

## 📋 配置概览

完成以下5步配置（预计5-10分钟）：

1. 创建6个数据表
2. 创建5个Storage buckets  
3. 设置RLS策略
4. 创建管理员账号
5. 测试登录

---

## 🔧 步骤1: 创建数据表

登录 [Supabase Dashboard](https://supabase.com/dashboard) → 选择你的项目 → SQL Editor → 新建查询

### 复制并执行以下SQL脚本：

```sql
-- ========================================
-- 志信纸业 B2B Admin 数据表配置
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

-- 6. 占位符绑定表
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
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX idx_lead_activities_created_at ON lead_activities(created_at DESC);
CREATE INDEX idx_assets_status ON assets(status);
CREATE INDEX idx_assets_category ON assets(category);
CREATE INDEX idx_placeholder_bindings_key ON placeholder_bindings(placeholder_key);

-- 更新 updated_at 触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_roles_updated_at BEFORE UPDATE ON user_roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_placeholder_bindings_updated_at BEFORE UPDATE ON placeholder_bindings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 🔒 步骤2: 设置RLS（Row Level Security）策略

继续在SQL Editor中执行：

```sql
-- ========================================
-- RLS 策略配置
-- ========================================

-- 启用RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE placeholder_bindings ENABLE ROW LEVEL SECURITY;

-- user_roles: 只有admin可以查看所有角色
CREATE POLICY "Users can view own role" ON user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin can view all roles" ON user_roles FOR SELECT USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- leads: 按角色控制访问
CREATE POLICY "Users can view assigned leads" ON leads FOR SELECT USING (
  assigned_to = auth.uid() OR
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'supervisor'))
);

CREATE POLICY "Users can update assigned leads" ON leads FOR UPDATE USING (
  assigned_to = auth.uid() OR
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'supervisor'))
);

CREATE POLICY "Admin can insert leads" ON leads FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'supervisor'))
);

-- lead_activities: 可以查看所属lead的活动
CREATE POLICY "Users can view lead activities" ON lead_activities FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM leads 
    WHERE leads.id = lead_activities.lead_id 
    AND (leads.assigned_to = auth.uid() OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'supervisor')))
  )
);

CREATE POLICY "Users can insert lead activities" ON lead_activities FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM leads 
    WHERE leads.id = lead_activities.lead_id 
    AND (leads.assigned_to = auth.uid() OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'supervisor')))
  )
);

-- lead_files: 同lead_activities
CREATE POLICY "Users can view lead files" ON lead_files FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM leads 
    WHERE leads.id = lead_files.lead_id 
    AND (leads.assigned_to = auth.uid() OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'supervisor')))
  )
);

-- assets: ops和admin可以管理
CREATE POLICY "Users can view approved assets" ON assets FOR SELECT USING (
  status = 'approved' OR
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'ops'))
);

CREATE POLICY "Ops can manage assets" ON assets FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'ops'))
);

-- placeholder_bindings: ops和admin可以管理
CREATE POLICY "Users can view placeholder bindings" ON placeholder_bindings FOR SELECT USING (true);

CREATE POLICY "Ops can manage placeholder bindings" ON placeholder_bindings FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'ops'))
);
```

---

## 📦 步骤3: 创建Storage Buckets

在 Supabase Dashboard → Storage → 点击 "New bucket"

创建以下5个buckets（**全部设置为Private**）：

1. **lead-files** - 存储线索相关文件（合同、报价单等）
2. **product-images** - 产品图片
3. **company-images** - 公司宣传图片
4. **certificates** - 证书文件
5. **other-assets** - 其他素材

### 自动创建脚本（可选）

或者在SQL Editor执行：

```sql
-- 注意：这个需要在Supabase Dashboard的Storage界面手动创建
-- 以下是bucket配置参考

-- Bucket配置：
-- Name: lead-files, Public: false, File size limit: 50MB
-- Name: product-images, Public: false, File size limit: 20MB
-- Name: company-images, Public: false, File size limit: 20MB
-- Name: certificates, Public: false, File size limit: 10MB
-- Name: other-assets, Public: false, File size limit: 50MB
```

### Storage RLS策略

在SQL Editor执行：

```sql
-- lead-files bucket policies
CREATE POLICY "Users can upload to lead-files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'lead-files' AND
  auth.uid() IS NOT NULL
);

CREATE POLICY "Users can view lead-files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'lead-files' AND
  auth.uid() IS NOT NULL
);

-- Assets buckets policies (product-images, company-images, certificates, other-assets)
CREATE POLICY "Ops can upload assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id IN ('product-images', 'company-images', 'certificates', 'other-assets') AND
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'ops'))
);

CREATE POLICY "All authenticated users can view assets"
ON storage.objects FOR SELECT
USING (
  bucket_id IN ('product-images', 'company-images', 'certificates', 'other-assets') AND
  auth.uid() IS NOT NULL
);
```

---

## 👤 步骤4: 创建管理员账号

在 Supabase Dashboard → Authentication → Users → Add user (通过email)

### 方法A: 通过Dashboard创建（推荐）

1. 点击 "Add user" → "Create new user"
2. 填写信息：
   - Email: `admin@zhixin.com`
   - Password: `zhixin2025`
   - ✅ Auto Confirm User（勾选这个）

### 方法B: 通过SQL创建

在SQL Editor执行：

```sql
-- 注意：这个需要用Service Role Key执行，建议使用Dashboard方式

-- 创建管理员账号后，需要添加角色
-- 先获取刚创建用户的UUID（在Authentication > Users中查看）
-- 然后执行：

INSERT INTO user_roles (user_id, role)
VALUES ('你的用户UUID', 'admin');

-- 例如：
-- INSERT INTO user_roles (user_id, role)
-- VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin');
```

### 分配管理员角色

创建用户后，在SQL Editor执行（替换USER_UUID为实际UUID）：

```sql
-- 查看刚创建的用户ID
SELECT id, email FROM auth.users WHERE email = 'admin@zhixin.com';

-- 复制上面的UUID，然后执行：
INSERT INTO user_roles (user_id, role)
VALUES ('替换为实际的UUID', 'admin');
```

---

## 🧪 步骤5: 测试登录

### 5.1 环境变量配置

确保你的 `/src/admin/lib/supabaseClient.ts` 配置正确：

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

确保环境变量已设置（在Vercel/本地开发）：
- `VITE_SUPABASE_URL`: 你的Supabase项目URL
- `VITE_SUPABASE_ANON_KEY`: 你的Supabase anon public key

### 5.2 访问登录页面

访问：https://xadyz.com/admin/login

使用以下凭据登录：
- Email: `admin@zhixin.com`
- Password: `zhixin2025`

### 5.3 验证功能

登录成功后应该能看到：
- ✅ Dashboard页面
- ✅ 左侧导航栏（Leads, Assets, Placeholders等）
- ✅ 用户信息显示（右下角）
- ✅ 退出按钮

---

## 🎯 初始数据（可选）

如果需要添加测试数据：

```sql
-- 添加测试线索
INSERT INTO leads (company_name, contact_name, email, phone, country, source, status, products_interested, estimated_value, notes)
VALUES 
  ('俄罗斯纸业公司', 'Ivan Petrov', 'ivan@example.ru', '+7-xxx-xxx-xxxx', 'Russia', 'website', 'new', ARRAY['A4复印纸', '牛皮纸'], 50000.00, '通过官网联系表单提交'),
  ('莫斯科进出口', 'Maria Ivanova', 'maria@example.ru', '+7-xxx-xxx-xxxx', 'Russia', 'yandex', 'contacted', ARRAY['工业用纸'], 80000.00, 'Yandex广告来源，已电话联系'),
  ('哈萨克斯坦贸易', 'Alibek Nurlan', 'alibek@example.kz', '+7-xxx-xxx-xxxx', 'Kazakhstan', 'referral', 'qualified', ARRAY['包装纸'], 120000.00, '老客户推荐');

-- 添加95个占位符记录
INSERT INTO placeholder_bindings (placeholder_key, page_path, element_name)
SELECT 
  'placeholder_' || generate_series(1, 95) AS placeholder_key,
  CASE 
    WHEN generate_series(1, 95) % 6 = 0 THEN '/products'
    WHEN generate_series(1, 95) % 6 = 1 THEN '/about'
    WHEN generate_series(1, 95) % 6 = 2 THEN '/contact'
    WHEN generate_series(1, 95) % 6 = 3 THEN '/'
    WHEN generate_series(1, 95) % 6 = 4 THEN '/certificates'
    ELSE '/solutions'
  END AS page_path,
  'Element ' || generate_series(1, 95) AS element_name;
```

---

## 📚 5大角色权限说明

| 角色 | 权限 | 说明 |
|------|------|------|
| **owner** | 查看Dashboard、Analytics | 老板视角，只看数据 |
| **admin** | 全部权限 | 系统管理员 |
| **supervisor** | 管理所有线索、分配线索、团队管理 | 销售主管 |
| **ops** | 管理素材库、占位符、审核素材 | 运营人员 |
| **sales** | 查看自己的线索、更新线索、添加备注 | 销售人员 |

---

## ❓ 常见问题

### Q1: 登录时提示"Invalid credentials"
- 确认用户已创建并Auto Confirm
- 确认已在user_roles表中添加角色
- 检查Supabase URL和Key是否正确

### Q2: Storage上传失败
- 确认bucket已创建且设为Private
- 确认RLS策略已设置
- 检查文件大小是否超限

### Q3: 无法查看某些数据
- 检查用户角色是否正确
- 确认RLS策略已正确设置
- 使用Service Role Key在Dashboard测试SQL查询

---

## 🎉 配置完成！

完成以上步骤后，你就拥有了一个完整的B2B后台管理系统：

✅ 线索管理CRM  
✅ 素材库管理  
✅ 95个占位符追踪  
✅ 5级角色权限  
✅ 文件上传存储  
✅ 活动记录追踪

开始使用吧！🚀
