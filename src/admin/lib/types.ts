/**
 * Admin UI 层类型（选项、过滤器、统计等）
 * 注意：数据库 Row 类型统一来自 src/lib/supabase/queries/*
 */

import type {
  Asset as DbAsset,
  AssetType,
} from '@/lib/supabase/queries/assets';
import type {
  Placeholder as DbPlaceholder,
  PlaceholderType,
  PlaceholderStatus,
  PlaceholderPriority,
} from '@/lib/supabase/queries/placeholders';

// ============================================================
// 1. Admin 侧 Asset 展示 / 过滤类型
// ============================================================

/**
 * Admin 侧使用的资产分类（UI 维度），与数据库中的 AssetType 保持一致
 */
export type AdminAssetCategory = AssetType;

export type AssetStatus = 'pending' | 'approved' | 'rejected';

/**
 * Admin 资产表格展示用的行类型
 * 在 DbAsset 基础上扩展 UI 状态字段时，可在此类型上继续扩展
 */
export type AdminAssetRecord = DbAsset & {
  // UI-only 字段可以按需补充，例如：
  // isSelected?: boolean;
};

// ============================================================
// 2. Admin 侧 Placeholder 展示 / 过滤类型
// ============================================================

/**
 * Admin 侧使用的占位符分类（UI 维度），与数据库中的 PlaceholderType 保持一致
 */
export type AdminPlaceholderCategory = PlaceholderType;

export type AdminPlaceholderRecord = DbPlaceholder;

// ============================================================
// 3. UI Component Props Types
// ============================================================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type BadgeVariant =
  | 'approved'
  | 'pending'
  | 'rejected'
  | 'missing'
  | 'replaced'
  | 'banner'
  | 'factory'
  | 'product'
  | 'material'
  | 'qc'
  | 'document'
  | 'hero'
  | 'icon';

export type EmptyStateVariant = 'no-assets' | 'no-placeholders' | 'no-results';

// ============================================================
// 4. Filter Types
// ============================================================

export type AdminAssetFilter = AdminAssetCategory | 'all';
export type AssetApprovedFilter = 'all' | 'approved' | 'pending';
export type AssetUsageFilter = 'all' | 'used' | 'unused';

export type PlaceholderPageFilter = string | 'all';
export type PlaceholderStatusFilter = 'all' | 'missing' | 'replaced';
export type AdminPlaceholderFilter = AdminPlaceholderCategory | 'all';

// ============================================================
// 5. Form Payload Types
// ============================================================

export type UploadAssetPayload = {
  file: File;
  title: string;
  type: AdminAssetCategory;
  tags: string[];
  evidence_tags?: string[];
  approved: boolean;
  notes?: string;
};

export type EditAssetPayload = {
  id: string;
  title: string;
  type: AdminAssetCategory;
  tags: string[];
  evidence_tags?: string[];
  approved: boolean;
  notes?: string;
};

export type BindAssetPayload = {
  placeholderId: string;
  assetId: string;
};

// ============================================================
// 6. Stats Types
// ============================================================

export type AssetStats = {
  total: number;
  approved: number;
  pending: number;
  used: number;
};

export type PlaceholderStats = {
  total: number;
  missing: number;
  replaced: number;
  high_priority: number;
};

// ============================================================
// 7. Evidence Tag Options (预设)
// ============================================================

export const EVIDENCE_TAG_OPTIONS = [
  'factory_real',
  'production_line',
  'qc_process',
  'container_loading',
  'warehouse_stock',
  'slitting_machine',
  'printing_process',
  'packaging_line',
  'quality_inspection',
  'material_testing',
] as const;

// 预设证据标签的「键名」类型，避免与数据库行类型 EvidenceTag 混淆
export type EvidenceTagKey = (typeof EVIDENCE_TAG_OPTIONS)[number];

// ============================================================
// 8. Asset Type Options (预设)
// ============================================================

export const ASSET_CATEGORY_OPTIONS: AdminAssetCategory[] = [
  'banner',
  'factory',
  'product',
  'material',
  'qc',
  'packaging',
  'container',
  'document',
  'icon',
  'team',
];

// ============================================================
// 9. Placeholder Type Options (预设)
// ============================================================

export const PLACEHOLDER_CATEGORY_OPTIONS: AdminPlaceholderCategory[] = [
  'hero',
  'product',
  'factory',
  'banner',
  'icon',
  'industry',
  'proof',
  'background',
  'other',
];

// ============================================================
// 10. Page Options (预设)
// ============================================================

export const PAGE_OPTIONS = [
  'home',
  'products',
  'material-supply',
  'manufacturing',
  'applications',
  'government-tenders',
  'quality-control',
  'packaging-loading',
  'about',
  'contact',
] as const;

export type PageKey = (typeof PAGE_OPTIONS)[number];
