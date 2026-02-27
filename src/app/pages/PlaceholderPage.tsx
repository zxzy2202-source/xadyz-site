import React from 'react';
import { Header } from '@/app/components/Header';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';

interface PlaceholderPageProps {
  title: string;
  lang: 'en' | 'ru' | 'zh';
}

export function PlaceholderPage({ title, lang }: PlaceholderPageProps) {
  const translations = {
    en: {
      comingSoon: 'Coming Soon',
      description: 'This page is currently under development. Please check back soon.',
      backToHome: 'Back to Home'
    },
    ru: {
      comingSoon: 'Скоро будет доступно',
      description: 'Эта страница находится в разработке. Пожалуйста, зайдите позже.',
      backToHome: 'Вернуться на главную'
    },
    zh: {
      comingSoon: '即将推出',
      description: '此页面正在开发中，请稍后再来查看。',
      backToHome: '返回首页'
    }
  };

  const t = translations[lang];

  return (
    <>
      <SEO
        title={`${title} | Zhixin Paper - B2B Thermal Paper & Labels Supplier`}
        description={`${title} - ${t.description}`}
        lang={lang}
      />
      <div className="min-h-screen flex flex-col bg-white">
        <Header lang={lang} />
        
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-6">
                <svg 
                  className="w-16 h-16 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
              <p className="text-xl text-gray-600 mb-2">{t.comingSoon}</p>
              <p className="text-base text-gray-500">{t.description}</p>
            </div>
            
            <a 
              href={`/${lang}/`}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {t.backToHome}
            </a>
          </div>
        </main>
        
        <Footer lang={lang} />
      </div>
    </>
  );
}
