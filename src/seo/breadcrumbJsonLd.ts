import { debugMatchPath as getBreadcrumbDebug, getBreadcrumbData } from "./breadcrumbData";
import type { Lang } from "./routeTree";

const SITE = "https://xadyz.com";

/**
 * Detect language from pathname
 */
function detectLang(pathname: string): Lang {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg === "en" || seg === "ru" || seg === "zh") return seg;
  return "en";
}

/**
 * Get homepage URL (with trailing slash for sitemap consistency)
 */
function homeUrl(lang: Lang): string {
  return `${SITE}/${lang}/`;
}

/**
 * ✅ Build BreadcrumbList JSON-LD (Fully Automated)
 * 
 * Generates schema.org BreadcrumbList based on:
 * - Current URL pathname
 * - ROUTE_TREE structure (automatic matching)
 * - CRUMB_I18N translations
 * 
 * Key improvements:
 * - Zero manual mapping needed
 * - Automatically stops at unknown segments
 * - Returns null for homepage (no breadcrumb needed)
 * - Returns null if no segments match (prevents bad data)
 * 
 * @param pathname - Current page pathname
 * @returns JSON-LD object or null
 */
export function buildBreadcrumbJsonLd(pathname: string): object | null {
  const lang = detectLang(pathname);
  const crumbs = getBreadcrumbData(pathname);

  if (crumbs.length === 0) {
    return null;
  }

  const items = crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: index === 0 ? homeUrl(lang) : `${SITE}${crumb.href}`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/**
 * Get JSON-LD as string for SSR/static generation
 */
export function getBreadcrumbJsonLdString(pathname: string): string | null {
  const jsonLd = buildBreadcrumbJsonLd(pathname);
  return jsonLd ? JSON.stringify(jsonLd) : null;
}

/**
 * Debug function: Get all matched steps for a pathname
 * Useful for testing and debugging
 */
export function debugMatchPath(pathname: string): {
  lang: Lang;
  segments: string[];
  matched: Array<{ seg: string; key: string; parentKey?: string; parentSeg?: string }>;
} {
  return getBreadcrumbDebug(pathname);
}
