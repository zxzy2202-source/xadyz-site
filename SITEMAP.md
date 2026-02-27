# 志信纸业 B2B 网站地图 (Zhixin Paper Sitemap)

## 🌐 语言版本 (Language Versions)
- **English (EN)**: /en/
- **Russian (RU)**: /ru/
- **Chinese (ZH)**: /zh/

---

## 📋 完整网站结构

### 🏠 首页 (Homepage)
```
/ → 自动跳转到 /en/
/en/ - 英文首页
/ru/ - 俄文首页
/zh/ - 中文首页
```

---

## 🗂️ 一级菜单结构

### 1️⃣ **产品 (Products)**
路径: `/{lang}/products`

#### 1.1 热敏纸卷 (Thermal Paper Rolls)
- 概览: `/{lang}/thermal-paper-rolls`
  - 空白热敏纸: `/thermal-paper-rolls/blank`
  - 印刷热敏纸: `/thermal-paper-rolls/printed`
  - POS热敏纸: `/{lang}/pos-thermal-paper`
  - ATM热敏纸: `/{lang}/atm-thermal-paper`
  - 无双酚A热敏纸: `/{lang}/bpa-free-thermal-paper`

#### 1.2 热敏标签 (Thermal Labels)
- 概览: `/{lang}/thermal-labels`
  - 空白标签: `/thermal-labels/blank`
  - 印刷标签: `/thermal-labels/printed`
  - 4x6英寸标签: `/{lang}/thermal-labels-4x6`
  - A6标签: `/{lang}/thermal-labels-a6`
  - 物流标签: `/{lang}/logistics-labels`

#### 1.3 无碳复写纸 (NCR Forms)
- 概览: `/{lang}/ncr-forms`
  - 空白表格: `/ncr-forms/blank`
  - 印刷表格: `/ncr-forms/printed`
  - 连续表格: `/ncr-forms/continuous`

---

### 2️⃣ **原料供应 (Material Supply)**
路径: `/{lang}/material-supply`

- 概览页: `/{lang}/material-supply`
- 热敏大卷纸: `/material-supply/thermal-jumbo-rolls`
- 不干胶大卷纸: `/material-supply/self-adhesive-jumbo-rolls`
- 不干胶片材: `/material-supply/self-adhesive-sheets`
- 无碳复写大卷纸: `/material-supply/ncr-jumbo-rolls`
- 无碳复写片材: `/material-supply/ncr-sheets`

#### URL重定向 (EN/RU only)
```
/material-supply/self-adhesive → /material-supply/self-adhesive-jumbo-rolls
/material-supply/thermal-jumbo → /material-supply/thermal-jumbo-rolls
/material-supply/ncr-jumbo → /material-supply/ncr-jumbo-rolls
/material-supply/ncr → /material-supply/ncr-jumbo-rolls
```

---

### 3️⃣ **应用场景 (Applications)**
路径: `/{lang}/applications`

- 概览页: `/{lang}/applications`
- 零售POS: `/applications/retail-pos`
- 物流仓储: `/applications/logistics-warehousing`
- 超市商超: `/applications/supermarkets`
- 银行金融: `/applications/banking-finance`
- 政府招标: `/applications/government-tenders`
- 医疗健康: `/applications/healthcare`

---

### 4️⃣ **生产制造 (Manufacturing)**
路径: `/{lang}/manufacturing`

- 概览页: `/{lang}/manufacturing`
- 工厂概览: `/manufacturing/factory-overview`
- 生产线: `/manufacturing/production-lines`
- 质量控制: `/manufacturing/quality-control`
- 认证资质: `/manufacturing/certifications`
- OEM定制: `/manufacturing/oem-customization`

#### 旧路径重定向
```
/{lang}/quality → /manufacturing/quality-control
/{lang}/quality-control → /manufacturing/quality-control
/{lang}/packaging-logistics → /resources/packaging-logistics
```

---

### 5️⃣ **资源中心 (Resources)**
路径: `/{lang}/resources`

- 资源中心首页: `/{lang}/resources`
- 博客与洞察: `/resources/blog-insights`
- 包装物流: `/resources/packaging-logistics` (复用ProductionPage)
- 工具与计算器: `/resources/tools-calculators`
- 常见问题: `/resources/faqs`

**注意**: `/resources/oem-customization` 已移至 Manufacturing 菜单

---

### 6️⃣ **公司 (Company)**

- 关于我们: `/{lang}/about`
- 联系我们: `/{lang}/contact`
- 招标资料包: `/{lang}/request-tender-pack`

#### 特殊重定向
```
/contact → /en/contact (无语言前缀快速访问)
```

---

## 🔐 后台管理系统 (Admin Panel)

### 管理路由
```
/admin/login - 登录页
/admin - 仪表盘 (Dashboard)
/admin/leads - 线索列表
/admin/leads/:id - 线索详情
/admin/assets - 素材库
/admin/placeholders - 占位符追踪
```

### 权限保护
所有 `/admin/*` 路由（除登录页）都需要身份验证

---

## 📊 页面统计

### 按语言统计
- **English (EN)**: 50+ 页面
- **Russian (RU)**: 50+ 页面
- **Chinese (ZH)**: 50+ 页面

### 按类型统计
- **产品页面**: 27页 (9页 × 3语言)
- **原料供应**: 18页 (6页 × 3语言)
- **应用场景**: 21页 (7页 × 3语言)
- **生产制造**: 18页 (6页 × 3语言)
- **资源中心**: 15页 (5页 × 3语言)
- **公司页面**: 9页 (3页 × 3语言)
- **管理后台**: 5页

**总计**: 约 **160+ 页面** (含前台和后台)

---

## 🔍 SEO优化要点

### URL结构特点
✅ **语言前缀明确**: 每个URL都以 /en/ /ru/ /zh/ 开头  
✅ **语义化路径**: 使用易读的英文单词连接  
✅ **层级清晰**: 最多3级深度 (如 /en/material-supply/thermal-jumbo-rolls)  
✅ **一致性**: 三种语言共享相同的URL结构  

### 重定向策略
- 根路径 `/` 自动跳转到 `/en/`
- 旧路径自动重定向到新结构
- 保持URL简洁和SEO友好

---

## 📱 面包屑导航

所有Resources子页面已配置面包屑导航：
- 首页 > 资源 > 具体页面
- 三语言支持 (EN/RU/ZH)
- 白色文字叠加在21:9 Banner图片上

---

## 🎨 设计系统

### 统一元素
- **21:9全屏Hero Banner**: 所有主要页面
- **渐变遮罩**: 从黑色70%到透明
- **ImagePlaceholder组件**: 统一占位图显示
- **蓝色主题**: 品牌色贯穿全站
- **响应式设计**: 支持桌面和移动端

### 典型页面结构
```
Header (导航栏)
  ↓
Hero Banner (21:9全屏 + 面包屑)
  ↓
内容区域
  ↓
CTA区域
  ↓
Footer (页脚)
```

---

## 🚀 技术架构

### 前端
- **框架**: React + TypeScript
- **路由**: React Router v6
- **样式**: Tailwind CSS v4
- **构建**: Vite
- **部署**: Vercel
- **域名**: xadyz.com

### 后端
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **存储**: Supabase Storage
- **KV存储**: kv_store_3ec00036 表

### SEO配置
- **Sitemap结构**: 分割式多语言sitemap
  - 主索引: `/sitemap.xml`
  - 英文页面: `/sitemap-en.xml` (50个URL)
  - 俄文页面: `/sitemap-ru.xml` (50个URL)
  - 中文页面: `/sitemap-zh.xml` (50个URL)
- **Robots.txt**: `/robots.txt` (已配置Yandex优化)
- **Hreflang标签**: 每个URL都包含三语言互链
- **更新日期**: 2026-02-03

---

## 📈 下一步优化建议

1. **SEO提交** (⚡ 优先!)
   - [ ] 提交sitemap到Google Search Console
   - [ ] 提交sitemap到Yandex Webmaster (重点!)
   - [ ] 提交sitemap到Bing Webmaster Tools
   - [ ] 验证robots.txt配置
   - [ ] 检查hreflang标签实现

2. **内容补充**
   - [ ] 添加博客文章内容
   - [ ] 完善产品详细规格
   - [ ] 上传真实产品图片

3. **功能增强**
   - [ ] 实现在线询价功能
   - [ ] 添加产品对比功能
   - [ ] 集成在线聊天支持

4. **SEO提升**
   - [ ] 生成sitemap.xml
   - [ ] 配置robots.txt
   - [ ] 添加结构化数据 (Schema.org)
   - [ ] 优化Yandex Metrica集成

5. **性能优化**
   - [ ] 图片懒加载
   - [ ] 代码分割
   - [ ] CDN加速

---

## 📝 维护日志

**最近更新**: 2026-02-03
- ✅ 完成全站21:9 Hero Banner升级
- ✅ Resources页面Banner高度统一 (h-[42.857vw])
- ✅ 面包屑导航添加到Resources子页面
- ✅ 三语言翻译表更新完成

---

**文档版本**: v1.0  
**最后更新**: 2026年2月3日  
**维护者**: Make AI Assistant