/**
 * 所有懒加载页面的统一注册处。
 *
 * AppRoutes.tsx 从这里导入，不再自行 lazy()。
 * 新增页面时只需在此文件添加一条记录。
 *
 * Eager（首屏）：LandingPage、ProductsPage、AboutPage、ContactsPage 等
 * Lazy（按需）：以下全部
 */
import React, { Suspense, lazy } from "react";

// ── 加载占位 UI ────────────────────────────────────────────────────────────

/** 页面切换时的 spinner 占位 */
export function PageLoadingFallback() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center" aria-hidden>
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-600"
        role="presentation"
      />
    </div>
  );
}

/** 将懒加载组件包入 Suspense */
export function withSuspense<P extends object>(
  LazyComponent: React.LazyExoticComponent<React.ComponentType<P>>,
  props: P
) {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// ── 产品页面 ───────────────────────────────────────────────────────────────

export const LazyThermalPaperPage = lazy(
  () => import("@/app/pages/ThermalPaperPage").then((m) => ({ default: m.ThermalPaperPage }))
);
export const LazyThermalLabelsPage = lazy(
  () => import("@/app/pages/ThermalLabelsPage").then((m) => ({ default: m.ThermalLabelsPage }))
);
export const LazyNCRFormsPage = lazy(
  () => import("@/app/pages/NCRFormsPage").then((m) => ({ default: m.NCRFormsPage }))
);

// ── 原材料页面 ─────────────────────────────────────────────────────────────

export const LazyJumboRollsPage = lazy(
  () => import("@/app/pages/JumboRollsPage").then((m) => ({ default: m.JumboRollsPage }))
);
export const LazySelfAdhesiveJumboPage = lazy(
  () => import("@/app/pages/SelfAdhesiveJumboPage").then((m) => ({ default: m.SelfAdhesiveJumboPage }))
);
export const LazySelfAdhesiveSheetsPage = lazy(
  () => import("@/app/pages/SelfAdhesiveSheetsPage").then((m) => ({ default: m.SelfAdhesiveSheetsPage }))
);
export const LazyNCRJumboPage = lazy(
  () => import("@/app/pages/NCRJumboPage").then((m) => ({ default: m.NCRJumboPage }))
);
export const LazyNCRSheetsPage = lazy(
  () => import("@/app/pages/NCRSheetsPage").then((m) => ({ default: m.NCRSheetsPage }))
);

// ── 应用场景页面 ───────────────────────────────────────────────────────────

export const LazyRetailPOSPage = lazy(
  () => import("@/app/pages/RetailPOSPage").then((m) => ({ default: m.RetailPOSPage }))
);
export const LazyLogisticsWarehousingPage = lazy(
  () => import("@/app/pages/LogisticsWarehousingPage").then((m) => ({ default: m.LogisticsWarehousingPage }))
);
export const LazySupermarketsPage = lazy(
  () => import("@/app/pages/SupermarketsPage").then((m) => ({ default: m.SupermarketsPage }))
);
export const LazyBankingFinancePage = lazy(
  () => import("@/app/pages/BankingFinancePage").then((m) => ({ default: m.BankingFinancePage }))
);
export const LazyGovernmentTendersPage = lazy(
  () => import("@/app/pages/GovernmentTendersPage").then((m) => ({ default: m.GovernmentTendersPage }))
);
export const LazyHealthcarePage = lazy(
  () => import("@/app/pages/HealthcarePage").then((m) => ({ default: m.HealthcarePage }))
);

// ── 生产制造页面 ───────────────────────────────────────────────────────────

export const LazyCertificationsPage = lazy(
  () => import("@/app/pages/CertificationsPage").then((m) => ({ default: m.CertificationsPage }))
);
export const LazyOEMCustomizationPage = lazy(
  () => import("@/app/pages/OEMCustomizationPage").then((m) => ({ default: m.OEMCustomizationPage }))
);
export const LazyPackagingLogisticsPage = lazy(
  () => import("@/app/pages/PackagingLogisticsPage").then((m) => ({ default: m.PackagingLogisticsPage }))
);
export const LazyFactoryJournalPage = lazy(
  () => import("@/app/pages/FactoryJournalPage").then((m) => ({ default: m.FactoryJournalPage }))
);

// ── 资源中心页面 ───────────────────────────────────────────────────────────

export const LazyBlogInsightsPage = lazy(
  () => import("@/app/pages/BlogInsightsPage").then((m) => ({ default: m.BlogInsightsPage }))
);
export const LazyBlogPostDetailPage = lazy(
  () => import("@/app/pages/BlogPostDetailPage").then((m) => ({ default: m.BlogPostDetailPage }))
);
export const LazyToolsCalculatorsPage = lazy(
  () => import("@/app/pages/ToolsCalculatorsPage").then((m) => ({ default: m.ToolsCalculatorsPage }))
);
export const LazyFAQsPage = lazy(
  () => import("@/app/pages/FAQsPage").then((m) => ({ default: m.FAQsPage }))
);

// ── 其他公开页面 ───────────────────────────────────────────────────────────

export const LazyPlaceholderPage = lazy(
  () => import("@/app/pages/PlaceholderPage").then((m) => ({ default: m.PlaceholderPage }))
);

// ── Admin 后台页面 ─────────────────────────────────────────────────────────

export const LazyLoginPage = lazy(
  () => import("@/admin/app/routes/login").then((m) => ({ default: m.LoginPage }))
);
export const LazyDashboardPage = lazy(
  () => import("@/admin/app/routes/dashboard").then((m) => ({ default: m.DashboardPage }))
);
export const LazyLeadsListPage = lazy(
  () => import("@/admin/app/routes/leads/index").then((m) => ({ default: m.LeadsListPage }))
);
export const LazyLeadDetailPage = lazy(
  () => import("@/admin/app/routes/leads/detail").then((m) => ({ default: m.LeadDetailPage }))
);
export const LazyAssetsLibraryPage = lazy(
  () => import("@/admin/app/routes/assets/index").then((m) => ({ default: m.AssetsLibraryPage }))
);
export const LazyPlaceholderTrackerPage = lazy(
  () => import("@/admin/app/routes/placeholders/index").then((m) => ({ default: m.PlaceholderTrackerPage }))
);
export const LazyEvidenceTagsPage = lazy(
  () => import("@/admin/app/routes/assets/evidence-tags").then((m) => ({ default: m.EvidenceTagsPage }))
);
export const LazyPageAssetsMappingPage = lazy(
  () => import("@/admin/app/routes/page-assets/index").then((m) => ({ default: m.PageAssetsMappingPage }))
);
export const LazyFactoryJournalAdminPage = lazy(
  () => import("@/admin/app/routes/factory-journal/index").then((m) => ({ default: m.FactoryJournalAdminPage }))
);
export const LazyBlogAdminPage = lazy(
  () => import("@/admin/app/routes/blog/index").then((m) => ({ default: m.BlogAdminPage }))
);
export const LazyBlogNewPage = lazy(
  () => import("@/admin/app/routes/blog/new").then((m) => ({ default: m.BlogNewPage }))
);
export const LazyBlogEditPage = lazy(
  () => import("@/admin/app/routes/blog/edit").then((m) => ({ default: m.BlogEditPage }))
);
