# 📐 你的 Layout 结构 - 真实组件名称

## ✅ 答案：你们没有统一的 "Layout 组件"

经过检查你的代码，发现：

### **当前实际结构：**

```tsx
// 每个页面组件独立写了完整结构
export function ProductsPage({ lang }) {
  return (
    <>
      <SEO />           // SEO 元标签
      <Header />        // 统一的顶部导航
      
      <main className="pt-32 pb-20">
        {/* ✅ 这个 <section> 就是你的 "标题区组件" */}
        <section className="relative mb-20 -mt-32 pt-32">
          {/* 背景图 */}
          <div className="absolute inset-0 h-[600px]">
            <ImagePlaceholder />
            <div className="absolute inset-0 bg-gradient-to-r ..."></div>
          </div>

          {/* ✅ H1 和内容在这里 */}
          <div className="relative max-w-7xl mx-auto px-4 py-32">
            <div className="max-w-3xl">
              <h1 className="mb-6 text-white">
                {t.hero.h1}
              </h1>
              <p className="text-2xl text-white mb-6 font-semibold">
                {t.hero.subheading}
              </p>
              <p className="text-xl text-gray-100">
                {t.hero.intro}
              </p>
            </div>
          </div>
        </section>

        {/* ✅ 面包屑应该插入这里！ */}
        {/* <Breadcrumb /> */}

        {/* 02: Category Grid ... */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          ...正文内容...
        </section>

        {/* 更多 sections... */}
      </main>

      <Footer />
    </>
  );
}
```

---

## 🎯 关键发现

### **1. "标题区组件" 的真实名字**

```tsx
// ❌ 没有独立组件，而是：
<section className="relative mb-20 -mt-32 pt-32">
  {/* 这个 section 就是标题区 */}
  {/* 包含背景图 + H1 + 副标题 */}
</section>
```

**命名模式：**
- 代码注释：`{/* 01: Hero Banner with Full Background Image */}`
- 在你的文案对象中：`hero: { h1, subheading, intro }`

**所以你的 "标题区" 就叫：`Hero Section` 或 `Hero Banner`**

---

### **2. 面包屑应该插入的位置（精确）**

```tsx
<main className="pt-32 pb-20">
  {/* Hero Section */}
  <section className="relative mb-20 -mt-32 pt-32">
    {/* H1 + 背景图在这里 */}
  </section>

  {/* ✅ 面包屑插入这里（两个 section 之间）*/}
  <div className="max-w-7xl mx-auto px-4 mb-8">
    <Breadcrumb />
  </div>

  {/* Category Grid / 正文内容 */}
  <section className="max-w-7xl mx-auto px-4 mb-24">
    ...
  </section>
</main>
```

---

## 🔧 实际集成方案

### **方案 A: 在每个页面手动添加（你当前的结构）**

```tsx
// ProductsPage.tsx
export function ProductsPage({ lang }) {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="relative mb-20 -mt-32 pt-32">
          ...H1 和背景图...
        </section>

        {/* ✅ 添加面包屑 */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <Breadcrumb />
        </div>

        {/* 正文 */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          ...
        </section>
      </main>
      <Footer />
    </>
  );
}
```

**需要修改的文件：**
- ProductsPage.tsx
- ThermalPaperPage.tsx
- ThermalLabelsPage.tsx
- MaterialSupplyOverviewPage.tsx
- ApplicationsOverviewPage.tsx
- 等等（所有非首页页面）

---

### **方案 B: 创建统一 Layout 组件（推荐）**

```tsx
// 新建：/src/app/components/PageLayout.tsx
export function PageLayout({ 
  children, 
  heroContent,
  lang 
}: { 
  children: React.ReactNode;
  heroContent?: React.ReactNode;
  lang: string;
}) {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        {/* Hero Section (可选) */}
        {heroContent}

        {/* ✅ 面包屑自动插入 */}
        {heroContent && (
          <div className="max-w-7xl mx-auto px-4 mb-8">
            <Breadcrumb />
          </div>
        )}

        {/* Page Body */}
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

**然后简化页面组件：**

```tsx
// ProductsPage.tsx
export function ProductsPage({ lang }) {
  const t = content[lang];

  const heroContent = (
    <section className="relative mb-20 -mt-32 pt-32">
      {/* 背景图 + H1 */}
      ...
    </section>
  );

  return (
    <PageLayout heroContent={heroContent} lang={lang}>
      {/* 只写正文内容 */}
      <section className="mb-24">
        <div className="grid grid-cols-3 gap-8">
          ...
        </div>
      </section>
    </PageLayout>
  );
}
```

---

## 📋 给 Figma 的说明（更新版）

### **你的网站结构（真实情况）：**

```
页面结构（当前）:
├─ <Header />                    (统一导航栏)
├─ <main>
│  ├─ <section> Hero Section    (背景图 + H1 + 副标题)
│  ├─ 【面包屑插入这里】           ← Breadcrumb
│  ├─ <section> Category Grid   (正文内容开始)
│  ├─ <section> More content
│  └─ ...
└─ <Footer />
```

### **组件命名（在你的代码中）：**

| 区域 | 代码中的名称 | 说明 |
|------|-------------|------|
| 标题区 | `<section>` with comment `{/* Hero Banner */}` | 包含 H1 + 背景图 |
| 内容对象 | `t.hero.h1` | 文案数据 |
| 正文区 | 各种 `<section>` | Category Grid, Manufacturing Proof, etc. |

---

## ✅ 最简单的集成方案（给开发）

### **步骤 1: 确定首页不需要面包屑**

```tsx
// LandingPage.tsx
// ✅ 不需要修改，首页没有面包屑
```

### **步骤 2: 在非首页添加面包屑**

**模板：**

```tsx
// 任何非首页页面
import { Breadcrumb } from '@/app/components/Breadcrumb';

export function YourPage({ lang }) {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative mb-20 -mt-32 pt-32">
          ...H1 和背景...
        </section>

        {/* ✅ 插入面包屑 */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <Breadcrumb />
        </div>

        {/* 正文内容继续... */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          ...
        </section>
      </main>
      <Footer />
    </>
  );
}
```

### **步骤 3: 批量修改**

需要添加的页面（约 20 个文件）：
- ProductsPage.tsx
- ThermalPaperPage.tsx
- ThermalLabelsPage.tsx
- NCRFormsPage.tsx
- MaterialSupplyOverviewPage.tsx
- JumboRollsPage.tsx
- ApplicationsOverviewPage.tsx
- RetailPOSPage.tsx
- ProductionPage.tsx
- CertificationsPage.tsx
- ResourcesCenterPage.tsx
- 等等...

---

## 🎯 总结

### **你的问题答案：**

> **"标题区组件的真实名字" 是什么？**

**答案：** 
- ❌ 没有独立的 "组件"
- ✅ 只是一个 `<section>` 标签
- ✅ 代码注释叫：`{/* Hero Banner */}` 或 `{/* Hero Section */}`
- ✅ 数据对象叫：`hero: { h1, subheading, intro }`

### **面包屑插入位置：**

```tsx
{/* Hero Section 结束 */}
</section>

{/* ✅ 面包屑插入这里 */}
<div className="max-w-7xl mx-auto px-4 mb-8">
  <Breadcrumb />
</div>

{/* 正文内容开始 */}
<section className="max-w-7xl mx-auto px-4 mb-24">
```

---

## 📞 下一步

### **选择集成方案：**

**方案 A（快速）：** 
- 直接在每个页面手动添加
- 预计时间：2-3 小时（20+ 文件）

**方案 B（优雅）：**
- 先创建统一 PageLayout 组件
- 然后重构所有页面使用它
- 预计时间：4-5 小时

**推荐：** 先用方案 A 快速上线，后续再重构为方案 B。

---

**问题解决了吗？需要我帮你生成具体的修改代码吗？** 🚀
