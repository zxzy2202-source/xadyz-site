/**
 * BlogInsightsPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface ArticleItem {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
}

export interface BlogInsightsContent {
  hero: { title: string; subtitle: string; description: string };
  featured: { title: string; category: string; articleTitle: string; excerpt: string; author: string; date: string; readTime: string };
  categories: { title: string; items: string[] };
  articles: { title: string; items: ArticleItem[] };
  newsletter: { title: string; description: string; placeholder: string; button: string };
  readArticle: string;
}

export const content: Record<Lang, BlogInsightsContent> = {
  en: {
    hero: {
      title: 'Blog & Industry Insights',
      subtitle: 'Expert Knowledge & Market Intelligence',
      description: 'Stay informed with the latest trends, technical insights, and market analysis from thermal paper industry experts.',
    },
    featured: {
      title: 'Featured Article',
      category: 'Market Analysis',
      articleTitle: 'The Future of Thermal Paper in Russian Retail',
      excerpt: 'An in-depth analysis of emerging trends, digital transformation, and growth opportunities in the Russian thermal paper market for 2025-2027.',
      author: 'Industry Research Team',
      date: 'February 2025',
      readTime: '12 min read',
    },
    categories: {
      title: 'Browse by Category',
      items: ['Market Trends', 'Product Innovation', 'Sustainability', 'Technical Guides', 'Case Studies', 'Regulatory Updates'],
    },
    articles: {
      title: 'Latest Articles',
      items: [
        { category: 'Technical Guide', title: 'Understanding BPA-Free Thermal Paper Technology', excerpt: 'Comprehensive guide to BPA-free alternatives, their benefits, and applications in modern retail environments.', author: 'Technical Team', date: 'January 2025', readTime: '8 min read' },
        { category: 'Market Trends', title: 'Digital Transformation in CIS Logistics', excerpt: 'How thermal paper labels are evolving to support digital tracking and warehouse automation across CIS countries.', author: 'Market Analysts', date: 'January 2025', readTime: '10 min read' },
        { category: 'Sustainability', title: 'FSC Certification: Why It Matters for Your Business', excerpt: 'The environmental and business case for choosing FSC-certified thermal paper products.', author: 'Sustainability Team', date: 'December 2024', readTime: '6 min read' },
        { category: 'Case Study', title: 'Optimizing POS Operations for Major Retail Chain', excerpt: 'How we helped a leading Russian retailer reduce costs and improve efficiency with custom thermal paper solutions.', author: 'Client Success', date: 'December 2024', readTime: '7 min read' },
        { category: 'Product Innovation', title: 'New Generation of High-Duration Thermal Paper', excerpt: 'Introducing our latest thermal paper technology with extended image life and superior performance.', author: 'R&D Department', date: 'November 2024', readTime: '5 min read' },
        { category: 'Regulatory', title: 'EU REACH Compliance: What Importers Need to Know', excerpt: 'Essential information about REACH regulations and how our products meet all European requirements.', author: 'Compliance Team', date: 'November 2024', readTime: '9 min read' },
      ],
    },
    newsletter: { title: 'Subscribe to Our Newsletter', description: 'Get monthly industry insights, product updates, and exclusive content delivered to your inbox', placeholder: 'Enter your email', button: 'Subscribe' },
    readArticle: 'Read Article',
  },

  ru: {
    hero: {
      title: 'Блог и отраслевая аналитика',
      subtitle: 'Экспертные знания и рыночная информация',
      description: 'Будьте в курсе последних тенденций, технических инсайтов и рыночного анализа от экспертов индустрии термобумаги.',
    },
    featured: {
      title: 'Избранная статья',
      category: 'Анализ рынка',
      articleTitle: 'Будущее термобумаги в российской розничной торговле',
      excerpt: 'Углубленный анализ новых тенденций, цифровой трансформации и возможностей роста на российском рынке термобумаги на 2025-2027 годы.',
      author: 'Команда отраслевых исследований',
      date: 'Февраль 2025',
      readTime: '12 мин чтения',
    },
    categories: {
      title: 'Просмотр по категориям',
      items: ['Рыночные тенденции', 'Инновации продуктов', 'Устойчивое развитие', 'Технические руководства', 'Кейс-стади', 'Регуляторные обновления'],
    },
    articles: {
      title: 'Последние статьи',
      items: [
        { category: 'Техническое руководство', title: 'Понимание технологии термобумаги без BPA', excerpt: 'Комплексное руководство по альтернативам без BPA, их преимуществам и применению в современной розничной торговле.', author: 'Техническая команда', date: 'Январь 2025', readTime: '8 мин чтения' },
        { category: 'Рыночные тенденции', title: 'Цифровая трансформация в логистике СНГ', excerpt: 'Как этикетки из термобумаги эволюционируют для поддержки цифрового отслеживания и автоматизации складов в странах СНГ.', author: 'Рыночные аналитики', date: 'Январь 2025', readTime: '10 мин чтения' },
        { category: 'Устойчивое развитие', title: 'Сертификация FSC: почему это важно для вашего бизнеса', excerpt: 'Экологические и бизнес-аргументы в пользу выбора продукции из термобумаги с сертификацией FSC.', author: 'Команда устойчивого развития', date: 'Декабрь 2024', readTime: '6 мин чтения' },
        { category: 'Кейс-стади', title: 'Оптимизация POS-операций для крупной розничной сети', excerpt: 'Как мы помогли ведущему российскому ритейлеру снизить затраты и повысить эффективность с помощью индивидуальных решений из термобумаги.', author: 'Успех клиентов', date: 'Декабрь 2024', readTime: '7 мин чтения' },
        { category: 'Инновации продуктов', title: 'Новое поколение долговечной термобумаги', excerpt: 'Представляем нашу новейшую технологию термобумаги с увеличенным сроком службы изображения и превосходной производительностью.', author: 'Отдел R&D', date: 'Ноябрь 2024', readTime: '5 мин чтения' },
        { category: 'Регуляторное', title: 'Соответствие EU REACH: что нужно знать импортерам', excerpt: 'Важная информация о регламенте REACH и о том, как наша продукция соответствует всем европейским требованиям.', author: 'Команда соответствия', date: 'Ноябрь 2024', readTime: '9 мин чтения' },
      ],
    },
    newsletter: { title: 'Подпишитесь на нашу рассылку', description: 'Получайте ежемесячные отраслевые инсайты, обновления продуктов и эксклюзивный контент на вашу почту', placeholder: 'Введите ваш email', button: 'Подписаться' },
    readArticle: 'Читать статью',
  },

  zh: {
    hero: {
      title: '博客与行业洞察',
      subtitle: '专家知识与市场情报',
      description: '了解热敏纸行业专家提供的最新趋势、技术洞察和市场分析。',
    },
    featured: {
      title: '精选文章',
      category: '市场分析',
      articleTitle: '俄罗斯零售业热敏纸的未来',
      excerpt: '对2025-2027年俄罗斯热敏纸市场新兴趋势、数字化转型和增长机会的深入分析。',
      author: '行业研究团队',
      date: '2025年2月',
      readTime: '12分钟阅读',
    },
    categories: {
      title: '按类别浏览',
      items: ['市场趋势', '产品创新', '可持续发展', '技术指南', '案例研究', '法规更新'],
    },
    articles: {
      title: '最新文章',
      items: [
        { category: '技术指南', title: '了解无BPA热敏纸技术', excerpt: '无BPA替代品、其优势及在现代零售环境中应用的综合指南。', author: '技术团队', date: '2025年1月', readTime: '8分钟阅读' },
        { category: '市场趋势', title: '独联体物流的数字化转型', excerpt: '热敏纸标签如何发展以支持独联体国家的数字追踪和仓库自动化。', author: '市场分析师', date: '2025年1月', readTime: '10分钟阅读' },
        { category: '可持续发展', title: 'FSC认证：为什么对您的业务很重要', excerpt: '选择FSC认证热敏纸产品的环境和商业理由。', author: '可持续发展团队', date: '2024年12月', readTime: '6分钟阅读' },
        { category: '案例研究', title: '优化大型零售连锁的POS运营', excerpt: '我们如何帮助一家领先的俄罗斯零售商通过定制热敏纸解决方案降低成本并提高效率。', author: '客户成功', date: '2024年12月', readTime: '7分钟阅读' },
        { category: '产品创新', title: '新一代高耐久性热敏纸', excerpt: '推出我们最新的热敏纸技术，具有延长的图像寿命和卓越的性能。', author: '研发部门', date: '2024年11月', readTime: '5分钟阅读' },
        { category: '法规', title: 'EU REACH合规性：进口商需要知道什么', excerpt: '关于REACH法规的基本信息以及我们的产品如何满足所有欧洲要求。', author: '合规团队', date: '2024年11月', readTime: '9分钟阅读' },
      ],
    },
    newsletter: { title: '订阅我们的新闻通讯', description: '每月获取行业洞察、产品更新和独家内容到您的收件箱', placeholder: '输入您的邮箱', button: '订阅' },
    readArticle: '阅读文章',
  },
};
