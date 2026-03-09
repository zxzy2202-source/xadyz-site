import React, { useEffect } from 'react';
import * as HelmetAsync from 'react-helmet-async';
import { useLocation } from 'react-router';
import { buildBreadcrumbJsonLd } from '@/seo/breadcrumbJsonLd';
import { availableLangsForPath } from '@/seo/pageExists';

const BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL
  ? String(import.meta.env.VITE_SITE_URL).replace(/\/$/, '')
  : 'https://xadyz.com';

const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.svg`;
const LANGS = ['en', 'ru', 'zh'] as const;
const PREFERRED_X_DEFAULT: 'en' | 'ru' | 'zh' = 'en';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  lang?: 'ru' | 'en' | 'zh';
  canonical?: string;
  hreflangs?: {
    en?: string;
    ru?: string;
    zh?: string;
  };
  /** path 与 hreflangs 等价，用于多语言路径映射 */
  path?: {
    en?: string;
    ru?: string;
    zh?: string;
  };
  /** Open Graph 图片 URL，留空使用默认 */
  ogImage?: string | null;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  lang = 'en',
  canonical,
  hreflangs: hreflangsProp,
  path,
  ogImage,
}) => {
  const location = useLocation();
  const baseUrl = BASE_URL;

  // Explicit path/hreflangs prop wins; otherwise auto-generate
  const explicitLinks = hreflangsProp ?? path;

  const currentPath = location.pathname;
  let finalCanonical = canonical || currentPath;
  // Homepage: use trailing slash for consistency with sitemap (e.g. /en/ not /en)
  const isHomepage = /^\/(en|ru|zh)\/?$/.test(finalCanonical);
  if (isHomepage && !finalCanonical.endsWith('/')) {
    finalCanonical = `${finalCanonical}/`;
  }
  const fullCanonical = `${baseUrl}${finalCanonical}`;

  // ── hreflang: use explicit prop or pageExists-aware auto-generation ──────────
  const getSmartHreflangs = (): { en?: string; ru?: string; zh?: string } => {
    if (explicitLinks) return explicitLinks;

    // Strip language prefix to get the bare path (e.g. "/products/thermal-paper")
    const pathWithoutLang = currentPath.replace(/^\/(en|ru|zh)/, '') || '';
    const isHomepage = !pathWithoutLang || pathWithoutLang === '/';

    // Only generate hreflang for languages where the page actually exists
    const existingLangs = availableLangsForPath(pathWithoutLang, [...LANGS]);
    const pathSuffix = isHomepage ? '/' : pathWithoutLang;

    return {
      en: existingLangs.includes('en') ? `/en${pathSuffix}` : undefined,
      ru: existingLangs.includes('ru') ? `/ru${pathSuffix}` : undefined,
      zh: existingLangs.includes('zh') ? `/zh${pathSuffix}` : undefined,
    };
  };

  const finalHreflangs = getSmartHreflangs();

  // x-default: prefer 'en', fall back to first available language
  const xDefaultPath =
    finalHreflangs[PREFERRED_X_DEFAULT] ??
    finalHreflangs.ru ??
    finalHreflangs.zh ??
    finalCanonical;

  // ── Breadcrumb JSON-LD ───────────────────────────────────────────────────────
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(location.pathname);

  // ── <html lang="…"> ──────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const imageUrl = (ogImage && ogImage.startsWith('http'))
    ? ogImage
    : (ogImage ? `${baseUrl}${ogImage}` : DEFAULT_OG_IMAGE);

  // 兼容 CJS/ESM 的 Helmet 导出
  const { Helmet } = (HelmetAsync as any);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description.slice(0, 160)} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Webmaster verification */}
      <meta name="google-site-verification" content="J0Vpe5easFPzmif7TPgRYcKAOZwvKkjK-s8stTenjjk" />
      <meta name="yandex-verification" content="aeb74b12aa3ece86" />

      {/* Canonical */}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title.slice(0, 60)} />
      <meta property="og:description" content={description.slice(0, 200)} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={lang === 'zh' ? 'zh_CN' : lang === 'ru' ? 'ru_RU' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title.slice(0, 70)} />
      <meta name="twitter:description" content={description.slice(0, 200)} />
      <meta name="twitter:image" content={imageUrl} />

      {/* hreflang — only for existing pages (pageExists-aware) */}
      {finalHreflangs.en && (
        <link rel="alternate" hreflang="en" href={`${baseUrl}${finalHreflangs.en}`} />
      )}
      {finalHreflangs.ru && (
        <link rel="alternate" hreflang="ru" href={`${baseUrl}${finalHreflangs.ru}`} />
      )}
      {finalHreflangs.zh && (
        <link rel="alternate" hreflang="zh" href={`${baseUrl}${finalHreflangs.zh}`} />
      )}
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}${xDefaultPath}`} />

      {/* BreadcrumbList JSON-LD — auto-generated from current URL */}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}
    </Helmet>
  );
};
