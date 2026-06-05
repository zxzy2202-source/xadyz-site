# 📸 Hero Banner 占位符更新指南

## ✅ 已完成的工作

已为6个页面的全屏Hero Banner添加了**18个新占位符**（EN/RU/ZH各6个）到后台数据文件：

### 📋 新增占位符清单

| 页面 | 英文路径 | 占位符Key (EN) | 占位符Key (RU) | 占位符Key (ZH) |
|------|---------|---------------|---------------|---------------|
| **产品总览页** | `/en/products` | `products_hero_banner_en` | `products_hero_banner_ru` | `products_hero_banner_zh` |
| **热敏纸页** | `/en/products/thermal-paper` | `thermal_paper_hero_banner_en` | `thermal_paper_hero_banner_ru` | `thermal_paper_hero_banner_zh` |
| **热敏标签页** | `/en/products/thermal-labels` | `thermal_labels_hero_banner_en` | `thermal_labels_hero_banner_ru` | `thermal_labels_hero_banner_zh` |
| **NCR表格页** | `/en/products/ncr-forms` | `ncr_forms_hero_banner_en` | `ncr_forms_hero_banner_ru` | `ncr_forms_hero_banner_zh` |
| **应用场景页** | `/en/applications` | `applications_overview_hero_banner_en` | `applications_overview_hero_banner_ru` | `applications_overview_hero_banner_zh` |
| **原材料供应页** | `/en/material-supply` | `material_supply_hero_banner_en` | `material_supply_hero_banner_ru` | `material_supply_hero_banner_zh` |

---

## 🎨 占位符规格统一标准

所有新增的Hero Banner占位符使用以下统一规格：

| 属性 | 值 |
|------|-----|
| **占位符类型** | `product` |
| **尺寸要求** | `2100x900` |
| **宽高比** | `21:9` |
| **优先级** | `high` |
| **状态** | `missing` |

---

## 🚀 下一步操作步骤

### 步骤 1: 更新数据库占位符

访问后台管理系统的Dashboard页面：

```
https://你的域名.com/admin/dashboard
```

#### 方法A：使用UI界面（推荐）

1. 登录Admin后台
2. 前往 **Dashboard** 页面
3. 找到 **"数据管理"** 卡片
4. 点击 **"🔄 完整重置占位符数据"** 按钮
5. 确认操作，系统会：
   - 清空现有占位符
   - 插入最新的完整占位符列表（包含新增的18个）
6. 查看统计信息确认总数更新

#### 方法B：使用浏览器控制台

```javascript
// 打开浏览器控制台 (F12)
// 导入helper函数
import { insertCompletePlaceholders } from '@/admin/lib/placeholderHelpers';

// 执行插入
const result = await insertCompletePlaceholders();
console.log(result);
```

---

### 步骤 2: 准备真实产品图片

为每个页面准备21:9宽屏比例的高质量产品图片：

#### 📸 拍摄/收集建议

| 页面 | 图片内容建议 | 拍摄要点 |
|------|-------------|---------|
| **产品总览页** | 多种产品陈列、工厂生产线 | 展示产品多样性，专业感 |
| **热敏纸页** | POS机卷纸、收据纸成品 | 突出白色纸卷质感 |
| **热敏标签页** | 物流标签卷、条码标签应用场景 | 强调物流仓储场景 |
| **NCR表格页** | 多联表格叠放、办公场景 | 展示多层复写效果 |
| **应用场景页** | 多行业应用蒙太奇 | 突出行业解决方案 |
| **原材料供应页** | Jumbo大卷仓库、原材料 | 强调大批量供应能力 |

#### 🎯 图片规格要求

- **分辨率**: 至少 `2100x900` 像素
- **宽高比**: 严格 `21:9`
- **格式**: JPG 或 PNG
- **文件大小**: 建议 < 500KB (需压缩优化)
- **色调**: 建议深色或中性色背景，确保白色文字清晰

---

### 步骤 3: 上传图片到素材库

1. 登录Admin后台
2. 前往 **素材库 (Assets)** 页面
3. 点击 **"📤 上传素材"** 按钮
4. 上传准备好的6张Hero Banner图片
5. 为每张图片填写：
   - **文件名**: 使用描述性命名，如 `hero-products-overview.jpg`
   - **Alt文本**: 英文描述，如 "Product range showcase"
   - **类型**: 选择 `产品图片`
   - **标签**: 添加 `hero`, `banner`, 对应产品名称
6. 点击 **"提交审核"**
7. 管理员审核通过后，素材状态变为 `approved`

---

### 步骤 4: 绑定占位符与素材

1. 前往 **占位符管理 (Placeholders)** 页面
2. 使用筛选器找到新增的Hero Banner占位符：
   - 筛选 **状态**: `missing`
   - 筛选 **优先级**: `high`
   - 搜索关键词: `hero_banner`
3. 对每个占位符：
   - 点击 **"绑定素材"** 按钮
   - 从下拉列表选择对应的已审核素材
   - 点击 **"确认绑定"**
4. 绑定后，占位符状态自动变为 `replaced`

---

### 步骤 5: 前台验证

访问前台页面，检查Hero Banner是否正确显示：

| 语言 | 访问路径示例 |
|------|-------------|
| 英文 | `https://xadyz.com/en/products` |
| 俄文 | `https://xadyz.com/ru/products` |
| 中文 | `https://xadyz.com/zh/products` |

#### ✅ 验证清单

- [ ] 图片完整加载，无404错误
- [ ] 宽高比正确（21:9），无拉伸变形
- [ ] 深色遮罩正常，文字清晰可读
- [ ] 响应式适配正常（手机/平板/桌面）
- [ ] 三语言版本图片一致

---

## 📊 数据统计

### 当前占位符总数

运行以下代码查看最新统计：

```javascript
import { getPlaceholderStats } from '@/admin/lib/placeholderHelpers';
const stats = await getPlaceholderStats();
console.log(stats);
```

### 预期统计数据

插入新占位符后，总数应该增加：

```
原有占位符数量: 约 ~95 个
新增占位符数量: 18 个
预期总数: ~113 个
```

---

## 🛠️ 技术细节

### 占位符数据文件位置

```
/src/admin/lib/completePlaceholdersData.ts
```

### 占位符Helper函数

```typescript
// 插入所有占位符
insertCompletePlaceholders(): Promise<{success: boolean, count: number}>

// 删除所有占位符（慎用）
deleteAllPlaceholders(): Promise<{success: boolean}>

// 获取统计信息
getPlaceholderStats(): Promise<{success: boolean, stats: object}>
```

---

## 🎯 相关页面组件

这6个页面组件已完成Hero Banner全屏设计升级：

1. `/src/app/components/ProductsPage.tsx`
2. `/src/app/components/ThermalPaperPage.tsx`
3. `/src/app/components/ThermalLabelsPage.tsx`
4. `/src/app/components/NCRFormsPage.tsx`
5. `/src/app/components/ApplicationsOverviewPage.tsx`
6. `/src/app/components/MaterialSupplyOverviewPage.tsx`

所有组件都使用 `<ImagePlaceholder>` 组件来调用占位符系统。

---

## ⚠️ 注意事项

1. **占位符Key唯一性**: 确保不重复，否则数据库插入会失败
2. **三语言一致性**: EN/RU/ZH应使用相同的素材，只是路径不同
3. **图片压缩**: 上传前务必压缩图片，确保页面加载速度
4. **备份数据**: 在执行 `deleteAllPlaceholders()` 前务必备份

---

## 📞 联系支持

如遇到问题，请检查：
- 浏览器控制台错误日志
- Supabase数据库连接状态
- 素材文件上传状态

---

**更新时间**: 2026-02-03  
**更新人员**: AI Assistant  
**版本**: v2.0 - Hero Banner 21:9 全屏设计升级
