# Headless CMS 配置指南 - 志信纸业

使用 Headless CMS 替代当前 Supabase 后台，实现 **素材管理**、**博客管理**、**线索管理**，无需处理数据库 schema 兼容问题。

---

## 一、选择哪个 CMS？

| CMS | 类型 | 优点 | 适合场景 |
|-----|------|------|----------|
| **Strapi** | 自托管 | 免费、数据在自己服务器、媒体库完善 | 需要完全掌控数据 |
| **Sanity** | 云端托管 | 免部署、免费额度大、上手快 | 快速上线、不想自建服务 |
| **Payload** | 自托管 | TypeScript、现代化 | 偏技术团队 |

**推荐：**
- 想快速上线 → 用 **Sanity**（约 30 分钟可跑通）
- 必须自托管 → 用 **Strapi**

---

## 二、方案 A：Sanity（推荐先试）

### 1. 注册并创建项目

1. 打开 https://www.sanity.io/
2. 注册账号
3. 创建新项目（Create new project），如：`zhixin-cms`

### 2. 安装 Sanity CLI 和初始化

```bash
# 在项目根目录外，或新建一个 cms 目录
mkdir zhixin-cms && cd zhixin-cms

# 安装 Sanity
npm create sanity@latest -- --project-id 你的项目ID --dataset production

# 或直接用引导
npm create sanity@latest
```

按提示选择：
- Project: 选择刚创建的 zhixin-cms
- Dataset: production
- Output path: ./
- Schema: Clean project with no predefined schemas

### 3. 定义内容模型（schema）

在 `sanity.config.ts` 同级的 `schemas` 目录创建：

**schemas/asset.ts**（素材）
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'asset',
  title: '素材',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: '图片/文件',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'assetType',
      title: '类型',
      type: 'string',
      options: {
        list: [
          { title: '横幅', value: 'banner' },
          { title: '工厂', value: 'factory' },
          { title: '产品', value: 'product' },
          { title: '文档', value: 'document' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: '标签',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'approved',
      title: '已批准',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
```

**schemas/lead.ts**（线索）
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'lead',
  title: '线索',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: '公司名称', type: 'string' }),
    defineField({ name: 'contactName', title: '联系人', type: 'string' }),
    defineField({ name: 'email', title: '邮箱', type: 'string' }),
    defineField({ name: 'phone', title: '电话', type: 'string' }),
    defineField({ name: 'country', title: '国家', type: 'string' }),
    defineField({
      name: 'status',
      title: '状态',
      type: 'string',
      options: {
        list: ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'],
      },
    }),
  ],
})
```

**schemas/post.ts**（博客）
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: '博客文章',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '标题', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'coverImage', title: '封面图', type: 'image' }),
    defineField({ name: 'excerpt', title: '摘要', type: 'text' }),
    defineField({ name: 'body', title: '正文', type: 'blockContent' }),
    defineField({ name: 'publishedAt', title: '发布时间', type: 'datetime' }),
  ],
})
```

在 `schemas/index.ts` 中导出：
```ts
import asset from './asset'
import lead from './lead'
import post from './post'

export const schemaTypes = [asset, lead, post]
```

### 4. 启动 Sanity Studio

```bash
cd zhixin-cms
npm run dev
```

浏览器打开 http://localhost:3333 即可管理素材、线索、博客。

### 5. 在 Vite 前端中获取数据

```bash
# 在志信纸业项目根目录
pnpm add @sanity/client
```

创建 `src/lib/sanityClient.ts`：
```ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '你的项目ID',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// 获取素材列表
export async function getAssets() {
  return sanityClient.fetch(`*[_type == "asset"]{ _id, title, assetType, "imageUrl": image.asset->url }`)
}

// 获取线索列表
export async function getLeads() {
  return sanityClient.fetch(`*[_type == "lead"]`)
}
```

---

## 三、方案 B：Strapi（自托管）

### 1. 创建 Strapi 项目

```bash
# 在项目外或 monorepo 中
npx create-strapi-app@latest zhixin-strapi --quickstart
```

会启动 SQLite + 管理后台（默认 http://localhost:1337/admin）。

### 2. 首次访问创建管理员账号

打开 http://localhost:1337/admin，按提示创建管理员。

### 3. 创建内容类型

在 Strapi 管理后台：

**Content-Type Builder → Create new collection type**

1. **Asset（素材）**
   - title (Text)
   - media (Media，单图或多图)
   - assetType (Enumeration: banner, factory, product, document)
   - tags (JSON 或 Relation)
   - approved (Boolean)

2. **Lead（线索）**
   - companyName, contactName, email, phone, country (Text)
   - status (Enumeration)

3. **Post（博客）**
   - title, slug (Text)
   - coverImage (Media)
   - body (Rich text)
   - publishedAt (DateTime)

保存后重启 Strapi。

### 4. 设置权限

Settings → Users & Permissions → Roles → Public：
- Asset: find, findOne
- Post: find, findOne
- Lead: 不建议对 Public 开放，仅后台查看

### 5. 在 Vite 前端调用

```bash
pnpm add axios  # 或使用 fetch
```

```ts
const API = 'http://localhost:1337/api'

export async function getAssets() {
  const res = await fetch(`${API}/assets?populate=*`)
  return res.json()
}
```

---

## 四、与现有后台的关系

| 功能 | 当前（Supabase） | 切换后（Headless CMS） |
|------|------------------|------------------------|
| 素材管理 | /admin/assets | Sanity Studio 或 Strapi 媒体库 |
| 线索管理 | /admin/leads | CMS 中的 Lead 内容类型 |
| 博客管理 | 无 | CMS 中的 Post 内容类型 |
| 占位符绑定 | /admin/placeholders | 在 CMS 素材上增加 placeholderKey 等字段 |

**建议步骤：**
1. 先搭建 Sanity 或 Strapi，确认可以录入素材、线索、博客
2. 修改前端：把原来调用 Supabase 的接口改为调用 CMS API
3. 可选：保留 `/admin` 入口，仅做跳转到 Sanity Studio / Strapi 管理后台的链接

---

## 五、部署

### Sanity
- Studio 托管在 sanity.io，无需单独部署
- 前端部署到 Vercel/其它平台，通过 API 拉取数据

### Strapi
- 需部署到服务器（Railway、Render、自有 VPS 等）
- 数据库可改用 PostgreSQL（生产环境推荐）

---

## 六、下一步

1. 选定 Sanity 或 Strapi
2. 按上面步骤完成本地配置
3. 如需，我可以帮你：
   - 写具体 schema 文件
   - 把现有 `/admin` 页面改成调用 CMS API 的实现

确定要用的方案后告诉我即可。
