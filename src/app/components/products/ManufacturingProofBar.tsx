import React from 'react';
import { getIcon } from '@/app/lib/iconMap';

export interface ProofItem {
  icon: string;
  label: string;
  value: string;
}

export interface ManufacturingProofBarProps {
  sectionTitle: string;
  items: ProofItem[];
}

export function ManufacturingProofBar({ sectionTitle, items }: ManufacturingProofBarProps) {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 mb-24 -mx-4">
      <div className="px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          {sectionTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="flex justify-center mb-4">{getIcon(item.icon, 32)}</div>
              <div className="text-sm text-gray-500 mb-2 font-medium">{item.label}</div>
              <div className="text-2xl font-bold text-gray-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
