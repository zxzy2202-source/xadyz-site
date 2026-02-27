import React from 'react';
import { CONTACT } from '@/app/lib/contactConfig';
import { Link, useLocation } from 'react-router';
import { Phone, Send, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Hover text translations - Final Frozen Version
const hoverTexts = {
  en: {
    // Main menu items
    products: 'Factory-manufactured finished products for retail, logistics & projects.',
    materialSupply: 'Stable material supply sourced from qualified mills.',
    applications: 'Industry-specific solutions and use cases.',
    manufacturing: 'Production facilities, quality control, and customization capabilities.',
    resources: 'Practical guides, tools, and logistics information for buyers.',
    contact: 'Get in touch with sales and project support.',
    
    // Products submenu
    thermalPaperRolls: 'Blank & printed thermal paper rolls for POS and receipt printing.',
    blankThermalRolls: 'Standard thermal rolls ready for printing.',
    printedThermalRolls: 'Custom-printed thermal rolls with your design.',
    thermalLabels: 'Thermal label rolls for logistics and barcode systems.',
    blankThermalLabels: 'Standard thermal labels ready for printing.',
    printedThermalLabels: 'Custom-printed thermal labels with your branding.',
    ncrForms: 'Carbonless NCR forms for documentation and tenders.',
    blankNcrForms: 'Standard NCR forms ready for printing.',
    printedNcrForms: 'Custom-printed NCR forms with your layout.',
    continuousNcrForms: 'Continuous-feed NCR forms for dot matrix printers.',
    
    // Material Supply submenu
    thermalJumboRolls: 'Thermal jumbo rolls for converting and long-term supply.',
    selfAdhesiveMaterials: 'Adhesive materials in rolls and sheets.',
    selfAdhesiveRolls: 'Jumbo rolls for label converting and printing.',
    selfAdhesiveSheets: 'Sheeted adhesive materials ready for printing.',
    ncrPaper: 'Carbonless paper materials for forms production.',
    ncrRolls: 'NCR paper in rolls for converting.',
    ncrSheets: 'Cut-size NCR sheets for printing and binding.',
    
    // Applications submenu
    retailPos: 'Receipt paper and labels for retail point of sale.',
    logisticsWarehousing: 'Shipping labels and documentation for logistics.',
    supermarkets: 'Price tags, labels, and receipt paper for supermarkets.',
    bankingFinance: 'ATM receipts, bank slips, and financial documentation.',
    governmentTenders: 'Forms and documentation for government projects.',
    healthcare: 'Medical labels and documentation solutions.',
    
    // Manufacturing submenu
    factoryOverview: 'Our facilities, equipment, and workforce.',
    productionLines: 'Converting and printing lines for finished products.',
    qualityControl: 'Quality control processes and testing procedures.',
    packagingShipping: 'Export packaging and shipping procedures.',
    certifications: 'ISO certifications and quality standards.',
    oemCustomization: 'OEM production and custom product development.',
    factoryJournal: 'Weekly production updates and real client problem-solving cases.',
    
    // Resources submenu
    blogInsights: 'Industry insights, market trends, and application guides.',
    packagingLogistics: 'Export packaging standards and logistics information.',
    toolsCalculators: 'Sizing, weight, and loading calculators.',
    faqs: 'Common purchasing and project questions.',
    
    // Contact submenu
    contactUs: 'General inquiries and quotations.'
  },
  
  ru: {
    // Main menu items
    products: 'Готовая продукция, произведённая на нашем заводе.',
    materialSupply: 'Стабильные поставки материалов от проверенных фабрик.',
    applications: 'Отраслевые решения и применение.',
    manufacturing: 'Производственные мощности, контроль качества и кастомизация.',
    resources: 'Практические материалы, инструменты и логистическая информация.',
    contact: 'Связь с отделом продаж и проектов.',
    
    // Products submenu
    thermalPaperRolls: 'Термобумага в рулонах, пустая и с печатью, для POS и чеков.',
    blankThermalRolls: 'Стандартные термо-рулоны для печати.',
    printedThermalRolls: 'Термо-рулоны с индивидуальной печатью.',
    thermalLabels: 'Термоэтикетки в рулонах для логистики и штрихкодов.',
    blankThermalLabels: 'Стандартные термоэтикетки для печати.',
    printedThermalLabels: 'Термоэтикетки с индивидуальной печатью.',
    ncrForms: 'NCR-формы для документации и тендеров.',
    blankNcrForms: 'Стандартные NCR-формы для печати.',
    printedNcrForms: 'NCR-формы с индивидуальной печатью.',
    continuousNcrForms: 'Непрерывные NCR-формы для матричных принтеров.',
    
    // Material Supply submenu
    thermalJumboRolls: 'Термобумага jumbo для переработки и долгосрочных поставок.',
    selfAdhesiveMaterials: 'Самоклеящиеся материалы в рулонах и листах.',
    selfAdhesiveRolls: 'Jumbo-рулоны для печати и конвертинга.',
    selfAdhesiveSheets: 'Самоклеящиеся листы для печати.',
    ncrPaper: 'Материалы NCR для производства форм.',
    ncrRolls: 'NCR бумага в рулонах для конвертинга.',
    ncrSheets: 'Листовая NCR-бумага для печати.',
    
    // Applications submenu
    retailPos: 'Чековая бумага и этикетки для ритейла и POS.',
    logisticsWarehousing: 'Этикетки и документы для логистики.',
    supermarkets: 'Ценники, этикетки и чековая бумага для супермаркетов.',
    bankingFinance: 'Чеки банкоматов, банковские квитанции и финансовые документы.',
    governmentTenders: 'Формы и документация для государственных проектов.',
    healthcare: 'Медицинские этикетки и документация.',
    
    // Manufacturing submenu
    factoryOverview: 'Оборудование, цеха и персонал.',
    productionLines: 'Линии конвертинга и печати.',
    qualityControl: 'Процессы контроля качества и тестирования.',
    packagingShipping: 'Процедуры упаковки и отправки.',
    certifications: 'ISO сертификаты и стандарты качества.',
    oemCustomization: 'OEM производство и разработка индивидуальных продуктов.',
    factoryJournal: 'Еженедельные производственные новости и реальные кейсы решения проблем клиентов.',
    
    // Resources submenu
    blogInsights: 'Отраслевые обзоры, рыночные тренды и применение.',
    packagingLogistics: 'Стандарты экспортной упаковки и логистическая информация.',
    toolsCalculators: 'Калькуляторы размеров и загрузки.',
    faqs: 'Частые вопросы по закупкам.',
    
    // Contact submenu
    contactUs: 'Запросы и коммерческие предложения.'
  },
  
  zh: {
    // Main menu items
    products: '工厂自产成品，用于零售、物流和项目。',
    materialSupply: '来自合格工厂的稳定材料供应。',
    applications: '行业专用解决方案和应用案例。',
    manufacturing: '生产设施、质量控制和定制能力。',
    resources: '买家实用指南、工具和物流信息。',
    contact: '联系销售和项目支持团队。',
    
    // Products submenu
    thermalPaperRolls: '空白和印刷热敏纸卷，用于POS和收据打印。',
    blankThermalRolls: '标准热敏纸卷，可直接打印。',
    printedThermalRolls: '定制印刷热敏纸卷。',
    thermalLabels: '热敏标签卷，用于物流和条码系统。',
    blankThermalLabels: '标准热敏标签，可直接打印。',
    printedThermalLabels: '定制印刷热敏标签。',
    ncrForms: '无碳复写表格，用于文档和投标。',
    blankNcrForms: '标准NCR表格，可直接打印。',
    printedNcrForms: '定制印刷NCR表格。',
    continuousNcrForms: '连续式NCR表格，用于针式打印机。',
    
    // Material Supply submenu
    thermalJumboRolls: '热敏Jumbo大卷，用于分切和长期供应。',
    selfAdhesiveMaterials: 'Jumbo卷和平张不干胶材料。',
    selfAdhesiveRolls: '用于标签分切和印刷的Jumbo卷。',
    selfAdhesiveSheets: '切好的不干胶材料，可直接印刷。',
    ncrPaper: '用于生产表格的无碳复写材料。',
    ncrRolls: 'NCR纸卷，用于分切。',
    ncrSheets: '用于印刷和装订的NCR平张。',
    
    // Applications submenu
    retailPos: '零售POS系统的收据纸和标签。',
    logisticsWarehousing: '物流快递的运单标签和文档。',
    supermarkets: '超市的价格标签、标签和收据纸。',
    bankingFinance: 'ATM收据、银行凭条和金融文档。',
    governmentTenders: '政府项目的表格和文档。',
    healthcare: '医疗标签和文档解决方案。',
    
    // Manufacturing submenu
    factoryOverview: '我们的设施、设备和团队。',
    productionLines: '成品的分切和印刷生产线。',
    qualityControl: '质量控制流程和测试程序。',
    packagingShipping: '出口包装和运输程序。',
    certifications: 'ISO认证和质量标准。',
    oemCustomization: 'OEM生产和定制产品开发。',
    factoryJournal: '每周生产更新与真实客户问题解决案例。',
    
    // Resources submenu
    blogInsights: '行业洞察、市场趋势和应用指南。',
    packagingLogistics: '出口包装标准和物流信息。',
    toolsCalculators: '尺寸、重量和装柜计算器。',
    faqs: '常见采购和项目问题。',
    
    // Contact submenu
    contactUs: '一般咨询和报价。'
  }
};

interface MenuItem {
  name: string;
  path: string;
  hoverKey?: string;
  children?: { 
    name: string; 
    path: string;
    hoverKey?: string;
    subItems?: { name: string; path: string; hoverKey?: string }[];
  }[];
}

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const location = useLocation();
  const lang = location.pathname.startsWith('/ru') ? 'ru' : location.pathname.startsWith('/zh') ? 'zh' : 'en';
  const t = hoverTexts[lang];

  const menuItems: MenuItem[] = lang === 'zh' ? [
    { name: '首页', path: '/zh/' },
    { 
      name: '产品中心', 
      path: '/zh/products',
      hoverKey: 'products',
      children: [
        { 
          name: '热敏纸卷', 
          path: '/zh/thermal-paper-rolls', 
          hoverKey: 'thermalPaperRolls',
          subItems: [
            { name: '空白热敏纸卷', path: '/zh/thermal-paper-rolls/blank', hoverKey: 'blankThermalRolls' },
            { name: '印刷热敏纸卷', path: '/zh/thermal-paper-rolls/printed', hoverKey: 'printedThermalRolls' },
          ]
        },
        { 
          name: '热敏标签', 
          path: '/zh/thermal-labels', 
          hoverKey: 'thermalLabels',
          subItems: [
            { name: '空白热敏标签', path: '/zh/thermal-labels/blank', hoverKey: 'blankThermalLabels' },
            { name: '印刷热敏标签', path: '/zh/thermal-labels/printed', hoverKey: 'printedThermalLabels' },
          ]
        },
        { 
          name: 'NCR表格', 
          path: '/zh/ncr-forms', 
          hoverKey: 'ncrForms',
          subItems: [
            { name: '空白NCR表格', path: '/zh/ncr-forms/blank', hoverKey: 'blankNcrForms' },
            { name: '印刷NCR表格', path: '/zh/ncr-forms/printed', hoverKey: 'printedNcrForms' },
            { name: '连续式NCR表格', path: '/zh/ncr-forms/continuous', hoverKey: 'continuousNcrForms' },
          ]
        },
      ]
    },
    {
      name: '材料供应',
      path: '/zh/material-supply',
      hoverKey: 'materialSupply',
      children: [
        { name: '热敏Jumbo大卷', path: '/zh/material-supply/thermal-jumbo-rolls', hoverKey: 'thermalJumboRolls' },
        { 
          name: '不干胶材料', 
          path: '/zh/material-supply/self-adhesive',
          hoverKey: 'selfAdhesiveMaterials',
          subItems: [
            { name: '不干胶卷材', path: '/zh/material-supply/self-adhesive-jumbo-rolls', hoverKey: 'selfAdhesiveRolls' },
            { name: '不干胶平张', path: '/zh/material-supply/self-adhesive-sheets', hoverKey: 'selfAdhesiveSheets' },
          ]
        },
        { 
          name: 'NCR纸', 
          path: '/zh/material-supply/ncr',
          hoverKey: 'ncrPaper',
          subItems: [
            { name: 'NCR卷材', path: '/zh/material-supply/ncr-jumbo-rolls', hoverKey: 'ncrRolls' },
            { name: 'NCR平张', path: '/zh/material-supply/ncr-sheets', hoverKey: 'ncrSheets' },
          ]
        },
      ]
    },
    {
      name: '应用场景',
      path: '/zh/applications',
      hoverKey: 'applications',
      children: [
        { name: '零售与POS', path: '/zh/applications/retail-pos', hoverKey: 'retailPos' },
        { name: '物流与仓储', path: '/zh/applications/logistics-warehousing', hoverKey: 'logisticsWarehousing' },
        { name: '超市', path: '/zh/applications/supermarkets', hoverKey: 'supermarkets' },
        { name: '银行与金融', path: '/zh/applications/banking-finance', hoverKey: 'bankingFinance' },
        { name: '政府投标', path: '/zh/applications/government-tenders', hoverKey: 'governmentTenders' },
        { name: '医疗健康', path: '/zh/applications/healthcare', hoverKey: 'healthcare' },
        { name: '申请投标资料包', path: '/zh/request-tender-pack', hoverKey: 'retailPos' },
      ]
    },
    {
      name: '生产制造',
      path: '/zh/manufacturing',
      hoverKey: 'manufacturing',
      children: [
        { name: '工厂概览', path: '/zh/manufacturing/factory-overview', hoverKey: 'factoryOverview' },
        { name: '生产线', path: '/zh/manufacturing/production-lines', hoverKey: 'productionLines' },
        { name: '质量控制', path: '/zh/manufacturing/quality-control', hoverKey: 'qualityControl' },
        { name: '包装运输', path: '/zh/manufacturing/packaging-shipping', hoverKey: 'packagingShipping' },
        { name: '认证证书', path: '/zh/manufacturing/certifications', hoverKey: 'certifications' },
        { name: 'OEM与定制', path: '/zh/manufacturing/oem-customization', hoverKey: 'oemCustomization' },
        { name: '工厂日志', path: '/zh/manufacturing/factory-journal', hoverKey: 'factoryJournal' },
      ]
    },
    {
      name: '资源中心',
      path: '/zh/resources',
      hoverKey: 'resources',
      children: [
        { name: '博客与洞察', path: '/zh/resources/blog-insights', hoverKey: 'blogInsights' },
        { name: '工具与计算器', path: '/zh/resources/tools-calculators', hoverKey: 'toolsCalculators' },
        { name: '常见问题', path: '/zh/resources/faqs', hoverKey: 'faqs' },
      ]
    },
    { name: '关于我们', path: '/zh/about', hoverKey: 'contact' },
    {
      name: '联系我们',
      path: '/zh/contact',
      hoverKey: 'contact',
    },
  ] : lang === 'ru' ? [
    { name: 'Главная', path: '/ru/' },
    { 
      name: 'Продукция', 
      path: '/ru/products',
      hoverKey: 'products',
      children: [
        { 
          name: 'Термобумага в рулонах', 
          path: '/ru/thermal-paper-rolls', 
          hoverKey: 'thermalPaperRolls',
          subItems: [
            { name: 'Пустые рулоны термобумаги', path: '/ru/thermal-paper-rolls/blank', hoverKey: 'blankThermalRolls' },
            { name: 'Печать на термобумаге', path: '/ru/thermal-paper-rolls/printed', hoverKey: 'printedThermalRolls' },
          ]
        },
        { 
          name: 'Термоэтикетки (рулоны)', 
          path: '/ru/thermal-labels', 
          hoverKey: 'thermalLabels',
          subItems: [
            { name: 'Пустые термоэтикетки', path: '/ru/thermal-labels/blank', hoverKey: 'blankThermalLabels' },
            { name: 'Печать термоэтикеток', path: '/ru/thermal-labels/printed', hoverKey: 'printedThermalLabels' },
          ]
        },
        { 
          name: 'NCR-формы', 
          path: '/ru/ncr-forms', 
          hoverKey: 'ncrForms',
          subItems: [
            { name: 'Пустые NCR-формы', path: '/ru/ncr-forms/blank', hoverKey: 'blankNcrForms' },
            { name: 'Печать NCR-форм', path: '/ru/ncr-forms/printed', hoverKey: 'printedNcrForms' },
            { name: 'Непрерывные NCR-формы', path: '/ru/ncr-forms/continuous', hoverKey: 'continuousNcrForms' },
          ]
        },
      ]
    },
    {
      name: 'Материалы',
      path: '/ru/material-supply',
      hoverKey: 'materialSupply',
      children: [
        { name: 'Термобумага Jumbo', path: '/ru/material-supply/thermal-jumbo-rolls', hoverKey: 'thermalJumboRolls' },
        { 
          name: 'Самоклеящиеся материалы', 
          path: '/ru/material-supply/self-adhesive',
          hoverKey: 'selfAdhesiveMaterials',
          subItems: [
            { name: 'В рулонах', path: '/ru/material-supply/self-adhesive-jumbo-rolls', hoverKey: 'selfAdhesiveRolls' },
            { name: 'В листах', path: '/ru/material-supply/self-adhesive-sheets', hoverKey: 'selfAdhesiveSheets' },
          ]
        },
        { 
          name: 'NCR бумага', 
          path: '/ru/material-supply/ncr',
          hoverKey: 'ncrPaper',
          subItems: [
            { name: 'В рулонах', path: '/ru/material-supply/ncr-jumbo-rolls', hoverKey: 'ncrRolls' },
            { name: 'В листах', path: '/ru/material-supply/ncr-sheets', hoverKey: 'ncrSheets' },
          ]
        },
      ]
    },
    {
      name: 'Отрасли',
      path: '/ru/applications',
      hoverKey: 'applications',
      children: [
        { name: 'Ритейл и POS', path: '/ru/applications/retail-pos', hoverKey: 'retailPos' },
        { name: 'Логистика и склад', path: '/ru/applications/logistics-warehousing', hoverKey: 'logisticsWarehousing' },
        { name: 'Супермаркеты', path: '/ru/applications/supermarkets', hoverKey: 'supermarkets' },
        { name: 'Банковский сектор', path: '/ru/applications/banking-finance', hoverKey: 'bankingFinance' },
        { name: 'Государственные тендеры', path: '/ru/applications/government-tenders', hoverKey: 'governmentTenders' },
        { name: 'Здравоохранение', path: '/ru/applications/healthcare', hoverKey: 'healthcare' },
        { name: 'Запросить тендерный пакет', path: '/ru/request-tender-pack', hoverKey: 'retailPos' },
      ]
    },
    {
      name: 'Производство',
      path: '/ru/manufacturing',
      hoverKey: 'manufacturing',
      children: [
        { name: 'Обзор завода', path: '/ru/manufacturing/factory-overview', hoverKey: 'factoryOverview' },
        { name: 'Производственные линии', path: '/ru/manufacturing/production-lines', hoverKey: 'productionLines' },
        { name: 'Контроль качества', path: '/ru/manufacturing/quality-control', hoverKey: 'qualityControl' },
        { name: 'Упаковка и отправка', path: '/ru/manufacturing/packaging-shipping', hoverKey: 'packagingShipping' },
        { name: 'Сертификаты', path: '/ru/manufacturing/certifications', hoverKey: 'certifications' },
        { name: 'OEM и кастомизация', path: '/ru/manufacturing/oem-customization', hoverKey: 'oemCustomization' },
        { name: 'Заводской журнал', path: '/ru/manufacturing/factory-journal', hoverKey: 'factoryJournal' },
      ]
    },
    {
      name: 'Ресурсы',
      path: '/ru/resources',
      hoverKey: 'resources',
      children: [
        { name: 'Блог и аналитика', path: '/ru/resources/blog-insights', hoverKey: 'blogInsights' },
        { name: 'Инструменты и калькуляторы', path: '/ru/resources/tools-calculators', hoverKey: 'toolsCalculators' },
        { name: 'Вопросы и ответы', path: '/ru/resources/faqs', hoverKey: 'faqs' },
      ]
    },
    { name: 'О компании', path: '/ru/about', hoverKey: 'contact' },
    {
      name: 'Контакты',
      path: '/ru/contact',
      hoverKey: 'contact',
    },
  ] : [
    { name: 'Home', path: '/en/' },
    { 
      name: 'Products', 
      path: '/en/products',
      hoverKey: 'products',
      children: [
        { 
          name: 'Thermal Paper Rolls', 
          path: '/en/thermal-paper-rolls', 
          hoverKey: 'thermalPaperRolls',
          subItems: [
            { name: 'Blank Thermal Rolls', path: '/en/thermal-paper-rolls/blank', hoverKey: 'blankThermalRolls' },
            { name: 'Printed Thermal Rolls', path: '/en/thermal-paper-rolls/printed', hoverKey: 'printedThermalRolls' },
          ]
        },
        { 
          name: 'Thermal Labels', 
          path: '/en/thermal-labels', 
          hoverKey: 'thermalLabels',
          subItems: [
            { name: 'Blank Thermal Labels', path: '/en/thermal-labels/blank', hoverKey: 'blankThermalLabels' },
            { name: 'Printed Thermal Labels', path: '/en/thermal-labels/printed', hoverKey: 'printedThermalLabels' },
          ]
        },
        { 
          name: 'NCR Forms', 
          path: '/en/ncr-forms', 
          hoverKey: 'ncrForms',
          subItems: [
            { name: 'Blank NCR Forms', path: '/en/ncr-forms/blank', hoverKey: 'blankNcrForms' },
            { name: 'Printed NCR Forms', path: '/en/ncr-forms/printed', hoverKey: 'printedNcrForms' },
            { name: 'Continuous NCR Forms', path: '/en/ncr-forms/continuous', hoverKey: 'continuousNcrForms' },
          ]
        },
      ]
    },
    {
      name: 'Material Supply',
      path: '/en/material-supply',
      hoverKey: 'materialSupply',
      children: [
        { name: 'Thermal Jumbo Rolls', path: '/en/material-supply/thermal-jumbo-rolls', hoverKey: 'thermalJumboRolls' },
        { 
          name: 'Self-Adhesive Materials', 
          path: '/en/material-supply/self-adhesive',
          hoverKey: 'selfAdhesiveMaterials',
          subItems: [
            { name: 'Rolls', path: '/en/material-supply/self-adhesive-jumbo-rolls', hoverKey: 'selfAdhesiveRolls' },
            { name: 'Sheets', path: '/en/material-supply/self-adhesive-sheets', hoverKey: 'selfAdhesiveSheets' },
          ]
        },
        { 
          name: 'NCR Paper', 
          path: '/en/material-supply/ncr',
          hoverKey: 'ncrPaper',
          subItems: [
            { name: 'Rolls', path: '/en/material-supply/ncr-jumbo-rolls', hoverKey: 'ncrRolls' },
            { name: 'Sheets', path: '/en/material-supply/ncr-sheets', hoverKey: 'ncrSheets' },
          ]
        },
      ]
    },
    {
      name: 'Applications',
      path: '/en/applications',
      hoverKey: 'applications',
      children: [
        { name: 'Retail & POS', path: '/en/applications/retail-pos', hoverKey: 'retailPos' },
        { name: 'Logistics & Warehousing', path: '/en/applications/logistics-warehousing', hoverKey: 'logisticsWarehousing' },
        { name: 'Supermarkets', path: '/en/applications/supermarkets', hoverKey: 'supermarkets' },
        { name: 'Banking & Finance', path: '/en/applications/banking-finance', hoverKey: 'bankingFinance' },
        { name: 'Government & Tenders', path: '/en/applications/government-tenders', hoverKey: 'governmentTenders' },
        { name: 'Healthcare', path: '/en/applications/healthcare', hoverKey: 'healthcare' },
        { name: 'Request Tender Pack', path: '/en/request-tender-pack', hoverKey: 'retailPos' },
      ]
    },
    {
      name: 'Manufacturing',
      path: '/en/manufacturing',
      hoverKey: 'manufacturing',
      children: [
        { name: 'Factory Overview', path: '/en/manufacturing/factory-overview', hoverKey: 'factoryOverview' },
        { name: 'Production Lines', path: '/en/manufacturing/production-lines', hoverKey: 'productionLines' },
        { name: 'Quality Control', path: '/en/manufacturing/quality-control', hoverKey: 'qualityControl' },
        { name: 'Packaging & Shipping', path: '/en/manufacturing/packaging-shipping', hoverKey: 'packagingShipping' },
        { name: 'Certifications', path: '/en/manufacturing/certifications', hoverKey: 'certifications' },
        { name: 'OEM & Customization', path: '/en/manufacturing/oem-customization', hoverKey: 'oemCustomization' },
        { name: 'Factory Journal', path: '/en/manufacturing/factory-journal', hoverKey: 'factoryJournal' },
      ]
    },
    {
      name: 'Resources',
      path: '/en/resources',
      hoverKey: 'resources',
      children: [
        { name: 'Blog & Insights', path: '/en/resources/blog-insights', hoverKey: 'blogInsights' },
        { name: 'Tools & Calculators', path: '/en/resources/tools-calculators', hoverKey: 'toolsCalculators' },
        { name: 'FAQs', path: '/en/resources/faqs', hoverKey: 'faqs' },
      ]
    },
    { name: 'About', path: '/en/about', hoverKey: 'contact' },
    {
      name: 'Contact',
      path: '/en/contact',
      hoverKey: 'contact',
    },
  ];

  // Path mapping for language switcher - preserve current path when switching languages
  const getPathWithoutLang = () => location.pathname.replace(/^\/(en|ru|zh)/, '') || '/';
  const currentPath = getPathWithoutLang();
  const currentMapping = {
    en: `/en${currentPath}`,
    ru: `/ru${currentPath}`,
    zh: `/zh${currentPath}`,
  };

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-gray-400" />
            <Link to={currentMapping.en} className={`px-2 py-1 rounded transition-colors ${lang === 'en' ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-white'}`}>English</Link>
            <span className="text-gray-600">|</span>
            <Link to={currentMapping.ru} className={`px-2 py-1 rounded transition-colors ${lang === 'ru' ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-white'}`}>Русский</Link>
            <span className="text-gray-600">|</span>
            <Link to={currentMapping.zh} className={`px-2 py-1 rounded transition-colors ${lang === 'zh' ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-white'}`}>中文</Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-300 hover:text-green-400 transition-colors"
            >
              <Phone size={14} />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <a
              href={CONTACT.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <Send size={14} />
              <span className="hidden md:inline">Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="fixed top-10 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link to={lang === 'ru' ? '/ru/' : lang === 'zh' ? '/zh/' : '/en/'} className="flex flex-col group">
            <span className="text-xl font-black text-gray-900 tracking-tighter leading-none uppercase transition-colors group-hover:text-blue-600">
              Zhixin<span className="text-blue-600 group-hover:text-gray-900">Paper</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mt-1.5 leading-none">
              Thermal solutions since 2009
            </span>
          </Link>
          
          <nav className="hidden xl:flex items-center gap-6">
            {menuItems.map((item) => (
              <div 
                key={item.path} 
                className="relative group py-4"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={item.path} 
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${location.pathname === item.path || (item.children?.some(child => location.pathname.startsWith(child.path))) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  {item.name}
                  {item.children && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                </Link>

                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 min-w-[340px] max-w-[600px] bg-white shadow-2xl rounded-xl border border-gray-100 p-6 mt-[-8px]"
                      >
                        {/* Hover hint for main menu item */}
                        {item.hoverKey && t[item.hoverKey as keyof typeof t] && (
                          <p className="text-xs text-gray-500 italic mb-4 pb-3 border-b border-gray-100">
                            {t[item.hoverKey as keyof typeof t]}
                          </p>
                        )}

                        <div className="flex flex-col gap-3">
                          {item.children.map((child) => (
                            <div key={child.path}>
                              <Link
                                to={child.path}
                                className={`block text-sm font-semibold transition-colors hover:text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-50 ${location.pathname === child.path ? 'text-blue-600 bg-blue-50' : 'text-gray-900'}`}
                              >
                                {child.name}
                              </Link>
                              {child.hoverKey && t[child.hoverKey as keyof typeof t] && (
                                <p className="text-xs text-gray-500 px-3 pb-1">
                                  {t[child.hoverKey as keyof typeof t]}
                                </p>
                              )}
                              
                              {/* Sub-items */}
                              {child.subItems && (
                                <div className="flex flex-col gap-1 pl-6 mt-2">
                                  {child.subItems.map((subItem) => (
                                    <div key={subItem.path}>
                                      <Link
                                        to={subItem.path}
                                        className={`block text-sm transition-colors hover:text-blue-600 py-1.5 px-3 rounded-lg hover:bg-blue-50 ${location.pathname === subItem.path ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-700'}`}
                                      >
                                        {subItem.name}
                                      </Link>
                                      {subItem.hoverKey && t[subItem.hoverKey as keyof typeof t] && (
                                        <p className="text-xs text-gray-500 px-3 pb-1">
                                          {t[subItem.hoverKey as keyof typeof t]}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-gray-600 hover:text-blue-600"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
                {menuItems.map((item) => (
                  <div key={item.path}>
                    <Link
                      to={item.path}
                      className="block text-base font-medium text-gray-900 hover:text-blue-600 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <div key={child.path}>
                            <Link
                              to={child.path}
                              className="block text-sm text-gray-600 hover:text-blue-600 py-1.5"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.name}
                            </Link>
                            {child.subItems && (
                              <div className="pl-4 mt-1 space-y-1">
                                {child.subItems.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className="block text-sm text-gray-500 hover:text-blue-600 py-1"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};