# 🚀 Asset Management - Quick Start Guide

## 📍 Access URLs

```
Asset Library:         https://xadyz.com/admin/assets
Placeholder Tracker:   https://xadyz.com/admin/placeholders
Admin Login:          https://xadyz.com/admin/login
```

---

## ⚡ Quick Workflow

### 1️⃣ Upload Asset (30 seconds)

```
1. Go to /admin/assets
2. Click upload section
3. Select file
4. Add category (optional)
5. Add tags: thermal-paper, hero, russia
6. Click "Upload" → Status: Pending
```

### 2️⃣ Approve Asset (5 seconds)

```
1. Find asset in grid
2. Click green "Approve" button
3. Status → Approved ✅
```

### 3️⃣ Bind to Placeholder (15 seconds)

```
1. Go to /admin/placeholders
2. Find placeholder with "Missing" status
3. Click "Bind Asset" button
4. Select asset from modal
5. Click "Confirm Bind"
6. Status → Replaced ✅
```

---

## 🎯 Key Features

### Asset Library
- ✅ Upload images/videos/docs
- ✅ Tag & categorize
- ✅ Approve/reject workflow
- ✅ Search & filter
- ✅ Preview before binding

### Placeholder Tracker
- ✅ List all placeholders
- ✅ Show missing/replaced status
- ✅ One-click binding
- ✅ Priority management (H/M/L)
- ✅ Unbind assets

---

## 📊 Status Reference

| Icon | Status | Meaning |
|------|--------|---------|
| 🟡 ⏰ | Pending | Awaiting review |
| 🟢 ✅ | Approved | Ready to use |
| 🔴 ❌ | Rejected | Not suitable |
| 🔴 ⚠️ | Missing | No asset bound |
| 🟢 ✅ | Replaced | Asset bound |

---

## 🏷️ Common Categories

```
hero       → Main hero banners
product    → Product images
factory    → Manufacturing photos
banner     → Section banners
icon       → Icons & graphics
team       → Team photos
certificate→ Awards & certs
other      → Everything else
```

---

## 📍 Common Placeholders

```
home.hero                 → Homepage hero banner
products.hero             → Products page hero
products.thermal.img      → Thermal paper image
factory.overview          → Factory overview
factory.production1       → Production line photo
apps.retail.hero          → Retail application banner
```

---

## 🔧 Quick Filters

### Asset Library Filters
- **Status**: All / Pending / Approved / Rejected
- **Category**: hero, product, factory, banner, icon...
- **Type**: Image / Video / Document

### Placeholder Filters
- **Status**: All / Missing / Replaced
- **Type**: hero, product, factory, banner, icon...
- **Priority**: All / High / Medium / Low

---

## 💡 Best Practices

### ✅ Good Naming
```
thermal-paper-hero-1920x1080.jpg
factory-production-line-01.jpg
product-labels-4x6-sample.jpg
```

### ✅ Good Tagging
```
thermal-paper, hero, russia
product, labels, 4x6
factory, production, equipment
```

### ❌ Avoid
```
IMG_1234.jpg
download (2).jpg
Untitled-1-final-v2-FINAL.jpg
```

---

## 🐛 Troubleshooting

### Asset not showing?
→ Check if status is "Approved"

### Upload failed?
→ Check file size (< 50MB)  
→ Verify network connection

### Can't bind?
→ Asset must be "Approved" first  
→ Refresh page and try again

### No placeholders?
→ They must be created in database first

---

## 📱 Mobile Support

✅ All pages are responsive  
✅ Touch-friendly buttons  
✅ Mobile upload supported

---

## 🔐 Permissions Required

- `view_assets` - View asset library
- `manage_placeholders` - Manage placeholders

All users with admin access have these by default.

---

## 💾 Storage Info

**Bucket**: `assets-images` (Supabase Storage)  
**Max Size**: 50MB per file  
**Formats**: JPG, PNG, GIF, WebP, MP4, PDF

---

## 📞 Need Help?

1. Read full docs: `/ASSET_MANAGEMENT_DOCS.md`
2. Check browser console for errors
3. Verify Supabase connection
4. Check database permissions

---

**Happy asset managing! 🎉**
