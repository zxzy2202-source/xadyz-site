/**
 * 素材库 CRUD（assets 表）
 */
import { supabase } from '../client';
import type { ListParams, ListResult, GetResult, MutateResult } from './types';
import { formatError } from './types';

export type AssetType = 'banner' | 'factory' | 'product' | 'material' | 'qc' | 'packaging' | 'container' | 'document';

export type Asset = {
  id: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
  title: string;
  type: AssetType;
  tags: string[];
  usage_pages: string[];
  approved: boolean;
  notes: string | null;
  uploaded_by: string | null;
  uploaded_at?: string;
  evidence_tags?: string[];
  created_at: string;
  updated_at: string;
};

export type AssetInsert = Omit<Asset, 'id' | 'created_at' | 'updated_at'> & Partial<Pick<Asset, 'id' | 'created_at' | 'updated_at'>>;
export type AssetUpdate = Partial<Omit<Asset, 'id' | 'created_at'>>;

export interface AssetListParams extends ListParams {
  type?: string;
  approved?: boolean;
}

export async function listAssets(params: AssetListParams = {}): Promise<ListResult<Asset>> {
  const { page = 1, pageSize = 50, q, type, approved } = params;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  try {
    let query = supabase.from('assets').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(from, to);
    if (type) query = query.eq('type', type);
    if (typeof approved === 'boolean') query = query.eq('approved', approved);
    if (q && q.trim()) query = query.or('title.ilike.%' + q.trim() + '%,file_url.ilike.%' + q.trim() + '%');
    const { data, error, count } = await query;
    if (error) return { data: [], page, pageSize, total: 0, error: error.message };
    const normalized = (data ?? []).map((a: Record<string, unknown>) => ({ ...a, type: (a.type ?? a.asset_type) }));
    return { data: normalized as Asset[], page, pageSize, total: count ?? 0 };
  } catch (e) {
    return { data: [], page, pageSize, total: 0, error: formatError(e) };
  }
}

export async function getAsset(id: string): Promise<GetResult<Asset>> {
  try {
    const { data, error } = await supabase.from('assets').select('*').eq('id', id).single();
    if (error) return { data: null, error: error.message };
    const a = data as Record<string, unknown>;
    return { data: { ...a, type: a.type ?? a.asset_type } as Asset };
  } catch (e) {
    return { data: null, error: formatError(e) };
  }
}

export async function createAsset(row: AssetInsert): Promise<MutateResult<Asset>> {
  try {
    const { data, error } = await supabase.from('assets').insert(row).select().single();
    if (error) return { error: error.message };
    return { data: data as Asset };
  } catch (e) {
    return { error: formatError(e) };
  }
}

export async function updateAsset(id: string, row: AssetUpdate): Promise<MutateResult<Asset>> {
  try {
    const { data, error } = await supabase.from('assets').update(row).eq('id', id).select().single();
    if (error) return { error: error.message };
    return { data: data as Asset };
  } catch (e) {
    return { error: formatError(e) };
  }
}

export async function deleteAsset(id: string): Promise<MutateResult<void>> {
  try {
    const { error } = await supabase.from('assets').delete().eq('id', id);
    if (error) return { error: error.message };
    return {};
  } catch (e) {
    return { error: formatError(e) };
  }
}
