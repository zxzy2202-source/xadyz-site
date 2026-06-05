# Strapi 配置指南 - 志信纸业

Strapi 自托管 Headless CMS，用于管理素材、线索、博客。数据在本地/自有服务器，可完全掌控。

---

## 一、环境要求

- Node.js 18+
- npm / pnpm / yarn

---

## 二、创建 Strapi 项目

### 1. 初始化项目

建议在项目同目录下创建独立的 Strapi 项目：

```bash
# 进入上级目录
cd e:\BaiduNetdiskDownload

# 创建 Strapi 项目
npx create-strapi-app@latest zhixin-strapi --quickstart
```

`--quickstart` 使用 SQLite，适合本地开发。

若要用 PostgreSQL（生产环境推荐）：

```bash
npx create-strapi-app@latest zhixin-strapi
# 选择 PostgreSQL，填写数据库连接信息
```

### 2. 首次启动

```bash
cd zhixin-strapi
npm run develop
```

浏览器打开：**http://localhost:1337/admin**

### 3. 创建管理员账号

首次访问会要求创建管理员：

- 名字：Admin
- 邮箱：admin@zhixin.com（或任意）
- 密码：自设（至少 8 位）

---

## 三、创建内容类型

在 Strapi 管理后台：左侧 **Content-Type Builder** → **Create new collection type**。

### 1. Asset（素材）

Display name: `Asset`

| Field name | Type      | Options / 说明              |
|------------|-----------|-----------------------------|
| title      | Text      | Short text, Required        |
| media      | Media     | Single type, Allowed types: images, videos, files |
| assetType  | Enumeration | Values: `banner`, `factory`, `product`, `material`, `document` |
| tags       | JSON      | 可选，存标签数组            |
| approved   | Boolean   | Default: false              |
| notes      | Text      | Long text, Optional         |

保存后点击 **Save**，再 **Restart** Strapi。

### 2. Lead（线索）

Display name: `Lead`

| Field name   | Type        | Options              |
|--------------|-------------|----------------------|
| companyName  | Text        | Required             |
| contactName  | Text        |                      |
| email        | Email       | Required             |
| phone        | Text        |                      |
| country      | Text        | Required             |
| leadType     | Enumeration | Values: `tender`, `distributor`, `oem`, `inquiry` |
| status       | Enumeration | Values: `new`, `contacted`, `qualified`, `proposal`, `won`, `lost` |
| leadLevel    | Enumeration | Values: `A`, `B`, `C` |
| productInterest | Text     |                      |
| notes        | Text        | Long text            |

保存并 Restart。

### 3. Post（博客）

Display name: `Post`

| Field name   | Type     | Options                          |
|--------------|----------|----------------------------------|
| title        | Text     | Required                         |
| slug         | UID      | Attached field: title, Required  |
| coverImage   | Media    | Single type, Images              |
| excerpt      | Text     | Long text                        |
| body         | Rich text|                                  |
| publishedAt  | DateTime |                                  |

保存并 Restart。

---

## 四、设置 API 权限

**Settings** → **Users & Permissions** → **Roles**

### Public 角色（前台展示）

- **Asset**：`find`, `findOne`
- **Post**：`find`, `findOne`

### Authenticated 角色（若需要登录后访问）

按需勾选对应接口。

### 注意

- **Lead** 不应对 Public 开放，仅管理员在后台查看
- 素材若需在前台展示，Asset 需允许 `find`、`findOne`

---

## 五、前端 Vite 项目调用 API

### 1. 安装依赖

```bash
cd e:\BaiduNetdiskDownload\Xadyzcom-main\Xadyzcom-main
pnpm add axios
```

### 2. 创建 API 客户端

新建 `src/lib/strapiClient.ts`：

```ts
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

export async function getAssets() {
  const res = await fetch(`${STRAPI_URL}/api/assets?populate=*`)
  const data = await res.json()
  return data.data
}

export async function getAsset(id: string) {
  const res = await fetch(`${STRAPI_URL}/api/assets/${id}?populate=*`)
  const data = await res.json()
  return data.data
}

export async function getLeads() {
  const res = await fetch(`${STRAPI_URL}/api/leads`)
  const data = await res.json()
  return data.data
}

export async function getPosts() {
  const res = await fetch(`${STRAPI_URL}/api/posts?populate=*&sort=publishedAt:desc`)
  const data = await res.json()
  return data.data
}

export async function getPost(slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`)
  const data = await res.json()
  return data.data?.[0] ?? null
}
```

### 3. 环境变量

在 `.env` 或 `.env.local` 中添加：

```
VITE_STRAPI_URL=http://localhost:1337
```

生产环境改为实际 Strapi 地址，例如：

```
VITE_STRAPI_URL=https://cms.zhixin.com
```

---

## 六、Strapi 与前端项目目录结构

```
e:\BaiduNetdiskDownload\
├── Xadyzcom-main\          # 现有 Vite 前端
│   ├── src\
│   ├── package.json
│   └── ...
└── zhixin-strapi\          # Strapi CMS
    ├── config\
    ├── src\
    │   └── api\
    │       ├── asset\
    │       ├── lead\
    │       └── post\
    ├── package.json
    └── ...
```

---

## 七、日常使用流程

### 开发时

1. 启动 Strapi：`cd zhixin-strapi && npm run develop`
2. 启动前端：`cd Xadyzcom-main && pnpm dev`
3. 管理后台：http://localhost:1337/admin
4. 前端：http://localhost:5173

### 生产部署

1. Strapi 部署到服务器（Railway、Render、VPS 等）
2. 使用 PostgreSQL 作为生产数据库
3. 配置环境变量和域名
4. 前端 `VITE_STRAPI_URL` 指向 Strapi 生产地址

---

## 八、常见问题

### Q: 接口 403 Forbidden
A: 检查 Settings → Users & Permissions → Roles 中是否已勾选对应 API 的 `find` / `findOne` 等权限。

### Q: 图片 URL 不完整
A: 使用 `populate=*` 或 `populate=media`，获取媒体完整 URL。Strapi 返回的是相对路径，需拼接 `STRAPI_URL`，例如：`${STRAPI_URL}${item.media.url}`。

### Q: 跨域问题
A: Strapi 默认对常见端口开放 CORS。如需自定义，在 `config/middlewares.ts` 中配置 `cors`。

---

## 九、下一步

1. 按以上步骤创建 Strapi 项目并配置内容类型
2. 在前端用 `strapiClient.ts` 替换原 Supabase 调用
3. 如需，可将现有 `/admin` 入口改为跳转到 Strapi 管理后台

如需要，我可以帮你把现有素材、线索相关页面的 Supabase 调用改成 Strapi API 调用。
