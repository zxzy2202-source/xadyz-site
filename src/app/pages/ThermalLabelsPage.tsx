import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { ArrowRight, CheckCircle2, Factory, Clock, Shield, Globe, Package, Barcode, Box, Store, Truck, ShoppingCart, Briefcase } from 'lucide-react';
import { PageShell } from '@/app/components/PageShell';
import { ProductPageCta } from '@/app/components/landing';
import { getContactInquiryUrl } from '@/app/lib/leadConfig';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { content } from './ThermalLabelsPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.factoryLine, alt: "Thermal labels production line" },
  hero: {
    src: PLACEHOLDERS.hero.factoryLine,
    alt: "Thermal label rolls production and slitting",
    overlay: "dark",
    focal: "left",
  },
  gallery: [
    { src: PLACEHOLDERS.product.thermalLabels, alt: "Thermal labels for logistics and retail" },
    { src: PLACEHOLDERS.proof.qualityInspection, alt: "Quality inspection for thermal labels" },
    { src: PLACEHOLDERS.proof.containerLoading, alt: "Container loading for thermal label shipment" },
  ],
  cards: {},
  proofs: [],
};

const getIcon = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    factory: <Factory size={32} className="text-blue-600" />,
    clock: <Clock size={32} className="text-blue-600" />,
    shield: <Shield size={32} className="text-blue-600" />,
    globe: <Globe size={32} className="text-blue-600" />,
    box: <Box size={28} className="text-blue-600" />,
    barcode: <Barcode size={28} className="text-blue-600" />,
    package: <Package size={28} className="text-blue-600" />,
    truck: <Truck size={24} className="text-blue-600" />,
    cart: <ShoppingCart size={24} className="text-blue-600" />,
    store: <Store size={24} className="text-blue-600" />,
    briefcase: <Briefcase size={24} className="text-blue-600" />
  };
  return icons[iconName] || <Package size={32} className="text-blue-600" />;
};

interface ThermalLabelsPageProps {
  lang?: 'en' | 'ru' | 'zh';
  type?: string;
}

export const ThermalLabelsPage: React.FC<ThermalLabelsPageProps> = ({ lang = 'en', type }) => {
  const t = content[lang];

  const isPrintedVariant = type === 'printed';
  const printedTypeConfig = t.productTypes.types.find((p) => p.id === 'printed');
  const heroTitle = isPrintedVariant && printedTypeConfig ? printedTypeConfig.title : t.hero.h1;

  const heroContent = (
    <PageHero
      title={heroTitle}
      description={t.hero.subheading ? `${t.hero.subheading} ${t.hero.intro}` : t.hero.intro}
      primaryCta={{
        label: lang === 'zh' ? '索取报价' : lang === 'ru' ? 'Запросить расчёт' : 'Request Quote',
        href: getContactInquiryUrl(lang, 'thermal_labels', 'quote'),
      }}
      secondaryCta={{
        label: lang === 'zh' ? '申请样品' : lang === 'ru' ? 'Запросить образцы' : 'Request Samples',
        href: getContactInquiryUrl(lang, 'thermal_labels', 'sample'),
      }}
      image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
      overlay={pageAssets.hero.overlay}
      placeholderKey="thermal_labels_hero"
    />
  );

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Thermal Labels',
    description: content.en.seo.description,
    brand: { '@type': 'Brand', name: 'Zhixin Paper' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Zhixin Paper',
      url: 'https://xadyz.com',
    },
    category: 'Thermal Labels / Direct Thermal Labels',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '0.02',
      highPrice: '0.15',
      offerCount: 1,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Zhixin Paper' },
    },
  };

  return (
    <>
      <SEO 
        title={t.seo.title}
        description={t.seo.description}
        keywords={t.seo.keywords}
        lang={lang}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
      </Helmet>
      
      <PageShell lang={lang} hero={heroContent}>
        {/* 02: Overview */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <p className="text-lg text-gray-700 mb-10 max-w-4xl">
            {t.overview.paragraph}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.overview.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 size={24} className="text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-800 font-medium">
                    {feature.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03: Product Types (3 Cards - Frozen) */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-16 mb-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t.productTypes.sectionTitle}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.productTypes.types.map((type) => (
                <div 
                  key={type.id}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {type.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-base">
                    {type.shortDesc}
                  </p>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {type.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      to={getContactInquiryUrl(lang, 'thermal_labels', 'sample')}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:scale-105 transition-all"
                    >
                      {type.cta}
                      <ArrowRight size={20} />
                    </Link>
                    <Link 
                      to={getContactInquiryUrl(lang, 'thermal_labels', 'quote')}
                      className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all"
                    >
                      {lang === 'zh' ? '快速询价' : lang === 'ru' ? 'Быстрый запрос' : 'Quick Quote'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04b: Packaging & Shipping Gallery */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {lang === 'ru'
              ? 'Упаковка и отгрузка термоэтикеток'
              : lang === 'zh'
              ? '热敏标签卷的内包装，纸箱与托盘装柜'
              : 'Thermal Label Rolls Packaging & Shipping'}
          </h2>
          <p className="text-gray-700 mb-8 max-w-3xl">
            {lang === 'ru'
              ? 'Показываем типичную упаковку термоэтикеток: рулоны в плёнке, коробки, паллеты и загрузка контейнера — чтобы вы понимали, как продукция доезжает до склада.'
              : lang === 'zh'
              ? '展示热敏标签卷从卷芯内包、外箱到托盘装柜的典型方式，方便你了解到货前的防护和装载效率。'
              : 'Typical packing for thermal label rolls from inner wrapping and cartons to pallets and container loading, so you can see how goods are protected in transit.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImagePlaceholder type="product" aspectRatio="4:3" size="lg"
              description={lang === 'ru' ? 'Рулоны термоэтикеток в термоусадке / плёнке' : lang === 'zh' ? '卷装热敏标签的膜包/收缩膜内包装' : 'Inner packing of label rolls with film / shrink wrapping'}
              placeholderKey="thermal_labels_packaging_inner" />
            <ImagePlaceholder type="product" aspectRatio="4:3" size="lg"
              description={lang === 'ru' ? 'Картонные коробки с маркировкой и разделителями' : lang === 'zh' ? '带隔板和标签标识的纸箱包装' : 'Carton boxes with dividers and clear labeling'}
              placeholderKey="thermal_labels_packaging_carton" />
            <ImagePlaceholder type="material" aspectRatio="4:3" size="lg"
              description={lang === 'ru' ? 'Паллеты с термоэтикетками, обмотанные стретч-плёнкой' : lang === 'zh' ? '托盘码放标签卷，并用缠绕膜固定' : 'Palletized label rolls wrapped with stretch film'}
              placeholderKey="thermal_labels_packaging_pallet" />
            <ImagePlaceholder type="factory" aspectRatio="4:3" size="lg"
              description={lang === 'ru' ? 'Загрузка паллет с термоэтикетками в контейнер' : lang === 'zh' ? '热敏标签托盘装入集装箱的装柜现场' : 'Container loading of thermal label pallets for export'}
              placeholderKey="thermal_labels_packaging_container" />
          </div>
        </section>

        {/* 04: Manufacturing & Capacity */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {t.manufacturing.sectionTitle}
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto text-center">
            {t.manufacturing.intro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.manufacturing.items.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4">{getIcon(item.icon)}</div>
                <div className="text-base text-gray-700 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 05: Applications (4 Cards - Frozen) */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-16 mb-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t.applications.sectionTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.applications.items.map((item, idx) => (
                <Link key={idx} to={item.link} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="flex justify-center mb-4">{getIcon(item.icon)}</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg text-center group-hover:text-blue-600 transition-colors">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 06: Customization & OEM */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.customization.sectionTitle}</h2>
            <p className="text-lg text-gray-600">{t.customization.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.customization.options.map((option, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:shadow-xl transition-all">
                <div className="flex justify-center mb-4">{getIcon(option.icon)}</div>
                <h3 className="text-xl font-bold text-gray-900">{option.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 07: Quality & Compliance */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-16 mb-24">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.quality.sectionTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.quality.items.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08: CTA Block */}
        <ProductPageCta
          lang={lang}
          headline={t.ctaBlock.headline}
          subtext={t.ctaBlock.subtext}
          primaryButton={t.ctaBlock.button}
          primaryLink={getContactInquiryUrl(lang, 'thermal_labels', 'quote')}
          secondaryLink={getContactInquiryUrl(lang, 'thermal_labels', 'sample')}
        />
      </PageShell>
    </>
  );
};
