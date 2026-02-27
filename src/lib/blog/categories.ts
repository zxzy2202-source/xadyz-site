/**
 * 博客分类常量（前后台共用）
 * 与前台 BlogInsightsPage 展示的分类保持一致
 */
export const BLOG_CATEGORIES = [
  'Industry Insights',
  'Market Analysis',
  'Market Trends',
  'Product Innovation',
  'Sustainability',
  'Technical Guides',
  'Case Studies',
  'Regulatory Updates',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
