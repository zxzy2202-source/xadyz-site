# 📨 客户留言查看指南

## 方式一：通过后台管理系统（推荐）

### 1. 访问后台登录页面
```
https://xadyz.com/admin/login
```

### 2. 登录凭证
使用您的管理员账号登录（如果尚未设置，需要先在Supabase中创建用户）

### 3. 查看线索
登录后，您可以：
- **查看所有线索**: `/admin/leads`
- **线索详情**: `/admin/leads/:id`
- **仪表板**: `/admin`

---

## 方式二：直接查询Supabase数据库

### 在Supabase Dashboard中查询

1. 访问 Supabase Dashboard
2. 选择您的项目
3. 进入 **Table Editor**
4. 选择 `leads` 表

### SQL查询示例

```sql
-- 查看所有留言（按时间倒序）
SELECT * FROM leads 
ORDER BY created_at DESC;

-- 查看新线索
SELECT * FROM leads 
WHERE status = 'new' 
ORDER BY created_at DESC;

-- 按类型统计
SELECT 
  lead_type,
  COUNT(*) as count
FROM leads
GROUP BY lead_type;

-- 按状态统计
SELECT 
  status,
  COUNT(*) as count
FROM leads
GROUP BY status;

-- 查看最近7天的留言
SELECT * FROM leads 
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- 查看包含特定关键词的留言
SELECT * FROM leads 
WHERE message ILIKE '%thermal%' 
   OR message ILIKE '%label%'
ORDER BY created_at DESC;

-- 按国家统计
SELECT 
  country,
  COUNT(*) as count
FROM leads
WHERE country IS NOT NULL
GROUP BY country
ORDER BY count DESC;

-- 查看A级线索
SELECT * FROM leads 
WHERE lead_level = 'A' 
ORDER BY created_at DESC;
```

---

## 方式三：使用数据库字段说明

### `leads` 表结构

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | UUID | 唯一标识符 |
| `created_at` | timestamp | 创建时间 |
| `updated_at` | timestamp | 更新时间 |
| `lead_type` | text | 类型: `contact` 或 `tender` |
| `name` | text | 客户姓名 |
| `email` | text | 邮箱地址 |
| `company` | text | 公司名称 |
| `country` | text | 国家 |
| `phone` | text | 电话号码 |
| `message` | text | 留言内容 |
| `product_interest` | text | 产品兴趣 |
| `status` | text | 状态: `new`, `contacted`, `qualified`, `won`, `lost` |
| `lead_level` | text | 等级: `A`, `B`, `C` |
| `language` | text | 语言: `en`, `ru`, `zh` |

---

## 方式四：快速统计查询

### 获取关键统计数据

```sql
-- 完整统计报告
SELECT 
  COUNT(*) as 总数,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as 新线索,
  COUNT(CASE WHEN status = 'contacted' THEN 1 END) as 已联系,
  COUNT(CASE WHEN status = 'qualified' THEN 1 END) as 已确认,
  COUNT(CASE WHEN lead_type = 'contact' THEN 1 END) as 咨询表单,
  COUNT(CASE WHEN lead_type = 'tender' THEN 1 END) as 招标需求,
  COUNT(CASE WHEN language = 'en' THEN 1 END) as 英语,
  COUNT(CASE WHEN language = 'ru' THEN 1 END) as 俄语,
  COUNT(CASE WHEN language = 'zh' THEN 1 END) as 中文,
  COUNT(CASE WHEN lead_level = 'A' THEN 1 END) as A级线索
FROM leads;
```

---

## 🔐 安全提示

1. **保护登录凭证**: 不要分享管理员密码
2. **定期备份数据**: 在Supabase中设置自动备份
3. **访问日志**: 检查 `lead_activity` 表查看操作记录
4. **权限控制**: 确保只有授权人员能访问后台

---

## 📊 常用过滤器

在后台管理系统中，您可以按以下条件过滤：

- **状态**: 新线索、已联系、已确认、已成交、已失效
- **类型**: 咨询表单、招标需求
- **等级**: A级、B级、C级
- **国家**: 俄罗斯、中国、美国等
- **语言**: 英语、俄语、中文

---

## 🚀 下一步操作建议

1. **立即检查**: 登录后台查看是否有新线索
2. **及时回复**: 建议24小时内回复新客户
3. **标记等级**: 根据客户质量标记A/B/C等级
4. **跟踪状态**: 更新线索状态，便于团队协作
5. **添加备注**: 在线索详情页添加沟通记录

---

## 📱 访问路径总结

| 功能 | URL |
|------|-----|
| 登录页面 | `/admin/login` |
| 仪表板 | `/admin` |
| 线索列表 | `/admin/leads` |
| 线索详情 | `/admin/leads/:id` |
| 素材库 | `/admin/assets` |
| 占位符追踪 | `/admin/placeholders` |

---

**最后更新**: 2026-02-05  
**维护团队**: Figma Make AI Assistant
