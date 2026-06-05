# 🧪 面包屑上线测试清单

## 🎯 测试目标

确保所有页面的面包屑：
1. ✅ **正确显示** - 位置、样式、内容
2. ✅ **功能正常** - 链接可点击、导航正确
3. ✅ **三语言支持** - EN/RU/ZH 都正常
4. ✅ **响应式设计** - 桌面端和移动端都正常

---

## 📋 核心路径测试（必须全部通过）

### **测试方法：**
1. 在浏览器打开 URL
2. 检查面包屑是否显示
3. 验证面包屑文字是否正确
4. 点击每个链接，确认跳转正确

---

### **🔴 P0：核心产品页面（5 条路径）**

#### ✅ Test 1.1: Products Overview
```
URL:  /en/products
预期: Home › Products

URL:  /ru/products
预期: Главная › Продукция

URL:  /zh/products
预期: 首页 › 产品

检查项：
- [ ] 面包屑在 Hero 下方、正文上方
- [ ] "Home" 可点击，跳转到 /en
- [ ] "Products" 加粗、不可点击（当前页）
- [ ] 分隔符 › 显示正常
```

---

#### ✅ Test 1.2: Thermal Paper Rolls
```
URL:  /en/products/thermal-paper-rolls
预期: Home › Products › Thermal Paper Rolls

URL:  /ru/products/thermal-paper-rolls
预期: Главная › Продукция › Рулоны термобумаги

URL:  /zh/products/thermal-paper-rolls
预期: 首页 › 产品 › 热敏纸卷

检查项：
- [ ] 三级面包屑显示正确
- [ ] "Home" 和 "Products" 都可点击
- [ ] "Thermal Paper Rolls" 不可点击
- [ ] 点击 "Products" 跳转到 /en/products
- [ ] 点击 "Home" 跳转到 /en
```

---

#### ✅ Test 1.3: Thermal Labels
```
URL:  /en/products/thermal-labels
预期: Home › Products › Thermal Labels

检查项：
- [ ] 面包屑显示正确
- [ ] 链接功能正常
```

---

#### ✅ Test 1.4: NCR Forms
```
URL:  /en/products/ncr-forms
预期: Home › Products › NCR Forms

检查项：
- [ ] 面包屑显示正确
- [ ] 链接功能正常
```

---

#### ✅ Test 1.5: Material Supply Overview
```
URL:  /en/material-supply
预期: Home › Material Supply

URL:  /ru/material-supply
预期: Главная › Материалы

URL:  /zh/material-supply
预期: 首页 › 原材料供应

检查项：
- [ ] 面包屑显示正确
- [ ] 三语言都正常
```

---

### **🟠 P1：原料供应页面（4 条路径）**

#### ✅ Test 2.1: Thermal Jumbo Rolls
```
URL:  /en/material-supply/thermal-jumbo-rolls
预期: Home › Material Supply › Thermal Jumbo Rolls

URL:  /ru/material-supply/thermal-jumbo-rolls
预期: Главная › Материалы › Термобумага в джамбо-рулонах

URL:  /zh/material-supply/thermal-jumbo-rolls
预期: 首页 › 原材料供应 › 热敏原纸大卷

检查项：
- [ ] 三级面包屑显示正确
- [ ] 所有链接功能正常
- [ ] 三语言都正确
```

---

#### ✅ Test 2.2: NCR Jumbo Rolls
```
URL:  /en/material-supply/ncr-jumbo-rolls
预期: Home › Material Supply › NCR Jumbo Rolls

检查项：
- [ ] 面包屑显示正确
```

---

#### ✅ Test 2.3: Self-Adhesive Jumbo Rolls
```
URL:  /en/material-supply/self-adhesive-jumbo-rolls
预期: Home › Material Supply › Self-Adhesive Jumbo Rolls

检查项：
- [ ] 面包屑显示正确
```

---

#### ✅ Test 2.4: NCR Sheets
```
URL:  /en/material-supply/ncr-sheets
预期: Home › Material Supply › NCR Sheets

检查项：
- [ ] 面包屑显示正确
```

---

### **🟡 P2：应用场景页面（7 条路径）**

#### ✅ Test 3.1: Applications Overview
```
URL:  /en/applications
预期: Home › Applications

URL:  /ru/applications
预期: Главная › Применения

URL:  /zh/applications
预期: 首页 › 应用场景

检查项：
- [ ] 面包屑显示正确
- [ ] 三语言都正常
```

---

#### ✅ Test 3.2: Retail & POS
```
URL:  /en/applications/retail-pos
预期: Home › Applications › Retail & POS

URL:  /ru/applications/retail-pos
预期: Главная › Применения › Розница и POS

URL:  /zh/applications/retail-pos
预期: 首页 › 应用场景 › 零售与POS

检查项：
- [ ] 三级面包屑显示正确
- [ ] 链接功能正常
```

---

#### ✅ Test 3.3: Logistics & Warehousing
```
URL:  /en/applications/logistics-warehousing
预期: Home › Applications › Logistics & Warehousing

检查项：
- [ ] 面包屑显示正确
```

---

#### ✅ Test 3.4: Supermarkets
```
URL:  /en/applications/supermarkets
预期: Home › Applications › Supermarkets

检查项：
- [ ] 面包屑显示正确
```

---

#### ✅ Test 3.5: Government Tenders
```
URL:  /en/applications/government-tenders
预期: Home › Applications › Government Tenders

URL:  /ru/applications/government-tenders
预期: Главная › Применения › Государственные тендеры

URL:  /zh/applications/government-tenders
预期: 首页 › 应用场景 › 政府投标

检查项：
- [ ] 三级面包屑显示正确
- [ ] 三语言都正确
```

---

#### ✅ Test 3.6: Banking & Finance
```
URL:  /en/applications/banking-finance
预期: Home › Applications › Banking & Finance

检查项：
- [ ] 面包屑显示正确
```

---

#### ✅ Test 3.7: Healthcare
```
URL:  /en/applications/healthcare
预期: Home › Applications › Healthcare

检查项：
- [ ] 面包屑显示正确
```

---

### **🟢 P3：公司信息页面（5 条路径）**

#### ✅ Test 4.1: About
```
URL:  /en/about
预期: Home › About

URL:  /ru/about
预期: Главная › О компании

URL:  /zh/about
预期: 首页 › 关于我们

检查项：
- [ ] 面包屑显示正确
- [ ] 三语言都正常
```

---

#### ✅ Test 4.2: Production
```
URL:  /en/about/production
预期: Home › About › Production

检查项：
- [ ] 三级面包屑显示正确
```

---

#### ✅ Test 4.3: Certifications
```
URL:  /en/about/certifications
预期: Home › About › Certifications

检查项：
- [ ] 面包屑显示正确
```

---

#### ✅ Test 4.4: OEM & Customization
```
URL:  /en/about/oem-customization
预期: Home › About › OEM & Customization

检查项：
- [ ] 面包屑显示正确
```

---

#### ✅ Test 4.5: Contact
```
URL:  /en/contact
预期: Home › Contact

URL:  /ru/contact
预期: Главная › Контакты

URL:  /zh/contact
预期: 首页 › 联系我们

检查项：
- [ ] 面包屑显示正确
- [ ] 三语言都正常
```

---

### **🔵 P4：资源中心页面（5 条路径）**

#### ✅ Test 5.1: Resources Center
```
URL:  /en/resources
预期: Home › Resources

URL:  /ru/resources
预期: Главная › Ресурсы

URL:  /zh/resources
预期: 首页 › 资源中心

检查项：
- [ ] 面包屑显示正确
- [ ] 三语言都正常
```

---

#### ✅ Test 5.2: Blog & Insights
```
URL:  /en/resources/blog
预期: Home › Resources › Blog & Insights

检查项：
- [ ] 三级面包屑显示正确
```

---

#### ✅ Test 5.3: Tools & Calculators
```
URL:  /en/resources/tools-calculators
预期: Home › Resources › Tools & Calculators

检查项：
- [ ] 面包屑显示正确
```

---

#### ✅ Test 5.4: FAQs
```
URL:  /en/resources/faqs
预期: Home › Resources › FAQs

检查项：
- [ ] 面包屑显示正确
```

---

#### ✅ Test 5.5: Request Tender Pack
```
URL:  /en/resources/request-tender-pack
预期: Home › Resources › Request Tender Pack

检查项：
- [ ] 面包屑显示正确
```

---

### **⚪ 特殊页面测试**

#### ✅ Test 6.1: Landing Page（首页）
```
URL:  /en
预期: 无面包屑

URL:  /ru
预期: 无面包屑

URL:  /zh
预期: 无面包屑

检查项：
- [ ] 首页不显示面包屑
- [ ] 页面其他部分正常显示
```

---

## 🎨 视觉和样式测试

### **桌面端（1920x1080）：**

- [ ] 面包屑位置在 Hero 下方、正文上方
- [ ] 面包屑不被 Hero 背景覆盖
- [ ] 文字清晰可读
- [ ] 链接颜色为灰色（#6B7280）
- [ ] 当前页文字为深色加粗（#111827）
- [ ] 分隔符 › 显示清晰
- [ ] Hover 链接时出现下划线
- [ ] 左右边距符合设计规范（max-w-7xl + px-4）

---

### **移动端（375x667 - iPhone SE）：**

- [ ] 面包屑自动换行（不横向溢出）
- [ ] 文字大小适中（14px）
- [ ] 可点击区域足够大（易于触摸）
- [ ] 不遮挡正文内容
- [ ] 间距合理

---

### **平板端（768x1024 - iPad）：**

- [ ] 面包屑显示正常
- [ ] 布局与桌面端一致
- [ ] 响应式适配正确

---

## ⚡ 性能和加载测试

### **首次加载：**

- [ ] 面包屑在页面加载时立即显示（不闪烁）
- [ ] 没有 CLS（累积布局偏移）
- [ ] 字体加载不影响面包屑显示

---

### **路由切换：**

- [ ] 从 `/en/products` 切换到 `/en/applications`，面包屑立即更新
- [ ] 没有延迟或闪烁
- [ ] URL 变化后面包屑自动同步

---

### **语言切换：**

- [ ] 从 EN 切换到 RU，面包屑文字立即变化
- [ ] 链接 href 正确更新（/en → /ru）
- [ ] 没有显示错误语言的文字

---

## 🌐 跨浏览器测试

### **Chrome（最新版）：**
- [ ] 桌面端正常
- [ ] 移动模拟器正常
- [ ] Console 无错误

---

### **Safari（Mac + iOS）：**
- [ ] Mac 桌面端正常
- [ ] iPhone Safari 正常
- [ ] iPad Safari 正常

---

### **Firefox（最新版）：**
- [ ] 桌面端正常
- [ ] 响应式设计正常

---

### **Edge（最新版）：**
- [ ] Windows 桌面端正常

---

## 🔍 SEO 验证

### **结构化数据：**

打开 Chrome DevTools → Console，运行：

```javascript
// 检查 Breadcrumb JSON-LD
const scripts = document.querySelectorAll('script[type="application/ld+json"]');
scripts.forEach(s => console.log(JSON.parse(s.textContent)));
```

**预期输出（示例）：**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://xadyz.com/en"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://xadyz.com/en/products"
    }
  ]
}
```

**检查项：**
- [ ] JSON-LD 存在
- [ ] `@type` 为 "BreadcrumbList"
- [ ] 每个 item 有 position、name、item
- [ ] URL 为完整绝对路径

---

### **Google Rich Results Test：**

访问：https://search.google.com/test/rich-results

测试 URL：
- `https://xadyz.com/en/products/thermal-paper-rolls`
- `https://xadyz.com/ru/applications/government-tenders`

**检查项：**
- [ ] 通过 Rich Results 验证
- [ ] 显示为 "Breadcrumb" 类型
- [ ] 没有错误或警告

---

## 🐛 错误场景测试

### **Test 7.1: 404 页面**
```
URL:  /en/nonexistent-page
预期: 不显示面包屑（或显示 Home only）

检查项：
- [ ] 页面不崩溃
- [ ] 没有 Console 错误
```

---

### **Test 7.2: 没有语言前缀**
```
URL:  /products（缺少 /en）
预期: 重定向或显示 fallback

检查项：
- [ ] 页面不崩溃
- [ ] 面包屑正常（或不显示）
```

---

### **Test 7.3: 大小写敏感**
```
URL:  /EN/PRODUCTS（大写）
预期: 处理正确或重定向

检查项：
- [ ] 不影响面包屑显示
```

---

## 📊 测试报告模板

### **测试环境：**
- 浏览器：Chrome 131.0.6778.139
- 操作系统：macOS Sonoma 14.2
- 屏幕分辨率：1920x1080
- 测试日期：2026-02-03

### **测试结果汇总：**

| 测试项 | 通过 | 失败 | 备注 |
|--------|------|------|------|
| P0 核心产品（5个） | 5 | 0 | ✅ 全部通过 |
| P1 原料供应（4个） | 4 | 0 | ✅ 全部通过 |
| P2 应用场景（7个） | 7 | 0 | ✅ 全部通过 |
| P3 公司信息（5个） | 5 | 0 | ✅ 全部通过 |
| P4 资源中心（5个） | 5 | 0 | ✅ 全部通过 |
| 特殊页面（首页） | 1 | 0 | ✅ 通过 |
| 视觉样式 | ✅ | - | 桌面/移动都正常 |
| 性能加载 | ✅ | - | 无 CLS |
| 跨浏览器 | ✅ | - | Chrome/Safari/Firefox 都正常 |
| SEO 验证 | ✅ | - | JSON-LD 正确 |

### **发现的问题：**

1. **问题描述：** [如果有]
   - 页面：ThermalPaperPage
   - URL：/en/products/thermal-paper-rolls
   - 现象：面包屑被 Hero 覆盖
   - 严重程度：P0（阻塞上线）
   - 解决方案：调整 z-index

2. **问题描述：** [如果有]
   ...

### **测试结论：**

- [ ] ✅ **通过** - 可以上线
- [ ] ⚠️ **有问题但不阻塞** - 可以上线，后续修复
- [ ] ❌ **失败** - 不能上线，需要修复

---

## 🚀 上线前最终检查

### **代码检查：**
- [ ] 所有页面都使用了 PageShell
- [ ] Breadcrumb.tsx 接收 lang 参数
- [ ] 首页使用了 showBreadcrumb={false}
- [ ] 没有 Console 错误或警告
- [ ] TypeScript 编译通过
- [ ] 所有测试用例通过

### **部署检查：**
- [ ] Vercel 构建成功
- [ ] 生产环境访问正常
- [ ] CDN 缓存已清除
- [ ] Sitemap 已更新
- [ ] robots.txt 正常

### **监控准备：**
- [ ] Google Analytics 正常追踪
- [ ] Yandex Metrica 正常
- [ ] 错误监控（Sentry）已配置
- [ ] 性能监控已启用

---

## 📞 问题报告

如果测试中发现问题，请提供：

1. **测试 URL**：完整路径（例如：https://xadyz.com/en/products）
2. **浏览器信息**：Chrome 131.0 / Safari 17.2 等
3. **预期结果**：应该显示什么
4. **实际结果**：实际显示什么（截图更好）
5. **Console 错误**：如果有（F12 打开 Console）
6. **复现步骤**：
   - 打开 /en/products
   - 滚动到面包屑位置
   - 发现被覆盖

**立即处理！** 🚀

---

**最后更新：** 2026-02-03  
**测试版本：** v1.0  
**测试人员：** [待填写]  
**审核人员：** [待填写]
