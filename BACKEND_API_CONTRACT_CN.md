# 🔌 后台接口合同（中文版）

> **适用于**：Vite + React + Supabase  
> **模块**：Assets（素材库）+ Placeholders（占位符追踪）  
> **版本**：1.0.0  
> **日期**：2026-02-05

---

## 📋 目录

1. [全局约定](#1-全局约定必须遵守)
2. [数据表合同](#2-数据表合同前端只依赖这些字段)
3. [Assets API](#3-assets-api-合同)
4. [Placeholders API](#4-placeholders-api-合同)
5. [Storage 规范](#5-storage-存储规范)
6. [反查机制](#6-反查素材使用情况)
7. [前端页面调用清单](#7-前端页面调用清单)
8. [验收标准](#8-验收标准)
9. [错误码](#9-错误码清单)

---

## 1. 全局约定（必须遵守）

### 1.1 Placeholder Key 规则

```typescript
// 格式
placeholder_key = `${page_key}.${section_key}`

// 示例
"home.hero"                          // 首页 Hero 区域
"government-tenders.hero"            // 政府招标页 Hero
"products.category"                  // 产品页分类区
"material-supply.proof"              // 材料供应页证据区
```

**规则**：
- ✅ 必须包含一个点号（`.`）
- ✅ page_key 对应路由 path（去除语言前缀）
- ✅ section_key 对应页面区块
- ❌ 不允许多级嵌套（最多两级）

---

### 1.2 绑定规则（核心约束）

```typescript
// ✅ 只能绑定已批准的素材
if (asset.status !== 'approved') {
  throw new Error('ASSET_NOT_APPROVED');
}

// ✅ 绑定成功后必须更新
await supabase
  .from('placeholders')
  .update({
    asset_id: assetId,
    status: 'replaced',      // missing → replaced
    updated_at: new Date().toISOString()
  })
  .eq('id', placeholderId);
```

**约束清单**：

| 约束 | 说明 | 错误码 |
|------|------|--------|
| 只能绑定 `status='approved'` | 未批准的素材不能绑定 | `ASSET_NOT_APPROVED` |
| 绑定后必须 `status='replaced'` | 标记占位符已被替换 | - |
| 必须更新 `updated_at` | 记录绑定时间 | - |
| 不能绑定不存在的素材 | asset_id 必须存在 | `ASSET_NOT_FOUND` |
| 不能绑定到不存在的占位符 | placeholder_id 必须存在 | `PLACEHOLDER_NOT_FOUND` |

---

### 1.3 Storage 路径规范

```typescript
// 上传路径格式
bucket = `assets-${type}`
path = `${year}/${month}/${uuid}_${slug}.${ext}`

// 示例
bucket: "assets-banners"
path: "2026/02/a1b2c3d4_factory-exterior.jpg"

// 完整URL
https://dpitlvjqgoixfozdpkji.supabase.co/storage/v1/object/public/assets-banners/2026/02/a1b2c3d4_factory-exterior.jpg
```

**Bucket 映射表**：

| Asset Type | Bucket Name | 说明 |
|------------|-------------|------|
| `banner` | `assets-banners` | 横幅广告 |
| `factory` | `assets-factory` | 工厂实拍 |
| `product` | `assets-products` | 产品图 |
| `material` | `assets-materials` | 原材料 |
| `qc` | `assets-factory` | 质检图（归入工厂） |
| `packaging` | `assets-factory` | 包装图（归入工厂） |
| `container` | `assets-factory` | 集装箱（归入工厂） |
| `document` | `assets-docs` | 文档/证书 |

---

## 2. 数据表合同（前端只依赖这些字段）

### 2.1 `assets` 表（最小字段集）

```typescript
type AssetRecord = {
  id: string;
  created_at: string;
  updated_at: string;
  
  // 文件信息
  file_name: string;
  file_url: string;           // ✅ 核心：前端直接用这个URL
  file_type: 'image' | 'video' | 'document' | 'other';
  file_size: number;          // bytes
  
  // 元数据
  category: string | null;    // 对应 type
  tags: string[];             // 标签数组
  status: 'pending' | 'approved' | 'rejected';  // ✅ 核心：批准状态
  
  // Evidence Tags（工业B2B特有）
  evidence_tags: string[] | null;
  
  // 备注
  notes: string | null;
  
  // 用户追踪
  uploaded_by: string | null;
  approved_by: string | null;
};
```

**约束**：
- ✅ `file_url` 必须是可访问的完整URL
- ✅ `status` 只有3个值：pending / approved / rejected
- ✅ `tags` 必须是数组（即使为空也是 `[]`）
- ✅ `file_size` 单位是字节（前端自行转换MB）

---

### 2.2 `placeholders` 表（最小字段集）

```typescript
type PlaceholderRecord = {
  id: string;
  created_at: string;
  updated_at: string;
  
  // 定位信息
  placeholder_key: string;    // ✅ 核心：唯一标识
  page_path: string;          // 页面路径（如 "/en/products"）
  section_name: string | null;
  
  // 描述信息
  element_description: string | null;
  placeholder_type: 'hero' | 'product' | 'factory' | 'banner' | 'icon' | 'other' | null;
  required_dimensions: string | null;  // "1920x1080"
  required_ratio: string | null;       // "16:9"
  
  // 绑定信息
  asset_id: string | null;    // ✅ 核心：绑定的素材ID
  status: 'missing' | 'replaced';  // ✅ 核心：状态
  
  // 优先级
  priority: 'high' | 'medium' | 'low';
  
  // 使用追踪
  last_used_at: string | null;
};
```

**约束**：
- ✅ `placeholder_key` 必须唯一（建立唯一索引）
- ✅ `status` 只有2个值：missing / replaced
- ✅ `asset_id` 为 null 时，`status` 必须是 'missing'
- ✅ `asset_id` 不为 null 时，`status` 必须是 'replaced'

---

## 3. Assets API 合同

### 3.1 查询素材列表（带筛选）

**函数名**：`listAssets`

**参数**：

```typescript
type ListAssetsParams = {
  q?: string;                   // 搜索标题（模糊匹配）
  type?: string;                // "all" | "banner" | "factory" | ...
  approved?: string;            // "all" | "approved" | "pending"
  usage?: string;               // "all" | "used" | "unused"
  tag?: string;                 // 单个标签筛选
  page?: string;                // 按页面筛选（需要反查 placeholders）
  limit?: number;               // 每页数量（默认 20）
  offset?: number;              // 偏移量
  orderBy?: string;             // "created_at" | "file_name"
  orderDir?: 'asc' | 'desc';    // 排序方向
};
```

**返回值**：

```typescript
type ListAssetsResponse = {
  rows: AssetRecord[];
  total: number;
};
```

**实现要点**：

```typescript
// 1. 基础查询
let query = supabase
  .from('assets')
  .select('*', { count: 'exact' });

// 2. 搜索标题
if (params.q) {
  query = query.ilike('file_name', `%${params.q}%`);
}

// 3. 类型筛选
if (params.type !== 'all') {
  query = query.eq('category', params.type);
}

// 4. 批准状态筛选
if (params.approved === 'approved') {
  query = query.eq('status', 'approved');
} else if (params.approved === 'pending') {
  query = query.eq('status', 'pending');
}

// 5. 使用情况筛选（需要子查询）
if (params.usage === 'used') {
  // 方案A：先查 placeholders 获取所有 asset_id
  const { data: usedIds } = await supabase
    .from('placeholders')
    .select('asset_id')
    .not('asset_id', 'is', null);
  
  const ids = usedIds.map(p => p.asset_id);
  query = query.in('id', ids);
}

// 6. 排序和分页
query = query
  .order(params.orderBy || 'created_at', { ascending: params.orderDir === 'asc' })
  .range(params.offset || 0, (params.offset || 0) + (params.limit || 20) - 1);
```

---

### 3.2 上传素材（Storage + DB）

**函数名**：`uploadAsset`

**参数**：

```typescript
type UploadAssetPayload = {
  file: File;
  title: string;
  type: string;                 // "banner" | "factory" | ...
  tags: string[];
  evidence_tags?: string[];     // 可选
  approved: boolean;
  notes?: string;
};
```

**返回值**：

```typescript
type UploadAssetResponse = AssetRecord;
```

**实现步骤**：

```typescript
async function uploadAsset(payload: UploadAssetPayload): Promise<AssetRecord> {
  const { file, title, type, tags, evidence_tags, approved, notes } = payload;
  
  // 1. 生成路径
  const bucket = getBucketByType(type);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const uuid = generateUUID();
  const ext = file.name.split('.').pop();
  const path = `${year}/${month}/${uuid}_${slugify(title)}.${ext}`;
  
  // 2. 上传到 Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file);
  
  if (uploadError) {
    throw new Error('UPLOAD_FAILED');
  }
  
  // 3. 获取公开URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  // 4. 插入数据库
  const { data: assetData, error: dbError } = await supabase
    .from('assets')
    .insert({
      file_name: title,
      file_url: publicUrl,
      file_type: getFileType(file.type),
      file_size: file.size,
      category: type,
      tags: tags,
      evidence_tags: evidence_tags || null,
      status: approved ? 'approved' : 'pending',
      notes: notes || null,
      uploaded_by: currentUser.email,
      approved_by: approved ? currentUser.email : null,
    })
    .select()
    .single();
  
  if (dbError) {
    // ❗ 回滚：删除已上传的文件
    await supabase.storage.from(bucket).remove([path]);
    throw new Error('DB_INSERT_FAILED');
  }
  
  return assetData;
}
```

**错误处理**：

| 错误码 | 说明 | 回滚操作 |
|--------|------|----------|
| `UPLOAD_FAILED` | Storage 上传失败 | 无需回滚 |
| `DB_INSERT_FAILED` | 数据库插入失败 | ✅ 删除已上传的文件 |
| `INVALID_FILE_TYPE` | 文件类型不支持 | 无需回滚 |
| `FILE_TOO_LARGE` | 文件超过大小限制 | 无需回滚 |

---

### 3.3 更新素材（title/type/tags/approved）

**函数名**：`updateAsset`

**参数**：

```typescript
type UpdateAssetPayload = {
  id: string;
  file_name: string;
  category: string;
  tags: string[];
  evidence_tags?: string[];
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
};
```

**返回值**：

```typescript
type UpdateAssetResponse = AssetRecord;
```

**实现逻辑**：

```typescript
async function updateAsset(payload: UpdateAssetPayload): Promise<AssetRecord> {
  const { id, file_name, category, tags, evidence_tags, status, notes } = payload;
  
  // 1. 检查是否存在
  const { data: existing } = await supabase
    .from('assets')
    .select('*')
    .eq('id', id)
    .single();
  
  if (!existing) {
    throw new Error('ASSET_NOT_FOUND');
  }
  
  // 2. 检查 approved → pending 的情况
  if (existing.status === 'approved' && status === 'pending') {
    // 警告：该素材可能正在被使用
    const { data: usages } = await supabase
      .from('placeholders')
      .select('placeholder_key')
      .eq('asset_id', id);
    
    if (usages && usages.length > 0) {
      console.warn(`Asset ${id} is used by ${usages.length} placeholders:`, usages);
      // 可选：自动将这些占位符标记回 missing
      // await supabase
      //   .from('placeholders')
      //   .update({ asset_id: null, status: 'missing' })
      //   .eq('asset_id', id);
    }
  }
  
  // 3. 更新数据库
  const { data: updated, error } = await supabase
    .from('assets')
    .update({
      file_name,
      category,
      tags,
      evidence_tags: evidence_tags || null,
      status,
      notes: notes || null,
      approved_by: status === 'approved' ? currentUser.email : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    throw new Error('UPDATE_FAILED');
  }
  
  return updated;
}
```

**特殊规则**：

| 场景 | 行为 | 建议 |
|------|------|------|
| `approved → pending` | 素材可能正在使用中 | ⚠️ 前端提示用户风险 |
| `pending → approved` | 允许绑定 | ✅ 无风险 |
| `approved → rejected` | 不应该被绑定 | ⚠️ 考虑自动解绑 |

---

### 3.4 删除素材（建议软删）

**函数名**：`deleteAsset`

**参数**：

```typescript
type DeleteAssetParams = {
  id: string;
  force?: boolean;  // 强制删除（即使正在使用）
};
```

**返回值**：

```typescript
type DeleteAssetResponse = {
  ok: boolean;
  message?: string;
};
```

**实现逻辑**：

```typescript
async function deleteAsset(params: DeleteAssetParams): Promise<DeleteAssetResponse> {
  const { id, force } = params;
  
  // 1. 检查是否正在使用
  const { data: usages, error: usageError } = await supabase
    .from('placeholders')
    .select('placeholder_key')
    .eq('asset_id', id);
  
  if (usageError) {
    throw new Error('QUERY_FAILED');
  }
  
  if (usages && usages.length > 0 && !force) {
    return {
      ok: false,
      message: `ASSET_IN_USE: ${usages.length} placeholders`,
    };
  }
  
  // 2. 软删除（推荐）
  const { error: deleteError } = await supabase
    .from('assets')
    .update({ 
      status: 'rejected',
      notes: '[DELETED] ' + (existing.notes || ''),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
  
  // 或硬删除（不推荐）
  // const { error: deleteError } = await supabase
  //   .from('assets')
  //   .delete()
  //   .eq('id', id);
  
  if (deleteError) {
    throw new Error('DELETE_FAILED');
  }
  
  return { ok: true };
}
```

**删除策略对比**：

| 策略 | 优点 | 缺点 | 建议 |
|------|------|------|------|
| **软删除** | 可恢复、保留历史 | 需要额外字段 | ✅ 推荐 |
| **硬删除** | 数据干净 | 不可恢复 | ⚠️ 慎用 |
| **归档** | 最佳实践 | 需要归档表 | 💡 长期方案 |

---

## 4. Placeholders API 合同

### 4.1 查询占位符列表（带 join asset）

**函数名**：`listPlaceholders`

**参数**：

```typescript
type ListPlaceholdersParams = {
  q?: string;                   // 搜索 placeholder_key
  page?: string;                // 按页面筛选（"all" | "home" | ...）
  status?: string;              // "all" | "missing" | "replaced"
  type?: string;                // "all" | "hero" | "product" | ...
  priority?: string;            // "all" | "high" | "medium" | "low"
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
};
```

**返回值**：

```typescript
type PlaceholderRow = PlaceholderRecord & {
  bound_asset?: Pick<AssetRecord, 'id' | 'file_url' | 'file_name' | 'category' | 'status'> | null;
};

type ListPlaceholdersResponse = {
  rows: PlaceholderRow[];
  total: number;
};
```

**实现逻辑**：

```typescript
async function listPlaceholders(params: ListPlaceholdersParams): Promise<ListPlaceholdersResponse> {
  // 1. 查询 placeholders（left join assets）
  let query = supabase
    .from('placeholders')
    .select(`
      *,
      bound_asset:assets!placeholders_asset_id_fkey (
        id,
        file_url,
        file_name,
        category,
        status
      )
    `, { count: 'exact' });
  
  // 2. 搜索
  if (params.q) {
    query = query.ilike('placeholder_key', `%${params.q}%`);
  }
  
  // 3. 页面筛选
  if (params.page !== 'all') {
    query = query.eq('page_path', params.page);
  }
  
  // 4. 状态筛选
  if (params.status === 'missing') {
    query = query.eq('status', 'missing');
  } else if (params.status === 'replaced') {
    query = query.eq('status', 'replaced');
  }
  
  // 5. 类型筛选
  if (params.type !== 'all') {
    query = query.eq('placeholder_type', params.type);
  }
  
  // 6. 优先级筛选
  if (params.priority !== 'all') {
    query = query.eq('priority', params.priority);
  }
  
  // 7. 排序和分页
  query = query
    .order(params.orderBy || 'updated_at', { ascending: params.orderDir === 'asc' })
    .range(params.offset || 0, (params.offset || 0) + (params.limit || 20) - 1);
  
  const { data, error, count } = await query;
  
  if (error) {
    throw new Error('QUERY_FAILED');
  }
  
  return {
    rows: data || [],
    total: count || 0,
  };
}
```

**关键点**：
- ✅ 必须使用 left join 获取 bound_asset
- ✅ bound_asset 可能为 null（未绑定的情况）
- ✅ 返回的 asset 字段要最小化（只返回必要字段）

---

### 4.2 绑定素材到占位符（Bind / Replace）

**函数名**：`bindAssetToPlaceholder`

**参数**：

```typescript
type BindAssetPayload = {
  placeholderId: string;
  assetId: string;
};
```

**返回值**：

```typescript
type BindAssetResponse = PlaceholderRow;
```

**实现逻辑**：

```typescript
async function bindAssetToPlaceholder(payload: BindAssetPayload): Promise<PlaceholderRow> {
  const { placeholderId, assetId } = payload;
  
  // 1. 检查 asset 是否存在且已批准
  const { data: asset, error: assetError } = await supabase
    .from('assets')
    .select('id, status')
    .eq('id', assetId)
    .single();
  
  if (assetError || !asset) {
    throw new Error('ASSET_NOT_FOUND');
  }
  
  if (asset.status !== 'approved') {
    throw new Error('ASSET_NOT_APPROVED');
  }
  
  // 2. 检查 placeholder 是否存在
  const { data: placeholder, error: placeholderError } = await supabase
    .from('placeholders')
    .select('*')
    .eq('id', placeholderId)
    .single();
  
  if (placeholderError || !placeholder) {
    throw new Error('PLACEHOLDER_NOT_FOUND');
  }
  
  // 3. 更新绑定
  const { data: updated, error: updateError } = await supabase
    .from('placeholders')
    .update({
      asset_id: assetId,
      status: 'replaced',
      last_used_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', placeholderId)
    .select(`
      *,
      bound_asset:assets!placeholders_asset_id_fkey (
        id,
        file_url,
        file_name,
        category,
        status
      )
    `)
    .single();
  
  if (updateError) {
    throw new Error('BIND_FAILED');
  }
  
  return updated;
}
```

**错误处理**：

| 错误码 | 说明 | HTTP状态 |
|--------|------|----------|
| `ASSET_NOT_FOUND` | 素材不存在 | 404 |
| `ASSET_NOT_APPROVED` | 素材未批准 | 403 |
| `PLACEHOLDER_NOT_FOUND` | 占位符不存在 | 404 |
| `BIND_FAILED` | 数据库更新失败 | 500 |

---

### 4.3 解绑占位符（Unbind）

**函数名**：`unbindPlaceholder`

**参数**：

```typescript
type UnbindPlaceholderParams = {
  placeholderId: string;
};
```

**返回值**：

```typescript
type UnbindPlaceholderResponse = PlaceholderRow;
```

**实现逻辑**：

```typescript
async function unbindPlaceholder(params: UnbindPlaceholderParams): Promise<PlaceholderRow> {
  const { placeholderId } = params;
  
  const { data: updated, error } = await supabase
    .from('placeholders')
    .update({
      asset_id: null,
      status: 'missing',
      updated_at: new Date().toISOString(),
    })
    .eq('id', placeholderId)
    .select()
    .single();
  
  if (error) {
    throw new Error('UNBIND_FAILED');
  }
  
  return updated;
}
```

---

### 4.4 批量生成/更新占位符（Bulk Upsert）

**函数名**：`bulkUpsertPlaceholders`

**参数**：

```typescript
type BulkPlaceholderInput = {
  placeholder_key: string;
  page_path: string;
  section_name: string;
  placeholder_type: PlaceholderRecord['placeholder_type'];
  required_ratio: string;
  required_dimensions?: string;
  priority?: 'high' | 'medium' | 'low';
  element_description?: string;
}[];
```

**返回值**：

```typescript
type BulkUpsertResponse = {
  ok: boolean;
  count: number;
  inserted: number;
  updated: number;
};
```

**实现逻辑**：

```typescript
async function bulkUpsertPlaceholders(rows: BulkPlaceholderInput[]): Promise<BulkUpsertResponse> {
  let inserted = 0;
  let updated = 0;
  
  for (const row of rows) {
    // 1. 检查是否存在
    const { data: existing } = await supabase
      .from('placeholders')
      .select('id, asset_id')
      .eq('placeholder_key', row.placeholder_key)
      .single();
    
    if (existing) {
      // 2. 存在则更新（不覆盖 asset_id）
      await supabase
        .from('placeholders')
        .update({
          page_path: row.page_path,
          section_name: row.section_name,
          placeholder_type: row.placeholder_type,
          required_ratio: row.required_ratio,
          required_dimensions: row.required_dimensions || null,
          priority: row.priority || 'medium',
          element_description: row.element_description || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);
      
      updated++;
    } else {
      // 3. 不存在则插入
      await supabase
        .from('placeholders')
        .insert({
          placeholder_key: row.placeholder_key,
          page_path: row.page_path,
          section_name: row.section_name,
          placeholder_type: row.placeholder_type,
          required_ratio: row.required_ratio,
          required_dimensions: row.required_dimensions || null,
          priority: row.priority || 'medium',
          element_description: row.element_description || null,
          status: 'missing',
          asset_id: null,
        });
      
      inserted++;
    }
  }
  
  return {
    ok: true,
    count: rows.length,
    inserted,
    updated,
  };
}
```

**使用场景**：
- ✅ 初始化占位符数据
- ✅ 批量更新 required_ratio
- ✅ 添加新页面的占位符

---

## 5. Storage 存储规范

### 5.1 Bucket 映射表

```typescript
const BUCKET_MAP: Record<string, string> = {
  'banner': 'assets-banners',
  'factory': 'assets-factory',
  'product': 'assets-products',
  'material': 'assets-materials',
  'qc': 'assets-factory',
  'packaging': 'assets-factory',
  'container': 'assets-factory',
  'document': 'assets-docs',
  'icon': 'assets-icons',
  'team': 'assets-team',
};

function getBucketByType(type: string): string {
  return BUCKET_MAP[type] || 'assets-misc';
}
```

### 5.2 路径生成规范

```typescript
function generateStoragePath(fileName: string, type: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const uuid = crypto.randomUUID();
  const slug = slugify(fileName);
  const ext = fileName.split('.').pop();
  
  return `${year}/${month}/${uuid}_${slug}.${ext}`;
}

// 示例
generateStoragePath('Factory Exterior.jpg', 'factory');
// => "2026/02/a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6_factory-exterior.jpg"
```

### 5.3 URL 获取策略

**方案A：Public URL（推荐）**

```typescript
const { data } = supabase.storage
  .from(bucket)
  .getPublicUrl(path);

const publicUrl = data.publicUrl;
// https://dpitlvjqgoixfozdpkji.supabase.co/storage/v1/object/public/assets-banners/2026/02/...
```

**方案B：Signed URL（更安全）**

```typescript
const { data, error } = await supabase.storage
  .from(bucket)
  .createSignedUrl(path, 3600); // 1小时有效期

const signedUrl = data?.signedUrl;
// https://dpitlvjqgoixfozdpkji.supabase.co/storage/v1/object/sign/assets-banners/2026/02/...?token=...
```

**对比**：

| 策略 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **Public URL** | 简单、快速、CDN友好 | 公开可访问 | ✅ B2B网站素材 |
| **Signed URL** | 安全、可控权限 | 需要定期刷新 | 🔒 敏感文档 |

**建议**：工业B2B网站的素材图片使用 **Public URL**。

---

## 6. 反查素材使用情况

### 6.1 查询单个素材的使用情况

**函数名**：`getAssetUsage`

**参数**：

```typescript
type GetAssetUsageParams = {
  assetId: string;
};
```

**返回值**：

```typescript
type GetAssetUsageResponse = {
  assetId: string;
  usageCount: number;
  placeholders: Array<{
    id: string;
    placeholder_key: string;
    page_path: string;
    updated_at: string;
  }>;
};
```

**实现逻辑**：

```typescript
async function getAssetUsage(params: GetAssetUsageParams): Promise<GetAssetUsageResponse> {
  const { assetId } = params;
  
  const { data, error } = await supabase
    .from('placeholders')
    .select('id, placeholder_key, page_path, updated_at')
    .eq('asset_id', assetId)
    .order('updated_at', { ascending: false });
  
  if (error) {
    throw new Error('QUERY_FAILED');
  }
  
  return {
    assetId,
    usageCount: data?.length || 0,
    placeholders: data || [],
  };
}
```

### 6.2 批量查询素材使用情况

**函数名**：`batchGetAssetUsage`

**参数**：

```typescript
type BatchGetAssetUsageParams = {
  assetIds: string[];
};
```

**返回值**：

```typescript
type BatchGetAssetUsageResponse = Map<string, string[]>; // assetId -> placeholder_keys
```

**实现逻辑**：

```typescript
async function batchGetAssetUsage(params: BatchGetAssetUsageParams): Promise<BatchGetAssetUsageResponse> {
  const { assetIds } = params;
  
  const { data, error } = await supabase
    .from('placeholders')
    .select('asset_id, placeholder_key')
    .in('asset_id', assetIds);
  
  if (error) {
    throw new Error('QUERY_FAILED');
  }
  
  // 构建 Map
  const usageMap = new Map<string, string[]>();
  data?.forEach(row => {
    if (row.asset_id) {
      if (!usageMap.has(row.asset_id)) {
        usageMap.set(row.asset_id, []);
      }
      usageMap.get(row.asset_id)!.push(row.placeholder_key);
    }
  });
  
  return usageMap;
}
```

### 6.3 统计 used/unused

**实现逻辑**：

```typescript
// 在 listAssets 中实现
if (params.usage === 'used') {
  // 子查询：获取所有被使用的 asset_id
  const { data: usedAssets } = await supabase
    .from('placeholders')
    .select('asset_id')
    .not('asset_id', 'is', null);
  
  const usedIds = [...new Set(usedAssets?.map(p => p.asset_id))];
  query = query.in('id', usedIds);
}

if (params.usage === 'unused') {
  // 反向查询：不在使用列表中的
  const { data: usedAssets } = await supabase
    .from('placeholders')
    .select('asset_id')
    .not('asset_id', 'is', null);
  
  const usedIds = [...new Set(usedAssets?.map(p => p.asset_id))];
  query = query.not('id', 'in', `(${usedIds.join(',')})`);
}
```

---

## 7. 前端页面调用清单

### 7.1 Asset Library Page

**需要调用的API**：

```typescript
// 1. 页面加载
const { rows, total } = await listAssets({
  type: filterType,
  approved: filterApproved,
  usage: filterUsage,
  q: searchTerm,
  limit: 20,
  offset: (page - 1) * 20,
});

// 2. 获取使用情况（用于卡片显示）
const usageMap = await batchGetAssetUsage({
  assetIds: rows.map(r => r.id),
});

// 3. 上传素材
const newAsset = await uploadAsset({
  file: selectedFile,
  title: assetTitle,
  type: assetType,
  tags: assetTags,
  approved: isApproved,
});

// 4. 更新素材
const updated = await updateAsset({
  id: asset.id,
  file_name: newTitle,
  category: newType,
  tags: newTags,
  status: newStatus,
});

// 5. 删除素材
const result = await deleteAsset({
  id: asset.id,
  force: false,
});
```

---

### 7.2 Placeholder Tracker Page

**需要调用的API**：

```typescript
// 1. 页面加载（带 join asset）
const { rows, total } = await listPlaceholders({
  page: filterPage,
  status: filterStatus,
  type: filterType,
  q: searchTerm,
  limit: 50,
  offset: (page - 1) * 50,
});

// 2. 绑定素材
const updated = await bindAssetToPlaceholder({
  placeholderId: placeholder.id,
  assetId: selectedAsset.id,
});

// 3. 解绑素材
const updated = await unbindPlaceholder({
  placeholderId: placeholder.id,
});

// 4. 批量初始化（管理员功能）
const result = await bulkUpsertPlaceholders([
  { placeholder_key: 'home.hero', page_path: '/home', ... },
  { placeholder_key: 'products.banner', page_path: '/products', ... },
  // ...
]);
```

---

## 8. 验收标准

### ✅ 功能验收清单

| 功能 | 验收条件 | 优先级 |
|------|----------|--------|
| **Asset Upload** | 能上传文件并生成 asset 记录（含 tags/type/status） | 🔥 P0 |
| **Asset List** | 能按 type/approved/usage 筛选 | 🔥 P0 |
| **Asset Update** | 能修改 title/tags/status | 🔥 P0 |
| **Asset Delete** | 被使用时能正确拦截 | 📋 P1 |
| **Placeholder List** | 能显示 missing/replaced 状态 | 🔥 P0 |
| **Placeholder Bind** | 只能绑定 approved 素材 | 🔥 P0 |
| **Placeholder Unbind** | 能解绑并回到 missing 状态 | 📋 P1 |
| **Usage Display** | Asset 卡片能显示使用情况（如 "home.hero"） | 🔥 P0 |
| **Frontend Display** | 前台页面能显示真实图（未绑定显示 placeholder） | 🔥 P0 |

### ✅ 数据验收清单

| 检查项 | 预期结果 | SQL 检查 |
|--------|----------|----------|
| `placeholder_key` 唯一 | 无重复 | `SELECT placeholder_key, COUNT(*) FROM placeholders GROUP BY placeholder_key HAVING COUNT(*) > 1` |
| `asset_id` 外键有效 | 所有 asset_id 都存在于 assets 表 | `SELECT * FROM placeholders WHERE asset_id IS NOT NULL AND asset_id NOT IN (SELECT id FROM assets)` |
| `status` 一致性 | `asset_id` 不为空时 status='replaced' | `SELECT * FROM placeholders WHERE asset_id IS NOT NULL AND status != 'replaced'` |
| `status='approved'` 才能绑定 | 所有绑定的素材都是 approved | `SELECT p.*, a.status FROM placeholders p JOIN assets a ON p.asset_id = a.id WHERE a.status != 'approved'` |

### ✅ 性能验收清单

| 指标 | 目标 | 测试方法 |
|------|------|----------|
| Asset 列表查询 | < 500ms | 100条记录 + 筛选 |
| Placeholder 列表查询 | < 800ms | 200条记录 + join assets |
| 上传素材 | < 3s | 5MB 图片 |
| 绑定素材 | < 300ms | 单次操作 |

---

## 9. 错误码清单

### 9.1 通用错误码

| 错误码 | HTTP | 说明 | 前端处理 |
|--------|------|------|----------|
| `UNAUTHORIZED` | 401 | 未登录 | 跳转登录页 |
| `FORBIDDEN` | 403 | 无权限 | 提示权限不足 |
| `NOT_FOUND` | 404 | 资源不存在 | 提示不存在 |
| `VALIDATION_ERROR` | 400 | 参数校验失败 | 显示错误消息 |
| `INTERNAL_ERROR` | 500 | 服务器错误 | 提示重试 |

### 9.2 Assets 错误码

| 错误码 | HTTP | 说明 | 前端处理 |
|--------|------|------|----------|
| `UPLOAD_FAILED` | 500 | Storage 上传失败 | 提示上传失败 |
| `DB_INSERT_FAILED` | 500 | 数据库插入失败 | 提示保存失败 |
| `INVALID_FILE_TYPE` | 400 | 文件类型不支持 | 提示文件类型错误 |
| `FILE_TOO_LARGE` | 400 | 文件超过大小限制 | 提示文件过大 |
| `ASSET_NOT_FOUND` | 404 | 素材不存在 | 提示素材不存在 |
| `ASSET_IN_USE` | 409 | 素材正在使用中 | 提示是否强制删除 |
| `UPDATE_FAILED` | 500 | 更新失败 | 提示重试 |
| `DELETE_FAILED` | 500 | 删除失败 | 提示重试 |

### 9.3 Placeholders 错误码

| 错误码 | HTTP | 说明 | 前端处理 |
|--------|------|------|----------|
| `PLACEHOLDER_NOT_FOUND` | 404 | 占位符不存在 | 提示占位符不存在 |
| `ASSET_NOT_APPROVED` | 403 | 素材未批准 | 提示选择已批准素材 |
| `BIND_FAILED` | 500 | 绑定失败 | 提示重试 |
| `UNBIND_FAILED` | 500 | 解绑失败 | 提示重试 |
| `DUPLICATE_KEY` | 409 | placeholder_key 重复 | 提示键重复 |

---

## 📊 附录：API 调用流程图

### A. 上传素材流程

```
用户选择文件
    ↓
前端校验（大小/类型）
    ↓
调用 uploadAsset()
    ↓
生成 Storage 路径
    ↓
上传到 Supabase Storage
    ↓
获取 Public URL
    ↓
插入 assets 表
    ↓
返回 asset 记录
    ↓
前端刷新列表
```

### B. 绑定素材流程

```
用户点击 "Bind"
    ↓
打开 BindAssetModal
    ↓
加载 approved assets
    ↓
用户选择素材
    ↓
调用 bindAssetToPlaceholder()
    ↓
检查 asset.status === 'approved'
    ↓
更新 placeholder（asset_id, status='replaced'）
    ↓
返回更新后的 placeholder
    ↓
前端刷新列表
```

---

## 📝 总结

**本合同涵盖**：
- ✅ 全局约定（Key规则、绑定规则、Storage规范）
- ✅ 数据表合同（最小字段集）
- ✅ Assets API（查询、上传、更新、删除）
- ✅ Placeholders API（查询、绑定、解绑、批量生成）
- ✅ Storage 规范（Bucket映射、路径生成、URL策略）
- ✅ 反查机制（单个/批量查询使用情况）
- ✅ 前端调用清单（两个页面的完整API调用）
- ✅ 验收标准（功能、数据、性能）
- ✅ 错误码清单（通用、Assets、Placeholders）

**交付给**：
- 🎯 前端开发团队
- 🎯 Figma Make
- 🎯 后台开发团队

**下一步**：
1. 前端按此合同实现 API 调用
2. 后台按此合同实现接口
3. 测试团队按验收标准验收

---

**版本**：1.0.0  
**日期**：2026-02-05  
**状态**：✅ 完成
