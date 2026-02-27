/**
 * ResourcesCenterPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface SectionItem {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export interface FeaturedItem {
  category: string;
  title: string;
  description: string;
  readTime: string;
}

export interface ResourcesCenterContent {
  hero: { title: string; subtitle: string; description: string };
  sections: { title: string; description: string; items: SectionItem[] };
  featured: { title: string; items: FeaturedItem[] };
  support: { title: string; description: string; button: string };
}

export const content: Record<Lang, ResourcesCenterContent> = {
  en: {
    hero: {
      title: 'Resource Center',
      subtitle: 'Knowledge Hub for Thermal Paper Industry',
      description: 'Access comprehensive guides, tools, and insights to help you make informed decisions about thermal paper products.',
    },
    sections: {
      title: 'Explore Our Resources',
      description: 'Everything you need to know about thermal paper solutions',
      items: [
        { icon: 'book', title: 'Blog & Insights', description: 'Industry trends, best practices, and expert analysis on thermal paper technology.', link: 'blog-insights' },
        { icon: 'calculator', title: 'Tools & Calculators', description: 'Practical tools to calculate costs, estimate usage, and plan your procurement.', link: 'tools-calculators' },
        { icon: 'help', title: 'FAQs', description: 'Answers to frequently asked questions about products, ordering, and technical specifications.', link: 'faqs' },
        { icon: 'file', title: 'Product Guides', description: 'Detailed specifications, usage guidelines, and technical documentation for all products.', link: '/en/manufacturing/packaging-shipping' },
        { icon: 'trending', title: 'Market Reports', description: 'Latest market trends, industry analysis, and regional insights for strategic planning.', link: 'blog-insights' },
        { icon: 'download', title: 'Downloads', description: 'Brochures, catalogs, certifications, and technical sheets available for download.', link: '/contact' },
      ],
    },
    featured: {
      title: 'Featured Resources',
      items: [
        { category: 'Guide', title: 'Complete Guide to Thermal Paper Selection', description: 'Learn how to choose the right thermal paper for your specific application needs.', readTime: '8 min read' },
        { category: 'Calculator', title: 'ROI Calculator for Thermal Paper', description: 'Calculate potential cost savings and return on investment for bulk purchases.', readTime: '5 min' },
        { category: 'Report', title: 'Russian Market Trends 2025', description: 'Comprehensive analysis of thermal paper market opportunities in Russia and CIS.', readTime: '12 min read' },
      ],
    },
    support: {
      title: 'Need Personalized Support?',
      description: 'Our team is ready to help with specific questions or custom requirements',
      button: 'Contact Our Experts',
    },
  },

  ru: {
    hero: {
      title: 'Центр ресурсов',
      subtitle: 'Центр знаний по индустрии термобумаги',
      description: 'Получите доступ к комплексным руководствам, инструментам и аналитике для принятия обоснованных решений о продукции из термобумаги.',
    },
    sections: {
      title: 'Изучите наши ресурсы',
      description: 'Все, что вам нужно знать о решениях на основе термобумаги',
      items: [
        { icon: 'book', title: 'Блог и аналитика', description: 'Тенденции отрасли, лучшие практики и экспертный анализ технологий термобумаги.', link: 'blog-insights' },
        { icon: 'calculator', title: 'Инструменты и калькуляторы', description: 'Практические инструменты для расчета затрат, оценки использования и планирования закупок.', link: 'tools-calculators' },
        { icon: 'help', title: 'Вопросы и ответы', description: 'Ответы на часто задаваемые вопросы о продуктах, заказах и технических характеристиках.', link: 'faqs' },
        { icon: 'file', title: 'Руководства по продуктам', description: 'Подробные спецификации, руководства по использованию и техническая документация на все продукты.', link: '/ru/manufacturing/packaging-shipping' },
        { icon: 'trending', title: 'Отчеты о рынке', description: 'Последние тенденции рынка, анализ отрасли и региональная аналитика для стратегического планирования.', link: 'blog-insights' },
        { icon: 'download', title: 'Загрузки', description: 'Брошюры, каталоги, сертификаты и технические листы доступны для загрузки.', link: '/contact' },
      ],
    },
    featured: {
      title: 'Избранные ресурсы',
      items: [
        { category: 'Руководство', title: 'Полное руководство по выбору термобумаги', description: 'Узнайте, как выбрать правильную термобумагу для ваших конкретных потребностей.', readTime: '8 мин чтения' },
        { category: 'Калькулятор', title: 'Калькулятор ROI для термобумаги', description: 'Рассчитайте потенциальную экономию затрат и окупаемость инвестиций при оптовых закупках.', readTime: '5 мин' },
        { category: 'Отчет', title: 'Тенденции российского рынка 2025', description: 'Комплексный анализ возможностей рынка термобумаги в России и СНГ.', readTime: '12 мин чтения' },
      ],
    },
    support: {
      title: 'Нужна персонализированная поддержка?',
      description: 'Наша команда готова помочь с конкретными вопросами или индивидуальными требованиями',
      button: 'Связаться с нашими экспертами',
    },
  },

  zh: {
    hero: {
      title: '资源中心',
      subtitle: '热敏纸行业知识中心',
      description: '访问全面的指南、工具和见解，帮助您就热敏纸产品做出明智的决策。',
    },
    sections: {
      title: '探索我们的资源',
      description: '关于热敏纸解决方案您需要了解的一切',
      items: [
        { icon: 'book', title: '博客与洞察', description: '行业趋势、最佳实践和热敏纸技术的专家分析。', link: 'blog-insights' },
        { icon: 'calculator', title: '工具与计算器', description: '实用工具，用于计算成本、估算使用量和规划采购。', link: 'tools-calculators' },
        { icon: 'help', title: '常见问题', description: '关于产品、订购和技术规格的常见问题解答。', link: 'faqs' },
        { icon: 'file', title: '产品指南', description: '所有产品的详细规格、使用指南和技术文档。', link: '/zh/manufacturing/packaging-shipping' },
        { icon: 'trending', title: '市场报告', description: '最新市场趋势、行业分析和区域洞察，用于战略规划。', link: 'blog-insights' },
        { icon: 'download', title: '下载', description: '可供下载的宣传册、目录、认证和技术表。', link: '/contact' },
      ],
    },
    featured: {
      title: '精选资源',
      items: [
        { category: '指南', title: '热敏纸选择完整指南', description: '了解如何为您的特定应用需求选择合适的热敏纸。', readTime: '8分钟阅读' },
        { category: '计算器', title: '热敏纸投资回报率计算器', description: '计算批量采购的潜在成本节省和投资回报率。', readTime: '5分钟' },
        { category: '报告', title: '2025年俄罗斯市场趋势', description: '俄罗斯和独联体热敏纸市场机会的全面分析。', readTime: '12分钟阅读' },
      ],
    },
    support: {
      title: '需要个性化支持？',
      description: '我们的团队随时准备帮助解决具体问题或定制需求',
      button: '联系我们的专家',
    },
  },
};
