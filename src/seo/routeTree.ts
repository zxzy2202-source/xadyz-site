export type Lang = "en" | "ru" | "zh";

/**
 * SEO Metadata for sitemap generation
 */
export type SeoMeta = {
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number; // 0.0 - 1.0
};

/**
 * Route Tree Node Definition
 */
export type RouteNode = {
  seg: string;        // URL segment, e.g. "products"
  key: string;        // i18n key for translations
  seo?: SeoMeta;      // Optional SEO metadata for sitemap
  /** Logical parent for breadcrumb when URL doesn't include parent path (e.g. /thermal-paper-rolls under Products) */
  parentKey?: string;
  parentSeg?: string; // Parent's URL segment for href (required when parentKey is set)

  /**
   * ✅ MISSING PAGE PROTECTION
   * 
   * Specifies which languages this page is available in.
   * - Not specified (undefined): Available in all languages (default)
   * - Specified: Only available in listed languages
   * 
   * Use cases:
   * - Pages not yet translated: availableLangs: ["en", "ru"]
   * - Market-specific content: availableLangs: ["ru"] (Russia-only)
   * - Phased rollout: Start with EN, add RU/ZH later
   * 
   * Benefits:
   * - Prevents 404 errors in sitemap hreflang links
   * - Automatically excludes from unavailable language sitemaps
   * - Head <link> tags only reference existing pages
   * 
   * @example
   * ```ts
   * {
   *   seg: "government-tenders",
   *   key: "governmentTenders",
   *   availableLangs: ["en", "ru"], // ✅ Not available in Chinese yet
   *   seo: { changefreq: "monthly", priority: 0.9 }
   * }
   * ```
   */
  availableLangs?: Lang[];
  
  children?: RouteNode[];
};

/**
 * ✅ SINGLE SOURCE OF TRUTH - Route Tree
 * 
 * This tree defines:
 * - URL structure (seg)
 * - Translation keys (key)
 * - SEO metadata (seo) - NEW!
 * - Hierarchy (children)
 * 
 * Used by:
 * 1. App.tsx routes
 * 2. BreadcrumbNav component
 * 3. JSON-LD structured data
 * 4. Sitemap generation (priority, changefreq)
 */

export const ROUTE_TREE: RouteNode[] = [
  // ========== PRODUCTS (URLs are flat: /thermal-paper-rolls not /products/thermal-paper-rolls) ==========
  {
    seg: "products",
    key: "products",
    seo: { changefreq: "weekly", priority: 0.9 },
  },
  {
    seg: "thermal-paper-rolls",
    key: "thermalPaperRolls",
    parentKey: "products",
    parentSeg: "products",
    seo: { changefreq: "weekly", priority: 0.9 },
    children: [
      { seg: "blank", key: "blank", seo: { changefreq: "weekly", priority: 0.8 } },
      { seg: "printed", key: "printed", seo: { changefreq: "weekly", priority: 0.8 } },
      { seg: "pos", key: "posThermalPaper", seo: { changefreq: "weekly", priority: 0.8 } },
      { seg: "atm", key: "atmThermalPaper", seo: { changefreq: "weekly", priority: 0.8 } },
      { seg: "bpa-free", key: "bpaFreeThermalPaper", seo: { changefreq: "weekly", priority: 0.8 } },
    ],
  },
  {
    seg: "thermal-labels",
    key: "thermalLabels",
    parentKey: "products",
    parentSeg: "products",
    seo: { changefreq: "weekly", priority: 0.9 },
    children: [
      { seg: "blank", key: "blank", seo: { changefreq: "weekly", priority: 0.8 } },
      { seg: "printed", key: "printed", seo: { changefreq: "weekly", priority: 0.8 } },
      { seg: "4x6", key: "thermalLabels4x6", seo: { changefreq: "weekly", priority: 0.7 } },
      { seg: "a6", key: "thermalLabelsA6", seo: { changefreq: "weekly", priority: 0.7 } },
      { seg: "logistics", key: "logisticsLabels", seo: { changefreq: "weekly", priority: 0.8 } },
    ],
  },
  {
    seg: "ncr-forms",
    key: "ncrForms",
    parentKey: "products",
    parentSeg: "products",
    seo: { changefreq: "weekly", priority: 0.8 },
    children: [
      { seg: "blank", key: "blank", seo: { changefreq: "weekly", priority: 0.7 } },
      { seg: "printed", key: "printed", seo: { changefreq: "weekly", priority: 0.7 } },
      { seg: "continuous", key: "continuous", seo: { changefreq: "weekly", priority: 0.7 } },
    ],
  },

  // ========== MATERIAL SUPPLY (B2B Focus) ==========
  {
    seg: "material-supply",
    key: "materialSupply",
    seo: { changefreq: "weekly", priority: 0.8 },
    children: [
      { 
        seg: "thermal-jumbo-rolls", 
        key: "thermalJumbo",
        seo: { changefreq: "weekly", priority: 0.8 }
      },
      { 
        seg: "self-adhesive-jumbo-rolls", 
        key: "selfAdhesiveJumbo",
        seo: { changefreq: "weekly", priority: 0.7 }
      },
      { 
        seg: "self-adhesive-sheets", 
        key: "selfAdhesiveSheets",
        seo: { changefreq: "weekly", priority: 0.7 }
      },
      { 
        seg: "ncr-jumbo-rolls", 
        key: "ncrJumbo",
        seo: { changefreq: "weekly", priority: 0.8 }
      },
      { 
        seg: "ncr-sheets", 
        key: "ncrSheets",
        seo: { changefreq: "weekly", priority: 0.7 }
      },
    ],
  },

  // ========== APPLICATIONS (Industry Solutions) ==========
  {
    seg: "applications",
    key: "applications",
    seo: { changefreq: "weekly", priority: 0.8 },
    children: [
      { 
        seg: "government-tenders", 
        key: "governmentTenders",
        availableLangs: ["en", "ru"], // ✅ Not available in Chinese yet
        seo: { changefreq: "monthly", priority: 0.9 } // High value but less frequent updates
      },
      { 
        seg: "retail-pos", 
        key: "retailPOS",
        seo: { changefreq: "monthly", priority: 0.7 }
      },
      { 
        seg: "logistics-warehousing", 
        key: "logisticsWarehousing",
        seo: { changefreq: "monthly", priority: 0.7 }
      },
      { 
        seg: "supermarkets", 
        key: "supermarkets",
        seo: { changefreq: "monthly", priority: 0.7 }
      },
      { 
        seg: "banking-finance", 
        key: "bankingFinance",
        seo: { changefreq: "monthly", priority: 0.7 }
      },
      { 
        seg: "healthcare", 
        key: "healthcare",
        seo: { changefreq: "monthly", priority: 0.7 }
      },
      {
        seg: "request-tender-pack",
        key: "requestTenderPack",
        seo: { changefreq: "monthly", priority: 0.9 }
      },
    ],
  },

  // ========== MANUFACTURING (Trust Building) ==========
  {
    seg: "manufacturing",
    key: "manufacturing",
    seo: { changefreq: "monthly", priority: 0.7 },
    children: [
      { 
        seg: "factory-overview", 
        key: "factoryOverview",
        seo: { changefreq: "monthly", priority: 0.6 }
      },
      { 
        seg: "production-lines", 
        key: "productionLines",
        seo: { changefreq: "monthly", priority: 0.6 }
      },
      { 
        seg: "quality-control", 
        key: "qualityControl",
        seo: { changefreq: "monthly", priority: 0.7 }
      },
      { 
        seg: "packaging-shipping", 
        key: "packagingShipping",
        seo: { changefreq: "monthly", priority: 0.6 }
      },
      { 
        seg: "certifications", 
        key: "certifications",
        seo: { changefreq: "monthly", priority: 0.8 } // Important for trust
      },
      { 
        seg: "oem-customization", 
        key: "oemCustomization",
        seo: { changefreq: "monthly", priority: 0.7 }
      },
      { 
        seg: "factory-journal", 
        key: "factoryJournal",
        seo: { changefreq: "weekly", priority: 0.8 }
      },
    ],
  },

  // ========== RESOURCES (Content Marketing) ==========
  {
    seg: "resources",
    key: "resources",
    seo: { changefreq: "weekly", priority: 0.6 },
    children: [
      { 
        seg: "blog-insights", 
        key: "blogInsights",
        seo: { changefreq: "weekly", priority: 0.6 } // Updates frequently
      },
      { 
        seg: "tools-calculators", 
        key: "toolsCalculators",
        seo: { changefreq: "monthly", priority: 0.5 }
      },
      { 
        seg: "faqs", 
        key: "faqs",
        seo: { changefreq: "monthly", priority: 0.6 }
      },
      { 
        seg: "packaging-logistics", 
        key: "packagingLogistics",
        seo: { changefreq: "monthly", priority: 0.5 }
      },
    ],
  },

  // ========== COMPANY PAGES ==========
  { 
    seg: "about", 
    key: "about",
    seo: { changefreq: "monthly", priority: 0.6 }
  },
  { 
    seg: "contact", 
    key: "contact",
    seo: { changefreq: "monthly", priority: 0.7 } // Important for conversions
  },
];