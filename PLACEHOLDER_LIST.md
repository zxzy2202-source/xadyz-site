# 完整Placeholder清单 - 志信纸业网站

基于你的18个production-ready页面，以下是完整的占位符清单，可直接导入Supabase。

---

## 🎯 占位符命名规范

### page_key规范（与URL对应）
- 使用kebab-case（连字符）
- 与实际URL路径对应
- 例如：`thermal-paper-rolls`, `government-tenders`

### section_key规范
- 格式：`section-type.identifier`
- 例如：`hero`, `products.1`, `factory.workshop`

### placeholder_type类型
- `hero` - 页面主banner（通常16:9）
- `product` - 产品图片
- `factory` - 工厂/车间照片
- `industry` - 行业应用场景
- `banner` - 其他banner图
- `icon` - 图标/小图

---

## 📋 完整SQL插入语句

```sql
-- ============================================
-- 1. 首页 (Landing Page) - /en/ /ru/ /zh/
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('home', 'hero', 'hero', '16:9', 'high', '首页主banner - 推荐使用工厂全景或装柜实拍'),
('home', 'trust.factory', 'factory', '16:9', 'high', '工厂实力展示 - 厂房外景或车间全景'),
('home', 'products.thermal-paper', 'product', '1:1', 'high', '热敏纸卷产品图 - 正面展示'),
('home', 'products.thermal-labels', 'product', '1:1', 'high', '热敏标签产品图 - 正面展示'),
('home', 'products.ncr-forms', 'product', '1:1', 'high', 'NCR无碳复写纸产品图'),
('home', 'proof.container-1', 'factory', '4:3', 'high', '装柜实拍照片1 - 展示出货规模'),
('home', 'proof.container-2', 'factory', '4:3', 'medium', '装柜实拍照片2 - 不同角度'),
('home', 'proof.warehouse', 'factory', '4:3', 'medium', '仓库库存照片 - 展示备货能力'),
('home', 'applications.tender', 'industry', '16:9', 'medium', '政府投标应用场景图'),
('home', 'applications.retail', 'industry', '16:9', 'low', '零售POS应用场景');

-- ============================================
-- 2. 产品中心页 - /products
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('products', 'hero', 'hero', '16:9', 'high', '产品中心主banner - 产品全家福或生产线'),
('products', 'series.thermal', 'banner', '4:3', 'high', '热敏纸系列缩略图'),
('products', 'series.ncr', 'banner', '4:3', 'high', 'NCR系列缩略图');

-- ============================================
-- 3. 热敏纸卷系列 - /thermal-paper-rolls
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('thermal-paper-rolls', 'hero', 'hero', '16:9', 'high', '热敏纸卷主banner'),
('thermal-paper-rolls', 'product.main', 'product', '1:1', 'high', '热敏纸卷主产品图 - 白底'),
('thermal-paper-rolls', 'product.blank-1', 'product', '1:1', 'medium', '空白热敏纸卷示例1'),
('thermal-paper-rolls', 'product.blank-2', 'product', '1:1', 'medium', '空白热敏纸卷示例2'),
('thermal-paper-rolls', 'product.printed-1', 'product', '1:1', 'medium', '定制印刷热敏纸卷1'),
('thermal-paper-rolls', 'product.printed-2', 'product', '1:1', 'medium', '定制印刷热敏纸卷2'),
('thermal-paper-rolls', 'specs.core-sizes', 'product', '4:3', 'low', '不同纸管尺寸对比图'),
('thermal-paper-rolls', 'applications.pos', 'industry', '16:9', 'medium', 'POS收银场景应用'),
('thermal-paper-rolls', 'applications.atm', 'industry', '16:9', 'low', 'ATM打印场景');

-- ============================================
-- 4. 热敏标签系列 - /thermal-labels
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('thermal-labels', 'hero', 'hero', '16:9', 'high', '热敏标签主banner'),
('thermal-labels', 'product.main', 'product', '1:1', 'high', '热敏标签主产品图'),
('thermal-labels', 'product.4x6-1', 'product', '1:1', 'medium', '4x6英寸标签样品'),
('thermal-labels', 'product.a6-1', 'product', '1:1', 'medium', 'A6尺寸标签样品'),
('thermal-labels', 'product.custom-1', 'product', '1:1', 'medium', '定制尺寸标签1'),
('thermal-labels', 'product.custom-2', 'product', '1:1', 'medium', '定制尺寸标签2'),
('thermal-labels', 'applications.logistics', 'industry', '16:9', 'medium', '物流快递标签应用'),
('thermal-labels', 'applications.warehouse', 'industry', '16:9', 'low', '仓储管理标签应用');

-- ============================================
-- 5. NCR无碳复写纸系列 - /ncr-forms
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('ncr-forms', 'hero', 'hero', '16:9', 'high', 'NCR无碳纸主banner'),
('ncr-forms', 'product.main', 'product', '1:1', 'high', 'NCR表格套装产品图'),
('ncr-forms', 'product.2-part', 'product', '1:1', 'medium', '2联NCR表格'),
('ncr-forms', 'product.3-part', 'product', '1:1', 'medium', '3联NCR表格'),
('ncr-forms', 'product.continuous', 'product', '4:3', 'medium', '电脑连续纸format'),
('ncr-forms', 'applications.invoice', 'industry', '16:9', 'medium', '发票/收据应用场景'),
('ncr-forms', 'applications.contract', 'industry', '16:9', 'low', '合同/协议应用场景');

-- ============================================
-- 6. 原材料供应 - /material-supply
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('material-supply', 'hero', 'hero', '16:9', 'high', '原材料供应banner - 大卷原料展示'),
('material-supply', 'jumbo.thermal', 'product', '4:3', 'high', '热敏纸jumbo大卷'),
('material-supply', 'jumbo.adhesive', 'product', '4:3', 'high', '不干胶jumbo大卷'),
('material-supply', 'jumbo.ncr', 'product', '4:3', 'high', 'NCR jumbo大卷'),
('material-supply', 'production.slitting', 'factory', '16:9', 'medium', '分切生产线照片'),
('material-supply', 'warehouse.stock', 'factory', '16:9', 'medium', '原料仓库库存');

-- ============================================
-- 7. Jumbo Rolls详情页
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('thermal-jumbo-rolls', 'hero', 'hero', '16:9', 'medium', '热敏纸jumbo banner'),
('thermal-jumbo-rolls', 'product.jumbo-1', 'product', '4:3', 'high', '热敏纸大卷产品图1'),
('thermal-jumbo-rolls', 'product.jumbo-2', 'product', '4:3', 'medium', '热敏纸大卷产品图2'),

('self-adhesive-jumbo-rolls', 'hero', 'hero', '16:9', 'medium', '不干胶jumbo banner'),
('self-adhesive-jumbo-rolls', 'product.jumbo-1', 'product', '4:3', 'high', '不干胶大卷产品图'),

('self-adhesive-sheets', 'hero', 'hero', '16:9', 'low', '不干胶平张banner'),
('self-adhesive-sheets', 'product.sheet-1', 'product', '4:3', 'medium', '不干胶平张产品图'),

('ncr-jumbo-rolls', 'hero', 'hero', '16:9', 'medium', 'NCR jumbo banner'),
('ncr-jumbo-rolls', 'product.jumbo-1', 'product', '4:3', 'high', 'NCR大卷产品图'),

('ncr-sheets', 'hero', 'hero', '16:9', 'low', 'NCR平张banner'),
('ncr-sheets', 'product.sheet-1', 'product', '4:3', 'medium', 'NCR平张产品图');

-- ============================================
-- 8. 应用场景 - /applications
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('applications', 'hero', 'hero', '16:9', 'medium', '应用场景overview banner'),
('applications', 'industry.tender', 'industry', '4:3', 'high', '政府投标场景缩略图'),
('applications', 'industry.retail', 'industry', '4:3', 'medium', '零售POS场景缩略图'),
('applications', 'industry.logistics', 'industry', '4:3', 'medium', '物流仓储场景缩略图'),
('applications', 'industry.finance', 'industry', '4:3', 'low', '银行金融场景缩略图');

-- ============================================
-- 9. 政府投标专题页 - /applications/government-tenders (最重要！)
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('government-tenders', 'hero', 'hero', '16:9', 'high', '政府投标专题主banner - 建议使用庄重的工厂外景'),
('government-tenders', 'trust.factory-exterior', 'factory', '16:9', 'high', '工厂外景 - 展示规模'),
('government-tenders', 'trust.workshop', 'factory', '16:9', 'high', '生产车间 - 展示设备'),
('government-tenders', 'trust.container-loading', 'factory', '4:3', 'high', '装柜现场 - 展示供货能力'),
('government-tenders', 'proof.certificate-1', 'banner', '4:3', 'high', '资质证书1 - ISO等'),
('government-tenders', 'proof.certificate-2', 'banner', '4:3', 'medium', '资质证书2'),
('government-tenders', 'proof.certificate-3', 'banner', '4:3', 'medium', '资质证书3'),
('government-tenders', 'products.thermal-for-gov', 'product', '1:1', 'medium', '热敏纸政采版产品图'),
('government-tenders', 'products.ncr-for-gov', 'product', '1:1', 'medium', 'NCR政采版产品图'),
('government-tenders', 'cases.tender-1', 'banner', '16:9', 'low', '中标案例展示1（可选）');

-- ============================================
-- 10. 生产制造 - /manufacturing
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('manufacturing', 'hero', 'hero', '16:9', 'high', '生产制造主banner - 工厂全景鸟瞰图'),
('manufacturing', 'factory.exterior', 'factory', '16:9', 'high', '工厂外景 - 白天全景'),
('manufacturing', 'factory.entrance', 'factory', '16:9', 'medium', '工厂大门/入口'),
('manufacturing', 'workshop.overview', 'factory', '16:9', 'high', '车间全景 - 展示生产区域'),
('manufacturing', 'workshop.workers', 'factory', '16:9', 'medium', '工人操作场景'),
('manufacturing', 'production.line-1', 'factory', '4:3', 'high', '生产线1 - 分切机'),
('manufacturing', 'production.line-2', 'factory', '4:3', 'high', '生产线2 - 复卷机'),
('manufacturing', 'production.line-3', 'factory', '4:3', 'medium', '生产线3 - 涂布机'),
('manufacturing', 'production.coating', 'factory', '4:3', 'medium', '热敏涂布设备'),
('manufacturing', 'quality.lab', 'factory', '4:3', 'medium', '质检实验室'),
('manufacturing', 'quality.testing', 'factory', '4:3', 'medium', '质量检测过程'),
('manufacturing', 'quality.inspector', 'factory', '4:3', 'low', '质检员工作照'),
('manufacturing', 'warehouse.raw-materials', 'factory', '16:9', 'medium', '原材料仓库'),
('manufacturing', 'warehouse.finished-goods', 'factory', '16:9', 'medium', '成品仓库'),
('manufacturing', 'shipping.packaging', 'factory', '4:3', 'medium', '包装打包区域'),
('manufacturing', 'shipping.container-1', 'factory', '4:3', 'high', '装柜现场1 - 正在装货'),
('manufacturing', 'shipping.container-2', 'factory', '4:3', 'high', '装柜现场2 - 货物堆码'),
('manufacturing', 'shipping.forklift', 'factory', '4:3', 'medium', '叉车搬运场景');

-- ============================================
-- 11. 关于我们 - /about
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('about', 'hero', 'hero', '16:9', 'medium', '关于我们banner - 企业形象照'),
('about', 'company.building', 'factory', '16:9', 'medium', '公司办公楼'),
('about', 'team.management', 'banner', '16:9', 'low', '管理团队合影（可选）'),
('about', 'history.timeline', 'banner', '16:9', 'low', '企业发展历程图（可选）');

-- ============================================
-- 12. 联系我们 - /contact
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('contact', 'hero', 'banner', '16:9', 'low', '联系我们banner（可选）'),
('contact', 'location.map', 'banner', '16:9', 'medium', '公司位置地图截图');

-- ============================================
-- 13. 投标资料包申请页 - /request-tender-pack
-- ============================================
INSERT INTO placeholders (page_key, section_key, placeholder_type, required_ratio, priority, description) VALUES
('request-tender-pack', 'hero', 'hero', '16:9', 'medium', '投标资料包页面banner'),
('request-tender-pack', 'preview.cover', 'banner', '4:3', 'medium', '资料包封面预览图'),
('request-tender-pack', 'preview.sample', 'banner', '4:3', 'low', '资料包内页示例');

-- ============================================
-- 总计统计
-- ============================================
-- 首页: 10个
-- 产品中心: 3个
-- 热敏纸卷: 9个
-- 热敏标签: 8个
-- NCR系列: 7个
-- 原材料供应: 6个
-- Jumbo详情页: 10个
-- 应用场景: 5个
-- 政府投标: 10个（重点！）
-- 生产制造: 18个（最多！）
-- 关于我们: 4个
-- 联系我们: 2个
-- 投标资料包: 3个
-- --------------------------------
-- 总计: 约95个占位符

-- 优先级分布：
-- high: 约45个（需要优先替换）
-- medium: 约35个（次要）
-- low: 约15个（可选）
```

---

## 🎨 图片准备建议

### 高优先级图片（必须准备）
1. **工厂实力类** (约15张)
   - 工厂外景全景（鸟瞰或正面）
   - 生产车间全景（至少2-3个角度）
   - 主要生产线特写（分切、复卷、涂布）
   - 装柜实拍（至少3-5张，不同角度）
   - 仓库库存照片

2. **产品图类** (约10张)
   - 热敏纸卷白底产品图（至少2-3款）
   - 热敏标签白底产品图（至少2-3款）
   - NCR表格套装产品图（至少2-3款）
   - 各种jumbo大卷产品图

3. **资质证书类** (约5张)
   - ISO质量体系证书
   - 环保认证
   - 其他行业资质证书

### 中优先级图片（建议准备）
- 质检实验室照片
- 包装打包区域
- 叉车搬运场景
- 不同规格产品对比图

### 低优先级图片（可选）
- 团队合影
- 办公环境
- 企业文化照片
- 应用场景示意图

---

## 📐 图片规格建议

### Banner类（16:9）
- 推荐尺寸：1920x1080px 或 1600x900px
- 格式：JPG（质量85-90%）
- 文件大小：控制在200-500KB

### 产品图（1:1或4:3）
- 推荐尺寸：1000x1000px 或 1200x900px
- 格式：JPG（白底产品图）或PNG（需要透明背景）
- 文件大小：控制在100-300KB

### 证书类（4:3）
- 推荐尺寸：1200x900px
- 格式：JPG或PNG
- 文件大小：控制在200-400KB

---

## 🚀 使用流程

### Step 1: 运行SQL
将上面的SQL语句复制到Supabase SQL Editor执行

### Step 2: 检查结果
```sql
-- 查看所有占位符
SELECT page_key, COUNT(*) as count
FROM placeholders
GROUP BY page_key
ORDER BY count DESC;

-- 查看high priority的占位符
SELECT page_key, section_key, description
FROM placeholders
WHERE priority = 'high'
ORDER BY page_key, section_key;
```

### Step 3: 开始替换
1. 访问 https://xadyz.com/admin/assets 上传图片
2. 访问 https://xadyz.com/admin/placeholders 绑定图片
3. 按priority从high到low逐步替换

---

## 💡 小贴士

### 命名建议
上传资产时使用清晰的文件名，例如：
- `factory-exterior-aerial-view.jpg`
- `thermal-paper-roll-80mm.jpg`
- `container-loading-scene-1.jpg`
- `iso-certificate-2024.jpg`

### 批量操作
如果有很多图片，可以：
1. 先统一上传到Assets库
2. 设置正确的asset_type
3. 批量Approve
4. 然后逐个绑定到Placeholders

### 图片优化
- 使用TinyPNG等工具压缩图片
- 保持清���度的同时控制文件大小
- 16:9的banner不要超过500KB
- 产品图不要超过300KB
