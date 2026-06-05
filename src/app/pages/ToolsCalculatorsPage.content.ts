/**
 * ToolsCalculatorsPage multilingual content
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface ToolItem {
  icon: string;
  title: string;
  description: string;
  action: string;
}

export interface GuideItem {
  title: string;
  description: string;
  type: string;
}

export interface ToolsCalculatorsContent {
  hero: { title: string; subtitle: string; description: string };
  tools: { title: string; description: string; items: ToolItem[] };
  roiCalculator: {
    title: string;
    description: string;
    monthlyUsage: string;
    currentPrice: string;
    ourPrice: string;
    calculate: string;
    results: { title: string; monthlySavings: string; annualSavings: string; roi: string; breakeven: string };
  };
  guides: { title: string; description: string; items: GuideItem[] };
  cta: { title: string; description: string; button: string };
  download: string;
}

export const content: Record<Lang, ToolsCalculatorsContent> = {
  en: {
    hero: {
      title: 'Tools & Calculators',
      subtitle: 'Smart Planning for Better Decisions',
      description: 'Use our free online tools to calculate costs, estimate usage, and plan your thermal paper procurement efficiently.',
    },
    tools: {
      title: 'Available Tools',
      description: 'Professional calculators for informed purchasing decisions',
      items: [
        { icon: 'dollar', title: 'ROI Calculator', description: 'Calculate potential savings and return on investment for bulk thermal paper purchases.', action: 'Calculate ROI' },
        { icon: 'ruler', title: 'Size Converter', description: 'Convert between different measurement units for roll dimensions and specifications.', action: 'Convert Units' },
        { icon: 'package', title: 'Usage Estimator', description: 'Estimate your monthly thermal paper consumption based on transaction volume.', action: 'Estimate Usage' },
        { icon: 'trending', title: 'Cost Comparison', description: 'Compare costs between different product types and supplier options.', action: 'Compare Costs' },
        { icon: 'calculator', title: 'Order Quantity Calculator', description: 'Determine optimal order quantities based on usage patterns and storage capacity.', action: 'Calculate Quantity' },
        { icon: 'download', title: 'Specification Sheet Generator', description: 'Generate custom specification sheets for your procurement documentation.', action: 'Generate Sheet' },
      ],
    },
    roiCalculator: {
      title: 'ROI Calculator',
      description: 'See how much you can save with our competitive pricing',
      monthlyUsage: 'Monthly Usage (rolls)',
      currentPrice: 'Current Price per Roll ($)',
      ourPrice: 'Our Price per Roll ($)',
      calculate: 'Calculate Savings',
      results: {
        title: 'Your Potential Savings',
        monthlySavings: 'Monthly Savings',
        annualSavings: 'Annual Savings',
        roi: 'Return on Investment',
        breakeven: 'Breakeven Period',
      },
    },
    guides: {
      title: 'Tool Guides & Resources',
      description: 'Learn how to use our tools effectively',
      items: [
        { title: 'Procurement Planning Guide', description: 'Step-by-step guide to planning your thermal paper procurement strategy', type: 'PDF Guide' },
        { title: 'Cost Analysis Template', description: 'Excel template for comprehensive cost comparison and analysis', type: 'Excel Template' },
        { title: 'Usage Tracking Spreadsheet', description: 'Track and forecast your thermal paper consumption over time', type: 'Excel Template' },
      ],
    },
    cta: {
      title: 'Need Help Using Our Tools?',
      description: 'Our team can assist with calculations and provide personalized recommendations',
      button: 'Contact Support',
    },
    download: 'Download',
  },

  ru: {
    hero: {
      title: 'Инструменты и калькуляторы',
      subtitle: 'Умное планирование для лучших решений',
      description: 'Используйте наши бесплатные онлайн-инструменты для расчета затрат, оценки использования и эффективного планирования закупок термобумаги.',
    },
    tools: {
      title: 'Доступные инструменты',
      description: 'Профессиональные калькуляторы для обоснованных решений о покупке',
      items: [
        { icon: 'dollar', title: 'Калькулятор ROI', description: 'Рассчитайте потенциальную экономию и окупаемость инвестиций при оптовых закупках термобумаги.', action: 'Рассчитать ROI' },
        { icon: 'ruler', title: 'Конвертер размеров', description: 'Конвертируйте между различными единицами измерения для размеров рулонов и спецификаций.', action: 'Конвертировать единицы' },
        { icon: 'package', title: 'Оценка потребления', description: 'Оцените ваше ежемесячное потребление термобумаги на основе объема транзакций.', action: 'Оценить потребление' },
        { icon: 'trending', title: 'Сравнение затрат', description: 'Сравните затраты между различными типами продуктов и вариантами поставщиков.', action: 'Сравнить затраты' },
        { icon: 'calculator', title: 'Калькулятор объема заказа', description: 'Определите оптимальные объемы заказа на основе шаблонов использования и складской емкости.', action: 'Рассчитать количество' },
        { icon: 'download', title: 'Генератор спецификаций', description: 'Создавайте индивидуальные спецификации для вашей закупочной документации.', action: 'Создать спецификацию' },
      ],
    },
    roiCalculator: {
      title: 'Калькулятор ROI',
      description: 'Узнайте, сколько вы можете сэкономить с нашими конкурентными ценами',
      monthlyUsage: 'Ежемесячное потребление (рулоны)',
      currentPrice: 'Текущая цена за рулон ($)',
      ourPrice: 'Наша цена за рулон ($)',
      calculate: 'Рассчитать экономию',
      results: {
        title: 'Ваша потенциальная экономия',
        monthlySavings: 'Ежемесячная экономия',
        annualSavings: 'Годовая экономия',
        roi: 'Окупаемость инвестиций',
        breakeven: 'Период окупаемости',
      },
    },
    guides: {
      title: 'Руководства по инструментам и ресурсы',
      description: 'Узнайте, как эффективно использовать наши инструменты',
      items: [
        { title: 'Руководство по планированию закупок', description: 'Пошаговое руководство по планированию вашей стратегии закупки термобумаги', type: 'PDF-руководство' },
        { title: 'Шаблон анализа затрат', description: 'Шаблон Excel для комплексного сравнения и анализа затрат', type: 'Excel-шаблон' },
        { title: 'Таблица отслеживания потребления', description: 'Отслеживайте и прогнозируйте ваше потребление термобумаги со временем', type: 'Excel-шаблон' },
      ],
    },
    cta: {
      title: 'Нужна помощь с использованием наших инструментов?',
      description: 'Наша команда может помочь с расчетами и предоставить персонализированные рекомендации',
      button: 'Связаться с поддержкой',
    },
    download: 'Скачать',
  },

  zh: {
    hero: {
      title: '工具与计算器',
      subtitle: '智能规划，做出更好的决策',
      description: '使用我们的免费在线工具计算成本、估算用量，高效规划您的热敏纸采购。',
    },
    tools: {
      title: '可用工具',
      description: '专业计算器助您做出明智的采购决策',
      items: [
        { icon: 'dollar', title: '投资回报率计算器', description: '计算批量采购热敏纸的潜在节省和投资回报率。', action: '计算ROI' },
        { icon: 'ruler', title: '尺寸转换器', description: '在不同测量单位之间转换卷筒尺寸和规格。', action: '转换单位' },
        { icon: 'package', title: '用量估算器', description: '根据交易量估算您的每月热敏纸消耗量。', action: '估算用量' },
        { icon: 'trending', title: '成本比较', description: '比较不同产品类型和供应商选项之间的成本。', action: '比较成本' },
        { icon: 'calculator', title: '订单数量计算器', description: '根据使用模式和存储容量确定最佳订单数量。', action: '计算数量' },
        { icon: 'download', title: '规格表生成器', description: '为您的采购文档生成定制规格表。', action: '生成规格表' },
      ],
    },
    roiCalculator: {
      title: 'ROI计算器',
      description: '了解我们的竞争价格能为您节省多少',
      monthlyUsage: '每月用量（卷）',
      currentPrice: '当前每卷价格（$）',
      ourPrice: '我们的每卷价格（$）',
      calculate: '计算节省',
      results: {
        title: '您的潜在节省',
        monthlySavings: '每月节省',
        annualSavings: '年度节省',
        roi: '投资回报率',
        breakeven: '回本周期',
      },
    },
    guides: {
      title: '工具指南与资源',
      description: '学习如何有效使用我们的工具',
      items: [
        { title: '采购规划指南', description: '规划热敏纸采购策略的分步指南', type: 'PDF指南' },
        { title: '成本分析模板', description: '用于全面成本比较和分析的Excel模板', type: 'Excel模板' },
        { title: '用量跟踪电子表格', description: '跟踪和预测您随时间的热敏纸消耗', type: 'Excel模板' },
      ],
    },
    cta: {
      title: '需要帮助使用我们的工具？',
      description: '我们的团队可以协助计算并提供个性化建议',
      button: '联系支持',
    },
    download: '下载',
  },
};
