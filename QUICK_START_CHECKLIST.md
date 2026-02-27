# ⚡ 快速启动检查清单

> **5分钟完成数据库设置**

---

## 📝 执行步骤（按顺序）

### ☑️ 步骤 1: 执行迁移脚本（2分钟）

1. 打开 [Supabase Dashboard](https://supabase.com/dashboard)
2. SQL Editor → New Query
3. 复制 `/DATABASE_MIGRATION.sql` 全部内容
4. 点击 **RUN**
5. 看到 "Success" ✅

---

### ☑️ 步骤 2: 创建 Storage Buckets（1分钟）

**进入 Storage 页面，创建 5 个 Public Buckets**：

```
✅ assets-banners    (Public)
✅ assets-factory    (Public)
✅ assets-products   (Public)
✅ assets-materials  (Public)
✅ assets-docs       (Public)
```

**快捷方式**：每个 bucket 名称点击复制，粘贴到 Bucket Name，勾选 Public

---

### ☑️ 步骤 3: 设置 Admin 角色（30秒）

1. SQL Editor 运行：

```sql
-- 查看你的 User ID
SELECT id, email FROM auth.users;
```

2. 复制你的 `id`，运行：

```sql
-- ⚠️ 替换 <YOUR_ID> 为上面查到的 id
INSERT INTO public.user_roles (user_id, role)
VALUES ('<YOUR_ID>', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

---

### ☑️ 步骤 4: 初始化占位符（30秒）

**一键初始化所有核心页面**：

```sql
-- 一次性初始化所有占位符
SELECT public.bulk_upsert_placeholders('[
  {"page_key":"home","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9","required_size":"1920x1080"},
  {"page_key":"home","section_key":"factory_proof","placeholder_type":"proof","required_ratio":"16:9"},
  {"page_key":"products","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9","required_size":"1920x1080"},
  {"page_key":"material-supply","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9","required_size":"1920x1080"},
  {"page_key":"government-tenders","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9","required_size":"1920x1080"},
  {"page_key":"government-tenders","section_key":"factory_real","placeholder_type":"proof","required_ratio":"16:9"},
  {"page_key":"manufacturing","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9","required_size":"1920x1080"},
  {"page_key":"manufacturing","section_key":"slitting_machine","placeholder_type":"industry","required_ratio":"16:9"}
]'::jsonb);
```

**预期结果**: `8`

---

### ☑️ 步骤 5: 验证安装（1分钟）

**快速验证所有功能**：

```sql
-- 1. 检查表是否创建
SELECT COUNT(*) FROM public.assets;           -- 结果: 0
SELECT COUNT(*) FROM public.placeholders;     -- 结果: 8
SELECT COUNT(*) FROM public.user_roles;       -- 结果: 1

-- 2. 检查你的角色
SELECT role FROM public.user_roles WHERE user_id = auth.uid();  -- 结果: admin

-- 3. 检查 buckets
SELECT name FROM storage.buckets WHERE name LIKE 'assets-%' ORDER BY name;
-- 结果: 5 个 bucket
```

**如果所有结果都符合预期** → ✅ 安装成功！

---

## 🎯 完成后的测试

### 测试 1: 上传素材

1. 访问 `/admin` 
2. 点击 **Upload Asset**
3. 选择图片，填写信息
4. 点击 Upload
5. 控制台查看日志

**预期**: 看到 "✅ 素材上传成功！"

---

### 测试 2: 绑定占位符

```sql
-- 1. 创建测试素材
INSERT INTO public.assets (file_url, title, type, approved)
VALUES ('https://via.placeholder.com/1920x1080', 'Test Hero', 'banner', true)
RETURNING id;

-- 2. 绑定到 home.hero
UPDATE public.placeholders
SET asset_id = '<上面返回的 id>'
WHERE placeholder_key = 'home.hero'
RETURNING placeholder_key, status;
```

**预期结果**:
```
placeholder_key | status
----------------|--------
home.hero       | replaced
```

---

### 测试 3: 验证规则（应该失败）

```sql
-- 尝试绑定未批准的素材（应该报错）
INSERT INTO public.assets (file_url, title, type, approved)
VALUES ('https://via.placeholder.com/800', 'Unapproved', 'factory', false)
RETURNING id;

UPDATE public.placeholders
SET asset_id = '<上面的 id>'
WHERE placeholder_key = 'products.hero';
```

**预期错误**: `ERROR: ASSET_NOT_APPROVED` ✅

---

## ❌ 常见错误速查

| 错误 | 原因 | 解决 |
|------|------|------|
| `Bucket not found` | 未创建 bucket | 去 Storage 创建对应 bucket |
| `Permission denied` | 角色未设置 | 检查 user_roles 表 |
| `ASSET_NOT_APPROVED` | 绑定未批准素材 | 先设置 approved=true |
| `duplicate key` | placeholder_key 重复 | 使用 ON CONFLICT 或检查重复 |
| `relation does not exist` | 表未创建 | 重新运行迁移脚本 |

---

## 📊 完成检查清单

- [ ] ✅ 迁移脚本执行成功
- [ ] ✅ 5 个 Buckets 已创建
- [ ] ✅ Admin 角色已设置
- [ ] ✅ 8 个占位符已初始化
- [ ] ✅ 所有验证查询通过
- [ ] ✅ 测试上传成功
- [ ] ✅ 测试绑定成功
- [ ] ✅ 规则验证失败（符合预期）

**全部完成** → 🎉 **可以开始使用后台管理系统了！**

---

## 🚀 下一步

1. 访问 `/admin/assets` - 上传真实素材
2. 访问 `/admin/placeholders` - 绑定素材到占位符
3. 访问前台页面 - 查看效果

---

**版本**: 1.0.0  
**预计完成时间**: 5分钟  
**难度**: ⭐ 简单
