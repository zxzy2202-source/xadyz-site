/**
 * 占位符 CRUD（placeholders 表）
 */
import { supabase } from '../client';
import type { ListParams, ListResult, GetResult, MutateResult } from './types';
import { formatError } from './types';

export type PlaceholderType = 'hero' | 'product' | 'industry' | 'proof' | 'background';
export type PlaceholderStatus = 'missing' | 'replaced';
export type PlaceholderPriority = 'high' | 'medium' | 'low';

export type Placeholder = {
  id: string;
  page_key?: string;
  section_key?: string;
  page_path?: string;
  section_name?: string;
  placeholder_key: string;
  placeholder_type: PlaceholderType;
  required_ratio?: string;
  required_size?: string | null;
  required_dimensions?: string | null;
  status: PlaceholderStatus;
  asset_id: string | null;
  priority?: PlaceholderPriority;
  description?: string | null;
  created_at: string;
  updated_at: string;
};

export type PlaceholderInsert = Omit<Placeholder, 'id' | 'created_at' | 'updated_at'> &
  Partial<Pick<Placeholder, 'id' | 'created_at' | 'updated_at'>>;

export type PlaceholderUpdate = Partial<Omit<Placeholder, 'id' | 'created_at'>>;

export interface PlaceholderListParams extends ListParams {
  status?: PlaceholderStatus;
  page_path?: string;
}

export async function listPlaceholders(params: PlaceholderListParams = {}): Promise<ListResult<Placeholder>> {
  const { page = 1, pageSize = 50, q, status, page_path } = params;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  try {
    let query = supabase
      .from('placeholders')
      .select('*', { count: 'exact' })
      .order('updated_at', { ascending: false })
      .range(from, to);
    if (status) query = query.eq('status', status);
    if (page_path) query = query.eq('page_path', page_path);
    if (q?.trim()) {
      query = query.or(`placeholder_key.ilike.%${q}%,page_path.ilike.%${q}%,section_name.ilike.%${q}%`);
    }
    const { data, error, count } = await query;
    if (error) return { data: [], page, pageSize, total: 0, error: error.message };
    return { data: (data ?? []) as Placeholder[], page, pageSize, total: count ?? 0 };
  } catch (e) {
    return { data: [], page, pageSize, total: 0, error: formatError(e) };
  }
}

export async function getPlaceholder(id: string): Promise<GetResult<Placeholder>> {
  try {
    const { data, error } = await supabase
      .from('placeholders')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return { data: null, error: error.message };
    return { data: data as Placeholder };
  } catch (e) {
    return { data: null, error: formatError(e) };
  }
}

export async function createPlaceholder(row: PlaceholderInsert): Promise<MutateResult<Placeholder>> {
  try {
    const { data, error } = await supabase.from('placeholders').insert(row).select().single();
    if (error) return { error: error.message };
    return { data: data as Placeholder };
  } catch (e) {
    return { error: formatError(e) };
  }
}

export async function updatePlaceholder(id: string, row: PlaceholderUpdate): Promise<MutateResult<Placeholder>> {
  try {
    const { data, error } = await supabase.from('placeholders').update(row).eq('id', id).select().single();
    if (error) return { error: error.message };
    return { data: data as Placeholder };
  } catch (e) {
    return { error: formatError(e) };
  }
}

export async function deletePlaceholder(id: string): Promise<MutateResult<void>> {
  try {
    const { error } = await supabase.from('placeholders').delete().eq('id', id);
    if (error) return { error: error.message };
    return {};
  } catch (e) {
    return { error: formatError(e) };
  }
}
