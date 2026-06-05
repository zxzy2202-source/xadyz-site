# Admin Panel Setup Guide - 志信纸业 B2B后台系统

## ✅ 已完成的工作

### 1. 前端代码（100%完成）
- ✅ Supabase客户端配置
- ✅ 认证系统（登录/登出）
- ✅ Admin布局和导航
- ✅ Dashboard页面（统计数据）
- ✅ Leads管理（列表 + 详情）
- ✅ Assets素材库
- ✅ Placeholders占位符追踪器
- ✅ 路由配置完成

### 2. 功能特性
- ✅ 基于角色的权限控制
- ✅ 实时数据加载
- ✅ 文件上传到Supabase Storage
- ✅ 筛选和搜索功能
- ✅ 响应式设计（移动端适配）

---

## 📋 下一步：配置Supabase数据库

你需要在Supabase控制台手动创建以下数据库表和Storage buckets。

### 访问Supabase控制台
1. 打开浏览器访问：https://supabase.com/dashboard
2. 进入你的项目
3. 点击左侧菜单的"Table Editor"

---

## 📊 Step 1: 创建数据表

### 1.1 创建 `leads` 表

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Contact info
  company_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  
  -- Lead classification
  lead_type TEXT NOT NULL CHECK (lead_type IN ('tender', 'distributor', 'oem', 'inquiry')),
  lead_level TEXT CHECK (lead_level IN ('A', 'B', 'C')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost')),
  
  -- Business details
  product_interest TEXT,
  estimated_value DECIMAL,
  notes TEXT,
  
  -- Assignment
  assigned_to TEXT,
  next_follow_up DATE,
  
  -- Source tracking
  source TEXT DEFAULT 'website',
  utm_campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  page_url TEXT
);

-- Add indexes for better performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_type ON leads(lead_type);
CREATE INDEX idx_leads_country ON leads(country);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
```

### 1.2 创建 `lead_activity` 表

```sql
CREATE TABLE lead_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('note', 'email', 'call', 'meeting', 'status_change')),
  content TEXT NOT NULL,
  created_by TEXT NOT NULL
);

CREATE INDEX idx_lead_activity_lead_id ON lead_activity(lead_id);
CREATE INDEX idx_lead_activity_created_at ON lead_activity(created_at DESC);
```

### 1.3 创建 `lead_files` 表

```sql
CREATE TABLE lead_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  uploaded_by TEXT NOT NULL
);

CREATE INDEX idx_lead_files_lead_id ON lead_files(lead_id);
```

### 1.4 创建 `assets` 表

```sql
CREATE TABLE assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- File info
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  
  -- Metadata
  title TEXT NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('banner', 'factory', 'product', 'material', 'doc', 'other')),
  tags TEXT[] DEFAULT '{}',
  approved BOOLEAN DEFAULT FALSE,
  
  -- Usage tracking
  used_in_pages TEXT[],
  uploaded_by TEXT NOT NULL
);

CREATE INDEX idx_assets_type ON assets(asset_type);
CREATE INDEX idx_assets_approved ON assets(approved);
CREATE INDEX idx_assets_created_at ON assets(created_at DESC);
```

### 1.5 创建 `placeholders` 表

```sql
CREATE TABLE placeholders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Location
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  
  -- Requirements
  placeholder_type TEXT NOT NULL CHECK (placeholder_type IN ('hero', 'product', 'factory', 'industry', 'banner', 'icon')),
  required_ratio TEXT,
  required_dimensions TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'missing' CHECK (status IN ('missing', 'replaced')),
  asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  
  -- Context
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  
  UNIQUE(page_key, section_key)
);

CREATE INDEX idx_placeholders_page_key ON placeholders(page_key);
CREATE INDEX idx_placeholders_status ON placeholders(status);
CREATE INDEX idx_placeholders_priority ON placeholders(priority);
```

### 1.6 创建 `evidence_tags` 表（证据标签）

用于标记素材的证明属性（如真实工厂照、生产线、装柜实拍等），供 Evidence Tags 页面使用：

```sql
CREATE TABLE evidence_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  tag_key TEXT NOT NULL UNIQUE,
  tag_label TEXT NOT NULL,
  description TEXT
);

CREATE INDEX idx_evidence_tags_tag_key ON evidence_tags(tag_key);
```

若使用 `DATABASE_MIGRATION.sql` 创建的 `assets` 表，需添加 `evidence_tags` 列：

```sql
-- 为 assets 表添加证据标签列（若尚未存在）
ALTER TABLE assets ADD COLUMN IF NOT EXISTS evidence_tags TEXT[] DEFAULT '{}';
CREATE INDEX IF NOT EXISTS idx_assets_evidence_tags_gin ON assets USING gin(evidence_tags);
```

---

### 1.7 创建 `user_roles` 表

```sql
CREATE TABLE user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'supervisor', 'ops', 'sales', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_roles_role ON user_roles(role);
```

---

## 🗂️ Step 2: 创建Storage Buckets

在Supabase控制台点击左侧"Storage"菜单，创建以下buckets：

### 2.1 创建buckets
| Bucket 名称 | 用途 |
|-------------|------|
| `assets-banners` | 存放 banner 图片 |
| `assets-factory` | 存放工厂照片 |
| `assets-products` | 存放产品图片 |
| `assets-materials` | 存放原材料图片 |
| `assets-docs` | **素材库文档 + 线索附件**（线索详情页上传的 PDF/图片等） |

> ⚠️ **重要**：`assets-docs` 同时被素材库和线索详情页使用，请务必创建，否则线索附件上传会失败。

### 2.2 设置 bucket 为公开（public）
对于每个 bucket，点击设置 → 勾选「Public bucket」，以便前台可展示图片和文档链接。

### 2.3 Storage 权限策略（可选，推荐）

若使用 `DATABASE_MIGRATION.sql`，其中已包含 Storage RLS 策略。若只按本指南手动建表，可在 Supabase SQL Editor 中运行以下策略，实现基于角色的上传/读取权限：

```sql
-- 辅助函数：判断是否为素材 bucket
CREATE OR REPLACE FUNCTION public.is_asset_bucket(bucket text)
RETURNS boolean LANGUAGE sql STABLE AS $$
  SELECT bucket IN (
    'assets-banners','assets-factory','assets-products','assets-materials','assets-docs'
  );
$$;

-- 公开读取（图片、文档链接可被前台访问）
DROP POLICY IF EXISTS "storage_public_read_assets" ON storage.objects;
CREATE POLICY "storage_public_read_assets"
ON storage.objects FOR SELECT TO public
USING (public.is_asset_bucket(bucket_id));

-- 已认证用户（ops/supervisor/admin）可上传
-- 需配合 user_roles 表及 current_role() 函数使用
-- 若无 RLS，仅设置 bucket 为 Public 即可实现上传
```

若暂时不使用 RLS，仅将 bucket 设为 Public 即可满足基本上传和访问需求。

---

## 👤 Step 3: 创建测试用户

### 3.1 在Supabase控制台创建用户
1. 点击左侧"Authentication"
2. 点击"Users" tab
3. 点击"Add user"
4. 创建管理员账号：
   - Email: `admin@zhixin.com`
   - Password: `zhixin2025` （记住这个密码）
   - 勾选"Auto Confirm User"

### 3.2 分配角色
在SQL Editor中运行：

```sql
-- 给管理员分配admin角色
INSERT INTO user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@zhixin.com'),
  'admin'
);
```

---

## 📝 Step 4: 插入示例占位符数据

这是基于你的18个页面的核心占位符清单：

```sql
-- 首页占位符
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('home', 'hero', 'hero', '16:9', 'high', '首页主banner - 工厂全景或装柜实拍'),
('home', 'products.thermal', 'product', '4:3', 'high', '热敏纸系列产品图'),
('home', 'products.ncr', 'product', '4:3', 'high', 'NCR无碳纸产品图'),
('home', 'factory.overview', 'factory', '16:9', 'medium', '工厂车间全景'),
('home', 'proof.container', 'factory', '4:3', 'high', '集装箱装柜实拍');

-- 产品页占位符
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('products', 'hero', 'hero', '16:9', 'high', '产品中心banner'),
('thermal-paper-rolls', 'hero', 'hero', '16:9', 'high', '热敏纸卷banner'),
('thermal-paper-rolls', 'product.showcase', 'product', '1:1', 'high', '热敏纸卷产品展示'),
('thermal-labels', 'hero', 'hero', '16:9', 'high', '热敏标签banner'),
('thermal-labels', 'product.showcase', 'product', '1:1', 'high', '热敏标签产品展示'),
('ncr-forms', 'hero', 'hero', '16:9', 'high', 'NCR表格banner'),
('ncr-forms', 'product.showcase', 'product', '1:1', 'high', 'NCR表格产品展示');

-- 原材料供应页占位符
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('material-supply', 'hero', 'hero', '16:9', 'high', '原材料供应banner'),
('thermal-jumbo-rolls', 'hero', 'hero', '16:9', 'medium', '热敏jumbo大卷'),
('self-adhesive-jumbo-rolls', 'hero', 'hero', '16:9', 'medium', '不干胶jumbo大卷'),
('ncr-jumbo-rolls', 'hero', 'hero', '16:9', 'medium', 'NCR jumbo大卷');

-- 应用场景页占位符
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('applications', 'hero', 'hero', '16:9', 'medium', '应用场景overview banner'),
('government-tenders', 'hero', 'hero', '16:9', 'high', '政府投标专题banner'),
('government-tenders', 'proof.certificates', 'banner', '4:3', 'high', '资质证书展示');

-- 生产制造页占位符
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('manufacturing', 'hero', 'hero', '16:9', 'high', '生产制造banner - 工厂外景'),
('manufacturing', 'factory.workshop', 'factory', '16:9', 'high', '车间环境'),
('manufacturing', 'production.line1', 'factory', '4:3', 'medium', '分切生产线'),
('manufacturing', 'production.line2', 'factory', '4:3', 'medium', '复卷生产线'),
('manufacturing', 'quality.lab', 'factory', '4:3', 'medium', '质检实验室'),
('manufacturing', 'shipping.container', 'factory', '4:3', 'high', '装柜现场');
```

---

## 🚀 Step 5: 测试后台系统

### 5.1 访问登录页
```
https://xadyz.com/admin/login
```

### 5.2 使用测试账号登录
- Email: `admin@zhixin.com`
- Password: `zhixin2025`

### 5.3 测试功能清单
- [ ] Dashboard显示统计数据
- [ ] Leads页面可以查看（虽然是空的）
- [ ] Assets页面可以上传图片
- [ ] Placeholders页面显示所有占位符
- [ ] 可以将assets绑定到placeholders

---

## 📌 重要说明

### 关于RLS（Row Level Security）
**第一阶段：暂时关闭RLS**
- 为了快速测试，暂时不要启用RLS
- 等功能跑通后，再逐步配置RLS策略

### 关于前端集成
**如何在前台页面使用已绑定的资产？**

在你的前台组件中：

```typescript
import { supabase } from '@/admin/lib/supabaseClient';

// 获取某个占位符绑定的图片
async function getPlaceholderImage(pageKey: string, sectionKey: string) {
  const { data } = await supabase
    .from('placeholders')
    .select(`
      *,
      asset:assets(*)
    `)
    .eq('page_key', pageKey)
    .eq('section_key', sectionKey)
    .eq('status', 'replaced')
    .single();
  
  return data?.asset?.file_url || '/placeholder.jpg';
}

// 使用示例
const heroImage = await getPlaceholderImage('home', 'hero');
```

---

## 🎯 接下来做什么？

### 阶段1：数据库设置（今天）
1. ✅ 运行所有SQL创建表
2. ✅ 创建Storage buckets
3. ✅ 创建测试用户
4. ✅ 插入占位符数据

### 阶段2：测试和完善（明天）
1. 登录后台测试所有功能
2. 上传真实的工厂照片到Assets
3. 将Assets绑定到Placeholders
4. 测试前台页面是否能加载绑定的图片

### 阶段3：实际使用（后天开始）
1. 创建真实的team成员账号
2. 分配不同的角色权限
3. 开始管理真实的leads
4. 逐步替换所有占位符

---

## 🆘 常见问题

### Q1: 登录时显示"Invalid login credentials"
A: 检查Supabase控制台，确保用户已创建且"Email Confirmed"为true

### Q2: 上传文件失败
A: 检查 Storage buckets 是否设置为 Public；线索详情页上传附件需确保 `assets-docs` bucket 已创建

### Q3: Placeholders页面是空的
A: 需要手动运行Step 4的SQL插入占位符数据

### Q4: 如何添加新的team成员？
A: 
1. 在Supabase Authentication创建新用户
2. 在user_roles表中分配角色
3. 角色说明：
   - `admin`: 全部权限
   - `supervisor`: 可以管理leads和分配任务
   - `ops`: 可以管理assets和placeholders
   - `sales`: 只能查看和更新自己的leads
   - `owner`: 只能查看dashboard数据

---

## 📧 需要帮助？

如果遇到问题，检查浏览器Console是否有错误信息，通常会显示具体的Supabase错误。

**祝你顺利完成后台系统配置！** 🎉
