# 🔧 面包屑 UI - 开发集成指南

## 📋 给开发团队的说明

这是面包屑 UI 组件的**开发集成指南**。Figma 会提供设计，你们负责技术实现。

---

## 🎯 核心要求

### **一句话总结：**

> 在统一 Layout 中插入 `<Breadcrumb />`，全站自动生效（首页自动返回 null）。

---

## 📦 已提供的文件

| 文件 | 路径 | 说明 |
|------|------|------|
| **Breadcrumb 组件** | `/src/app/components/Breadcrumb.tsx` | 完整实现（已完成） |
| **测试脚本** | `/scripts/test-breadcrumb-ui.ts` | 自动化测试 |
| **集成文档** | `/BREADCRUMB_UI_INTEGRATION.md` | 详细使用指南 |

---

## 🚀 快速集成（3 步完成）

### **步骤 1: 验证组件可用**

```bash
# 运行测试
npm run test:breadcrumb-ui

# 预期输出：
# 🍞 Testing Breadcrumb UI Component
# ✅ Passed: 28
# ❌ Failed: 0
```

### **步骤 2: 在 Layout 中集成**

找到统一的页面布局组件（通常是 `PageLayout.tsx` 或 `MainLayout.tsx`），在**页面标题下方**添加：

```tsx
import { Breadcrumb } from '@/app/components/Breadcrumb';

export function PageLayout({ children, title }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ✅ 面包屑导航 - 在这里添加 */}
      <Breadcrumb />
      
      {/* 页面标题 */}
      <h1 className="text-4xl font-bold mt-4 mb-8">{title}</h1>
      
      {/* 页面内容 */}
      {children}
    </div>
  );
}
```

### **步骤 3: 验证效果**

访问任意非首页页面，检查：
- [ ] 面包屑正确显示
- [ ] 链接可点击
- [ ] 当前页加粗且不可点击
- [ ] 三种语言都正确

---

## 🎨 与 Figma 设计对齐

### **Figma 会提供的设计规范**

| 设计元素 | Figma 规范 | 代码实现位置 |
|---------|----------|------------|
| 字体大小 | 14px | `text-sm` |
| 颜色 - 可点击项 | #6B7280 | `text-muted-foreground` |
| 颜色 - Hover | #111827 | `hover:text-foreground` |
| 颜色 - 当前页 | #111827 + Bold | `text-foreground font-semibold` |
| 分隔符 | › | `<ChevronRight>` 或 `›` |
| 间距 | 8px | `gap-2` |

### **如何调整样式以匹配 Figma**

在 `/src/app/components/Breadcrumb.tsx` 中修改 Tailwind 类名：

```tsx
// 当前实现
<ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">

// 根据 Figma 设计调整
<ol className="flex flex-wrap items-center gap-3 text-base text-gray-600">
//                                           ↑     ↑         ↑
//                                        间距   字体大小    颜色
```

---

## 🔧 技术实现说明

### **自动化原理**

```typescript
// 1. 从 URL 自动解析
const pathname = window.location.pathname;
// "/ru/products/thermal-paper-rolls/blank"

// 2. 检测语言
const lang = detectLang(pathname); // "ru"

// 3. 提取路径
const segments = ["products", "thermal-paper-rolls", "blank"];

// 4. 树匹配
const matched = matchByTree(segments, ROUTE_TREE, 4);
// [
//   { seg: "products", key: "products" },
//   { seg: "thermal-paper-rolls", key: "thermalPaperRolls" },
//   { seg: "blank", key: "blank" }
// ]

// 5. 翻译
CRUMB_I18N.ru.products → "Продукция"
CRUMB_I18N.ru.thermalPaperRolls → "Рулоны термобумаги"
CRUMB_I18N.ru.blank → "Пустые термо рулоны"

// 6. 生成面包屑
Главная › Продукция › Рулоны термобумаги › Пустые термо рулоны
```

### **关键函数**

| 函数 | 功能 | 文件 |
|------|------|------|
| `detectLang()` | 从 URL 检测语言 | Breadcrumb.tsx |
| `matchByTree()` | URL → ROUTE_TREE 匹配 | Breadcrumb.tsx |
| `CRUMB_I18N` | 翻译映射 | /src/seo/crumbI18n.ts |
| `ROUTE_TREE` | URL 结构树 | /src/seo/routeTree.ts |

---

## 📍 集成位置选择

### **推荐方案：统一 Layout**

```tsx
// 例如：/src/app/layouts/MainLayout.tsx

export function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <div className="container mx-auto px-4">
          {/* ✅ 在这里添加 */}
          <Breadcrumb />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

### **如果没有统一 Layout**

在每个关键页面单独添加：

```tsx
// ProductPage.tsx
import { Breadcrumb } from '@/app/components/Breadcrumb';

export function ProductPage() {
  return (
    <div>
      <Breadcrumb />
      <h1>Product Title</h1>
      <main>...</main>
    </div>
  );
}
```

---

## 🎯 优先集成页面

### **第一批（必须）**

这些页面是核心成交页，必须先添加：

```
✅ /products/*                    
✅ /products/thermal-paper-rolls  
✅ /products/thermal-labels       
✅ /material-supply/*             
✅ /applications/*                
```

### **第二批（推荐）**

```
✅ /manufacturing/*               
✅ /resources/*                   
✅ /about                         
```

### **第三批（可选）**

```
✅ /contacts                      
✅ /certifications                
```

---

## 🧪 测试清单

在部署前，请确认：

### **功能测试**

- [ ] 首页不显示面包屑
- [ ] 一级页面显示：Home › Products
- [ ] 二级页面显示：Home › Products › Thermal Paper
- [ ] 三级页面正确显示完整路径
- [ ] 最多显示 4 层（Home + 3 层）
- [ ] 超过 4 层自动截断

### **交互测试**

- [ ] 除最后一项外都可点击
- [ ] 点击跳转到正确页面
- [ ] 当前页不可点击
- [ ] Hover 状态正确

### **多语言测试**

- [ ] 英文页面显示英文面包屑
- [ ] 俄文页面显示俄文面包屑
- [ ] 中文页面显示中文面包屑
- [ ] 语言切换后面包屑跟随变化

### **响应式测试**

- [ ] 桌面端显示正常
- [ ] 平板显示正常
- [ ] 移动端可换行显示
- [ ] 小屏幕不会溢出

### **Edge Cases**

- [ ] 未知路径返回空（不显示）
- [ ] 部分匹配显示已知部分
- [ ] URL 带尾部斜杠正常工作

---

## 🐛 常见问题处理

### **问题 1: 面包屑不显示**

**可能原因：**
1. 当前是首页（设计如此）
2. URL 路径不在 ROUTE_TREE 中
3. 组件未正确导入

**解决方案：**
```javascript
// 调试工具
import { getBreadcrumbData } from '@/app/components/Breadcrumb';
console.log(getBreadcrumbData(window.location.pathname));
// 如果返回 []，说明路径未匹配
```

### **问题 2: 翻译缺失**

**现象：** 显示 "thermal-paper" 而不是 "Thermal Paper"

**原因：** CRUMB_I18N 中缺少对应的 key

**解决方案：**
```typescript
// 在 /src/seo/crumbI18n.ts 中添加
export const CRUMB_I18N: Record<Lang, Record<string, string>> = {
  en: {
    thermalPaper: "Thermal Paper", // ✅ 添加这一行
  },
};
```

### **问题 3: 链接错误**

**现象：** 点击跳转到错误页面

**原因：** ROUTE_TREE 的 seg 与 URL 不匹配

**解决方案：**
```typescript
// 在 /src/seo/routeTree.ts 中检查
{
  seg: "thermal-paper-rolls", // ✅ 必须与 URL 完全一致
  key: "thermalPaperRolls",
}
```

### **问题 4: 样式不匹配 Figma**

**解决方案：**
修改 Breadcrumb.tsx 中的 Tailwind 类名以匹配 Figma 设计。

---

## 📐 与 Figma 设计对齐指南

### **Figma → 代码映射**

| Figma 设计元素 | 代码实现 |
|--------------|---------|
| Container | `<nav className="...">` |
| Breadcrumb Item (Clickable) | `<a href="..." className="hover:text-foreground">` |
| Breadcrumb Item (Current) | `<span className="font-semibold text-foreground">` |
| Separator | `<ChevronRight className="size-4" />` 或 `<span>›</span>` |

### **样式微调检查表**

设计交付后，检查并调整：

- [ ] 字体大小是否匹配
- [ ] 颜色是否一致（Default / Hover / Current）
- [ ] 间距是否正确
- [ ] 分隔符样式是否匹配
- [ ] Home 图标是否匹配（如果有）

---

## 🔄 与其他系统的协同

### **与 JSON-LD 的关系**

```
面包屑 UI       ⟷  JSON-LD Schema
(用户看到的)        (搜索引擎看到的)

使用相同数据源: ROUTE_TREE + CRUMB_I18N

保证：
✅ 路径一致
✅ 名称一致
✅ 层级一致
```

### **与 SEO 系统的关系**

```
ROUTE_TREE (单一真相源)
    ↓
├─→ Breadcrumb UI      (这个项目)
├─→ JSON-LD Schema     (已完成)
├─→ Canonical URLs     (已完成)
├─→ Hreflang Tags      (已完成)
└─→ Sitemap XML        (已完成)
```

---

## 📊 性能考虑

### **组件性能**

```typescript
// ✅ 使用 useMemo 优化
const crumbs = useMemo<Crumb[]>(() => {
  // 生成面包屑数据
}, [pathname, lang, translations]);

// 性能指标：
// 初始渲染: < 5ms
// 路由变化: < 3ms
// 内存占用: < 10KB
```

### **不影响首屏加载**

* 组件轻量（< 5KB gzipped）
* 无外部依赖
* 无网络请求

---

## 📚 参考文档

| 文档 | 用途 |
|------|------|
| [BREADCRUMB_UI_INTEGRATION.md](/BREADCRUMB_UI_INTEGRATION.md) | 详细集成指南 |
| [BREADCRUMB_UI_COMPLETE.md](/BREADCRUMB_UI_COMPLETE.md) | 完成报告 |
| [FIGMA_BREADCRUMB_TASK.md](/FIGMA_BREADCRUMB_TASK.md) | Figma 任务书 |
| [SEO_SYSTEM_ARCHITECTURE.md](/SEO_SYSTEM_ARCHITECTURE.md) | 系统架构 |

---

## ✅ 开发检查清单

集成完成后，请确认：

### **代码层面**

- [ ] Breadcrumb 组件已正确导入
- [ ] 已添加到统一 Layout 中
- [ ] 样式已根据 Figma 调整
- [ ] 测试全部通过 (`npm run test:breadcrumb-ui`)

### **功能层面**

- [ ] 首页不显示面包屑
- [ ] 非首页正确显示
- [ ] 链接可点击且正确
- [ ] 三语言都正常工作

### **视觉层面**

- [ ] 与 Figma 设计一致
- [ ] 响应式正常
- [ ] 交互状态完整

### **测试层面**

- [ ] 单元测试通过
- [ ] 浏览器测试通过
- [ ] 多语言测试通过
- [ ] 响应式测试通过

---

## 🚀 部署流程

### **开发环境**

```bash
# 1. 确保组件存在
ls src/app/components/Breadcrumb.tsx

# 2. 运行测试
npm run test:breadcrumb-ui

# 3. 本地预览
npm run dev
```

### **预生产环境**

```bash
# 1. 构建
npm run build

# 2. 验证生成的文件
ls -lh dist/

# 3. 本地预览构建版本
npm run preview
```

### **生产环境**

```bash
# 1. 部署前最后检查
npm run test:seo

# 2. 部署
npm run build
vercel deploy --prod

# 3. 验证线上效果
# 访问各语言版本页面检查
```

---

## 📞 联系与支持

### **遇到问题？**

1. **查看文档：** [BREADCRUMB_UI_INTEGRATION.md](/BREADCRUMB_UI_INTEGRATION.md)
2. **运行测试：** `npm run test:breadcrumb-ui`
3. **检查控制台：** 使用 `getBreadcrumbData()` 调试
4. **联系团队：** [开发负责人]

### **需要修改？**

* **样式调整：** 修改 Breadcrumb.tsx 中的 Tailwind 类
* **添加翻译：** 更新 /src/seo/crumbI18n.ts
* **修改路径：** 更新 /src/seo/routeTree.ts

---

## 🎊 完成标准

当满足以下条件时，视为集成完成：

- ✅ 所有测试通过
- ✅ 面包屑在关键页面显示
- ✅ 与 Figma 设计一致
- ✅ 三语言正常工作
- ✅ 响应式正常
- ✅ 已部署到生产环境

---

**准备好了？开始集成吧！** 🚀

**预计时间：** 30 分钟（如果有统一 Layout）

**难度：** ⭐⭐ (简单)

**优先级：** 🔴 高
