import React from 'react';
import { supabasePublic } from '@/app/lib/supabasePublicClient';
import { Image as ImageIcon, Factory, Package, Briefcase, Layers } from 'lucide-react';

/**
 * IMAGE PLACEHOLDER STANDARD COMPONENT
 * 
 * IMPORTANT: This component is used for all image placeholders across the website.
 * Do NOT auto-generate or replace images. Final images will be provided manually.
 * 
 * Rules:
 * - Keep layout, spacing, and aspect ratio
 * - Do not insert stock photos or AI-generated images
 * - This applies to Hero banners, product sections, and all image containers
 */

interface ImagePlaceholderProps {
  type: 'hero' | 'product' | 'application' | 'section' | 'factory' | 'material' | 'contact';
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2' | '21:9';
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  /** 可选：绑定 Supabase 占位符 key，用于自动拉取真实图片 */
  placeholderKey?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  type, 
  aspectRatio = '16:9',
  description,
  size = 'lg',
  className = '',
  placeholderKey,
}) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Type-specific labels
  const labels = {
    hero: 'HERO IMAGE PLACEHOLDER',
    product: 'PRODUCT IMAGE PLACEHOLDER',
    application: 'APPLICATION IMAGE PLACEHOLDER',
    section: 'SECTION IMAGE PLACEHOLDER',
    factory: 'FACTORY IMAGE PLACEHOLDER',
    material: 'MATERIAL IMAGE PLACEHOLDER',
    contact: 'CONTACT IMAGE PLACEHOLDER'
  };
  
  // Type-specific descriptions
  const descriptions = {
    hero: 'Factory / Production / Industrial Scene',
    product: 'Product Category Reference Image',
    application: 'Industry Application Illustration',
    section: 'Content Supporting Visual',
    factory: 'Factory Facility / Production Line',
    material: 'Material / Raw Material Visual',
    contact: 'Contact Information Visual'
  };
  
  // Type-specific icons
  const icons = {
    hero: ImageIcon,
    product: Package,
    application: Briefcase,
    section: Layers,
    factory: Factory,
    material: Package,
    contact: ImageIcon
  };
  
  const Icon = icons[type];
  
  // Size-specific text sizes
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };
  
  const iconSizes = {
    sm: 40,
    md: 48,
    lg: 64,
    xl: 80
  };
  
  // Aspect ratio classes
  const aspectRatioClasses = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '3:2': 'aspect-[3/2]',
    '21:9': 'aspect-[21/9]'
  };

  // 若提供 placeholderKey，则尝试从 Supabase 读取绑定图片
  React.useEffect(() => {
    let cancelled = false;
    async function fetchBoundImage() {
      if (!placeholderKey) return;
      try {
        setIsLoading(true);
        const { data, error } = await supabasePublic
          .from('placeholder_asset_urls')
          .select('file_url')
          .eq('placeholder_key', placeholderKey)
          .maybeSingle();

        if (error) {
          console.error('[ImagePlaceholder] 加载占位符图片失败:', error.message);
          return;
        }
        if (!cancelled && data?.file_url) {
          setImageUrl(data.file_url);
        }
      } catch (err: any) {
        console.error('[ImagePlaceholder] 异常:', err?.message || err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchBoundImage();
    return () => {
      cancelled = true;
    };
  }, [placeholderKey]);

  // 如果已经从后台拿到了真实图片，直接展示图片，保持原有容器尺寸
  if (imageUrl) {
    return (
      <div
        className={`
          relative w-full 
          ${aspectRatioClasses[aspectRatio]}
          ${className}
        `}
      >
        <img
          src={imageUrl}
          alt={description || labels[type]}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }
  
  return (
    <div className={`
      relative w-full 
      bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100
      border-2 border-dashed border-gray-300
      flex items-center justify-center
      ${aspectRatioClasses[aspectRatio]}
      ${className}
    `}>
      {/* Warning Icon (Top Right) */}
      <div className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
          ⚠️ Manual Image Required
        </p>
      </div>
      
      {/* Center Content */}
      <div className="text-center px-6 py-8">
        {/* Icon */}
        <div className={`mb-4 mx-auto w-${iconSizes[size] / 4} h-${iconSizes[size] / 4} 
          bg-white border-4 border-gray-300 rounded-2xl 
          flex items-center justify-center shadow-sm`}
        >
          <Icon size={iconSizes[size] / 2} className="text-gray-400" />
        </div>
        
        {/* Label */}
        <p className={`text-gray-600 font-bold uppercase tracking-wider mb-2 ${textSizes[size]}`}>
          {labels[type]}
        </p>
        
        {/* Description */}
        <p className={`text-gray-500 mb-3 ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>
          {description || descriptions[type]}
        </p>
        
        {/* Aspect Ratio Info */}
        <p className={`text-gray-400 ${size === 'sm' ? 'text-[9px]' : 'text-[10px]'} font-mono`}>
          Aspect Ratio: {aspectRatio}
        </p>
        
        {/* Manual Notice */}
        <div className="mt-4 pt-4 border-t border-gray-200 max-w-xs mx-auto">
          <p className={`text-gray-400 italic ${size === 'sm' ? 'text-[9px]' : 'text-[10px]'}`}>
            This image will be replaced manually with actual factory/product photography
          </p>
        </div>
      </div>
      
      {/* Grid Pattern Background (Subtle) */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, .05) 25%, rgba(0, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .05) 75%, rgba(0, 0, 0, .05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, .05) 25%, rgba(0, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .05) 75%, rgba(0, 0, 0, .05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

/**
 * USAGE EXAMPLES:
 * 
 * // Hero Section
 * <ImagePlaceholder type="hero" aspectRatio="21:9" size="xl" />
 * 
 * // Product Category
 * <ImagePlaceholder type="product" aspectRatio="4:3" size="lg" />
 * 
 * // Factory/Production
 * <ImagePlaceholder type="factory" aspectRatio="16:9" size="lg" />
 * 
 * // Material Supply
 * <ImagePlaceholder type="material" aspectRatio="3:2" size="md" />
 * 
 * // Application/Industry
 * <ImagePlaceholder type="application" aspectRatio="16:9" size="md" />
 * 
 * // Custom Description
 * <ImagePlaceholder 
 *   type="hero" 
 *   description="Government Tender Project Reference Image"
 *   aspectRatio="16:9"
 * />
 */