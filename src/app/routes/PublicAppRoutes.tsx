import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';

// ── Eager：首屏/转化关键页面 ────────────────────────────────────────────────
import {
  LandingPage,
  AboutPage,
  ProductsPage,
  ContactsPage,
  RequestTenderPackPage,
  MaterialSupplyOverviewPage,
  ApplicationsOverviewPage,
  ProductionPage,
  ResourcesCenterPage,
  NotFoundPage,
} from '@/app/pages';

// ── Lazy：所有按需加载页面（统一从 lazyPages 导入） ──────────────────────────
import {
  PageLoadingFallback,
  // 产品
  LazyThermalPaperPage     as ThermalPaperPage,
  LazyThermalLabelsPage    as ThermalLabelsPage,
  LazyNCRFormsPage         as NCRFormsPage,
  // 原材料
  LazyJumboRollsPage       as JumboRollsPage,
  LazySelfAdhesiveJumboPage as SelfAdhesiveJumboPage,
  LazySelfAdhesiveSheetsPage as SelfAdhesiveSheetsPage,
  LazyNCRJumboPage         as NCRJumboPage,
  LazyNCRSheetsPage        as NCRSheetsPage,
  // 应用场景
  LazyRetailPOSPage        as RetailPOSPage,
  LazyLogisticsWarehousingPage as LogisticsWarehousingPage,
  LazySupermarketsPage     as SupermarketsPage,
  LazyBankingFinancePage   as BankingFinancePage,
  LazyGovernmentTendersPage as GovernmentTendersPage,
  LazyHealthcarePage       as HealthcarePage,
  // 生产制造
  LazyCertificationsPage   as CertificationsPage,
  LazyOEMCustomizationPage as OEMCustomizationPage,
  LazyPackagingLogisticsPage as PackagingLogisticsPage,
  LazyFactoryJournalPage   as FactoryJournalPage,
  // 资源中心
  LazyBlogInsightsPage     as BlogInsightsPage,
  LazyBlogPostDetailPage   as BlogPostDetailPage,
  LazyToolsCalculatorsPage as ToolsCalculatorsPage,
  LazyFAQsPage             as FAQsPage,
  // 其他
  LazyPlaceholderPage      as PlaceholderPage,
} from './lazyPages';

type Lang = 'en' | 'ru' | 'zh';

function createLangRoutes(lang: Lang) {
  const prefix = `/${lang}`;
  return [
    <Route key={`${lang}-home`} path={`${prefix}/`} element={<LandingPage lang={lang} />} />,
    <Route key={`${lang}-products`} path={`${prefix}/products`} element={<ProductsPage lang={lang} />} />,
    <Route key={`${lang}-thermal-paper`} path={`${prefix}/thermal-paper-rolls`} element={<ThermalPaperPage lang={lang} />} />,
    <Route key={`${lang}-thermal-blank`} path={`${prefix}/thermal-paper-rolls/blank`} element={<ThermalPaperPage lang={lang} type="blank" />} />,
    <Route key={`${lang}-thermal-printed`} path={`${prefix}/thermal-paper-rolls/printed`} element={<ThermalPaperPage lang={lang} type="printed" />} />,
    <Route key={`${lang}-pos`} path={`${prefix}/thermal-paper-rolls/pos`} element={<ThermalPaperPage lang={lang} type="pos" />} />,
    <Route key={`${lang}-atm`} path={`${prefix}/thermal-paper-rolls/atm`} element={<ThermalPaperPage lang={lang} type="atm" />} />,
    <Route key={`${lang}-bpa`} path={`${prefix}/thermal-paper-rolls/bpa-free`} element={<ThermalPaperPage lang={lang} type="bpa-free" />} />,
    <Route key={`${lang}-pos-redir`} path={`${prefix}/pos-thermal-paper`} element={<Navigate to={`${prefix}/thermal-paper-rolls/pos`} replace />} />,
    <Route key={`${lang}-atm-redir`} path={`${prefix}/atm-thermal-paper`} element={<Navigate to={`${prefix}/thermal-paper-rolls/atm`} replace />} />,
    <Route key={`${lang}-bpa-redir`} path={`${prefix}/bpa-free-thermal-paper`} element={<Navigate to={`${prefix}/thermal-paper-rolls/bpa-free`} replace />} />,
    <Route key={`${lang}-labels`} path={`${prefix}/thermal-labels`} element={<ThermalLabelsPage lang={lang} />} />,
    <Route key={`${lang}-labels-blank`} path={`${prefix}/thermal-labels/blank`} element={<ThermalLabelsPage lang={lang} type="blank" />} />,
    <Route key={`${lang}-labels-printed`} path={`${prefix}/thermal-labels/printed`} element={<ThermalLabelsPage lang={lang} type="printed" />} />,
    <Route key={`${lang}-labels-4x6`} path={`${prefix}/thermal-labels/4x6`} element={<ThermalLabelsPage lang={lang} type="4x6" />} />,
    <Route key={`${lang}-labels-a6`} path={`${prefix}/thermal-labels/a6`} element={<ThermalLabelsPage lang={lang} type="a6" />} />,
    <Route key={`${lang}-logistics`} path={`${prefix}/thermal-labels/logistics`} element={<ThermalLabelsPage lang={lang} type="logistic" />} />,
    <Route key={`${lang}-labels-4x6-redir`} path={`${prefix}/thermal-labels-4x6`} element={<Navigate to={`${prefix}/thermal-labels/4x6`} replace />} />,
    <Route key={`${lang}-labels-a6-redir`} path={`${prefix}/thermal-labels-a6`} element={<Navigate to={`${prefix}/thermal-labels/a6`} replace />} />,
    <Route key={`${lang}-logistics-redir`} path={`${prefix}/logistics-labels`} element={<Navigate to={`${prefix}/thermal-labels/logistics`} replace />} />,
    <Route key={`${lang}-ncr`} path={`${prefix}/ncr-forms`} element={<NCRFormsPage lang={lang} />} />,
    <Route key={`${lang}-ncr-blank`} path={`${prefix}/ncr-forms/blank`} element={<NCRFormsPage lang={lang} type="blank" />} />,
    <Route key={`${lang}-ncr-printed`} path={`${prefix}/ncr-forms/printed`} element={<NCRFormsPage lang={lang} type="printed" />} />,
    <Route key={`${lang}-ncr-cont`} path={`${prefix}/ncr-forms/continuous`} element={<NCRFormsPage lang={lang} type="continuous" />} />,
    <Route key={`${lang}-material`} path={`${prefix}/material-supply`} element={<MaterialSupplyOverviewPage lang={lang} />} />,
    <Route key={`${lang}-jumbo`} path={`${prefix}/material-supply/thermal-jumbo-rolls`} element={<JumboRollsPage lang={lang} />} />,
    <Route key={`${lang}-sa-jumbo`} path={`${prefix}/material-supply/self-adhesive-jumbo-rolls`} element={<SelfAdhesiveJumboPage lang={lang} />} />,
    <Route key={`${lang}-sa-sheets`} path={`${prefix}/material-supply/self-adhesive-sheets`} element={<SelfAdhesiveSheetsPage lang={lang} />} />,
    <Route key={`${lang}-ncr-jumbo`} path={`${prefix}/material-supply/ncr-jumbo-rolls`} element={<NCRJumboPage lang={lang} />} />,
    <Route key={`${lang}-ncr-sheets`} path={`${prefix}/material-supply/ncr-sheets`} element={<NCRSheetsPage lang={lang} />} />,
    <Route key={`${lang}-sa-redir`} path={`${prefix}/material-supply/self-adhesive`} element={<Navigate to={`${prefix}/material-supply/self-adhesive-jumbo-rolls`} replace />} />,
    <Route key={`${lang}-thermal-redir`} path={`${prefix}/material-supply/thermal-jumbo`} element={<Navigate to={`${prefix}/material-supply/thermal-jumbo-rolls`} replace />} />,
    <Route key={`${lang}-ncr-jumbo-redir`} path={`${prefix}/material-supply/ncr-jumbo`} element={<Navigate to={`${prefix}/material-supply/ncr-jumbo-rolls`} replace />} />,
    <Route key={`${lang}-ncr-redir`} path={`${prefix}/material-supply/ncr`} element={<Navigate to={`${prefix}/material-supply/ncr-jumbo-rolls`} replace />} />,
    <Route key={`${lang}-applications`} path={`${prefix}/applications`} element={<ApplicationsOverviewPage lang={lang} />} />,
    <Route key={`${lang}-retail`} path={`${prefix}/applications/retail-pos`} element={<RetailPOSPage lang={lang} />} />,
    <Route key={`${lang}-logistics-wh`} path={`${prefix}/applications/logistics-warehousing`} element={<LogisticsWarehousingPage lang={lang} />} />,
    <Route key={`${lang}-supermarkets`} path={`${prefix}/applications/supermarkets`} element={<SupermarketsPage lang={lang} />} />,
    <Route key={`${lang}-banking`} path={`${prefix}/applications/banking-finance`} element={<BankingFinancePage lang={lang} />} />,
    <Route key={`${lang}-govt`} path={`${prefix}/applications/government-tenders`} element={<GovernmentTendersPage lang={lang} />} />,
    <Route key={`${lang}-healthcare`} path={`${prefix}/applications/healthcare`} element={<HealthcarePage lang={lang} />} />,
    <Route key={`${lang}-manufacturing`} path={`${prefix}/manufacturing`} element={<ProductionPage lang={lang} />} />,
    <Route key={`${lang}-factory`} path={`${prefix}/manufacturing/factory-overview`} element={<ProductionPage lang={lang} section="factory" />} />,
    <Route key={`${lang}-production`} path={`${prefix}/manufacturing/production-lines`} element={<ProductionPage lang={lang} section="production" />} />,
    <Route key={`${lang}-quality`} path={`${prefix}/manufacturing/quality-control`} element={<ProductionPage lang={lang} section="quality" />} />,
    <Route key={`${lang}-shipping`} path={`${prefix}/manufacturing/packaging-shipping`} element={<PackagingLogisticsPage lang={lang} />} />,
    <Route key={`${lang}-certs`} path={`${prefix}/manufacturing/certifications`} element={<CertificationsPage lang={lang} />} />,
    <Route key={`${lang}-oem`} path={`${prefix}/manufacturing/oem-customization`} element={<OEMCustomizationPage lang={lang} />} />,
    <Route key={`${lang}-factory-journal`} path={`${prefix}/manufacturing/factory-journal`} element={<FactoryJournalPage lang={lang} />} />,
    <Route key={`${lang}-resources`} path={`${prefix}/resources`} element={<ResourcesCenterPage lang={lang} />} />,
    <Route key={`${lang}-blog`} path={`${prefix}/resources/blog-insights`} element={<BlogInsightsPage lang={lang} />} />,
    <Route key={`${lang}-blog-post`} path={`${prefix}/resources/blog-insights/:slug`} element={<BlogPostDetailPage />} />,
    <Route
      key={`${lang}-pkg-log`}
      path={`${prefix}/resources/packaging-logistics`}
      element={<Navigate to={`${prefix}/manufacturing/packaging-shipping`} replace />}
    />,
    <Route key={`${lang}-tools`} path={`${prefix}/resources/tools-calculators`} element={<ToolsCalculatorsPage lang={lang} />} />,
    <Route key={`${lang}-faqs`} path={`${prefix}/resources/faqs`} element={<FAQsPage lang={lang} />} />,
    <Route key={`${lang}-about`} path={`${prefix}/about`} element={<AboutPage />} />,
    <Route key={`${lang}-contact`} path={`${prefix}/contact`} element={<ContactsPage lang={lang} />} />,
    <Route key={`${lang}-tender`} path={`${prefix}/applications/request-tender-pack`} element={<RequestTenderPackPage lang={lang} />} />,
    <Route key={`${lang}-tender-redir`} path={`${prefix}/request-tender-pack`} element={<Navigate to={`${prefix}/applications/request-tender-pack`} replace />} />,
    <Route key={`${lang}-quality-redir`} path={`${prefix}/quality`} element={<Navigate to={`${prefix}/manufacturing/quality-control`} replace />} />,
    <Route key={`${lang}-quality-ctrl-redir`} path={`${prefix}/quality-control`} element={<Navigate to={`${prefix}/manufacturing/quality-control`} replace />} />,
    <Route key={`${lang}-pkg-redir`} path={`${prefix}/packaging-logistics`} element={<Navigate to={`${prefix}/resources/packaging-logistics`} replace />} />,
  ];
}

export function PublicAppRoutes() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        <Route path="/" element={<Navigate to="/en/" replace />} />
        <Route path="/contact" element={<Navigate to="/en/contact" replace />} />
        {createLangRoutes('en')}
        {createLangRoutes('ru')}
        {createLangRoutes('zh')}
        <Route path="/zh/thermal-jumbo-rolls" element={<Navigate to="/zh/material-supply/thermal-jumbo-rolls" replace />} />
        <Route path="/zh/jumbo-rolls" element={<Navigate to="/zh/material-supply/thermal-jumbo-rolls" replace />} />
        <Route path="/zh/self-adhesive-jumbo-rolls" element={<Navigate to="/zh/material-supply/self-adhesive-jumbo-rolls" replace />} />
        <Route path="/zh/self-adhesive-sheets" element={<Navigate to="/zh/material-supply/self-adhesive-sheets" replace />} />
        <Route path="/zh/ncr-jumbo-rolls" element={<Navigate to="/zh/material-supply/ncr-jumbo-rolls" replace />} />
        <Route path="/zh/ncr-sheets" element={<Navigate to="/zh/material-supply/ncr-sheets" replace />} />
        <Route path="/ru/jumbo-rolls" element={<Navigate to="/ru/material-supply/thermal-jumbo-rolls" replace />} />
        <Route path="/en/jumbo-rolls" element={<Navigate to="/en/material-supply/thermal-jumbo-rolls" replace />} />
        <Route path="/ru/contacts" element={<Navigate to="/ru/contact" replace />} />
        <Route path="/zh/contacts" element={<Navigate to="/zh/contact" replace />} />
        <Route path="/en/contacts" element={<Navigate to="/en/contact" replace />} />
        {/* 404 catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

