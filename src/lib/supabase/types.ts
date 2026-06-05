/**
 * 全局 Supabase 业务类型
 *
 * 基础 DB 类型（Asset、Placeholder、EvidenceTag）定义在各自的 queries 文件中。
 * 本文件只收录跨模块共用的业务层类型。
 */

// ── 从 queries 层统一转出，供外部直接从本文件导入 ──────────────────────────
export type { Asset, AssetType } from './queries/assets';
export type { Placeholder, PlaceholderType, PlaceholderStatus, PlaceholderPriority } from './queries/placeholders';
export type { EvidenceTag } from './queries/evidence';

// ── 用户与权限 ──────────────────────────────────────────────────────────────
export type RoleType = 'owner' | 'supervisor' | 'ops' | 'sales' | 'admin';

export type UserRole = {
  user_id: string;
  role: RoleType;
  created_at: string;
  updated_at: string;
};

// ── 素材与占位符关联视图 ────────────────────────────────────────────────────
export type AssetPlaceholderUsage = {
  asset_id: string;
  title: string;
  type: import('./queries/assets').AssetType;
  approved: boolean;
  file_url: string;
  placeholder_keys: string[];
};

export type PlaceholderWithAsset = import('./queries/placeholders').Placeholder & {
  bound_asset?: Pick<
    import('./queries/assets').Asset,
    'id' | 'file_url' | 'title' | 'type' | 'approved'
  > | null;
};

// ── 销售线索（leads 表） ────────────────────────────────────────────────────
export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'lost';

export type LeadType = 'tender' | 'distributor' | 'oem' | 'inquiry' | 'contact';

export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  company_name: string;
  contact_name: string | null;
  email: string;
  phone: string | null;
  country: string;
  lead_type: LeadType;
  lead_level: 'A' | 'B' | 'C' | null;
  status: LeadStatus;
  product_interest: string | null;
  products_interested?: string[] | null;
  estimated_value: number | null;
  notes: string | null;
  assigned_to: string | null;
  next_follow_up: string | null;
  source: string | null;
  utm_campaign: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  page_url: string | null;
};

export type LeadActivity = {
  id: string;
  lead_id: string;
  created_at: string;
  activity_type: 'note' | 'email' | 'call' | 'meeting' | 'status_change';
  content: string;
  user_id: string | null;
};

export type LeadFile = {
  id: string;
  lead_id: string;
  created_at: string;
  file_name: string;
  file_url: string;
  file_type: string;
  uploaded_by: string;
};

// ── 博客文章（blog_posts 表） ───────────────────────────────────────────────
export type BlogPost = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  language: 'en' | 'ru' | 'zh';
  excerpt: string | null;
  body: string | null;
  category: string | null;
  cover_image_url: string | null;
  read_time: string | null;
  published_at: string | null;
  is_draft: boolean;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  target_region: string | null;
  hreflang_alternates: Record<string, string> | null;
};
