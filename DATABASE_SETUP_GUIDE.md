# 🗄️ 数据库设置完整指南

> **志信纸业 B2B 独立站 - Assets & Placeholders 系统**  
> **版本**: 1.0.0  
> **日期**: 2026-02-05

---

## 📋 目录

1. [执行迁移脚本](#1-执行迁移脚本)
2. [创建 Storage Buckets](#2-创建-storage-buckets)
3. [设置用户角色](#3-设置用户角色)
4. [初始化占位符数据](#4-初始化占位符数据)
5. [验证安装](#5-验证安装)
6. [测试权限](#6-测试权限)
7. [常见问题](#7-常见问题)

---

## 1. 执行迁移脚本

### 步骤 1.1：打开 Supabase SQL Editor

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 左侧菜单点击 **SQL Editor**

### 步骤 1.2：运行迁移脚本

1. 点击 **New Query**
2. 复制整个 `/DATABASE_MIGRATION.sql` 文件内容
3. 粘贴到编辑器
4. 点击 **RUN** 按钮（或按 `Ctrl + Enter`）

**预期结果**：
```
Success. No rows returned
```

### 步骤 1.3：验证表已创建

运行以下查询检查：

```sql
-- 检查表是否存在
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('assets', 'placeholders', 'user_roles')
ORDER BY table_name;
```

**预期结果**：
```
table_name
-----------
assets
placeholders
user_roles
```

---

## 2. 创建 Storage Buckets

### 步骤 2.1：进入 Storage 管理页面

1. 左侧菜单点击 **Storage**
2. 点击 **New bucket** 按钮

### 步骤 2.2：创建以下 5 个 Buckets

按照以下顺序创建（**名称必须完全一致**）：

| Bucket Name | Public | 说明 |
|-------------|--------|------|
| `assets-banners` | ✅ Yes | 横幅广告图片 |
| `assets-factory` | ✅ Yes | 工厂实拍图片 |
| `assets-products` | ✅ Yes | 产品图片 |
| `assets-materials` | ✅ Yes | 原材料图片 |
| `assets-docs` | ✅ Yes | 文档/证书 |

**创建步骤**（每个 bucket）：
1. 点击 **New bucket**
2. **Name**: 输入 bucket 名称（如 `assets-banners`）
3. **Public bucket**: 勾选 ✅
4. 点击 **Create bucket**

### 步骤 2.3：验证 Buckets

运行以下查询：

```sql
-- 查询所有 storage buckets
SELECT id, name, public 
FROM storage.buckets 
WHERE name LIKE 'assets-%'
ORDER BY name;
```

**预期结果**：
```
id                                   | name              | public
-------------------------------------|-------------------|--------
...                                  | assets-banners    | true
...                                  | assets-docs       | true
...                                  | assets-factory    | true
...                                  | assets-materials  | true
...                                  | assets-products   | true
```

---

## 3. 设置用户角色

### 步骤 3.1：获取你的 User ID

**方法A：通过 SQL 查询**

```sql
-- 查看所有已注册用户
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;
```

**方法B：通过 Authentication 页面**

1. 左侧菜单 → **Authentication** → **Users**
2. 找到你的账号
3. 点击查看详情，复制 **UID**

### 步骤 3.2：设置为 Admin 角色

将你的 User ID 替换到以下 SQL 中执行：

```sql
-- ⚠️ 替换 <YOUR_USER_ID> 为实际的 UUID
INSERT INTO public.user_roles (user_id, role)
VALUES ('<YOUR_USER_ID>', 'admin')
ON CONFLICT (user_id) 
DO UPDATE SET role = 'admin';
```

**示例**：
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('a1b2c3d4-e5f6-7890-abcd-1234567890ab', 'admin')
ON CONFLICT (user_id) 
DO UPDATE SET role = 'admin';
```

### 步骤 3.3：验证角色

```sql
-- 检查你的角色
SELECT u.email, r.role, r.created_at
FROM auth.users u
JOIN public.user_roles r ON r.user_id = u.id
WHERE u.id = '<YOUR_USER_ID>';
```

**预期结果**：
```
email                    | role  | created_at
-------------------------|-------|-------------------------
admin@zhixinpaper.com    | admin | 2026-02-05 10:30:00+00
```

---

## 4. 初始化占位符数据

### 步骤 4.1：批量插入核心页面占位符

运行以下 SQL：

```sql
-- 初始化 Home 页面占位符
SELECT public.bulk_upsert_placeholders(
  '[
    {"page_key":"home","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9","required_size":"1920x1080"},
    {"page_key":"home","section_key":"factory_proof","placeholder_type":"proof","required_ratio":"16:9","required_size":"1200x675"},
    {"page_key":"home","section_key":"production_line","placeholder_type":"industry","required_ratio":"4:3","required_size":"1200x900"}
  ]'::jsonb
);

-- 初始化 Products 页面占位符
SELECT public.bulk_upsert_placeholders(
  '[
    {"page_key":"products","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9","required_size":"1920x1080"},
    {"page_key":"products","section_key":"category_banner","placeholder_type":"product","required_ratio":"21:9","required_size":"1920x823"}
  ]'::jsonb
);

-- 初始化 Material Supply 页面占位符
SELECT public.bulk_upsert_placeholders(
  '[
    {"page_key":"material-supply","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9","required_size":"1920x1080"},
    {"page_key":"material-supply","section_key":"warehouse","placeholder_type":"proof","required_ratio":"16:9","required_size":"1200x675"}
  ]'::jsonb
);

-- 初始化 Government Tenders 页面占位符
SELECT public.bulk_upsert_placeholders(
  '[
    {"page_key":"government-tenders","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9","required_size":"1920x1080"},
    {"page_key":"government-tenders","section_key":"factory_real","placeholder_type":"proof","required_ratio":"16:9","required_size":"1200x675"},
    {"page_key":"government-tenders","section_key":"qc_process","placeholder_type":"proof","required_ratio":"4:3","required_size":"1200x900"}
  ]'::jsonb
);

-- 初始化 Manufacturing 页面占位符
SELECT public.bulk_upsert_placeholders(
  '[
    {"page_key":"manufacturing","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9","required_size":"1920x1080"},
    {"page_key":"manufacturing","section_key":"slitting_machine","placeholder_type":"industry","required_ratio":"16:9","required_size":"1200x675"},
    {"page_key":"manufacturing","section_key":"printing_process","placeholder_type":"industry","required_ratio":"16:9","required_size":"1200x675"}
  ]'::jsonb
);
```

**预期结果**（每次）：
```
bulk_upsert_placeholders
------------------------
3
```

### 步骤 4.2：验证占位符

```sql
-- 查询所有占位符
SELECT 
  page_key,
  section_key,
  placeholder_key,
  placeholder_type,
  status,
  required_ratio
FROM public.placeholders
ORDER BY page_key, section_key;
```

**预期结果**：
```
page_key           | section_key      | placeholder_key                    | placeholder_type | status  | required_ratio
-------------------|------------------|---------------------------------------|------------------|---------|---------------
government-tenders | factory_real     | government-tenders.factory_real       | proof            | missing | 16:9
government-tenders | hero             | government-tenders.hero               | hero             | missing | 16:9
government-tenders | qc_process       | government-tenders.qc_process         | proof            | missing | 4:3
home               | factory_proof    | home.factory_proof                    | proof            | missing | 16:9
home               | hero             | home.hero                             | hero             | missing | 16:9
home               | production_line  | home.production_line                  | industry         | missing | 4:3
manufacturing      | hero             | manufacturing.hero                    | hero             | missing | 16:9
...
```

---

## 5. 验证安装

### 验证清单

运行以下所有查询，确保结果符合预期：

#### ✅ 5.1 检查表结构

```sql
-- 检查 assets 表字段
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'assets'
ORDER BY ordinal_position;
```

**必须包含字段**：
- `id` (uuid)
- `file_url` (text)
- `title` (text)
- `type` (user-defined)
- `tags` (array)
- `approved` (boolean)

#### ✅ 5.2 检查触发器

```sql
-- 检查触发器是否存在
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND event_object_table IN ('assets', 'placeholders', 'user_roles')
ORDER BY event_object_table, trigger_name;
```

**预期结果**：
```
trigger_name                       | event_manipulation | event_object_table
-----------------------------------|-------------------|-------------------
trg_assets_updated_at              | UPDATE            | assets
trg_placeholders_bind_rules        | INSERT            | placeholders
trg_placeholders_bind_rules        | UPDATE            | placeholders
trg_placeholders_updated_at        | UPDATE            | placeholders
trg_user_roles_updated_at          | UPDATE            | user_roles
```

#### ✅ 5.3 检查 RLS 策略

```sql
-- 检查 RLS 策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('assets', 'placeholders', 'user_roles')
ORDER BY tablename, policyname;
```

**预期结果**：至少 12 条策略

#### ✅ 5.4 检查视图

```sql
-- 检查视图是否存在
SELECT table_name, view_definition
FROM information_schema.views
WHERE table_schema = 'public'
  AND table_name = 'asset_placeholder_usage';
```

**预期结果**：
```
table_name               | view_definition
-------------------------|----------------
asset_placeholder_usage  | SELECT a.id AS asset_id, ...
```

#### ✅ 5.5 检查函数

```sql
-- 检查自定义函数
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN ('current_role', 'bulk_upsert_placeholders', 'enforce_placeholder_binding_rules')
ORDER BY routine_name;
```

**预期结果**：
```
routine_name                        | routine_type
------------------------------------|-------------
bulk_upsert_placeholders            | FUNCTION
current_role                        | FUNCTION
enforce_placeholder_binding_rules   | FUNCTION
```

---

## 6. 测试权限

### 测试 6.1：测试角色权限

```sql
-- 测试 current_role() 函数
SELECT public.current_role();
```

**预期结果**：
```
current_role
------------
admin
```

### 测试 6.2：测试 Assets 插入（应成功）

```sql
-- 插入测试素材
INSERT INTO public.assets (file_url, title, type, tags, approved)
VALUES (
  'https://example.com/test.jpg',
  'Test Banner',
  'banner',
  ARRAY['test'],
  true
)
RETURNING id, title, type, approved;
```

**预期结果**：
```
id                                   | title        | type   | approved
-------------------------------------|--------------|--------|----------
...                                  | Test Banner  | banner | true
```

### 测试 6.3：测试只能绑定 approved 素材（应失败）

```sql
-- 1. 插入未批准的素材
INSERT INTO public.assets (file_url, title, type, approved)
VALUES ('https://example.com/unapproved.jpg', 'Unapproved', 'factory', false)
RETURNING id;

-- 2. 尝试绑定到占位符（应该失败）
UPDATE public.placeholders
SET asset_id = '<刚才返回的 id>'
WHERE placeholder_key = 'home.hero';
```

**预期结果**：
```
ERROR: ASSET_NOT_APPROVED
```

### 测试 6.4：测试绑定 approved 素材（应成功）

```sql
-- 1. 获取已批准的素材 ID
SELECT id FROM public.assets WHERE approved = true LIMIT 1;

-- 2. 绑定到占位符
UPDATE public.placeholders
SET asset_id = '<上面查询到的 id>'
WHERE placeholder_key = 'home.hero'
RETURNING placeholder_key, status, asset_id;
```

**预期结果**：
```
placeholder_key | status   | asset_id
----------------|----------|--------------------------------------
home.hero       | replaced | ...
```

### 测试 6.5：测试 placeholder_key 唯一性（应失败）

```sql
-- 尝试插入重复的 placeholder_key
INSERT INTO public.placeholders (page_key, section_key, placeholder_type)
VALUES ('home', 'hero', 'hero');
```

**预期结果**：
```
ERROR: duplicate key value violates unique constraint "uq_placeholders_key"
DETAIL: Key (placeholder_key)=(home.hero) already exists.
```

---

## 7. 常见问题

### Q1: 执行迁移脚本时报错 "extension already exists"

**原因**：pgcrypto 扩展已安装

**解决**：忽略此错误，继续执行即可（脚本已使用 `if not exists`）

---

### Q2: 创建 Bucket 时提示 "Bucket already exists"

**原因**：Bucket 已创建

**解决**：跳过该 bucket，继续创建其他 bucket

---

### Q3: 设置角色后仍然无法访问 Assets/Placeholders

**排查步骤**：

1. 检查角色是否设置成功：
```sql
SELECT role FROM public.user_roles WHERE user_id = auth.uid();
```

2. 检查 RLS 是否启用：
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('assets', 'placeholders');
```

3. 尝试刷新浏览器页面

---

### Q4: 上传文件时提示 "Bucket not found"

**原因**：Bucket 名称不匹配或未创建

**解决**：

1. 检查代码中的 bucket 名称是否与创建的一致
2. 确认 bucket 已在 Supabase Storage 中创建
3. 检查 bucket 是否设为 Public

---

### Q5: 绑定素材时提示 "ASSET_NOT_APPROVED"

**原因**：尝试绑定未批准的素材（这是正常的保护机制）

**解决**：

1. 先将素材标记为 approved：
```sql
UPDATE public.assets
SET approved = true
WHERE id = '<asset_id>';
```

2. 然后再绑定

---

### Q6: 如何添加更多用户角色？

**添加 ops 角色**：
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<user_id>', 'ops')
ON CONFLICT (user_id) DO UPDATE SET role = 'ops';
```

**添加 supervisor 角色**：
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<user_id>', 'supervisor')
ON CONFLICT (user_id) DO UPDATE SET role = 'supervisor';
```

---

### Q7: 如何查看哪些素材正在使用中？

```sql
-- 使用视图查询
SELECT 
  asset_id,
  title,
  type,
  approved,
  placeholder_keys
FROM public.asset_placeholder_usage
WHERE array_length(placeholder_keys, 1) > 0
ORDER BY title;
```

---

### Q8: 如何批量导入占位符？

**准备 JSON 数据**：
```json
[
  {
    "page_key": "about",
    "section_key": "hero",
    "placeholder_type": "hero",
    "required_ratio": "16:9",
    "required_size": "1920x1080"
  },
  {
    "page_key": "about",
    "section_key": "team",
    "placeholder_type": "product",
    "required_ratio": "1:1",
    "required_size": "800x800"
  }
]
```

**执行导入**：
```sql
SELECT public.bulk_upsert_placeholders(
  '[
    {"page_key":"about","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9","required_size":"1920x1080"},
    {"page_key":"about","section_key":"team","placeholder_type":"product","required_ratio":"1:1","required_size":"800x800"}
  ]'::jsonb
);
```

---

## ✅ 完成检查清单

安装完成后，请确认以下所有项都已完成：

- [ ] 执行了完整的迁移脚本
- [ ] 创建了 5 个 Storage Buckets
- [ ] 设置了自己的 Admin 角色
- [ ] 初始化了至少 10 个占位符
- [ ] 通过了所有验证测试（5.1 - 5.5）
- [ ] 通过了所有权限测试（6.1 - 6.5）
- [ ] 成功上传了测试素材
- [ ] 成功绑定了素材到占位符

---

## 🎉 下一步

数据库设置完成后，可以：

1. **启动后台管理系统**：访问 `/admin` 页面
2. **上传素材**：使用 Asset Library 上传图片
3. **绑定占位符**：使用 Placeholder Tracker 绑定素材
4. **查看前台效果**：访问前台页面查看真实图片

---

**版本**: 1.0.0  
**最后更新**: 2026-02-05  
**维护人**: Figma Make AI Assistant
