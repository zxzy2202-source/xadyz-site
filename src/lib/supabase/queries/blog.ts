/**
 * 博客文章 CRUD（blog_posts 表）
 */
import { supabase } from '../client';
import type { ListParams, ListResult, GetResult, MutateResult } from './types';
import { formatError } from './types';
import type { PostContent } from './blogContentSchema';

export type { PostContent } from './blogContentSchema';

export type BlogPost = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  language: 'en' | 'ru' | 'zh';
  excerpt: string | null;
  body: string | null;
  content: PostContent | Record<string, unknown> | null;
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
  ai_generated?: boolean;
  human_verified?: boolean;
  content_score?: number;
  /** Blog | Factory Journal */
  content_type?: string | null;
  /** weekly_update | client_solution | behind_scenes (when content_type=factory_journal) */
  journal_type?: string | null;
  /** Week start (Monday) for Factory Journal */
  week_of?: string | null;
  problem?: string | null;
  root_cause?: string | null;
  solution?: string | null;
  result?: string | null;
  client_region?: string | null;
  product_category?: string | null;
};

export type BlogPostInsert = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'> &
  Partial<Pick<BlogPost, 'id' | 'created_at' | 'updated_at'>>;

export type BlogPostUpdate = Partial<Omit<BlogPost, 'id' | 'created_at'>>;

export interface BlogListParams extends ListParams {
  language?: 'en' | 'ru' | 'zh';
  is_draft?: boolean;
  /** Filter by content_type: 'blog' | 'factory_journal' */
  content_type?: string | null;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUuid(id: string | undefined | null): id is string {
  return typeof id === 'string' && UUID_REGEX.test(id) && id !== 'undefined';
}

export async function listBlogPosts(params: BlogListParams = {}): Promise<ListResult<BlogPost>> {
  const { page = 1, pageSize = 50, q, language, is_draft, content_type } = params;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  try {
    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .order('updated_at', { ascending: false })
      .range(from, to);
    if (language) query = query.eq('language', language);
    if (typeof is_draft === 'boolean') query = query.eq('is_draft', is_draft);
    if (content_type) query = query.eq('content_type', content_type);
    if (q && q.trim()) {
      const term = q.trim();
      query = query.or(`title.ilike.%${term}%,slug.ilike.%${term}%,excerpt.ilike.%${term}%`);
    }
    const { data, error, count } = await query;
    if (error) return { data: [], page, pageSize, total: 0, error: error.message };
    return { data: (data ?? []) as BlogPost[], page, pageSize, total: count ?? 0 };
  } catch (e) {
    return { data: [], page, pageSize, total: 0, error: formatError(e) };
  }
}

export async function getBlogPost(id: string): Promise<GetResult<BlogPost>> {
  if (!isValidUuid(id)) {
    return { data: null, error: '无效的文章 ID' };
  }
  try {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (error) return { data: null, error: error.message };
    return { data: data as BlogPost };
  } catch (e) {
    return { data: null, error: formatError(e) };
  }
}

export async function createBlogPost(row: BlogPostInsert): Promise<MutateResult<BlogPost>> {
  try {
    const { data, error } = await supabase.from('blog_posts').insert(row).select().single();
    if (error) return { error: error.message };
    return { data: data as BlogPost };
  } catch (e) {
    return { error: formatError(e) };
  }
}

export async function updateBlogPost(id: string, row: BlogPostUpdate): Promise<MutateResult<BlogPost>> {
  if (!isValidUuid(id)) {
    return { error: '无效的文章 ID' };
  }
  try {
    const { data, error } = await supabase.from('blog_posts').update(row).eq('id', id).select().single();
    if (error) return { error: error.message };
    return { data: data as BlogPost };
  } catch (e) {
    return { error: formatError(e) };
  }
}

export async function deleteBlogPost(id: string): Promise<MutateResult<void>> {
  if (!isValidUuid(id)) {
    return { error: '无效的文章 ID' };
  }
  try {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) return { error: error.message };
    return {};
  } catch (e) {
    return { error: formatError(e) };
  }
}

/**
 * 检查同一 language 下 slug 是否已存在（用于后台表单的预检查）
 */
export async function checkBlogSlugExists(
  slug: string,
  language: 'en' | 'ru' | 'zh',
  excludeId?: string
): Promise<{ exists: boolean; error?: string }> {
  try {
    let query = supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .eq('language', language)
      .limit(1);

    if (excludeId && isValidUuid(excludeId)) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query;
    if (error) {
      return { exists: false, error: error.message };
    }
    return { exists: !!(data && data.length > 0) };
  } catch (e) {
    return { exists: false, error: formatError(e) };
  }
}
