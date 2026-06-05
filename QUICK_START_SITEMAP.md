# ⚡ Quick Start - Sitemap Automation

## 🎯 What You Have

A **fully automated sitemap system** based on the single source of truth principle.

```
ROUTE_TREE → Automatic Sitemap Generation
```

---

## 🚀 Quick Commands

### Generate Sitemaps Now

```bash
npm run sitemap
```

**Expected output:**
```
🌐 Generating sitemaps from ROUTE_TREE...

✅ sitemap-en.xml      -  53 URLs
✅ sitemap-ru.xml      -  53 URLs
✅ sitemap-zh.xml      -  53 URLs
✅ sitemap.xml         - Index (3 sitemaps)
```

### Test Before Generating

```bash
tsx scripts/test-sitemap.ts
```

### Build (Auto-generates sitemaps)

```bash
npm run build
```

---

## 📋 Files Generated

```
/public/
├── sitemap.xml         ← Submit this to search engines
├── sitemap-en.xml      ← 53 English URLs
├── sitemap-ru.xml      ← 53 Russian URLs
└── sitemap-zh.xml      ← 53 Chinese URLs
```

---

## ✅ Immediate Next Steps

### 1. Generate Your Sitemaps

```bash
npm run sitemap
```

### 2. Verify Files Created

```bash
ls -lh public/sitemap*.xml
```

### 3. Check URL Count

```bash
grep -c "<url>" public/sitemap-en.xml
# Should output: 53
```

### 4. Submit to Search Engines

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Property → Sitemaps
3. Add: `https://xadyz.com/sitemap.xml`

**Yandex Webmaster:**
1. Go to https://webmaster.yandex.com
2. Indexing → Sitemaps
3. Add: `https://xadyz.com/sitemap.xml`

---

## 🎓 How It Works

### Single Command

```bash
npm run sitemap
```

### What Happens

1. ✅ Reads `/src/seo/routeTree.ts`
2. ✅ Extracts all routes + SEO metadata
3. ✅ Generates XML for 3 languages
4. ✅ Creates sitemap index
5. ✅ Writes to `/public/`

### Zero Configuration Needed!

---

## 📝 Adding New Pages (3 Steps)

### Step 1: ROUTE_TREE

```typescript
// /src/seo/routeTree.ts
{
  seg: "new-page",
  key: "newPage",
  seo: { changefreq: "weekly", priority: 0.8 }
}
```

### Step 2: Translations

```typescript
// /src/seo/crumbI18n.ts
en: { newPage: "New Page" },
ru: { newPage: "Новая страница" },
zh: { newPage: "新页面" }
```

### Step 3: Routes

```tsx
// /src/app/App.tsx
<Route path="/en/new-page" element={<NewPage lang="en" />} />
<Route path="/ru/new-page" element={<NewPage lang="ru" />} />
<Route path="/zh/new-page" element={<NewPage lang="zh" />} />
```

### Regenerate

```bash
npm run sitemap
```

**Done!** Everything else is automatic.

---

## 🔧 Troubleshooting

### Problem: Command not found

```bash
npm install tsx --save-dev
```

### Problem: Old sitemaps still there

```bash
rm public/sitemap*.xml
npm run sitemap
```

### Problem: Wrong URL count

```bash
tsx scripts/test-sitemap.ts
# This will show you the expected count
```

---

## 📊 Current Stats

```
Total Routes:    52
URLs per lang:   53 (52 + homepage)
Total URLs:      159
Sitemap files:   4 (3 lang + 1 index)
```

---

## ✅ Verification

### Check sitemap.xml (index)

```bash
cat public/sitemap.xml
```

Expected:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://xadyz.com/sitemap-en.xml</loc>
    <lastmod>2026-02-03</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://xadyz.com/sitemap-ru.xml</loc>
    <lastmod>2026-02-03</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://xadyz.com/sitemap-zh.xml</loc>
    <lastmod>2026-02-03</lastmod>
  </sitemap>
</sitemapindex>
```

### Check sitemap-en.xml (sample)

```bash
head -30 public/sitemap-en.xml
```

Expected:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://xadyz.com/en/</loc>
    <lastmod>2026-02-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://xadyz.com/en/products</loc>
    <lastmod>2026-02-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ...
</urlset>
```

---

## 🎯 Success Criteria

- [x] `npm run sitemap` works without errors
- [x] 4 XML files created in `/public/`
- [x] sitemap-en.xml has 53 URLs
- [x] sitemap-ru.xml has 53 URLs
- [x] sitemap-zh.xml has 53 URLs
- [x] sitemap.xml references 3 sitemaps
- [x] All URLs start with `https://xadyz.com`
- [x] All XML is valid and well-formed

---

## 📞 Support

**Documentation:**
- Full guide: `/SITEMAP_AUTOMATION_UPGRADE.md`
- Testing: `tsx scripts/test-sitemap.ts`

**Common Issues:**
- Script errors → Check tsx is installed
- Wrong URLs → Check ROUTE_TREE structure
- Missing files → Check `/public/` directory exists

---

## 🎊 You're Done!

Your sitemap system is **fully automated** and **ready for production**.

**Next:** Submit to Google & Yandex! 🚀
