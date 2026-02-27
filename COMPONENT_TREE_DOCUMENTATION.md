# 🎛 组件树文档 - Admin Assets 模块

## 📋 概述

按照 Figma 组件树标准实现的完整 React 组件库，确保设计和代码 1:1 对应。

**组件命名规范**：
```
Admin/ComponentName   → 基础组件
Assets/ComponentName  → Assets 专用组件
```

---

## 一、基础组件库（Admin/）

### 1️⃣ Admin/Button

**文件**：`/src/admin/app/components/base/Button.tsx`

**Variants**：
- `primary` - 主要按钮（蓝色）
- `secondary` - 次要按钮（灰色）
- `ghost` - 幽灵按钮（透明）
- `danger` - 危险按钮（红色）

**Sizes**：
- `sm` - 小型
- `md` - 中型（默认）
- `lg` - 大型

**States**：
- `default` - 默认
- `hover` - 悬停
- `disabled` - 禁用
- `loading` - 加载中

**Props**：
```typescript
{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}
```

**使用示例**：
```tsx
<Button variant="primary" icon={<Upload />} loading={uploading}>
  Upload Asset
</Button>
```

---

### 2️⃣ Admin/Badge

**文件**：`/src/admin/app/components/base/Badge.tsx`

**Variants（Status）**：
- `approved` - 已批准（绿色）
- `pending` - 待审核（黄色）
- `rejected` - 已拒绝（红色）
- `missing` - 缺失（红色）
- `replaced` - 已替换（绿色）

**Variants（Type）**：
- `banner` - banner 类型（蓝色）
- `factory` - 工厂类型（紫色）
- `product` - 产品类型（靛蓝）
- `material` - 材料类型（青色）
- `qc` - 质检类型（橙色）
- `document` - 文档类型（灰色）
- `hero` - Hero 类型（粉色）
- `icon` - 图标类型（青色）

**Props**：
```typescript
{
  variant: BadgeVariant;
  label?: string;
  showIcon?: boolean;
  className?: string;
}
```

**使用示例**：
```tsx
<Badge variant="approved" />
<Badge variant="factory" label="factory-photo" showIcon={false} />
```

---

### 3️⃣ Admin/Modal

**文件**：`/src/admin/app/components/base/Modal.tsx`

**Slots**：
- `Header` - 标题区域
- `Body` - 内容区域（children）
- `Footer` - 底部操作区域

**Sizes**：
- `sm` - max-w-md
- `md` - max-w-lg
- `lg` - max-w-2xl（默认）
- `xl` - max-w-4xl
- `2xl` - max-w-5xl

**Props**：
```typescript
{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}
```

**使用示例**：
```tsx
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Upload Asset"
  subtitle="Add a new asset to the library"
  footer={
    <>
      <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      <Button variant="primary" onClick={onConfirm}>Upload</Button>
    </>
  }
>
  {/* Modal content */}
</Modal>
```

---

### 4️⃣ Admin/EmptyState

**文件**：`/src/admin/app/components/base/EmptyState.tsx`

**Variants**：
- `no-assets` - 无素材
- `no-placeholders` - 无占位符
- `no-results` - 无搜索结果

**Props**：
```typescript
{
  variant: 'no-assets' | 'no-placeholders' | 'no-results';
  title?: string;
  description?: string;
  action?: React.ReactNode;
}
```

**使用示例**：
```tsx
<EmptyState 
  variant="no-assets"
  action={<Button onClick={onUpload}>Upload First Asset</Button>}
/>
```

---

### 5️⃣ Admin/LoadingState

**文件**：`/src/admin/app/components/base/LoadingState.tsx`

**Variants**：
- `cards` - 卡片骨架屏
- `table` - 表格骨架屏

**Props**：
```typescript
{
  variant: 'cards' | 'table';
  count?: number; // 显示多少个骨架，默认3
}
```

**使用示例**：
```tsx
{loading ? (
  <LoadingState variant="cards" count={4} />
) : (
  <AssetGrid assets={assets} />
)}
```

---

## 二、Asset Library 组件（Assets/）

### 1️⃣ Assets/AssetCard

**文件**：`/src/admin/app/components/assets/AssetCard.tsx`

**结构**：
```
AssetCard
 ├─ Thumbnail（缩略图 + 悬停操作）
 ├─ Meta
 │   ├─ Title（文件名）
 │   ├─ TypeBadge（类型徽章）
 │   ├─ TagList（普通标签）
 │   ├─ EvidenceTagList（证据标签）
 │   ├─ UsageList（使用情况）
 │   └─ StatusBadge（状态徽章）
 └─ Actions
     └─ ApproveButton（审核按钮）
```

**Variants（自动）**：
- `approved / pending`
- `used / unused`
- `image / document`

**Props**：
```typescript
{
  asset: Asset;
  usage: string[]; // placeholder keys
  onView: (asset: Asset) => void;
  onDelete: (asset: Asset) => void;
  onToggleApproved?: (asset: Asset) => void;
  canApprove?: boolean;
}
```

---

### 2️⃣ Assets/AssetGrid

**文件**：`/src/admin/app/components/assets/AssetGrid.tsx`

**功能**：
- 响应式 Grid 布局（1-4列）
- 空状态处理
- 自动计算列数

**Props**：
```typescript
{
  assets: Asset[];
  usage: Map<string, string[]>; // assetId -> placeholder keys
  onView: (asset: Asset) => void;
  onDelete: (asset: Asset) => void;
  onToggleApproved?: (asset: Asset) => void;
  canApprove?: boolean;
}
```

---

### 3️⃣ Assets/AssetToolbar

**文件**：`/src/admin/app/components/assets/AssetToolbar.tsx`

**子组件**：
- `SearchInput` - 搜索框
- `FilterDropdown（Type）` - 类型筛选
- `FilterDropdown（Approved）` - 状态筛选
- `FilterDropdown（Usage）` - 使用情况筛选
- `Button（Upload Asset）` - 上传按钮

**Props**：
```typescript
{
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
  filterApproved: string;
  onFilterApprovedChange: (value: string) => void;
  filterUsage: string;
  onFilterUsageChange: (value: string) => void;
  onUploadClick?: () => void;
  canUpload?: boolean;
}
```

---

## 三、Placeholder Tracker 组件（Assets/）

### 1️⃣ Assets/PlaceholderRow

**文件**：`/src/admin/app/components/assets/PlaceholderRow.tsx`

**字段（9列）**：
| Column | 组件 | 说明 |
|--------|------|------|
| Page | Text | 页面名称 |
| Section | Text | 区块名称 |
| Placeholder Key | CodeText | 占位符键 |
| Type | Badge | 类型徽章 |
| Required Ratio | Text | 推荐比例 |
| Status | Badge | 状态（missing/replaced） |
| Bound Asset | Thumbnail | 绑定的素材缩略图 |
| Priority | Select | 优先级下拉选择 |
| Action | Button | Bind/Unbind按钮 |

**Variants（自动）**：
- `status: missing | replaced`
- `hasAsset: true | false`

**Props**：
```typescript
{
  placeholder: Placeholder;
  boundAsset: Asset | null;
  onBind: (placeholder: Placeholder) => void;
  onUnbind: (placeholder: Placeholder) => void;
  onPriorityChange: (placeholder: Placeholder, priority: Placeholder['priority']) => void;
}
```

---

### 2️⃣ Assets/PlaceholderTable

**文件**：`/src/admin/app/components/assets/PlaceholderTable.tsx`

**结构**：
```
PlaceholderTable
 ├─ TableHeader（9列表头）
 ├─ TableBody
 │   └─ PlaceholderRow[]
 └─ EmptyState（无数据时）
```

**Props**：
```typescript
{
  placeholders: Placeholder[];
  assets: Map<string, Asset>; // assetId -> asset
  onBind: (placeholder: Placeholder) => void;
  onUnbind: (placeholder: Placeholder) => void;
  onPriorityChange: (placeholder: Placeholder, priority: Placeholder['priority']) => void;
}
```

---

### 3️⃣ Assets/PlaceholderFilterBar

**文件**：`/src/admin/app/components/assets/PlaceholderFilterBar.tsx`

**子组件**：
- `SearchInput` - 搜索框
- `Select（Page）` - 页面筛选
- `Select（Status）` - 状态筛选
- `Select（Type）` - 类型筛选

**Props**：
```typescript
{
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterPage: string;
  onFilterPageChange: (value: string) => void;
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
}
```

---

### 4️⃣ Assets/AssetSelector

**文件**：`/src/admin/app/components/assets/AssetSelector.tsx`

**功能**：
- ✅ 只显示 `approved=true` 的素材
- ✅ Auto-filter by placeholder type
- ✅ 搜索功能
- ✅ Grid 布局
- ✅ 选中高亮

**逻辑规则**：
```typescript
// 1. 只显示已批准素材
assets.filter(a => a.approved === true)

// 2. 如果 placeholder 有 type，自动过滤
if (placeholderType) {
  assets.filter(a => a.category === placeholderType || a.category === null)
}

// 3. 支持搜索
assets.filter(a => 
  a.file_name.includes(searchTerm) ||
  a.tags.includes(searchTerm)
)
```

**Props**：
```typescript
{
  assets: Asset[]; // Only approved
  selectedAssetId: string;
  onSelectAsset: (assetId: string) => void;
  placeholderType?: string | null; // For auto-filtering
}
```

**使用示例**：
```tsx
<AssetSelector
  assets={approvedAssets}
  selectedAssetId={selectedId}
  onSelectAsset={setSelectedId}
  placeholderType={placeholder.placeholder_type}
/>
```

---

## 四、组件导入规范

### ✅ 正确的导入方式

```typescript
// 基础组件
import { Button, Badge, Modal, EmptyState, LoadingState } from '@/admin/app/components/base';

// Assets 组件
import { 
  AssetCard, 
  AssetGrid, 
  AssetToolbar,
  PlaceholderRow,
  PlaceholderTable,
  PlaceholderFilterBar,
  AssetSelector 
} from '@/admin/app/components/assets';
```

### ❌ 错误的导入方式

```typescript
// 不要直接导入组件文件
import { Button } from '@/admin/app/components/base/Button';

// 使用 index.ts 统一导出
import { Button } from '@/admin/app/components/base';
```

---

## 五、Figma → React 映射表

| Figma 组件名 | React 文件路径 | 导入方式 |
|-------------|---------------|---------|
| `Admin/Button` | `/base/Button.tsx` | `import { Button } from '@/admin/app/components/base'` |
| `Admin/Badge` | `/base/Badge.tsx` | `import { Badge } from '@/admin/app/components/base'` |
| `Admin/Modal` | `/base/Modal.tsx` | `import { Modal } from '@/admin/app/components/base'` |
| `Admin/EmptyState` | `/base/EmptyState.tsx` | `import { EmptyState } from '@/admin/app/components/base'` |
| `Admin/LoadingState` | `/base/LoadingState.tsx` | `import { LoadingState } from '@/admin/app/components/base'` |
| `Assets/AssetCard` | `/assets/AssetCard.tsx` | `import { AssetCard } from '@/admin/app/components/assets'` |
| `Assets/AssetGrid` | `/assets/AssetGrid.tsx` | `import { AssetGrid } from '@/admin/app/components/assets'` |
| `Assets/AssetToolbar` | `/assets/AssetToolbar.tsx` | `import { AssetToolbar } from '@/admin/app/components/assets'` |
| `Assets/PlaceholderRow` | `/assets/PlaceholderRow.tsx` | `import { PlaceholderRow } from '@/admin/app/components/assets'` |
| `Assets/PlaceholderTable` | `/assets/PlaceholderTable.tsx` | `import { PlaceholderTable } from '@/admin/app/components/assets'` |
| `Assets/PlaceholderFilterBar` | `/assets/PlaceholderFilterBar.tsx` | `import { PlaceholderFilterBar } from '@/admin/app/components/assets'` |
| `Assets/AssetSelector` | `/assets/AssetSelector.tsx` | `import { AssetSelector } from '@/admin/app/components/assets'` |

---

## 六、组件使用示例

### Asset Library 页面组装

```tsx
import { Button, Badge, Modal, EmptyState, LoadingState } from '@/admin/app/components/base';
import { AssetCard, AssetGrid, AssetToolbar } from '@/admin/app/components/assets';

function AssetLibraryPage() {
  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <AssetToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterType={filterType}
        onFilterTypeChange={setFilterType}
        filterApproved={filterApproved}
        onFilterApprovedChange={setFilterApproved}
        filterUsage={filterUsage}
        onFilterUsageChange={setFilterUsage}
        onUploadClick={() => setShowUploadModal(true)}
        canUpload={canUpload}
      />

      {/* Grid */}
      {loading ? (
        <LoadingState variant="cards" />
      ) : (
        <AssetGrid
          assets={assets}
          usage={usageMap}
          onView={handleView}
          onDelete={handleDelete}
          onToggleApproved={handleToggleApproved}
          canApprove={canApprove}
        />
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Asset"
        footer={
          <>
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" onClick={handleUpload}>Upload</Button>
          </>
        }
      >
        {/* Upload form */}
      </Modal>
    </div>
  );
}
```

### Placeholder Tracker 页面组装

```tsx
import { Button, Modal, LoadingState } from '@/admin/app/components/base';
import { PlaceholderTable, PlaceholderFilterBar, AssetSelector } from '@/admin/app/components/assets';

function PlaceholderTrackerPage() {
  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <PlaceholderFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterPage={filterPage}
        onFilterPageChange={setFilterPage}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        filterType={filterType}
        onFilterTypeChange={setFilterType}
      />

      {/* Table */}
      {loading ? (
        <LoadingState variant="table" />
      ) : (
        <PlaceholderTable
          placeholders={placeholders}
          assets={assetsMap}
          onBind={handleBind}
          onUnbind={handleUnbind}
          onPriorityChange={handlePriorityChange}
        />
      )}

      {/* Bind Modal */}
      <Modal
        isOpen={!!bindingPlaceholder}
        onClose={() => setBindingPlaceholder(null)}
        title="Bind Asset to Placeholder"
        size="2xl"
        footer={
          <>
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" onClick={handleConfirmBind}>Confirm Bind</Button>
          </>
        }
      >
        <AssetSelector
          assets={approvedAssets}
          selectedAssetId={selectedAssetId}
          onSelectAsset={setSelectedAssetId}
          placeholderType={bindingPlaceholder?.placeholder_type}
        />
      </Modal>
    </div>
  );
}
```

---

## 七、设计Token（预留）

### 颜色系统
```typescript
// Status Colors
approved: green-600
pending: yellow-600
rejected: red-600
missing: red-600
replaced: green-600

// Type Colors
banner: blue-600
factory: purple-600
product: indigo-600
material: teal-600
qc: orange-600
document: gray-600
hero: pink-600
icon: cyan-600
```

### 间距系统
```typescript
gap-2: 0.5rem
gap-3: 0.75rem
gap-4: 1rem
gap-6: 1.5rem

p-4: 1rem
p-5: 1.25rem
p-6: 1.5rem
```

---

## 八、组件清单

### ✅ 已完成

**基础组件（5个）**：
- [x] Admin/Button
- [x] Admin/Badge
- [x] Admin/Modal
- [x] Admin/EmptyState
- [x] Admin/LoadingState

**Assets组件（7个）**：
- [x] Assets/AssetCard
- [x] Assets/AssetGrid
- [x] Assets/AssetToolbar
- [x] Assets/PlaceholderRow
- [x] Assets/PlaceholderTable
- [x] Assets/PlaceholderFilterBar
- [x] Assets/AssetSelector

**总计**：12个组件 ✅

---

## 九、后续可扩展组件

### 未来 Phase 2
- [ ] Assets/UploadAssetModal（完整的上传表单组件）
- [ ] Assets/BindAssetModal（完整的绑定弹窗组件）
- [ ] Admin/StatsCard（统计卡片组件）
- [ ] Admin/PageHeader（页面头部组件）
- [ ] Admin/Pagination（分页组件）
- [ ] Assets/EvidenceTagManager（证据标签管理器）

---

**完成时间**：2026-02-05  
**组件库版本**：1.0.0  
**状态**：生产就绪 ✅

---

## 🎉 使用建议

1. **所有新页面**都使用这些组件拼装
2. **不要**在页面里直接写样式
3. **不要**在页面里出现图片URL
4. **使用**组件的 variants 和 props 控制样式
5. **保持** Figma 和 React 命名一致

这样可以确保：
✅ 设计和代码1:1对应  
✅ 组件高度复用  
✅ 避免后续返工  
✅ 易于维护和扩展
