import React from 'react';
import { Link, useLocation } from 'react-router';
import { CONTACT } from '@/app/lib/contactConfig';
import { Phone, Send, Mail, MapPin, MessageSquare, Globe, Award, Clock, Factory, FileText, Package, ShoppingBag, Briefcase } from 'lucide-react';

export const FooterOptimized = () => {
  const location = useLocation();
  const lang = location.pathname.startsWith('/ru') ? 'ru' : location.pathname.startsWith('/zh') ? 'zh' : 'en';

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

  const content = {
    en: {
      tagline: 'Professional thermal paper manufacturer since 2009',
      about: 'Zhixin Paper specializes in thermal paper rolls, thermal labels, and NCR forms for government tenders, distributors, and OEM partners worldwide.',
      
      // Product columns
      finishedProducts: 'Finished Products',
      finishedProductsMenu: [
        { name: 'Products Overview', path: '/en/products', icon: Package },
        { name: 'Thermal Paper Rolls', path: '/en/thermal-paper-rolls', icon: Package },
        { name: 'Thermal Labels', path: '/en/thermal-labels', icon: Package },
        { name: 'NCR Forms', path: '/en/ncr-forms', icon: Package },
      ],
      
      materialSupply: 'Material Supply',
      materialSupplyMenu: [
        { name: 'Material Supply Overview', path: '/en/material-supply', icon: ShoppingBag },
        { name: 'Thermal Jumbo Rolls', path: '/en/material-supply/thermal-jumbo-rolls', icon: ShoppingBag },
        { name: 'Self-Adhesive Materials', path: '/en/material-supply/self-adhesive-jumbo-rolls', icon: ShoppingBag },
        { name: 'Self-Adhesive Sheets', path: '/en/material-supply/self-adhesive-sheets', icon: ShoppingBag },
        { name: 'NCR Jumbo Rolls', path: '/en/material-supply/ncr-jumbo-rolls', icon: ShoppingBag },
        { name: 'NCR Sheets', path: '/en/material-supply/ncr-sheets', icon: ShoppingBag },
      ],
      
      solutions: 'Solutions',
      solutionsMenu: [
        { name: 'Applications Overview', path: '/en/applications', icon: Briefcase },
        { name: 'Government & Tenders', path: '/en/applications/government-tenders', highlight: true, icon: Briefcase },
        { name: 'Request Tender Pack', path: '/en/applications/request-tender-pack', highlight: true, icon: FileText },
      ],
      
      company: 'Company',
      companyMenu: [
        { name: 'About Us', path: '/en/about' },
        { name: 'Manufacturing', path: '/en/manufacturing' },
        { name: 'Resources Center', path: '/en/resources' },
        { name: 'Contact Us', path: '/en/contact' },
      ],
      
      // Contact
      contactUs: 'Contact Us',
      instantMessaging: 'Instant Messaging',
      email: 'Email',
      phone: 'Phone',
      factoryLocation: CONTACT.addressEn,
      
      // Trust signals
      trustSignals: {
        experience: '15+ Years Experience',
        clients: 'Serving 50+ Countries',
        quality: 'ISO Certified Factory',
      },
      
      // Footer bottom
      geoSignal: 'Thermal Paper Manufacturer China | Export to Russia, Kazakhstan, CIS Countries',
      copyright: 'Zhixin Paper Co., Ltd. All rights reserved.',
      
      // Quick actions
      quickActions: 'Quick Actions',
      requestQuote: 'Request Quote',
      downloadCatalog: 'Download Catalog',
      
      language: 'Language',
    },
    
    ru: {
      tagline: 'Профессиональный производитель термобумаги с 2009 года',
      about: 'Zhixin Paper специализируется на термобумаге в рулонах, термоэтикетках и NCR-формах для государственных тендеров, дистрибьюторов и OEM-партнеров по всему миру.',
      
      finishedProducts: 'Готовая продукция',
      finishedProductsMenu: [
        { name: 'Обзор продукции', path: '/ru/products', icon: Package },
        { name: 'Термобумага в рулонах', path: '/ru/thermal-paper-rolls', icon: Package },
        { name: 'Термоэтикетки', path: '/ru/thermal-labels', icon: Package },
        { name: 'NCR-формы', path: '/ru/ncr-forms', icon: Package },
      ],
      
      materialSupply: 'Поставка материалов',
      materialSupplyMenu: [
        { name: 'Обзор материалов', path: '/ru/material-supply', icon: ShoppingBag },
        { name: 'Термобумага Jumbo', path: '/ru/material-supply/thermal-jumbo-rolls', icon: ShoppingBag },
        { name: 'Самоклеящиеся материалы', path: '/ru/material-supply/self-adhesive-jumbo-rolls', icon: ShoppingBag },
        { name: 'Самоклеящиеся листы', path: '/ru/material-supply/self-adhesive-sheets', icon: ShoppingBag },
        { name: 'NCR Jumbo рулоны', path: '/ru/material-supply/ncr-jumbo-rolls', icon: ShoppingBag },
        { name: 'NCR листы', path: '/ru/material-supply/ncr-sheets', icon: ShoppingBag },
      ],
      
      solutions: 'Решения',
      solutionsMenu: [
        { name: 'Государственные тендеры', path: '/ru/applications/government-tenders', highlight: true, icon: Briefcase },
        { name: 'Обзор применений', path: '/ru/applications', icon: Briefcase },
        { name: 'Запросить тендерный пакет', path: '/ru/applications/request-tender-pack', highlight: true, icon: FileText },
      ],
      
      company: 'Компания',
      companyMenu: [
        { name: 'О нас', path: '/ru/about' },
        { name: 'Производство', path: '/ru/manufacturing' },
        { name: 'Ресурсы', path: '/ru/resources' },
        { name: 'Контакты', path: '/ru/contact' },
      ],
      
      contactUs: 'Свяжитесь с нами',
      instantMessaging: 'Мессенджеры',
      email: 'Электронная почта',
      phone: 'Телефон',
      factoryLocation: CONTACT.addressRu,
      
      trustSignals: {
        experience: 'Опыт 15+ лет',
        clients: 'Работаем в 50+ странах',
        quality: 'Сертифицированный завод ISO',
      },
      
      geoSignal: 'Производитель термобумаги в Китае | Экспорт в Россию, Казахстан, страны СНГ',
      copyright: 'Zhixin Paper Co., Ltd. Все права защищены.',
      
      quickActions: 'Быстрые действия',
      requestQuote: 'Запросить цену',
      downloadCatalog: 'Скачать каталог',
      
      language: 'Язык',
    },
    
    zh: {
      tagline: '自2009年起专业生产热敏纸',
      about: '志信纸业专注于热敏纸卷、热敏标签和NCR表格的生产，为全球政府投标、分销商和OEM合作伙伴提供服务。',
      
      finishedProducts: '成品',
      finishedProductsMenu: [
        { name: '产品概览', path: '/zh/products', icon: Package },
        { name: '热敏纸卷', path: '/zh/thermal-paper-rolls', icon: Package },
        { name: '热敏标签', path: '/zh/thermal-labels', icon: Package },
        { name: 'NCR表格', path: '/zh/ncr-forms', icon: Package },
      ],
      
      materialSupply: '材料供应',
      materialSupplyMenu: [
        { name: '材料供应概览', path: '/zh/material-supply', icon: ShoppingBag },
        { name: '热敏Jumbo大卷', path: '/zh/material-supply/thermal-jumbo-rolls', icon: ShoppingBag },
        { name: '不干胶材料', path: '/zh/material-supply/self-adhesive-jumbo-rolls', icon: ShoppingBag },
        { name: '不干胶平张', path: '/zh/material-supply/self-adhesive-sheets', icon: ShoppingBag },
        { name: 'NCR Jumbo大卷', path: '/zh/material-supply/ncr-jumbo-rolls', icon: ShoppingBag },
        { name: 'NCR平张', path: '/zh/material-supply/ncr-sheets', icon: ShoppingBag },
      ],
      
      solutions: '解决方案',
      solutionsMenu: [
        { name: '应用概览', path: '/zh/applications', icon: Briefcase },
        { name: '申请投标资料包', path: '/zh/applications/request-tender-pack', highlight: true, icon: FileText },
      ],
      
      company: '公司',
      companyMenu: [
        { name: '关于我们', path: '/zh/about' },
        { name: '生产制造', path: '/zh/manufacturing' },
        { name: '资源中心', path: '/zh/resources' },
        { name: '联系我们', path: '/zh/contact' },
      ],
      
      contactUs: '联系我们',
      instantMessaging: '即时通讯',
      email: '电子邮件',
      phone: '电话',
      factoryLocation: CONTACT.addressZh,
      
      trustSignals: {
        experience: '15+年经验',
        clients: '服务50+国家',
        quality: 'ISO认证工厂',
      },
      
      geoSignal: '中国热敏纸制造商 | 出口俄罗斯、哈萨克斯坦、独联体国家',
      copyright: '志信纸业有限公司 版权所有',
      
      quickActions: '快速操作',
      requestQuote: '询价',
      downloadCatalog: '下载目录',
      
      language: '语言',
    },
  }[lang];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        {/* Top Section: Company Info + Products + Solutions + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Column 1: Company Info */}
          <div className="lg:col-span-1">
            <Link to={`/${lang}/`} className="inline-block mb-4 group">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-gray-900 tracking-tighter leading-none uppercase">
                  Zhixin<span className="text-blue-600">Paper</span>
                </span>
                <span className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase mt-1.5 leading-none">
                  {content.tagline}
                </span>
              </div>
            </Link>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {content.about}
            </p>
            
            {/* Trust Signals */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Award size={14} className="text-blue-600 flex-shrink-0" />
                <span className="text-xs font-semibold">{content.trustSignals.quality}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={14} className="text-blue-600 flex-shrink-0" />
                <span className="text-xs font-semibold">{content.trustSignals.experience}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Globe size={14} className="text-blue-600 flex-shrink-0" />
                <span className="text-xs font-semibold">{content.trustSignals.clients}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Finished Products */}
          <div>
            <h3 className="text-gray-900 font-bold text-sm mb-5 flex items-center gap-2">
              <Package size={16} className="text-blue-600" />
              {content.finishedProducts}
            </h3>
            <ul className="space-y-3">
              {content.finishedProductsMenu.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Material Supply sub-section */}
            <h3 className="text-gray-900 font-bold text-sm mb-4 mt-6 flex items-center gap-2">
              <ShoppingBag size={16} className="text-blue-600" />
              {content.materialSupply}
            </h3>
            <ul className="space-y-3">
              {content.materialSupplyMenu.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solutions (Government Tenders Highlighted) */}
          <div>
            <h3 className="text-gray-900 font-bold text-sm mb-5 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-600" />
              {content.solutions}
            </h3>
            <ul className="space-y-3">
              {content.solutionsMenu.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`text-sm transition-all flex items-center gap-2 group ${
                      item.highlight 
                        ? 'text-blue-600 font-semibold hover:text-blue-700' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {item.icon && <item.icon size={14} className={item.highlight ? 'text-blue-600' : 'text-gray-400'} />}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Company Links */}
            <h3 className="text-gray-900 font-bold text-sm mb-4 mt-6">
              {content.company}
            </h3>
            <ul className="space-y-3">
              {content.companyMenu.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4-5: Contact Information (Takes 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-bold text-sm mb-5">
              {content.contactUs}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Traditional Contact */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-2">{content.email}</p>
                  <a 
                    href={`mailto:${CONTACT.email}`} 
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <Mail size={16} className="text-blue-600" />
                    <span className="text-sm font-semibold">{CONTACT.email}</span>
                  </a>
                  <a 
                    href={`mailto:${CONTACT.emailSecondary}`} 
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group mt-2"
                  >
                    <FileText size={16} className="text-orange-600" />
                    <span className="text-sm font-semibold">{CONTACT.emailSecondary}</span>
                  </a>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-2">{content.phone}</p>
                  <a 
                    href={CONTACT.telUrl} 
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Phone size={16} className="text-blue-600" />
                    <span className="text-sm font-semibold">{CONTACT.phone}</span>
                  </a>
                </div>
                
                <div className="flex items-start gap-2 text-gray-600 pt-2">
                  <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs font-semibold">{content.factoryLocation}</span>
                </div>
              </div>
              
              {/* Right: Instant Messaging (Prominent) */}
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-3">{content.instantMessaging}</p>
                <div className="space-y-3">
                  <a 
                    href={CONTACT.whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all group"
                  >
                    <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <MessageSquare size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">WhatsApp</p>
                      <p className="text-xs text-green-100">
                        {lang === 'en' ? 'Click to chat' : lang === 'ru' ? 'Нажмите для чата' : '点击聊天'}
                      </p>
                    </div>
                  </a>
                  
                  <a 
                    href={CONTACT.telegramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all group"
                  >
                    <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Send size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">Telegram</p>
                      <p className="text-xs text-blue-100">
                        {lang === 'en' ? 'Instant response' : lang === 'ru' ? 'Мгновенный ответ' : '即时回复'}
                      </p>
                    </div>
                  </a>
                </div>
                
                {/* Quick CTA */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    to={`/${lang}/applications/request-tender-pack`}
                    className="block text-center bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold"
                  >
                    <span aria-hidden="true">📄</span> {content.solutionsMenu[content.solutionsMenu.length - 1].name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: GEO Signal (Yandex SEO) */}
          <div className="flex items-center gap-2 text-gray-600 order-1">
            <Factory size={14} className="text-gray-400 flex-shrink-0" />
            <p className="text-xs font-semibold">
              {content.geoSignal}
            </p>
          </div>
          
          {/* Center: Copyright */}
          <p className="text-gray-500 text-xs order-3 md:order-2">
            © {new Date().getFullYear()} {content.copyright}
          </p>
          
          {/* Right: Language Switcher */}
          <div className="flex items-center gap-3 order-2 md:order-3">
            <span className="text-xs text-gray-500 font-semibold">{content.language}:</span>
            <div className="flex items-center gap-1">
              <Link 
                to={getLanguageUrl('en')} 
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  lang === 'en' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                EN
              </Link>
              <Link 
                to={getLanguageUrl('ru')} 
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  lang === 'ru' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                RU
              </Link>
              <Link 
                to={getLanguageUrl('zh')} 
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  lang === 'zh' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                中文
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};