import React from 'react';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Header } from '@/app/components/Header';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';

type PageShellProps = {
  lang: "en" | "ru" | "zh";
  hero?: React.ReactNode;        // 页面标题区（可选）
  children: React.ReactNode;     // 正文内容
  showBreadcrumb?: boolean;      // 默认 true（首页传 false）
  footer?: React.ReactNode;      // 可选自定义 Footer（如 ResourcesFooter）
};

/**
 * ✅ PageShell - Lightweight unified layout
 * 
 * Wraps all non-home pages with:
 * - Header
 * - Hero Section (passed as prop)
 * - Breadcrumb (automatically inserted)
 * - Page Body (children)
 * - Footer
 */
export function PageShell({
  lang,
  hero,
  children,
  showBreadcrumb = true,
  footer,
}: PageShellProps) {
  return (
    <>
      <Header />

      {/* 🔥 Hero区域移到main外面，避免被pt-32推下去 */}
      {hero}

      <main className="pb-20">
        {/* 面包屑导航 - 清爽版本 */}
        {showBreadcrumb && (
          <div className="w-full bg-gray-50 py-4 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
              <Breadcrumb lang={lang} />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {children}
        </div>
      </main>

      {footer ?? <Footer />}
    </>
  );
}