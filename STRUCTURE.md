# 项目结构说明

B2B 热敏纸工厂官网，Vite + React + Tailwind，三语（en/ru/zh）。

---

## 目录结构

```
src/
├── app/
│   ├── App.tsx                  # 根组件：Router + SEO 注入
│   ├── routes/
│   │   ├── index.ts
│   │   └── AppRoutes.tsx        # 集中管理路由 + React.lazy 懒加载
│   ├── components/
│   │   ├── landing/             # 首页可复用区块
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── SectionCardGrid.tsx
│   │   │   ├── ComplianceBadges.tsx
│   │   │   ├── ManufacturingSnapshot.tsx
│   │   │   ├── MaterialSupplyTeaser.tsx
│   │   │   ├── CtaBlock.tsx
│   │   │   └── index.ts
│   │   ├── products/            # 产品页可复用区块
│   │   │   ├── ProductCategoryCard.tsx
│   │   │   ├── ManufacturingProofBar.tsx
│   │   │   └── index.ts
│   │   ├── applications/        # 应用页可复用区块
│   │   │   ├── IndustryCard.tsx
│   │   │   └── index.ts
│   │   ├── contact/             # 联系页可复用区块
│   │   │   ├── ContactMethods.tsx
│   │   │   ├── ContactCtaSection.tsx
│   │   │   └── index.ts
│   │   ├── manufacturing/       # 制造页可复用区块
│   │   │   ├── ManufacturingNav.tsx
│   │   │   ├── FactoryStatsSection.tsx
│   │   │   ├── CapacityListSection.tsx
│   │   │   ├── ProductionLineCard.tsx
│   │   │   ├── QualityContentSection.tsx
│   │   │   ├── ShippingContentSection.tsx
│   │   │   └── index.ts
│   │   ├── shared/              # 共享组件 barrel
│   │   │   └── index.ts
│   │   ├── pages/               # 页面 barrel（可选）
│   │   │   └── index.ts
│   │   ├── ui/                  # shadcn/ui 组件
│   │   ├── figma/               # Figma 相关（ImageWithFallback 等）
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FooterOptimized.tsx
│   │   ├── PageShell.tsx
│   │   ├── SEO.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── BreadcrumbNav.tsx
│   │   └── [PageName].tsx       # 各页面组件
│   └── lib/
│       ├── iconMap.tsx          # 共享图标 getIcon(name, size)
│       ├── contactConfig.ts     # 联系信息配置
│       └── bannerConfig.ts      # Banner 图配置（真实图片 URL、占位符描述）
├── admin/                       # 后台管理（独立模块）
│   ├── app/
│   │   ├── layout/AdminLayout.tsx
│   │   ├── routes/              # 后台路由
│   │   └── components/          # 后台组件
│   └── lib/                     # 后台工具（auth, supabase 等）
├── seo/                         # SEO 相关
│   ├── routeTree.ts             # 路由树（面包屑、sitemap）
│   ├── crumbI18n.ts             # 面包屑文案
│   ├── breadcrumbJsonLd.ts      # JSON-LD 生成
│   ├── injectBreadcrumbJsonLd.ts
│   ├── canonicalHreflang.ts
│   └── pageExists.ts            # 缺失页面防护
└── styles/
```

---

## 路由与懒加载策略

### AppRoutes.tsx

- **Eager（首屏/转化）**：LandingPage、ProductsPage、AboutPage、ContactsPage、RequestTenderPackPage、MaterialSupplyOverviewPage、ApplicationsOverviewPage、ProductionPage、ResourcesCenterPage
- **Lazy（按需加载）**：产品子页、Applications 子页、Resources 子页、Material Supply 子页、Manufacturing 子页、Admin 整块

### 约定

- 新增非首屏页面时，使用 `React.lazy` 并配合 `Suspense`
- 懒加载组件需为**默认导出**或通过 `.then(m => ({ default: m.X }))` 包装

```ts
const SomePage = lazy(() =>
  import('@/app/components/SomePage').then((m) => ({ default: m.SomePage }))
);
```

---

## 组件使用规范

| 类型       | 位置                       | 用途                       |
|------------|----------------------------|----------------------------|
| 页面       | `components/[Page].tsx`    | 完整页面，含 content + layout |
| 可复用区块 | `landing/` `products/` 等  | Hero、Stats、Card 等       |
| 共享       | Header、Footer、PageShell、SEO | 布局与 SEO                 |
| 图标       | `lib/iconMap.tsx`          | `getIcon(name, size)`      |

---

## 导入建议

```ts
// 页面
import { ProductsPage } from '@/app/components/pages';

// 共享
import { PageShell, SEO } from '@/app/components/shared';

// 首页区块
import { HeroBanner, StatsBar } from '@/app/components/landing';

// 联系区块
import { ContactMethods, ContactCtaSection } from '@/app/components/contact';

// 制造区块
import { ManufacturingNav } from '@/app/components/manufacturing';

// 图标
import { getIcon } from '@/app/lib/iconMap';
```

---

## Admin 结构

- **路由**：`/admin/login`、`/admin`、`/admin/leads` 等
- **鉴权**：ProtectedRoute 包裹，未登录跳转 `/admin/login`
- **布局**：AdminLayout 统一侧边栏、顶部栏

---

## SEO 模块

- **routeTree.ts**：URL 结构、面包屑 key、sitemap 元数据
- **crumbI18n.ts**：面包屑三语文案
- **pageExists.ts**：按语言判断页面是否存在（sitemap hreflang 防护）
- **scripts/generate-sitemaps.ts**：生成 `sitemap-*.xml`

---

## 约定与维护

1. **新页面**：优先放入对应 section 的 lazy chunk，避免增加首屏体积
2. **联系信息**：统一使用 `contactConfig.ts`，不硬编码 wa.me、t.me、mailto
3. **面包屑**：新增路由时需同步更新 `routeTree.ts` 与 `crumbI18n.ts`
4. **目录职责**：区块按业务归属（landing/products/applications/contact/manufacturing），避免混杂
