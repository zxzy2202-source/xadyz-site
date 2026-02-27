# ✅ 给 Figma 的任务书：全站 Breadcrumb UI（EN/RU/ZH）

## 1) 目标

在所有非首页页面显示 Breadcrumb（面包屑导航），用于：

* 让用户明确当前位置（尤其俄语市场）
* 增强站内层级感与信任
* 与 URL 结构严格一致（结构化、可维护）

> **注意：这是页面 UI，不是 JSON-LD。**
> 结构必须严格跟 URL，最多 4 层。

---

## 2) 显示范围（哪些页面显示 / 不显示）

### ✅ 必须显示（全站统一）

* `/products` 及其子页面
* `/material-supply` 及其子页面
* `/applications` 及其子页面
* `/manufacturing`
* `/request-tender-pack`
* `/resources` 及其子页面
* `/about`

### ❌ 不显示（或可选不显示）

* 首页 `/en` `/ru` `/zh`：不显示
* Contact 页面：可不显示（如果版面允许也可显示，但默认不做）

---

## 3) 放置位置（唯一推荐）

Breadcrumb 放在：

> **页面 Banner/标题区下面**
> **正文内容上方**
> 左对齐

不要放在 Banner 图上，不要放在侧边栏。

**示例布局：**

```
┌─────────────────────────────────────────┐
│  [Site Header / Navigation]             │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  [Hero Banner / Page Banner]            │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  🍞 Home › Products › Thermal Paper     │ ← Breadcrumb (这里)
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Page Title / H1                        │
│                                         │
│  Main Content...                        │
│                                         │
└─────────────────────────────────────────┘
```

---

## 4) 组件要求（必须做成一个可复用组件）

### 组件名称：

**`Breadcrumb / Default`**

### 组件结构（可伸缩）

```
[🏠 Home] › [Products] › [Thermal Paper] › [Current Page]
   ↑           ↑              ↑                  ↑
 可点击       可点击          可点击            不可点击
```

**层级关系：**
* `Breadcrumb` (Container)
  * `Breadcrumb Item` (Clickable)
  * `Separator` (›)
  * `Breadcrumb Item` (Clickable)
  * `Separator` (›)
  * `Breadcrumb Item` (Clickable)
  * `Separator` (›)
  * `Breadcrumb Item` (Current - Not Clickable)

> **分隔符固定用：`›`**
> 不用 `/`、不用 `>` 图标、不用 `→`。

---

## 5) 视觉设计规范

### **字体与大小**

* 字体大小：`14px` (或 `0.875rem`)
* 字体：使用网站主字体
* 行高：`1.5`

### **颜色方案**

| 状态 | 文字颜色 | 说明 |
|------|---------|------|
| **可点击项 (Default)** | `#6B7280` (灰色) | 次要文字颜色 |
| **可点击项 (Hover)** | `#111827` (深灰/黑) | 主文字颜色 |
| **当前页 (Current)** | `#111827` (深灰/黑) + **Bold** | 强调当前位置 |
| **分隔符** | `#D1D5DB` (浅灰) | 弱化视觉 |

### **间距**

* 项目之间间距：`8px`
* 与上方内容间距：`16px`
* 与下方标题间距：`16px`

### **图标（可选）**

* Home 图标：可使用 `🏠` 或 House 图标（16x16px）
* 如不使用图标，直接显示 "Home" / "Главная" / "首页"

---

## 6) 交互规范（必须）

### **可点击项（非当前页）**

* Default: 灰色文字 `#6B7280`
* Hover: 
  * 颜色变深 `#111827`
  * 可选：添加下划线
  * 鼠标变为 `pointer`
* Active: 轻微变暗（可选）

### **当前页（最后一项）**

* 字体加粗 (`font-weight: 600`)
* 颜色：`#111827`
* 不可点击（鼠标保持 `default`）
* 无 hover 效果

### **分隔符**

* 颜色：`#D1D5DB`
* 无交互
* `aria-hidden="true"` (开发会处理)

---

## 7) 响应式要求

### **桌面端（>768px）**

* 单行显示
* 最多 4 个层级（Home + 3 层）

### **移动端（≤768px）**

* 可换行显示（flex-wrap）
* 保持完整路径
* 字体大小可略小 (`13px`)

---

## 8) 三语命名对照（Figma 不要自己翻译）

> ⚠️ **重要：文案必须来自已有 i18n 映射，Figma 不要改写。**

### **核心导航**

| URL Segment | English | Russian | Chinese |
|------------|---------|---------|---------|
| home | Home | Главная | 首页 |
| products | Products | Продукция | 产品中心 |
| material-supply | Material Supply | Сырьё | 原材料供应 |
| applications | Applications | Отраслевые решения | 应用场景 |
| manufacturing | Manufacturing | Производство | 生产制造 |
| resources | Resources | Ресурсы | 资源中心 |
| about | About | О компании | 关于我们 |

### **产品类别**

| URL Segment | English | Russian | Chinese |
|------------|---------|---------|---------|
| thermal-paper | Thermal Paper | Термобумага | 热敏纸 |
| thermal-paper-rolls | Thermal Paper Rolls | Рулоны термобумаги | 热敏纸卷 |
| blank | Blank Thermal Rolls | Пустые термо рулоны | 空白热敏卷 |
| pre-printed | Pre-Printed Thermal Rolls | Предпечатные термо рулоны | 预印热敏卷 |
| thermal-labels | Thermal Labels | Термоэтикетки | 热敏标签 |
| ncr-paper | NCR Paper | Самокопирующаяся бумага | 无碳纸 |
| ncr-forms | NCR Forms | Бланки NCR | 无碳纸表格 |

### **原材料**

| URL Segment | English | Russian | Chinese |
|------------|---------|---------|---------|
| thermal-jumbo-rolls | Thermal Jumbo Rolls | Термо джамбо-рулоны | 热敏原纸（巨型卷） |
| ncr-jumbo-rolls | NCR Jumbo Rolls | NCR джамбо-рулоны | 无碳原纸（巨型卷） |
| self-adhesive-jumbo-rolls | Self-Adhesive Jumbo Rolls | Самоклеящиеся джамбо-рулоны | 不干胶原纸（巨型卷） |

### **应用场景**

| URL Segment | English | Russian | Chinese |
|------------|---------|---------|---------|
| retail-pos | Retail & POS | Розничная торговля и POS | 零售与POS |
| government-tenders | Government Tenders | Государственные тендеры | 政府投标 |
| logistics-shipping | Logistics & Shipping | Логистика и доставка | 物流与运输 |
| healthcare-labs | Healthcare & Labs | Медицина и лаборатории | 医疗与实验室 |

### **制造与资源**

| URL Segment | English | Russian | Chinese |
|------------|---------|---------|---------|
| facilities | Facilities | Производственные мощности | 生产设施 |
| certifications | Certifications | Сертификация | 认证资质 |
| quality-control | Quality Control | Контроль качества | 质量控制 |
| sustainability | Sustainability | Экологичность | 可持续发展 |
| blog-insights | Blog & Insights | Блог и аналитика | 博客与洞察 |
| case-studies | Case Studies | Кейсы | 案例研究 |
| downloads | Downloads | Загрузки | 下载中心 |

---

## 9) 层级规则（核心，禁止改）

### ✅ 层级必须严格跟 URL（不跳层、不合并、不新增）

**规则：**

* `/{lang}` 为首页
* 之后每一个 URL segment 代表一层
* 最多显示 4 层（含 Home）
* 不能省略中间层级
* 不能自己创造层级

### **正确示例：**

**URL:** `/ru/products/thermal-paper-rolls/blank`

**必须显示：**
```
Главная › Продукция › Рулоны термобумаги › Пустые термо рулоны
```

**URL:** `/en/material-supply/thermal-jumbo-rolls`

**必须显示：**
```
Home › Material Supply › Thermal Jumbo Rolls
```

**URL:** `/zh/applications/retail-pos`

**必须显示：**
```
首页 › 应用场景 › 零售与POS
```

### ❌ 错误示例（不要这样做）：

```
❌ Home > Products (用了错误的分隔符)
❌ Home / Products (用了错误的分隔符)
❌ Products › Thermal Paper Rolls (跳过了 Home)
❌ Home › All Products › Thermal Paper Rolls (新增了不存在的层级)
❌ Home › Thermal Paper (省略了中间层级 Products)
```

---

## 10) 设计交付物（Figma 必须提供）

### **组件结构**

1. **`Breadcrumb / Default`** (主组件)
   * Auto Layout (Horizontal)
   * Flex-wrap enabled
   * Gap: 8px

2. **`Breadcrumb Item / Clickable`** (子组件)
   * States: Default, Hover, Active
   * 包含文字 + 可选图标

3. **`Breadcrumb Item / Current`** (子组件)
   * 加粗样式
   * 无交互状态

4. **`Breadcrumb Separator`** (子组件)
   * 固定内容：`›`
   * 颜色：浅灰

### **示例页面**

提供至少 3 个示例页面：

1. **一级页面** (Home › Products)
2. **二级页面** (Home › Products › Thermal Paper Rolls)
3. **三级页面** (Home › Products › Thermal Paper Rolls › Blank)

### **三种语言版本**

每个示例页面提供 EN / RU / ZH 三个版本

---

## 11) 设计检查清单（Figma 自查）

在交付前，请确认：

- [ ] 组件已创建并命名正确 (`Breadcrumb / Default`)
- [ ] 子组件完整 (Clickable / Current / Separator)
- [ ] 所有交互状态已设计 (Default / Hover / Active)
- [ ] 分隔符使用 `›` (不是其他符号)
- [ ] 颜色符合品牌规范
- [ ] 字体大小为 14px
- [ ] 间距正确 (8px gap)
- [ ] 提供了 3 个示例页面
- [ ] 提供了 EN/RU/ZH 三语言版本
- [ ] 响应式布局已考虑 (flex-wrap)
- [ ] 文案严格使用提供的对照表（未自行翻译）

---

## 12) 开发对接说明（Figma 阅读即可）

> 这部分开发会处理，Figma 了解即可

**技术实现：**
* 组件会自动从 URL 解析路径
* 文案会自动从 i18n 映射获取
* 链接会自动生成

**Figma 只需确保：**
* 视觉设计正确
* 交互状态完整
* 组件结构清晰

---

## 13) 交付时间与沟通

**预计设计时间：** 2-3 小时

**交付物：**
1. Figma 组件库更新
2. 示例页面（3个 × 3语言 = 9个）
3. 设计规范文档（如需要）

**沟通渠道：**
* 如有疑问，请随时联系开发团队
* 不要自行修改文案或层级规则

---

## 14) 参考资料

### **竞品参考（仅供视觉参考）**

* Amazon 面包屑导航
* Alibaba 面包屑导航
* 任何 B2B 网站的面包屑

**注意：** 仅参考视觉样式，层级规则必须严格按本文档。

### **可访问性参考**

* 使用 `<nav aria-label="Breadcrumb">`
* 分隔符使用 `aria-hidden="true"`
* 当前页可使用 `aria-current="page"`

（开发会处理，Figma 了解即可）

---

## 15) 常见问题（FAQ）

### Q: 首页是否显示面包屑？
A: 不显示。首页已经是顶层，无需面包屑。

### Q: 分隔符可以用其他符号吗？
A: 不可以，必须用 `›`。这是统一规范。

### Q: 能否超过 4 层？
A: 不能。系统最多支持 4 层（Home + 3 层）。

### Q: 文案可以自己翻译吗？
A: 不可以。必须使用提供的对照表。

### Q: 移动端如何处理？
A: 可以换行显示，保持完整路径。

### Q: 当前页需要下划线吗？
A: 不需要。当前页不可点击，无需下划线。

---

## ✅ 任务确认

请 Figma 设计师确认：

- [ ] 我已阅读并理解本任务书
- [ ] 我理解层级必须严格跟 URL
- [ ] 我理解文案必须使用提供的对照表
- [ ] 我理解分隔符必须用 `›`
- [ ] 我理解最多 4 层限制
- [ ] 我会在完成后自查检查清单

---

**任务优先级：** 🔴 高

**预计完成时间：** 2-3 小时

**负责人：** [Figma 设计师姓名]

**开发对接人：** [开发负责人姓名]

---

**准备好了就开始吧！有任何问题随时沟通。** 🚀
