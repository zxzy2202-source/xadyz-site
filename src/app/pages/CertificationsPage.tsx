import React from 'react';
import { Link } from 'react-router';
import { SEO } from '@/app/components/SEO';
import { PageShell } from '@/app/components/PageShell';
import { ManufacturingNav } from '@/app/components/manufacturing';
import { MANUFACTURING_NAV_ITEMS } from '@/app/lib/manufacturingNavConfig';
import { PageHero } from '@/app/components/hero/PageHero';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { CheckCircle } from 'lucide-react';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { getIcon } from '@/app/lib/iconMap';
import { content } from './CertificationsPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.proof.certificatesWall, alt: 'Quality certifications wall' },
  hero: {
    src: PLACEHOLDERS.proof.certificatesWall,
    alt: 'ISO FSC quality certifications',
    overlay: 'dark',
    focal: 'center',
  },
  gallery: [
    { src: PLACEHOLDERS.proof.certificatesWall, alt: 'Quality certifications wall' },
    { src: PLACEHOLDERS.gallery.g2, alt: 'Certification documentation' },
    { src: PLACEHOLDERS.gallery.g3, alt: 'Quality standards compliance' },
  ],
  cards: {},
  proofs: [],
};

interface CertificationsPageProps {
  lang: 'en' | 'ru' | 'zh';
}

export function CertificationsPage({ lang }: CertificationsPageProps) {
  const t = content[lang];

  const heroContent = (
    <div className="-mt-32 pt-32 mb-20">
      <PageHero
        title={t.hero.title}
        description={t.hero.description}
        image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
        overlay={pageAssets.hero.overlay}
        placeholderKey="certifications_hero"
      />
    </div>
  );

  return (
    <>
      <SEO
        title={`${t.hero.title} | Zhixin Paper - B2B Thermal Paper Supplier`}
        description={t.hero.description}
        lang={lang}
        canonical={`/${lang}/manufacturing/certifications`}
      />
      <PageShell lang={lang} hero={heroContent}>
        <ManufacturingNav lang={lang} items={MANUFACTURING_NAV_ITEMS[lang]} />

        {/* Certifications Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t.certifications.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.certifications.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.certs.map((cert, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="mb-6">{getIcon(cert.icon, 48, 'text-blue-600')}</div>
                  <div className="text-sm font-semibold text-blue-600 mb-2">{cert.category}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{cert.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.commitment.title}</h2>
                <p className="text-xl text-gray-600 mb-8">{t.commitment.description}</p>
                <ul className="space-y-4">
                  {t.commitment.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <ImagePlaceholder type="factory" aspectRatio="4:3" description="Quality Control Lab" size="lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Industry Standards */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">{t.standards.title}</h2>
              <p className="text-xl text-blue-200">{t.standards.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.standards.list.map((standard, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
                  <div className="font-semibold text-lg">{standard}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white -mx-4 px-4 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">{t.cta.title}</h2>
            <p className="text-xl text-blue-100 mb-8">{t.cta.description}</p>
            <Link
              to={`/${lang}/request-tender-pack`}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
            >
              {t.cta.button}
            </Link>
          </div>
        </section>
      </PageShell>
    </>
  );
}
