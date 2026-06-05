import React from 'react';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';

type ImagePlaceholderType = 'hero' | 'product' | 'application' | 'section' | 'factory' | 'material' | 'contact';

export interface HeroBannerBgProps {
  /** 真实图片 URL（例如从 Strapi 或本地静态图），有则优先使用 */
  imageUrl?: string;
  type: ImagePlaceholderType;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2' | '21:9';
  description: string;
  className?: string;
  /** 可选：Supabase 占位符 key，用于自动拉取已绑定 hero 背景图 */
  placeholderKey?: string;
}

/**
 * Hero Banner 背景：优先使用真实图片，无则使用 ImagePlaceholder
 */
export function HeroBannerBg({
  imageUrl,
  type,
  aspectRatio = '21:9',
  description,
  className = '',
  placeholderKey,
}: HeroBannerBgProps) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        role="presentation"
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        loading="eager"
        fetchPriority="high"
      />
    );
  }
  return (
    <ImagePlaceholder
      type={type}
      aspectRatio={aspectRatio}
      description={description}
      size="xl"
      className={className}
      placeholderKey={placeholderKey}
    />
  );
}
