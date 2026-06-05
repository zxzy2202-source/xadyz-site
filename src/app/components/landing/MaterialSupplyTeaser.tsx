import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export interface MaterialSupplyTeaserProps {
  sectionTitle: string;
  intro: string;
  cta: string;
  ctaLink: string;
}

export function MaterialSupplyTeaser({
  sectionTitle,
  intro,
  cta,
  ctaLink,
}: MaterialSupplyTeaserProps) {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 mb-32">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{sectionTitle}</h2>
        <p className="text-lg text-gray-700 mb-8">{intro}</p>
        <Link
          to={ctaLink}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:scale-105 transition-all"
        >
          {cta}
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
