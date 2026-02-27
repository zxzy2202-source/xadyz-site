# Hero 统一改造进度

## ✅ 已完成（5个）
- ✅ LandingPage.tsx
- ✅ ProductsPage.tsx
- ✅ AboutPage.tsx
- ✅ ContactsPage.tsx (compact)
- ✅ ThermalPaperPage.tsx
- ✅ ThermalLabelsPage.tsx
- ✅ NCRFormsPage.tsx

## ⏳ 待处理（29个）

### 材料供应页（6个）
- ⏳ MaterialSupplyOverviewPage.tsx
- ⏳ JumboRollsPage.tsx
- ⏳ SelfAdhesiveJumboPage.tsx
- ⏳ SelfAdhesiveSheetsPage.tsx
- ⏳ NCRJumboPage.tsx
- ⏳ NCRSheetsPage.tsx

### 应用场景页（7个）
- ⏳ ApplicationsOverviewPage.tsx
- ⏳ RetailPOSPage.tsx
- ⏳ LogisticsWarehousingPage.tsx
- ⏳ SupermarketsPage.tsx
- ⏳ BankingFinancePage.tsx
- ⏳ GovernmentTendersPage.tsx
- ⏳ HealthcarePage.tsx

### 生产制造/资源/其他页（16个）
- ⏳ ProductionPage.tsx
- ⏳ CertificationsPage.tsx
- ⏳ OEMCustomizationPage.tsx
- ⏳ ResourcesCenterPage.tsx (compact)
- ⏳ BlogInsightsPage.tsx (compact)
- ⏳ BlogPostDetailPage.tsx
- ⏳ PackagingLogisticsPage.tsx
- ⏳ ToolsCalculatorsPage.tsx (compact)
- ⏳ FAQsPage.tsx (compact)
- ⏳ RequestTenderPackPage.tsx
- ⏳ RequestTenderPackPageEnhanced.tsx

---

## 📋 替换模式

### 模式1：使用 HeroBannerBg 的页面
```tsx
// 替换前
const heroContent = (
  <section className="hero-section relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <HeroBannerBg imageUrl={pageAssets.hero.src} ... />
      <div className="absolute inset-0 bg-gradient-to-r ..."></div>
    </div>
    <div className="hero-inner ...">
      <h1>{t.hero.h1}</h1>
      <p>{t.hero.subheading}</p>
      <p>{t.hero.intro}</p>
    </div>
  </section>
);

// 替换后
const heroContent = (
  <PageHero
    title={t.hero.h1}
    description={t.hero.subheading ? `${t.hero.subheading} ${t.hero.intro}` : t.hero.intro}
    image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
    overlay={pageAssets.hero.overlay}
  />
);
```

### 模式2：使用 PageShell 的页面
```tsx
// 替换前
<PageShell lang={lang} hero={heroContent}>

// 替换后（heroContent 已替换为 PageHero）
<PageShell lang={lang} hero={heroContent}>
```

### 模式3：直接在主页面中的 Hero
```tsx
// 替换前
<main>
  <section className="hero-section ...">
    ...
  </section>
</main>

// 替换后
<main>
  <PageHero ... />
</main>
```

---

## 🔧 注意事项

1. **导入**：每个页面需要添加 `import { PageHero } from '@/app/components/hero/PageHero';`
2. **移除**：移除 `HeroBannerBg` 的导入（如果不再使用）
3. **描述合并**：`subheading` 和 `intro` 合并为 `description`
4. **compact 模式**：ContactsPage, ToolsCalculatorsPage, FAQsPage, BlogInsightsPage, ResourcesCenterPage 使用 `size="compact"`
5. **overlay**：从 `pageAssets.hero.overlay` 读取
6. **图片**：从 `pageAssets.hero.src` 和 `pageAssets.hero.alt` 读取
