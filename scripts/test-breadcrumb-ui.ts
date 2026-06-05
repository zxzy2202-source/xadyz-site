/**
 * Test script for Breadcrumb UI component
 * Run: tsx scripts/test-breadcrumb-ui.ts
 */

import { getBreadcrumbData } from "../src/seo/breadcrumbData.js";

const TEST_PATHS = [
  // English paths
  { path: "/en/", expected: [] }, // Homepage - no breadcrumb
  { path: "/en/products", expected: ["Home", "Products"] },
  { path: "/en/products/thermal-paper-rolls", expected: ["Home", "Products", "Thermal Paper Rolls"] },
  { path: "/en/products/thermal-paper-rolls/blank", expected: ["Home", "Products", "Thermal Paper Rolls", "Blank Thermal Rolls"] },
  { path: "/en/material-supply/thermal-jumbo-rolls", expected: ["Home", "Material Supply", "Thermal Jumbo Rolls"] },
  { path: "/en/applications/government-tenders", expected: ["Home", "Applications", "Government Tenders"] },
  { path: "/en/manufacturing/certifications", expected: ["Home", "Manufacturing", "Certifications"] },
  { path: "/en/resources/blog-insights", expected: ["Home", "Resources", "Blog & Insights"] },

  // Russian paths
  { path: "/ru/", expected: [] },
  { path: "/ru/products", expected: ["Главная", "Продукция"] },
  { path: "/ru/products/thermal-paper-rolls", expected: ["Главная", "Продукция", "Рулоны термобумаги"] },
  { path: "/ru/material-supply/thermal-jumbo-rolls", expected: ["Главная", "Сырьё", "Термо джамбо-рулоны"] },
  { path: "/ru/applications/government-tenders", expected: ["Главная", "Применение", "Госзакупки"] },

  // Chinese paths
  { path: "/zh/", expected: [] },
  { path: "/zh/products", expected: ["首页", "产品"] },
  { path: "/zh/products/thermal-paper-rolls/blank", expected: ["首页", "产品", "热敏纸卷", "空白热敏卷"] },
  { path: "/zh/material-supply", expected: ["首页", "原材料供应"] },

  // Edge cases
  { path: "/en/unknown-path", expected: [] }, // Unknown path
  { path: "/en/products/unknown-product", expected: ["Home", "Products"] }, // Stops at known segment
];

console.log("🍞 Testing Breadcrumb UI Component\n");
console.log("=".repeat(70));

let passCount = 0;
let failCount = 0;

for (const testCase of TEST_PATHS) {
  console.log(`\n📍 Path: ${testCase.path}`);

  const breadcrumbs = getBreadcrumbData(testCase.path);
  const names = breadcrumbs.map((b) => b.name);

  console.log(`   Expected: [${testCase.expected.join(" › ")}]`);
  console.log(`   Got:      [${names.join(" › ")}]`);

  // Check if arrays match
  const isMatch =
    names.length === testCase.expected.length &&
    names.every((name, idx) => name === testCase.expected[idx]);

  if (isMatch) {
    console.log(`   ✅ PASS`);
    passCount++;
  } else {
    console.log(`   ❌ FAIL`);
    failCount++;
  }

  // Show hrefs
  if (breadcrumbs.length > 0) {
    console.log(`   Links:`);
    breadcrumbs.forEach((b, idx) => {
      console.log(`     ${idx + 1}. ${b.name} → ${b.href}`);
    });
  }
}

// Test specific features
console.log("\n" + "=".repeat(70));
console.log("\n🎯 Feature Tests\n");

// Test 1: Maximum 4 levels
console.log("Feature 1: Maximum 4 levels");
const deepPath = "/en/products/thermal-paper-rolls/blank/extra/too/deep";
const deepBreadcrumbs = getBreadcrumbData(deepPath);
const maxLevel = deepBreadcrumbs.length - 1; // -1 for Home

if (maxLevel <= 4) {
  console.log(`✅ PASS: Breadcrumb has ${maxLevel} levels (max 4)`);
  console.log(`   Trail: ${deepBreadcrumbs.map((b) => b.name).join(" › ")}`);
  passCount++;
} else {
  console.log(`❌ FAIL: Breadcrumb has ${maxLevel} levels (exceeds 4)`);
  failCount++;
}

// Test 2: Clickable links structure
console.log("\nFeature 2: Clickable links");
const testPath = "/en/products/thermal-paper-rolls";
const testBreadcrumbs = getBreadcrumbData(testPath);

if (testBreadcrumbs.length > 0) {
  const allHaveHref = testBreadcrumbs.every((b) => b.href && b.href.startsWith("/"));
  const hrefsAreProgressive = testBreadcrumbs.every((b, idx) => {
    if (idx === 0) return b.href === "/en";
    return b.href.startsWith(testBreadcrumbs[idx - 1].href);
  });

  if (allHaveHref && hrefsAreProgressive) {
    console.log(`✅ PASS: All items have valid, progressive hrefs`);
    passCount++;
  } else {
    console.log(`❌ FAIL: Invalid href structure`);
    failCount++;
  }
}

// Test 3: Three languages work correctly
console.log("\nFeature 3: Multi-language support");
const enBc = getBreadcrumbData("/en/products/thermal-paper-rolls");
const ruBc = getBreadcrumbData("/ru/products/thermal-paper-rolls");
const zhBc = getBreadcrumbData("/zh/products/thermal-paper-rolls");

if (enBc.length === ruBc.length && ruBc.length === zhBc.length) {
  const enText = enBc.map((b) => b.name).join(" › ");
  const ruText = ruBc.map((b) => b.name).join(" › ");
  const zhText = zhBc.map((b) => b.name).join(" › ");

  console.log(`   EN: ${enText}`);
  console.log(`   RU: ${ruText}`);
  console.log(`   ZH: ${zhText}`);

  if (enText !== ruText && ruText !== zhText && enText !== zhText) {
    console.log(`✅ PASS: All languages have different translations`);
    passCount++;
  } else {
    console.log(`❌ FAIL: Translations are identical`);
    failCount++;
  }
} else {
  console.log(`❌ FAIL: Different breadcrumb lengths across languages`);
  failCount++;
}

// Test 4: Home is always first (if breadcrumb exists)
console.log("\nFeature 4: Home always first");
const paths = ["/en/products", "/ru/material-supply/thermal-jumbo-rolls", "/zh/applications"];
let homeFirstPass = true;

for (const path of paths) {
  const bc = getBreadcrumbData(path);
  if (bc.length > 0 && !bc[0].href.match(/^\/(en|ru|zh)$/)) {
    homeFirstPass = false;
    console.log(`❌ FAIL: First item is not home for ${path}`);
    failCount++;
    break;
  }
}

if (homeFirstPass) {
  console.log(`✅ PASS: Home is always first item`);
  passCount++;
}

// Test 5: Unknown paths return empty
console.log("\nFeature 5: Unknown paths return empty breadcrumb");
const unknownBc = getBreadcrumbData("/en/totally-unknown-path");
if (unknownBc.length === 0) {
  console.log(`✅ PASS: Unknown path returns empty breadcrumb`);
  passCount++;
} else {
  console.log(`❌ FAIL: Unknown path generated breadcrumb`);
  failCount++;
}

// Summary
console.log("\n" + "=".repeat(70));
console.log("📊 Test Summary");
console.log("=".repeat(70));
console.log(`✅ Passed: ${passCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log(`📝 Total:  ${passCount + failCount}`);

if (failCount === 0) {
  console.log("\n🎉 All tests passed! Breadcrumb UI is working correctly.\n");
} else {
  console.log("\n⚠️  Some tests failed. Please review the output above.\n");
  process.exit(1);
}

// Example outputs
console.log("=".repeat(70));
console.log("\n📋 Example Breadcrumb Outputs\n");

const examples = [
  { path: "/en/products/thermal-paper-rolls", lang: "English" },
  { path: "/ru/material-supply/thermal-jumbo-rolls", lang: "Russian" },
  { path: "/zh/applications/government-tenders", lang: "Chinese" },
];

for (const example of examples) {
  const bc = getBreadcrumbData(example.path);
  console.log(`${example.lang} (${example.path}):`);
  console.log(`   ${bc.map((b) => b.name).join(" › ")}`);
  console.log(``);
}

console.log("=".repeat(70));
console.log("\n✅ Breadcrumb UI test complete!\n");
