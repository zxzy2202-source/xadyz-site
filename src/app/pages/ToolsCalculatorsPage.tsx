import React, { useState } from 'react';
import { Header } from '@/app/components/Header';
import { ResourcesFooter } from '@/app/components/ResourcesFooter';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { BreadcrumbNav } from '@/app/components/BreadcrumbNav';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { Calculator, Ruler, DollarSign, Package, TrendingUp, Download } from 'lucide-react';
import { content } from './ToolsCalculatorsPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.warehouse, alt: 'Tools and calculators' },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: 'Tools and calculators for thermal paper planning',
    overlay: 'light',
    focal: 'center',
  },
  gallery: [{ src: PLACEHOLDERS.gallery.g1, alt: 'Calculation tools and resources' }],
  cards: {},
  proofs: [],
};

interface ToolsCalculatorsPageProps {
  lang: 'en' | 'ru' | 'zh';
}

const getToolIcon = (iconType: string) => {
  switch (iconType) {
    case 'dollar': return <DollarSign className="w-12 h-12 text-blue-600" />;
    case 'ruler': return <Ruler className="w-12 h-12 text-blue-600" />;
    case 'package': return <Package className="w-12 h-12 text-blue-600" />;
    case 'trending': return <TrendingUp className="w-12 h-12 text-blue-600" />;
    case 'calculator': return <Calculator className="w-12 h-12 text-blue-600" />;
    case 'download': return <Download className="w-12 h-12 text-blue-600" />;
    default: return <Calculator className="w-12 h-12 text-blue-600" />;
  }
};

export function ToolsCalculatorsPage({ lang }: ToolsCalculatorsPageProps) {
  const [roiInputs, setRoiInputs] = useState({ monthlyUsage: '', currentPrice: '', ourPrice: '' });
  const t = content[lang];

  const calculateROI = () => {
    const usage = parseFloat(roiInputs.monthlyUsage);
    const current = parseFloat(roiInputs.currentPrice);
    const our = parseFloat(roiInputs.ourPrice);
    if (usage && current && our) {
      const monthlySavings = usage * (current - our);
      const annualSavings = monthlySavings * 12;
      const roi = ((current - our) / current * 100).toFixed(1);
      return { monthly: monthlySavings.toFixed(2), annual: annualSavings.toFixed(2), roi, breakeven: '< 1 month' };
    }
    return null;
  };

  const results = calculateROI();

  return (
    <>
      <SEO
        title={`${t.hero.title} | Zhixin Paper - B2B Thermal Paper Supplier`}
        description={t.hero.description}
        lang={lang}
      />
      <div className="min-h-screen flex flex-col bg-white">
        <Header lang={lang} />

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-10">
            <BreadcrumbNav lang={lang} />
          </div>
          <PageHero
            eyebrow={t.hero.subtitle}
            title={t.hero.title}
            description={t.hero.description}
            image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
            overlay={pageAssets.hero.overlay}
            placeholderKey="tools_hero"
          />
        </div>

        {/* Tools Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.tools.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.tools.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.tools.items.map((tool, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform">
                    {getToolIcon(tool.icon)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{tool.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{tool.description}</p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center gap-2">
                    {tool.action} <span>→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive ROI Calculator */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.roiCalculator.title}</h2>
              <p className="text-xl text-gray-600">{t.roiCalculator.description}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-xl">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.roiCalculator.monthlyUsage}</label>
                  <input type="number" value={roiInputs.monthlyUsage} onChange={(e) => setRoiInputs({ ...roiInputs, monthlyUsage: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="1000" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.roiCalculator.currentPrice}</label>
                  <input type="number" step="0.01" value={roiInputs.currentPrice} onChange={(e) => setRoiInputs({ ...roiInputs, currentPrice: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="2.50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.roiCalculator.ourPrice}</label>
                  <input type="number" step="0.01" value={roiInputs.ourPrice} onChange={(e) => setRoiInputs({ ...roiInputs, ourPrice: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="2.00" />
                </div>
              </div>
              {results && (
                <div className="bg-white rounded-xl p-8 border-2 border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t.roiCalculator.results.title}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{t.roiCalculator.results.monthlySavings}</div>
                      <div className="text-3xl font-bold text-green-600">${results.monthly}</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{t.roiCalculator.results.annualSavings}</div>
                      <div className="text-3xl font-bold text-green-600">${results.annual}</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{t.roiCalculator.results.roi}</div>
                      <div className="text-3xl font-bold text-blue-600">{results.roi}%</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{t.roiCalculator.results.breakeven}</div>
                      <div className="text-3xl font-bold text-blue-600">{results.breakeven}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Guides & Resources */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.guides.title}</h2>
              <p className="text-xl text-gray-600">{t.guides.description}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {t.guides.items.map((guide, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Download className="w-10 h-10 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{guide.type}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{guide.title}</h3>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    {t.download} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">{t.cta.title}</h2>
            <p className="text-xl text-blue-100 mb-8">{t.cta.description}</p>
            <a href={`/${lang}/contact`} className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg">
              {t.cta.button}
            </a>
          </div>
        </section>

        <ResourcesFooter lang={lang} />
      </div>
    </>
  );
}
