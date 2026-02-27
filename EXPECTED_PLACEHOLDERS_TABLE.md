# 📋 后台占位符完整对照表

## ✅ 应该显示的21个占位符

| # | Placeholder Key | Page Path | Section Name | Type | Priority | Status |
|---|----------------|-----------|--------------|------|----------|--------|
| 1 | `manufacturing_hero_en` | `/en/manufacturing` | Hero Section | hero | high | missing |
| 2 | `manufacturing_hero_ru` | `/ru/manufacturing` | Hero Section | hero | high | missing |
| 3 | `manufacturing_hero_zh` | `/zh/manufacturing` | Hero Section | hero | high | missing |
| 4 | `thermal_jumbo_rolls_en` | `/en/material-supply/thermal-jumbo-rolls` | Product Image | product | high | missing |
| 5 | `thermal_jumbo_rolls_ru` | `/ru/material-supply/thermal-jumbo-rolls` | Product Image | product | high | missing |
| 6 | `thermal_jumbo_rolls_zh` | `/zh/material-supply/thermal-jumbo-rolls` | Product Image | product | high | missing |
| 7 | `self_adhesive_jumbo_rolls_en` | `/en/material-supply/self-adhesive-jumbo-rolls` | Product Image | product | high | missing |
| 8 | `self_adhesive_jumbo_rolls_ru` | `/ru/material-supply/self-adhesive-jumbo-rolls` | Product Image | product | high | missing |
| 9 | `self_adhesive_jumbo_rolls_zh` | `/zh/material-supply/self-adhesive-jumbo-rolls` | Product Image | product | high | missing |
| 10 | `self_adhesive_sheets_en` | `/en/material-supply/self-adhesive-sheets` | Product Image | product | medium | missing |
| 11 | `self_adhesive_sheets_ru` | `/ru/material-supply/self-adhesive-sheets` | Product Image | product | medium | missing |
| 12 | `self_adhesive_sheets_zh` | `/zh/material-supply/self-adhesive-sheets` | Product Image | product | medium | missing |
| 13 | `ncr_jumbo_rolls_en` | `/en/material-supply/ncr-jumbo-rolls` | Product Image | product | high | missing |
| 14 | `ncr_jumbo_rolls_ru` | `/ru/material-supply/ncr-jumbo-rolls` | Product Image | product | high | missing |
| 15 | `ncr_jumbo_rolls_zh` | `/zh/material-supply/ncr-jumbo-rolls` | Product Image | product | high | missing |
| 16 | `ncr_sheets_en` | `/en/material-supply/ncr-sheets` | Product Image | product | medium | missing |
| 17 | `ncr_sheets_ru` | `/ru/material-supply/ncr-sheets` | Product Image | product | medium | missing |
| 18 | `ncr_sheets_zh` | `/zh/material-supply/ncr-sheets` | Product Image | product | medium | missing |

**总计：18个占位符**（不是21个，因为首页已有图片）

---

## 🔍 快速验证方法

### 1. 按语言筛选
在后台占位符页面的搜索框输入：
- **`/en/`** → 应该显示 6个
- **`/ru/`** → 应该显示 6个
- **`/zh/`** → 应该显示 6个

### 2. 按页面筛选
- **`/manufacturing`** → 应该显示 3个（en/ru/zh）
- **`/material-supply/thermal-jumbo`** → 应该显示 3个
- **`/material-supply/ncr`** → 应该显示 6个（ncr-jumbo + ncr-sheets）

### 3. 按优先级筛选
- **high** → 应该显示 15个（manufacturing × 3 + 4种产品 × 3语言）
- **medium** → 应该显示 6个（2种sheets × 3语言）

---

## 🎯 对应的网站页面

### 这些页面访问时能看到ImagePlaceholder：

1. **生产制造页面**
   - https://xadyz.com/en/manufacturing
   - https://xadyz.com/ru/manufacturing
   - https://xadyz.com/zh/manufacturing

2. **热敏大卷页面**
   - https://xadyz.com/en/material-supply/thermal-jumbo-rolls
   - https://xadyz.com/ru/material-supply/thermal-jumbo-rolls
   - https://xadyz.com/zh/material-supply/thermal-jumbo-rolls

3. **不干胶大卷页面**
   - https://xadyz.com/en/material-supply/self-adhesive-jumbo-rolls
   - https://xadyz.com/ru/material-supply/self-adhesive-jumbo-rolls
   - https://xadyz.com/zh/material-supply/self-adhesive-jumbo-rolls

4. **不干胶页材页面**
   - https://xadyz.com/en/material-supply/self-adhesive-sheets
   - https://xadyz.com/ru/material-supply/self-adhesive-sheets
   - https://xadyz.com/zh/material-supply/self-adhesive-sheets

5. **NCR大卷页面**
   - https://xadyz.com/en/material-supply/ncr-jumbo-rolls
   - https://xadyz.com/ru/material-supply/ncr-jumbo-rolls
   - https://xadyz.com/zh/material-supply/ncr-jumbo-rolls

6. **NCR页材页面**
   - https://xadyz.com/en/material-supply/ncr-sheets
   - https://xadyz.com/ru/material-supply/ncr-sheets
   - https://xadyz.com/zh/material-supply/ncr-sheets

---

## ❌ 这些页面不应该出现在占位符列表中

- `/en/` 或 `/en/products` （产品目录）
- `/en/thermal-paper-rolls` （产品详情页）
- `/en/thermal-labels` （产品详情页）
- `/en/ncr-forms` （产品详情页）
- `/en/about` （关于页面）
- `/en/contact` （联系页面）
- 任何其他路径

---

## 🛠️ 修复步骤

如果后台显示的不对，请按以下步骤操作：

### 步骤1：删除所有旧占位符
```
进入 /admin 控制台
点击"删除所有占位符"按钮
确认删除
```

### 步骤2：插入新的占位符
```
点击"插入完整占位符"按钮
等待提示：成功插入 18 条占位符！
```

### 步骤3：验证结果
```
进入 /admin/placeholders
检查总数是否为 18个
检查路径格式是否正确（/en/, /ru/, /zh/ 开头）
```

---

## 📸 需要截图的内容

1. 占位符列表全貌（显示18个）
2. Page Path 列的内容（确认路径格式）
3. 筛选 `/en/manufacturing` 的结果（应该只有1个）
4. 筛选 `/en/material-supply/` 的结果（应该有5个）

这样我就能准确判断问题在哪里！🔍
