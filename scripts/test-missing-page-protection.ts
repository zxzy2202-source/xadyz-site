/**
 * Test script for missing page protection feature
 * Run: tsx scripts/test-missing-page-protection.ts
 */

import { pageExists, availableLangsForPath, analyzePath } from "../src/seo/pageExists.js";
import type { Lang } from "../src/seo/routeTree.js";

const LANGS: Lang[] = ["en", "ru", "zh"];

console.log("🛡️  Testing Missing Page Protection\n");
console.log("=".repeat(60));

// Test Cases
const testCases = [
  {
    description: "Homepage (always available)",
    path: "",
    expected: { en: true, ru: true, zh: true },
  },
  {
    description: "Regular product page (all languages)",
    path: "/thermal-paper-rolls",
    expected: { en: true, ru: true, zh: true },
  },
  {
    description: "Government tenders (EN/RU only)",
    path: "/applications/government-tenders",
    expected: { en: true, ru: true, zh: false },
  },
  {
    description: "Deep path under available parent",
    path: "/thermal-paper-rolls/blank",
    expected: { en: true, ru: true, zh: true },
  },
  {
    description: "Non-existent path",
    path: "/does-not-exist",
    expected: { en: false, ru: false, zh: false },
  },
];

let passCount = 0;
let failCount = 0;

// Run tests
for (const testCase of testCases) {
  console.log(`\n📋 Test: ${testCase.description}`);
  console.log(`   Path: ${testCase.path || "/"}`);

  let testPassed = true;

  for (const lang of LANGS) {
    const exists = pageExists(lang, testCase.path);
    const expected = testCase.expected[lang];
    const status = exists === expected ? "✅" : "❌";

    if (exists !== expected) {
      testPassed = false;
      failCount++;
    } else {
      passCount++;
    }

    console.log(`   ${status} ${lang.toUpperCase()}: ${exists} (expected: ${expected})`);
  }

  // Show available languages summary
  const available = availableLangsForPath(testCase.path, LANGS);
  console.log(`   Available in: [${available.join(", ")}]`);

  if (!testPassed) {
    console.log("   ⚠️  TEST FAILED");
  }
}

// Detailed analysis tests
console.log("\n" + "=".repeat(60));
console.log("\n🔍 Detailed Path Analysis\n");

const analysisPaths = [
  "/applications/government-tenders",
  "/thermal-paper-rolls",
  "/manufacturing/certifications",
];

for (const path of analysisPaths) {
  const analysis = analyzePath(path, LANGS);

  console.log(`\n📊 Analysis: ${path}`);
  console.log(`   Available in:   [${analysis.availableIn.join(", ")}]`);
  console.log(`   Unavailable in: [${analysis.unavailableIn.join(", ")}]`);
  console.log(
    `   Restrictions:   ${
      analysis.mostRestrictiveLangs
        ? `[${analysis.mostRestrictiveLangs.join(", ")}]`
        : "None"
    }`
  );
  console.log(`   Fully available: ${analysis.isFullyAvailable}`);
  console.log(`   Partially available: ${analysis.isPartiallyAvailable}`);
}

// Edge cases
console.log("\n" + "=".repeat(60));
console.log("\n🎯 Edge Cases\n");

console.log("Edge Case 1: Trailing slash handling");
const pathWithSlash = pageExists("en", "/thermal-paper-rolls/");
const pathWithoutSlash = pageExists("en", "/thermal-paper-rolls");
if (pathWithSlash === pathWithoutSlash) {
  console.log("✅ Trailing slash handled correctly");
  passCount++;
} else {
  console.log("❌ Trailing slash handling inconsistent");
  failCount++;
}

console.log("\nEdge Case 2: Root path variations");
const rootEmpty = pageExists("en", "");
const rootSlash = pageExists("en", "/");
if (rootEmpty && rootSlash) {
  console.log("✅ Root path variations handled correctly");
  passCount++;
} else {
  console.log("❌ Root path variations not consistent");
  failCount++;
}

console.log("\nEdge Case 3: Unknown segment stops matching");
const validParent = pageExists("en", "/products");
const invalidChild = pageExists("en", "/products/invalid-product");
if (validParent && !invalidChild) {
  console.log("✅ Unknown segments correctly rejected");
  passCount++;
} else {
  console.log("❌ Unknown segment handling failed");
  failCount++;
}

// Summary
console.log("\n" + "=".repeat(60));
console.log("📊 Test Summary");
console.log("=".repeat(60));
console.log(`✅ Passed: ${passCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log(`📝 Total:  ${passCount + failCount}`);

if (failCount === 0) {
  console.log("\n🎉 All tests passed! Missing page protection is working correctly.\n");
} else {
  console.log("\n⚠️  Some tests failed. Please review the output above.\n");
  process.exit(1);
}

// Feature demonstration
console.log("=".repeat(60));
console.log("\n💡 Feature Demonstration\n");

console.log("✅ Benefits of Missing Page Protection:\n");
console.log("1. Sitemap Generation:");
console.log("   - sitemap-zh.xml won't include /applications/government-tenders");
console.log("   - Prevents search engines from finding 404 pages");

console.log("\n2. Hreflang Links:");
console.log("   - EN version of government-tenders won't link to ZH version");
console.log("   - Only includes: <link hreflang='en'>, <link hreflang='ru'>");

console.log("\n3. Head Tag Injection:");
console.log("   - When on /ru/applications/government-tenders");
console.log("   - Only injects hreflang for EN and RU");
console.log("   - No broken alternate links");

console.log("\n4. SEO Impact:");
console.log("   - No 404 errors from language alternates");
console.log("   - Search engines trust your hreflang signals");
console.log("   - Better crawl efficiency");
console.log("   - Improved international rankings\n");

console.log("=".repeat(60));
console.log("\n✅ Missing Page Protection test complete!\n");
