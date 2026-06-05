import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle2, Heart, Pill, FileText, AlertCircle, Zap, Shield } from 'lucide-react';
import { PageShell } from '@/app/components/PageShell';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { content } from './HealthcarePage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.application, alt: "Healthcare thermal labels" },
  hero: {
    src: PLACEHOLDERS.hero.application,
    alt: "Medical and pharmacy thermal labels",
    overlay: "dark",
    focal: "center",
  },
  gallery: [
    { src: PLACEHOLDERS.gallery.g1, alt: "Healthcare thermal labels" },
    { src: PLACEHOLDERS.gallery.g2, alt: "Pharmacy and laboratory labels" },
    { src: PLACEHOLDERS.proof.qualityInspection, alt: "Quality inspection" },
    { src: PLACEHOLDERS.proof.containerLoading, alt: "Container loading" },
  ],
  cards: {},
  proofs: [
    { src: PLACEHOLDERS.proof.qualityInspection, alt: "Quality inspection", tag: "quality" },
    { src: PLACEHOLDERS.proof.containerLoading, alt: "Container loading", tag: "shipping" },
  ],
};

const iconMap = {
  heart: Heart,
  pill: Pill,
  fileText: FileText,
  alertCircle: AlertCircle,
  zap: Zap,
  shield: Shield,
  checkCircle2: CheckCircle2
};

interface HealthcarePageProps {
  lang: 'en' | 'ru' | 'zh';
}

export const HealthcarePage: React.FC<HealthcarePageProps> = ({ lang }) => {
  const t = content[lang];

  return (
    <>
      <SEO
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
        lang={lang}
      />

      <PageShell lang={lang} hero={(
        <div className="-mt-32 pt-32 mb-20">
          <PageHero
            title={t.hero.h1}
            description={t.hero.subheading ? `${t.hero.subheading} ${t.hero.intro}` : t.hero.intro}
            image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
            overlay={pageAssets.hero.overlay}
            placeholderKey="healthcare_hero"
          />
        </div>
      )}>
          {/* 02: Overview Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
                {t.overview.sectionTitle}
              </h2>
              <p className="text-lg text-neutral-700 mb-8 max-w-4xl leading-relaxed">
                {t.overview.content}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.overview.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-neutral-900">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 03: Key Applications */}
          <section className="py-20 bg-neutral-50">
            <div className="container mx-auto px-6 lg:px-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
                {t.applications.sectionTitle}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.applications.apps.map((app, idx) => {
                  const Icon = iconMap[app.icon as keyof typeof iconMap];
                  return (
                    <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <Icon className="w-12 h-12 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">{app.title}</h3>
                      <p className="text-neutral-700">{app.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 04: Product Solutions */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
                {t.products.sectionTitle}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {t.products.items.map((product, idx) => (
                  <div key={idx} className="bg-neutral-50 p-8 rounded-lg border border-neutral-200">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">{product.title}</h3>
                    <p className="text-neutral-700 mb-6">{product.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {product.specs.map((spec, specIdx) => (
                        <li key={specIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{spec}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={product.link}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      {product.cta}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 05: Benefits */}
          <section className="py-20 bg-neutral-50">
            <div className="container mx-auto px-6 lg:px-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
                {t.benefits.sectionTitle}
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {t.benefits.items.map((benefit, idx) => {
                  const Icon = iconMap[benefit.icon as keyof typeof iconMap];
                  return (
                    <div key={idx} className="text-center">
                      <Icon className="w-14 h-14 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">{benefit.title}</h3>
                      <p className="text-neutral-700">{benefit.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 06: CTA Section */}
          <section className="py-20 bg-blue-600 text-white">
            <div className="container mx-auto px-6 lg:px-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.cta.headline}
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {t.cta.subtext}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={t.cta.primaryLink}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  {t.cta.primaryButton}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to={t.cta.secondaryLink}
                  className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  {t.cta.secondaryButton}
                </Link>
              </div>
            </div>
          </section>
      </PageShell>
    </>
  );
};
