# 🚀 Admin后台快速开始指南

## ✅ 已完成的工作

**前端代码100%完成！** 现在只需要配置Supabase数据库就可以使用。

---

## 📋 5分钟快速启动清单

### Step 1: 访问Supabase控制台 (1分钟)
```
https://supabase.com/dashboard
```
进入你的项目

---

### Step 2: 创建数据表 (2分钟)

点击左侧 **"SQL Editor"** → 点击 **"New query"** → 复制粘贴以下SQL → 点击 **"Run"**

```sql
-- 创建所有表（一次性运行）
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  company_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  lead_type TEXT NOT NULL CHECK (lead_type IN ('tender', 'distributor', 'oem', 'inquiry')),
  lead_level TEXT CHECK (lead_level IN ('A', 'B', 'C')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost')),
  product_interest TEXT,
  estimated_value DECIMAL,
  notes TEXT,
  assigned_to TEXT,
  next_follow_up DATE,
  source TEXT DEFAULT 'website',
  utm_campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  page_url TEXT
);

CREATE TABLE lead_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('note', 'email', 'call', 'meeting', 'status_change')),
  content TEXT NOT NULL,
  created_by TEXT NOT NULL
);

CREATE TABLE lead_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  uploaded_by TEXT NOT NULL
);

CREATE TABLE assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  title TEXT NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('banner', 'factory', 'product', 'material', 'doc', 'other')),
  tags TEXT[] DEFAULT '{}',
  approved BOOLEAN DEFAULT FALSE,
  used_in_pages TEXT[],
  uploaded_by TEXT NOT NULL
);

CREATE TABLE placeholders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  placeholder_type TEXT NOT NULL CHECK (placeholder_type IN ('hero', 'product', 'factory', 'industry', 'banner', 'icon')),
  required_ratio TEXT,
  required_dimensions TEXT,
  status TEXT NOT NULL DEFAULT 'missing' CHECK (status IN ('missing', 'replaced')),
  asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  UNIQUE(page_key, section_key)
);

CREATE TABLE user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'supervisor', 'ops', 'sales', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_assets_approved ON assets(approved);
CREATE INDEX idx_placeholders_status ON placeholders(status);
```

---

### Step 3: 创建Storage Buckets (1分钟)

点击左侧 **"Storage"** → 点击 **"New bucket"** → 创建5个buckets：

| Bucket名称 | Public |
|-----------|--------|
| `assets-factory` | ✅ 勾选Public |
| `assets-products` | ✅ 勾选Public |
| `assets-banners` | ✅ 勾选Public |
| `assets-materials` | ✅ 勾选Public |
| `assets-docs` | ✅ 勾选Public |

---

### Step 4: 创建管理员账号 (1分钟)

#### 4.1 创建用户
点击左侧 **"Authentication"** → **"Users"** → **"Add user"** → 填写：
- Email: `admin@zhixin.com`
- Password: `zhixin2025` （记住这个密码！）
- ✅ 勾选 **"Auto Confirm User"**

#### 4.2 分配admin角色
回到 **"SQL Editor"** → 运行：

```sql
INSERT INTO user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@zhixin.com'),
  'admin'
);
```

---

### Step 5: 插入核心占位符 (可选，1分钟)

如果想立即看到占位符追踪器的效果，运行：

```sql
-- 插入首页和政府投标页的核心占位符
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('home', 'hero', 'hero', '16:9', 'high', '首页主banner - 工厂全景或装柜实拍'),
('home', 'products.thermal', 'product', '1:1', 'high', '热敏纸卷产品图'),
('home', 'products.ncr', 'product', '1:1', 'high', 'NCR无碳纸产品图'),
('home', 'proof.container', 'factory', '4:3', 'high', '装柜实拍照片'),

('government-tenders', 'hero', 'hero', '16:9', 'high', '政府投标专题主banner'),
('government-tenders', 'trust.factory', 'factory', '16:9', 'high', '工厂外景'),
('government-tenders', 'trust.workshop', 'factory', '16:9', 'high', '生产车间'),
('government-tenders', 'trust.container', 'factory', '4:3', 'high', '装柜现场'),
('government-tenders', 'proof.certificate-1', 'banner', '4:3', 'high', '资质证书'),

('manufacturing', 'hero', 'hero', '16:9', 'high', '生产制造主banner'),
('manufacturing', 'factory.exterior', 'factory', '16:9', 'high', '工厂外景'),
('manufacturing', 'workshop.overview', 'factory', '16:9', 'high', '车间全景'),
('manufacturing', 'production.line-1', 'factory', '4:3', 'high', '分切生产线'),
('manufacturing', 'shipping.container-1', 'factory', '4:3', 'high', '装柜现场');
```

（完整的95个占位符列表见 `PLACEHOLDER_LIST.md`）

---

## 🎉 完成！现在测试后台

### 访问登录页
```
https://xadyz.com/admin/login
```

### 登录
- **Email:** `admin@zhixin.com`
- **Password:** `zhixin2025`

### 测试功能
1. ✅ **Dashboard** - 查看统计数据
2. ✅ **Assets** - 上传一张工厂照片测试
3. ✅ **Placeholders** - 查看占位符列表
4. ✅ **Leads** - 查看线索列表（目前是空的）
5. ✅ 测试将Asset绑定到Placeholder

---

## 📱 后台功能说明

### 1. Dashboard（仪表盘）
- 显示总线索数、新线索数、资产数、缺失占位符数
- 快速导航到各个功能模块

### 2. Leads（线索管理）
- **列表页**: 筛选、搜索、快速更新状态和等级
- **详情页**: 查看完整信息、添加跟进记录、上传投标文件
- **状态流转**: new → contacted → qualified → proposal → negotiation → won/lost
- **等级分类**: A（高价值）、B（中等）、C（低价值）

### 3. Assets（素材库）
- **上传**: 支持多文件批量上传
- **分类**: banner/factory/product/material/doc/other
- **审核**: 上传后需要Approve才能用于占位符绑定
- **搜索**: 按标题、文件名、标签搜索

### 4. Placeholders（占位符追踪器）
- **列表**: 显示所有缺失的图片占位符
- **筛选**: 按页面、状态、优先级筛选
- **绑定**: 点击"Bind Asset"从已审核的Assets中选择图片
- **状态**: missing（缺失）→ replaced（已替换）

---

## 👥 团队协作

### 添加新成员

1. **创建账号**: Authentication → Add user
2. **分配角色**: 运行SQL

```sql
INSERT INTO user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = '新成员邮箱'),
  'sales'  -- 或 ops、supervisor等
);
```

### 角色权限说明

| 角色 | 权限 | 适合人员 |
|------|------|----------|
| **admin** | 所有权限 | 系统管理员 |
| **supervisor** | 查看所有leads、分配任�� | 销售主管 |
| **sales** | 查看和更新自己的leads | 销售人员 |
| **ops** | 管理assets和placeholders | 运营/设计人员 |
| **owner** | 只查看dashboard数据 | 老板/高层 |

---

## 🔧 常见问题

### Q: 登录显示"Invalid credentials"
**A:** 检查用户是否在Authentication中创建，且Email Confirmed为true

### Q: 上传文件失败
**A:** 检查Storage buckets是否设置为Public

### Q: Placeholders页面是空的
**A:** 需要运行Step 5的SQL插入占位符数据

### Q: 如何批量上传图片？
**A:** Assets页面支持多文件选择，一次可以上传多张

### Q: 前台页面如何使用已绑定的图片？
**A:** 见下方"前后台集成"部分

---

## 🔗 前后台集成示例

在你的前台组件中使用已绑定的资产：

```typescript
import { supabase } from '@/admin/lib/supabaseClient';

// 获取某个占位符的图片URL
async function getPlaceholderImage(pageKey: string, sectionKey: string) {
  const { data } = await supabase
    .from('placeholders')
    .select(`
      *,
      asset:assets(file_url, title)
    `)
    .eq('page_key', pageKey)
    .eq('section_key', sectionKey)
    .eq('status', 'replaced')
    .single();
  
  // 如果已绑定asset，返回URL，否则返回默认占位图
  return data?.asset?.file_url || '/images/placeholder.jpg';
}

// 使用示例（在组件中）
const [heroImage, setHeroImage] = useState('/images/placeholder.jpg');

useEffect(() => {
  getPlaceholderImage('home', 'hero').then(setHeroImage);
}, []);

// 在JSX中使用
<img src={heroImage} alt="Hero" />
```

---

## 📚 完整文档

- **ADMIN_SETUP.md** - 详细的Supabase配置指南
- **PLACEHOLDER_LIST.md** - 完整的95个占位符清单（含SQL）
- **本文件** - 快速开始指南

---

## 🎯 建议的使用流程

### 第1周：基础设置
1. ✅ 完成Supabase配置（5分钟）
2. ✅ 登录后台测试功能（10分钟）
3. ✅ 添加团队成员账号（5分钟）
4. ✅ 插入完整的占位符数据（见PLACEHOLDER_LIST.md）

### 第2周：素材准备
1. 收集工厂照片（外景、车间、生产线、装柜）
2. 拍摄产品图（热敏纸、标签、NCR）
3. 扫描资质证书
4. 批量上传到Assets库并Approve

### 第3周：替换占位符
1. 优先替换high priority的占位符（约45个）
2. 重点完成：首页、政府投标页、生产制造页
3. 测试前台页面显示效果

### 第4周：正式使用
1. 开始管理真实leads
2. 完成剩余medium/low priority占位符
3. 根据使用反馈优化流程

---

## 🚀 现在开始！

按照上面的5个步骤（总共5分钟），你就可以开始使用后台系统了！

**祝你顺利！** 如有问题，查看详细文档或检查浏览器Console的错误信息。
