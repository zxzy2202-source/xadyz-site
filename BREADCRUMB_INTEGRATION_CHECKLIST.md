# 📋 面包屑集成完整清单 - 照抄就能跑

## ✅ 前置工作（已完成）

- [x] 创建 `PageShell.tsx` - 统一 Layout 组件
- [x] 更新 `Breadcrumb.tsx` - 接收 `lang` 参数
- [x] 测试面包屑组件渲染逻辑

---

## 🎯 需要改造的页面（共 28 个）

### **改造模板（通用）**

每个页面只需要做 **3 步改动**：

#### **步骤 1: 添加 import**
```tsx
import { PageShell } from '@/app/components/PageShell';
```

#### **步骤 2: 提取 hero 内容**
```tsx
const heroContent = (
  <section className="relative mb-20 -mt-32 pt-32">
    {/* 原来的 Hero Section 代码不变 */}
  </section>
);
```

#### **步骤 3: 用 PageShell 包裹**
```tsx
return (
  <>
    <SEO {...seoProps} />
    <PageShell lang={lang} hero={heroContent}>
      {/* 原来的正文 sections，删除外层 Header/Footer/main */}
      <section className="mb-24">
        ...正文内容...
      </section>
    </PageShell>
  </>
);
```

---

## 📝 详细改造清单

### **优先级 P0：核心产品页面（5 个）**

#### ✅ 1. ProductsPage.tsx
- [x] **已完成** ✨
- 测试路径：`/en/products`, `/ru/products`, `/zh/products`
- 预期面包屑：`Home › Products`

---

#### ⬜ 2. ThermalPaperPage.tsx
- [ ] 待改造
- 测试路径：`/en/products/thermal-paper-rolls`
- 预期面包屑：`Home › Products › Thermal Paper Rolls`

**改造代码：**
```tsx
// 1. 添加 import
import { PageShell } from '@/app/components/PageShell';

// 2. 在组件内部提取 hero
const heroContent = (
  <section className="relative mb-20 -mt-32 pt-32">
    {/* 保持原 Hero 代码不变 */}
  </section>
);

// 3. 返回值改为
return (
  <>
    <SEO {...} />
    <PageShell lang={lang} hero={heroContent}>
      {/* 正文内容 - 删除 <Header />, <main>, <Footer /> */}
      <section className="mb-24">
        ...
      </section>
    </PageShell>
  </>
);
```

---

#### ⬜ 3. ThermalLabelsPage.tsx
- [ ] 待改造
- 测试路径：`/en/products/thermal-labels`
- 预期面包屑：`Home › Products › Thermal Labels`

**改造代码：** 同上模板

---

#### ⬜ 4. NCRFormsPage.tsx
- [ ] 待改造
- 测试路径：`/en/products/ncr-forms`
- 预期面包屑：`Home › Products › NCR Forms`

**改造代码：** 同上模板

---

#### ⬜ 5. MaterialSupplyOverviewPage.tsx
- [ ] 待改造
- 测试路径：`/en/material-supply`
- 预期面包屑：`Home › Material Supply`

**改造代码：** 同上模板

---

### **优先级 P1：原料供应页面（4 个）**

#### ⬜ 6. JumboRollsPage.tsx
- [ ] 待改造
- 测试路径：`/en/material-supply/thermal-jumbo-rolls`
- 预期面包屑：`Home › Material Supply › Thermal Jumbo Rolls`

---

#### ⬜ 7. NCRJumboPage.tsx
- [ ] 待改造
- 测试路径：`/en/material-supply/ncr-jumbo-rolls`
- 预期面包屑：`Home › Material Supply › NCR Jumbo Rolls`

---

#### ⬜ 8. SelfAdhesiveJumboPage.tsx
- [ ] 待改造
- 测试路径：`/en/material-supply/self-adhesive-jumbo-rolls`
- 预期面包屑：`Home › Material Supply › Self-Adhesive Jumbo Rolls`

---

#### ⬜ 9. NCRSheetsPage.tsx
- [ ] 待改造
- 测试路径：`/en/material-supply/ncr-sheets`
- 预期面包屑：`Home › Material Supply › NCR Sheets`

---

### **优先级 P2：应用场景页面（7 个）**

#### ⬜ 10. ApplicationsOverviewPage.tsx
- [ ] 待改造
- 测试路径：`/en/applications`
- 预期面包屑：`Home › Applications`

---

#### ⬜ 11. RetailPOSPage.tsx
- [ ] 待改造
- 测试路径：`/en/applications/retail-pos`
- 预期面包屑：`Home › Applications › Retail & POS`

---

#### ⬜ 12. LogisticsWarehousingPage.tsx
- [ ] 待改造
- 测试路径：`/en/applications/logistics-warehousing`
- 预期面包屑：`Home › Applications › Logistics & Warehousing`

---

#### ⬜ 13. SupermarketsPage.tsx
- [ ] 待改造
- 测试路径：`/en/applications/supermarkets`
- 预期面包屑：`Home › Applications › Supermarkets`

---

#### ⬜ 14. GovernmentTendersPage.tsx
- [ ] 待改造
- 测试路径：`/en/applications/government-tenders`
- 预期面包屑：`Home › Applications › Government Tenders`

---

#### ⬜ 15. BankingFinancePage.tsx
- [ ] 待改造
- 测试路径：`/en/applications/banking-finance`
- 预期面包屑：`Home › Applications › Banking & Finance`

---

#### ⬜ 16. HealthcarePage.tsx
- [ ] 待改造
- 测试路径：`/en/applications/healthcare`
- 预期面包屑：`Home › Applications › Healthcare`

---

### **优先级 P3：公司信息页面（5 个）**

#### ⬜ 17. AboutPage.tsx
- [ ] 待改造
- 测试路径：`/en/about`
- 预期面包屑：`Home › About`

---

#### ⬜ 18. ProductionPage.tsx
- [ ] 待改造
- 测试路径：`/en/about/production`
- 预期面包屑：`Home › About › Production`

---

#### ⬜ 19. CertificationsPage.tsx
- [ ] 待改造
- 测试路径：`/en/about/certifications`
- 预期面包屑：`Home › About › Certifications`

---

#### ⬜ 20. OEMCustomizationPage.tsx
- [ ] 待改造
- 测试路径：`/en/about/oem-customization`
- 预期面包屑：`Home › About › OEM & Customization`

---

#### ⬜ 21. ContactsPage.tsx
- [ ] 待改造
- 测试路径：`/en/contact`
- 预期面包屑：`Home › Contact`

---

### **优先级 P4：资源中心页面（5 个）**

#### ⬜ 22. ResourcesCenterPage.tsx
- [ ] 待改造
- 测试路径：`/en/resources`
- 预期面包屑：`Home › Resources`

---

#### ⬜ 23. BlogInsightsPage.tsx
- [ ] 待改造
- 测试路径：`/en/resources/blog`
- 预期面包屑：`Home › Resources › Blog & Insights`

---

#### ⬜ 24. ToolsCalculatorsPage.tsx
- [ ] 待改造
- 测试路径：`/en/resources/tools-calculators`
- 预期面包屑：`Home › Resources › Tools & Calculators`

---

#### ⬜ 25. FAQsPage.tsx
- [ ] 待改造
- 测试路径：`/en/resources/faqs`
- 预期面包屑：`Home › Resources › FAQs`

---

#### ⬜ 26. RequestTenderPackPage.tsx
- [ ] 待改造
- 测试路径：`/en/resources/request-tender-pack`
- 预期面包屑：`Home › Resources › Request Tender Pack`

---

### **特殊页面（2 个）**

#### ⬜ 27. LandingPage.tsx
- [ ] **需要特殊处理**
- 测试路径：`/en`, `/ru`, `/zh`
- **不显示面包屑**

**改造代码：**
```tsx
<PageShell lang={lang} hero={heroContent} showBreadcrumb={false}>
  {/* 首页内容 */}
</PageShell>
```

---

#### ⬜ 28. PlaceholderPage.tsx
- [ ] 待确认是否需要面包屑
- 用途：404 / 占位页面
- 建议：不显示面包屑

---

## 🔧 改造步骤详解（以 ThermalPaperPage 为例）

### **Before（原始结构）：**

```tsx
export function ThermalPaperPage({ lang }) {
  const t = content[lang];

  return (
    <>
      <SEO title={t.seo.title} ... />
      
      <Header />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative mb-20 -mt-32 pt-32">
          <div className="absolute inset-0 h-[600px]">
            <ImagePlaceholder />
            <div className="absolute inset-0 bg-gradient-to-r ..."></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 py-32">
            <h1>{t.hero.h1}</h1>
          </div>
        </section>

        {/* Content Sections */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <h2>Sizes</h2>
          ...
        </section>
      </main>

      <Footer />
    </>
  );
}
```

### **After（使用 PageShell）：**

```tsx
import { PageShell } from '@/app/components/PageShell';

export function ThermalPaperPage({ lang }) {
  const t = content[lang];

  // ✅ 提取 hero
  const heroContent = (
    <section className="relative mb-20 -mt-32 pt-32">
      <div className="absolute inset-0 h-[600px]">
        <ImagePlaceholder />
        <div className="absolute inset-0 bg-gradient-to-r ..."></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-32">
        <h1>{t.hero.h1}</h1>
      </div>
    </section>
  );

  return (
    <>
      <SEO title={t.seo.title} ... />
      
      <PageShell lang={lang} hero={heroContent}>
        {/* ✅ 面包屑会自动插入到这里（Hero 下方） */}
        
        {/* Content Sections - 删除 max-w-7xl mx-auto px-4（已在 PageShell 中） */}
        <section className="mb-24">
          <h2>Sizes</h2>
          ...
        </section>
      </PageShell>
    </>
  );
}
```

### **⚠️ 关键改动点：**

1. **Import PageShell**
2. **删除** `<Header />`, `<main>`, `<Footer />`
3. **提取** Hero Section 到 `heroContent` 变量
4. **删除** 正文 section 的 `max-w-7xl mx-auto px-4`（PageShell 已提供）
5. **保持** `<SEO />` 在最外层

---

## ✅ 验收标准（每个页面改完后测试）

### **1. 视觉检查**

访问页面，确认：
- [ ] 面包屑出现在 Hero 下方、正文上方
- [ ] 面包屑文字清晰可见（不被 Hero 覆盖）
- [ ] Home 链接可点击，点击后跳转到首页
- [ ] 最后一项（当前页）加粗、不可点击
- [ ] 分隔符 `›` 显示正常

### **2. 三语言测试**

切换语言，确认：
- [ ] `/en/...` - 英文面包屑正常
- [ ] `/ru/...` - 俄文面包屑正常
- [ ] `/zh/...` - 中文面包屑正常

### **3. 功能测试**

- [ ] 点击面包屑链接可以导航
- [ ] 首页不显示面包屑
- [ ] 页面滚动时面包屑位置正常
- [ ] 移动端显示正常

---

## 🐛 常见问题速查

### **问题 1：面包屑被 Hero 覆盖，看不见**

**解决方案：**
```tsx
// PageShell.tsx 中调整
<div className="relative z-20 max-w-7xl mx-auto px-4 bg-white py-4 mb-8 shadow-sm">
  <Breadcrumb lang={lang} />
</div>
```

---

### **问题 2：面包屑位置太高/太低**

**解决方案：**
```tsx
// 调整 margin
<div className="relative z-10 max-w-7xl mx-auto px-4 mt-0 mb-8">
  ^^^                                            ^^^^
  改 -mt-10 为 mt-0（不要负边距）
```

---

### **问题 3：某个页面没有 Hero，只有正文**

**解决方案：**
```tsx
// 不传 hero 参数即可
<PageShell lang={lang}>
  <section className="mb-24">
    正文内容
  </section>
</PageShell>
```

---

### **问题 4：正文内容宽度不对**

**解决方案：**

PageShell 已经提供了 `max-w-7xl mx-auto px-4`，需要删除正文 section 中的这些 class：

```tsx
// ❌ Before
<section className="max-w-7xl mx-auto px-4 mb-24">

// ✅ After
<section className="mb-24">
```

如果某个 section 需要突破容器（例如全宽背景），使用负边距：

```tsx
<section className="bg-gray-50 py-16 mb-24 -mx-4">
  <div className="px-4">
    {/* 内容 */}
  </div>
</section>
```

---

## 📊 进度追踪

### **总进度：**
- [x] PageShell 创建完成
- [x] Breadcrumb 更新完成
- [x] ProductsPage 改造完成（1/28）
- [ ] 其他 27 个页面待改造

### **预计工时：**
- 单个页面改造：5-10 分钟
- 测试验收：3-5 分钟
- 总计：约 **6-8 小时**（包含测试）

### **建议分工：**

**开发人员 A：** P0 + P1（核心产品和原料，9 个页面）
**开发人员 B：** P2 + P3（应用场景和公司信息，12 个页面）
**开发人员 C：** P4 + 特殊页面（资源中心，7 个页面）

---

## 🎯 最终验收 Checklist

完成所有页面改造后，进行全站验收：

### **核心路径测试（必须全部通过）：**

```
✅ EN 路径
- /en → 无面包屑（首页）
- /en/products → Home › Products
- /en/products/thermal-paper-rolls → Home › Products › Thermal Paper Rolls
- /en/material-supply/thermal-jumbo-rolls → Home › Material Supply › Thermal Jumbo Rolls
- /en/applications/government-tenders → Home › Applications › Government Tenders

✅ RU 路径
- /ru → 无面包屑
- /ru/products → Главная › Продукция
- /ru/products/thermal-paper-rolls → Главная › Продукция › Рулоны термобумаги

✅ ZH 路径
- /zh → 无面包屑
- /zh/products → 首页 › 产品
- /zh/products/thermal-paper-rolls → 首页 › 产品 › 热敏纸卷
```

### **跨浏览器测试：**
- [ ] Chrome（桌面 + 移动模拟）
- [ ] Safari（Mac + iOS）
- [ ] Firefox

### **性能检查：**
- [ ] Lighthouse SEO 分数 ≥ 95
- [ ] 无 Console 错误
- [ ] 页面加载速度正常

---

## 🚀 部署上线

所有页面改造完成且验收通过后：

```bash
# 1. 运行测试
npm run test:breadcrumb-ui

# 2. 构建项目
npm run build

# 3. 预览构建结果
npm run preview

# 4. 部署到 Vercel
git add .
git commit -m "feat: integrate breadcrumb navigation across all pages"
git push origin main
```

---

## 📞 需要支持？

遇到问题时提供：
1. **页面文件名**（例如：ThermalPaperPage.tsx）
2. **测试 URL**（例如：/en/products/thermal-paper-rolls）
3. **Console 错误截图**
4. **预期 vs 实际效果**

**立即响应！** 🚀✨

---

**最后更新：** 2026-02-03
**维护人员：** Figma Make AI
**文档版本：** v1.0
