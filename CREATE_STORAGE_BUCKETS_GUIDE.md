# 📦 创建 Supabase Storage Buckets 详细指南

> **手把手教你创建 5 个 Storage Buckets**

---

## 🎯 目标

创建以下 5 个 Public Storage Buckets：
- `assets-banners`
- `assets-factory`
- `assets-products`
- `assets-materials`
- `assets-docs`

---

## 📋 详细步骤

### **步骤 1: 打开 Supabase Dashboard**

1. 打开浏览器，访问：https://supabase.com/dashboard
2. 如果未登录，先登录你的 Supabase 账号
3. 在项目列表中，找到并点击你的项目（dpitlvjqgoixfozdpkji）

**提示**：项目名称可能显示为你自己设置的名字

---

### **步骤 2: 进入 Storage 页面**

1. 在左侧菜单栏，找到 **Storage** 图标（看起来像一个文件夹 📁）
2. 点击 **Storage**

**你应该看到**：
- 顶部显示 "Storage"
- 右上角有一个绿色按钮 "New bucket"
- 如果是第一次使用，可能显示 "No buckets yet"

---

### **步骤 3: 创建第 1 个 Bucket - `assets-banners`**

#### 3.1 点击 "New bucket" 按钮

点击页面右上角的绿色按钮 **"New bucket"**

#### 3.2 填写 Bucket 信息

会弹出一个对话框，包含以下字段：

**Name (名称)**：
```
assets-banners
```
⚠️ **注意**：必须完全按照这个名称，不能有空格、大写字母或其他字符

**Public bucket (公开 bucket)**：
- 找到 "Public bucket" 选项
- **勾选** ✅ 这个复选框（非常重要！）

勾选后，下方可能显示提示：
> "Anyone can read files in this bucket"（任何人都可以读取此 bucket 中的文件）

这是正常的，因为我们需要前台页面能够显示图片。

#### 3.3 点击 "Create bucket"

点击对话框底部的 **"Create bucket"** 按钮

#### 3.4 验证创建成功

- 对话框关闭
- 在 Storage 页面左侧列表中，应该看到 `assets-banners`
- 旁边有一个绿色的 "Public" 标签

✅ **第 1 个 bucket 创建成功！**

---

### **步骤 4: 创建第 2 个 Bucket - `assets-factory`**

重复步骤 3，但使用不同的名称：

1. 点击 **"New bucket"**
2. Name: `assets-factory`
3. Public bucket: **勾选** ✅
4. 点击 **"Create bucket"**

✅ **第 2 个 bucket 创建成功！**

---

### **步骤 5: 创建第 3 个 Bucket - `assets-products`**

1. 点击 **"New bucket"**
2. Name: `assets-products`
3. Public bucket: **勾选** ✅
4. 点击 **"Create bucket"**

✅ **第 3 个 bucket 创建成功！**

---

### **步骤 6: 创建第 4 个 Bucket - `assets-materials`**

1. 点击 **"New bucket"**
2. Name: `assets-materials`
3. Public bucket: **勾选** ✅
4. 点击 **"Create bucket"**

✅ **第 4 个 bucket 创建成功！**

---

### **步骤 7: 创建第 5 个 Bucket - `assets-docs`**

1. 点击 **"New bucket"**
2. Name: `assets-docs`
3. Public bucket: **勾选** ✅
4. 点击 **"Create bucket"**

✅ **第 5 个 bucket 创建成功！**

---

## ✅ **验证所有 Buckets 已创建**

在 Storage 页面左侧，你应该看到 5 个 buckets，按字母顺序排列：

```
📦 assets-banners    [Public]
📦 assets-docs       [Public]
📦 assets-factory    [Public]
📦 assets-materials  [Public]
📦 assets-products   [Public]
```

每个都有绿色的 "Public" 标签。

---

## 🔍 **SQL 验证（可选）**

如果你想确认，可以在 SQL Editor 运行：

```sql
SELECT name, public 
FROM storage.buckets 
WHERE name LIKE 'assets-%' 
ORDER BY name;
```

**应该返回 5 行**：
```
name              | public
------------------|--------
assets-banners    | t
assets-docs       | t
assets-factory    | t
assets-materials  | t
assets-products   | t
```

（`t` 表示 `true`）

---

## 🎉 **完成！**

现在你可以：

1. **回到你的应用页面**
2. **刷新浏览器**（Ctrl + R 或 Cmd + R）
3. **重新尝试上传** `shipping.jpg`
4. **查看控制台日志**

应该看到：
```
🚀 开始上传素材...
📦 使用 bucket: assets-banners
✅ Storage 上传成功
```

**不再有 "Bucket not found" 错误！** ✅

---

## 🚨 **常见问题**

### **Q1: 找不到 "New bucket" 按钮**

**A**: 
- 确认你在 Storage 页面（左侧菜单 Storage）
- 按钮在右上角，是绿色的
- 如果还是找不到，尝试刷新页面

---

### **Q2: 创建时提示 "Bucket already exists"**

**A**: 
- 这个 bucket 已经存在，跳过它
- 继续创建下一个

---

### **Q3: 忘记勾选 "Public bucket"**

**A**: 
1. 在左侧找到这个 bucket
2. 点击它
3. 点击右上角的设置图标（齿轮 ⚙️）
4. 找到 "Public bucket" 选项
5. 勾选它
6. 保存

---

### **Q4: 名称输错了（比如 asset-banner 而不是 assets-banners）**

**A**: 
1. 在左侧找到这个错误的 bucket
2. 点击它
3. 点击右上角的设置图标（齿轮 ⚙️）
4. 选择 "Delete bucket"
5. 重新创建，使用正确的名称

---

## 📝 **Bucket 命名规则检查清单**

在创建每个 bucket 前，确认：

- [ ] 名称全部小写
- [ ] 使用连字符 `-`，不是下划线 `_`
- [ ] `assets` 后面有 `-s`（复数）
- [ ] Public bucket 已勾选 ✅
- [ ] 名称完全匹配（复制粘贴）

**正确命名**：
```
✅ assets-banners
✅ assets-factory
✅ assets-products
✅ assets-materials
✅ assets-docs
```

**错误命名**：
```
❌ asset-banner    (少了 s)
❌ assets_banners  (用了下划线)
❌ Assets-Banners  (有大写)
❌ assetsBanners   (没有连字符)
```

---

## 🎯 **下一步**

Buckets 创建完成后：

1. ✅ 回到应用重新上传 `shipping.jpg`
2. ⏳ 执行数据库迁移（参考 `/ACTION_ITEMS.md` 步骤 1）
3. ⏳ 设置 Admin 角色（参考 `/ACTION_ITEMS.md` 步骤 3）
4. ⏳ 初始化占位符（参考 `/ACTION_ITEMS.md` 步骤 4）

---

**预计完成时间**: 2-3 分钟  
**难度**: ⭐ 非常简单

**有任何问题随时问我！** 💬
