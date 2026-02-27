import React, { useMemo } from "react";
import { getBreadcrumbData } from "@/seo/breadcrumbData";
import type { Lang } from "@/seo/routeTree";

type Props = { 
  lang: Lang;
};

/**
 * ✅ Breadcrumb Component
 * 
 * @param lang - Language code (en, ru, zh) - REQUIRED
 * 
 * Automatically generates breadcrumb trail based on:
 * - Current pathname (from window.location)
 * - ROUTE_TREE structure
 * - CRUMB_I18N translations
 * 
 * Features:
 * - Single source of truth (routeTree.ts)
 * - Auto-syncs with routing changes
 * - SEO-friendly structured data ready
 * - Home page returns null (no breadcrumb)
 * - Last item not clickable (current page)
 */
export function Breadcrumb({ lang }: Props) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : `/${lang}`;

  const crumbs = useMemo(() => getBreadcrumbData(pathname), [pathname]);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm" style={{ color: '#4b5563' }}>
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="font-semibold" style={{ color: '#111827' }}>{c.name}</span>
              ) : (
                <a 
                  href={c.href} 
                  className="hover:underline"
                  style={{ color: '#4b5563' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#111827'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4b5563'}
                >
                  {c.name}
                </a>
              )}
              {!isLast && <span aria-hidden="true" style={{ color: '#9ca3af' }}>›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}