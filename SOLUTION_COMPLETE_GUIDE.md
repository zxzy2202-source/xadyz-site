# 🎯 问题解决方案 - 线索管理系统错误修复

## 📌 问题概述

**错误截图显示**: `column leads.lead_type does not exist`

**影响范围**: 
- ❌ 后台无法加载线索列表
- ❌ 无法查看客户留言
- ❌ 过滤功能失效

---

## 🔍 根本原因

数据库表 `leads` 缺少代码中使用的字段。

### 代码期望的字段（TypeScript接口）
```typescript
interface Lead {
  lead_type: 'tender' | 'distributor' | 'oem' | 'inquiry';  // ❌ 缺失
  lead_level: 'A' | 'B' | 'C';                              // ❌ 缺失
  product_interest: string;                                  // ❌ 缺失
  utm_campaign, utm_source, utm_medium, page_url;           // ❌ 缺失
  next_follow_up: timestamp;                                 // ❌ 缺失
  // ... 其他字段存在
}
```

### 数据库实际字段（SQL表）
```sql
CREATE TABLE leads (
  id, created_at, updated_at,
  company_name, contact_name, email, phone, country,
  source, status, assigned_to,
  products_interested,  -- ⚠️ 注意是复数，数组类型
  estimated_value, notes
  -- ❌ 缺少 lead_type, lead_level, product_interest 等字段
);
```

---

## ✅ 解决方案

### 步骤 1️⃣: 修复数据库（必需）

#### 选项 A: Supabase Dashboard（推荐）

1. **登录 Supabase**
   - 访问: https://supabase.com/dashboard/project/dpitlvjqgoixfozdpkji
   - 使用您的 Supabase 账号登录

2. **打开 SQL Editor**
   - 左侧菜单 → **SQL Editor**
   - 点击 **New Query**

3. **复制并执行以下 SQL**

```sql
-- ========================================
-- 修复 leads 表 - 添加缺失字段
-- 日期: 2026-02-05
-- ========================================

BEGIN;

-- 1. 添加线索类型字段
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'inquiry' 
CHECK (lead_type IN ('tender', 'distributor', 'oem', 'inquiry', 'contact'));

-- 2. 添加线索等级字段
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS lead_level TEXT 
CHECK (lead_level IN ('A', 'B', 'C'));

-- 3. 添加产品兴趣字段（单个文本）
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS product_interest TEXT;

-- 4. 添加 UTM 追踪字段
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
ADD COLUMN IF NOT EXISTS utm_source TEXT,
ADD COLUMN IF NOT EXISTS utm_medium TEXT,
ADD COLUMN IF NOT EXISTS page_url TEXT;

-- 5. 添加下次跟进时间
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS next_follow_up TIMESTAMP WITH TIME ZONE;

-- 6. 更新 source 约束（添加新选项）
ALTER TABLE leads 
DROP CONSTRAINT IF EXISTS leads_source_check;

ALTER TABLE leads 
ADD CONSTRAINT leads_source_check 
CHECK (source IN ('website', 'yandex', 'direct', 'referral', 'contact_form', 'tender_form', 'other'));

-- 7. 创建索引提升性能
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON leads(lead_type);
CREATE INDEX IF NOT EXISTS idx_leads_lead_level ON leads(lead_level);
CREATE INDEX IF NOT EXISTS idx_leads_next_follow_up ON leads(next_follow_up);

-- 8. 更新现有数据（设置默认值）
UPDATE leads 
SET lead_type = 'inquiry' 
WHERE lead_type IS NULL;

-- 9. 添加字段说明
COMMENT ON COLUMN leads.lead_type IS '线索类型: tender=招标, distributor=经销商, oem=OEM, inquiry=询价, contact=咨询';
COMMENT ON COLUMN leads.lead_level IS '线索等级: A=高优先级, B=中优先级, C=低优先级';
COMMENT ON COLUMN leads.product_interest IS '客户感兴趣的产品（单个）';
COMMENT ON COLUMN leads.next_follow_up IS '计划的下次跟进时间';

COMMIT;
```

4. **点击 Run 执行**

   ✅ 成功标志: 显示 "Success. No rows returned"

5. **验证修复**

```sql
-- 验证字段已添加
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'leads'
AND column_name IN ('lead_type', 'lead_level', 'product_interest')
ORDER BY column_name;
```

应该看到 3 行结果。

---

### 步骤 2️⃣: 测试后台系统

1. **刷新后台页面**
   - 访问: https://xadyz.com/admin/leads
   - 按 `Ctrl + Shift + R` (Windows) 或 `Cmd + Shift + R` (Mac) 强制刷新

2. **检查以下功能**
   - ✅ 页面无错误提示
   - ✅ 可以看到线索列表（如果有数据）
   - ✅ 过滤器正常工作
   - ✅ 可以修改线索状态和等级

---

### 步骤 3️⃣: 插入测试数据（可选）

如果数据库是空的，可以插入测试数据：

```sql
-- 插入测试线索
INSERT INTO leads (
  company_name,
  contact_name,
  email,
  phone,
  country,
  lead_type,
  lead_level,
  product_interest,
  status,
  source,
  notes
) VALUES 
(
  'Test Company LLC',
  'Ivan Petrov',
  'ivan.petrov@testcompany.ru',
  '+7 495 123-4567',
  'Russia',
  'tender',
  'A',
  'Thermal Paper Rolls 80mm x 80mm',
  'new',
  'website',
  '我们需要报价：每月5000卷热敏纸。请提供FOB价格和交货时间。'
),
(
  'ABC Trading',
  'Maria Ivanova',
  'maria@abctrading.ru',
  '+7 495 987-6543',
  'Russia',
  'distributor',
  'B',
  'Thermal Labels 100x150mm',
  'new',
  'yandex',
  '寻找长期合作的标签供应商。'
),
(
  'XYZ Logistics',
  'Dmitry Sokolov',
  'dmitry@xyzlogistics.ru',
  '+7 812 555-1234',
  'Russia',
  'inquiry',
  'C',
  'Jumbo Rolls for converting',
  'contacted',
  'direct',
  '询问大卷热敏纸的技术规格和最小订货量。'
);

-- 查看刚插入的数据
SELECT 
  id,
  company_name,
  contact_name,
  lead_type,
  lead_level,
  status,
  created_at
FROM leads
ORDER BY created_at DESC
LIMIT 3;
```

---

## 🧪 验证修复成功

### ✅ 检查清单

- [ ] SQL 执行无错误
- [ ] 验证查询显示新字段存在
- [ ] 后台页面刷新后无错误提示
- [ ] 可以看到线索列表
- [ ] 过滤器（拼音、A-高、新线索）正常工作
- [ ] 可以点击查看线索详情
- [ ] 可以修改线索状态

---

## 📊 修复后的表结构

```sql
leads 表 (完整结构)
├── 基础字段
│   ├── id (UUID, 主键)
│   ├── created_at (时间戳)
│   └── updated_at (时间戳)
│
├── 联系信息
│   ├── company_name (必填)
│   ├── contact_name
│   ├── email
│   ├── phone
│   └── country
│
├── 线索分类 ⭐ 新增
│   ├── lead_type (tender/distributor/oem/inquiry/contact)
│   └── lead_level (A/B/C)
│
├── 业务信息
│   ├── product_interest (单个产品) ⭐ 新增
│   ├── products_interested (产品数组，保留)
│   ├── estimated_value (预估金额)
│   └── notes (备注)
│
├── 状态管理
│   ├── status (new/contacted/qualified/proposal/negotiation/won/lost)
│   ├── assigned_to (分配给谁)
│   └── next_follow_up (下次跟进时间) ⭐ 新增
│
└── 来源追踪
    ├── source (来源)
    ├── utm_campaign ⭐ 新增
    ├── utm_source ⭐ 新增
    ├── utm_medium ⭐ 新增
    └── page_url ⭐ 新增
```

---

## 🎯 字段说明

| 字段 | 类型 | 说明 | 示例值 |
|------|------|------|--------|
| `lead_type` | TEXT | 线索类型 | 'tender', 'distributor', 'oem', 'inquiry', 'contact' |
| `lead_level` | TEXT | 线索等级（优先级） | 'A'=高, 'B'=中, 'C'=低 |
| `product_interest` | TEXT | 客户兴趣产品（单个） | 'Thermal Paper Rolls 80mm' |
| `utm_campaign` | TEXT | UTM 活动标识 | 'summer_promo_2026' |
| `utm_source` | TEXT | 流量来源 | 'yandex', 'google', 'direct' |
| `utm_medium` | TEXT | 流量媒介 | 'cpc', 'organic', 'email' |
| `page_url` | TEXT | 来源页面 URL | 'https://xadyz.com/en/products' |
| `next_follow_up` | TIMESTAMP | 计划跟进时间 | '2026-02-10 10:00:00+00' |

---

## 🚨 常见问题

### Q1: 执行 SQL 后仍然报错？
**A**: 
1. 完全关闭浏览器，重新打开
2. 清除浏览器缓存
3. 等待 30 秒让数据库同步
4. 检查是否有多个浏览器标签页打开

### Q2: 看不到"Run"按钮？
**A**: 确保您在 **SQL Editor** 页面，不是在 Table Editor

### Q3: 提示权限不足？
**A**: 确认您的 Supabase 账号有 Owner 或 Admin 权限

### Q4: 现有数据会丢失吗？
**A**: 不会！这些操作只是**添加**新字段，不会删除或修改现有数据

### Q5: 可以回滚吗？
**A**: 可以。如果需要删除新字段：

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

## 📞 获取帮助

如果问题仍未解决：

1. **检查 Supabase 日志**
   - Supabase Dashboard → Logs → Postgres Logs
   - 查看是否有错误信息

2. **验证连接**
   ```sql
   -- 测试数据库连接
   SELECT current_database(), current_user, version();
   ```

3. **查看表是否存在**
   ```sql
   SELECT tablename FROM pg_tables WHERE schemaname = 'public';
   ```

---

## ✨ 修复后的功能

修复完成后，您将能够：

✅ **查看所有线索**
- 按类型过滤（招标、经销商、OEM、询价、咨询）
- 按等级过滤（A、B、C）
- 按状态过滤（新、已联系、已确认等）
- 按国家过滤

✅ **管理线索**
- 查看线索详情
- 修改线索状态
- 设置线索等级
- 添加跟进备注
- 安排下次跟进时间

✅ **数据分析**
- 统计不同类型线索数量
- 查看转化率
- 追踪来源效果

---

## 📝 预计修复时间

- **SQL 执行**: 10-30 秒
- **浏览器刷新**: 5 秒
- **验证测试**: 2-3 分钟
- **总计**: **约 5 分钟**

---

## 🎉 成功标志

当您看到以下画面时，说明修复成功：

1. ✅ 后台页面顶部**没有**红色错误提示
2. ✅ 可以看到"共 X 条线索"（X ≥ 0）
3. ✅ 三个下拉菜单（拼音、A-高、新线索）可以正常点击
4. ✅ 如果有数据，可以看到线索卡片

---

**最后更新**: 2026-02-05  
**文档版本**: v1.0  
**风险等级**: 🟢 低风险（只添加字段）  
**需要技能**: SQL 基础知识
