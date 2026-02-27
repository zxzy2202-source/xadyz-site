# 📷 Image Placeholder Standard - Zhixin Paper B2B Website

## ⚠️ CRITICAL INSTRUCTION

**For all pages and sections, use IMAGE PLACEHOLDERS only.**  
**Do NOT generate or auto-replace any images.**

---

## 🎯 Purpose

This B2B industrial website requires **real factory photography** and **authentic product images** to build trust with:
- Government tender clients
- Distributor partners  
- OEM buyers

**Generic stock photos or AI-generated images damage credibility.**

Therefore, we use professional placeholders until real images are provided manually.

---

## ✅ Standard Rules

### 1. **All Image Areas Must Use Placeholder Component**
```typescript
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';

// ✅ Correct
<ImagePlaceholder type="hero" aspectRatio="16:9" size="xl" />

// ❌ Wrong
<img src="figma:asset/..." />
<img src="https://unsplash.com/..." />
```

### 2. **Do NOT Auto-Generate Images**
- No stock photo APIs (Unsplash, Pexels, etc.)
- No AI image generation
- No placeholder image services
- Keep layout, spacing, and aspect ratio only

### 3. **Image Types & Specifications**

| Type | Usage | Aspect Ratio | Size |
|------|-------|--------------|------|
| **Hero** | Homepage, Category pages | 21:9 or 16:9 | xl |
| **Product** | Product category cards | 4:3 or 1:1 | lg |
| **Factory** | Manufacturing, About pages | 16:9 or 4:3 | lg |
| **Material** | Material Supply sections | 3:2 or 4:3 | md |
| **Application** | Industry use cases | 16:9 | md |
| **Section** | Supporting visuals | 16:9 or 3:2 | md |

---

## 📋 Page-by-Page Replacement Guide

### ✅ **Priority 1: Hero Sections (COMPLETED)**

| Page | Type | Aspect Ratio | Status |
|------|------|--------------|--------|
| Home (`/`) | `hero` | `21:9` | ✅ Updated |
| Thermal Paper Rolls | `hero` | `16:9` | ✅ Updated |
| Thermal Labels | `hero` | `16:9` | ✅ Updated |
| NCR Forms | `hero` | `16:9` | ✅ Updated |
| Government & Tenders | `hero` | `16:9` | ✅ Updated |
| Applications Overview | `hero` | `16:9` | ✅ Updated |

### ✅ **Priority 2: Product/Category Cards**

| Section | Type | Aspect Ratio | Status |
|---------|------|--------------|--------|
| Products Overview cards | `product` | `4:3` | ✅ Updated |
| Material Supply cards | `material` | `4:3` | ✅ Updated |
| Applications cards | `application` | `16:9` | ✅ Updated |

### ✅ **Priority 3: Detail Pages**

| Page | Type | Aspect Ratio | Status |
|------|------|--------------|--------|
| Material Supply Details | `material` | `16:9` | ✅ Updated |
| About Us | `factory` | `16:9` | ✅ Updated |
| Manufacturing | `factory` | `16:9` | ✅ Updated |

---

## 🔧 Implementation Examples

### **Example 1: Hero Section**
```tsx
// Before (using figma:asset or external images)
<div className="relative h-[600px]">
  <img src="figma:asset/hero-image.jpg" />
</div>

// After (using placeholder)
<ImagePlaceholder 
  type="hero" 
  aspectRatio="21:9" 
  size="xl"
  description="Factory production line or thermal paper manufacturing"
/>
```

### **Example 2: Product Category Card**
```tsx
// Before
<img src="thermal-paper-thumbnail.jpg" className="w-full h-64" />

// After
<ImagePlaceholder 
  type="product" 
  aspectRatio="4:3" 
  size="lg"
  description="Thermal paper rolls product reference"
/>
```

### **Example 3: Factory/Manufacturing Section**
```tsx
// Before
<img src="factory-floor.jpg" />

// After
<ImagePlaceholder 
  type="factory" 
  aspectRatio="16:9" 
  size="lg"
  description="Zhixin Paper factory facility and equipment"
/>
```

### **Example 4: Material Supply**
```tsx
// Before
<img src="jumbo-roll.jpg" />

// After
<ImagePlaceholder 
  type="material" 
  aspectRatio="3:2" 
  size="md"
  description="Thermal jumbo roll product"
/>
```

---

## 🎨 Placeholder Component Features

### **Visual Design:**
- ✅ Professional gradient background (gray-100 to gray-50)
- ✅ Dashed border (indicates "to be replaced")
- ✅ Type-specific icon (Package, Factory, Briefcase, etc.)
- ✅ Clear label (e.g., "HERO IMAGE PLACEHOLDER")
- ✅ Description of expected content
- ✅ Aspect ratio indicator
- ✅ Warning badge: "⚠️ Manual Image Required"
- ✅ Subtle grid pattern background

### **Technical:**
- ✅ Responsive (maintains aspect ratio)
- ✅ TypeScript typed
- ✅ Consistent spacing/sizing system
- ✅ No external dependencies
- ✅ Accessible (descriptive text)

---

## 📸 Real Image Preparation Checklist

When providing real images, ensure:

### **Hero Images:**
- [ ] Resolution: 1920×1080 or higher
- [ ] Format: JPG (optimized) or WebP
- [ ] Content: Factory exterior, production floor, or industry scene
- [ ] No people faces (privacy/consent)
- [ ] Professional lighting

### **Product Images:**
- [ ] Resolution: 800×600 or higher
- [ ] Format: JPG or PNG (transparent background if needed)
- [ ] Content: Actual Zhixin Paper products
- [ ] Clean background (white or light gray)
- [ ] Multiple angles if possible

### **Factory/Manufacturing:**
- [ ] Resolution: 1600×900 or higher
- [ ] Content: Production lines, machinery, QC process
- [ ] Show brand equipment (if applicable)
- [ ] Organized, professional appearance

### **Material Supply:**
- [ ] Resolution: 1200×800 or higher
- [ ] Content: Jumbo rolls, raw materials, packaging
- [ ] Close-up details showing quality
- [ ] Scale reference (if helpful)

---

## 🚫 What NOT to Use

### ❌ Generic Stock Photos
```
- Office workers shaking hands
- Random factory (not Zhixin Paper)
- Generic product boxes
- Staged professional photoshoots
```

### ❌ AI-Generated Images
```
- Dalle/Midjourney/Stable Diffusion outputs
- Obvious artificial imagery
- Unrealistic factory scenes
```

### ❌ Competitor Images
```
- Images from other thermal paper manufacturers
- Rebranded competitor products
- Copyright violations
```

---

## ✅ Acceptable Temporary Solutions (if needed)

### 1. **Simple Gradient Backgrounds**
```tsx
<div className="bg-gradient-to-br from-blue-50 to-blue-100 h-96" />
```

### 2. **Icon-Based Illustrations**
```tsx
<div className="flex items-center justify-center h-96 bg-gray-50">
  <Factory size={120} className="text-gray-300" />
</div>
```

### 3. **Text-Only Sections**
```tsx
// Skip imagery entirely, use text/stats instead
<div className="bg-blue-600 text-white p-12">
  <h2>15+ Years Manufacturing Experience</h2>
  <p>ISO 9001 Certified Factory</p>
</div>
```

---

## 📊 Current Implementation Status

### **Components:**
- [✅] ImagePlaceholder.tsx created
- [✅] Standard types defined (hero, product, factory, etc.)
- [✅] Aspect ratio presets configured
- [✅] Size variants (sm, md, lg, xl)

### **Pages Updated:**
- [✅] Home (LandingPage)
- [✅] Thermal Paper Rolls
- [✅] Thermal Labels
- [✅] NCR Forms
- [✅] Products Overview
- [✅] Material Supply Overview
- [✅] Applications Overview
- [✅] Government & Tenders
- [✅] Material Supply Details (5 pages)

### **Pages Not Using Images (No Update Needed):**
- Footer (text/links only)
- Request Tender Pack (form-based)
- Contact Page (form/map)

---

## 🎯 SEO Considerations

### **Placeholder Images and SEO:**
```tsx
// Add proper alt text even for placeholders
<ImagePlaceholder 
  type="hero"
  // This component should render with semantic HTML
  // and proper alt attributes when implemented
/>

// When real images are added:
<img 
  src="/images/zhixin-factory-thermal-paper-production.jpg"
  alt="Zhixin Paper thermal paper production facility in China"
  loading="lazy"
  width={1920}
  height={1080}
/>
```

### **Image File Naming Convention (for future):**
```
✅ Good:
- zhixin-thermal-paper-rolls-80mm-factory.jpg
- ncr-forms-continuous-production-line.jpg
- thermal-labels-jumbo-roll-manufacturing.jpg

❌ Bad:
- IMG_1234.jpg
- photo.jpg
- untitled.png
```

---

## 🔄 Migration Path (When Real Images Arrive)

### **Step 1: Organize Images**
```
/public/images/
├── hero/
│   ├── home-hero.jpg
│   ├── thermal-paper-hero.jpg
│   └── ncr-forms-hero.jpg
├── products/
│   ├── thermal-rolls-80mm.jpg
│   └── thermal-labels-100x50.jpg
├── factory/
│   ├── production-line-1.jpg
│   └── quality-control.jpg
└── materials/
    ├── jumbo-roll.jpg
    └── self-adhesive.jpg
```

### **Step 2: Replace Placeholders**
```tsx
// Find all instances of:
<ImagePlaceholder type="hero" ... />

// Replace with:
<img 
  src="/images/hero/home-hero.jpg" 
  alt="Zhixin Paper thermal paper manufacturing facility"
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

### **Step 3: Optimize Images**
```bash
# Use tools like:
- ImageOptim (Mac)
- TinyPNG (Web)
- Sharp (Node.js)

# Target:
- Hero images: < 200KB
- Product images: < 100KB
- Thumbnails: < 50KB
```

---

## 📞 Contact for Image Provision

**When ready to provide real images:**

1. Upload to shared folder (Google Drive / Dropbox)
2. Name files according to convention above
3. Include brief description of each image
4. Specify which placeholder it replaces

**Image Specifications Document:**
- See `/IMAGE_SPECIFICATIONS.md` (to be created if needed)

---

## 🎓 Why This Approach Works

### **For B2B Industrial Websites:**
✅ **Authenticity** - Real factory images build trust  
✅ **Professionalism** - Placeholders look more professional than wrong images  
✅ **Flexibility** - Easy to replace later without code changes  
✅ **SEO** - Proper image optimization when real images added  
✅ **Speed** - Don't block development waiting for photos  

### **For Government Tender Clients:**
✅ **Verification** - Can request factory visit to verify images  
✅ **Transparency** - No misleading visuals  
✅ **Documentation** - Real images can be used in tender packs  

---

## 📚 Related Documentation

- `/LAUNCH_CHECKLIST.md` - Pre-launch image verification
- `/SEO_OPTIMIZATION.md` - Image SEO best practices
- `/FOOTER_OPTIMIZATION_REPORT.md` - Footer implementation (no images)
- `/TENDER_LEAD_QUALIFICATION.md` - Tender client strategy

---

**Last Updated:** 2025-02-01  
**Version:** 1.0  
**Status:** ✅ Standard Implemented Across All Pages  

---

## 🚀 Quick Reference

```tsx
// Import
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';

// Usage
<ImagePlaceholder 
  type="hero | product | factory | material | application | section"
  aspectRatio="16:9 | 4:3 | 1:1 | 3:2 | 21:9"
  size="sm | md | lg | xl"
  description="Optional custom description"
  className="optional-classes"
/>
```

**That's it! Professional, clear, and ready for real images when they arrive.** 🎉
