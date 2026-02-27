import React from 'react';
import { useLocation, Link } from 'react-router';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/app/components/ui/breadcrumb';

interface BreadcrumbNavProps {
  lang: 'en' | 'ru' | 'zh';
}

/**
 * ✅ Breadcrumb Translation Rules (Strictly Following URL Structure)
 * 
 * IMPORTANT:
 * - Breadcrumb hierarchy must strictly follow URL structure
 * - Do NOT skip levels, merge categories, or add fictional classifications
 * - Translate text per language, do NOT rewrite category names
 * - Russian market clarity is the highest standard
 */

// 首页文本
const homeText = {
  en: 'Home',
  ru: 'Главная',
  zh: '首页'
};

// 路径名称翻译映射（完整版）
const pathTranslations: Record<string, Record<string, string>> = {
  // ========== PRODUCTS ==========
  products: {
    en: 'Products',
    ru: 'Продукция',
    zh: '产品中心'
  },
  
  // Thermal Paper Category
  'thermal-paper': {
    en: 'Thermal Paper',
    ru: 'Термобумага',
    zh: '热敏纸'
  },
  'thermal-paper-rolls': {
    en: 'Thermal Paper Rolls',
    ru: 'Рулоны термобумаги',
    zh: '热敏纸卷'
  },
  'thermal-labels': {
    en: 'Thermal Labels',
    ru: 'Термоэтикетки',
    zh: '热敏标签'
  },
  
  // Thermal Paper Sub-types
  blank: {
    en: 'Blank',
    ru: 'Пустые',
    zh: '空白'
  },
  printed: {
    en: 'Printed',
    ru: 'Печатные',
    zh: '印刷'
  },
  
  // Specific Thermal Products
  'pos-thermal-paper': {
    en: 'POS Thermal Paper',
    ru: 'POS термобумага',
    zh: 'POS热敏纸'
  },
  'atm-thermal-paper': {
    en: 'ATM Thermal Paper',
    ru: 'ATM термобумага',
    zh: 'ATM热敏纸'
  },
  'bpa-free-thermal-paper': {
    en: 'BPA-Free Thermal Paper',
    ru: 'Термобумага без BPA',
    zh: '无BPA热敏纸'
  },
  'thermal-labels-4x6': {
    en: '4x6 Thermal Labels',
    ru: 'Термоэтикетки 4×6',
    zh: '4x6热敏标签'
  },
  'thermal-labels-a6': {
    en: 'A6 Thermal Labels',
    ru: 'Термоэтикетки A6',
    zh: 'A6热敏标签'
  },
  'logistics-labels': {
    en: 'Logistics Labels',
    ru: 'Логистические этикетки',
    zh: '物流标签'
  },
  
  // NCR Forms
  'ncr-forms': {
    en: 'NCR Forms',
    ru: 'Самокопирующаяся бумага',
    zh: '无碳复写纸'
  },
  continuous: {
    en: 'Continuous',
    ru: 'Непрерывные',
    zh: '连续'
  },
  
  // ========== MATERIAL SUPPLY ==========
  'material-supply': {
    en: 'Material Supply',
    ru: 'Сырьё',
    zh: '原材料供应'
  },
  'thermal-jumbo-rolls': {
    en: 'Thermal Jumbo Rolls',
    ru: 'Термо джамбо-рулоны',
    zh: '热敏原纸（巨型卷）'
  },
  'self-adhesive-jumbo-rolls': {
    en: 'Self-Adhesive Jumbo Rolls',
    ru: 'Самоклеющиеся джамбо-рулоны',
    zh: '不干胶原纸（巨型卷）'
  },
  'self-adhesive-sheets': {
    en: 'Self-Adhesive Sheets',
    ru: 'Самоклеющиеся листы',
    zh: '不干胶片材'
  },
  'ncr-jumbo-rolls': {
    en: 'NCR Jumbo Rolls',
    ru: 'NCR джамбо-рулоны',
    zh: '无碳复写原纸（巨型卷）'
  },
  'ncr-sheets': {
    en: 'NCR Sheets',
    ru: 'NCR листы',
    zh: '无碳复写片材'
  },
  'jumbo-rolls': {
    en: 'Jumbo Rolls',
    ru: 'Джамбо-рулоны',
    zh: '巨型卷'
  },
  
  // ========== APPLICATIONS ==========
  applications: {
    en: 'Applications',
    ru: 'Отраслевые решения',
    zh: '应用场景'
  },
  'government-tenders': {
    en: 'Government Tenders',
    ru: 'Государственные тендеры',
    zh: '政府投标'
  },
  'retail-pos': {
    en: 'Retail & POS',
    ru: 'Розничная торговля и POS',
    zh: '零售与POS'
  },
  'logistics-warehousing': {
    en: 'Logistics & Warehousing',
    ru: 'Логистика и складирование',
    zh: '物流与仓储'
  },
  logistics: {
    en: 'Logistics',
    ru: 'Логистика',
    zh: '物流'
  },
  healthcare: {
    en: 'Healthcare',
    ru: 'Здравоохранение',
    zh: '医疗健康'
  },
  supermarkets: {
    en: 'Supermarkets',
    ru: 'Супермаркеты',
    zh: '超市'
  },
  'banking-finance': {
    en: 'Banking & Finance',
    ru: 'Банковский сектор и финансы',
    zh: '银行与金融'
  },
  
  // ========== MANUFACTURING ==========
  manufacturing: {
    en: 'Manufacturing',
    ru: 'Производство',
    zh: '生产制造'
  },
  'factory-overview': {
    en: 'Factory Overview',
    ru: 'Обзор завода',
    zh: '工厂概况'
  },
  'production-lines': {
    en: 'Production Lines',
    ru: 'Производственные линии',
    zh: '生产线'
  },
  'quality-control': {
    en: 'Quality Control',
    ru: 'Контроль качества',
    zh: '质量控制'
  },
  certifications: {
    en: 'Certifications',
    ru: 'Сертификаты',
    zh: '认证资质'
  },
  'oem-customization': {
    en: 'OEM & Customization',
    ru: 'OEM и кастомизация',
    zh: 'OEM定制'
  },
  'packaging-shipping': {
    en: 'Packaging & Shipping',
    ru: 'Упаковка и отгрузка',
    zh: '包装运输'
  },
  
  // ========== RESOURCES ==========
  resources: {
    en: 'Resources',
    ru: 'Ресурсы',
    zh: '资源中心'
  },
  'resources-center': {
    en: 'Resource Center',
    ru: 'Центр ресурсов',
    zh: '资源中心'
  },
  'blog-insights': {
    en: 'Blog & Insights',
    ru: 'Блог и аналитика',
    zh: '博客与洞察'
  },
  'tools-calculators': {
    en: 'Tools & Calculators',
    ru: 'Инструменты и калькуляторы',
    zh: '工具与计算器'
  },
  faqs: {
    en: 'FAQs',
    ru: 'Часто задаваемые вопросы',
    zh: '常见问题'
  },
  'packaging-logistics': {
    en: 'Packaging & Logistics',
    ru: 'Упаковка и логистика',
    zh: '包装与物流'
  },
  
  // ========== COMPANY ==========
  contact: {
    en: 'Contact',
    ru: 'Контакты',
    zh: '联系我们'
  },
  kontakty: {
    en: 'Contact',
    ru: 'Контакты',
    zh: '联系我们'
  },
  about: {
    en: 'About',
    ru: 'О компании',
    zh: '关于我们'
  },
  'request-tender-pack': {
    en: 'Request Tender Pack',
    ru: 'Запрос тендерного пакета',
    zh: '申请招标资料包'
  }
};

/**
 * Get translation for a path segment
 * Falls back to capitalized path segment if translation not found
 */
const getTranslation = (pathSegment: string, lang: string): string => {
  const translations = pathTranslations[pathSegment];
  if (translations && translations[lang]) {
    return translations[lang];
  }
  
  // Fallback: capitalize first letter of each word
  return pathSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ lang }) => {
  const location = useLocation();
  
  // Parse pathname into segments, removing language prefix
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment && segment !== lang);
  
  // Don't show breadcrumb on homepage
  if (pathSegments.length === 0) {
    return null;
  }

  // Build breadcrumb trail starting with Home
  const breadcrumbs = [
    {
      label: homeText[lang],
      path: `/${lang}/`
    }
  ];

  // Add each path segment as a breadcrumb level
  let currentPath = `/${lang}`;
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: getTranslation(segment, lang),
      path: currentPath
    });
  });

  return (
    <nav 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3" 
      aria-label="Breadcrumb"
    >
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <div key={crumb.path} style={{ display: 'contents' }}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-white/90 font-medium">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link 
                        to={crumb.path} 
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="text-white/50">›</BreadcrumbSeparator>}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};
