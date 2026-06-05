import React from 'react';
import { getIcon } from '@/app/lib/iconMap';

export interface ShippingContentSectionProps {
  title: string;
  intro: string;
  features: { label: string; desc: string }[];
}

export function ShippingContentSection({ title, intro, features }: ShippingContentSectionProps) {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">{intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-start gap-4">
                {getIcon('package', 32, 'text-blue-600 shrink-0')}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.label}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
