import fs from "node:fs";
import path from "node:path";
import { ROUTE_TREE, type Lang, type RouteNode, type SeoMeta } from "../src/seo/routeTree.js";
import { availableLangsForPath, pageExists } from "../src/seo/pageExists.js";

const SITE = "https://xadyz.com";
const LANGS: Lang[] = ["en", "ru", "zh"];
const PREFERRED_X_DEFAULT: Lang = "en";
const LASTMOD = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

type FlatItem = {
  segs: string[];
  seo?: SeoMeta;
};

type FlatRoute = {
  loc: string;
  restPath: string; // "" or "/products/..."
  changefreq: NonNullable<SeoMeta["changefreq"]>;
  priority: number;
  lastmod: string;
};

/**
 * Escape special XML characters
 */
function escXml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/**
 * Join path segments cleanly
 */
function joinPath(...parts: string[]): string {
  const p = parts.join("/").replace(/\/+/g, "/");
  return p.startsWith("/") ? p : `/${p}`;
}

/**
 * Build full URL for a language and path
 */
function buildUrl(lang: Lang, restPath: string): string {
  return `${SITE}/${lang}${restPath}`;
}

/**
 * Default SEO values based on depth if not specified in ROUTE_TREE
 */
function defaultsForDepth(depth: number): SeoMeta {
  if (depth === 0) return { changefreq: "weekly", priority: 0.9 };
  if (depth === 1) return { changefreq: "weekly", priority: 0.8 };
  return { changefreq: "monthly", priority: 0.7 };
}

/**
 * Flatten the route tree into a list of path segments with SEO metadata
 */
function flattenTree(
  tree: RouteNode[],
  prefixSegs: string[] = [],
  depth = 0
): FlatItem[] {
  const out: FlatItem[] = [];

  for (const node of tree) {
    const segs = [...prefixSegs, node.seg];
    out.push({ segs, seo: node.seo ?? defaultsForDepth(depth) });

    if (node.children?.length) {
      out.push(...flattenTree(node.children, segs, depth + 1));
    }
  }

  return out;
}

/**
 * ✅ Build hreflang alternate links for a path
 * 
 * Only includes languages where the page actually exists.
 * Prevents generating links to 404 pages.
 */
function buildHreflangLinks(restPath: string): string {
  const existingLangs = availableLangsForPath(restPath, LANGS);

  // Choose x-default: prefer EN, otherwise use first available language
  const xDefault = existingLangs.includes(PREFERRED_X_DEFAULT)
    ? PREFERRED_X_DEFAULT
    : existingLangs[0];

  const lines: string[] = [];

  // Add alternate link for each existing language
  for (const lang of existingLangs) {
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escXml(
        buildUrl(lang, restPath)
      )}" />`
    );
  }

  // Add x-default if we have at least one language
  if (xDefault) {
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escXml(
        buildUrl(xDefault, restPath)
      )}" />`
    );
  }

  return lines.join("\n");
}

/**
 * Build XML urlset (sitemap-en.xml, sitemap-ru.xml, etc.)
 */
function buildUrlsetXml(urls: FlatRoute[]): string {
  const body = urls
    .map((u) => {
      const hreflang = buildHreflangLinks(u.restPath);
      return [
        "  <url>",
        `    <loc>${escXml(u.loc)}</loc>`,
        `    <lastmod>${u.lastmod}</lastmod>`,
        `    <changefreq>${u.changefreq}</changefreq>`,
        `    <priority>${u.priority.toFixed(1)}</priority>`,
        hreflang, // Empty if no other languages exist
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    body +
    `\n</urlset>`
  );
}

/**
 * Build sitemap index (sitemap.xml)
 */
function buildSitemapIndexXml(items: { loc: string; lastmod: string }[]): string {
  const body = items
    .map((i) => {
      return [
        "  <sitemap>",
        `    <loc>${escXml(i.loc)}</loc>`,
        `    <lastmod>${i.lastmod}</lastmod>`,
        "  </sitemap>",
      ].join("\n");
    })
    .join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    body +
    `\n</sitemapindex>`
  );
}

/**
 * Ensure directory exists
 */
function ensureDir(p: string): void {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

/**
 * ✅ Main sitemap generation function with missing page protection
 */
function main() {
  const publicDir = path.resolve(process.cwd(), "public");
  ensureDir(publicDir);

  console.log("🌐 Generating sitemaps with hreflang support...\n");

  // Flatten ROUTE_TREE to get all paths
  const flat = flattenTree(ROUTE_TREE);

  let totalUrls = 0;
  const stats: Record<Lang, { total: number; skipped: number }> = {
    en: { total: 0, skipped: 0 },
    ru: { total: 0, skipped: 0 },
    zh: { total: 0, skipped: 0 },
  };

  // Generate sitemap for each language
  for (const lang of LANGS) {
    const urls: FlatRoute[] = [];

    // Homepage (always exists - you can make this configurable)
    const rootPriority = lang === "zh" ? 0.8 : 1.0;
    urls.push({
      loc: `${SITE}/${lang}/`,
      restPath: "",
      changefreq: "weekly",
      priority: rootPriority,
      lastmod: LASTMOD,
    });
    stats[lang].total++;

    // Process all pages from ROUTE_TREE
    for (const r of flat) {
      const restPath = joinPath(...r.segs);

      // ✅ MISSING PAGE PROTECTION: Skip if page doesn't exist in this language
      if (!pageExists(lang, restPath)) {
        stats[lang].skipped++;
        continue;
      }

      const seo = r.seo ?? { changefreq: "monthly", priority: 0.7 };

      urls.push({
        loc: buildUrl(lang, restPath),
        restPath,
        changefreq: seo.changefreq ?? "monthly",
        priority: Math.max(0, Math.min(1, seo.priority ?? 0.7)),
        lastmod: LASTMOD,
      });
      stats[lang].total++;
    }

    const xml = buildUrlsetXml(urls);
    const filename = `sitemap-${lang}.xml`;
    const filepath = path.join(publicDir, filename);

    fs.writeFileSync(filepath, xml, "utf8");
    console.log(`✅ ${filename.padEnd(18)} - ${urls.length.toString().padStart(3)} URLs`);
    
    totalUrls += urls.length;
  }

  // Generate sitemap index
  const indexXml = buildSitemapIndexXml([
    // 站点多语言 sitemap
    ...LANGS.map((lang) => ({
      loc: `${SITE}/sitemap-${lang}.xml`,
      lastmod: LASTMOD,
    })),
    // 博客文章 sitemap 待博客子应用部署后再启用：
    // { loc: `${SITE}/blog/sitemap.xml`, lastmod: LASTMOD },
  ]);
  const indexPath = path.join(publicDir, "sitemap.xml");

  fs.writeFileSync(indexPath, indexXml, "utf8");
  console.log(`✅ sitemap.xml        - Index (3 sitemaps)`);

  // Summary
  console.log("\n📊 Generation Summary:");
  console.log(`   Total URLs:     ${totalUrls}`);
  console.log(`   Languages:      ${LANGS.join(", ")}`);
  console.log(`   Output:         /public/sitemap*.xml`);
  console.log(`   Last Modified:  ${LASTMOD}`);

  // Missing page protection stats
  const totalSkipped = Object.values(stats).reduce((sum, s) => sum + s.skipped, 0);
  if (totalSkipped > 0) {
    console.log("\n🛡️  Missing Page Protection:");
    for (const lang of LANGS) {
      if (stats[lang].skipped > 0) {
        console.log(`   ${lang.toUpperCase()}: Skipped ${stats[lang].skipped} unavailable pages`);
      }
    }
  }

  console.log("\n🎯 Next Steps:");
  console.log(`   1. Deploy to production`);
  console.log(`   2. Submit ${SITE}/sitemap.xml to search engines`);
  console.log(`   3. Verify in Google Search Console & Yandex Webmaster`);
  
  console.log("\n✅ Sitemap generation complete with hreflang support!\n");
}

// Run if executed directly
main();
