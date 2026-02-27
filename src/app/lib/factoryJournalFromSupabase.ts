/**
 * Factory Journal 从 Supabase blog_posts 读取
 * 复用 blog_posts 表，content_type = 'factory_journal'
 */

import { supabasePublic } from '@/app/lib/supabasePublicClient';

export type Lang = 'en' | 'ru' | 'zh';

export type FactoryEntryType = 'weekly_update' | 'client_solution' | 'behind_scenes';

export interface FactoryJournalTag {
  id: string;
  name: string;
  slug: string;
}

export interface FactoryJournalMedia {
  id: string;
  url: string;
  alt: string | null;
  caption: string | null;
  sort_order: number;
  media_type: 'image' | 'video';
}

export interface FactoryJournalEntry {
  id: string;
  locale: Lang;
  entry_type: FactoryEntryType;
  slug: string;
  title: string;
  summary: string | null;
  body_md: string | null;
  week_of: string | null;
  client_region: string | null;
  product_category: string | null;
  problem: string | null;
  root_cause: string | null;
  solution: string | null;
  result: string | null;
  cover_image_url: string | null;
  cover_alt: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags?: FactoryJournalTag[];
  media?: FactoryJournalMedia[];
}

interface ListParams {
  locale: Lang;
  entry_type?: FactoryEntryType;
  tag_slug?: string;
  limit?: number;
  offset?: number;
}

interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  language: string;
  excerpt: string | null;
  body: string | null;
  category: string | null;
  cover_image_url: string | null;
  week_of: string | null;
  client_region: string | null;
  product_category: string | null;
  problem: string | null;
  root_cause: string | null;
  solution: string | null;
  result: string | null;
  journal_type: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

function rowToEntry(row: BlogPostRow): FactoryJournalEntry {
  const tags: FactoryJournalTag[] = row.category
    ? row.category.split(',').map((c, i) => ({
        id: `cat-${i}`,
        name: c.trim(),
        slug: c.trim().toLowerCase().replace(/\s+/g, '-'),
      }))
    : [];

  const media: FactoryJournalMedia[] = row.cover_image_url
    ? [{ id: 'cover', url: row.cover_image_url, alt: null, caption: null, sort_order: 0, media_type: 'image' as const }]
    : [];

  return {
    id: row.id,
    locale: (row.language || 'en') as Lang,
    entry_type: (row.journal_type || 'weekly_update') as FactoryEntryType,
    slug: row.slug,
    title: row.title,
    summary: row.excerpt,
    body_md: row.body,
    week_of: row.week_of,
    client_region: row.client_region,
    product_category: row.product_category,
    problem: row.problem,
    root_cause: row.root_cause,
    solution: row.solution,
    result: row.result,
    cover_image_url: row.cover_image_url,
    cover_alt: null,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
    tags,
    media,
  };
}

/**
 * 获取已发布的 Factory Journal 列表（来自 blog_posts）
 */
export async function fetchFactoryJournalList(params: ListParams): Promise<FactoryJournalEntry[]> {
  const { locale, entry_type, tag_slug, limit = 12, offset = 0 } = params;

  let query = supabasePublic
    .from('blog_posts')
    .select(
      'id, title, slug, language, excerpt, body, category, cover_image_url, week_of, client_region, product_category, problem, root_cause, solution, result, journal_type, published_at, created_at, updated_at'
    )
    .eq('language', locale)
    .eq('content_type', 'factory_journal')
    .eq('is_draft', false)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('week_of', { ascending: false, nullsFirst: false })
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (entry_type) {
    query = query.eq('journal_type', entry_type);
  }

  if (tag_slug) {
    const search = tag_slug.replace(/-/g, ' ');
    query = query.ilike('category', `%${search}%`);
  }

  const { data: rows, error } = await query;

  if (error) {
    console.warn('[factoryJournalFromSupabase] list', error);
    return [];
  }

  return (rows ?? []).map((r) => rowToEntry(r as BlogPostRow));
}

/**
 * 按 slug + locale 获取单条详情
 */
export async function fetchFactoryJournalBySlug(
  slug: string,
  locale: Lang
): Promise<FactoryJournalEntry | null> {
  const { data: row, error } = await supabasePublic
    .from('blog_posts')
    .select(
      'id, title, slug, language, excerpt, body, category, cover_image_url, week_of, client_region, product_category, problem, root_cause, solution, result, journal_type, published_at, created_at, updated_at'
    )
    .eq('slug', slug)
    .eq('language', locale)
    .eq('content_type', 'factory_journal')
    .eq('is_draft', false)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .maybeSingle();

  if (error || !row) {
    if (error) console.warn('[factoryJournalFromSupabase] bySlug', error);
    return null;
  }

  return rowToEntry(row as BlogPostRow);
}

/**
 * 获取常用标签（基于 category 去重，可后续扩展为独立表）
 */
export async function fetchFactoryJournalTags(): Promise<FactoryJournalTag[]> {
  const { data, error } = await supabasePublic
    .from('blog_posts')
    .select('category')
    .eq('content_type', 'factory_journal')
    .not('category', 'is', null);

  if (error) {
    console.warn('[factoryJournalFromSupabase] tags', error);
    return [];
  }

  const seen = new Set<string>();
  const tags: FactoryJournalTag[] = [];
  for (const r of data ?? []) {
    const cats = (r.category || '').split(',').map((c: string) => c.trim()).filter(Boolean);
    for (const c of cats) {
      const slug = c.toLowerCase().replace(/\s+/g, '-');
      if (!seen.has(slug)) {
        seen.add(slug);
        tags.push({ id: slug, name: c, slug });
      }
    }
  }
  tags.sort((a, b) => a.name.localeCompare(b.name));
  return tags;
}

/**
 * 格式化 week_of（周一日期 YYYY-MM-DD）为可读周次与日期范围
 * 使用本地时间解析避免时区导致的日期错位
 */
export function formatWeekOf(weekOf: string | null, locale: Lang): { week: string; date: string } {
  if (!weekOf) return { week: '', date: '' };
  const [y, m, d] = weekOf.split('-').map(Number);
  const mon = new Date(y, m - 1, d);
  const sun = new Date(mon);
  sun.setDate(sun.getDate() + 6);

  const fmt = (x: Date) =>
    x.toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'ru' ? 'ru-RU' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const weekNum = Math.ceil(
    (mon.getTime() - new Date(mon.getFullYear(), 0, 1).getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  );
  const weekLabel =
    locale === 'zh' ? `第 ${weekNum} 周` : locale === 'ru' ? `Неделя ${weekNum}` : `Week ${weekNum}`;

  return {
    week: weekLabel,
    date: `${fmt(mon)} – ${fmt(sun)}`,
  };
}
