# 🔧 数据库字段缺失修复指南

## 问题诊断

**错误信息**: `column leads.lead_type does not exist`

**原因**: 数据库表 `leads` 缺少以下字段：
- ❌ `lead_type` - 线索类型
- ❌ `lead_level` - 线索等级  
- ❌ `product_interest` - 产品兴趣
- ❌ `utm_campaign`, `utm_source`, `utm_medium` - UTM追踪
- ❌ `page_url` - 来源页面URL
- ❌ `next_follow_up` - 下次跟进时间

---

## 🚀 快速修复步骤

### 方式一：通过 Supabase Dashboard（推荐）

#### 1. 登录 Supabase Dashboard
访问: https://supabase.com/dashboard/project/dpitlvjqgoixfozdpkji

#### 2. 进入 SQL Editor
- 点击左侧菜单 **SQL Editor**
- 点击 **New Query**

#### 3. 复制并执行以下 SQL

```sql
-- ========================================
-- 修复 leads 表缺失字段
-- 执行时间: 2026-02-05
-- ========================================

-- 1. 添加 lead_type 字段（线索类型）
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'inquiry' 
CHECK (lead_type IN ('tender', 'distributor', 'oem', 'inquiry', 'contact'));

-- 2. 添加 lead_level 字段（线索等级）
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS lead_level TEXT 
CHECK (lead_level IN ('A', 'B', 'C'));

-- 3. 添加 product_interest 字段
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS product_interest TEXT;

-- 4. 添加 UTM 追踪字段
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
ADD COLUMN IF NOT EXISTS utm_source TEXT,
ADD COLUMN IF NOT EXISTS utm_medium TEXT,
ADD COLUMN IF NOT EXISTS page_url TEXT;

-- 5. 添加下次跟进时间字段
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS next_follow_up TIMESTAMP WITH TIME ZONE;

-- 6. 更新 source 字段约束
ALTER TABLE leads 
DROP CONSTRAINT IF EXISTS leads_source_check;

ALTER TABLE leads 
ADD CONSTRAINT leads_source_check 
CHECK (source IN ('website', 'yandex', 'direct', 'referral', 'contact_form', 'tender_form', 'other'));

-- 7. 创建索引提升查询性能
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON leads(lead_type);
CREATE INDEX IF NOT EXISTS idx_leads_lead_level ON leads(lead_level);
CREATE INDEX IF NOT EXISTS idx_leads_next_follow_up ON leads(next_follow_up);

-- 8. 更新现有数据（如果有）
UPDATE leads 
SET lead_type = 'inquiry' 
WHERE lead_type IS NULL;

-- 9. 添加字段注释
COMMENT ON COLUMN leads.lead_type IS '线索类型: tender=招标, distributor=经销商, oem=OEM合作, inquiry=询价, contact=联系咨询';
COMMENT ON COLUMN leads.lead_level IS '线索等级: A=高优先级, B=中优先级, C=低优先级';
COMMENT ON COLUMN leads.product_interest IS '客户感兴趣的产品';
COMMENT ON COLUMN leads.next_follow_up IS '计划的下次跟进时间';
```

#### 4. 点击 **Run** 按钮执行

✅ 执行成功后，您会看到 "Success. No rows returned"

#### 5. 验证修复

执行以下查询验证字段已添加：

```sql
-- 查看 leads 表结构
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'leads'
ORDER BY ordinal_position;
```

---

### 方式二：使用迁移文件

如果您使用 Supabase CLI：

```bash
# 1. 创建迁移文件
supabase migration new add_missing_leads_fields

# 2. 将上面的 SQL 复制到新创建的迁移文件

# 3. 应用迁移
supabase db push
```

---

## 📋 修复后的完整表结构

修复后，`leads` 表应包含以下所有字段：

```sql
leads (
  -- 基础字段
  id UUID PRIMARY KEY
  created_at TIMESTAMP WITH TIME ZONE
  updated_at TIMESTAMP WITH TIME ZONE
  
  -- 联系信息
  company_name TEXT NOT NULL
  contact_name TEXT
  email TEXT
  phone TEXT
  country TEXT
  
  -- 线索分类 ⭐ 新增
  lead_type TEXT DEFAULT 'inquiry'
  lead_level TEXT
  
  -- 状态和分配
  status TEXT DEFAULT 'new'
  assigned_to UUID
  
  -- 业务信息
  product_interest TEXT ⭐ 新增
  products_interested TEXT[]
  estimated_value DECIMAL(12,2)
  notes TEXT
  
  -- 来源追踪
  source TEXT
  utm_campaign TEXT ⭐ 新增
  utm_source TEXT ⭐ 新增
  utm_medium TEXT ⭐ 新增
  page_url TEXT ⭐ 新增
  
  -- 跟进管理 ⭐ 新增
  next_follow_up TIMESTAMP WITH TIME ZONE
)
```

---

## 🧪 测试修复

### 1. 测试插入新线索

```sql
-- 插入测试线索
INSERT INTO leads (
  company_name,
  contact_name,
  email,
  country,
  lead_type,
  lead_level,
  product_interest,
  status,
  source
) VALUES (
  'Test Company LLC',
  'Ivan Petrov',
  'ivan@test.ru',
  'Russia',
  'tender',
  'A',
  'Thermal Paper Rolls 80mm',
  'new',
  'website'
);

-- 查询刚插入的数据
SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;
```

### 2. 测试后台页面

1. 刷新浏览器: `https://xadyz.com/admin/leads`
2. 应该能看到：
   - ✅ 无错误提示
   - ✅ 可以看到线索列表
   - ✅ 可以使用类型和等级过滤

---

## 🎯 后续建议

### 1. 更新现有表单提交逻辑

确保前台表单提交时包含 `lead_type`：

```typescript
// Contact Form: lead_type = 'contact'
// Tender Form: lead_type = 'tender'

const { data, error } = await supabase
  .from('leads')
  .insert({
    company_name: formData.company,
    contact_name: formData.name,
    email: formData.email,
    phone: formData.phone,
    country: formData.country,
    lead_type: 'contact', // ⭐ 添加这个字段
    product_interest: formData.product,
    notes: formData.message,
    source: 'website',
    page_url: window.location.href
  });
```

### 2. 检查表单提交代码

查找并更新这些文件：
- `/src/app/components/ContactsPage.tsx`
- `/src/app/components/RequestTenderPackPage.tsx`

确保它们提交时包含正确的 `lead_type` 值。

---

## ❓ 常见问题

**Q: 执行 SQL 后仍然报错？**
A: 尝试刷新浏览器缓存或等待几秒钟，数据库需要时间同步。

**Q: 现有数据会丢失吗？**
A: 不会！这些 SQL 只是添加新字段，不会删除或修改现有数据。

**Q: 可以撤销这些更改吗？**
A: 可以，使用以下 SQL 删除新添加的字段：

```sql
ALTER TABLE leads 
DROP COLUMN IF EXISTS lead_type,
DROP COLUMN IF EXISTS lead_level,
DROP COLUMN IF EXISTS product_interest,
DROP COLUMN IF EXISTS utm_campaign,
DROP COLUMN IF EXISTS utm_source,
DROP COLUMN IF EXISTS utm_medium,
DROP COLUMN IF EXISTS page_url,
DROP COLUMN IF EXISTS next_follow_up;
```

---

## 📞 需要帮助？

如果遇到问题：
1. 检查 Supabase 项目是否可以访问
2. 确认您有数据库修改权限
3. 查看 Supabase Dashboard 的 Logs 了解详细错误

---

**最后更新**: 2026-02-05  
**预计修复时间**: 1-2 分钟  
**风险等级**: 低（只添加字段，不修改现有数据）
