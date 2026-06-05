import { ROUTE_TREE, type Lang, type RouteNode } from "./routeTree";

/**
 * Check if a route node allows a specific language
 * @param node - Route node to check
 * @param lang - Language to check
 * @returns true if language is allowed (or not restricted)
 */
function nodeAllowsLang(node: RouteNode, lang: Lang): boolean {
  // If availableLangs is not specified, all languages are allowed
  return !node.availableLangs || node.availableLangs.includes(lang);
}

/**
 * ✅ Check if a page exists for a specific language
 * 
 * This is the core "missing page protection" function.
 * It traverses the ROUTE_TREE to verify:
 * 1. The path structure exists in ROUTE_TREE
 * 2. Each node in the path allows the specified language
 * 
 * Use cases:
 * - Sitemap generation: Skip pages that don't exist in a language
 * - Hreflang generation: Only output links to existing pages
 * - Route validation: Verify a URL is valid for a language
 * 
 * @param lang - Language to check (en, ru, zh)
 * @param restPath - Path without language prefix, e.g., "" or "/products/thermal-paper"
 * @returns true if page exists for this language
 * 
 * @example
 * ```ts
 * pageExists("en", "/products/thermal-paper") // true
 * pageExists("zh", "/applications/government-tenders") // false (only EN/RU)
 * pageExists("ru", "") // true (homepage)
 * ```
 */
export function pageExists(lang: Lang, restPath: string): boolean {
  // Homepage always exists for all languages (configurable if needed)
  if (restPath === "" || restPath === "/") {
    return true;
  }

  // Parse segments from path
  const segments = restPath.split("/").filter(Boolean);
  
  let currentLevel: RouteNode[] = ROUTE_TREE;

  // Traverse tree following the path
  for (const segment of segments) {
    // Find matching node at current level
    const node = currentLevel.find((n) => n.seg === segment);
    
    // Path doesn't exist in tree
    if (!node) {
      return false;
    }
    
    // Node exists but doesn't allow this language
    if (!nodeAllowsLang(node, lang)) {
      return false;
    }
    
    // Move to next level
    currentLevel = node.children ?? [];
  }

  // Successfully traversed entire path and all nodes allow this language
  return true;
}

/**
 * ✅ Get available languages for a specific path
 * 
 * Returns the list of languages in which a page actually exists.
 * Useful for:
 * - Generating hreflang links (only to existing pages)
 * - Showing language switcher (hide unavailable languages)
 * - Analytics (track which pages need translation)
 * 
 * @param restPath - Path without language prefix
 * @param allLangs - All possible languages to check
 * @returns Array of languages where page exists
 * 
 * @example
 * ```ts
 * availableLangsForPath("/products/thermal-paper", ["en", "ru", "zh"])
 * // → ["en", "ru", "zh"] (exists in all)
 * 
 * availableLangsForPath("/applications/government-tenders", ["en", "ru", "zh"])
 * // → ["en", "ru"] (only these two)
 * ```
 */
export function availableLangsForPath(
  restPath: string,
  allLangs: Lang[]
): Lang[] {
  return allLangs.filter((lang) => pageExists(lang, restPath));
}

/**
 * ✅ Get most restrictive language availability in a path
 * 
 * Walks through the path and returns the most restrictive availableLangs
 * found along the way. This is useful for understanding language constraints.
 * 
 * @param restPath - Path without language prefix
 * @returns Most restrictive Lang[] or undefined if no restrictions
 * 
 * @example
 * ```ts
 * getMostRestrictiveLangs("/applications/government-tenders")
 * // → ["en", "ru"] (restricted at government-tenders node)
 * 
 * getMostRestrictiveLangs("/products/thermal-paper")
 * // → undefined (no restrictions)
 * ```
 */
export function getMostRestrictiveLangs(restPath: string): Lang[] | undefined {
  if (restPath === "" || restPath === "/") {
    return undefined;
  }

  const segments = restPath.split("/").filter(Boolean);
  let currentLevel: RouteNode[] = ROUTE_TREE;
  let mostRestrictive: Lang[] | undefined;

  for (const segment of segments) {
    const node = currentLevel.find((n) => n.seg === segment);
    if (!node) break;

    // If this node has restrictions, it becomes the most restrictive
    if (node.availableLangs) {
      if (!mostRestrictive || node.availableLangs.length < mostRestrictive.length) {
        mostRestrictive = node.availableLangs;
      }
    }

    currentLevel = node.children ?? [];
  }

  return mostRestrictive;
}

/**
 * Debug utility: Get detailed path analysis
 * 
 * @param restPath - Path to analyze
 * @param allLangs - All languages to check
 * @returns Detailed analysis object
 */
export function analyzePath(restPath: string, allLangs: Lang[] = ["en", "ru", "zh"]) {
  const available = availableLangsForPath(restPath, allLangs);
  const unavailable = allLangs.filter((l) => !available.includes(l));
  const mostRestrictive = getMostRestrictiveLangs(restPath);

  return {
    path: restPath,
    availableIn: available,
    unavailableIn: unavailable,
    mostRestrictiveLangs: mostRestrictive,
    isFullyAvailable: available.length === allLangs.length,
    isPartiallyAvailable: available.length > 0 && available.length < allLangs.length,
    isUnavailable: available.length === 0,
  };
}
