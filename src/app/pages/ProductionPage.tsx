import React from 'react';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { PageShell } from '@/app/components/PageShell';
import { FactoryStatsSection, ProductionLineCard, CapacityListSection, ManufacturingNav, QualityContentSection, ShippingContentSection } from '@/app/components/manufacturing';
import { MANUFACTURING_NAV_ITEMS } from '@/app/lib/manufacturingNavConfig';
import { ContactCtaSection } from '@/app/components/contact';
import { content } from './ProductionPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.factoryLine, alt: 'Thermal paper and label manufacturing facility' },
  hero: {
    src: PLACEHOLDERS.hero.factoryLine,
    alt: 'Thermal paper slitting and label production lines',
    overlay: 'dark',
    focal: 'left',
  },
  gallery: [
    { src: PLACEHOLDERS.proof.slittingMachine, alt: 'Slitting machine for thermal paper' },
    { src: PLACEHOLDERS.proof.qualityInspection, alt: 'Quality inspection and testing' },
    { src: PLACEHOLDERS.proof.warehousePallets, alt: 'Jumbo rolls on pallets in warehouse' },
    { src: PLACEHOLDERS.proof.containerLoading, alt: 'Container loading for shipment' },
  ],
  cards: {},
  proofs: [
    { src: PLACEHOLDERS.proof.slittingMachine, alt: 'Slitting machine', tag: 'factory' },
    { src: PLACEHOLDERS.proof.slittingMachine, alt: 'Production line', tag: 'production' },
    { src: PLACEHOLDERS.proof.qualityInspection, alt: 'Quality inspection', tag: 'quality' },
    { src: PLACEHOLDERS.proof.warehousePallets, alt: 'Warehouse pallets', tag: 'warehouse' },
    { src: PLACEHOLDERS.proof.containerLoading, alt: 'Container loading', tag: 'shipping' },
    { src: PLACEHOLDERS.proof.certificatesWall, alt: 'Quality certifications', tag: 'cert' },
  ],
};

function getSubDesc(lang: 'en' | 'ru' | 'zh', section?: string): string {
  const t = content[lang];
  const map: Record<string, Record<string, string>> = {
    zh: {
      factory: '志信纸业拥有位于中国的现代化工厂设施，占地面积超过10,000平方米，配备先进的生产设备和完善的仓储物流系统。',
      production: '我们配备多条高速热敏纸分切线、标签印刷线和精密模切设备，日产能超过30吨，满足大批量订单需求。',
      capacity: '我们的工厂配备现代化高速分切和印刷生产线。确保稳定的生产能力——每天超过30吨成品。',
      quality: '我们实施了5阶段质量控制系统。每件产品都检查密度、热敏打印清晰度和粘合层强度。',
      shipping: '可靠的出口包装（防潮膜、加固托盘）。保证货物在海运和铁路运输到俄罗斯及独联体国家时的安全。',
    },
    ru: {
      factory: 'Zhixin Paper владеет современным производственным комплексом в Китае площадью более 10,000 кв.м, оснащенным передовым оборудованием и полноценной складской логистической системой.',
      production: 'Наше предприятие оборудовано несколькими высокоскоростными линиями резки термобумаги, линиями печати этикеток и прецизионным высечным оборудованием. Суточная производительность превышает 30 тонн, что позволяет выполнять крупные заказы.',
      capacity: 'Наш завод оснащен современными высокоскоростными линиями резки и печати. Мы обеспечиваем стабильный объем производства — более 30 тонн готовой продукции в день.',
      quality: 'Мы внедрили 5-этапную систему контроля качества. Каждое изделие проверяется на плотность, четкость термопечати и прочность клеевого слоя.',
      shipping: 'Надежная экспортная упаковка (влагостойкая пленка, усиленные поддоны). Гарантируем сохранность груза при морской и железнодорожной перевозке в Россию и СНГ.',
    },
    en: {
      factory: 'Zhixin Paper owns a modern manufacturing facility in China spanning over 10,000 square meters, equipped with advanced production equipment and comprehensive warehousing logistics systems.',
      production: 'Our facility features multiple high-speed thermal paper slitting lines, label printing lines, and precision die-cutting equipment. Daily output exceeds 30 tons, capable of fulfilling large-volume orders.',
      capacity: 'Our factory is equipped with modern high-speed slitting and printing lines. We ensure stable production — over 30 tons of finished products per day.',
      quality: 'We have implemented a 5-stage quality control system. Each product is checked for density, thermal print clarity, and adhesive layer strength.',
      shipping: 'Reliable export packaging (moisture-resistant film, reinforced pallets). We guarantee cargo safety during sea and rail transportation to Russia and CIS countries.',
    },
  };
  return (section && map[lang]?.[section]) || t.heroDesc;
}

function getMeta(lang: 'en' | 'ru' | 'zh', section?: string) {
  const t = content[lang];
  const base = { h1: t.h1, title: t.title, canonical: `/${lang}/manufacturing` };
  const map: Record<string, { h1: string; title: string; canonical: string }> = {
    factory: {
      h1: lang === 'ru' ? 'Обзор завода - Собственное производство в Китае' : lang === 'zh' ? '工厂概述 - 中国自有生产基地' : 'Factory Overview - Own Manufacturing Facility in China',
      title: lang === 'ru' ? 'Обзор завода Zhixin Paper | Производство в Китае' : lang === 'zh' ? '志信纸业工厂概述 | 中国生产基地' : 'Factory Overview | Zhixin Paper Manufacturing in China',
      canonical: `/${lang}/manufacturing/factory-overview`,
    },
    production: {
      h1: lang === 'ru' ? 'Производственные линии - Оборудование и технологии' : lang === 'zh' ? '生产线 - 设备与技术' : 'Production Lines - Equipment & Technology',
      title: lang === 'ru' ? 'Производственные линии Zhixin Paper | Оборудование и мощности' : lang === 'zh' ? '志信纸业生产线 | 设备与产能' : 'Production Lines | Zhixin Paper Equipment & Capacity',
      canonical: `/${lang}/manufacturing/production-lines`,
    },
    capacity: {
      h1: lang === 'ru' ? 'Производственные мощности завода' : lang === 'zh' ? '工厂生产能力' : 'Factory Production Capacity',
      title: lang === 'ru' ? 'Производственные мощности Zhixin Paper | Завод в Китае' : lang === 'zh' ? '志信纸业生产能力 | 中国工厂' : 'Production Capacities | Zhixin Paper Factory',
      canonical: `/${lang}/production-capacity`,
    },
    quality: {
      h1: lang === 'ru' ? 'Контроль качества продукции' : lang === 'zh' ? '产品质量控制' : 'Product Quality Control',
      title: lang === 'ru' ? 'Контроль качества Zhixin Paper | Гарантия надежности' : lang === 'zh' ? '志信纸业质量控制 | 可靠性保证' : 'Quality Control & Standards | Zhixin Paper',
      canonical: `/${lang}/quality-control`,
    },
    shipping: {
      h1: lang === 'ru' ? 'Упаковка и отгрузка продукции' : lang === 'zh' ? '产品包装与发货' : 'Packaging and Shipping',
      title: lang === 'ru' ? 'Упаковка и экспортная отгрузка | Zhixin Paper' : lang === 'zh' ? '包装与出口物流 | 志信纸业' : 'Packaging & Export Logistics | Zhixin Paper',
      canonical: `/${lang}/packaging-shipping`,
    },
  };
  return section && map[section] ? { ...base, ...map[section] } : base;
}

export const ProductionPage = ({ lang, section }: { lang: 'en' | 'ru' | 'zh'; section?: string }) => {
  const t = content[lang];
  const meta = getMeta(lang, section);
  const subDesc = getSubDesc(lang, section);

  const heroContent = (
    <div className="-mt-32 pt-32 mb-20">
      <PageHero
        title={meta.h1}
        description={subDesc}
        image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
        overlay={pageAssets.hero.overlay}
        placeholderKey={
          section === 'production' ? 'production_lines_hero' :
          section === 'factory' ? 'factory_overview_hero' :
          section === 'quality' ? 'quality_control_hero' :
          'manufacturing_hero'
        }
      />
    </div>
  );

  const canonical =
    section === 'quality' ? `/${lang}/quality` : section === 'shipping' ? `/${lang}/packaging-logistics` : `/${lang}/manufacturing`;

  return (
    <>
      <SEO
        title={meta.title}
        description={t.desc}
        lang={lang}
        canonical={canonical}
        hreflangs={{
          en: section === 'quality' ? '/en/quality' : section === 'shipping' ? '/en/packaging-logistics' : '/en/manufacturing',
          ru: section === 'quality' ? '/ru/quality' : section === 'shipping' ? '/ru/packaging-logistics' : '/ru/manufacturing',
          zh: section === 'quality' ? '/zh/quality' : section === 'shipping' ? '/zh/packaging-logistics' : '/zh/manufacturing',
        }}
      />
      <PageShell lang={lang} hero={heroContent}>
        <ManufacturingNav lang={lang} items={MANUFACTURING_NAV_ITEMS[lang]} />

        {section === 'factory' && (
          <FactoryStatsSection
            title={t.factoryTitle}
            intro={t.factoryIntro}
            items={t.factoryStats}
          />
        )}

        {section === 'production' && (
          <>
            <section className="pt-16 px-4 bg-white">
              <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {t.productionTitle}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl">
                    {t.productionIntro}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <div className="aspect-video">
                      <ImagePlaceholder type="factory" aspectRatio="16:9" description="印刷模块" size="lg" placeholderKey="production_lines_printing" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2">
                      <div className="aspect-video">
                        <ImagePlaceholder type="factory" aspectRatio="16:9" description="印刷设备1" size="md" placeholderKey="production_lines_printing_1" />
                      </div>
                      <div className="aspect-video">
                        <ImagePlaceholder type="factory" aspectRatio="16:9" description="印刷设备2" size="md" placeholderKey="production_lines_printing_2" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">印刷</h3>
                      <p className="text-gray-600 text-sm">多色标签印刷生产线，柔版印刷机支持1-6色印刷</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <div className="aspect-video">
                      <ImagePlaceholder type="factory" aspectRatio="16:9" description="分切模块" size="lg" placeholderKey="production_lines_slitting" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2">
                      <div className="aspect-video">
                        <ImagePlaceholder type="factory" aspectRatio="16:9" description="分切设备1" size="md" placeholderKey="production_lines_slitting_1" />
                      </div>
                      <div className="aspect-video">
                        <ImagePlaceholder type="factory" aspectRatio="16:9" description="分切设备2" size="md" placeholderKey="production_lines_slitting_2" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">分切</h3>
                      <p className="text-gray-600 text-sm">高速热敏纸分切生产线，最大幅宽1650mm，分切精度±0.5mm</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <div className="aspect-video">
                      <ImagePlaceholder type="factory" aspectRatio="16:9" description="包装模块" size="lg" placeholderKey="production_lines_packaging" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2">
                      <div className="aspect-video">
                        <ImagePlaceholder type="factory" aspectRatio="16:9" description="包装设备1" size="md" placeholderKey="production_lines_packaging_1" />
                      </div>
                      <div className="aspect-video">
                        <ImagePlaceholder type="factory" aspectRatio="16:9" description="包装设备2" size="md" placeholderKey="production_lines_packaging_2" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">包装</h3>
                      <p className="text-gray-600 text-sm">自动化包装系统，确保产品安全与质量</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <div className="aspect-video">
                      <ImagePlaceholder type="factory" aspectRatio="16:9" description="机器打包模块" size="lg" placeholderKey="production_lines_machine_packing" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2">
                      <div className="aspect-video">
                        <ImagePlaceholder type="factory" aspectRatio="16:9" description="打包设备1" size="md" placeholderKey="production_lines_machine_packing_1" />
                      </div>
                      <div className="aspect-video">
                        <ImagePlaceholder type="factory" aspectRatio="16:9" description="打包设备2" size="md" placeholderKey="production_lines_machine_packing_2" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">机器打包</h3>
                      <p className="text-gray-600 text-sm">全自动打包设备，高效完成产品打包与码垛</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="pb-24 px-4 bg-white">
              <div className="max-w-7xl mx-auto mt-12 space-y-8">
                {t.lines.map((line, i) => (
                  <ProductionLineCard
                    key={i}
                    icon={line.icon}
                    title={line.title}
                    description={line.desc}
                    tags={line.tags}
                    colorScheme={i === 0 ? 'blue' : i === 1 ? 'green' : 'purple'}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {section === 'quality' && (
          <QualityContentSection
            title={t.qcTitle}
            intro={t.qcIntro}
            points={t.qcPoints}
          />
        )}

        {section === 'shipping' && (
          <ShippingContentSection
            title={t.shippingTitle}
            intro={t.shippingIntro}
            features={t.shippingFeatures}
          />
        )}

        {(!section || section === 'capacity' || section === 'quality' || section === 'shipping') && (
          <CapacityListSection title={t.capacityTitle} items={t.capacities} />
        )}

        <ContactCtaSection ctaTitle={t.cooperationTitle} />
      </PageShell>
    </>
  );
};
