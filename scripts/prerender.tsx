import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import * as HelmetAsync from "react-helmet-async";
import { MemoryRouter } from "react-router";

import { PublicAppRoutes } from "../src/app/routes/PublicAppRoutes.tsx";
import { GlobalJsonLd } from "../src/app/components/GlobalJsonLd.tsx";
import { ROUTE_TREE, type Lang, type RouteNode } from "../src/seo/routeTree.js";
import { pageExists } from "../src/seo/pageExists.js";

type FlatItem = {
  segs: string[];
};

const LANGS: Lang[] = ["en", "ru", "zh"];

function flattenTree(tree: RouteNode[], prefixSegs: string[] = []): FlatItem[] {
  const out: FlatItem[] = [];

  for (const node of tree) {
    const segs = [...prefixSegs, node.seg];
    out.push({ segs });

    if (node.children?.length) {
      out.push(...flattenTree(node.children, segs));
    }
  }

  return out;
}

function joinPath(...parts: string[]): string {
  const p = parts.join("/").replace(/\/+/g, "/");
  return p.startsWith("/") ? p : `/${p}`;
}

function ensureDir(p: string): void {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function renderPath(pathname: string) {
  const helmetContext: { helmet?: any } = {};

  const { HelmetProvider } = (HelmetAsync as any);

  const app = (
    <HelmetProvider context={helmetContext}>
      <GlobalJsonLd />
      <MemoryRouter initialEntries={[pathname]}>
        <PublicAppRoutes />
      </MemoryRouter>
    </HelmetProvider>
  );

  const appHtml = renderToString(app);
  const helmet = helmetContext.helmet;

  const head = [
    helmet?.title?.toString() ?? "",
    helmet?.meta?.toString() ?? "",
    helmet?.link?.toString() ?? "",
    helmet?.script?.toString() ?? "",
  ]
    .filter(Boolean)
    .join("\n");

  return { appHtml, head };
}

function getAllPaths(): string[] {
  const flat = flattenTree(ROUTE_TREE);
  const paths: string[] = [];

  for (const lang of LANGS) {
    // Homepage for each language (with trailing slash)
    paths.push(`/${lang}/`);

    for (const item of flat) {
      const restPath = joinPath(...item.segs);
      if (!pageExists(lang, restPath)) continue;

      paths.push(`/${lang}${restPath}`);
    }
  }

  // Deduplicate and keep stable order
  return Array.from(new Set(paths));
}

function main() {
  const distDir = path.resolve(process.cwd(), "dist");
  const templatePath = path.join(distDir, "index.html");

  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Cannot find dist/index.html. Run "vite build" before prerendering.`);
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf8");
  const paths = getAllPaths();

  console.log(`🧱 Pre-rendering ${paths.length} routes with Helmet (canonical + hreflang)...\n`);

  for (const pathname of paths) {
    const { appHtml, head } = renderPath(pathname);

    // Inject rendered app HTML
    let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Inject Helmet head tags before closing </head>
    html = html.replace("</head>", `${head}\n</head>`);

    const filePath = path.join(
      distDir,
      pathname.replace(/^\/+/, "").replace(/\/+$/, ""),
      "index.html",
    );
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, html, "utf8");

    console.log(`✅ ${pathname}`);
  }

  console.log("\n🎯 Pre-rendering complete. Deployed HTML now includes canonical + hreflang in <head> for all public pages.\n");
}

main();

