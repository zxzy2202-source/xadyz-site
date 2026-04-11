import React from 'react';
import { Link, useLocation } from 'react-router';
import { Header } from '@/app/components/Header';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';
import { Home, Package, MessageCircle, ArrowLeft } from 'lucide-react';

const content = {
  en: {
    title: '404 – Page Not Found',
    heading: 'Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    backHome: 'Back to Home',
    browseProducts: 'Browse Products',
    contactUs: 'Contact Us',
    suggestions: 'You might be looking for:',
    links: [
      { label: 'Thermal Paper Rolls', path: '/en/thermal-paper-rolls' },
      { label: 'Thermal Labels', path: '/en/thermal-labels' },
      { label: 'NCR Forms', path: '/en/ncr-forms' },
      { label: 'About Us', path: '/en/about' },
      { label: 'Request Tender Pack', path: '/en/applications/request-tender-pack' },
    ],
  },
  ru: {
    title: '404 – Страница не найдена',
    heading: 'Страница не найдена',
    description: 'Страница, которую вы ищете, не существует или была перемещена.',
    backHome: 'На главную',
    browseProducts: 'Просмотр продукции',
    contactUs: 'Связаться с нами',
    suggestions: 'Возможно, вы искали:',
    links: [
      { label: 'Термобумага в рулонах', path: '/ru/thermal-paper-rolls' },
      { label: 'Термоэтикетки', path: '/ru/thermal-labels' },
      { label: 'NCR-формы', path: '/ru/ncr-forms' },
      { label: 'О нас', path: '/ru/about' },
      { label: 'Тендерный пакет', path: '/ru/applications/request-tender-pack' },
    ],
  },
  zh: {
    title: '404 – 页面未找到',
    heading: '页面未找到',
    description: '您访问的页面不存在或已被移动。',
    backHome: '返回首页',
    browseProducts: '浏览产品',
    contactUs: '联系我们',
    suggestions: '您可能在找：',
    links: [
      { label: '热敏纸卷', path: '/zh/thermal-paper-rolls' },
      { label: '热敏标签', path: '/zh/thermal-labels' },
      { label: 'NCR表格', path: '/zh/ncr-forms' },
      { label: '关于我们', path: '/zh/about' },
      { label: '申请投标资料包', path: '/zh/applications/request-tender-pack' },
    ],
  },
};

export function NotFoundPage() {
  const location = useLocation();
  const lang = location.pathname.startsWith('/ru')
    ? 'ru'
    : location.pathname.startsWith('/zh')
    ? 'zh'
    : 'en';

  const t = content[lang];
  const homeUrl = `/${lang}/`;
  const productsUrl = `/${lang}/products`;
  const contactUrl = `/${lang}/contact`;

  return (
    <>
      <SEO
        title={t.title}
        description={t.description}
        lang={lang}
      />
      <div className="min-h-screen flex flex-col bg-white">
        <Header lang={lang} />

        <main className="flex-1 flex items-center justify-center px-4 py-24">
          <div className="max-w-2xl w-full text-center">
            {/* 404 number */}
            <div className="relative inline-block mb-6">
              <span className="text-[120px] md:text-[160px] font-extrabold text-gray-100 leading-none select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                  <Package size={32} className="text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t.heading}
            </h1>
            <p className="text-gray-500 mb-10 max-w-md mx-auto">
              {t.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Link
                to={homeUrl}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Home size={18} />
                {t.backHome}
              </Link>
              <Link
                to={productsUrl}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-colors shadow-sm"
              >
                <Package size={18} />
                {t.browseProducts}
              </Link>
              <Link
                to={contactUrl}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-colors shadow-sm"
              >
                <MessageCircle size={18} />
                {t.contactUs}
              </Link>
            </div>

            {/* Quick links */}
            <div className="border-t border-gray-100 pt-8">
              <p className="text-sm text-gray-400 mb-4">{t.suggestions}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {t.links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <ArrowLeft size={13} className="rotate-180" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
