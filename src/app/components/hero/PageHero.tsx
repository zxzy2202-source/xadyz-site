import React from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { supabasePublic } from '@/app/lib/supabasePublicClient';

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: { src: string; alt: string };
  overlay?: "dark" | "light";
  align?: "left" | "center";
  size?: "default" | "compact";
  children?: React.ReactNode;
  /** 可选：Supabase 占位符 key，用于自动拉取已绑定的 Banner 图片 */
  placeholderKey?: string;
}

// 判断是否为外部链接
function isExternalLink(href: string): boolean {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  overlay = "dark",
  align = "left",
  size = "default",
  children,
  placeholderKey,
}: PageHeroProps) {
  const [dynamicImageUrl, setDynamicImageUrl] = React.useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  // 从 Supabase 读取动态图片
  React.useEffect(() => {
    if (!placeholderKey) return;

    let cancelled = false;
    async function fetchImage() {
      try {
        const { data, error } = await supabasePublic
          .from('placeholder_asset_urls')
          .select('file_url')
          .eq('placeholder_key', placeholderKey)
          .maybeSingle();

        if (error) {
          console.error('[PageHero] 加载 Banner 图片失败:', error.message);
          return;
        }

        if (!cancelled && data?.file_url) {
          setDynamicImageUrl(data.file_url);
          setImageLoaded(false);
        }
      } catch (err: any) {
        console.error('[PageHero] 异常:', err?.message || err);
      }
    }

    fetchImage();
    return () => {
      cancelled = true;
    };
  }, [placeholderKey]);

  // 若仅有 image.src（无 placeholderKey），图片加载完成后也要标记
  const staticUrl = image?.src && !placeholderKey ? image.src : null;
  React.useEffect(() => {
    if (!staticUrl) return;
    setImageLoaded(false);
  }, [staticUrl]);

  const overlayClass = overlay === "dark" ? "pageHero--dark" : "pageHero--light";
  const sizeClass = size === "compact" ? "pageHero--compact" : "";
  const alignClass = align === "center" ? "pageHero--center" : "";

  // 优先使用动态图片，其次使用传入的 image.src
  const backgroundImageUrl = dynamicImageUrl || image?.src;

  return (
    <section className={`pageHero ${overlayClass} ${sizeClass} ${alignClass}`}>
      {/* 预加载首屏 Banner，减少白屏时间 */}
      {image?.src && (
        <Helmet>
          <link rel="preload" href={image.src} as="image" />
        </Helmet>
      )}
      {/* 背景层：始终渲染。无图时显示占位色，有图时先占位色再淡入图片 */}
      <div
        className="pageHero__bg"
        data-overlay={overlay}
        aria-hidden="true"
      >
        {backgroundImageUrl && (
          <img
            src={backgroundImageUrl}
            alt=""
            className={`pageHero__bgImg ${imageLoaded ? 'pageHero__bgImg--loaded' : ''}`}
            loading="eager"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </div>
      <div className="pageHero__overlay" />
      <div className="pageHero__inner">
        {eyebrow && <div className="pageHero__eyebrow">{eyebrow}</div>}
        <h1 className="pageHero__title">{title}</h1>
        {description && <p className="pageHero__desc">{description}</p>}
        {(primaryCta || secondaryCta) && (
          <div className="pageHero__cta">
            {primaryCta && (
              isExternalLink(primaryCta.href) ? (
                <a
                  href={primaryCta.href}
                  className="pageHero__cta-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {primaryCta.label}
                </a>
              ) : (
                <Link
                  to={primaryCta.href}
                  className="pageHero__cta-primary"
                >
                  {primaryCta.label}
                </Link>
              )
            )}
            {secondaryCta && (
              isExternalLink(secondaryCta.href) ? (
                <a
                  href={secondaryCta.href}
                  className="pageHero__cta-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {secondaryCta.label}
                </a>
              ) : (
                <Link
                  to={secondaryCta.href}
                  className="pageHero__cta-secondary"
                >
                  {secondaryCta.label}
                </Link>
              )
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
