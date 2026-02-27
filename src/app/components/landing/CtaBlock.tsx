import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export interface CtaBlockProps {
  headline: string;
  subtext: string;
  button: string;
  buttonLink: string;
}

export function CtaBlock({ headline, subtext, button, buttonLink }: CtaBlockProps) {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">{headline}</h2>
        <p className="text-xl mb-8 text-blue-100">{subtext}</p>
        <Link
          to={buttonLink}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all shadow-xl"
        >
          {button}
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
