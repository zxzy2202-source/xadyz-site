/**
 * GovernmentTendersPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface TenderProduct {
  title: string;
  desc: string;
}

export interface CapabilityItem {
  title: string;
  desc: string;
}

export interface UseCase {
  title: string;
  desc: string;
}

export interface GovernmentTendersContent {
  seo: { title: string; description: string; keywords: string };
  hero: { h1: string; subheading: string; intro: string; primaryCTA: string; primaryCTALink: string; secondaryCTA: string; secondaryCTALink: string };
  qualification: { sectionTitle: string; intro: string; targetGroups: string[]; callout: string };
  supportedProducts: { sectionTitle: string; products: TenderProduct[] };
  capabilities: { sectionTitle: string; items: CapabilityItem[] };
  documentation: { sectionTitle: string; intro: string; items: string[]; note: string };
  useCases: { sectionTitle: string; cases: UseCase[] };
  tenderCTA: { headline: string; subtext: string; primaryButton: string; primaryLink: string; secondaryButton: string; secondaryLink: string };
}

export const content: Record<Lang, GovernmentTendersContent> = {
  en: {
    seo: {
      title: 'Government & Tender Supply Partner | Thermal Paper, Labels, NCR Forms | Zhixin',
      description: 'Factory-manufactured thermal paper, labels, and NCR forms for government tenders and public sector procurement. Stable production, documentation support, and long-term supply coordination.',
      keywords: 'government tender thermal paper, public sector procurement, NCR forms government, tender documentation, state procurement supplier, project supply partner',
    },
    hero: {
      h1: 'Government & Tender Supply Partner',
      subheading: 'Factory-manufactured thermal paper, labels, and NCR forms for public sector and project procurement',
      intro: 'We support government and enterprise tenders with stable production, documentation, and long-term supply coordination.',
      primaryCTA: 'Request Tender Pack',
      primaryCTALink: '/en/request-tender-pack',
      secondaryCTA: 'Contact Project Team',
      secondaryCTALink: '/en/contact',
    },
    qualification: {
      sectionTitle: 'Is This Page for You?',
      intro: 'This page is designed for:',
      targetGroups: [
        'Tender winners and project contractors',
        'Government procurement departments',
        'State-owned and municipal organizations',
        'Enterprise project buyers',
      ],
      callout: 'If you are preparing or executing a tender, you are in the right place.',
    },
    supportedProducts: {
      sectionTitle: 'Supported Products for Tenders',
      products: [
        { title: 'Thermal Paper Rolls', desc: 'Receipt paper for public service systems' },
        { title: 'Thermal Labels', desc: 'Labels for government logistics and inventory' },
        { title: 'NCR Forms (Blank / Printed / Continuous)', desc: 'Forms for administrative documentation' },
      ],
    },
    capabilities: {
      sectionTitle: 'Why We Fit Tender Projects',
      items: [
        { title: 'Stable batch production', desc: 'Consistent quality across all batches for long-term contracts' },
        { title: 'Long-term supply planning', desc: 'Coordinated delivery schedules to meet project timelines' },
        { title: 'Experience with project documentation', desc: 'Technical specifications and quality records prepared for tender requirements' },
        { title: 'Coordinated project follow-up', desc: 'Dedicated support throughout the project lifecycle' },
      ],
    },
    documentation: {
      sectionTitle: 'Documentation Support',
      intro: 'Tender documentation may include:',
      items: ['Product specifications', 'Technical datasheets', 'Quality control records', 'Project reference information'],
      note: 'Documentation provided upon qualified request.',
    },
    useCases: {
      sectionTitle: 'Typical Tender Use Cases',
      cases: [
        { title: 'Receipt paper for public service systems', desc: 'POS thermal paper for government service centers, tax offices, and municipal services' },
        { title: 'NCR forms for administrative documentation', desc: 'Multi-part carbonless forms for official records and internal workflows' },
        { title: 'Thermal labels for government logistics', desc: 'Identification and tracking labels for state inventory and warehouse systems' },
      ],
    },
    tenderCTA: {
      headline: 'Ready to proceed with your tender or project?',
      subtext: 'Request a tender pack or contact our project team for documentation and technical support.',
      primaryButton: 'Request Tender Pack',
      primaryLink: '/en/request-tender-pack',
      secondaryButton: 'Contact Project Team',
      secondaryLink: '/en/contact',
    },
  },

  ru: {
    seo: {
      title: 'Поставщик для государственных и тендерных проектов | Термобумага, этикетки, NCR | Zhixin',
      description: 'Термобумага, этикетки и NCR-формы собственного производства для государственных тендеров и закупок. Стабильное производство, документация и долгосрочные поставки.',
      keywords: 'поставщик государственных тендеров, термобумага госзакупки, NCR формы тендеры, тендерная документация, поставщик госпроектов, партнер по проектным закупкам',
    },
    hero: {
      h1: 'Поставщик для государственных и тендерных проектов',
      subheading: 'Термобумага, термоэтикетки и NCR-формы собственного производства для тендерных закупок',
      intro: 'Мы сопровождаем государственные и корпоративные тендеры, обеспечивая стабильное производство, документацию и долгосрочные поставки.',
      primaryCTA: 'Запросить тендерный пакет',
      primaryCTALink: '/ru/request-tender-pack',
      secondaryCTA: 'Связаться с проектной командой',
      secondaryCTALink: '/ru/contact',
    },
    qualification: {
      sectionTitle: 'Эта страница для вас?',
      intro: 'Эта страница предназначена для:',
      targetGroups: [
        'Победителей тендеров и подрядчиков',
        'Государственных закупочных организаций',
        'Государственных и муниципальных учреждений',
        'Корпоративных проектных заказчиков',
      ],
      callout: 'Если вы готовитесь к тендеру или реализуете проект — вы обратились по адресу.',
    },
    supportedProducts: {
      sectionTitle: 'Продукция для тендеров',
      products: [
        { title: 'Термобумага в рулонах', desc: 'Чековая бумага для государственных сервисов' },
        { title: 'Термоэтикетки (рулоны)', desc: 'Этикетки для государственной логистики и учета' },
        { title: 'NCR-формы (пустые / печатные / непрерывные)', desc: 'Формы для административного документооборота' },
      ],
    },
    capabilities: {
      sectionTitle: 'Почему мы подходим для тендерных проектов',
      items: [
        { title: 'Стабильное производство партий', desc: 'Одинаковое качество всех партий для долгосрочных контрактов' },
        { title: 'Планирование долгосрочных поставок', desc: 'Согласованные графики поставок под проектные сроки' },
        { title: 'Опыт подготовки проектной документации', desc: 'Технические спецификации и документы качества для тендерных требований' },
        { title: 'Сопровождение проектов', desc: 'Выделенная поддержка на протяжении всего проекта' },
      ],
    },
    documentation: {
      sectionTitle: 'Поддержка документации',
      intro: 'Тендерная документация может включать:',
      items: ['Технические спецификации продукции', 'Паспорт и описание изделий', 'Документы по контролю качества', 'Информацию по проектному опыту'],
      note: 'Документация предоставляется по запросу квалифицированных заказчиков.',
    },
    useCases: {
      sectionTitle: 'Типовые тендерные сценарии',
      cases: [
        { title: 'Чековая бумага для государственных сервисов', desc: 'POS термобумага для государственных центров обслуживания, налоговых служб и муниципальных сервисов' },
        { title: 'NCR-формы для административного документооборота', desc: 'Многослойные безуглеродные формы для официальных записей и внутренних процессов' },
        { title: 'Термоэтикетки для государственной логистики', desc: 'Этикетки для идентификации и отслеживания в государственных складских системах' },
      ],
    },
    tenderCTA: {
      headline: 'Готовы продолжить тендер или проект?',
      subtext: 'Запросите тендерный пакет или свяжитесь с нашей проектной командой для поддержки.',
      primaryButton: 'Запросить тендерный пакет',
      primaryLink: '/ru/request-tender-pack',
      secondaryButton: 'Связаться с проектной командой',
      secondaryLink: '/ru/contact',
    },
  },

  zh: {
    seo: {
      title: '政府与投标供应伙伴 | 热敏纸、标签、NCR表格 | 志信纸业',
      description: '工厂制造的热敏纸、标签和NCR表格，服务政府投标和公共部门采购。稳定生产、文档支持和长期供应协调。',
      keywords: '政府投标热敏纸, 公共部门采购, NCR表格政府, 投标文档, 国家采购供应商, 项目供应伙伴',
    },
    hero: {
      h1: '政府与投标供应伙伴',
      subheading: '工厂制造的热敏纸、标签和NCR表格，服务公共部门和项目采购',
      intro: '我们通过稳定生产、文档支持和长期供应协调，支持政府和企业投标。',
      primaryCTA: '申请投标资料包',
      primaryCTALink: '/zh/request-tender-pack',
      secondaryCTA: '联系项目团队',
      secondaryCTALink: '/zh/contact',
    },
    qualification: {
      sectionTitle: '这个页面适合您吗？',
      intro: '此页面专为以下客户设计：',
      targetGroups: ['中标方和项目承包商', '政府采购部门', '国有和市政组织', '企业项目采购方'],
      callout: '如果您正在准备或执行投标，您来对地方了。',
    },
    supportedProducts: {
      sectionTitle: '投标支持产品',
      products: [
        { title: '热敏纸卷', desc: '公共服务系统的小票纸' },
        { title: '热敏标签（卷装）', desc: '政府物流和库存标签' },
        { title: 'NCR表格（空白/印刷/连续）', desc: '行政文档表格' },
      ],
    },
    capabilities: {
      sectionTitle: '为什么我们适合投标项目',
      items: [
        { title: '稳定批次生产', desc: '长期合同的所有批次质量一致' },
        { title: '长期供应规划', desc: '协调交付时间表以满足项目进度' },
        { title: '项目文档经验', desc: '为投标要求准备技术规格和质量记录' },
        { title: '协调项目跟进', desc: '整个项目生命周期的专属支持' },
      ],
    },
    documentation: {
      sectionTitle: '文档支持',
      intro: '投标文档可能包括：',
      items: ['产品规格', '技术数据表', '质量控制记录', '项目参考信息'],
      note: '文档根据合格请求提供。',
    },
    useCases: {
      sectionTitle: '典型投标应用场景',
      cases: [
        { title: '公共服务系统的小票纸', desc: '政府服务中心、税务局和市政服务的POS热敏纸' },
        { title: '行政文档的NCR表格', desc: '官方记录和内部流程的多联无碳复写表格' },
        { title: '政府物流的热敏标签', desc: '国家库存和仓库系统的识别和追踪标签' },
      ],
    },
    tenderCTA: {
      headline: '准备继续您的投标或项目？',
      subtext: '申请投标资料包或联系我们的项目团队获取文档和技术支持。',
      primaryButton: '申请投标资料包',
      primaryLink: '/zh/request-tender-pack',
      secondaryButton: '联系项目团队',
      secondaryLink: '/zh/contact',
    },
  },
};
