import React from 'react';
import { getIcon } from '@/app/lib/iconMap';

export interface ProductionLineCardProps {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  colorScheme?: 'blue' | 'green' | 'purple';
}

const schemes = {
  blue: { gradient: 'from-blue-50 to-white', border: 'border-blue-600', bg: 'bg-blue-600', tag: 'bg-blue-100 text-blue-700' },
  green: { gradient: 'from-green-50 to-white', border: 'border-green-600', bg: 'bg-green-600', tag: 'bg-green-100 text-green-700' },
  purple: { gradient: 'from-purple-50 to-white', border: 'border-purple-600', bg: 'bg-purple-600', tag: 'bg-purple-100 text-purple-700' },
};

export function ProductionLineCard({ icon, title, description, tags, colorScheme = 'blue' }: ProductionLineCardProps) {
  const s = schemes[colorScheme];
  return (
    <div className={`p-8 bg-gradient-to-r ${s.gradient} border-l-4 ${s.border} rounded-2xl hover:shadow-lg transition-all`}>
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className={`w-16 h-16 ${s.bg} rounded-xl flex items-center justify-center`}>
            {getIcon(icon, 32, 'text-white')}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className={`px-3 py-1 ${s.tag} rounded-full text-sm font-semibold`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
