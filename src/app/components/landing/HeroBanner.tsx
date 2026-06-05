import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export interface HeroBannerProps {
  backgroundImage: string;
  /** Eyebrow: 小标题/行业定位，如 THERMAL PAPER & LABEL MANUFACTURER */
  eyebrow?: string;
  h1: string;
  subheading?: string;
  intro: string;
  primaryCTA: string;
  primaryCTALink: string;
  secondaryCTA: string;
  secondaryCTALink: string;
}

export function HeroBanner({
  backgroundImage,
  eyebrow,
  h1,
  subheading,
  intro,
  primaryCTA,
  primaryCTALink,
  secondaryCTA,
  secondaryCTALink,
}: HeroBannerProps) {
  return (
    <section className="hero-section mb-32">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="hero-overlay" />
      <div className="hero-inner hero-inner-left">
        <div className="hero-typography">
          {eyebrow && <p className="hero-eyebrow">{eyebrow}</p>}
          <h1 className="hero-title">{h1}</h1>
          {subheading && <p className="hero-desc">{subheading}</p>}
          <p className="hero-desc">{intro}</p>
          <div className="hero-cta flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-[14px]">
            <Link
              to={primaryCTALink}
              className="hero-cta-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-lg sm:w-auto w-full"
            >
              {primaryCTA}
              <ArrowRight size={18} />
            </Link>
            <Link
              to={secondaryCTALink}
              className="hero-cta-secondary inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent text-white font-semibold rounded-xl border-2 border-white/80 hover:bg-white/10 hover:border-white transition-all sm:w-auto w-full"
            >
              {secondaryCTA}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
