/**
 * BankingFinancePage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface AppItem {
  icon: string;
  title: string;
  desc: string;
}

export interface ProductItem {
  title: string;
  desc: string;
  specs: string[];
  link: string;
  cta: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  desc: string;
}

export interface BankingFinanceContent {
  seo: { title: string; description: string; keywords: string };
  hero: { h1: string; subheading: string; intro: string };
  overview: { sectionTitle: string; content: string; highlights: string[] };
  applications: { sectionTitle: string; apps: AppItem[] };
  products: { sectionTitle: string; items: ProductItem[] };
  benefits: { sectionTitle: string; items: BenefitItem[] };
  cta: { headline: string; subtext: string; primaryButton: string; primaryLink: string; secondaryButton: string; secondaryLink: string };
}

export const content: Record<Lang, BankingFinanceContent> = {
  en: {
    seo: {
      title: 'Banking & Finance Thermal Paper & NCR Forms | ATM Receipts & Bank Slips | Zhixin',
      description: 'Thermal paper and NCR forms for banks, financial institutions, and payment systems. ATM receipts, transaction slips, and financial documentation solutions.',
      keywords: 'bank thermal paper, ATM receipt paper, bank slip paper, financial NCR forms, banking thermal solutions, transaction receipt paper',
    },
    hero: {
      h1: 'Banking & Finance Solutions',
      subheading: 'Thermal paper and NCR forms for financial institutions',
      intro: 'Reliable and secure paper solutions for banks, ATMs, payment systems, and financial documentation.',
    },
    overview: {
      sectionTitle: 'Paper Solutions for Financial Institutions',
      content: 'Banks and financial institutions require paper products that meet strict standards for print quality, durability, and security. Our thermal paper and NCR forms are manufactured with precision, ensuring clear printing for transaction records and long-term readability for financial documentation.',
      highlights: [
        'Compatible with ATM and payment terminals',
        'Long-lasting print for archival purposes',
        'NCR forms for multi-part documentation',
        'Consistent quality for compliance requirements',
      ],
    },
    applications: {
      sectionTitle: 'Key Banking Applications',
      apps: [
        { icon: 'building2', title: 'ATM Receipts', desc: 'Thermal paper rolls for ATM machines and cash dispensers' },
        { icon: 'creditCard', title: 'Transaction Slips', desc: 'Thermal paper for POS terminals and payment processing' },
        { icon: 'fileText', title: 'Bank Forms', desc: 'NCR forms for deposit slips, withdrawal forms, and internal documentation' },
        { icon: 'lock', title: 'Financial Records', desc: 'Durable thermal paper for transaction records and audit trails' },
      ],
    },
    products: {
      sectionTitle: 'Recommended Products',
      items: [
        {
          title: 'ATM Thermal Paper',
          desc: 'Thermal paper rolls designed for ATM machines',
          specs: ['Standard ATM sizes', 'Long-lasting print quality', 'Compatible with major ATM brands'],
          link: '/en/thermal-paper-rolls',
          cta: 'View Product',
        },
        {
          title: 'NCR Forms',
          desc: 'Multi-part carbonless forms for financial documentation',
          specs: ['2-part, 3-part, or more', 'Customizable layouts', 'Pre-printed or blank options'],
          link: '/en/ncr-forms',
          cta: 'View Product',
        },
      ],
    },
    benefits: {
      sectionTitle: 'Why Financial Institutions Choose Us',
      items: [
        { icon: 'zap', title: 'Reliable Supply', desc: 'Consistent delivery to support critical banking operations' },
        { icon: 'shield', title: 'Quality Assurance', desc: 'Strict quality control for compliance and audit requirements' },
        { icon: 'checkCircle2', title: 'Technical Support', desc: 'Expert guidance for specifications and compatibility' },
      ],
    },
    cta: {
      headline: 'Ready to supply your financial institution?',
      subtext: 'Contact our banking solutions team for product specifications and supply coordination.',
      primaryButton: 'Contact Sales',
      primaryLink: '/en/contact',
      secondaryButton: 'View All Products',
      secondaryLink: '/en/products',
    },
  },

  ru: {
    seo: {
      title: 'Термобумага и NCR формы для банков | Чеки банкоматов и банковские квитанции | Zhixin',
      description: 'Термобумага и NCR-формы для банков, финансовых учреждений и платёжных систем. Чеки банкоматов, квитанции транзакций и решения для финансовой документации.',
      keywords: 'термобумага для банков, чеки банкоматов, банковские квитанции, NCR формы финансовые, банковские термо-решения, бумага для транзакционных чеков',
    },
    hero: {
      h1: 'Решения для банков и финансов',
      subheading: 'Термобумага и NCR-формы для финансовых учреждений',
      intro: 'Надёжные и безопасные бумажные решения для банков, банкоматов, платёжных систем и финансовой документации.',
    },
    overview: {
      sectionTitle: 'Бумажные решения для финансовых учреждений',
      content: 'Банки и финансовые учреждения требуют бумажные продукты, соответствующие строгим стандартам качества печати, долговечности и безопасности. Наша термобумага и NCR-формы производятся с высокой точностью, обеспечивая чёткую печать для транзакционных записей и долгосрочную читаемость финансовой документации.',
      highlights: [
        'Совместимы с банкоматами и платёжными терминалами',
        'Долговечная печать для архивирования',
        'NCR-формы для многослойной документации',
        'Стабильное качество для соответствия требованиям',
      ],
    },
    applications: {
      sectionTitle: 'Основные применения в банковском секторе',
      apps: [
        { icon: 'building2', title: 'Чеки банкоматов', desc: 'Термо-рулоны для банкоматов и денежных диспенсеров' },
        { icon: 'creditCard', title: 'Квитанции транзакций', desc: 'Термобумага для POS-терминалов и обработки платежей' },
        { icon: 'fileText', title: 'Банковские формы', desc: 'NCR-формы для депозитных квитанций, форм на снятие и внутренней документации' },
        { icon: 'lock', title: 'Финансовые записи', desc: 'Долговечная термобумага для транзакционных записей и аудиторских следов' },
      ],
    },
    products: {
      sectionTitle: 'Рекомендуемые продукты',
      items: [
        {
          title: 'Термобумага для банкоматов',
          desc: 'Термо-рулоны, разработанные для банкоматов',
          specs: ['Стандартные размеры для банкоматов', 'Долговечное качество печати', 'Совместимы с основными брендами банкоматов'],
          link: '/ru/thermal-paper-rolls',
          cta: 'Смотреть продукт',
        },
        {
          title: 'NCR-формы',
          desc: 'Многослойные самокопирующиеся формы для финансовой документации',
          specs: ['2-слойные, 3-слойные или больше', 'Настраиваемые макеты', 'Предварительно напечатанные или пустые варианты'],
          link: '/ru/ncr-forms',
          cta: 'Смотреть продукт',
        },
      ],
    },
    benefits: {
      sectionTitle: 'Почему финансовые учреждения выбирают нас',
      items: [
        { icon: 'zap', title: 'Надёжные поставки', desc: 'Последовательные поставки для поддержки критичных банковских операций' },
        { icon: 'shield', title: 'Гарантия качества', desc: 'Строгий контроль качества для соответствия требованиям и аудита' },
        { icon: 'checkCircle2', title: 'Техническая поддержка', desc: 'Экспертные рекомендации по спецификациям и совместимости' },
      ],
    },
    cta: {
      headline: 'Готовы обеспечить поставки для вашего финансового учреждения?',
      subtext: 'Свяжитесь с нашей командой банковских решений для уточнения спецификаций и координации поставок.',
      primaryButton: 'Связаться с отделом продаж',
      primaryLink: '/ru/contact',
      secondaryButton: 'Все продукты',
      secondaryLink: '/ru/products',
    },
  },

  zh: {
    seo: {
      title: '银行与金融热敏纸及NCR表格 | ATM收据与银行凭条 | 志信纸业',
      description: '为银行、金融机构和支付系统提供热敏纸和NCR表格。ATM收据、交易凭条和金融文档解决方案。',
      keywords: '银行热敏纸, ATM收据纸, 银行凭条纸, 金融NCR表格, 银行热敏解决方案, 交易收据纸',
    },
    hero: {
      h1: '银行与金融解决方案',
      subheading: '为金融机构提供热敏纸和NCR表格',
      intro: '为银行、ATM机、支付系统和金融文档提供可靠安全的纸张解决方案。',
    },
    overview: {
      sectionTitle: '金融机构纸张解决方案',
      content: '银行和金融机构需要符合严格标准的纸张产品，包括打印质量、耐用性和安全性。我们的热敏纸和NCR表格经过精密制造，确保交易记录清晰打印和金融文档的长期可读性。',
      highlights: [
        '兼容ATM和支付终端',
        '用于存档的持久打印',
        '多联NCR表格',
        '符合合规要求的一致品质',
      ],
    },
    applications: {
      sectionTitle: '主要银行应用',
      apps: [
        { icon: 'building2', title: 'ATM收据', desc: '用于ATM机和现金分配器的热敏纸卷' },
        { icon: 'creditCard', title: '交易凭条', desc: '用于POS终端和支付处理的热敏纸' },
        { icon: 'fileText', title: '银行表格', desc: '用于存款凭条、取款表格和内部文档的NCR表格' },
        { icon: 'lock', title: '金融记录', desc: '用于交易记录和审计追踪的耐用热敏纸' },
      ],
    },
    products: {
      sectionTitle: '推荐产品',
      items: [
        {
          title: 'ATM热敏纸',
          desc: '专为ATM机设计的热敏纸卷',
          specs: ['标准ATM尺寸', '持久打印质量', '兼容主流ATM品牌'],
          link: '/zh/thermal-paper-rolls',
          cta: '查看产品',
        },
        {
          title: 'NCR表格',
          desc: '用于金融文档的多联无碳复写表格',
          specs: ['2联、3联或更多', '可定制版式', '预印或空白选项'],
          link: '/zh/ncr-forms',
          cta: '查看产品',
        },
      ],
    },
    benefits: {
      sectionTitle: '为什么金融机构选择我们',
      items: [
        { icon: 'zap', title: '可靠供应', desc: '稳定交付以支持关键银行业务' },
        { icon: 'shield', title: '质量保证', desc: '严格质量控制以满足合规和审计要求' },
        { icon: 'checkCircle2', title: '技术支持', desc: '规格和兼容性的专家指导' },
      ],
    },
    cta: {
      headline: '准备为您的金融机构供应？',
      subtext: '联系我们的银行解决方案团队获取产品规格和供应协调。',
      primaryButton: '联系销售',
      primaryLink: '/zh/contact',
      secondaryButton: '查看所有产品',
      secondaryLink: '/zh/products',
    },
  },
};
