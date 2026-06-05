import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '@/app/lib/iconMap';

export interface IndustryCardProps {
  id: string;
  icon: string;
  title: string;
  desc: string;
  typicalProducts: string[];
  typicalProductsLabel?: string;
  link: string;
  cta: string;
  highlight?: boolean;
}

export function IndustryCard({
  icon,
  title,
  desc,
  typicalProducts,
  typicalProductsLabel,
  link,
  cta,
  highlight = false,
}: IndustryCardProps) {
  return (
    <Link
      to={link}
      className={`bg-white border-2 rounded-2xl p-8 hover:shadow-2xl transition-all group ${
        highlight ? 'border-blue-400 shadow-lg' : 'border-gray-200 hover:border-blue-400'
      }`}
    >
      <div className="flex justify-center mb-6">{getIcon(icon, 40)}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 text-base text-center">{desc}</p>
      <div className="mb-6">
        {typicalProductsLabel && (
          <p className="text-sm font-semibold text-gray-500 mb-3 text-center">{typicalProductsLabel}</p>
        )}
        <ul className="space-y-2">
          {typicalProducts.map((product, idx) => (
            <li key={idx} className="text-gray-700 text-sm text-center">
              • {product}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
          {cta}
          <ArrowRight size={18} />
        </span>
      </div>
    </Link>
  );
}
