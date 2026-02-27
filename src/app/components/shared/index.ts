/**
 * Shared layout and SEO components.
 * Import via: import { HeaderWithHover, FooterOptimized, PageShell, SEO } from '@/app/components/shared'
 *
 * Header.tsx  → re-export shim for HeaderWithHover（各页面直接 import Header 路径保持不变）
 * FooterOptimized → 唯一 Footer 实现（Footer.tsx 已删除）
 */
export { Header } from '@/app/components/Header';
export { HeaderWithHover } from '@/app/components/HeaderWithHover';
export { FooterOptimized } from '@/app/components/FooterOptimized';
export { PageShell } from '@/app/components/PageShell';
export { SEO } from '@/app/components/SEO';
export { Breadcrumb } from '@/app/components/Breadcrumb';
export { BreadcrumbNav } from '@/app/components/BreadcrumbNav';
export { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
export { HeroBannerBg } from '@/app/components/HeroBannerBg';
export { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
