/**
 * Pure breadcrumb logic - uses relative imports so tsx can load without path aliases.
 * Used by: Breadcrumb.tsx, test-breadcrumb-ui.ts
 */

import { ROUTE_TREE, type Lang, type RouteNode } from "./routeTree";
import { CRUMB_I18N } from "./crumbI18n";

type MatchedNode = { seg: string; key: string; parentKey?: string; parentSeg?: string };

export type CrumbItem = { name: string; href: string };

const LOGICAL_CHILD_PARENTS = {
  thermalPaperRolls: {
    blank: "blankThermalRolls",
    printed: "printedThermalRolls",
  },
  thermalLabels: {
    blank: "blankThermalLabels",
    printed: "printedThermalLabels",
  },
  ncrForms: {
    blank: "blankNcrForms",
    printed: "printedNcrForms",
  },
} as const;

function resolveNameKey(key: string, parentKey?: string): string {
  if (!parentKey) return key;
  const scoped = LOGICAL_CHILD_PARENTS[parentKey as keyof typeof LOGICAL_CHILD_PARENTS];
  if (!scoped) return key;
  return scoped[key as keyof typeof scoped] ?? key;
}

function matchByTree(
  segments: string[],
  tree: RouteNode[],
  maxDepth = 4
): MatchedNode[] {
  const out: MatchedNode[] = [];
  let currentLevel = tree;

  for (let i = 0; i < segments.length && i < maxDepth; i++) {
    const seg = segments[i];
    let node = currentLevel.find((n) => n.seg === seg);

    // Product detail pages are routed flat (/thermal-paper-rolls), but breadcrumbs
    // also need to understand logical nested URLs (/products/thermal-paper-rolls).
    if (!node && out.length === 1 && out[0].key === "products") {
      node = tree.find((n) => n.seg === seg && n.parentKey === "products");
    }

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

function inferLang(pathname: string): Lang {
  const segs = pathname.split("/").filter(Boolean);
  if (segs[0] === "en" || segs[0] === "ru" || segs[0] === "zh") return segs[0] as Lang;
  return "en";
}

/**
 * Returns breadcrumb items for a given pathname.
 * Pathname format: /{lang}/... (e.g. /en/products/thermal-paper-rolls)
 */
export function getBreadcrumbData(pathname: string): CrumbItem[] {
  const lang = inferLang(pathname);
  const map = CRUMB_I18N[lang];

  const clean = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const segs = clean.split("/").filter(Boolean);

  const rest = segs[0] === lang ? segs.slice(1) : segs;

  if (rest.length === 0) return [];

  const matched = matchByTree(rest, ROUTE_TREE, 4);
  if (matched.length === 0) return [];

  const list: CrumbItem[] = [{ name: map.home, href: `/${lang}` }];
  let acc = `/${lang}`;
  const parentInserted = new Set<string>();
  const seenKeys = new Set<string>();

  matched.forEach((m, idx) => {
    if (
      m.parentKey &&
      m.parentSeg &&
      !parentInserted.has(m.parentKey) &&
      !seenKeys.has(m.parentKey)
    ) {
      parentInserted.add(m.parentKey);
      list.push({ name: map[m.parentKey] ?? m.parentSeg, href: `${acc}/${m.parentSeg}` });
    }
    acc += `/${m.seg}`;
    const parentKey = idx > 0 ? matched[idx - 1].key : undefined;
    const nameKey = resolveNameKey(m.key, parentKey);
    list.push({ name: map[nameKey] ?? map[m.key] ?? m.seg, href: acc });
    seenKeys.add(m.key);
  });

  return list;
}

export function debugMatchPath(pathname: string): {
  lang: Lang;
  segments: string[];
  matched: MatchedNode[];
} {
  const clean = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const lang = inferLang(clean);
  const allSegments = clean.split("/").filter(Boolean);
  const segments = allSegments[0] === lang ? allSegments.slice(1) : allSegments;

  return {
    lang,
    segments,
    matched: matchByTree(segments, ROUTE_TREE, 4),
  };
}
