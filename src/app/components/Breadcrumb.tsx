import React, { useMemo } from "react";
import { useLocation } from "react-router";
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
 * - Current pathname (from React Router useLocation)
 * - ROUTE_TREE structure
 * - CRUMB_I18N translations
 * 
 * Features:
 * - Single source of truth (routeTree.ts)
 * - Auto-syncs with routing changes (uses useLocation, not window.location)
 * - SEO-friendly structured data ready
 * - Home page returns null (no breadcrumb)
 * - Last item not clickable (current page)
 */
export function Breadcrumb({ lang }: Props) {
  const location = useLocation();
  const pathname = location.pathname;

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