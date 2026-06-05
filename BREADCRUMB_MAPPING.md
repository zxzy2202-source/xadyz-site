# 🧭 Breadcrumb Navigation Mapping Guide

## 📋 Overview

This document defines the **exact breadcrumb structure** for all pages across the trilingual B2B website.

**Critical Rules:**
- ✅ Breadcrumb hierarchy **MUST** strictly follow URL structure
- ✅ Separator is always `›` (not `>` or `/`)
- ✅ Three languages have **identical structure**, different translations
- ❌ Do NOT skip levels, merge categories, or add fictional classifications
- ❌ Do NOT show breadcrumb on homepage

---

## 🌐 Language Versions

| Language | Code | Market Focus |
|----------|------|--------------|
| English | `en` | International |
| Russian | `ru` | **Primary Target** (CIS markets) |
| Chinese | `zh` | Domestic reference |

**Design Priority:** Russian market clarity is the highest standard.

---

## 📍 Complete Page → Breadcrumb Mapping

### 🏠 Homepage

**URL:** `/`, `/en/`, `/ru/`, `/zh/`

**Breadcrumb:** ❌ None (breadcrumb not displayed)

---

## 1️⃣ PRODUCTS

### Level 1: Products Overview

**URL:** `/{lang}/products`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Products |
| 🇷🇺 RU | Главная › Продукция |
| 🇨🇳 ZH | 首页 › 产品中心 |

---

### Level 2: Thermal Paper Category

#### 2.1 Thermal Paper Rolls

**URL:** `/{lang}/thermal-paper-rolls`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Products › Thermal Paper Rolls |
| 🇷🇺 RU | Главная › Продукция › Рулоны термобумаги |
| 🇨🇳 ZH | 首页 › 产品中心 › 热敏纸卷 |

**Sub-pages:**

- `/thermal-paper-rolls/blank`
  - EN: Home › Products › Thermal Paper Rolls › Blank
  - RU: Главная › Продукция › Рулоны термобумаги › Пустые
  - ZH: 首页 › 产品中心 › 热敏纸卷 › 空白

- `/thermal-paper-rolls/printed`
  - EN: Home › Products › Thermal Paper Rolls › Printed
  - RU: Главная › Продукция › Рулоны термобумаги › Печатные
  - ZH: 首页 › 产品中心 › 热敏纸卷 › 印刷

#### 2.2 Specific Thermal Products

**POS Thermal Paper** - `/{lang}/pos-thermal-paper`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Products › POS Thermal Paper |
| 🇷🇺 RU | Главная › Продукция › POS термобумага |
| 🇨🇳 ZH | 首页 › 产品中心 › POS热敏纸 |

**ATM Thermal Paper** - `/{lang}/atm-thermal-paper`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Products › ATM Thermal Paper |
| 🇷🇺 RU | Главная › Продукция › ATM термобумага |
| 🇨🇳 ZH | 首页 › 产品中心 › ATM热敏纸 |

**BPA-Free Thermal Paper** - `/{lang}/bpa-free-thermal-paper`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Products › BPA-Free Thermal Paper |
| 🇷🇺 RU | Главная › Продукция › Термобумага без BPA |
| 🇨🇳 ZH | 首页 › 产品中心 › 无BPA热敏纸 |

---

### Level 2: Thermal Labels

#### 2.3 Thermal Labels Overview

**URL:** `/{lang}/thermal-labels`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Products › Thermal Labels |
| 🇷🇺 RU | Главная › Продукция › Термоэтикетки |
| 🇨🇳 ZH | 首页 › 产品中心 › 热敏标签 |

**Sub-pages:**

- `/thermal-labels/blank`
  - EN: Home › Products › Thermal Labels › Blank
  - RU: Главная › Продукция › Термоэтикетки › Пустые
  - ZH: 首页 › 产品中心 › 热敏标签 › 空白

- `/thermal-labels/printed`
  - EN: Home › Products › Thermal Labels › Printed
  - RU: Главная › Продукция › Термоэтикетки › Печатные
  - ZH: 首页 › 产品中心 › 热敏标签 › 印刷

**4x6 Thermal Labels** - `/{lang}/thermal-labels-4x6`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Products › 4x6 Thermal Labels |
| 🇷🇺 RU | Главная › Продукция › Термоэтикетки 4×6 |
| 🇨🇳 ZH | 首页 › 产品中心 › 4x6热敏标签 |

**A6 Thermal Labels** - `/{lang}/thermal-labels-a6`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Products › A6 Thermal Labels |
| 🇷🇺 RU | Главная › Продукция › Термоэтикетки A6 |
| 🇨🇳 ZH | 首页 › 产品中心 › A6热敏标签 |

**Logistics Labels** - `/{lang}/logistics-labels`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Products › Logistics Labels |
| 🇷🇺 RU | Главная › Продукция › Логистические этикетки |
| 🇨🇳 ZH | 首页 › 产品中心 › 物流标签 |

---

### Level 2: NCR Forms

#### 2.4 NCR Forms Overview

**URL:** `/{lang}/ncr-forms`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Products › NCR Forms |
| 🇷🇺 RU | Главная › Продукция › Самокопирующаяся бумага |
| 🇨🇳 ZH | 首页 › 产品中心 › 无碳复写纸 |

**Sub-pages:**

- `/ncr-forms/blank`
  - EN: Home › Products › NCR Forms › Blank
  - RU: Главная › Продукция › Самокопирующаяся бумага › Пустые
  - ZH: 首页 › 产品中心 › 无碳复写纸 › 空白

- `/ncr-forms/printed`
  - EN: Home › Products › NCR Forms › Printed
  - RU: Главная › Продукция › Самокопирующаяся бумага › Печатные
  - ZH: 首页 › 产品中心 › 无碳复写纸 › 印刷

- `/ncr-forms/continuous`
  - EN: Home › Products › NCR Forms › Continuous
  - RU: Главная › Продукция › Самокопирующаяся бумага › Непрерывные
  - ZH: 首页 › 产品中心 › 无碳复写纸 › 连续

---

## 2️⃣ MATERIAL SUPPLY

⚠️ **CRITICAL:** Material Supply is a **separate top-level category** from Products. Do NOT nest under Products.

### Level 1: Material Supply Overview

**URL:** `/{lang}/material-supply`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Material Supply |
| 🇷🇺 RU | Главная › Сырьё |
| 🇨🇳 ZH | 首页 › 原材料供应 |

---

### Level 2: Material Supply Products

**Thermal Jumbo Rolls** - `/{lang}/material-supply/thermal-jumbo-rolls`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Material Supply › Thermal Jumbo Rolls |
| 🇷🇺 RU | Главная › Сырьё › Термо джамбо-рулоны |
| 🇨🇳 ZH | 首页 › 原材料供应 › 热敏原纸（巨型卷） |

**Self-Adhesive Jumbo Rolls** - `/{lang}/material-supply/self-adhesive-jumbo-rolls`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Material Supply › Self-Adhesive Jumbo Rolls |
| 🇷🇺 RU | Главная › Сырьё › Самоклеющиеся джамбо-рулоны |
| 🇨🇳 ZH | 首页 › 原材料供应 › 不干胶原纸（巨型卷） |

**Self-Adhesive Sheets** - `/{lang}/material-supply/self-adhesive-sheets`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Material Supply › Self-Adhesive Sheets |
| 🇷🇺 RU | Главная › Сырьё › Самоклеющиеся листы |
| 🇨🇳 ZH | 首页 › 原材料供应 › 不干胶片材 |

**NCR Jumbo Rolls** - `/{lang}/material-supply/ncr-jumbo-rolls`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Material Supply › NCR Jumbo Rolls |
| 🇷🇺 RU | Главная › Сырьё › NCR джамбо-рулоны |
| 🇨🇳 ZH | 首页 › 原材料供应 › 无碳复写原纸（巨型卷） |

**NCR Sheets** - `/{lang}/material-supply/ncr-sheets`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Material Supply › NCR Sheets |
| 🇷🇺 RU | Главная › Сырьё › NCR листы |
| 🇨🇳 ZH | 首页 › 原材料供应 › 无碳复写片材 |

---

## 3️⃣ APPLICATIONS

### Level 1: Applications Overview

**URL:** `/{lang}/applications`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Applications |
| 🇷🇺 RU | Главная › Отраслевые решения |
| 🇨🇳 ZH | 首页 › 应用场景 |

---

### Level 2: Industry Solutions

**Government Tenders** - `/{lang}/applications/government-tenders`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Applications › Government Tenders |
| 🇷🇺 RU | Главная › Отраслевые решения › Государственные тендеры |
| 🇨🇳 ZH | 首页 › 应用场景 › 政府投标 |

**Retail & POS** - `/{lang}/applications/retail-pos`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Applications › Retail & POS |
| 🇷🇺 RU | Главная › Отраслевые решения › Розничная торговля и POS |
| 🇨🇳 ZH | 首页 › 应用场景 › 零售与POS |

**Logistics & Warehousing** - `/{lang}/applications/logistics-warehousing`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Applications › Logistics & Warehousing |
| 🇷🇺 RU | Главная › Отраслевые решения › Логистика и складирование |
| 🇨🇳 ZH | 首页 › 应用场景 › 物流与仓储 |

**Supermarkets** - `/{lang}/applications/supermarkets`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Applications › Supermarkets |
| 🇷🇺 RU | Главная › Отраслевые решения › Супермаркеты |
| 🇨🇳 ZH | 首页 › 应用场景 › 超市 |

**Banking & Finance** - `/{lang}/applications/banking-finance`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Applications › Banking & Finance |
| 🇷🇺 RU | Главная › Отраслевые решения › Банковский сектор и финансы |
| 🇨🇳 ZH | 首页 › 应用场景 › 银行与金融 |

**Healthcare** - `/{lang}/applications/healthcare`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Applications › Healthcare |
| 🇷🇺 RU | Главная › Отраслевые решения › Здравоохранение |
| 🇨🇳 ZH | 首页 › 应用场景 › 医疗健康 |

---

## 4️⃣ MANUFACTURING

### Level 1: Manufacturing Overview

**URL:** `/{lang}/manufacturing`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Manufacturing |
| 🇷🇺 RU | Главная › Производство |
| 🇨🇳 ZH | 首页 › 生产制造 |

---

### Level 2: Manufacturing Details

**Factory Overview** - `/{lang}/manufacturing/factory-overview`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Manufacturing › Factory Overview |
| 🇷🇺 RU | Главная › Производство › Обзор завода |
| 🇨🇳 ZH | 首页 › 生产制造 › 工厂概况 |

**Production Lines** - `/{lang}/manufacturing/production-lines`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Manufacturing › Production Lines |
| 🇷🇺 RU | Главная › Производство › Производственные линии |
| 🇨🇳 ZH | 首页 › 生产制造 › 生产线 |

**Quality Control** - `/{lang}/manufacturing/quality-control`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Manufacturing › Quality Control |
| 🇷🇺 RU | Главная › Производство › Контроль качества |
| 🇨🇳 ZH | 首页 › 生产制造 › 质量控制 |

**Certifications** - `/{lang}/manufacturing/certifications`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Manufacturing › Certifications |
| 🇷🇺 RU | Главная › Производство › Сертификаты |
| 🇨🇳 ZH | 首页 › 生产制造 › 认证资质 |

**OEM & Customization** - `/{lang}/manufacturing/oem-customization`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Manufacturing › OEM & Customization |
| 🇷🇺 RU | Главная › Производство › OEM и кастомизация |
| 🇨🇳 ZH | 首页 › 生产制造 › OEM定制 |

---

## 5️⃣ RESOURCES

### Level 1: Resources Overview

**URL:** `/{lang}/resources`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Resources |
| 🇷🇺 RU | Главная › Ресурсы |
| 🇨🇳 ZH | 首页 › 资源中心 |

---

### Level 2: Resource Types

**Blog & Insights** - `/{lang}/resources/blog-insights`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Resources › Blog & Insights |
| 🇷🇺 RU | Главная › Ресурсы › Блог и аналитика |
| 🇨🇳 ZH | 首页 › 资源中心 › 博客与洞察 |

**Tools & Calculators** - `/{lang}/resources/tools-calculators`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Resources › Tools & Calculators |
| 🇷🇺 RU | Главная › Ресурсы › Инструменты и калькуляторы |
| 🇨🇳 ZH | 首页 › 资源中心 › 工具与计算器 |

**FAQs** - `/{lang}/resources/faqs`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Resources › FAQs |
| 🇷🇺 RU | Главная › Ресурсы › Часто задаваемые вопросы |
| 🇨🇳 ZH | 首页 › 资源中心 › 常见问题 |

**Packaging & Logistics** - `/{lang}/resources/packaging-logistics`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Resources › Packaging & Logistics |
| 🇷🇺 RU | Главная › Ресурсы › Упаковка и логистика |
| 🇨🇳 ZH | 首页 › 资源中心 › 包装与物流 |

---

## 6️⃣ COMPANY

### Top-Level Company Pages

**About** - `/{lang}/about`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › About |
| 🇷🇺 RU | Главная › О компании |
| 🇨🇳 ZH | 首页 › 关于我们 |

**Contact** - `/{lang}/contact`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Contact |
| 🇷🇺 RU | Главная › Контакты |
| 🇨🇳 ZH | 首页 › 联系我们 |

**Request Tender Pack** - `/{lang}/request-tender-pack`

| Language | Breadcrumb |
|----------|------------|
| 🇬🇧 EN | Home › Request Tender Pack |
| 🇷🇺 RU | Главная › Запрос тендерного пакета |
| 🇨🇳 ZH | 首页 › 申请招标资料包 |

---

## ✅ Implementation Checklist

- [x] BreadcrumbNav component created with all translations
- [x] URL structure strictly followed (no skipping/merging)
- [x] Three languages have identical hierarchy
- [x] Russian translations verified for market clarity
- [x] Separator fixed as `›` throughout
- [x] Homepage excludes breadcrumb
- [x] All product, material, application, manufacturing, and resource pages covered

---

## 📝 Maintenance Notes

**When adding new pages:**

1. Identify the **exact URL structure**
2. Add translation to `pathTranslations` in `BreadcrumbNav.tsx`
3. Verify breadcrumb appears correctly in all 3 languages
4. Update this document with the new mapping

**Translation Guidelines:**

- EN: Use industry-standard terminology
- RU: Prioritize clarity for government tender context
- ZH: Use simplified Chinese business terminology

---

**Last Updated:** 2026-02-03  
**Component Location:** `/src/app/components/BreadcrumbNav.tsx`  
**Maintained by:** Development Team
