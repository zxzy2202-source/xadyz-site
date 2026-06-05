# 🚀 Sitemap快速操作指南

## 📋 常用命令

### **生成/更新Sitemap**
```bash
# 重新生成所有sitemap文件
npm run sitemap

# 或直接运行
npx tsx scripts/generate-sitemaps.ts
```

### **测试Sitemap**
```bash
# 验证sitemap是否正确
npm run test:sitemap

# 运行所有SEO测试
npm run test:seo
```

### **构建并生成**
```bash
# 构建项目时自动生成sitemap
npm run build
```

---

## 📊 当前Sitemap统计

```
sitemap-en.xml:  60个URL  ✅
sitemap-ru.xml:  60个URL  ✅
sitemap-zh.xml:  59个URL  ✅
━━━━━━━━━━━━━━━━━━━━━━━━━
总计：           179个URL

最后更新：2026-02-05
```

---

## 🔗 访问地址

### **生产环境**
- 主索引：https://xadyz.com/sitemap.xml
- 英文：https://xadyz.com/sitemap-en.xml
- 俄文：https://xadyz.com/sitemap-ru.xml
- 中文：https://xadyz.com/sitemap-zh.xml

### **robots.txt**
- https://xadyz.com/robots.txt

---

## ✏️ 添加新页面

### **步骤1：更新路由树**
编辑 `/src/seo/routeTree.ts`：

```typescript
export const ROUTE_TREE: RouteNode[] = [
  // ... 现有路由
  
  // 添加新路由
  {
    seg: "new-page",
    key: "newPage",
    seo: { 
      changefreq: "weekly", 
      priority: 0.8 
    },
    // 可选：限制语言
    // availableLangs: ["en", "ru"]
  }
];
```

### **步骤2：重新生成Sitemap**
```bash
npm run sitemap
```

### **步骤3：验证**
```bash
# 检查新URL是否在sitemap中
grep "new-page" public/sitemap-en.xml
```

### **步骤4：提交**
```bash
git add src/seo/routeTree.ts public/sitemap*.xml
git commit -m "feat: add new page to sitemap"
git push
```

---

## 🔧 修改页面优先级

### **场景1：提高热门页面优先级**
```typescript
// 从0.8提升到0.9
{
  seg: "thermal-paper-rolls",
  seo: { priority: 0.9 } // 改为0.9
}
```

### **场景2：降低冷门页面优先级**
```typescript
// 从0.7降低到0.5
{
  seg: "packaging-logistics",
  seo: { priority: 0.5 } // 改为0.5
}
```

### **优先级参考**
```
1.0    首页
0.9    核心产品、高转化页面
0.8    重要产品、主要应用
0.7    次要产品、行业方案
0.6    资源内容、公司页面
0.5    辅助内容
```

---

## 🌍 限制页面语言

### **场景：某页面仅EN/RU可用**
```typescript
{
  seg: "government-tenders",
  key: "governmentTenders",
  availableLangs: ["en", "ru"], // ✅ 仅英俄
  seo: { changefreq: "monthly", priority: 0.9 }
}
```

**效果**：
- ✅ sitemap-en.xml：包含此页面
- ✅ sitemap-ru.xml：包含此页面
- ❌ sitemap-zh.xml：自动排除
- ✅ Hreflang：仅链接EN/RU

---

## 📅 定期维护

### **每周任务**
```bash
# 1. 重新生成sitemap（更新lastmod）
npm run sitemap

# 2. 提交更新
git add public/sitemap*.xml
git commit -m "chore: update sitemap lastmod"
git push
```

### **每月任务**
```bash
# 1. 运行SEO测试
npm run test:seo

# 2. 检查搜索引擎索引
# Google: https://search.google.com/search-console
# Yandex: https://webmaster.yandex.com/

# 3. review优先级设置
# 根据流量数据调整routeTree.ts
```

---

## 🐛 常见问题

### **Q1：生成sitemap失败**
```bash
# 检查TypeScript语法
npx tsc --noEmit

# 检查routeTree.ts格式
cat src/seo/routeTree.ts | grep -E "seg:|key:"
```

### **Q2：URL数量不对**
```bash
# 统计实际数量
grep -c "<loc>" public/sitemap-en.xml

# 对比预期
# 应该是：1个首页 + 39个路由 = 40个URL左右
```

### **Q3：某个URL没有出现**
```typescript
// 检查routeTree.ts中是否定义
// 检查availableLangs是否限制了语言
```

### **Q4：Hreflang标签错误**
```bash
# 验证hreflang格式
npm run test:sitemap

# 手动检查
grep "xhtml:link" public/sitemap-en.xml | head -5
```

---

## 📤 提交到搜索引擎

### **Google Search Console**
1. 访问：https://search.google.com/search-console
2. 选择属性：xadyz.com
3. 左侧：索引 > Sitemaps
4. 输入：sitemap.xml
5. 点击：提交

### **Yandex Webmaster**
1. 访问：https://webmaster.yandex.com/
2. 选择：xadyz.com
3. 菜单：索引 > Sitemap文件
4. 添加：https://xadyz.com/sitemap.xml
5. 保存

### **Bing Webmaster Tools**
1. 访问：https://www.bing.com/webmasters
2. 配置 > Sitemaps
3. 提交sitemap URL

---

## 🔍 验证工具

### **在线验证**
- XML Sitemap Validator: https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Hreflang Tag Checker: https://technicalseo.com/tools/hreflang/

### **本地验证**
```bash
# 检查XML格式
xmllint --noout public/sitemap.xml

# 检查URL可访问性
curl -I https://xadyz.com/en/products
# 预期：HTTP/1.1 200 OK
```

---

## 📁 相关文件

```
项目结构：
├── /public/
│   ├── sitemap.xml           主索引
│   ├── sitemap-en.xml        英文sitemap
│   ├── sitemap-ru.xml        俄文sitemap
│   └── sitemap-zh.xml        中文sitemap
│
├── /src/seo/
│   ├── routeTree.ts          路由树定义（SSOT）
│   ├── pageExists.ts         缺页保护逻辑
│   └── canonicalHreflang.ts  Hreflang生成
│
├── /scripts/
│   ├── generate-sitemaps.ts  生成脚本
│   ├── test-sitemap.ts       测试脚本
│   └── update-sitemap.sh     快速更新
│
└── /docs/
    ├── SITEMAP_COMPLETE_REPORT.md   完整报告
    └── SITEMAP_QUICK_GUIDE.md       本文档
```

---

## 🎯 快速检查清单

**部署前检查**：
- [ ] 运行 `npm run sitemap` 生成最新sitemap
- [ ] 运行 `npm run test:seo` 验证无错误
- [ ] 检查所有4个sitemap文件存在
- [ ] 验证lastmod日期为今天
- [ ] 提交到Git并推送

**部署后检查**：
- [ ] 访问 https://xadyz.com/sitemap.xml 确认可访问
- [ ] 抽查3-5个URL确认200 OK
- [ ] 提交sitemap到Google/Yandex
- [ ] 等待24-48小时检查索引状态

---

## 💡 最佳实践

1. **定期更新**：每周重新生成一次sitemap
2. **及时添加**：新页面上线立即加入routeTree.ts
3. **合理优先级**：根据流量和转化率调整priority
4. **语言保护**：使用availableLangs避免404
5. **测试验证**：每次修改后运行test:seo
6. **搜索引擎**：提交后定期检查索引状态

---

## 📞 需要帮助？

**查看完整文档**：
- `/SITEMAP_COMPLETE_REPORT.md` - 详细技术报告

**运行测试**：
```bash
npm run test:seo
```

**检查日志**：
```bash
npm run sitemap 2>&1 | tee sitemap-log.txt
```

---

**最后更新**：2026-02-05  
**维护者**：志信纸业技术团队  
**版本**：v1.0
