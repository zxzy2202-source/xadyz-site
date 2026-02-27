import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '@/app/lib/iconMap';

export interface SnapshotItem {
  icon: string;
  label: string;
  desc?: string;
}

export interface ManufacturingSnapshotProps {
  sectionTitle: string;
  intro: string;
  items: SnapshotItem[];
  cta: string;
  ctaLink: string;
}

export function ManufacturingSnapshot({
  sectionTitle,
  intro,
  items,
  cta,
  ctaLink,
}: ManufacturingSnapshotProps) {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 mb-32">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{sectionTitle}</h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">{intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center"
            >
              <div className="flex justify-center mb-4">{getIcon(item.icon, 36)}</div>
              <div className="font-medium text-gray-800">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:scale-105 transition-all"
          >
            {cta}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
