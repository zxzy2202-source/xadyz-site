# ✅ Supabase Client 单例模式已修复

## 问题

```
GoTrueClient@sb-dpitlvjqgoixfozdpkji-auth-token:1 (2.94.1) 2026-02-05T07:05:10.691Z 
Multiple GoTrueClient instances detected in the same browser context. 
It is not an error, but this should be avoided as it may produce undefined behavior 
when used concurrently under the same storage key.
```

## 原因

项目中有 **2 个地方** 创建了独立的 Supabase Client 实例：

### ❌ **问题代码 1**: `/src/admin/lib/supabaseClient.ts`
```typescript
// 使用环境变量（但环境变量不存在）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### ❌ **问题代码 2**: `/check_leads.tsx`
```typescript
// 创建了另一个独立的实例
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

**结果**：同一个浏览器上下文中有 2 个 GoTrueClient 实例，导致警告。

---

## 解决方案

### ✅ **修复 1**: 使用正确的配置源

`/src/admin/lib/supabaseClient.ts` 现在从 `/utils/supabase/info.tsx` 导入配置：

```typescript
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### ✅ **修复 2**: 复用单例实例

`/check_leads.tsx` 现在复用 admin 的 client：

```typescript
// ✅ 复用现有的 client，不再创建新实例
import { supabase } from '/src/admin/lib/supabaseClient';
```

---

## 好处

### 1. **单例模式**
整个应用只有 **1 个** Supabase Client 实例：

```
/utils/supabase/info.tsx (配置源)
          ↓
/src/admin/lib/supabaseClient.ts (创建单例)
          ↓
    所有其他文件复用这个实例
    ├── /check_leads.tsx
    ├── /src/admin/app/routes/assets/index.tsx
    └── ...
```

### 2. **避免冲突**
- ✅ 不再有多个 GoTrueClient 实例
- ✅ 认证状态统一管理
- ✅ Storage key 不冲突

### 3. **配置统一**
- ✅ 所有配置来自 `/utils/supabase/info.tsx`（Figma Make 自动生成）
- ✅ 不需要手动维护 `.env` 文件
- ✅ 配置变更自动同步

---

## 验证

刷新浏览器页面，警告应该消失。

检查控制台，应该 **不再看到**：
```
❌ Multiple GoTrueClient instances detected
```

---

## 最佳实践

### ✅ **正确做法**：始终复用单例

```typescript
// ✅ 导入现有的 client
import { supabase } from '/src/admin/lib/supabaseClient';

// 使用它
const { data, error } = await supabase
  .from('assets')
  .select('*');
```

### ❌ **错误做法**：创建新实例

```typescript
// ❌ 不要这样做！
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(url, key); // 创建了新实例
```

---

## 项目中的所有 Supabase Client

| 位置 | 用途 | 状态 |
|------|------|------|
| `/utils/supabase/info.tsx` | 配置源（自动生成） | ✅ 保留 |
| `/src/admin/lib/supabaseClient.ts` | 浏览器端单例 | ✅ 保留 |
| `/supabase/functions/server/kv_store.tsx` | 服务端 (Deno) | ✅ 保留（独立环境） |
| `/check_leads.tsx` | 客户留言查看 | ✅ 已修复（复用单例） |

**说明**：
- 浏览器端只有 **1 个** client 实例 ✅
- 服务端 (Deno Edge Function) 是独立环境，可以有自己的实例 ✅

---

## 状态

- ✅ 已修复环境变量问题
- ✅ 已修复多实例警告
- ✅ 采用单例模式
- ✅ 配置统一管理

**现在可以安全地使用 Supabase Client 了！** 🎉

---

**修复时间**: 2026-02-05  
**相关文件**: 
- `/src/admin/lib/supabaseClient.ts` (已更新)
- `/check_leads.tsx` (已更新)
- `/SUPABASE_CONFIG_FIXED.md` (已创建)
