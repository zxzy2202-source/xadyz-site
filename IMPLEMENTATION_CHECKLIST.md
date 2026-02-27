# ✅ 实施检查清单 - Asset Management System

## 📋 数据库准备（必须先做）

### 1️⃣ 更新 Assets 表
```sql
-- 添加新字段到 assets 表
ALTER TABLE assets 
ADD COLUMN approved BOOLEAN DEFAULT false,
ADD COLUMN evidence_tags TEXT[],
ADD COLUMN notes TEXT;

-- 将现有素材默认设为未批准
UPDATE assets SET approved = false WHERE approved IS NULL;
```

### 2️⃣ 更新 Placeholders 表
```sql
-- 添加新字段到 placeholders 表
ALTER TABLE placeholders 
ADD COLUMN required_ratio TEXT;

-- 为现有占位符添加推荐比例
UPDATE placeholders 
SET required_ratio = '16:9' 
WHERE placeholder_type = 'hero';

UPDATE placeholders 
SET required_ratio = '4:3' 
WHERE placeholder_type = 'factory';
```

### 3️⃣ 创建 Evidence Tags 表
```sql
-- 创建证据标签表
CREATE TABLE IF NOT EXISTS evidence_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tag_key TEXT UNIQUE NOT NULL,
  tag_label TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入预置标签
INSERT INTO evidence_tags (tag_key, tag_label, description) VALUES
('factory_real', 'Real Factory Photo', 'Authentic factory floor and facility images'),
('production_line', 'Production Line', 'Manufacturing equipment and production processes'),
('qc_process', 'Quality Control', 'Quality inspection and testing procedures'),
('container_loading', 'Container Loading', 'Export packaging and container loading'),
('warehouse_stock', 'Warehouse Stock', 'Inventory and warehouse management'),
('slitting_machine', 'Slitting Machine', 'Jumbo roll slitting equipment'),
('printing_process', 'Printing Process', 'Flexo and offset printing operations'),
('iso_certified', 'ISO Certification', 'ISO 9001 and quality certificates');
```

---

## 📦 Supabase Storage 准备

### 检查 Bucket
```
访问 Supabase Dashboard > Storage

确认存在：
✅ assets-images  (public bucket)
✅ assets-docs    (已存在)

如果不存在 assets-images，创建它：
- Name: assets-images
- Public: Yes
- Allowed MIME types: image/*, video/*
```

---

## 🔐 权限配置

### 确认用户角色
```sql
-- 查看当前用户角色
SELECT * FROM user_roles;

-- 如果需要，添加 Ops 角色
INSERT INTO user_roles (user_id, role)
VALUES ('your-user-id', 'ops');
```

### 权限说明
```
ops:        可上传、审核、绑定素材
supervisor: 可查看、审核
admin:      全部权限
owner:      全部权限
sales:      无素材管理权限
```

---

## 📝 创建初始 Placeholders

### 高优先级占位符
```sql
INSERT INTO placeholders (
  placeholder_key,
  page_path,
  section_name,
  placeholder_type,
  required_ratio,
  status,
  priority,
  element_description
) VALUES 
-- 首页
('home.hero', '/en/', 'Hero Section', 'hero', '16:9', 'missing', 'high', 'Main homepage hero banner'),
('home.about_factory', '/en/', 'About Factory', 'factory', '4:3', 'missing', 'medium', 'Factory overview image'),

-- 产品页
('products.hero', '/en/products', 'Hero Section', 'hero', '16:9', 'missing', 'high', 'Products page hero'),
('products.thermal_paper', '/en/thermal-paper-rolls', 'Product Image', 'product', '1:1', 'missing', 'medium', 'Thermal paper roll product shot'),
('products.thermal_labels', '/en/thermal-labels', 'Product Image', 'product', '1:1', 'missing', 'medium', 'Thermal labels product shot'),

-- 制造页
('manufacturing.hero', '/en/manufacturing', 'Hero Section', 'hero', '16:9', 'missing', 'high', 'Manufacturing page hero'),
('manufacturing.factory_overview', '/en/manufacturing', 'Factory Overview', 'factory', '16:9', 'missing', 'high', 'Factory exterior/aerial view'),
('manufacturing.production_line', '/en/manufacturing', 'Production Line', 'factory', '4:3', 'missing', 'high', 'Production equipment in action'),
('manufacturing.qc_lab', '/en/manufacturing', 'Quality Control', 'factory', '4:3', 'missing', 'medium', 'QC laboratory and testing'),
('manufacturing.warehouse', '/en/manufacturing', 'Warehouse', 'factory', '16:9', 'missing', 'medium', 'Warehouse and inventory'),

-- 投标页
('government_tenders.hero', '/en/applications/government-tenders', 'Hero Section', 'hero', '16:9', 'missing', 'high', 'Government tenders page hero'),
('government_tenders.certificates', '/en/applications/government-tenders', 'Certificates', 'other', '4:3', 'missing', 'high', 'ISO and quality certificates'),
('government_tenders.container', '/en/applications/government-tenders', 'Export Proof', 'factory', '16:9', 'missing', 'medium', 'Container loading proof');
```

### 中优先级占位符
```sql
-- 应用页面
INSERT INTO placeholders (placeholder_key, page_path, section_name, placeholder_type, required_ratio, status, priority) VALUES 
('apps.retail.hero', '/en/applications/retail-pos', 'Hero', 'hero', '16:9', 'missing', 'medium'),
('apps.logistics.hero', '/en/applications/logistics-warehousing', 'Hero', 'hero', '16:9', 'missing', 'medium'),
('apps.supermarkets.hero', '/en/applications/supermarkets', 'Hero', 'hero', '16:9', 'missing', 'medium'),
('apps.banking.hero', '/en/applications/banking-finance', 'Hero', 'hero', '16:9', 'missing', 'medium');
```

---

## 🎨 首批素材建议

### 必须上传的素材

#### **Hero Images (16:9)**
- [ ] 首页Hero - 工厂全景或生产线
- [ ] 产品页Hero - 产品特写或应用场景
- [ ] 制造页Hero - 现代化工厂外观

#### **Factory Photos (4:3 or 16:9)**
- [ ] 工厂外观
- [ ] 生产线1 - 分切机
- [ ] 生产线2 - 印刷机
- [ ] 质检实验室
- [ ] 仓库库存
- [ ] 集装箱装载

#### **Product Images (1:1 or 4:3)**
- [ ] 热敏纸卷
- [ ] 热敏标签
- [ ] NCR表格
- [ ] 产品应用场景

#### **Certificates (4:3)**
- [ ] ISO 9001证书
- [ ] 质量检测报告
- [ ] 出口许可

---

## 🔄 测试流程

### 完整测试（15分钟）

#### 1️⃣ Asset Library 测试
```
1. 访问 /admin/assets
2. 点击 [Upload Asset]
3. 上传一张工厂照片
   - Title: Factory Overview 2024
   - Type: factory
   - Tags: slitting, warehouse
   - Evidence Tags: factory_real
   - ✅ Approve immediately
4. 点击 Upload
5. 确认素材出现在列表中，状态=Approved
```

#### 2️⃣ Placeholder 测试
```
1. 访问 /admin/placeholders
2. 找到 home.hero (Status: Missing)
3. 点击 [Bind]
4. 确认只显示 approved=true 的素材
5. 选择刚上传的素材
6. 点击 [Confirm Bind]
7. 确认状态变为 Replaced
8. 查看 Bound Asset 列显示缩略图
```

#### 3️⃣ Usage Tracking 测试
```
1. 返回 /admin/assets
2. 找到刚绑定的素材
3. 确认 Usage 显示 "home.hero"
4. 这证明使用追踪正常工作 ✅
```

#### 4️⃣ Evidence Tags 测试
```
1. 访问 /admin/evidence-tags
2. 点击快速添加模板标签
3. 创建一个自定义标签
4. 返回 /admin/assets
5. 上传新素材时选择证据标签
6. 确认标签显示在素材卡片上
```

#### 5️⃣ 权限测试
```
1. 用 Sales 角色登录（如果有）
2. 确认看不到素材管理菜单
3. 用 Ops 角色登录
4. 确认可以上传和审核
```

---

## ⚠️ 常见问题

### Q: 上传失败？
```
A: 检查：
1. Supabase Storage bucket 是否存在
2. 文件大小是否超限（<50MB）
3. 网络连接是否正常
4. 浏览器控制台错误信息
```

### Q: 绑定modal没有素材？
```
A: 原因：
1. 没有 approved=true 的素材
2. 先去 Asset Library 审核素材
3. 刷新页面重试
```

### Q: 前台还是看不到图？
```
A: 检查：
1. placeholder.asset_id 是否已设置
2. placeholder.status 是否=replaced
3. asset.approved 是否=true
4. 前台代码是否读取 placeholderKey
```

### Q: Evidence Tags表不存在？
```
A: 这是正常的！
- Evidence Tags是可选功能
- 系统会自动处理表不存在的情况
- 如需使用，执行上面的创建SQL
```

---

## 🎯 成功标准

系统正���工作的标志：

✅ **Asset Library**
- 可以上传文件
- Stats卡片显示正确数量
- 筛选和搜索正常
- Usage显示占位符

✅ **Placeholder Tracker**  
- Table显示所有占位符
- 可以绑定approved素材
- 绑定后显示缩略图
- Unbind功能正常

✅ **Evidence Tags**
- 可以添加标签
- 上传时可选择
- 显示在素材卡片

✅ **Permissions**
- Ops可以上传审核
- Sales看不到菜单
- Admin有全部权限

---

## 📞 技术支持

如遇问题，检查：

1. **浏览器控制台** - 查看JS错误
2. **Network标签** - 查看API请求
3. **Supabase Dashboard** - 查看数据库表
4. **Storage** - 查看上传的文件

---

## 🎉 启动！

一切准备就绪后：

```
1. 执行所有SQL命令
2. 确认Storage bucket存在
3. 登录 /admin/login
4. 开始上传素材！
```

**您的工业级B2B素材管理系统已就绪！** 🚀
