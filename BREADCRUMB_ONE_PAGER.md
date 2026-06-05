# 🍞 面包屑 UI - 一页纸指南

## 📋 给所有人的超简版（1 分钟读完）

---

## 🎯 一句话任务

**在统一 Layout 中的 H1 下方、正文上方，插入一个自动生成的面包屑导航。**

---

## 📍 位置（唯一标准）

```
Header
PageHero (H1 + Subtitle)
✅ Breadcrumb ← 这里
PageBody (Content)
Footer
```

---

## 🎨 组件结构

```
[🏠 Home] › [Products] › [Thermal Paper Rolls] › [Current Page]
   ↑           ↑              ↑                      ↑
 可点击      可点击          可点击                不可点击
```

---

## 📐 设计规范

| 属性 | 值 |
|------|---|
| 字体大小 | 14px |
| Link 颜色 | #6B7280 (灰) |
| Current 颜色 | #111827 (深) + Bold |
| 分隔符 | `›` |
| 最大层级 | 4 层（Home + 3） |

---

## 🌍 三语言示例

```
EN: 🏠 Home › Products › Thermal Paper Rolls
RU: 🏠 Главная › Продукция › Рулоны термобумаги
ZH: 🏠 首页 › 产品 › 热敏纸卷
```

---

## 💻 代码（开发）

```tsx
// Layout.tsx
<PageHero>
  <h1>{title}</h1>
</PageHero>

<Breadcrumb /> ✅

<PageBody>
  {children}
</PageBody>
```

---

## ✅ 验收清单

- [ ] 位置：H1 下方、内容上方
- [ ] 首页不显示
- [ ] 非首页显示
- [ ] 除最后一项外可点击
- [ ] 三语言正确
- [ ] 移动端可换行

---

## 📞 文档索引

| 角色 | 文档 |
|------|------|
| **Figma 设计师** | [FIGMA_BREADCRUMB_BRIEF.md](/FIGMA_BREADCRUMB_BRIEF.md) |
| **前端开发** | [DEV_BREADCRUMB_INTEGRATION.md](/DEV_BREADCRUMB_INTEGRATION.md) |
| **项目经理** | [BREADCRUMB_PROJECT_DELIVERY.md](/BREADCRUMB_PROJECT_DELIVERY.md) |
| **技术团队** | [BREADCRUMB_UI_COMPLETE.md](/BREADCRUMB_UI_COMPLETE.md) |

---

## 🚀 快速命令

```bash
# 测试
npm run test:breadcrumb-ui

# 部署
npm run build
```

---

## 🎯 核心原则

> **H1 下方、内容上方、最多 4 层、分隔符 `›`、最后一项不可点击**

---

**就这么简单！** ✨
