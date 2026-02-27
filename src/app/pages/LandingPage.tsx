import React from 'react';
import { Header } from '@/app/components/Header';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';
import {
  StatsBar,
  SectionCardGrid,
  ComplianceBadges,
  ManufacturingSnapshot,
  MaterialSupplyTeaser,
  ProductPageCta,
} from '@/app/components/landing';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { PageHero } from '@/app/components/hero/PageHero';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { content } from './LandingPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.factoryLine, alt: "Thermal paper production line in Zhixin Paper factory" },
  hero: {
    src: PLACEHOLDERS.hero.factoryLine,
    alt: "Thermal paper slitting and rewinding production line in Zhixin Paper factory",
    overlay: "dark",
    focal: "left",
  },
  gallery: [],
  cards: {
    "thermal-rolls": { src: PLACEHOLDERS.product.thermalRolls, alt: "Thermal paper rolls for POS and retail" },
    "thermal-labels": { src: PLACEHOLDERS.product.thermalLabels, alt: "Thermal labels for logistics and retail" },
    "ncr-forms": { src: PLACEHOLDERS.product.ncrForms, alt: "NCR carbonless forms for documentation" },
  },
  proofs: [
    { src: PLACEHOLDERS.proof.slittingMachine, alt: "Slitting machine with control panel", tag: "production" },
    { src: PLACEHOLDERS.proof.qualityInspection, alt: "Quality inspection sampling and testing", tag: "quality" },
    { src: PLACEHOLDERS.proof.warehousePallets, alt: "Jumbo rolls stacked in warehouse", tag: "warehouse" },
    { src: PLACEHOLDERS.proof.containerLoading, alt: "Container loading for shipment", tag: "shipping" },
  ],
};

interface LandingPageProps {
  lang?: 'en' | 'ru' | 'zh';
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang = 'en' }) => {
  const t = content[lang];

  // 首页 Hero 轮播：两张 Banner 图自动切换
  const heroSlides = React.useMemo(
    () => [
      { id: 'slide-1', placeholderKey: 'home_hero_banner' },
      { id: 'slide-2', placeholderKey: 'home_hero_banner_2' },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, []); // heroSlides 长度固定，仅在首次挂载时启动轮播

  return (
    <>
      <SEO
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
        lang={lang}
      />

      <Header />

      <main className="pt-32 pb-20">
        {/* 顶部 Hero 轮播（两张 Banner 图） */}
        <div className="relative">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-opacity duration-700 ${
                index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
              }`}
            >
              <PageHero
                eyebrow={t.hero.eyebrow}
                title={t.hero.h1}
                description={t.hero.subheading ? `${t.hero.subheading} ${t.hero.intro}` : t.hero.intro}
                primaryCta={
                  t.hero.primaryCTA ? { label: t.hero.primaryCTA, href: t.hero.primaryCTALink } : undefined
                }
                secondaryCta={
                  t.hero.secondaryCTA ? { label: t.hero.secondaryCTA, href: t.hero.secondaryCTALink } : undefined
                }
                image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
                overlay={pageAssets.hero.overlay}
                placeholderKey={slide.placeholderKey}
              />
            </div>
          ))}

          {/* 轮播指示器（小圆点） */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? 'w-6 bg-white' : 'w-2.5 bg-white/60 hover:bg-white'
                }`}
                aria-label={`切换到第 ${index + 1} 张 Banner`}
              />
            ))}
          </div>
        </div>

        {/* 工厂简介：图文两栏（独立于 ManufacturingSnapshot 列表区块） */}
        <section className="mt-12 mb-20">
          <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {t.aboutSection.sectionTitle}
              </h2>
              <p className="text-gray-600">
                {t.aboutSection.intro}
              </p>
            </div>
            <ImagePlaceholder
              type="factory"
              aspectRatio="4:3"
              description={t.aboutSection.sectionTitle}
              size="lg"
              placeholderKey="home_about_factory"
            />
          </div>
        </section>

        <StatsBar items={t.statistics?.items ?? []} />

        <SectionCardGrid
          sectionTitle={t.productSeries.sectionTitle}
          items={t.productSeries.series}
          variant="product"
          background="gray"
        />

        {t.compliance && (
          <ComplianceBadges
            sectionTitle={t.compliance.sectionTitle}
            subtext={t.compliance.subtext}
            badges={t.compliance.badges}
            cta={t.compliance.cta}
            ctaLink={t.compliance.ctaLink}
          />
        )}

        <SectionCardGrid
          sectionTitle={t.whyChooseUs.sectionTitle}
          items={t.whyChooseUs.strengths}
          variant="strength"
          background="white"
        />

        <ManufacturingSnapshot
          sectionTitle={t.manufacturingSnapshot.sectionTitle}
          intro={t.manufacturingSnapshot.intro}
          items={t.manufacturingSnapshot.items}
          cta={t.manufacturingSnapshot.cta}
          ctaLink={t.manufacturingSnapshot.ctaLink}
        />

        <SectionCardGrid
          sectionTitle={t.applicationsTeaser.sectionTitle}
          items={t.applicationsTeaser.items}
          cta={t.applicationsTeaser.cta}
          ctaLink={t.applicationsTeaser.ctaLink}
          variant="app"
          background="white"
        />

        <MaterialSupplyTeaser
          sectionTitle={t.materialSupplyTeaser.sectionTitle}
          intro={t.materialSupplyTeaser.intro}
          cta={t.materialSupplyTeaser.cta}
          ctaLink={t.materialSupplyTeaser.ctaLink}
        />

        <ProductPageCta lang={lang} />
      </main>

      <Footer />
    </>
  );
};
