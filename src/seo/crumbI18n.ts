import type { Lang } from "./routeTree";

/**
 * ✅ Three-Language Translation Map for Breadcrumbs & JSON-LD
 * 
 * Matches the keys defined in ROUTE_TREE
 * Used for both UI breadcrumbs and structured data
 */

export const CRUMB_I18N: Record<Lang, Record<string, string>> = {
  en: {
    home: "Home",
    
    // Products
    products: "Products",
    thermalPaperRolls: "Thermal Paper Rolls",
    thermalLabels: "Thermal Labels",
    blank: "Blank",
    printed: "Printed",
    posThermalPaper: "POS Thermal Paper",
    atmThermalPaper: "ATM Thermal Paper",
    bpaFreeThermalPaper: "BPA-Free Thermal Paper",
    thermalLabels4x6: "4x6 Thermal Labels",
    thermalLabelsA6: "A6 Thermal Labels",
    logisticsLabels: "Logistics Labels",
    ncrForms: "NCR Forms",
    continuous: "Continuous",
    
    // Material Supply
    materialSupply: "Material Supply",
    thermalJumbo: "Thermal Jumbo Rolls",
    selfAdhesiveJumbo: "Self-Adhesive Jumbo Rolls",
    selfAdhesiveSheets: "Self-Adhesive Sheets",
    ncrJumbo: "NCR Jumbo Rolls",
    ncrSheets: "NCR Sheets",
    
    // Applications
    applications: "Applications",
    governmentTenders: "Government Tenders",
    retailPOS: "Retail & POS",
    logisticsWarehousing: "Logistics & Warehousing",
    supermarkets: "Supermarkets",
    bankingFinance: "Banking & Finance",
    healthcare: "Healthcare",
    
    // Manufacturing
    manufacturing: "Manufacturing",
    factoryOverview: "Factory Overview",
    productionLines: "Production Lines",
    qualityControl: "Quality Control",
    packagingShipping: "Packaging & Shipping",
    certifications: "Certifications",
    oemCustomization: "OEM & Customization",
    factoryJournal: "Factory Journal",
    
    // Resources
    resources: "Resources",
    blogInsights: "Blog & Insights",
    toolsCalculators: "Tools & Calculators",
    faqs: "FAQs",
    packagingLogistics: "Packaging & Logistics",
    
    // Company
    about: "About",
    contact: "Contact",
    requestTenderPack: "Request Tender Pack",
  },

  ru: {
    home: "Главная",
    
    // Products
    products: "Продукция",
    thermalPaperRolls: "Рулоны термобумаги",
    thermalLabels: "Термоэтикетки",
    blank: "Пустые",
    printed: "Печатные",
    posThermalPaper: "POS термобумага",
    atmThermalPaper: "ATM термобумага",
    bpaFreeThermalPaper: "Термобумага без BPA",
    thermalLabels4x6: "Термоэтикетки 4×6",
    thermalLabelsA6: "Термоэтикетки A6",
    logisticsLabels: "Логистические этикетки",
    ncrForms: "Самокопирующаяся бумага",
    continuous: "Непрерывные",
    
    // Material Supply
    materialSupply: "Сырьё",
    thermalJumbo: "Термо джамбо-рулоны",
    selfAdhesiveJumbo: "Самоклеющиеся джамбо-рулоны",
    selfAdhesiveSheets: "Самоклеющиеся листы",
    ncrJumbo: "NCR джамбо-рулоны",
    ncrSheets: "NCR листы",
    
    // Applications
    applications: "Отраслевые решения",
    governmentTenders: "Государственные тендеры",
    retailPOS: "Розничная торговля и POS",
    logisticsWarehousing: "Логистика и складирование",
    supermarkets: "Супермаркеты",
    bankingFinance: "Банковский сектор и финансы",
    healthcare: "Здравоохранение",
    
    // Manufacturing
    manufacturing: "Производство",
    factoryOverview: "Обзор завода",
    productionLines: "Производственные линии",
    qualityControl: "Контроль качества",
    packagingShipping: "Упаковка и отгрузка",
    certifications: "Сертификаты",
    oemCustomization: "OEM и кастомизация",
    factoryJournal: "Заводской журнал",
    
    // Resources
    resources: "Ресурсы",
    blogInsights: "Блог и аналитика",
    toolsCalculators: "Инструменты и калькуляторы",
    faqs: "Часто задаваемые вопросы",
    packagingLogistics: "Упаковка и логистика",
    
    // Company
    about: "О компании",
    contact: "Контакты",
    requestTenderPack: "Запрос тендерного пакета",
  },

  zh: {
    home: "首页",
    
    // Products
    products: "产品中心",
    thermalPaperRolls: "热敏纸卷",
    thermalLabels: "热敏标签",
    blank: "空白",
    printed: "印刷",
    posThermalPaper: "POS热敏纸",
    atmThermalPaper: "ATM热敏纸",
    bpaFreeThermalPaper: "无BPA热敏纸",
    thermalLabels4x6: "4x6热敏标签",
    thermalLabelsA6: "A6热敏标签",
    logisticsLabels: "物流标签",
    ncrForms: "无碳复写纸",
    continuous: "连续",
    
    // Material Supply
    materialSupply: "原材料供应",
    thermalJumbo: "热敏原纸（巨型卷）",
    selfAdhesiveJumbo: "不干胶原纸（巨型卷）",
    selfAdhesiveSheets: "不干胶片材",
    ncrJumbo: "无碳复写原纸（巨型卷）",
    ncrSheets: "无碳复写片材",
    
    // Applications
    applications: "应用场景",
    governmentTenders: "政府投标",
    retailPOS: "零售与POS",
    logisticsWarehousing: "物流与仓储",
    supermarkets: "超市",
    bankingFinance: "银行与金融",
    healthcare: "医疗健康",
    
    // Manufacturing
    manufacturing: "生产制造",
    factoryOverview: "工厂概况",
    productionLines: "生产线",
    qualityControl: "质量控制",
    packagingShipping: "包装与物流",
    certifications: "认证资质",
    oemCustomization: "OEM定制",
    factoryJournal: "工厂日志",
    
    // Resources
    resources: "资源中心",
    blogInsights: "博客与洞察",
    toolsCalculators: "工具与计算器",
    faqs: "常见问题",
    packagingLogistics: "包装与物流",
    
    // Company
    about: "关于我们",
    contact: "联系我们",
    requestTenderPack: "申请招标资料包",
  },
};
