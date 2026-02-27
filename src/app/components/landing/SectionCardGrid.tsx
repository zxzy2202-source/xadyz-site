import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '@/app/lib/iconMap';

export interface CardItem {
  id?: string;
  icon?: string;
  title: string;
  desc?: string;
  link?: string;
  cta?: string;
  bullets?: string[];
}

export interface SectionCardGridProps {
  sectionTitle: string;
  items: CardItem[];
  cta?: string;
  ctaLink?: string;
  /** Layout variants */
  variant?: 'product' | 'strength' | 'app' | 'customization' | 'appWithDesc';
  background?: 'gray' | 'white' | 'blue';
  /** For appWithDesc: CTA text per card (e.g. "Learn more") */
  cardCta?: string;
}

export function SectionCardGrid({
  sectionTitle,
  items,
  cta,
  ctaLink,
  variant = 'product',
  background = 'white',
  cardCta = 'Learn more',
}: SectionCardGridProps) {
  const bgClass =
    background === 'gray'
      ? 'bg-gradient-to-br from-gray-50 to-white'
      : background === 'blue'
        ? 'bg-gradient-to-br from-blue-50 to-white'
        : '';

  const isNoLink = variant === 'strength' || variant === 'customization';
  const cardBase =
    isNoLink
      ? 'bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:shadow-lg transition-all'
      : variant === 'appWithDesc'
        ? 'bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all group'
        : 'bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-2xl transition-all group';

  const iconSize = variant === 'app' || variant === 'appWithDesc' ? 28 : variant === 'strength' ? 40 : 48;
  const mbClass = variant === 'app' ? 'mb-4' : 'mb-6';
  const gridCols =
    variant === 'product' || variant === 'customization'
      ? 'grid-cols-1 md:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  const hasLink = !isNoLink;
  const showProductCta = variant === 'product' && hasLink;

  const CardContent = (item: CardItem) => (
    <>
      {item.icon && (
        <div className={`flex justify-center ${variant === 'appWithDesc' ? 'mb-4' : mbClass}`}>
          {getIcon(item.icon, iconSize)}
        </div>
      )}
      <h3 className="font-bold text-gray-900 text-lg text-center group-hover:text-blue-600 transition-colors">
        {item.title}
      </h3>
      {item.desc && (
        <p className={`text-gray-600 ${variant === 'appWithDesc' ? 'text-sm mb-3' : 'mb-6'} text-center`}>
          {item.desc}
        </p>
      )}
      {variant === 'appWithDesc' && item.link && (
        <div className="flex items-center justify-center gap-2 text-blue-600 text-sm font-semibold">
          <span>{item.cta ?? cardCta}</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      )}
      {showProductCta && item.link && item.cta && (
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
            {item.cta}
            <ArrowRight size={18} />
          </span>
        </div>
      )}
    </>
  );

  return (
    <section className={`py-20 mb-32 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4">
        {sectionTitle && (
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{sectionTitle}</h2>
        )}
        <div className={`grid ${gridCols} gap-8`}>
          {items.map((item, idx) =>
            hasLink && item.link ? (
              <Link key={item.id ?? idx} to={item.link} className={cardBase}>
                {CardContent(item)}
              </Link>
            ) : (
              <div key={item.id ?? idx} className={cardBase.replace(' group', '')}>
                {CardContent(item)}
              </div>
            )
          )}
        </div>
        {cta && ctaLink && (
          <div className="text-center mt-10">
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
            >
              {cta}
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
