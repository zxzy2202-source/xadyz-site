import React from 'react';
import { getIcon } from '@/app/lib/iconMap';

export interface QualityContentSectionProps {
  title: string;
  intro: string;
  points: string[];
}

export function QualityContentSection({ title, intro, points }: QualityContentSectionProps) {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl">{intro}</p>
        <ul className="space-y-4 max-w-3xl">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              {getIcon('checkCircle2', 24, 'text-green-600 shrink-0 mt-0.5')}
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
