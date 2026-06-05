# Strapi 前端集成说明

本文档说明如何在志信纸业前端项目中接入 Strapi Headless CMS。

## 环境变量

在项目根目录创建 `.env` 或 `.env.local`，添加：

```env
VITE_STRAPI_URL=http://localhost:1337
```

- **本地开发**：Strapi 默认运行在 `http://localhost:1337`
- **生产环境**：替换为 Strapi 生产地址，例如 `https://cms.example.com`

未配置时，博客页将使用静态内容，API 调用静默返回空数据。

## 已实现功能

### 1. Strapi API 客户端 (`src/app/lib/strapiClient.ts`)

- `fetchStrapiPosts()`：获取已发布博客文章列表
- `fetchStrapiPostBySlug(slug)`：根据 slug 获取单篇文章
- `fetchStrapiAssets()`：获取已批准素材（可按 assetType 筛选）
- `fetchStrapiBannerMap()`：获取 banner 类型素材 URL 映射
- `blocksToHtml()`：将 Strapi Blocks 富文本转为 HTML

### 2. 博客洞察页 (`/en/resources/blog-insights`)

- 自动从 Strapi 拉取已发布文章
- 第一篇作为精选文章，其余展示在文章网格
- 无 Strapi 数据时降级为静态内容

### 3. 博客文章详情页 (`/en/resources/blog-insights/:slug`)

- 根据 slug 展示单篇文章
- 支持封面图、摘要、富文本正文（Blocks 格式）
- 404 时显示友好提示并返回博客列表

### 4. 后台跳转

- 管理后台侧栏新增 **CMS 管理 (Strapi)** 链接
- 新标签页打开 Strapi 管理端（`{VITE_STRAPI_URL}/admin`）

## Strapi 权限

确保在 Strapi 中为 **Public** 角色配置：

- **Asset**：`find`、`findOne`（仅读取已批准素材）
- **Post**：`find`、`findOne`（仅读取已发布文章）
- **Lead**：一般不对外开放，由后台或表单提交时使用

## 路由示例

| 路径 | 说明 |
|------|------|
| `/en/resources/blog-insights` | 博客列表（英） |
| `/zh/resources/blog-insights` | 博客列表（中） |
| `/en/resources/blog-insights/my-post-slug` | 文章详情 |

## 后续可扩展

- 在 `bannerConfig` 中接入 `fetchStrapiBannerMap()` 以使用 Strapi 素材作为页面 Banner
- 线索表单提交到 Strapi Lead（需配置 Lead `create` 权限及 API Token）
- 为 Post 增加多语言字段，按 `lang` 筛选展示
