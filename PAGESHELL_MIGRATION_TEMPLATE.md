# 🔧 PageShell 快速改造模板

## 📋 标准改造流程（复制粘贴式）

每个页面只需要 **3 步机械操作**，不需要思考，直接照抄。

---

## 🎯 模板 1：标准页面（有 Hero）

### **适用页面：**
- ProductsPage ✅
- ThermalPaperPage
- ThermalLabelsPage
- NCRFormsPage
- MaterialSupplyOverviewPage
- JumboRollsPage
- ApplicationsOverviewPage
- RetailPOSPage
- 等等...

### **改造步骤：**

#### **Step 1: 顶部添加 import**

在文件顶部，添加：

```tsx
import { PageShell } from '@/app/components/PageShell';
```

---

#### **Step 2: 找到组件函数，提取 hero**

**Before：**
```tsx
export function YourPage({ lang }) {
  const t = content[lang];

  return (
    <>
      <SEO ... />
      <Header />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative mb-20 -mt-32 pt-32">
          {/* Hero 内容 */}
        </section>

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

**After：**
```tsx
export function YourPage({ lang }) {
  const t = content[lang];

  // ✅ 提取 hero 到这里
  const heroContent = (
    <section className="relative mb-20 -mt-32 pt-32">
      {/* Hero 内容完全不变 */}
    </section>
  );

  return (
    <>
      <SEO ... />
      
      {/* ✅ 用 PageShell 替换 Header/main/Footer */}
      <PageShell lang={lang} hero={heroContent}>
        {/* 正文 sections */}
        <section className="mb-24">
          {/* ⚠️ 删除 max-w-7xl mx-auto px-4 */}
          ...
        </section>
      </PageShell>
    </>
  );
}
```

---

#### **Step 3: 清理正文 section 的容器 class**

找到所有正文的 `<section>` 标签，删除：
- `max-w-7xl`
- `mx-auto`
- `px-4`

**因为 PageShell 已经提供了这些！**

**Before：**
```tsx
<section className="max-w-7xl mx-auto px-4 mb-24">
  <h2>Sizes Available</h2>
  ...
</section>
```

**After：**
```tsx
<section className="mb-24">
  <h2>Sizes Available</h2>
  ...
</section>
```

---

## 🎯 模板 2：首页（LandingPage）

### **特殊处理：不显示面包屑**

```tsx
export function LandingPage({ lang }) {
  const t = content[lang];

  const heroContent = (
    <section className="relative mb-20 -mt-32 pt-32">
      {/* Hero 内容 */}
    </section>
  );

  return (
    <>
      <SEO ... />
      
      {/* ✅ 添加 showBreadcrumb={false} */}
      <PageShell lang={lang} hero={heroContent} showBreadcrumb={false}>
        <section className="mb-24">
          ...
        </section>
      </PageShell>
    </>
  );
}
```

---

## 🎯 模板 3：没有 Hero 的页面

### **适用场景：**
- 某些简单页面（例如 404 页面）
- 纯文本内容页面

```tsx
export function SimplePage({ lang }) {
  const t = content[lang];

  return (
    <>
      <SEO ... />
      
      {/* ✅ 不传 hero 参数 */}
      <PageShell lang={lang}>
        <section className="mb-24">
          <h1>Page Title</h1>
          <p>Content...</p>
        </section>
      </PageShell>
    </>
  );
}
```

---

## 🎯 模板 4：全宽背景 Section

### **场景：** 某个 section 需要全宽背景色

**Before：**
```tsx
<main className="pt-32 pb-20">
  <section className="max-w-7xl mx-auto px-4 mb-24">
    普通内容
  </section>

  <section className="bg-gray-50 py-16 mb-24">
    <div className="max-w-7xl mx-auto px-4">
      全宽背景内容
    </div>
  </section>
</main>
```

**After（使用 PageShell）：**
```tsx
<PageShell lang={lang} hero={heroContent}>
  <section className="mb-24">
    普通内容
  </section>

  {/* ✅ 使用负边距突破容器 */}
  <section className="bg-gray-50 py-16 mb-24 -mx-4">
    <div className="px-4">
      全宽背景内容
    </div>
  </section>
</PageShell>
```

**解释：**
- `-mx-4` 抵消 PageShell 的 `px-4`
- `px-4` 在内部重新添加左右 padding

---

## 📝 实战示例：ThermalPaperPage 完整改造

### **Before（原始代码）：**

```tsx
import React from 'react';
import { Header } from '@/app/components/HeaderWithHover';
import { Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';

const content = {
  en: {
    hero: { h1: 'Thermal Paper Rolls', ... },
    sizes: { ... },
    // ...
  },
  // ...
};

export function ThermalPaperPage({ lang = 'en' }) {
  const t = content[lang];

  return (
    <>
      <SEO 
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
        lang={lang}
      />
      
      <Header />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative mb-20 -mt-32 pt-32">
          <div className="absolute inset-0 h-[600px]">
            <ImagePlaceholder type="product" aspectRatio="21:9" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 py-32">
            <div className="max-w-3xl">
              <h1 className="mb-6 text-white">{t.hero.h1}</h1>
              <p className="text-2xl text-white mb-6 font-semibold">{t.hero.subheading}</p>
              <p className="text-xl text-gray-100">{t.hero.intro}</p>
            </div>
          </div>
        </section>

        {/* Sizes Section */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.sizes.title}
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {/* sizes cards */}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-16 mb-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t.features.title}
            </h2>
            {/* features content */}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
```

---

### **After（使用 PageShell）：**

```tsx
import React from 'react';
import { SEO } from '@/app/components/SEO';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { PageShell } from '@/app/components/PageShell'; // ← Step 1: 添加 import

const content = {
  en: {
    hero: { h1: 'Thermal Paper Rolls', ... },
    sizes: { ... },
    // ...
  },
  // ...
};

export function ThermalPaperPage({ lang = 'en' }) {
  const t = content[lang];

  // ← Step 2: 提取 hero
  const heroContent = (
    <section className="relative mb-20 -mt-32 pt-32">
      <div className="absolute inset-0 h-[600px]">
        <ImagePlaceholder type="product" aspectRatio="21:9" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-32">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-white">{t.hero.h1}</h1>
          <p className="text-2xl text-white mb-6 font-semibold">{t.hero.subheading}</p>
          <p className="text-xl text-gray-100">{t.hero.intro}</p>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <SEO 
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
        lang={lang}
      />
      
      {/* ← Step 3: 用 PageShell 替换 Header/main/Footer */}
      <PageShell lang={lang} hero={heroContent}>
        {/* ✅ 面包屑会自动显示在这里（Hero 下方）*/}

        {/* Sizes Section */}
        {/* ← Step 4: 删除 max-w-7xl mx-auto px-4 */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.sizes.title}
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {/* sizes cards */}
          </div>
        </section>

        {/* Features Section - 全宽背景 */}
        {/* ← Step 5: 用 -mx-4 突破容器 */}
        <section className="bg-gray-50 py-16 mb-24 -mx-4">
          <div className="px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t.features.title}
            </h2>
            {/* features content */}
          </div>
        </section>
      </PageShell>
    </>
  );
}
```

---

## ✅ 改造检查清单（每个页面完成后对照）

### **代码检查：**
- [ ] 添加了 `import { PageShell } from '@/app/components/PageShell';`
- [ ] 提取了 `heroContent` 变量
- [ ] 删除了 `<Header />`, `<main>`, `<Footer />`
- [ ] 用 `<PageShell lang={lang} hero={heroContent}>` 包裹
- [ ] 删除了正文 section 的 `max-w-7xl mx-auto px-4`
- [ ] 全宽背景 section 使用了 `-mx-4`
- [ ] `<SEO />` 保持在最外层
- [ ] 首页使用了 `showBreadcrumb={false}`

### **功能测试：**
- [ ] 页面正常渲染，没有报错
- [ ] Hero 显示正常
- [ ] 面包屑出现在 Hero 下方
- [ ] 正文内容宽度正常
- [ ] 全宽背景 section 宽度正确
- [ ] Header 和 Footer 正常显示

---

## 🐛 常见错误及解决

### **错误 1：页面内容过窄**

**原因：** 忘记删除正文 section 的 `max-w-7xl mx-auto px-4`

**解决：**
```tsx
// ❌ Before
<section className="max-w-7xl mx-auto px-4 mb-24">

// ✅ After
<section className="mb-24">
```

---

### **错误 2：全宽背景 section 不够宽**

**原因：** 没有使用 `-mx-4` 突破容器

**解决：**
```tsx
// ❌ Before
<section className="bg-gray-50 py-16 mb-24">
  <div className="max-w-7xl mx-auto px-4">

// ✅ After
<section className="bg-gray-50 py-16 mb-24 -mx-4">
  <div className="px-4">
```

---

### **错误 3：面包屑没有显示**

**可能原因：**
1. 忘记传 `lang` 参数
2. 路由不在 `routeTree.ts` 中
3. 首页误传了 `showBreadcrumb={true}`

**解决：**
```tsx
// ✅ 确保传递 lang
<PageShell lang={lang} hero={heroContent}>

// ✅ 首页不显示面包屑
<PageShell lang={lang} hero={heroContent} showBreadcrumb={false}>
```

---

### **错误 4：编译报错 "Cannot find module PageShell"**

**原因：** import 路径错误

**解决：**
```tsx
// ✅ 使用 @ alias
import { PageShell } from '@/app/components/PageShell';

// ❌ 不要用相对路径（除非你确定）
import { PageShell } from './PageShell';
```

---

## 📊 批量改造进度追踪表

| 文件名 | 优先级 | 状态 | 测试 | 备注 |
|--------|--------|------|------|------|
| ProductsPage.tsx | P0 | ✅ 完成 | ✅ 通过 | 示例页面 |
| ThermalPaperPage.tsx | P0 | ⬜ 待办 | ⬜ 待测 | |
| ThermalLabelsPage.tsx | P0 | ⬜ 待办 | ⬜ 待测 | |
| NCRFormsPage.tsx | P0 | ⬜ 待办 | ⬜ 待测 | |
| MaterialSupplyOverviewPage.tsx | P0 | ⬜ 待办 | ⬜ 待测 | |
| JumboRollsPage.tsx | P1 | ⬜ 待办 | ⬜ 待测 | |
| NCRJumboPage.tsx | P1 | ⬜ 待办 | ⬜ 待测 | |
| SelfAdhesiveJumboPage.tsx | P1 | ⬜ 待办 | ⬜ 待测 | |
| NCRSheetsPage.tsx | P1 | ⬜ 待办 | ⬜ 待测 | |
| ApplicationsOverviewPage.tsx | P2 | ⬜ 待办 | ⬜ 待测 | |
| RetailPOSPage.tsx | P2 | ⬜ 待办 | ⬜ 待测 | |
| LogisticsWarehousingPage.tsx | P2 | ⬜ 待办 | ⬜ 待测 | |
| SupermarketsPage.tsx | P2 | ⬜ 待办 | ⬜ 待测 | |
| GovernmentTendersPage.tsx | P2 | ⬜ 待办 | ⬜ 待测 | |
| BankingFinancePage.tsx | P2 | ⬜ 待办 | ⬜ 待测 | |
| HealthcarePage.tsx | P2 | ⬜ 待办 | ⬜ 待测 | |
| AboutPage.tsx | P3 | ⬜ 待办 | ⬜ 待测 | |
| ProductionPage.tsx | P3 | ⬜ 待办 | ⬜ 待测 | |
| CertificationsPage.tsx | P3 | ⬜ 待办 | ⬜ 待测 | |
| OEMCustomizationPage.tsx | P3 | ⬜ 待办 | ⬜ 待测 | |
| ContactsPage.tsx | P3 | ⬜ 待办 | ⬜ 待测 | |
| ResourcesCenterPage.tsx | P4 | ⬜ 待办 | ⬜ 待测 | |
| BlogInsightsPage.tsx | P4 | ⬜ 待办 | ⬜ 待测 | |
| ToolsCalculatorsPage.tsx | P4 | ⬜ 待办 | ⬜ 待测 | |
| FAQsPage.tsx | P4 | ⬜ 待办 | ⬜ 待测 | |
| RequestTenderPackPage.tsx | P4 | ⬜ 待办 | ⬜ 待测 | |
| LandingPage.tsx | 特殊 | ⬜ 待办 | ⬜ 待测 | showBreadcrumb={false} |
| PlaceholderPage.tsx | 特殊 | ⬜ 待办 | ⬜ 待测 | 可能不需要 |

---

## 🚀 快速命令（开发辅助）

### **批量搜索需要改造的文件：**
```bash
# 查找所有包含 <Header /> 的页面文件
grep -l "<Header />" src/app/components/*Page.tsx

# 查找所有包含 <main className 的文件
grep -l '<main className="pt-32' src/app/components/*Page.tsx
```

### **验证改造是否完成：**
```bash
# 检查是否还有文件直接使用 <Header />（应该为空）
grep -l "<Header />" src/app/components/*Page.tsx

# 检查是否都使用了 PageShell（应该显示所有页面文件）
grep -l "PageShell" src/app/components/*Page.tsx
```

---

## 📞 需要帮助？

**遇到以下情况立即咨询：**

1. **某个页面结构特殊**，不确定如何改造
2. **改造后页面显示异常**（截图 + 文件名）
3. **面包屑没有显示**（提供 URL + Console 错误）
4. **编译报错**（提供完整错误信息）

**提供信息格式：**
```
文件：ThermalPaperPage.tsx
URL：/en/products/thermal-paper-rolls
问题：面包屑被 Hero 覆盖，看不见
Console：[截图]
```

**响应时间：** 立即处理！🚀

---

**最后更新：** 2026-02-03  
**文档版本：** v1.0  
**维护：** Figma Make AI
