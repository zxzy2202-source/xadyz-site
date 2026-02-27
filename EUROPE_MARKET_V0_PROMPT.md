# v0 欧洲市场首页生成提示词

> 用于 v0.dev 生成面向欧洲采购商的热敏纸工厂首页。复制下方 Prompt 到 v0 即可生成对应页面。

---

## 主 Prompt（完整首页）

```
Create a modern, European-aesthetic landing page for a Chinese thermal paper and label manufacturer targeting B2B European buyers (wholesalers, distributors, large retailers like Lidl/Aldi, logistics companies like DHL/DPD, and brand owners).

Design requirements:
- Clean, minimal, professional B2B industrial aesthetic (not consumer flashy)
- European typography: use a refined sans-serif (e.g. Inter, Geist, or similar)
- Color palette: deep blue (#1e3a5f) as primary, white, light gray backgrounds
- Generous whitespace, clear hierarchy
- Trust signals prominent (certifications, capacity data)

Page structure (top to bottom):

1. HEADER (sticky)
   - Logo left
   - Nav: Products | Manufacturing | Compliance | Contact
   - Language switcher (EN / RU / ZH)
   - Minimal, no clutter

2. HERO SECTION
   - Full-width background: factory slitting machine in motion (or high-quality industrial photo)
   - Overlay: dark gradient for text readability
   - Headline (large, bold): "Top-Tier Thermal Paper & Label Manufacturer in China. Serving European Markets with FSC-Certified Excellence."
   - Subheadline: "65-person team. 30 tons daily printing. 200,000 rolls daily slitting. Your supply chain never breaks."
   - Two CTAs: "View Products" (primary) | "Request Free Sample Kit" (secondary outline)
   - No carousel, single impactful hero

3. STATISTICS BAR (immediately below hero)
   - Horizontal row, 4 items with icons:
     - 45 Production Staff
     - 30 Tons Daily Printing
     - 200,000 Rolls Daily Slitting
     - 10 International Sales Experts
   - Subtle background (light gray or white)
   - Numbers bold, labels smaller

4. CORE PRODUCTS (3 cards)
   - Card 1: Thermal Till Rolls (POS) — "For retail, receipts, POS systems"
   - Card 2: Shipping Labels (Direct Thermal) — "For logistics, DHL, DPD, barcode"
   - Card 3: Pre-printed Advertising Rolls — "Back-print coupons, brand marketing"
   - Each card: icon, title, short desc, "Learn More" link
   - Hover effect: subtle border/shadow

5. COMPLIANCE SECTION (European buyers care most)
   - Section title: "Compliance & Certifications"
   - 4 large badge-style icons in a row:
     - BPA FREE
     - FSC Certified
     - ISO 9001
     - SGS Tested
   - Brief line: "Meeting EU regulations and global standards"
   - Clean, trust-building

6. MANUFACTURING CAPABILITY
   - Title: "Scalable Capacity: Your Supply Chain Never Breaks"
   - Short intro: "15 slitting machines. 4 printing lines. Redundancy ensures on-time delivery even during maintenance."
   - Visual: factory image or equipment grid
   - CTA: "View Manufacturing"

7. CUSTOM PRINTING TEASER
   - Title: "High-Precision Printing: Boost Your Brand"
   - Subtext: "3 label printing lines. Custom back-print, coupons, logos. For supermarkets and logistics."
   - 2–3 sample product images (placeholder OK)
   - CTA: "OEM & Customization"

8. CONTACT / INQUIRY BLOCK
   - Split layout:
     - Left: "Request a Free Sample Kit" — European buyers prefer samples before pricing
     - Right: Simple form (Name, Email, Company, Message)
   - Or: "Professional Inquiry Response within 2 Hours" promise
   - CTA button: "Send Inquiry"

9. FOOTER
   - Products | Manufacturing | Compliance | Contact | About
   - Copyright, social links (optional)
   - Minimal

Tech stack: React, Tailwind CSS, shadcn/ui components if available. Responsive, mobile-first.
```

---

## 备选：仅 Hero + Statistics 模块

若只需首屏优化，可用此精简版：

```
Create a hero section + statistics bar for a B2B thermal paper manufacturer website targeting European buyers.

Hero:
- Full-width background image (factory slitting machine)
- Dark overlay for text
- Headline: "Top-Tier Thermal Paper & Label Manufacturer in China. Serving European Markets with FSC-Certified Excellence."
- Subheadline: "65-person team. 30 tons daily. 200,000 rolls daily. Your supply chain never breaks."
- Two buttons: "View Products" | "Request Free Sample Kit"

Statistics bar (below hero):
- 4 items in a row: 45 Production Staff | 30 Tons Daily Printing | 200,000 Rolls Daily Slitting | 10 International Experts
- Icons + numbers + labels
- Light gray background, responsive grid

Use React + Tailwind. Clean, minimal, European B2B aesthetic.
```

---

## 备选：Compliance 合规模块

```
Create a "Compliance & Certifications" section for a thermal paper manufacturer website.

- Section title: "Compliance & Certifications"
- 4 badge/card items in a row:
  1. BPA FREE — "Bisphenol A free, EU compliant"
  2. FSC Certified — "Responsible forestry sourcing"
  3. ISO 9001 — "Quality management system"
  4. SGS Tested — "Independent third-party testing"
- Subtext: "Meeting EU regulations and global standards"
- Use icons or simple badge graphics
- React + Tailwind, responsive
```

---

## 使用说明

1. **复制主 Prompt** 到 v0.dev，可生成完整首页。
2. **与现有项目集成**：v0 生成的代码为 React + Tailwind，可直接复制到 `LandingPage.tsx` 或新建 `LandingPageEurope.tsx`。
3. **多语言**：生成后需在 `content.en` 等对象中补充 `ru`、`zh` 翻译。
4. **图片**：将 `factory slitting machine` 替换为实际工厂分切机照片 URL（如 `home-banner.jpg`）。

---

## 与现有 LandingPage 的差异

| 模块 | 现有版本 | 欧洲市场优化版 |
|------|----------|----------------|
| Hero 文案 | 通用 "Factory-Manufactured..." | 强调 FSC、欧洲市场、产能数据 |
| Statistics | 无 | 新增：45人/30吨/20万卷/10人销售 |
| 产品分类 | Thermal Paper / Labels / NCR | Thermal Till Rolls / Shipping Labels / Pre-printed Ads |
| Compliance | 分散在 Certifications 页 | 首屏下置顶展示 BPA/FSC/ISO/SGS |
| Contact CTA | "Contact Us" | "Request Free Sample Kit" + 2小时响应承诺 |
