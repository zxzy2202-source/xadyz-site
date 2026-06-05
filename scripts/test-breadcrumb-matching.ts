/**
 * Test script for automatic tree matching in breadcrumb JSON-LD
 * Run: tsx scripts/test-breadcrumb-matching.ts
 */

import { buildBreadcrumbJsonLd, debugMatchPath } from "../src/seo/breadcrumbJsonLd.js";

const TEST_PATHS = [
  // English paths
  "/en/",
  "/en/products",
  "/en/products/thermal-paper-rolls",
  "/en/products/thermal-paper-rolls/blank",
  "/en/material-supply/thermal-jumbo-rolls",
  "/en/applications/government-tenders",
  "/en/manufacturing/certifications",
  "/en/resources/blog-insights",
  
  // Russian paths
  "/ru/",
  "/ru/products",
  "/ru/material-supply/thermal-jumbo-rolls",
  "/ru/applications/government-tenders",
  
  // Chinese paths
  "/zh/",
  "/zh/products/thermal-paper-rolls/blank",
  "/zh/material-supply",
  
  // Edge cases
  "/en/unknown-path",
  "/en/products/unknown-product",
  "/ru/products/thermal-paper-rolls/blank/extra/too/deep", // Should stop at 4 levels
];

console.log("🧪 Testing Automatic Tree Matching for Breadcrumb JSON-LD\n");

let passCount = 0;
let failCount = 0;

for (const testPath of TEST_PATHS) {
  console.log(`\n📍 Testing: ${testPath}`);
  
  // Get debug info
  const debug = debugMatchPath(testPath);
  console.log(`   Language: ${debug.lang}`);
  console.log(`   Segments: [${debug.segments.join(", ")}]`);
  console.log(`   Matched:  ${debug.matched.length} steps`);
  
  if (debug.matched.length > 0) {
    console.log(`   Steps:`);
    debug.matched.forEach((step, i) => {
      console.log(`     ${i + 1}. "${step.seg}" → key: "${step.key}"`);
    });
  }
  
  // Generate JSON-LD
  const jsonLd = buildBreadcrumbJsonLd(testPath);
  
  if (jsonLd) {
    const items = (jsonLd as any).itemListElement;
    console.log(`   ✅ Generated ${items.length} breadcrumb items`);
    
    // Show breadcrumb trail
    const trail = items.map((item: any) => item.name).join(" › ");
    console.log(`   Trail: ${trail}`);
    
    passCount++;
  } else {
    console.log(`   ⚠️  No JSON-LD generated (homepage or no matches)`);
    if (testPath !== "/en/" && testPath !== "/ru/" && testPath !== "/zh/") {
      // Non-homepage paths should generate something if they match
      if (debug.matched.length > 0) {
        console.log(`   ❌ FAIL: Had matches but didn't generate JSON-LD`);
        failCount++;
      } else {
        console.log(`   ✅ Correctly rejected unknown path`);
        passCount++;
      }
    } else {
      console.log(`   ✅ Correctly skipped homepage`);
      passCount++;
    }
  }
}

// Test specific scenarios
console.log("\n\n🎯 Testing Specific Scenarios\n");

// Scenario 1: Deep path (should stop at 4 levels)
console.log("Scenario 1: Deep path handling");
const deepPath = "/en/products/thermal-paper-rolls/blank/extra/too/deep";
const deepDebug = debugMatchPath(deepPath);
if (deepDebug.matched.length <= 4) {
  console.log(`✅ PASS: Correctly limited to ${deepDebug.matched.length} levels (max 4)`);
  passCount++;
} else {
  console.log(`❌ FAIL: Exceeded 4 levels (got ${deepDebug.matched.length})`);
  failCount++;
}

// Scenario 2: Unknown segment stops matching
console.log("\nScenario 2: Unknown segment handling");
const unknownPath = "/en/products/unknown-product";
const unknownDebug = debugMatchPath(unknownPath);
if (unknownDebug.matched.length === 1 && unknownDebug.matched[0].key === "products") {
  console.log(`✅ PASS: Stopped at known segment "products", didn't invent "unknown-product"`);
  passCount++;
} else {
  console.log(`❌ FAIL: Didn't handle unknown segment correctly`);
  failCount++;
}

// Scenario 3: Three languages work correctly (use path with 3 breadcrumb levels)
console.log("\nScenario 3: Multi-language support");
const enJsonLd = buildBreadcrumbJsonLd("/en/material-supply/thermal-jumbo-rolls");
const ruJsonLd = buildBreadcrumbJsonLd("/ru/material-supply/thermal-jumbo-rolls");
const zhJsonLd = buildBreadcrumbJsonLd("/zh/material-supply/thermal-jumbo-rolls");

if (enJsonLd && ruJsonLd && zhJsonLd) {
  const enItems = (enJsonLd as any).itemListElement || [];
  const ruItems = (ruJsonLd as any).itemListElement || [];
  const zhItems = (zhJsonLd as any).itemListElement || [];
  const enName = enItems.length >= 3 ? enItems[2].name : enItems[enItems.length - 1]?.name;
  const ruName = ruItems.length >= 3 ? ruItems[2].name : ruItems[ruItems.length - 1]?.name;
  const zhName = zhItems.length >= 3 ? zhItems[2].name : zhItems[zhItems.length - 1]?.name;
  
  console.log(`   EN: ${enName}`);
  console.log(`   RU: ${ruName}`);
  console.log(`   ZH: ${zhName}`);
  
  if (enName !== ruName && ruName !== zhName && enName !== zhName) {
    console.log(`✅ PASS: All three languages have different translations`);
    passCount++;
  } else {
    console.log(`❌ FAIL: Translations are not different`);
    failCount++;
  }
} else {
  console.log(`❌ FAIL: Couldn't generate JSON-LD for all languages`);
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
  console.log("\n🎉 All tests passed! Automatic tree matching is working correctly.\n");
} else {
  console.log("\n⚠️  Some tests failed. Please review the output above.\n");
  process.exit(1);
}

// Show example JSON-LD output
console.log("\n📋 Example JSON-LD Output:\n");
const examplePath = "/ru/material-supply/thermal-jumbo-rolls";
const exampleJsonLd = buildBreadcrumbJsonLd(examplePath);
console.log(`Path: ${examplePath}`);
console.log(JSON.stringify(exampleJsonLd, null, 2));
console.log("\n");
