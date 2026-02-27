import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Package, CheckCircle2 } from 'lucide-react';

export interface ProductCategoryCardProps {
  id: string;
  title: string;
  shortDesc: string;
  bullets: string[];
  cta: string;
  link: string;
}

export function ProductCategoryCard({
  title,
  shortDesc,
  bullets,
  cta,
  link,
}: ProductCategoryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 flex flex-col">
      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
        <Package size={28} className="text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-600 mb-6 text-base">{shortDesc}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{bullet}</span>
          </li>
        ))}
      </ul>
      <Link
        to={link}
        className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 hover:gap-3 transition-all group"
      >
        {cta}
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
