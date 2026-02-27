# 📚 数据库文档索引

> **志信纸业 B2B 独立站 - Assets & Placeholders 系统完整文档**

---

## 📖 文档清单

| 文档 | 路径 | 用途 | 目标用户 |
|------|------|------|----------|
| **迁移脚本** | `/DATABASE_MIGRATION.sql` | 创建表、触发器、RLS 策略 | DBA / 后端开发 |
| **设置指南** | `/DATABASE_SETUP_GUIDE.md` | 完整的安装和配置步骤 | 所有人 |
| **快速检查清单** | `/QUICK_START_CHECKLIST.md` | 5分钟快速设置指南 | 新用户 |
| **接口合同** | `/BACKEND_API_CONTRACT_CN.md` | API 规范和实现代码 | 前端 / 后端 |
| **组件规范** | `/REACT_COMPONENT_SPECIFICATION.md` | React 组件使用指南 | 前端开发 |
| **组件树文档** | `/COMPONENT_TREE_DOCUMENTATION.md` | Figma 组件映射 | UI/UX / 前端 |

---

## 🚀 快速开始

### **新用户（首次安装）**

```
1. 阅读：QUICK_START_CHECKLIST.md（5分钟）
2. 执行：DATABASE_MIGRATION.sql
3. 按照清单完成 5 个步骤
4. 开始使用！
```

### **开发者（详细了解）**

```
1. 阅读：DATABASE_SETUP_GUIDE.md（完整设置）
2. 参考：BACKEND_API_CONTRACT_CN.md（API 规范）
3. 参考：REACT_COMPONENT_SPECIFICATION.md（组件使用）
```

### **DBA / 后端开发**

```
1. 阅读：DATABASE_MIGRATION.sql（理解表结构）
2. 阅读：BACKEND_API_CONTRACT_CN.md（实现 API）
3. 参考：DATABASE_SETUP_GUIDE.md（验证安装）
```

### **前端开发**

```
1. 参考：REACT_COMPONENT_SPECIFICATION.md（组件库）
2. 参考：BACKEND_API_CONTRACT_CN.md（API 调用）
3. 参考：COMPONENT_TREE_DOCUMENTATION.md（组件映射）
```

---

## 🎯 核心概念

### **表结构**

```
user_roles       → 用户角色管理
  ├─ admin       → 完全权限
  ├─ ops         → 运营人员
  ├─ supervisor  → 主管
  └─ sales       → 销售（只读权限）

assets           → 素材库
  ├─ approved    → 批准状态（只有 true 才能绑定）
  ├─ type        → 素材类型（banner/factory/product...）
  └─ tags        → 标签（用于筛选）

placeholders     → 占位符追踪
  ├─ placeholder_key  → 唯一标识（page_key.section_key）
  ├─ status           → missing / replaced
  └─ asset_id         → 绑定的素材 ID
```

### **核心规则**

```
✅ 只能绑定 approved=true 的素材
✅ 绑定后自动 status='replaced'
✅ placeholder_key 必须唯一
✅ placeholder_key 格式：page_key.section_key
```

### **权限模型**

```
admin       → 所有操作
ops         → 上传、编辑、绑定
supervisor  → 上传、编辑、绑定
sales       → 无权限（默认）
owner       → 只读
```

---

## 📊 数据库架构

### **Enums（枚举类型）**

```sql
role_type            → owner | supervisor | ops | sales | admin
asset_type           → banner | factory | product | material | qc | packaging | container | document
placeholder_type     → hero | product | industry | proof | background
placeholder_status   → missing | replaced
```

### **表关系**

```
auth.users (Supabase Auth)
    ↓
user_roles (1:1)
    ↓
assets (1:N)
    ↓
placeholders (N:1)
```

### **触发器**

```
trg_assets_updated_at            → 自动更新 updated_at
trg_placeholders_updated_at      → 自动更新 updated_at
trg_placeholders_bind_rules      → 验证绑定规则
trg_user_roles_updated_at        → 自动更新 updated_at
```

### **视图**

```sql
asset_placeholder_usage  → 素材使用情况（asset → placeholder_keys）
```

### **函数**

```sql
current_role()                   → 获取当前用户角色
bulk_upsert_placeholders()       → 批量插入/更新占位符
enforce_placeholder_binding_rules() → 绑定规则验证
set_updated_at()                 → 更新时间戳
is_asset_bucket()                → 检查 bucket 名称
```

---

## 🔐 RLS 策略总览

### **user_roles 表**

| 操作 | 策略 | 权限 |
|------|------|------|
| SELECT | `user_roles_read_own` | 用户只能读自己的角色 |
| ALL | `user_roles_admin_all` | admin 可以管理所有角色 |

### **assets 表**

| 操作 | 策略 | 权限 |
|------|------|------|
| SELECT | `assets_select_ops_super_admin_owner` | ops/supervisor/admin/owner 可读 |
| INSERT | `assets_insert_ops_super_admin` | ops/supervisor/admin 可插入 |
| UPDATE | `assets_update_ops_super_admin` | ops/supervisor/admin 可更新 |
| DELETE | `assets_delete_admin_only` | 仅 admin 可删除 |

### **placeholders 表**

| 操作 | 策略 | 权限 |
|------|------|------|
| SELECT | `placeholders_select_ops_super_admin_owner` | ops/supervisor/admin/owner 可读 |
| INSERT | `placeholders_insert_ops_admin` | ops/admin 可插入 |
| UPDATE | `placeholders_update_ops_super_admin` | ops/supervisor/admin 可更新 |
| DELETE | `placeholders_delete_admin_only` | 仅 admin 可删除 |

### **storage.objects 表**

| 操作 | 策略 | 权限 |
|------|------|------|
| SELECT | `storage_public_read_assets` | 公开可读 |
| INSERT | `storage_upload_assets_ops_super_admin` | ops/supervisor/admin 可上传 |
| UPDATE | `storage_update_assets_ops_super_admin` | ops/supervisor/admin 可更新 |
| DELETE | `storage_delete_assets_admin_only` | 仅 admin 可删除 |

---

## 🗂️ Storage Buckets

### **必须创建的 Buckets**

```
assets-banners     → 横幅广告图片（Public）
assets-factory     → 工厂实拍图片（Public）
assets-products    → 产品图片（Public）
assets-materials   → 原材料图片（Public）
assets-docs        → 文档/证书（Public）
```

### **文件路径格式**

```
{bucket}/{year}/{month}/{uuid}_{slug}.{ext}

示例：
assets-factory/2026/02/a1b2c3d4_factory-exterior.jpg
assets-banners/2026/02/e5f6g7h8_home-hero-banner.png
```

---

## 📝 常用查询

### **查看所有占位符状态**

```sql
SELECT 
  placeholder_key,
  status,
  CASE WHEN asset_id IS NULL THEN 'No Asset' ELSE 'Bound' END as binding
FROM public.placeholders
ORDER BY page_key, section_key;
```

### **查看素材使用情况**

```sql
SELECT 
  title,
  type,
  approved,
  placeholder_keys
FROM public.asset_placeholder_usage
WHERE array_length(placeholder_keys, 1) > 0;
```

### **查看未绑定的占位符**

```sql
SELECT 
  placeholder_key,
  placeholder_type,
  required_ratio
FROM public.placeholders
WHERE status = 'missing'
ORDER BY page_key;
```

### **查看未使用的素材**

```sql
SELECT 
  a.title,
  a.type,
  a.approved,
  a.created_at
FROM public.assets a
LEFT JOIN public.placeholders p ON p.asset_id = a.id
WHERE p.id IS NULL
ORDER BY a.created_at DESC;
```

---

## 🛠️ 维护命令

### **清理未使用的素材（软删除）**

```sql
UPDATE public.assets
SET approved = false, notes = '[UNUSED] Marked for cleanup'
WHERE id NOT IN (
  SELECT DISTINCT asset_id 
  FROM public.placeholders 
  WHERE asset_id IS NOT NULL
)
AND created_at < NOW() - INTERVAL '30 days';
```

### **重置所有占位符（慎用）**

```sql
UPDATE public.placeholders
SET asset_id = NULL, status = 'missing';
```

### **批量批准素材**

```sql
UPDATE public.assets
SET approved = true
WHERE type = 'factory' AND approved = false;
```

---

## 🔍 故障排查

### **查看 RLS 策略是否生效**

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### **查看触发器是否启用**

```sql
SELECT trigger_name, event_manipulation, event_object_table, action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;
```

### **检查索引**

```sql
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('assets', 'placeholders', 'user_roles')
ORDER BY tablename, indexname;
```

---

## 📞 支持

### **问题反馈**

如果遇到问题，请提供以下信息：

1. 错误消息截图
2. 执行的 SQL 语句
3. 当前用户角色（`SELECT public.current_role()`）
4. 相关表的数据快照

### **常见问题**

参考 `DATABASE_SETUP_GUIDE.md` 第 7 章节

---

## 📈 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-02-05 | 初始版本 |

---

## ✅ 下一步行动

- [ ] 阅读相关文档
- [ ] 执行迁移脚本
- [ ] 完成快速检查清单
- [ ] 测试上传和绑定功能
- [ ] 开始使用后台管理系统

---

**维护人**: Figma Make AI Assistant  
**最后更新**: 2026-02-05  
**文档版本**: 1.0.0
