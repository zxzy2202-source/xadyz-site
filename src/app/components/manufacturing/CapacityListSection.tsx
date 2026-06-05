import React from 'react';
import { getIcon } from '@/app/lib/iconMap';

export interface CapacityListSectionProps {
  title: string;
  items: string[];
  icon?: string;
}

export function CapacityListSection({ title, items, icon = 'settings' }: CapacityListSectionProps) {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 italic">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl italic font-bold">
              {getIcon(icon, 24, 'text-blue-600 shrink-0')}
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
