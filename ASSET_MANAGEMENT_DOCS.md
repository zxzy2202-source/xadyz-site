# 🎨 Asset Management System - Complete Documentation

## 📋 Overview

A complete admin interface for managing website assets (images, videos, documents) and binding them to placeholder locations across the website.

**Created**: 2026-02-05  
**Status**: ✅ Complete & Ready to Use

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ASSET MANAGEMENT SYSTEM                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐         ┌──────────────────────┐    │
│  │  ASSET LIBRARY   │────────▶│   SUPABASE STORAGE   │    │
│  │   (Upload & Tag) │         │  (assets-images)     │    │
│  └──────────────────┘         └──────────────────────┘    │
│          │                                                   │
│          │ Bind                                             │
│          ▼                                                   │
│  ┌──────────────────┐         ┌──────────────────────┐    │
│  │  PLACEHOLDER     │────────▶│   DATABASE           │    │
│  │   TRACKER        │         │  (placeholders)      │    │
│  └──────────────────┘         └──────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 File Structure

```
/src/admin/
├── app/
│   ├── routes/
│   │   ├── assets/
│   │   │   └── index.tsx          # ✅ Asset Library Page
│   │   ├── placeholders/
│   │   │   └── index.tsx          # ✅ Placeholder Tracker Page
│   │   ├── leads/
│   │   │   ├── index.tsx          # ✅ Leads List (Optimized)
│   │   │   └── detail.tsx         # Lead Detail Page
│   │   ├── dashboard.tsx          # Dashboard
│   │   ├── login.tsx              # Login Page
│   │   └── ProtectedRoute.tsx    # Auth Guard
│   └── layout/
│       └── AdminLayout.tsx        # ✅ Main Layout with Navigation
└── lib/
    ├── supabaseClient.ts          # ✅ Database Types & Client
    └── auth.ts                    # Authentication
```

---

## 🎯 Features

### 1️⃣ **Asset Library** (`/admin/assets`)

#### **Core Functions:**
- ✅ **Upload Assets** - Images, videos, documents
- ✅ **Tag & Categorize** - Organize with tags and categories
- ✅ **Approve/Reject** - Review workflow
- ✅ **Search & Filter** - Find assets quickly
- ✅ **Preview** - View before binding

#### **UI Components:**
```
┌────────────────────────────────────────────────────────┐
│ 📊 Statistics Dashboard                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐             │
│  │ All  │  │Pending│  │Approved│ │Rejected│          │
│  │  24  │  │   5   │  │   18   │ │   1   │          │
│  └──────┘  └──────┘  └──────┘  └──────┘             │
│                                                         │
│ 📤 Upload New Asset                                    │
│  ┌─────────────────────────────────────────────────┐  │
│  │ [File Selector] [Category ▼] [Tags: ___]       │  │
│  │                                       [Preview]  │  │
│  │ [Upload Button]                                  │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│ 🔍 Search & Filters                                    │
│  [Search...] [Status ▼] [Category ▼] [Type ▼]        │
│                                                         │
│ 📷 Assets Grid                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                    │
│  │[img]│ │[img]│ │[img]│ │[img]│                    │
│  │name │ │name │ │name │ │name │                    │
│  │tags │ │tags │ │tags │ │tags │                    │
│  │[✓][✗]│ │[✓][✗]│ │[✓][✗]│ │[✓][✗]│                    │
│  └─────┘ └─────┘ └─────┘ └─────┘                    │
└────────────────────────────────────────────────────────┘
```

#### **Stats Cards:**
- 🔵 **All Assets** - Total count
- 🟡 **Pending** - Awaiting review
- 🟢 **Approved** - Ready to use
- 🔴 **Rejected** - Not suitable

#### **Filters:**
- **Status**: All / Pending / Approved / Rejected
- **Category**: hero, product, factory, banner, icon, team, certificate, other
- **Type**: Image / Video / Document

---

### 2️⃣ **Placeholder Tracker** (`/admin/placeholders`)

#### **Core Functions:**
- ✅ **List Placeholders** - All image locations
- ✅ **Show Status** - Missing / Replaced
- ✅ **Bind Assets** - Connect assets to placeholders
- ✅ **Unbind Assets** - Remove binding
- ✅ **Set Priority** - High / Medium / Low
- ✅ **Filter & Search** - Find placeholders quickly

#### **UI Components:**
```
┌────────────────────────────────────────────────────────┐
│ 📊 Statistics Dashboard                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐             │
│  │ All  │  │Missing│  │Replaced│ │High  │            │
│  │  45  │  │   12  │  │   33   │ │  8   │            │
│  └──────┘  └──────┘  └──────┘  └──────┘             │
│                                                         │
│ 🔍 Search & Filters                                    │
│  [Search...] [Status ▼] [Type ▼] [Priority ▼]        │
│                                                         │
│ 📍 Placeholders List                                   │
│  ┌─────────────────────────────────────────────────┐  │
│  │ home.hero                        [Missing] [High]│  │
│  │ /en/ > Hero Section                             │  │
│  │ Required: 1920x1080                             │  │
│  │ ⚠️ No asset bound     [Bind Asset Button]      │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ products.hero                 [Replaced] [Medium]│  │
│  │ /en/products > Hero Section                     │  │
│  │ Required: 1920x600                              │  │
│  │ ✅ Bound to: thermal-paper.jpg                  │  │
│  │ [Preview] [Unbind]                              │  │
│  └─────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

#### **Binding Modal:**
```
┌────────────────────────────────────────────────────────┐
│ Bind Asset to Placeholder                              │
│ Placeholder: home.hero                                 │
│                                                         │
│ [Search assets...]                                     │
│                                                         │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                      │
│ │[img]│ │[img]│ │[img]│ │[img]│ ← Select one         │
│ │name │ │name │ │name │ │name │                      │
│ └─────┘ └─────┘ └─────┘ └─────┘                      │
│                                                         │
│                          [Cancel] [Confirm Bind]       │
└────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### **Assets Table**

```typescript
interface Asset {
  id: string;                    // UUID
  created_at: string;            // ISO timestamp
  updated_at: string;            // ISO timestamp
  
  // File info
  file_name: string;             // "hero-banner.jpg"
  file_url: string;              // Supabase Storage URL
  file_type: 'image' | 'video' | 'document' | 'other';
  file_size: number;             // Bytes
  
  // Metadata
  category: string | null;       // "hero", "product", etc.
  tags: string[];                // ["thermal-paper", "russia"]
  status: 'pending' | 'approved' | 'rejected';
  
  // User tracking
  uploaded_by: string | null;    // Email
  approved_by: string | null;    // Email
}
```

### **Placeholders Table**

```typescript
interface Placeholder {
  id: string;                    // UUID
  created_at: string;            // ISO timestamp
  updated_at: string;            // ISO timestamp
  
  // Location
  placeholder_key: string;       // "home.hero"
  page_path: string;             // "/en/"
  section_name: string | null;   // "Hero Section"
  
  // Description
  element_description: string | null;
  placeholder_type: 'hero' | 'product' | 'factory' | 'banner' | 'icon' | 'other' | null;
  required_dimensions: string | null;  // "1920x1080"
  
  // Status
  status: 'missing' | 'replaced';
  asset_id: string | null;       // Foreign key to assets
  priority: 'high' | 'medium' | 'low';
}
```

---

## 🚀 Usage Guide

### **Step 1: Upload Assets**

1. Navigate to `/admin/assets`
2. Click **"Upload New Asset"** section
3. Select file (image, video, or document)
4. Choose category (optional)
5. Add tags separated by commas: `thermal-paper, hero, russia`
6. Click **"Upload"**
7. Asset is uploaded with status **"Pending"**

### **Step 2: Review Assets**

1. Find the uploaded asset in the grid
2. Click **"Approve"** (green) or **"Reject"** (red)
3. Only approved assets can be bound to placeholders

### **Step 3: Bind to Placeholder**

1. Navigate to `/admin/placeholders`
2. Find a placeholder with **"Missing"** status
3. Click **"Bind Asset"** button
4. Search for approved assets in the modal
5. Click on an asset to select it
6. Click **"Confirm Bind"**
7. Status changes to **"Replaced"** ✅

### **Step 4: Manage Bindings**

- **Preview**: Click preview button to see the asset
- **Unbind**: Remove the binding (status → "Missing")
- **Change Priority**: Use dropdown to set High/Medium/Low

---

## 🎨 UI Features

### **Color Coding**

| Status | Color | Icon |
|--------|-------|------|
| **Missing** | 🔴 Red | ⚠️ AlertCircle |
| **Replaced** | 🟢 Green | ✅ CheckCircle |
| **Pending** | 🟡 Yellow | ⏰ Clock |
| **Approved** | 🟢 Green | ✅ CheckCircle |
| **Rejected** | 🔴 Red | ❌ XCircle |

### **Priority Levels**

| Priority | Color | Badge |
|----------|-------|-------|
| **High** | 🔴 Red | High |
| **Medium** | 🟡 Yellow | Medium |
| **Low** | ⚪ Gray | Low |

### **Responsive Design**

- ✅ Desktop: Multi-column grid layout
- ✅ Tablet: 2-column layout
- ✅ Mobile: Single column with bottom sheet modals

---

## 🔐 Permissions

All asset management features require authentication:

```typescript
// Required permissions
'view_assets'           // View asset library
'manage_placeholders'   // Manage placeholder bindings
```

Users must be logged in to `/admin` to access these features.

---

## 💾 Storage Configuration

### **Supabase Storage Buckets**

1. **`assets-images`** - Main asset storage
   - Public access for approved assets
   - Used for website images

2. **`assets-docs`** - Document storage (existing)
   - Used for lead files

### **File Upload Flow**

```
User selects file
     ↓
Upload to Supabase Storage (assets-images bucket)
     ↓
Get public URL
     ↓
Save to database (assets table)
     ↓
Status: pending (awaiting approval)
     ↓
Admin approves
     ↓
Status: approved (ready to bind)
     ↓
Bind to placeholder
     ↓
Placeholder status: replaced ✅
```

---

## 📊 Example Placeholders

Common placeholder keys you might use:

```javascript
// Homepage
"home.hero"              → Main hero banner
"home.features.icon1"    → Feature section icon
"home.features.icon2"    → Feature section icon
"home.cta"               → Call-to-action image

// Products
"products.hero"          → Product page hero
"products.thermal.img"   → Thermal paper product image
"products.labels.img"    → Labels product image

// Manufacturing
"factory.overview"       → Factory overview image
"factory.production1"    → Production line photo
"factory.quality"        → Quality control image

// Applications
"apps.retail.hero"       → Retail application banner
"apps.logistics.hero"    → Logistics banner
```

---

## 🔧 Developer Notes

### **Adding New Placeholder Types**

Edit `/src/admin/lib/supabaseClient.ts`:

```typescript
placeholder_type: 
  'hero' | 
  'product' | 
  'factory' | 
  'banner' | 
  'icon' | 
  'team' |        // Add new type
  'certificate' | // Add new type
  'other' | 
  null;
```

### **Adding New Categories**

Edit `/src/admin/app/routes/assets/index.tsx`:

```typescript
const categories = [
  'hero', 
  'product', 
  'factory', 
  'banner', 
  'icon', 
  'team',        // Add here
  'certificate', // Add here
  'other'
];
```

### **Customizing File Types**

Currently accepts:
- **Images**: `image/*`
- **Videos**: `video/*`
- **Documents**: `.pdf`

To add more, edit the file input accept attribute:

```typescript
<input
  type="file"
  accept="image/*,video/*,.pdf,.doc,.docx"  // Add more
  onChange={handleFileSelect}
/>
```

---

## ✅ Testing Checklist

### **Asset Library**
- [ ] Upload image file
- [ ] Upload with category
- [ ] Upload with tags
- [ ] Search by filename
- [ ] Filter by status
- [ ] Filter by category
- [ ] Approve asset
- [ ] Reject asset
- [ ] Delete asset
- [ ] View asset preview

### **Placeholder Tracker**
- [ ] View all placeholders
- [ ] Filter by status (missing/replaced)
- [ ] Filter by type
- [ ] Filter by priority
- [ ] Search placeholders
- [ ] Open bind modal
- [ ] Search assets in modal
- [ ] Select and bind asset
- [ ] View bound asset preview
- [ ] Unbind asset
- [ ] Change priority

---

## 🐛 Troubleshooting

### **Assets Not Showing**

1. Check if asset status is "approved"
2. Verify Supabase Storage bucket exists
3. Check browser console for errors

### **Upload Fails**

1. Check file size (max usually 50MB)
2. Verify Supabase Storage permissions
3. Check network connection

### **Binding Not Working**

1. Ensure asset is approved
2. Check database permissions
3. Refresh the page

### **No Placeholders**

Placeholders must be manually created in the database:

```sql
INSERT INTO placeholders (
  placeholder_key,
  page_path,
  section_name,
  placeholder_type,
  required_dimensions,
  status,
  priority
) VALUES (
  'home.hero',
  '/en/',
  'Hero Section',
  'hero',
  '1920x1080',
  'missing',
  'high'
);
```

---

## 📈 Future Enhancements

### **Phase 2 Ideas:**
- 📁 **Bulk Upload** - Upload multiple files at once
- 🔄 **Auto-resize** - Automatically resize images
- 🏷️ **Tag Management** - Create and manage tag library
- 📊 **Usage Analytics** - Track which assets are most used
- 🗂️ **Folders** - Organize assets in folders
- 🔍 **Advanced Search** - Search by dimensions, date range
- 🎨 **Image Editor** - Basic crop/rotate/filter tools
- 📱 **Mobile Upload** - Upload from mobile devices
- 🔗 **URL Import** - Import images from URLs
- 📋 **Asset Versions** - Keep multiple versions of same asset

---

## 🎓 Best Practices

### **Naming Conventions**

```
✅ Good:
- thermal-paper-hero-1920x1080.jpg
- factory-production-line-01.jpg
- product-labels-4x6-sample.jpg

❌ Bad:
- IMG_1234.jpg
- download (2).jpg
- Untitled-1-final-v2-FINAL.jpg
```

### **Tagging Strategy**

Use consistent, lowercase tags:

```
✅ Good:
- thermal-paper, hero, russia
- product, labels, 4x6
- factory, production, equipment

❌ Bad:
- Thermal Paper, HERO, Russia
- prod, lab, 4 x 6
- Factory Production Equipment
```

### **Categories**

Choose the most specific category:

```
hero       → Main hero banners
product    → Product images
factory    → Manufacturing photos
banner     → Section banners
icon       → Icons and small graphics
team       → Team member photos
certificate→ Certifications and awards
other      → Everything else
```

---

## 📞 Support

If you encounter issues:

1. Check this documentation
2. Review error logs in browser console
3. Check Supabase dashboard for database/storage issues
4. Verify authentication is working

---

**Created by**: Figma Make AI  
**Last Updated**: 2026-02-05  
**Version**: 1.0.0

---

**🎉 Your asset management system is ready to use!**

Access it at:
- **Asset Library**: `https://xadyz.com/admin/assets`
- **Placeholder Tracker**: `https://xadyz.com/admin/placeholders`
