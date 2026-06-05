import React from 'react';
import { getIcon } from '@/app/lib/iconMap';

export interface StatsItem {
  value: string;
  label: string;
  icon: string;
}

export interface StatsBarProps {
  items: StatsItem[];
}

export function StatsBar({ items }: StatsBarProps) {
  if (!items?.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 -mt-20 mb-20">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-8 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="flex justify-center mb-2">{getIcon(item.icon, 28)}</div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{item.value}</div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
