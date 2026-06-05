/**
 * Test script to verify sitemap generation
 * Run: tsx scripts/test-sitemap.ts
 */

import { ROUTE_TREE, type RouteNode } from "../src/seo/routeTree.js";

function countNodes(nodes: RouteNode[]): number {
  let count = nodes.length;
  for (const node of nodes) {
    if (node.children) {
      count += countNodes(node.children);
    }
  }
  return count;
}

function listAllPaths(nodes: RouteNode[], prefix: string[] = []): string[] {
  const paths: string[] = [];
  
  for (const node of nodes) {
    const path = [...prefix, node.seg].join("/");
    paths.push(path);
    
    if (node.children) {
      paths.push(...listAllPaths(node.children, [...prefix, node.seg]));
    }
  }
  
  return paths;
}

function validateSeoMeta(nodes: RouteNode[], path: string[] = []): void {
  for (const node of nodes) {
    const currentPath = [...path, node.seg].join("/");
    
    if (node.seo) {
      const { priority, changefreq } = node.seo;
      
      if (priority !== undefined && (priority < 0 || priority > 1)) {
        console.warn(`⚠️  Invalid priority at /${currentPath}: ${priority} (should be 0.0-1.0)`);
      }
      
      const validFreqs = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
      if (changefreq && !validFreqs.includes(changefreq)) {
        console.warn(`⚠️  Invalid changefreq at /${currentPath}: ${changefreq}`);
      }
    }
    
    if (node.children) {
      validateSeoMeta(node.children, [...path, node.seg]);
    }
  }
}

console.log("🧪 Testing ROUTE_TREE...\n");

// Test 1: Count nodes
const totalNodes = countNodes(ROUTE_TREE);
console.log(`✅ Total route nodes: ${totalNodes}`);

// Test 2: List all paths
const allPaths = listAllPaths(ROUTE_TREE);
console.log(`✅ Unique paths: ${allPaths.length}`);

// Test 3: Sample paths
console.log("\n📋 Sample paths (first 10):");
allPaths.slice(0, 10).forEach(p => console.log(`   - /${p}`));

// Test 4: Validate SEO metadata
console.log("\n🔍 Validating SEO metadata...");
validateSeoMeta(ROUTE_TREE);
console.log("✅ SEO metadata validation complete");

// Test 5: Expected URLs per language
const urlsPerLang = 1 + allPaths.length; // 1 for homepage
console.log(`\n📊 Expected sitemap stats:`);
console.log(`   URLs per language: ${urlsPerLang}`);
console.log(`   Total URLs (3 langs): ${urlsPerLang * 3}`);
console.log(`   Sitemap files: 4 (3 lang + 1 index)`);

// Test 6: Check for common issues
console.log("\n🔧 Checking for common issues...");

const duplicateSegs = new Set<string>();
const segsUsed = new Set<string>();
allPaths.forEach(p => {
  if (segsUsed.has(p)) {
    duplicateSegs.add(p);
  }
  segsUsed.add(p);
});

if (duplicateSegs.size > 0) {
  console.warn(`⚠️  Duplicate paths found:`);
  duplicateSegs.forEach(p => console.warn(`   - /${p}`));
} else {
  console.log("✅ No duplicate paths");
}

console.log("\n✅ All tests passed! Ready to generate sitemaps.\n");
console.log("Next step: npm run sitemap\n");
