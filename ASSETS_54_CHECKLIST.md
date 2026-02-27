# 志信纸业 - 后台54个素材清单与检查报告

## 📋 素材需求清单（总计54张）

### 🏭 **1. 工厂与生产类（12张）**

#### **工厂外观与设施（4张）**
- [ ] `factory-exterior-01.jpg` - 工厂外观全景
- [ ] `factory-exterior-02.jpg` - 工厂大门/logo墙
- [ ] `factory-warehouse-01.jpg` - 仓库存储区
- [ ] `factory-loading-dock-01.jpg` - 装卸码头/物流区

#### **生产线与车间（5张）**
- [ ] `production-line-thermal-paper-01.jpg` - 热敏纸生产线
- [ ] `production-line-thermal-labels-01.jpg` - 热敏标签生产线
- [ ] `production-line-ncr-forms-01.jpg` - NCR表格生产线
- [ ] `workshop-converting-01.jpg` - 分切车间
- [ ] `workshop-packaging-01.jpg` - 包装车间

#### **质量控制（3张）**
- [ ] `quality-lab-01.jpg` - 质检实验室
- [ ] `quality-testing-01.jpg` - 产品测试场景
- [ ] `quality-equipment-01.jpg` - 检测设备

---

### 📦 **2. 产品展示类（18张）**

#### **热敏纸卷（6张）**
- [ ] `thermal-paper-rolls-overview.jpg` - 热敏纸卷产品组合
- [ ] `thermal-paper-blank-closeup.jpg` - 空白热敏纸特写
- [ ] `thermal-paper-printed-sample.jpg` - 印刷热敏纸样品
- [ ] `pos-thermal-paper-in-use.jpg` - POS热敏纸使用场景
- [ ] `atm-thermal-paper-rolls.jpg` - ATM热敏纸
- [ ] `bpa-free-thermal-paper.jpg` - 无BPA热敏纸（带环保标识）

#### **热敏标签（6张）**
- [ ] `thermal-labels-rolls-overview.jpg` - 热敏标签卷组合
- [ ] `thermal-labels-blank.jpg` - 空白热敏标签
- [ ] `thermal-labels-printed-sample.jpg` - 印刷热敏标签样品
- [ ] `shipping-labels-4x6.jpg` - 4x6运输标签
- [ ] `logistics-labels-a6.jpg` - A6物流标签
- [ ] `barcode-labels-in-use.jpg` - 条码标签使用场景

#### **NCR表格（6张）**
- [ ] `ncr-forms-overview.jpg` - NCR表格产品组合
- [ ] `ncr-forms-blank-2part.jpg` - 2联空白NCR表格
- [ ] `ncr-forms-blank-3part.jpg` - 3联空白NCR表格
- [ ] `ncr-forms-printed-invoice.jpg` - 印刷发票NCR表格
- [ ] `ncr-forms-printed-receipt.jpg` - 印刷收据NCR表格
- [ ] `ncr-forms-continuous-feed.jpg` - 连续式NCR表格

---

### 🎯 **3. 原材料类（8张）**

#### **热敏Jumbo大卷（2张）**
- [ ] `thermal-jumbo-rolls-warehouse.jpg` - 热敏Jumbo仓库库存
- [ ] `thermal-jumbo-rolls-detail.jpg` - 热敏Jumbo细节特写

#### **不干胶材料（3张）**
- [ ] `self-adhesive-jumbo-rolls.jpg` - 不干胶Jumbo卷
- [ ] `self-adhesive-sheets-stacked.jpg` - 不干胶平张堆叠
- [ ] `self-adhesive-materials-variety.jpg` - 不干胶材料种类

#### **NCR纸材料（3张）**
- [ ] `ncr-jumbo-rolls-warehouse.jpg` - NCR Jumbo仓库库存
- [ ] `ncr-sheets-reams.jpg` - NCR平张包装
- [ ] `ncr-paper-colors.jpg` - NCR纸多色展示（白/黄/粉）

---

### 🏢 **4. 应用场景类（8张）**

#### **行业应用（6张）**
- [ ] `application-retail-pos.jpg` - 零售POS收银场景
- [ ] `application-logistics-warehouse.jpg` - 物流仓储标签应用
- [ ] `application-supermarket-labels.jpg` - 超市价签/标签
- [ ] `application-banking-atm.jpg` - 银行ATM凭条
- [ ] `application-government-tender.jpg` - 政府投标文件
- [ ] `application-healthcare-labels.jpg` - 医疗标签应用

#### **产品使用场景（2张）**
- [ ] `product-in-use-shipping.jpg` - 运输标签贴在包裹上
- [ ] `product-in-use-printing.jpg` - 打印机出纸场景

---

### 🎨 **5. Banner横幅类（6张）**

#### **Hero Banner大图（4张）**
- [ ] `hero-banner-home.jpg` - 首页主横幅（1920x1080）
- [ ] `hero-banner-products.jpg` - 产品页横幅（1920x600）
- [ ] `hero-banner-manufacturing.jpg` - 生产制造页横幅（1920x600）
- [ ] `hero-banner-contact.jpg` - 联系页横幅（1920x500）

#### **内容背景图（2张）**
- [ ] `cta-background-inquiry.jpg` - CTA行动号召背景
- [ ] `section-background-certifications.jpg` - 认证区域背景

---

### 📄 **6. 证书与文档类（2份）**

- [ ] `certificate-iso-9001.pdf` - ISO 9001质量管理体系认证
- [ ] `certificate-fsc.pdf` - FSC森林认证

---

## ✅ **素材管理系统功能**

### **1. 上传功能**
- ✅ 支持多文件批量上传
- ✅ 支持图片、PDF、文档格式
- ✅ 自动根据文件名智能分类
- ✅ 自动上传到Supabase Storage
- ✅ 自动记录上传者和时间

### **2. 分类管理**
- ✅ 6大类别：banner、factory、product、material、doc、other
- ✅ 可手动更改素材分类
- ✅ 支持标签系统（tags数组）

### **3. 审核工作流**
- ✅ 三种状态：待审核(pending)、已批准(approved)、已拒绝(rejected)
- ✅ 一键批准/取消批准
- ✅ 记录批准者ID
- ✅ 状态颜色标识（绿色/黄色/红色）

### **4. 搜索与筛选**
- ✅ 关键词搜索（文件名、分类、标签）
- ✅ 按分类筛选
- ✅ 按状态筛选
- ✅ 实时计数显示

### **5. 元数据展示**
- ✅ 文件名
- ✅ 文件大小（KB）
- ✅ 上传日期
- ✅ 当前分类
- ✅ 审核状态
- ✅ 图片预览（image类型）

---

## 🔧 **后台素材操作指南**

### **步骤1：访问素材库**
```
访问路径：https://xadyz.com/admin/assets
或：https://xadyz.com → 登录后台 → 素材库
```

### **步骤2：上传素材**
1. 点击上传区域或拖拽文件
2. 支持同时上传多个文件
3. 系统自动智能分类（可后续调整）
4. 上传后自动显示为"待审核"状态

### **步骤3：管理素材**
- **修改分类**：在下拉菜单中选择新分类
- **批准素材**：点击绿色 ✓ 按钮
- **取消批准**：点击橙色 ✗ 按钮
- **搜索素材**：输入关键词实时搜索
- **筛选素材**：使用分类和状态筛选器

### **步骤4：素材命名规范**
```
建议格式：{类型}-{描述}-{序号}.{扩展名}

✅ 好的命名：
- factory-exterior-01.jpg
- thermal-paper-blank-closeup.jpg
- hero-banner-home.jpg

❌ 不好的命名：
- IMG_1234.jpg
- 微信图片_20260203.jpg
- 新建文件夹 (1).jpg
```

---

## 📊 **当前素材状态检查**

### **需要在Supabase后台检查：**

```sql
-- 检查素材总数
SELECT COUNT(*) as total_assets FROM assets;

-- 按分类统计
SELECT category, COUNT(*) as count 
FROM assets 
GROUP BY category;

-- 按状态统计
SELECT status, COUNT(*) as count 
FROM assets 
GROUP BY status;

-- 最近上传的素材
SELECT file_name, category, status, created_at 
FROM assets 
ORDER BY created_at DESC 
LIMIT 10;
```

### **预期结果（54个素材的理想分布）**
```
分类统计：
- banner: 6 个
- factory: 12 个
- product: 18 个
- material: 8 个
- doc: 2 个
- other: 8 个
总计：54 个

状态统计：
- approved: 40-50 个（已批准可用）
- pending: 2-10 个（待审核）
- rejected: 0-4 个（质量不合格）
```

---

## 🎯 **占位符与素材的关系**

### **占位符系统（Placeholders）**
- **总数**：98个占位符定义（三语言）
- **用途**：标记网站中需要真实图片的位置
- **状态**：`missing`（缺失）或 `replaced`（已替换）

### **素材库（Assets）**
- **总数**：目标54-70个实际图片文件
- **用途**：提供可用的图片资源
- **关联**：通过 `asset_id` 字段关联到占位符

### **工作流程**
```
1. 上传素材到素材库 → Assets表
2. 审核并批准素材 → status = 'approved'
3. 在占位符管理页面 → 关联素材ID
4. 占位符状态变为 → status = 'replaced'
5. 前端ImagePlaceholder组件 → 显示真实图片
```

---

## 🚀 **下一步行动建议**

### **立即检查项目：**
1. ✅ 登录后台：`https://xadyz.com/admin/login`
2. ✅ 访问素材库：点击"素材库"菜单
3. ✅ 查看当前素材总数：页面顶部显示"共 X 个素材"
4. ✅ 检查分类分布：使用分类筛选器逐个查看
5. ✅ 检查审核状态：筛选"待审核"素材并处理

### **如果素材不足54个：**
1. 准备缺失类别的图片素材
2. 按照命名规范重命名文件
3. 批量上传到素材库
4. 逐个审核并批准
5. 在占位符管理页面关联素材

### **如果已有54个素材：**
1. 确认所有素材已批准（approved状态）
2. 检查素材质量和分辨率
3. 访问占位符管理页面
4. 逐个将素材关联到对应的占位符
5. 前端访问页面验证图片显示

---

## 📞 **需要帮助？**

如果您需要我：
1. **检查具体某个分类的素材** - 告诉我分类名称
2. **生成素材上传脚本** - 帮您批量处理
3. **创建占位符关联方案** - 建立素材与页面的映射
4. **修复素材显示问题** - 调试ImagePlaceholder组件
5. **导出素材清单** - 生成Excel/CSV报表

请随时告诉我具体需求！🎨
