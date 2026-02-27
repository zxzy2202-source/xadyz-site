import { type Lang } from "./routeTree";
import { availableLangsForPath } from "./pageExists";

const SITE = "https://xadyz.com";
const LANGS: Lang[] = ["en", "ru", "zh"];
const PREFERRED_X_DEFAULT: Lang = "en";

/**
 * Normalize pathname (remove trailing slash except root)
 */
function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/**
 * Detect language from pathname
 */
function detectLang(pathname: string): Lang {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg === "en" || seg === "ru" || seg === "zh") return seg;
  return "en";
}

/**
 * Extract path without language prefix
 * e.g., "/ru/products/thermal-paper" → "/products/thermal-paper"
 */
function getRestPath(pathname: string, lang: Lang): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === lang) {
    segments.shift();
  }
  return segments.length ? `/${segments.join("/")}` : "";
}

/**
 * Build full URL for a language and path
 */
function buildUrl(lang: Lang, restPath: string): string {
  return `${SITE}/${lang}${restPath}`;
}

/**
 * Upsert or update a <link> tag with specific attributes
 */
function upsertLink(id: string, attrs: Record<string, string>): void {
  const head = document.head;
  let el = document.getElementById(id) as HTMLLinkElement | null;

  if (!el) {
    el = document.createElement("link");
    el.id = id;
    head.appendChild(el);
  }

  // Remove all existing attributes
  while (el.attributes.length > 0) {
    el.removeAttribute(el.attributes[0].name);
  }

  // Set new attributes (including id)
  el.id = id;
  Object.entries(attrs).forEach(([key, value]) => {
    el!.setAttribute(key, value);
  });
}

/**
 * Remove a <link> tag by id
 */
function removeLink(id: string): void {
  const el = document.getElementById(id);
  if (el?.parentNode) {
    el.parentNode.removeChild(el);
  }
}

/**
 * ✅ Generate Canonical URL
 * 
 * Creates the canonical URL for the current page.
 * Essential for multi-language SEO to prevent duplicate content issues.
 * 
 * @param pathname - Current page pathname
 * @returns Canonical URL string
 */
export function generateCanonical(pathname: string): string {
  const clean = normalizePathname(pathname);
  const lang = detectLang(clean);
  const restPath = getRestPath(clean, lang);

  return buildUrl(lang, restPath);
}

/**
 * ✅ Generate Alternate Language Links (hreflang) with Missing Page Protection
 * 
 * Creates hreflang links ONLY for languages where the page actually exists.
 * Critical for international SEO (especially Yandex for Russia/CIS).
 * 
 * Key improvement: Uses pageExists() to prevent generating links to 404 pages.
 * 
 * @param pathname - Current page pathname
 * @returns Array of hreflang objects
 */
export function generateHreflangs(pathname: string): Array<{
  hreflang: string;
  href: string;
}> {
  const clean = normalizePathname(pathname);
  const currentLang = detectLang(clean);
  const restPath = getRestPath(clean, currentLang);

  // ✅ MISSING PAGE PROTECTION: Only include languages where page exists
  const existingLangs = availableLangsForPath(restPath, LANGS);

  const hreflangs: Array<{ hreflang: string; href: string }> = [];

  // Generate hreflang for each existing language
  for (const lang of existingLangs) {
    hreflangs.push({
      hreflang: lang,
      href: buildUrl(lang, restPath),
    });
  }

  // Add x-default (prefer EN, otherwise first available)
  const xDefault = existingLangs.includes(PREFERRED_X_DEFAULT)
    ? PREFERRED_X_DEFAULT
    : existingLangs[0];

  if (xDefault) {
    hreflangs.push({
      hreflang: "x-default",
      href: buildUrl(xDefault, restPath),
    });
  }

  return hreflangs;
}

/**
 * ✅ Inject Canonical and Hreflang Tags with Missing Page Protection
 * 
 * Automatically injects canonical and hreflang meta tags into <head>.
 * Should be called on page load/route change.
 * 
 * Key features:
 * - Canonical always points to current page (you're on it, so it exists)
 * - Hreflang ONLY includes languages where page actually exists
 * - Removes hreflang tags for unavailable languages (prevents old tags from persisting)
 * - Prevents 404 errors in alternate language links
 * 
 * SEO Benefits:
 * - Prevents duplicate content penalties
 * - Helps search engines understand language relationships
 * - Critical for Yandex (Russia/CIS focus)
 * - Improves international search rankings
 * - No broken alternate links
 * 
 * @example
 * ```ts
 * // In main entry point or route change handler
 * import { injectCanonicalAndHreflang } from './seo/canonicalHreflang';
 * injectCanonicalAndHreflang();
 * ```
 */
export function injectCanonicalAndHreflang(): void {
  const pathname = normalizePathname(window.location.pathname);
  const lang = detectLang(pathname);
  const restPath = getRestPath(pathname, lang);

  // Inject canonical (current page always exists since you're on it)
  const canonical = buildUrl(lang, restPath);
  upsertLink("seo-canonical", {
    rel: "canonical",
    href: canonical,
  });

  // ✅ MISSING PAGE PROTECTION: Only inject hreflang for existing pages
  const existingLangs = availableLangsForPath(restPath, LANGS);

  // Inject hreflang for each existing language
  existingLangs.forEach((l) => {
    upsertLink(`seo-hreflang-${l}`, {
      rel: "alternate",
      hreflang: l,
      href: buildUrl(l, restPath),
    });
  });

  // ✅ CLEANUP: Remove hreflang tags for unavailable languages
  // This prevents old tags from persisting after language availability changes
  LANGS.filter((l) => !existingLangs.includes(l)).forEach((l) => {
    removeLink(`seo-hreflang-${l}`);
  });

  // Inject x-default
  const xDefault = existingLangs.includes(PREFERRED_X_DEFAULT)
    ? PREFERRED_X_DEFAULT
    : existingLangs[0];

  if (xDefault) {
    upsertLink("seo-hreflang-x-default", {
      rel: "alternate",
      hreflang: "x-default",
      href: buildUrl(xDefault, restPath),
    });
  } else {
    // No languages available - remove x-default
    removeLink("seo-hreflang-x-default");
  }

  // Log for debugging (only in development)
  if (process.env.NODE_ENV === "development") {
    console.log("✅ SEO Tags Injected:");
    console.log(`   Canonical: ${canonical}`);
    console.log(`   Hreflangs: ${existingLangs.join(", ")} + x-default`);
    if (existingLangs.length < LANGS.length) {
      const missing = LANGS.filter((l) => !existingLangs.includes(l));
      console.log(`   ⚠️  Unavailable in: ${missing.join(", ")}`);
    }
  }
}

/**
 * Get current canonical URL (for debugging)
 */
export function getCurrentCanonical(): string {
  return generateCanonical(window.location.pathname);
}

/**
 * Get current hreflangs (for debugging)
 */
export function getCurrentHreflangs(): Array<{ hreflang: string; href: string }> {
  return generateHreflangs(window.location.pathname);
}

/**
 * Debug: Check which languages are available for current page
 */
export function debugCurrentPageAvailability(): {
  currentLang: Lang;
  restPath: string;
  availableIn: Lang[];
  unavailableIn: Lang[];
} {
  const pathname = normalizePathname(window.location.pathname);
  const currentLang = detectLang(pathname);
  const restPath = getRestPath(pathname, currentLang);
  const availableIn = availableLangsForPath(restPath, LANGS);
  const unavailableIn = LANGS.filter((l) => !availableIn.includes(l));

  return {
    currentLang,
    restPath,
    availableIn,
    unavailableIn,
  };
}
