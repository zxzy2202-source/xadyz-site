/**
 * Admin Supabase 客户端（转发层）
 *
 * 真正的客户端实例在 `src/lib/supabase/client.ts`，此处只做转发，
 * 确保 admin 模块内所有文件的 import 路径无需更改。
 */
export { supabase } from '@/lib/supabase/client';

export type {
  RoleType,
  UserRole,
  AssetType,
  Asset,
  PlaceholderType,
  PlaceholderStatus,
  PlaceholderPriority,
  Placeholder,
  AssetPlaceholderUsage,
  PlaceholderWithAsset,
  LeadStatus,
  LeadType,
  Lead,
  LeadActivity,
  LeadFile,
  EvidenceTag,
  BlogPost,
} from '@/lib/supabase/types';
