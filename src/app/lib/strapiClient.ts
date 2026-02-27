/**
 * Strapi REST API 客户端
 * 用于获取博客文章、素材等 Headless CMS 数据
 *
 * 环境变量：VITE_STRAPI_URL（如 http://localhost:1337）
 * 未配置时相关 API 返回空数据，页面使用静态内容作为降级
 */

const BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_STRAPI_URL
  ? String(import.meta.env.VITE_STRAPI_URL).replace(/\/$/, '')
  : '';

// --- 类型定义 ---

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

export interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  body?: string | null;
  coverImage?: StrapiMedia | null;
  // 统一 Hero / SEO 相关可选字段（若在 Strapi 中配置则会被使用）
  heroTitle?: string | null;
  heroEyebrow?: string | null;
  heroDescription?: string | null;
  heroImage?: StrapiMedia | null;
  language?: 'en' | 'ru' | 'zh' | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
  category?: string | null;
}

export interface StrapiAsset {
  id: number;
  documentId: string;
  title: string;
  assetType?: 'banner' | 'factory' | 'product' | 'material' | 'document' | null;
  tags?: string[] | Record<string, unknown> | null;
  approved?: boolean;
  notes?: string | null;
  media?: StrapiMedia | null;
}

export interface StrapiResponse<T> {
  data: T | T[] | null;
  meta?: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } };
}

/** 将 Strapi 媒体 URL 转为完整 URL */
function resolveMediaUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return BASE_URL ? `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}` : undefined;
}

/** 通用 GET 请求 */
async function strapiFetch<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<StrapiResponse<T>> {
  if (!BASE_URL) {
    return { data: null };
  }
  const search = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') search.set(k, String(v));
    });
  }
  const qs = search.toString();
  const url = `${BASE_URL}${path}${qs ? `?${qs}` : ''}`;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Strapi ${res.status}`);
    const json = await res.json();
    return json as StrapiResponse<T>;
  } catch (e) {
    console.warn('[Strapi]', path, e);
    return { data: null };
  }
}

// --- API 方法 ---

/**
 * 获取已发布的博客文章列表
 * @param limit 数量限制，默认 12
 * @param populate 要 populate 的字段
 */
export async function fetchStrapiPosts(options?: {
  limit?: number;
  sort?: string;
  populate?: string;
}): Promise<StrapiPost[]> {
  const { limit = 12, sort = 'publishedAt:desc', populate = 'coverImage,heroImage' } = options ?? {};
  const res = await strapiFetch<StrapiPost[]>(`/api/posts`, {
    'populate': populate,
    'sort': sort,
    'pagination[pageSize]': limit,
    'publicationState': 'live',
  });
  const raw = res.data;
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return list.map((p) => ({
    ...p,
    coverImage: p.coverImage
      ? { ...p.coverImage, url: resolveMediaUrl((p.coverImage as { url?: string }).url) ?? (p.coverImage as StrapiMedia).url }
      : null,
    heroImage: p.heroImage
      ? { ...p.heroImage, url: resolveMediaUrl((p.heroImage as { url?: string }).url) ?? (p.heroImage as StrapiMedia).url }
      : null,
  }));
}

/**
 * 根据 slug 获取单篇博客文章
 */
export async function fetchStrapiPostBySlug(slug: string): Promise<StrapiPost | null> {
  const res = await strapiFetch<StrapiPost[]>(`/api/posts`, {
    'filters[slug][$eq]': slug,
    'populate': 'coverImage,heroImage',
    'publicationState': 'live',
  });
  const raw = res.data;
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const p = list[0];
  if (!p) return null;
  return {
    ...p,
    coverImage: p.coverImage
      ? { ...p.coverImage, url: resolveMediaUrl((p.coverImage as { url?: string }).url) ?? (p.coverImage as StrapiMedia).url }
      : null,
    heroImage: p.heroImage
      ? { ...p.heroImage, url: resolveMediaUrl((p.heroImage as { url?: string }).url) ?? (p.heroImage as StrapiMedia).url }
      : null,
  };
}

/**
 * 获取已批准的素材列表（可用于 Banner、产品图等）
 * @param assetType 可选筛选：banner | factory | product | material | document
 */
export async function fetchStrapiAssets(options?: {
  assetType?: StrapiAsset['assetType'];
  limit?: number;
}): Promise<StrapiAsset[]> {
  const { assetType, limit = 50 } = options ?? {};
  const params: Record<string, string | number> = {
    'populate': 'media',
    'pagination[pageSize]': limit,
  };
  if (assetType) {
    params['filters[assetType][$eq]'] = assetType;
  }
  params['filters[approved][$eq]'] = 'true';
  const res = await strapiFetch<StrapiAsset[]>(`/api/assets`, params);
  const raw = res.data;
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return list.map((a) => ({
    ...a,
    media: a.media
      ? { ...a.media, url: resolveMediaUrl((a.media as { url?: string }).url) ?? (a.media as StrapiMedia).url }
      : null,
  }));
}

/**
 * 获取指定类型的 Banner 素材 URL 映射（用于 hero 等）
 * 返回 { pageKey: url } 映射，需在 Strapi 中通过 tags 或 title 约定 pageKey
 */
export async function fetchStrapiBannerMap(): Promise<Record<string, string>> {
  const assets = await fetchStrapiAssets({ assetType: 'banner', limit: 100 });
  const map: Record<string, string> = {};
  for (const a of assets) {
    const url = a.media?.url;
    if (url) {
      const tags = Array.isArray(a.tags) ? a.tags : typeof a.tags === 'object' && a.tags && !Array.isArray(a.tags) ? [] : [];
      const key = (a.title || (tags[0] as string) || `banner_${a.id}`).toLowerCase().replace(/\s+/g, '');
      map[key] = url;
    }
  }
  return map;
}

/** 是否已配置 Strapi */
export function isStrapiConfigured(): boolean {
  return !!BASE_URL;
}

/** Strapi Blocks 富文本节点 */
interface BlocksNode {
  type: string;
  text?: string;
  level?: number;
  format?: string;
  url?: string;
  children?: BlocksNode[];
  image?: { url: string; alternativeText?: string };
  [key: string]: unknown;
}

/** 将 Strapi Blocks 转为 HTML 字符串（简单实现） */
export function blocksToHtml(blocks: BlocksNode[] | null | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const render = (node: BlocksNode): string => {
    if (node.type === 'text') {
      let t = escape(node.text ?? '');
      if (node.bold) t = `<strong>${t}</strong>`;
      if (node.italic) t = `<em>${t}</em>`;
      if (node.underline) t = `<u>${t}</u>`;
      if (node.code) t = `<code>${t}</code>`;
      return t;
    }
    if (node.type === 'paragraph') {
      const inner = (node.children ?? []).map(render).join('');
      return `<p>${inner || '<br/>'}</p>`;
    }
    if (node.type === 'heading') {
      const h = Math.min(6, Math.max(1, node.level ?? 2));
      const inner = (node.children ?? []).map(render).join('');
      return `<h${h}>${inner}</h${h}>`;
    }
    if (node.type === 'list') {
      const tag = node.format === 'ordered' ? 'ol' : 'ul';
      const inner = (node.children ?? []).map((c) => (c.type === 'list-item' ? `<li>${(c.children ?? []).map(render).join('')}</li>` : '')).join('');
      return `<${tag}>${inner}</${tag}>`;
    }
    if (node.type === 'list-item') {
      const inner = (node.children ?? []).map(render).join('');
      return inner ? `<li>${inner}</li>` : '';
    }
    if (node.type === 'link') {
      const inner = (node.children ?? []).map(render).join('');
      const href = escape(node.url ?? '#');
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
    }
    if (node.type === 'image' && node.image) {
      const url = node.image.url?.startsWith('http') ? node.image.url : BASE_URL ? `${BASE_URL}${node.image.url}` : node.image.url;
      const alt = escape(node.image.alternativeText ?? '');
      return `<img src="${url}" alt="${alt}" class="rounded-lg max-w-full h-auto" />`;
    }
    if (node.type === 'quote') {
      const inner = (node.children ?? []).map(render).join('');
      return `<blockquote class="border-l-4 border-blue-600 pl-4 my-4 text-gray-600">${inner}</blockquote>`;
    }
    return (node.children ?? []).map(render).join('');
  };
  return blocks.map(render).join('');
}
