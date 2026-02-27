# 志信纸业 - 图片占位符完整追踪系统

## 📋 系统概述

已创建完整的占位符追踪系统，涵盖网站所有18个主要页面的**50+个图片位置**。

---

## 🗂️ 已创建的文件

### 1. `/src/admin/lib/completePlaceholdersData.ts`
- **内容**: 包含 50+ 个占位符的完整数据列表
- **覆盖**: EN/RU/ZH 三语言版本的所有主要页面
- **数据结构**:
  ```typescript
  {
    placeholder_key: 'home_hero_banner_en',
    page_path: '/en/',
    section_name: 'Hero Banner',
    element_description: 'Main hero background - Factory/Production scene',
    placeholder_type: 'hero',  // hero/product/factory/material/application/icon/other
    required_dimensions: '1920x1080',
    required_ratio: '16:9',
    status: 'missing',
    priority: 'high'  // high/medium/low
  }
  ```

### 2. `/src/admin/lib/placeholderHelpers.ts`
- **功能**: 提供3个辅助函数
  - `insertCompletePlaceholders()` - 批量插入完整占位符列表
  - `deleteAllPlaceholders()` - 删除所有占位符（有确认提示）
  - `getPlaceholderStats()` - 获取占位符统计信息

### 3. 已更新 `/src/admin/app/routes/dashboard.tsx`
- 在控制台页面添加了"插入完整占位符"按钮
- 可以一键批量导入所有占位符

### 4. 已更新 `/src/admin/app/routes/placeholders/index.tsx`
- 修复了默认过滤器（从'missing'改为'all'）
- 添加了"重置所有状态为缺失"按钮
- 完善了权限系统

---

## 📊 占位符分类统计

### 按页面分类：
1. **首页 (Home)** - 3语言 × 1张 = 3个占位符
2. **产品页 (Products)**:
   - 热敏纸卷 (Thermal Paper Rolls) - 6种子类型 × 3语言 = 18个
   - 热敏标签 (Thermal Labels) - 5种子类型 × 3语言 = 15个
   - NCR表单 (NCR Forms) - 3种子类型 × 3语言 = 9个
3. **原料供应 (Material Supply)** - 5种产品 × 3语言 = 15个
4. **应用场景 (Applications)** - 2个页面 × 3语言 = 6个
5. **生产制造 (Manufacturing)** - 4个场景 × 3语言 = 12个
6. **关于/联系页面** - 2个页面 × 3语言 = 6个
7. **全局资源 (Global)** - 2个（Logo + Favicon）

**总计**: 约 **50+ 个占位符**

### 按类型分类：
- **hero** (英雄横幅) - 高优先级，1920x1080
- **product** (产品图) - 高/中优先级，各种尺寸
- **factory** (工厂图) - 高优先级，展示生产线
- **material** (原料图) - 中/高优先级，仓库场景
- **application** (应用场景) - 中优先级，行业应用
- **icon** (图标/Logo) - 高优先级，小尺寸
- **other** (其他) - 低/中优先级

---

## 🚀 使用指南

### 步骤1: 清空旧数据
1. 打开Admin后台控制台 (`/admin`)
2. 点击"删除所有占位符"按钮
3. 确认删除操作

### 步骤2: 导入完整占位符列表
1. 点击"插入完整占位符"按钮
2. 等待批量插入完成（会显示进度）
3. 成功后会显示插入的数量

### 步骤3: 查看占位符列表
1. 进入"占位符"页面 (`/admin/placeholders`)
2. 应该能看到50+个占位符
3. 默认显示所有状态（可按页面、状态筛选）

### 步骤4: 绑定素材
1. 确保素材库中有已批准的图片
2. 点击任意占位符的"绑定素材"按钮
3. 从弹窗中选择合适的图片
4. 绑定成功后，状态会从"missing"变为"replaced"

---

## 🔍 页面图片位置详细说明

### 重要页面及其图片需求：

#### 1. 首页 (`/en/`, `/ru/`, `/zh/`)
- **Hero Banner** (1920x1080) - 工厂外观或生产线全景
- ⭐ 优先级: HIGH

#### 2. 热敏纸卷产品页 (`/en/thermal-paper-rolls`)
- **主图** (1600x900) - 热敏纸卷产品展示
- **Blank空白卷** (800x600) - 纯白色热敏纸
- **Printed印刷卷** (800x600) - 带Logo的定制热敏纸
- **POS收银纸** (800x600) - POS机使用场景
- **ATM纸** (800x600) - ATM机热敏纸
- **BPA-Free** (800x600) - 环保认证标识
- ⭐ 优先级: HIGH (主图), MEDIUM (子类型)

#### 3. 热敏标签页 (`/en/thermal-labels`)
- **主图** (1600x900) - 标签卷产品
- **4x6物流标签** (800x600) - 快递面单
- **A6标签** (800x600) - 仓储标签
- ⭐ 优先级: HIGH (主图), MEDIUM (子类型)

#### 4. NCR表单页 (`/en/ncr-forms`)
- **主图** (1600x900) - NCR无碳复写纸
- **Blank空白** (800x600) - 空白表单
- **Printed印刷** (800x600) - 定制表单
- ⭐ 优先级: HIGH

#### 5. 原料供应页 (`/en/material-supply/*`)
- **Thermal Jumbo Rolls** (1200x800) - 热敏大卷仓库图
- **Self-Adhesive Jumbo** (1200x800) - 不干胶大卷
- **NCR Jumbo** (1200x800) - NCR大卷
- ⭐ 优先级: HIGH

#### 6. 生产制造页 (`/en/manufacturing`)
- **Factory Exterior** (1200x800) - 工厂建筑外观
- **Production Lines** (1200x800) - 生产线机器运行
- **Quality Control** (1200x800) - 质检实验室
- ⭐ 优先级: HIGH

#### 7. 全局资源
- **Company Logo** (200x60) - 志信纸业Logo
- **Favicon** (32x32) - 网站图标
- ⭐ 优先级: HIGH

---

## 🎨 素材要求标准

### 图片规格：
- **Hero横幅**: 1920x1080, 16:9, 高质量
- **产品图**: 800x600 或 1600x900, 4:3或16:9
- **工厂图**: 1200x800, 3:2, 真实工厂照片
- **Logo**: 200x60, 透明背景PNG

### 内容要求：
- ✅ 真实工厂/产品照片（不要库存图）
- ✅ 专业拍摄，光线充足
- ✅ 符合尺寸比例要求
- ✅ 文件大小 < 2MB
- ❌ 不要使用Unsplash等通用库存图

---

## 💡 下一步建议

1. **准备真实素材**: 收集工厂照片、产品图片
2. **批量上传**: 使用素材库功能上传所有图片
3. **审批素材**: 设置status为'approved'
4. **逐个绑定**: 按优先级绑定占位符
5. **验证网站**: 确保前台页面图片显示正常

---

## ⚠️ 注意事项

1. **不要修改文案**: 只更新图片，保持现有文字内容不变
2. **三语言共享**: EN/RU/ZH可以使用相同的图片（产品图、工厂图等）
3. **优先级顺序**: 
   - 先处理 HIGH 优先级（首页、主产品页）
   - 再处理 MEDIUM 优先级（子页面）
   - 最后处理 LOW 优先级（细分页面）

---

## 📞 技术支持

如有问题，请检查：
1. 浏览器控制台 (F12) 查看错误信息
2. Supabase数据库中的placeholders表
3. 确保用户角色权限正确（Owner或Admin）

---

✅ **系统已就绪！请按上述步骤操作。**
