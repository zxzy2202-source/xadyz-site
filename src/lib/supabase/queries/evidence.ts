/**
 * 证据标签 CRUD（evidence_tags 表）
 */
import { supabase } from '../client';
import type { ListParams, ListResult, GetResult, MutateResult } from './types';
import { formatError } from './types';

export type EvidenceTag = {
  id: string;
  tag_key: string;
  tag_label: string;
  description: string | null;
  created_at: string;
};

export type EvidenceTagInsert = Omit<EvidenceTag, 'id' | 'created_at'> & Partial<Pick<EvidenceTag, 'id' | 'created_at'>>;

export type EvidenceTagUpdate = Partial<Omit<EvidenceTag, 'id' | 'created_at'>>;

export async function listEvidenceTags(params: ListParams = {}): Promise<ListResult<EvidenceTag>> {
  const { page = 1, pageSize = 50, q } = params;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  try {
    let query = supabase
      .from('evidence_tags')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);
    if (q && q.trim()) {
      query = query.or(`tag_key.ilike.%${q.trim()}%,tag_label.ilike.%${q.trim()}%`);
    }
    const { data, error, count } = await query;
    if (error && error.code !== 'PGRST116') return { data: [], page, pageSize, total: 0, error: error.message };
    return { data: (data ?? []) as EvidenceTag[], page, pageSize, total: count ?? 0 };
  } catch (e) {
    return { data: [], page, pageSize, total: 0, error: formatError(e) };
  }
}

export async function getEvidenceTag(id: string): Promise<GetResult<EvidenceTag>> {
  try {
    const { data, error } = await supabase.from('evidence_tags').select('*').eq('id', id).single();
    if (error) return { data: null, error: error.message };
    return { data: data as EvidenceTag };
  } catch (e) {
    return { data: null, error: formatError(e) };
  }
}

export async function createEvidenceTag(row: EvidenceTagInsert): Promise<MutateResult<EvidenceTag>> {
  try {
    const { data, error } = await supabase.from('evidence_tags').insert(row).select().single();
    if (error) return { error: error.message };
    return { data: data as EvidenceTag };
  } catch (e) {
    return { error: formatError(e) };
  }
}

export async function updateEvidenceTag(id: string, row: EvidenceTagUpdate): Promise<MutateResult<EvidenceTag>> {
  try {
    const { data, error } = await supabase.from('evidence_tags').update(row).eq('id', id).select().single();
    if (error) return { error: error.message };
    return { data: data as EvidenceTag };
  } catch (e) {
    return { error: formatError(e) };
  }
}

export async function deleteEvidenceTag(id: string): Promise<MutateResult<void>> {
  try {
    const { error } = await supabase.from('evidence_tags').delete().eq('id', id);
    if (error) return { error: error.message };
    return {};
  } catch (e) {
    return { error: formatError(e) };
  }
}
