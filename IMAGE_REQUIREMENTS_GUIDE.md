# 🖼️ 工业 B2B 官网「全站图片清单 & 规范」

**（拍什么 / AI 什么 / 绝对不要什么）**

> 适用你当前整站：
> Home / Products / Categories / Material Supply / Applications / Government & Tenders / Contact

---

## 一、图片总体原则（先记住这 5 条）

```
1️⃣ 工业站图片 = 证据，不是装饰
2️⃣ Hero 可以用 AI，但要"像真工厂"
3️⃣ 产品页优先真图，其次占位
4️⃣ 不出现"销售感 / 消费感"
5️⃣ 宁可没图，也不要假图
```

---

## 二、按页面给你一份「明确清单」

---

## 🏠 Home 页

### ✅ 必须有

**Hero / Banner**

* 类型：工厂 / 生产线 / 设备环境
* 比例：16:9（1920×1080）
* 人：可有（操作机器），但不要摆拍
* 文案：❌ 不叠字

**Why Choose Us**

* 图可选：

  * 生产线
  * 质检
  * 打包 / 装柜
* 也可：纯 icon（完全 OK）

---

### ❌ 不要

* ❌ 电商风产品白底图
* ❌ 卡通 / 插画
* ❌ 写字楼 / 商务会议室假图

---

## 📦 Products（总览页）

### ✅ 建议

* **Category Card**

  * 可用：简单产品实拍 / 卷纸堆叠
  * 或：占位符（完全 OK）

* **Manufacturing Proof**

  * 真图优先（设备 / 车间）

---

### ❌ 不要

* ❌ 产品参数示意图
* ❌ 模型渲染图
* ❌ 手拿产品的"广告照"

---

## 🧾 Category 页（Thermal / Labels / NCR）

### Hero（重点）

* 类型：**生产线 / 分切 / 印刷**
* 不要：单一产品特写
* 可以：AI 工业图（真实风）

### Product Types

* 初期：**占位符完全没问题**
* 后期：补真实产品即可

### Manufacturing / Quality

* ✅ 必须真图（哪怕普通手机拍）

---

## 🧱 Material Supply 页（特别重要）

### Hero

* 类型：

  * Jumbo rolls 仓库
  * 原纸堆垛
* 风格：工业仓储

### Category Cards

* Jumbo / Sheet 只需：

  * 卷状
  * 平张堆叠
* ❌ 不要成品场景

---

## 🧩 Applications 页

### 行业卡片

* 可用：

  * **轻 AI 场景图**（物流 / 超市 / 政府）
* 或：

  * 图标 + 文字（完全 OK）

👉 这是**允许 AI 感最强的一页**

---

## 🏛 Government & Tenders（最敏感）

### Hero（必须稳）

* 类型：

  * 工厂
  * 生产
  * 文档 / 项目感（抽象）
* 氛围：严肃、稳、冷静

### 其他模块

* ❌ 不放客户 Logo
* ❌ 不放国旗
* ❌ 不放"中标截图"

---

## 📞 Contact / Tender Pack

### Contact

* 可以：无图 / 轻背景
* 不重要

### Tender Pack

* 可用：

  * 抽象工业背景
  * 文档 / 线条 / 深色块

---

## 三、AI 图片 vs 真图怎么选（简单判断）

| 场景        | 用什么        |
| --------- | ---------- |
| Hero / 首页 | 真图 > 工业 AI |
| 生产 / 质检   | ✅ 真图       |
| 行业示意      | ✅ AI       |
| 产品细节      | 真图         |
| 装柜 / 托盘   | 真图         |
| 参数 / 技术   | ❌ 不用图      |

---

## 四、绝对禁止清单（请直接贴给 Figma）

```
❌ 不用卡通 / 插画
❌ 不用 Midjourney 风商业图
❌ 不用消费品摄影风
❌ 不用"白背景 + 阴影"
❌ 不用带文字的图片
❌ 不用虚假证书 / Logo
```

---

## 五、Figma 中推荐的图片标注格式（你已经在做，继续）

```
IMAGE PLACEHOLDER
Usage: Hero / Product / Industry
Final image will be provided manually
Do not auto-generate
```

---

## 六、你现在可以很安心的一点（很重要）

> **你现在的网站状态是：
> 结构 100% 正确，图片只是"未完成"，不是"错误"。**

这在工业 B2B 里是**非常成熟、专业的状态**。

---

## 七、技术实现（开发团队参考）

### 使用标准占位符组件

所有图片占位符统一使用 `/src/app/components/ImagePlaceholder.tsx` 组件：

```tsx
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';

// Hero 区域
<ImagePlaceholder 
  type="hero" 
  usage="Factory production line - thermal paper manufacturing"
/>

// 产品图片
<ImagePlaceholder 
  type="product" 
  usage="NCR jumbo rolls warehouse storage"
/>

// 行业场景
<ImagePlaceholder 
  type="industry" 
  usage="Retail POS systems with thermal receipt printer"
/>
```

### 占位符类型说明

- **hero**: 首屏大图，16:9比例
- **product**: 产品图片，1:1比例
- **industry**: 行业应用场景，16:9比例

详细使用说明见 `/IMAGE_PLACEHOLDER_STANDARD.md`

---

## 八、后期图片补充流程

1. **拍摄清单**
   - 按本文档第二部分"按页面清单"准备
   - 优先级：Hero > 生产证据 > 产品细节

2. **图片命名规范**
   ```
   {page}-{section}-{description}.jpg
   例如：
   home-hero-factory-production-line.jpg
   ncr-forms-product-jumbo-rolls.jpg
   ```

3. **替换流程**
   - 将图片放入 `/src/imports/` 目录
   - 替换对应的 ImagePlaceholder 组件
   - 使用 `figma:asset` 或 `@/imports/` 导入

4. **验收标准**
   - ✅ 符合本文档"图片总体原则"
   - ✅ 通过"绝对禁止清单"检查
   - ✅ 图片清晰度 > 1080p
   - ✅ 文件大小 < 500KB（优化后）

---

**文档版本**: v1.0  
**最后更新**: 2026-02-01  
**维护者**: 志信纸业 B2B 网站项目组
