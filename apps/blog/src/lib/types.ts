export type Locale = 'en' | 'ru' | 'zh';

export interface Post {
  id: string;
  slug: string;
  language: Locale;
  title: string;
  excerpt: string | null;
  body: string | null;
  content: unknown;
  category: string | null;
  cover_image_url: string | null;
  read_time: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
}
