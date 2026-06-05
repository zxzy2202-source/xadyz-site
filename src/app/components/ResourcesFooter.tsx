import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { CONTACT } from '@/app/lib/contactConfig';
import { Phone, Send, Mail, MapPin, Globe, BookOpen, Package, Calculator, HelpCircle, Download, ArrowRight, CheckCircle } from 'lucide-react';

interface ResourcesFooterProps {
  lang: 'en' | 'ru' | 'zh';
}

export function ResourcesFooter({ lang }: ResourcesFooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const location = useLocation();

  // Get current path without language prefix
  const getCurrentPath = () => {
    const path = location.pathname;
    return path.replace(/^\/(en|ru|zh)/, '') || '/';
  };

  // Generate language-specific URL
  const getLanguageUrl = (targetLang: string) => {
    const currentPath = getCurrentPath();
    return `/${targetLang}${currentPath}`;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const translations = {
    en: {
      resourcesTitle: 'Resource Center',
      resourcesDesc: 'Knowledge hub for thermal paper industry insights, tools, and guides',
      quickLinks: 'Quick Links',
      resources: [
        { name: 'Blog & Insights', path: '/en/resources/blog-insights', icon: 'blog' },
        { name: 'Tools & Calculators', path: '/en/resources/tools-calculators', icon: 'calculator' },
        { name: 'FAQs', path: '/en/resources/faqs', icon: 'help' }
      ],
      popularResources: 'Popular Resources',
      popularItems: [
        'Container Loading Guide',
        'Thermal Paper Specifications',
        'Export Documentation Checklist',
        'MOQ Calculator'
      ],
      newsletter: {
        title: 'Stay Updated',
        description: 'Get industry insights and updates delivered to your inbox',
        placeholder: 'Enter your email',
        button: 'Subscribe',
        success: 'Successfully subscribed!'
      },
      contact: 'Contact Information',
      downloadPack: 'Download Resource Pack',
      address: CONTACT.addressEn,
      geoNote: 'Thermal Paper Manufacturer China | Resources & Guides',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      copyright: 'Zhixin Paper Co., Ltd. All rights reserved.'
    },
    ru: {
      resourcesTitle: 'Центр ресурсов',
      resourcesDesc: 'База знаний по термобумаге, инструменты и руководства',
      quickLinks: 'Быстрые ссылки',
      resources: [
        { name: 'Блог и аналитика', path: '/ru/resources/blog-insights', icon: 'blog' },
        { name: 'Инструменты', path: '/ru/resources/tools-calculators', icon: 'calculator' },
        { name: 'Вопросы и ответы', path: '/ru/resources/faqs', icon: 'help' }
      ],
      popularResources: 'Популярные ресурсы',
      popularItems: [
        'Руководство по загрузке контейнеров',
        'Спецификации термобумаги',
        'Чек-лист экспортных документов',
        'Калькулятор MOQ'
      ],
      newsletter: {
        title: 'Оставайтесь в курсе',
        description: 'Получайте новости и обновления отрасли на вашу почту',
        placeholder: 'Введите ваш email',
        button: 'Подписаться',
        success: 'Подписка оформлена!'
      },
      contact: 'Контактная информация',
      downloadPack: 'Скачать пакет ресурсов',
      address: CONTACT.addressRu,
      geoNote: 'Производитель термобумаги | Ресурсы и руководства',
      privacy: 'Конфиденциальность',
      terms: 'Условия',
      copyright: 'Zhixin Paper Co., Ltd. Все права защищены.'
    },
    zh: {
      resourcesTitle: '资源中心',
      resourcesDesc: '热敏纸行业洞察、工具和指南知识库',
      quickLinks: '快速链接',
      resources: [
        { name: '博客与洞察', path: '/zh/resources/blog-insights', icon: 'blog' },
        { name: '工具与计算器', path: '/zh/resources/tools-calculators', icon: 'calculator' },
        { name: '常见问题', path: '/zh/resources/faqs', icon: 'help' }
      ],
      popularResources: '热门资源',
      popularItems: [
        '集装箱装载指南',
        '热敏纸规格说明',
        '出口文档检查清单',
        'MOQ计算器'
      ],
      newsletter: {
        title: '订阅更新',
        description: '获取行业洞察和最新资讯',
        placeholder: '输入您的邮箱',
        button: '订阅',
        success: '订阅成功！'
      },
      contact: '联系信息',
      downloadPack: '下载资源包',
      address: CONTACT.addressZh,
      geoNote: '热敏纸生产商 | 资源与指南',
      privacy: '隐私政策',
      terms: '服务条款',
      copyright: '智鑫纸业有限公司。保留所有权利。'
    }
  };

  const t = translations[lang];

  const getResourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'blog':
        return <BookOpen size={20} className="text-blue-600" />;
      case 'package':
        return <Package size={20} className="text-blue-600" />;
      case 'calculator':
        return <Calculator size={20} className="text-blue-600" />;
      case 'help':
        return <HelpCircle size={20} className="text-blue-600" />;
      default:
        return <BookOpen size={20} className="text-blue-600" />;
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-3">{t.newsletter.title}</h3>
              <p className="text-blue-100 text-lg">{t.newsletter.description}</p>
            </div>
            <div>
              {subscribed ? (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 flex items-center gap-4">
                  <CheckCircle size={32} className="text-white" />
                  <span className="text-lg font-semibold">{t.newsletter.success}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletter.placeholder}
                    className="flex-1 px-6 py-4 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    {t.newsletter.button}
                    <ArrowRight size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Resource Center Info */}
        <div>
          <div className="flex flex-col mb-6">
            <span className="text-xl font-black text-white tracking-tighter leading-none uppercase">
              Zhixin<span className="text-blue-400">Paper</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mt-1.5 leading-none">
              {t.resourcesTitle}
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {t.resourcesDesc}
          </p>
          <a
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Download size={18} />
            {t.downloadPack}
          </a>
        </div>

        {/* Quick Links to Resources */}
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">{t.quickLinks}</h3>
          <ul className="space-y-4">
            {t.resources.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group"
                >
                  {getResourceIcon(item.icon)}
                  <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Resources */}
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">{t.popularResources}</h3>
          <ul className="space-y-3">
            {t.popularItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-start gap-2 text-gray-300 hover:text-blue-400 transition-colors group text-sm"
                >
                  <ArrowRight size={16} className="mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  <span>{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">{t.contact}</h3>
          <div className="space-y-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group"
            >
              <Mail size={18} className="text-blue-400" />
              <span className="text-sm font-medium">{CONTACT.email}</span>
            </a>
            <a
              href={CONTACT.telUrl}
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <Phone size={18} className="text-blue-400" />
              <span className="text-sm font-medium">{CONTACT.phone}</span>
            </a>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin size={18} className="text-red-400" />
              <span>{t.address}</span>
            </div>
            <div className="flex gap-3 pt-2">
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-green-500 text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                title="WhatsApp"
              >
                <Send size={20} />
              </a>
              <a
                href={CONTACT.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-blue-400 text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                title="Telegram"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* GEO Signal */}
        <p className="text-gray-400 text-xs uppercase tracking-wider order-1">
          {t.geoNote}
        </p>

        {/* Copyright */}
        <p className="text-gray-500 text-xs order-2">
          © {new Date().getFullYear()} {t.copyright}
        </p>

        {/* Links */}
        <div className="flex gap-6 order-3">
          <a href="#" className="text-gray-400 hover:text-blue-400 text-xs font-medium">
            {t.privacy}
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 text-xs font-medium">
            {t.terms}
          </a>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="max-w-7xl mx-auto px-4 pt-6 mt-6 border-t border-gray-700/30">
        <div className="flex items-center justify-center gap-2">
          <Globe size={16} className="text-gray-400" />
          <div className="flex items-center gap-1">
            <Link
              to={getLanguageUrl('en')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                lang === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              EN
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to={getLanguageUrl('ru')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                lang === 'ru'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              RU
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to={getLanguageUrl('zh')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                lang === 'zh'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              中文
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
