/**
 * 页面素材绑定 CRUD（placeholder_bindings 表）
 */
import { supabase } from '../client';
import type { ListParams, ListResult, GetResult, MutateResult } from './types';
import { formatError } from './types';

export type PlaceholderBinding = {
  id: string;
  placeholder_key: string;
  asset_id: string | null;
  page_path: string;
  element_name: string | null;
  last_updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type PlaceholderBindingInsert = Omit<PlaceholderBinding, 'id' | 'created_at' | 'updated_at'> &
  Partial<Pick<PlaceholderBinding, 'id' | 'created_at' | 'updated_at'>>;

export type PlaceholderBindingUpdate = Partial<Omit<PlaceholderBinding, 'id' | 'created_at'>>;

export interface PageAssetsListParams extends ListParams {
  page_path?: string;
}

export async function listPageAssets(params: PageAssetsListParams = {}): Promise<ListResult<PlaceholderBinding>> {
  const { page = 1, pageSize = 50, q, page_path } = params;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  try {
    let query = supabase
      .from('placeholder_bindings')
      .select('*', { count: 'exact' })
      .order('updated_at', { ascending: false })
      .range(from, to);
    if (page_path) query = query.eq('page_path', page_path);
    if (q?.trim()) {
      query = query.or(`placeholder_key.ilike.%${q}%,page_path.ilike.%${q}%`);
    }
    const { data, error, count } = await query;
    if (error) return { data: [], page, pageSize, total: 0, error: error.message };
    return { data: (data ?? []) as PlaceholderBinding[], page, pageSize, total: count ?? 0 };
  } catch (e) {
    return { data: [], page, pageSize, total: 0, error: formatError(e) };
  }
}

export async function getPageAsset(id: string): Promise<GetResult<PlaceholderBinding>> {
  try {
    const { data, error } = await supabase
      .from('placeholder_bindings')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return { data: null, error: error.message };
    return { data: data as PlaceholderBinding };
  } catch (e) {
    return { data: null, error: formatError(e) };
  }
}

export async function createPageAsset(row: PlaceholderBindingInsert): Promise<MutateResult<PlaceholderBinding>> {
  try {
    const { data, error } = await supabase.from('placeholder_bindings').insert(row).select().single();
    if (error) return { error: error.message };
    return { data: data as PlaceholderBinding };
  } catch (e) {
    return { error: formatError(e) };
  }
}

export async function updatePageAsset(id: string, row: PlaceholderBindingUpdate): Promise<MutateResult<PlaceholderBinding>> {
  try {
    const { data, error } = await supabase.from('placeholder_bindings').update(row).eq('id', id).select().single();
    if (error) return { error: error.message };
    return { data: data as PlaceholderBinding };
  } catch (e) {
    return { error: formatError(e) };
  }
}

export async function deletePageAsset(id: string): Promise<MutateResult<void>> {
  try {
    const { error } = await supabase.from('placeholder_bindings').delete().eq('id', id);
    if (error) return { error: error.message };
    return {};
  } catch (e) {
    return { error: formatError(e) };
  }
}
