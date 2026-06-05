# ✅ 立即执行清单

> **现在需要你做的事情**（按优先级排序）

---

## 🎉 **已自动修复的问题**

以下问题已经由助手自动修复，无需你手动操作：

- ✅ **Supabase URL 配置错误** - 已从 `/utils/supabase/info.tsx` 导入配置
- ✅ **多个 GoTrueClient 实例警告** - 已采用单例模式
- ✅ **上传功能按接口合同实现** - Bucket 映射、路径生成、错误回滚
- ✅ **详细的调试日志** - 每一步都有 console.log

**现在刷新浏览器，这些错误/警告应该全部消失！** 🎊

---

## 🔥 **高优先级（立即执行）**

### **1. 执行数据库迁移** ⏱️ 2分钟

**步骤**：
1. 打开 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 点击 **SQL Editor** → **New Query**
4. 复制 `/DATABASE_MIGRATION.sql` 的**全部内容**
5. 粘贴到编辑器
6. 点击 **RUN** 按钮

**验证**：
看到 "Success. No rows returned" ✅

---

### **2. 创建 Storage Buckets** ⏱️ 1分钟

**步骤**：
1. 点击左侧 **Storage**
2. 依次创建以下 5 个 Buckets（**必须勾选 Public**）：

```
✅ assets-banners    (Public ✓)
✅ assets-factory    (Public ✓)
✅ assets-products   (Public ✓)
✅ assets-materials  (Public ✓)
✅ assets-docs       (Public ✓)
```

**每个 Bucket 的创建步骤**：
- 点击 **New bucket**
- Name: 输入 bucket 名称（如 `assets-banners`）
- Public bucket: **勾选** ✓
- 点击 **Create bucket**

**验证**：
在 Storage 页面能看到 5 个 buckets，且都显示 "Public" 标签 ✅

---

### **3. 设置你的 Admin 角色** ⏱️ 30秒

**步骤**：

1. 在 SQL Editor 运行：

```sql
-- 查看你的 User ID
SELECT id, email FROM auth.users;
```

2. 复制你的 `id`（一串 UUID）

3. 运行以下 SQL（**替换 `<YOUR_ID>` 为上面复制的 id**）：

```sql
-- ⚠️ 替换 <YOUR_ID>
INSERT INTO public.user_roles (user_id, role)
VALUES ('<YOUR_ID>', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

**示例**：
```sql
-- 示例（你的 ID 会不同）
INSERT INTO public.user_roles (user_id, role)
VALUES ('a1b2c3d4-e5f6-7890-abcd-1234567890ab', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

**验证**：
```sql
SELECT role FROM public.user_roles WHERE user_id = auth.uid();
-- 应该返回: admin
```

---

### **4. 初始化占位符数据** ⏱️ 30秒

**步骤**：

在 SQL Editor 运行：

```sql
-- 一键初始化所有核心页面占位符
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

**验证**：
应该返回数字 `8` ✅

---

### **5. 验证安装** ⏱️ 1分钟

**运行所有验证查询**：

```sql
-- 1. 检查表
SELECT COUNT(*) as assets_count FROM public.assets;           -- 结果: 0
SELECT COUNT(*) as placeholders_count FROM public.placeholders;     -- 结果: 8
SELECT COUNT(*) as user_roles_count FROM public.user_roles;       -- 结果: 1

-- 2. 检查你的角色
SELECT role FROM public.user_roles WHERE user_id = auth.uid();  -- 结果: admin

-- 3. 检查 buckets
SELECT name FROM storage.buckets WHERE name LIKE 'assets-%' ORDER BY name;
-- 结果应该有 5 行

-- 4. 检查占位符
SELECT page_key, section_key, placeholder_key, status 
FROM public.placeholders 
ORDER BY page_key, section_key 
LIMIT 5;
-- 应该看到 home.hero, home.factory_proof 等
```

**如果所有结果都符合** → ✅ **数据库设置完成！**

---

## 📋 **中优先级（完成后执行）**

### **6. 测试上传功能** ⏱️ 2分钟

**步骤**：

1. 刷新浏览器页面（重新加载权限）
2. 访问 `/admin` 或 `/admin/assets`
3. 点击 **Upload Asset** 按钮
4. 选择一张图片（如你刚才上传的 `P6070003.jpg`）
5. 填写：
   - Title: `Test Factory Image`
   - Type: 选择 `factory`
   - Tags: `test, factory, production`
   - Approved: 勾选 ✓
6. 点击 **Upload Asset**

**查看控制台（F12）**：

应该看到详细日志：
```
🚀 开始上传素材...
👤 当前用户: your-email@example.com
📦 使用 bucket: assets-factory
📁 上传路径: 2026/02/xxx-xxx_test-factory-image.jpg
✅ Storage 上传成功
🔗 Public URL: https://...
💾 保存到数据库...
✅ 数据库保存成功
```

**如果看到** `✅ 素材上传成功！` → ✅ 上传功能正常！

**如果有错误**：
- 查看控制台具体错误信息
- 截图发给我，我帮你诊断

---

### **7. 测试绑定功能** ⏱️ 1分钟

**步骤**：

1. 在 SQL Editor 运行：

```sql
-- 1. 获取刚才上传的素材 ID
SELECT id, title, approved FROM public.assets ORDER BY created_at DESC LIMIT 1;
```

2. 复制返回的 `id`

3. 运行绑定操作：

```sql
-- ⚠️ 替换 <ASSET_ID> 为上面复制的 id
UPDATE public.placeholders
SET asset_id = '<ASSET_ID>'
WHERE placeholder_key = 'home.hero'
RETURNING placeholder_key, status, asset_id;
```

**预期结果**：
```
placeholder_key | status   | asset_id
----------------|----------|--------------------------------------
home.hero       | replaced | <ASSET_ID>
```

**如果看到 status=replaced** → ✅ 绑定功能正常！

---

### **8. 测试规则验证（应该失败）** ⏱️ 1分钟

**测试：尝试绑定未批准的素材**

```sql
-- 1. 插入未批准素材
INSERT INTO public.assets (file_url, title, type, approved)
VALUES ('https://via.placeholder.com/800', 'Unapproved Test', 'factory', false)
RETURNING id;

-- 2. 尝试绑定（应该报错）
UPDATE public.placeholders
SET asset_id = '<上面返回的 id>'
WHERE placeholder_key = 'products.hero';
```

**预期错误**：
```
ERROR: ASSET_NOT_APPROVED
```

**如果看到这个错误** → ✅ 数据库规则正常工作！

---

## 📊 **低优先级（可选）**

### **9. 查看素材使用情况**

```sql
-- 使用视图查询
SELECT 
  title,
  type,
  approved,
  placeholder_keys
FROM public.asset_placeholder_usage
ORDER BY title;
```

---

### **10. 添加更多占位符**

**根据你的实际页面添加**：

```sql
SELECT public.bulk_upsert_placeholders('[
  {"page_key":"about","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9"},
  {"page_key":"about","section_key":"team","placeholder_type":"product","required_ratio":"1:1"},
  {"page_key":"contact","section_key":"hero","placeholder_type":"hero","required_ratio":"16:9"}
]'::jsonb);
```

---

## ✅ 完成检查清单

**复制以下内容，完成一项就打勾**：

```
数据库设置：
- [ ] ✅ 执行了 DATABASE_MIGRATION.sql
- [ ] ✅ 创建了 5 个 Storage Buckets (Public)
- [ ] ✅ 设置了自己的 Admin 角色
- [ ] ✅ 初始化了 8 个占位符
- [ ] ✅ 所有验证查询都通过

功能测试：
- [ ] ✅ 上传素材成功（控制台无错误）
- [ ] ✅ 绑定素材成功（status=replaced）
- [ ] ✅ 规则验证正常（ASSET_NOT_APPROVED）

可选项：
- [ ] 查看了素材使用情况
- [ ] 添加了更多占位符
```

---

## 🚨 如果遇到问题

### **问题 1: 上传时提示 "Bucket not found"**

**解决**：
1. 检查 bucket 名称是否正确（必须是 `assets-factory` 不是 `asset-factory`）
2. 确认 bucket 已创建且设为 Public
3. 刷新 Storage 页面

---

### **问题 2: 上传后没有反应**

**解决**：
1. 打开浏览器控制台（F12）
2. 查看 Console 标签页
3. 截图所有错误信息发给我

---

### **问题 3: 无法访问 /admin 页面**

**解决**：
1. 检查你的角色是否设置为 admin：
```sql
SELECT role FROM public.user_roles WHERE user_id = auth.uid();
```
2. 如果不是 admin，重新执行步骤 3

---

### **问题 4: 数据库插入失败**

**解决**：
1. 查看具体错误消息
2. 检查字段名是否匹配：
```sql
-- 查看 assets 表结构
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'assets';
```

---

## 📞 需要帮助？

**把以下信息发给我**：

1. **错误截图**（浏览器控制台 + Supabase Dashboard）
2. **你执行的 SQL**
3. **你的角色**：
```sql
SELECT role FROM public.user_roles WHERE user_id = auth.uid();
```
4. **Buckets 列表**：
```sql
SELECT name, public FROM storage.buckets;
```

---

## 🎉 全部完成后

**你现在可以**：

1. ✅ 上传素材到 Asset Library
2. ✅ 批准/拒绝素材
3. ✅ 绑定素材到占位符
4. ✅ 查看素材使用情况
5. ✅ 前台页面显示真实图片

**开始使用后台管理系统！** 🚀

---

**当前状态**: ⏳ 等待你执行步骤 1-5  
**预计完成时间**: 5分钟  
**下一步**: 打开 Supabase Dashboard 开始执行