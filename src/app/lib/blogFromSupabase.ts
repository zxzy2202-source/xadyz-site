/**
 * 从 Supabase blog_posts 表读取已发布博客，返回与 StrapiPost 兼容的结构，供列表/详情页复用。
 * 数据源优先级：Supabase → Strapi → 静态降级。
 */

import { supabasePublic } from '@/app/lib/supabasePublicClient';
import type { StrapiPost, StrapiMedia } from '@/app/lib/strapiClient';

type Lang = 'en' | 'ru' | 'zh';

interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  language: string;
  excerpt: string | null;
  body: string | null;
  category: string | null;
  cover_image_url: string | null;
  read_time: string | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  target_region: string | null;
  created_at: string;
  updated_at: string;
}

function rowToStrapiShape(row: BlogPostRow): StrapiPost {
  const coverImage: StrapiMedia | null = row.cover_image_url
    ? { id: 0, url: row.cover_image_url }
    : null;
  return {
    id: 0,
    documentId: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? undefined,
    body: row.body ?? undefined,
    coverImage,
    heroTitle: row.title,
    language: row.language as Lang,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    seoKeywords: row.seo_keywords ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at ?? undefined,
    category: row.category ?? undefined,
  };
}

/**
 * 获取指定语言下已发布的博客列表（按发布时间倒序）
 */
export async function fetchBlogPostsFromSupabase(lang: Lang, limit = 12): Promise<StrapiPost[]> {
  const { data, error } = await supabasePublic
    .from('blog_posts')
    .select('id, title, slug, language, excerpt, body, category, cover_image_url, read_time, published_at, seo_title, seo_description, seo_keywords, og_image_url, canonical_url, target_region, created_at, updated_at')
    .eq('language', lang)
    .eq('is_draft', false)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .or('content_type.eq.blog,content_type.is.null')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.warn('[blogFromSupabase] list', error);
    return [];
  }
  const rows = (data as BlogPostRow[]) ?? [];
  return rows.map(rowToStrapiShape);
}

/**
 * 根据 slug + 语言获取单篇已发布文章
 */
export async function fetchBlogPostBySlugFromSupabase(slug: string, lang: Lang): Promise<StrapiPost | null> {
  const { data, error } = await supabasePublic
    .from('blog_posts')
    .select('id, title, slug, language, excerpt, body, category, cover_image_url, read_time, published_at, seo_title, seo_description, seo_keywords, og_image_url, canonical_url, target_region, created_at, updated_at')
    .eq('slug', slug)
    .eq('language', lang)
    .eq('is_draft', false)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .or('content_type.eq.blog,content_type.is.null')
    .maybeSingle();

  if (error || !data) {
    if (error) console.warn('[blogFromSupabase] bySlug', error);
    return null;
  }
  return rowToStrapiShape(data as BlogPostRow);
}
