# ✅ 面包屑 UI - 简化版任务书（可直接执行）

## 🎯 一句话版本（最短指令）

> **Please design a reusable Breadcrumb component (EN/RU/ZH) and place it in the shared Layout right under the H1/title block and above the content area. It must strictly follow URL hierarchy (max 4 levels) and use `›` separator. Only the last item is not clickable. Must support Russian long text and wrap on mobile.**

---

## 📍 Layout 插入位置规范（强约束版）

### **1) 统一 Layout 的推荐结构**

你们的 Layout 通常长这样（命名不重要，结构重要）：

```
Layout
 ├─ TopNav / Header           (顶部导航)
 ├─ PageHero                  (页面标题区：H1 / 简介 / CTA)
 ├─ PageBody                  (正文内容：模块、表格、图片等)
 └─ Footer                    (页脚)
```

### **✅ Breadcrumb 应插入的位置（唯一标准）**

> **放在 PageHero 结束和 PageBody 开始之间**
> 也就是：**H1 下方、正文上方**

**示意：**

```tsx
<Layout>
  <TopNav />
  
  <PageHero>
    <H1>Thermal Paper Rolls</H1>
    <Subtitle>High-quality thermal paper for POS, ATM...</Subtitle>
    <CTA />
  </PageHero>

  {/* ✅ Breadcrumb 插入这里（紧贴标题区的下沿）*/}
  <Breadcrumb />

  <PageBody>
    <Section>...</Section>
    <Section>...</Section>
  </PageBody>

  <Footer />
</Layout>
```

### **❌ 禁止位置**

| 位置 | 为什么不行 |
|------|-----------|
| Banner 图片里 | 会遮挡、响应式难做 |
| 顶部导航里 | 会太挤、影响主导航 |
| 侧边栏 | B2B 页面不一定有侧栏，且不符合习惯 |
| 页面底部 | 没意义，用户看不到 |
| 正文中间 | 破坏内容流 |

---

## 🎨 Figma 组件拆分（必须按这个出稿）

### **2) 组件列表（全站复用）**

Figma 交付至少包含 **4 个组件**：

#### **A) `Breadcrumb / Default`（主组件）**

**功能：**
- Auto Layout（水平 + wrap）
- 支持 2～4 层
- 适配移动端换行

**结构：**
```
[Breadcrumb / Default]
  ├─ [Breadcrumb / Item-Link]
  ├─ [Breadcrumb / Separator]
  ├─ [Breadcrumb / Item-Link]
  ├─ [Breadcrumb / Separator]
  ├─ [Breadcrumb / Item-Link]
  ├─ [Breadcrumb / Separator]
  └─ [Breadcrumb / Item-Current]
```

**关键属性：**
- Display: Flex
- Direction: Horizontal
- Wrap: Wrap
- Gap: 8px
- Align: Center

---

#### **B) `Breadcrumb / Item-Link`（可点击项）**

**功能：**
- 可点击项（非当前页）
- 有 Hover 状态

**States：**
1. **Default** - 灰色，次要文字
2. **Hover** - 深色，可选下划线

**样式：**
```
Font Size: 14px
Color (Default): #6B7280
Color (Hover): #111827
Text Decoration (Hover): underline (可选)
Cursor: pointer
```

---

#### **C) `Breadcrumb / Item-Current`（当前页）**

**功能：**
- 当前页项（最后一项）
- 不可点击、视觉更强

**States：**
- 只有 Default（无 Hover）

**样式：**
```
Font Size: 14px
Font Weight: 600 (Semibold)
Color: #111827
Cursor: default
```

---

#### **D) `Breadcrumb / Separator`（分隔符）**

**功能：**
- 固定字符：`›`
- 垂直居中对齐

**样式：**
```
Content: ›
Font Size: 14px
Color: #D1D5DB (浅灰)
Cursor: default
aria-hidden: true (开发会处理)
```

---

## 🎨 字体与视觉建议（B2B 工厂站最稳）

### **3) 推荐规格（可调整）**

| 属性 | 桌面端 | 移动端 |
|------|--------|--------|
| **字号** | 13–14px | 12–13px |
| **行高** | 18–20px | 18–20px |
| **Link 颜色** | #6B7280 (灰) | 同左 |
| **Current 颜色** | #111827 (深) | 同左 |
| **Separator 颜色** | #D1D5DB (浅灰) | 同左 |

### **间距规范**

```
距上方 H1/简介区底部: 8–12px
距下方正文开始: 10–16px
```

### **设计原则**

> **关键：Breadcrumb 应该"看得到但不抢主标题"**

- ✅ 不要太大（不抢 H1）
- ✅ 不要太小（看不清）
- ✅ 不要太花（保持简洁）
- ✅ 不要太跳（融入整体设计）

---

## 🌍 三语适配（俄语容易爆长度）

### **4) Figma 必须考虑俄语长词/长句**

**要求：**

- ✅ Breadcrumb 必须支持换行（wrap）
- ✅ 每个 item 不要限制死宽度
- ✅ 最后一项可以允许省略（可选）：
  - 桌面：不省略
  - 移动：超过一行时允许 `…`

**示例（俄语最长的情况）：**

```
桌面端（不省略）:
Главная › Производство › Самокопирующаяся бумага › 
Производственные мощности

移动端（可省略）:
Главная › Производство › 
Самокопирующаяся... › Произ...
```

> **如果你们不想做省略，也行，但至少要 wrap（换行）。**

---

## 💻 开发对接规范（Figma Make 也能照做）

### **5) 页面逻辑（开发严格按 URL 解析）**

你们是 `/{lang}/...` 结构，规则如下：

#### **A) 首页不显示**

```
URL: /en  /ru  /zh
Breadcrumb: null (不显示)
```

#### **B) 非首页显示**

```
规则:
├─ 第一项：Home（对应语言）
├─ 后续：按 URL segment 逐级拼接链接
└─ 最后一项：当前页（不可点击）

示例:
URL: /ru/products/thermal-paper-rolls/blank

生成:
├─ Главная → /ru
├─ Продукция → /ru/products
├─ Рулоны термобумаги → /ru/products/thermal-paper-rolls
└─ Пустые термо рулоны (不可点击)
```

---

## 🔧 给开发的"插入指令"（精准到代码结构）

### **英文版（可直接发给 Figma Make）：**

```
Insert Breadcrumb component in the shared Layout, 
directly under the page title block (H1 area), 
and above the page main content container.

Breadcrumb items must be generated from URL path segments 
and translated via existing `CRUMB_I18N` mapping.

Max depth: 4 levels (Home + up to 3).
Separator: `›`.
Only the last breadcrumb item is not clickable.
```

### **中文版（给中国开发团队）：**

```
在统一 Layout 中插入 Breadcrumb 组件，
位置：页面标题区（H1）下方，正文内容上方。

面包屑项目从 URL 路径自动生成，
翻译使用现有的 CRUMB_I18N 映射。

最多 4 层（Home + 最多 3 层）。
分隔符：`›`。
只有最后一项不可点击。
```

### **代码示例：**

```tsx
// Layout.tsx
export function Layout({ children }) {
  return (
    <div>
      <Header />
      
      <main>
        <HeroSection>
          <h1>{pageTitle}</h1>
          <p>{pageSubtitle}</p>
        </HeroSection>

        {/* ✅ 在这里插入 */}
        <Breadcrumb />

        <div className="content">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

---

## ✅ 验收清单（10 条直接检查）

### **位置类（3 条）**

- [ ] **1. Breadcrumb 在 H1 下方、正文上方**
- [ ] **2. 不在 Banner 图层上**
- [ ] **3. 左对齐**

### **行为类（3 条）**

- [ ] **4. 非首页显示；首页不显示**
- [ ] **5. 除最后一项外都可点击**
- [ ] **6. 点击后 URL 回到上一层**

### **结构类（3 条）**

按你实际页面测试：

- [ ] **7. `/ru/products/thermal-paper-rolls/blank`**
  ```
  必须显示：Главная › Продукция › Рулоны термобумаги › Пустые термо рулоны
  ```

- [ ] **8. `/en/material-supply/thermal-jumbo-rolls`**
  ```
  必须显示：Home › Material Supply › Thermal Jumbo Rolls
  ```

- [ ] **9. `/zh/applications/government-tenders`**
  ```
  必须显示：首页 › 应用场景 › 政府投标
  ```

### **响应式类（1 条）**

- [ ] **10. 手机端可换行，不溢出**

---

## 📐 视觉验收标���

### **桌面端（>768px）**

```
✅ 单行显示（如果长度允许）
✅ 字体大小 14px
✅ 与标题间距 8-12px
✅ 与内容间距 10-16px
✅ 分隔符 ›
✅ Hover 有反馈
```

### **移动端（≤768px）**

```
✅ 可换行显示
✅ 字体大小 13px
✅ 保持完整路径（或省略）
✅ 点击区域足够大（44x44px）
```

---

## 🎯 三语言测试 URLs

### **English**

```
/en/products
/en/products/thermal-paper-rolls
/en/products/thermal-paper-rolls/blank
/en/material-supply/thermal-jumbo-rolls
/en/applications/retail-pos
```

### **Russian**

```
/ru/products
/ru/products/thermal-paper-rolls
/ru/material-supply/thermal-jumbo-rolls
/ru/applications/government-tenders
```

### **Chinese**

```
/zh/products
/zh/products/thermal-paper-rolls/blank
/zh/material-supply
/zh/applications
```

---

## 📦 Figma 交付物清单

### **最少交付：**

- [ ] `Breadcrumb / Default` 主组件
- [ ] `Breadcrumb / Item-Link` 子组件（Default + Hover）
- [ ] `Breadcrumb / Item-Current` 子组件
- [ ] `Breadcrumb / Separator` 子组件
- [ ] 3 个示例页面（一级、二级、三级）
- [ ] EN/RU/ZH 三语言版本

### **建议交付：**

- [ ] 组件使用说明（Figma 注释）
- [ ] 响应式变体（Desktop / Mobile）
- [ ] 主题变体（Light / Dark，如果网站有）

---

## 🚀 开发集成检查清单

### **代码层面**

- [ ] 组件已正确导入
- [ ] 已添加到统一 Layout 中
- [ ] 位置正确（H1 下方、内容上方）
- [ ] 样式已根据 Figma 调整
- [ ] 测试通过 (`npm run test:breadcrumb-ui`)

### **功能层面**

- [ ] 首页不显示
- [ ] 非首页正确显示
- [ ] 链接可点击且正确
- [ ] 三语言都正常工作
- [ ] 最多 4 层

### **视觉层面**

- [ ] 与 Figma 设计一致
- [ ] 字体、颜色、间距正确
- [ ] Hover 状态正确
- [ ] 响应式正常

---

## 📞 快速问答

### **Q: 首页要不要显示？**
A: 不要。首页已经是顶层，无需面包屑。

### **Q: 分隔符可以改吗？**
A: 不行，必须用 `›`。这是统一规范。

### **Q: 能否超过 4 层？**
A: 不能。系统最多支持 4 层（Home + 3 层），这是 SEO 最佳实践。

### **Q: 俄语长文本怎么办？**
A: 允许换行（wrap）。桌面端不省略，移动端可选省略。

### **Q: Home 要不要图标？**
A: 可选。可以用 🏠 或 House 图标，也可以纯文字。

### **Q: 当前页要不要下划线？**
A: 不要。当前页不可点击，无需下划线。

---

## 🎊 总结

### **给 Figma 设计师：**

```
1. 阅读本文档
2. 创建 4 个组件
3. 设计 3 个示例页面
4. 提供 EN/RU/ZH 版本
5. 交付给开发

预计时间：2-3 小时
```

### **给前端开发：**

```
1. 等待 Figma 设计完成
2. 在 Layout 中添加 <Breadcrumb />
3. 根据设计调整样式
4. 运行测试验证
5. 部署上线

预计时间：30-60 分钟
```

### **核心原则：**

> **H1 下方、正文上方、最多 4 层、分隔符 `›`、最后一项不可点击**

---

**准备好了？开始吧！** 🚀

**有问题？查看完整文档：**
- [FIGMA_BREADCRUMB_TASK.md](/FIGMA_BREADCRUMB_TASK.md) - 详细版
- [DEV_BREADCRUMB_INTEGRATION.md](/DEV_BREADCRUMB_INTEGRATION.md) - 开发指南
- [BREADCRUMB_DELIVERY_PACKAGE.md](/BREADCRUMB_DELIVERY_PACKAGE.md) - 交付包
