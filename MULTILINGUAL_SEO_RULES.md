# 🌐 Zhixin Paper 多语言站点 SEO 规范 | MULTILINGUAL SEO RULES

> **重要声明：本文档是站点 SEO 架构的核心规范**  
> 任何修改内容、添加功能、调整结构的操作，**必须先阅读本文档**  
> 违反规则可能导致 Google/Yandex 排名全面下降

---

## 📐 一、核心架构原则（不可改变）

### 1.1 站点定位

```
EN 站 → 国际制造商（全球市场）
RU 站 → 对俄罗斯/独联体开放的中国制造商
ZH 站 → 中国本土展示（备用）
```

**原则：**
- ✅ 三个语言版本 = 三个独立站点
- ✅ 结构 100% 对齐，内容本地化
- ❌ 绝不互相翻译照搬

---

### 1.2 URL 结构（已锁定，不可修改）

```
/en/  → 英文首页
/ru/  → 俄语首页
/zh/  → 中文首页

/en/thermal-paper-rolls  → 英文产品页
/ru/thermal-paper-rolls  → 俄语产品页（slug 保持英文）
/zh/thermal-paper-rolls  → 中文产品页

/en/manufacturing  → 英文制造页
/ru/manufacturing  → 俄语制造页
/zh/manufacturing  → 中文制造页
```

**为什么 RU 的 slug 也是英文？**
- ✅ 便于技术维护
- ✅ Yandex 不惩罚英文 URL
- ✅ 避免西里尔字符编码问题

---

## 🔴 二、绝对禁止清单（做了直接破坏 SEO）

### 2.1 语言跳转

❌ **禁止根据 IP 自动跳转语言**
```javascript
// ❌ 绝对不要这样做
if (userIP.country === 'RU') {
  redirect('/ru/');
}
```

✅ **正确做法：**
- 用户手动选择语言
- 记住用户选择（localStorage）
- 根路径 `/` 可以跳转到默认语言（如 `/zh/`）

---

### 2.2 Canonical 标签

❌ **禁止 RU 页面 canonical 指向 EN 页面**
```html
<!-- ❌ 这是错的 -->
<link rel="canonical" href="https://zhixin-paper.com/en/" />
```

✅ **正确做法：每个语言的 canonical 指向自己**
```html
<!-- RU 页面 -->
<link rel="canonical" href="https://zhixin-paper.com/ru/" />

<!-- EN 页面 -->
<link rel="canonical" href="https://zhixin-paper.com/en/" />
```

---

### 2.3 HTML lang 属性

❌ **禁止所有页面都是 `<html lang="en">`**

✅ **正确做法：动态设置**
```javascript
// SEO.tsx 已经正确实现
document.documentElement.lang = lang; // 'ru' | 'en' | 'zh'
```

---

### 2.4 内容混写

❌ **禁止在俄语页面中大量使用英文**
```
❌ Мы поставляем thermal paper rolls в Россию
✅ Мы поставляем термобумагу в рулонах в Россию
```

**例外情况（可以用英文）：**
- ✅ 品牌名：Zhixin Paper
- ✅ 技术规格：4×6, A6, POS, ATM
- ✅ 设备名：Zebra, TSC, Honeywell

---

### 2.5 图片 alt 标签

❌ **禁止所有语言版本用同一个英文 alt**
```html
<!-- ❌ RU 页面不要这样 -->
<img alt="Zhixin Paper Manufacturing Factory" />

<!-- ✅ RU 页面应该这样 -->
<img alt="Производство термобумаги — завод Zhixin Paper в Китае" />
```

**规则：**
- EN 页面 → 英文 alt
- RU 页面 → 俄文 alt
- ZH 页面 → 中文 alt

---

### 2.6 hreflang 配置

❌ **禁止缺少 hreflang 或配置错误**

✅ **每个页面必须有：**
```html
<link rel="alternate" hreflang="en" href="https://zhixin-paper.com/en/" />
<link rel="alternate" hreflang="ru" href="https://zhixin-paper.com/ru/" />
<link rel="alternate" hreflang="zh" href="https://zhixin-paper.com/zh/" />
<link rel="alternate" hreflang="x-default" href="https://zhixin-paper.com/zh/" />
```

---

## 🟠 三、强烈不建议清单（会降低信任度）

### 3.1 机器翻译痕迹

🟠 **不建议：直译式俄语**
```
❌ Мы есть профессиональный производитель (英文 "We are" 的直译)
✅ Мы — профессиональный производитель
```

---

### 3.2 营销夸张词

🟠 **不建议在 RU 站使用：**
- ❌ Лучший в мире (世界最好)
- ❌ Самый дешёвый (最便宜)
- ❌ №1 производитель (#1 制造商)

✅ **推荐用词：**
- ✅ Стабильные поставки (稳定供应)
- ✅ Опытный производитель (经验丰富的制造商)
- ✅ Прямые поставки с завода (工厂直供)

---

### 3.3 弹窗和侵入式元素

🟠 **不建议：**
- ❌ 进入网站强制选语言的模态框
- ❌ 自动播放的视频
- ❌ 聊天机器人自动弹出

✅ **推荐：**
- WhatsApp/Telegram 按钮（固定位置，不弹出）
- 语言切换器（顶部导航栏）

---

### 3.4 Footer 内容统一

🟠 **不建议所有语言 Footer 一样**

✅ **正确做法：**
```
EN Footer: "Thermal Paper Manufacturer | Global Supply"
RU Footer: "Производитель термобумаги | Экспорт в Россию и СНГ"
ZH Footer: "热敏纸生产商 | 出口俄罗斯及全球"
```

---

## 🟢 四、必须遵守清单（保持当前优势）

### 4.1 俄语站首段格式（Yandex 最优）

✅ **RU 首页 H1 下第一段必须包含：**
1. производитель / завод（制造商/工厂）
2. 产品名（термобумага / термоэтикетки）
3. Китай（中国）
4. Россия / СНГ（俄罗斯/独联体）
5. 时间信号（с 2006 года）

**当前版本（不要改）：**
```
Zhixin Paper — международный производитель термобумаги, термоэтикеток
и jumbo рулонов с собственным заводом в Китае.
Мы работаем напрямую с дистрибьюторами, импортёрами и переработчиками,
обеспечивая стабильные поставки продукции клиентам в России и странах СНГ.
```

---

### 4.2 Title 格式标准

✅ **格式：**
```
[身份] + [产品] | [差异化]

EN: Thermal Paper & Labels Manufacturer | Factory Direct
RU: Производитель термобумаги и термоэтикеток | Завод в Китае
ZH: 热敏纸及标签生产商 | 志信纸业
```

**长度限制：**
- 总长 ≤ 60 字符（英文）
- 总长 ≤ 30 字符（中俄文）

---

### 4.3 Meta Description 格式

✅ **格式：**
```
[身份] + [产品] + [服务范围] + [GEO 信号]

RU 示例：
Производитель термобумаги, термоэтикеток и jumbo рулонов.
Прямые поставки с завода в Китае.
Работаем с Россией и странами СНГ.
```

**长度：**
- 140-160 字符

---

### 4.4 产品标题格式（Yandex 优化）

✅ **RU 产品页标题格式：**
```
[产品] для [用途] | [制造能力/目标市场]

示例：
- Термобумага для POS | Производство и поставки в Россию
- Термоэтикетки для логистики | Оптовые поставки
- Jumbo рулоны термобумаги | Для переработчиков
```

---

### 4.5 图片命名和 alt 规范

✅ **每张图片必须：**
1. 文件名语义化（hero-manufacturing.jpg）
2. alt 文本使用对应语言
3. alt 包含关键词但不堆砌

**示例：**
```html
<!-- RU 页面 -->
<img 
  src="hero-manufacturing.jpg" 
  alt="Производство термобумаги — завод Zhixin Paper в Китае"
/>

<!-- EN 页面 -->
<img 
  src="hero-manufacturing.jpg" 
  alt="Zhixin Paper thermal paper manufacturing factory in China"
/>
```

---

## 💡 五、未来扩展指南（加新语言时）

### 5.1 添加新语言的标准流程

**示例：添加德语站（DE）**

1️⃣ **创建 URL 结构**
```
/de/  → 德语首页
/de/thermal-paper-rolls  → 产品页
/de/manufacturing  → 制造页
```

2️⃣ **复制 RU 站的结构**
- ✅ 复制页面模块顺序
- ✅ 复制 SEO 信号位置
- ❌ 不要翻译 RU 文案，要重写

3️⃣ **调整 GEO 信号**
```
RU: Работаем с Россией и странами СНГ
DE: Lieferungen nach Deutschland und Europa
```

4️⃣ **更新 hreflang**
```html
<link rel="alternate" hreflang="en" href=".../en/" />
<link rel="alternate" hreflang="ru" href=".../ru/" />
<link rel="alternate" hreflang="de" href=".../de/" />
<link rel="alternate" hreflang="zh" href=".../zh/" />
```

---

### 5.2 新语言首段模板

**结构：**
```
[公司名] — [身份] [产品] [工厂位置].
[服务对象] [合作方式],
[承诺] [目标市场].
```

**RU 示例（参考）：**
```
Zhixin Paper — международный производитель термобумаги, термоэтикеток
и jumbo рулонов с собственным заводом в Китае.
Мы работаем напрямую с дистрибьюторами, импортёрами и переработчиками,
обеспечивая стабильные поставки продукции клиентам в России и странах СНГ.
```

**DE 示例（如果添加）：**
```
Zhixin Paper ist ein erfahrener Hersteller von Thermopapier, Thermoetiketten
und Jumbo-Rollen mit eigener Produktionsstätte in China.
Wir arbeiten direkt mit Distributoren, Importeuren und Verarbeitern zusammen
und gewährleisten zuverlässige Lieferungen für Kunden in Deutschland und Europa.
```

---

## 📊 六、SEO 监控检查清单（每月检查）

### 6.1 技术检查

- [ ] 每个页面的 `<html lang>` 正确
- [ ] 每个页面的 canonical 指向自己
- [ ] hreflang 配置完整且正确
- [ ] 图片 alt 使用对应语言
- [ ] 无自动语言跳转

---

### 6.2 内容检查（RU 站）

- [ ] 首段包含：производитель, Китай, Россия/СНГ
- [ ] Title 含 производитель 或 завод
- [ ] Footer 有 GEO 信号（Экспорт в Россию и СНГ）
- [ ] 产品标题格式正确（产品 | 制造/市场）
- [ ] 无英俄混写（除品牌和技术规格）

---

### 6.3 结构检查

- [ ] EN ↔ RU ↔ ZH 页面模块顺序一致
- [ ] 三个语言版本都有 Manufacturing 页
- [ ] 三个语言版本都有 Quality 页
- [ ] 三个语言版本都有 Packaging & Logistics 页
- [ ] Contact 页突出 WhatsApp/Telegram

---

## 🛡️ 七、权限管理建议

### 7.1 谁可以改什么

**高风险区域（需要 SEO 审核）：**
- Title / Meta Description
- H1 标题
- 首段文案（H1 下第一段）
- Footer GEO 信号
- hreflang 配置
- 图片 alt 标签

**低风险区域（可以直接改）：**
- 产品参数（尺寸、规格）
- 联系方式（电话、邮箱）
- CTA 按钮文案
- 内页详细描述

---

### 7.2 修改审批流程建议

```
1. 提出修改 → 2. 对照本文档 → 3. SEO 审核 → 4. 上线
```

**快速判断：**
- 如果修改涉及本文档中的 ❌ 禁止项 → **立即拒绝**
- 如果修改涉及本文档中的 🟠 不建议项 → **需要充分理由**
- 如果修改涉及本文档中的 ✅ 必须遵守项 → **必须 SEO 审核**

---

## 📚 八、参考资源

### 8.1 Yandex SEO 特点

- 非常重视"身份明确性"（производитель / завод）
- 喜欢"单一主题页面"
- 对"翻译腔"敏感
- 重视 Footer GEO 信号
- 不强制要求俄罗斯本土服务器

### 8.2 Google SEO 特点

- 重视内容深度
- hreflang 配置严格
- 惩罚重复内容
- 移动端优先索引

### 8.3 多语言 SEO 通用原则

- ✅ 结构对齐，内容本地化
- ✅ 每个语言版本都是"完整站点"
- ✅ 不互相抢排名
- ❌ 不机器翻译
- ❌ 不内容重复

---

## ✅ 九、快速自检表（改动前用这个）

**我要修改的内容是：** _________________

**快速检查：**

1. [ ] 我读过本文档的"绝对禁止清单"
2. [ ] 我的修改不涉及 Title/H1/首段
3. [ ] 我的修改不改变 URL 结构
4. [ ] 我的修改不涉及 hreflang/canonical
5. [ ] 如果修改 RU 内容，我没有用英文直译
6. [ ] 如果修改图片，我更新了对应语言的 alt
7. [ ] 我的修改在三个语言版本中保持结构一致

**如果任何一项打 ❌，请先咨询 SEO 负责人。**

---

## 📞 十、联系和更新

**文档维护者：** SEO Team  
**最后更新：** 2025-02-01  
**版本：** v1.0  

**有问题？**
- 🔴 紧急 SEO 问题 → 立即联系 SEO 负责人
- 🟠 不确定能否修改 → 提交审核
- 🟢 确认符合规范 → 可以修改

---

## 🎯 最后一句话

> **这套架构已经是"教科书级别的多语言制造商站点"。**  
> **保持它，不要破坏它。**  
> **Google 和 Yandex 都会奖励稳定、专业、本地化的网站。**

---

**END OF DOCUMENT**
