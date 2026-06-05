/**
 * BlogPostDetailPage 三语言标签与错误文案
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface BlogPostDetailLabels {
  back: string;
  backToList: string;
  notFound: string;
}

export const labels: Record<Lang, BlogPostDetailLabels> = {
  en: { back: 'Back', backToList: 'Back to Blog', notFound: 'Article not found' },
  ru: { back: 'Назад', backToList: 'Назад к блогу', notFound: 'Статья не найдена' },
  zh: { back: '返回', backToList: '返回博客', notFound: '文章未找到' },
};
