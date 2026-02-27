# 后台优化总结

## 1. 页面-素材对应关系

### 新增功能
- **页面路径**：`/admin/page-assets`
- **说明**：展示各页面与 Hero Banner 的映射，便于在占位符中绑定素材

### 使用流程
1. 在「素材库」上传并批准素材
2. 在「占位符」中按 `page_path` 或 `placeholder_pattern` 搜索
3. 点击「绑定」选择已批准的素材
4. 执行 `sql/08-public-placeholder-assets.sql` 后，前台可读取已绑定的图片 URL（需前端接入）

### 配置文件
- `src/app/lib/pageBannerMap.ts`：页面路径 ↔ Banner Key ↔ 占位符 Pattern 映射

---

## 2. 博客后台

### 新增功能
- **页面路径**：`/admin/blog`
- **说明**：博客内容在 Strapi CMS 中管理，此处提供入口与已发布文章数量概览
- **操作**：点击「打开 Strapi」在新标签页进入 Strapi 管理后台

### 前置条件
- 配置 `VITE_STRAPI_URL=http://localhost:1337`
- 启动 Strapi 服务：`cd zhixin-strapi && pnpm develop`

### Strapi 内容类型
- **Post**：博客文章（标题、摘要、正文、封面图）
- **Asset**：素材
- **Lead**：线索（可选）

---

## 3. 线索后台

### 修复内容
- **表名**：`lead_activity` → `lead_activities`
- **活动记录**：使用 `user_id` 替代 `created_by`，与 `lead_activities` 表结构一致
- **线索文件**：`uploaded_by` 使用 `user_id`（UUID），`file_size` 替代 `file_type`

### 已有功能
- 按类型、级别、状态、国家筛选
- 状态、级别快速更新
- 线索详情页（备注、文件上传、活动记录）

---

## 4. 侧栏导航更新

| 入口   | 路径                 |
|--------|----------------------|
| 控制台 | /admin               |
| 线索管理 | /admin/leads       |
| 素材库 | /admin/assets        |
| 占位符 | /admin/placeholders  |
| 证据标签 | /admin/assets/evidence-tags |
| **页面素材对应** | /admin/page-assets |
| **博客管理** | /admin/blog       |
| CMS 管理 (Strapi) | 外部链接        |

---

## 5. 数据库脚本

| 脚本 | 用途 |
|------|------|
| `sql/05-fix-missing-columns.sql` | 补充 leads.lead_type、assets.type、evidence_tags 等 |
| `sql/06-fix-storage-upload-rls.sql` | 放宽 Storage 上传策略 |
| `sql/07-add-assets-notes.sql` | 添加 assets.notes、usage_pages |
| `sql/08-public-placeholder-assets.sql` | 创建 placeholder_asset_urls 视图（前台可读） |
