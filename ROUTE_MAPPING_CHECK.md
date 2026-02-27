# 路由映射检查表

## 📍 后台占位符路径 vs 实际网站路由

### ✅ 应该在后台显示的路径（21个）：

#### 英文版 (EN) - 7个
1. `/en/manufacturing` - 生产制造页
2. `/en/material-supply/thermal-jumbo-rolls` - 热敏大卷
3. `/en/material-supply/self-adhesive-jumbo-rolls` - 不干胶大卷
4. `/en/material-supply/self-adhesive-sheets` - 不干胶页材
5. `/en/material-supply/ncr-jumbo-rolls` - NCR大卷
6. `/en/material-supply/ncr-sheets` - NCR页材
7. `/en/` - 首页（可选，已有图片）

#### 俄文版 (RU) - 7个
1. `/ru/manufacturing`
2. `/ru/material-supply/thermal-jumbo-rolls`
3. `/ru/material-supply/self-adhesive-jumbo-rolls`
4. `/ru/material-supply/self-adhesive-sheets`
5. `/ru/material-supply/ncr-jumbo-rolls`
6. `/ru/material-supply/ncr-sheets`
7. `/ru/` - 首页（可选）

#### 中文版 (ZH) - 7个
1. `/zh/manufacturing`
2. `/zh/material-supply/thermal-jumbo-rolls`
3. `/zh/material-supply/self-adhesive-jumbo-rolls`
4. `/zh/material-supply/self-adhesive-sheets`
5. `/zh/material-supply/ncr-jumbo-rolls`
6. `/zh/material-supply/ncr-sheets`
7. `/zh/` - 首页（可选）

---

## ⚠️ 可能的问题

### 1. 路径格式问题
- ❌ 错误：`/manufacturing`（缺少语言前缀）
- ✅ 正确：`/en/manufacturing`, `/ru/manufacturing`, `/zh/manufacturing`

### 2. 大小写问题
- ❌ 错误：`/en/Manufacturing` 或 `/EN/manufacturing`
- ✅ 正确：全小写

### 3. 斜杠问题
- ❌ 错误：`en/manufacturing` 或 `/en/manufacturing/`
- ✅ 正确：`/en/manufacturing`（前面有斜杠，后面无斜杠）

---

## 🔍 请检查后台实际显示的路径

在 `/admin/placeholders` 页面，检查以下字段：

### Page Path (页面路径)列
应该显示类似：
```
/en/manufacturing
/en/material-supply/thermal-jumbo-rolls
/ru/manufacturing
...
```

### 如果显示错误，可能是：
1. `/manufacturing`（缺少语言前缀）
2. `//en/manufacturing`（双斜杠）
3. 其他格式错误

---

## 🛠️ 如何验证

在后台占位符页面，筛选器输入：
- `/en/` - 应该显示7个英文占位符
- `/ru/` - 应该显示7个俄文占位符
- `/zh/` - 应该显示7个中文占位符
- `/manufacturing` - 应该显示3个（en/ru/zh）
- `/material-supply/thermal-jumbo-rolls` - 应该显示3个

---

## 📸 请截图给我看

1. 占位符列表页面（显示所有21个）
2. Page Path列的具体内容
3. 任意一个占位符的详细信息

这样我能准确判断问题所在！
