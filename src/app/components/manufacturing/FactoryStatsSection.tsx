import React from 'react';
import { getIcon } from '@/app/lib/iconMap';

export interface FactoryStatItem {
  icon: string;
  value: string;
  label: string;
  gradient?: string;
  borderColor?: string;
  iconColor?: string;
}

export interface FactoryStatsSectionProps {
  title: string;
  intro: string;
  items: FactoryStatItem[];
}

const colorSchemes = [
  { gradient: 'from-blue-50 to-white', border: 'border-blue-100', iconCls: 'text-blue-600' },
  { gradient: 'from-green-50 to-white', border: 'border-green-100', iconCls: 'text-green-600' },
  { gradient: 'from-purple-50 to-white', border: 'border-purple-100', iconCls: 'text-purple-600' },
];

export function FactoryStatsSection({ title, intro, items }: FactoryStatsSectionProps) {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">{intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const scheme = colorSchemes[i % colorSchemes.length];
            return (
              <div
                key={i}
                className={`p-8 bg-gradient-to-br ${scheme.gradient} border-2 ${scheme.border} rounded-2xl hover:shadow-xl transition-all`}
              >
                <div className={scheme.iconCls} style={{ marginBottom: '1rem' }}>
                  {getIcon(item.icon, 48, scheme.iconCls)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.value}</h3>
                <p className="text-gray-600">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
