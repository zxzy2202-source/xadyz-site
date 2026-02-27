import { ROUTE_TREE, type Lang, type RouteNode } from "./routeTree";
import { CRUMB_I18N } from "./crumbI18n";

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
 * Get base URL for a language
 */
function baseUrl(lang: Lang): string {
  return `${SITE}/${lang}`;
}

/**
 * Match result containing segment and its key
 */
type MatchStep = {
  seg: string;
  key: string;
  parentKey?: string;
  parentSeg?: string;
};

/**
 * Match URL segments against ROUTE_TREE.
 * Supports parentKey for flat URLs (e.g. /thermal-paper-rolls under Products).
 */
function matchByTree(
  segments: string[],
  tree: RouteNode[],
  maxDepth = 4
): MatchStep[] {
  const out: MatchStep[] = [];
  let currentLevel = tree;

  for (let i = 0; i < segments.length && i < maxDepth; i++) {
    const seg = segments[i];
    const node = currentLevel.find((n) => n.seg === seg);
    if (!node) break;

    out.push({
      seg,
      key: node.key,
      ...(node.parentKey && node.parentSeg && { parentKey: node.parentKey, parentSeg: node.parentSeg }),
    });
    currentLevel = node.children ?? [];
  }

  return out;
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
  // Clean trailing slash (except root)
  const clean = pathname.endsWith("/") && pathname !== "/" 
    ? pathname.slice(0, -1) 
    : pathname;

  // Detect language
  const lang = detectLang(clean);
  const translations = CRUMB_I18N[lang];

  // Parse URL segments
  const allSegments = clean.split("/").filter(Boolean);
  const pathSegments = allSegments[0] === lang ? allSegments.slice(1) : allSegments;

  // Homepage - no breadcrumb needed
  if (pathSegments.length === 0) {
    return null;
  }

  // ✅ AUTOMATIC TREE MATCHING (Maximum 4 levels)
  const matched = matchByTree(pathSegments, ROUTE_TREE, 4);

  // No matches found - prevent bad data
  if (matched.length === 0) {
    return null;
  }

  // Build breadcrumb items
  const items: any[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: translations.home,
      item: baseUrl(lang),
    },
  ];

  // Add matched path segments (inject parent when parentKey is set; parent not in actual URL)
  let accumulatedPath = baseUrl(lang);
  const parentInserted = new Set<string>();

  for (let i = 0; i < matched.length; i++) {
    const m = matched[i];
    if (m.parentKey && m.parentSeg && !parentInserted.has(m.parentKey)) {
      parentInserted.add(m.parentKey);
      const parentHref = `${accumulatedPath}/${m.parentSeg}`;
      items.push({
        "@type": "ListItem",
        position: items.length + 1,
        name: translations[m.parentKey] ?? m.parentSeg,
        item: parentHref,
      });
    }
    accumulatedPath += `/${m.seg}`;
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: translations[m.key] ?? m.seg,
      item: accumulatedPath,
    });
  }

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
  matched: MatchStep[];
} {
  const clean = pathname.endsWith("/") && pathname !== "/" 
    ? pathname.slice(0, -1) 
    : pathname;
  
  const lang = detectLang(clean);
  const allSegments = clean.split("/").filter(Boolean);
  const segments = allSegments[0] === lang ? allSegments.slice(1) : allSegments;
  const matched = matchByTree(segments, ROUTE_TREE, 4);

  return { lang, segments, matched };
}
