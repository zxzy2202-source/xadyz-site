# 图片素材规范 - 志信纸业官网

## 全站统一规则

### A. 每页默认 3 个图片区块
- **Hero 背景图**（1 张）
- **内容证明图 / 过程图**（2–4 张）
- **底部信任图（可选）**：装柜/包装/证书（1 张）

### B. 命名规则
`{page}-{topic}-{scene}.webp`

示例：
- `home-hero-factory-line.webp`
- `manufacturing-quality-lab.webp`
- `products-thermal-rolls-packaging.webp`

### C. Alt 文本规则（只写事实，不写营销）
✅ "Thermal paper slitting and rewinding production line"
❌ "Best thermal paper supplier in China"

---

## 格式与尺寸

| 用途 | 格式 | 尺寸建议 | 文件大小 |
|------|------|----------|----------|
| Hero 大图 | WebP / JPG | 1920×800 或 1920×1080 | 200–500KB |
| 内容图 | WebP / JPG | 1200×800 或 1600×900 | 150–400KB |
| 卡片/缩略图 | WebP / JPG | 800×600 | 100–300KB |

---

## 使用方法

1. 将图片放入 `public/images/`，按 `{page}-{topic}-{scene}.webp` 命名
2. 代码引用：`/images/home-hero-factory-line.webp`
3. 或通过 `getPageAssetsForPath(pathname)` 从 `src/app/lib/pageAssetsSpec.ts` 获取

---

## 优先实施顺序

1. **Home / Products / Manufacturing / Contact** — 打通信任链
2. **三大类目页**：thermal rolls / labels / ncr
3. **Applications** — 可先用占位图，后续换真实图

> 完整逐页清单见项目根目录 `组件-素材对照表.md`
