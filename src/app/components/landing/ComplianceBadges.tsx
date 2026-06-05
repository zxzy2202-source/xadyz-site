import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Award } from 'lucide-react';

export interface ComplianceBadge {
  label: string;
  desc: string;
}

export interface ComplianceBadgesProps {
  sectionTitle: string;
  subtext: string;
  badges: ComplianceBadge[];
  cta: string;
  ctaLink: string;
}

export function ComplianceBadges({
  sectionTitle,
  subtext,
  badges,
  cta,
  ctaLink,
}: ComplianceBadgesProps) {
  return (
    <section className="bg-white py-16 mb-32 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{sectionTitle}</h2>
        <p className="text-gray-600 mb-12 text-center">{subtext}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="flex justify-center mb-3">
                <Award size={32} className="text-blue-600" />
              </div>
              <div className="font-bold text-gray-900 text-lg">{badge.label}</div>
              <div className="text-sm text-gray-600 mt-1">{badge.desc}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
          >
            {cta}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
