/**
 * OEMCustomizationPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface CapabilitySpec {
  label: string;
  value: string;
}

export interface OEMContent {
  hero: { title: string; subtitle: string; description: string };
  services: { title: string; description: string; items: ServiceItem[] };
  process: { title: string; description: string; steps: ProcessStep[] };
  capabilities: { title: string; description: string; specs: CapabilitySpec[] };
  industries: { title: string; description: string; list: string[] };
  cta: { title: string; description: string; button: string };
}

export const content: Record<Lang, OEMContent> = {
  en: {
    hero: {
      title: 'OEM & Custom Solutions',
      subtitle: 'Tailored Manufacturing for Your Brand',
      description: 'From custom specifications to private labeling, we provide flexible OEM services to meet your unique business requirements.',
    },
    services: {
      title: 'Our OEM Services',
      description: 'Comprehensive customization options for your business needs',
      items: [
        { icon: 'settings', title: 'Custom Specifications', description: 'Tailored dimensions, weights, and technical specifications to match your exact requirements.' },
        { icon: 'palette', title: 'Private Labeling', description: 'Your brand, your design. Complete packaging and labeling customization services.' },
        { icon: 'package', title: 'Custom Packaging', description: 'Unique packaging solutions that reflect your brand identity and protect your products.' },
        { icon: 'trending', title: 'Product Development', description: 'Collaborative R&D to develop new products tailored to market demands.' },
        { icon: 'users', title: 'Dedicated Support', description: 'Assigned account manager and technical team for seamless project execution.' },
        { icon: 'clock', title: 'Flexible MOQ', description: 'Scalable order quantities to support businesses at every growth stage.' },
      ],
    },
    process: {
      title: 'OEM Process',
      description: 'Simple steps from concept to delivery',
      steps: [
        { number: '01', title: 'Consultation', description: 'Share your requirements and vision with our OEM specialists' },
        { number: '02', title: 'Design & Samples', description: 'Receive detailed proposals and physical samples for approval' },
        { number: '03', title: 'Production', description: 'Manufacturing begins with strict quality control at every stage' },
        { number: '04', title: 'Delivery', description: 'On-time shipping with complete documentation and support' },
      ],
    },
    capabilities: {
      title: 'Manufacturing Capabilities',
      description: 'Advanced facilities for diverse customization needs',
      specs: [
        { label: 'Width Range', value: '44mm - 850mm' },
        { label: 'Roll Diameter', value: 'Up to 2000mm' },
        { label: 'Core Size', value: '12mm - 76mm' },
        { label: 'Printing Colors', value: 'Up to 6 colors' },
        { label: 'Production Capacity', value: '5000+ tons/year' },
        { label: 'Lead Time', value: '15-30 days' },
      ],
    },
    industries: {
      title: 'Industries We Serve',
      description: 'Trusted OEM partner across multiple sectors',
      list: ['Retail & Point of Sale', 'Banking & Financial Services', 'Logistics & Transportation', 'Healthcare & Medical', 'Hospitality & Tourism', 'Government & Public Sector'],
    },
    cta: {
      title: 'Start Your OEM Project',
      description: "Let's discuss how we can bring your custom product vision to life",
      button: 'Request OEM Consultation',
    },
  },

  ru: {
    hero: {
      title: 'OEM и индивидуальные решения',
      subtitle: 'Производство на заказ для вашего бренда',
      description: 'От индивидуальных спецификаций до частной маркировки, мы предоставляем гибкие OEM-услуги для удовлетворения ваших уникальных бизнес-требований.',
    },
    services: {
      title: 'Наши OEM-услуги',
      description: 'Комплексные варианты настройки для ваших бизнес-потребностей',
      items: [
        { icon: 'settings', title: 'Индивидуальные спецификации', description: 'Размеры, вес и технические характеристики, соответствующие вашим точным требованиям.' },
        { icon: 'palette', title: 'Частная маркировка', description: 'Ваш бренд, ваш дизайн. Полные услуги по настройке упаковки и маркировки.' },
        { icon: 'package', title: 'Индивидуальная упаковка', description: 'Уникальные решения по упаковке, отражающие идентичность вашего бренда и защищающие вашу продукцию.' },
        { icon: 'trending', title: 'Разработка продукции', description: 'Совместные исследования и разработки для создания новых продуктов, адаптированных к требованиям рынка.' },
        { icon: 'users', title: 'Выделенная поддержка', description: 'Назначенный менеджер по работе с клиентами и техническая команда для бесперебойного выполнения проектов.' },
        { icon: 'clock', title: 'Гибкий MOQ', description: 'Масштабируемые объемы заказов для поддержки бизнеса на каждом этапе роста.' },
      ],
    },
    process: {
      title: 'Процесс OEM',
      description: 'Простые шаги от концепции до доставки',
      steps: [
        { number: '01', title: 'Консультация', description: 'Поделитесь своими требованиями и видением с нашими специалистами по OEM' },
        { number: '02', title: 'Дизайн и образцы', description: 'Получите подробные предложения и физические образцы для утверждения' },
        { number: '03', title: 'Производство', description: 'Производство начинается со строгим контролем качества на каждом этапе' },
        { number: '04', title: 'Доставка', description: 'Своевременная отгрузка с полной документацией и поддержкой' },
      ],
    },
    capabilities: {
      title: 'Производственные возможности',
      description: 'Современное оборудование для разнообразных потребностей в настройке',
      specs: [
        { label: 'Диапазон ширины', value: '44мм - 850мм' },
        { label: 'Диаметр рулона', value: 'До 2000мм' },
        { label: 'Размер втулки', value: '12мм - 76мм' },
        { label: 'Цвета печати', value: 'До 6 цветов' },
        { label: 'Производственная мощность', value: '5000+ тонн/год' },
        { label: 'Срок выполнения', value: '15-30 дней' },
      ],
    },
    industries: {
      title: 'Отрасли, которые мы обслуживаем',
      description: 'Надежный OEM-партнер в различных секторах',
      list: ['Розничная торговля и POS-системы', 'Банковские и финансовые услуги', 'Логистика и транспорт', 'Здравоохранение и медицина', 'Гостеприимство и туризм', 'Государственный и общественный сектор'],
    },
    cta: {
      title: 'Начните свой OEM-проект',
      description: 'Давайте обсудим, как мы можем воплотить ваше видение индивидуального продукта в жизнь',
      button: 'Запросить консультацию по OEM',
    },
  },

  zh: {
    hero: {
      title: 'OEM与定制解决方案',
      subtitle: '为您的品牌量身定制生产',
      description: '从定制规格到贴牌生产，我们提供灵活的OEM服务，满足您独特的业务需求。',
    },
    services: {
      title: '我们的OEM服务',
      description: '满足您业务需求的全面定制选项',
      items: [
        { icon: 'settings', title: '定制规格', description: '量身定制的尺寸、重量和技术规格，以匹配您的确切要求。' },
        { icon: 'palette', title: '贴牌生产', description: '您的品牌，您的设计。完整的包装和标签定制服务。' },
        { icon: 'package', title: '定制包装', description: '独特的包装解决方案，体现您的品牌形象并保护您的产品。' },
        { icon: 'trending', title: '产品开发', description: '协作研发，开发符合市场需求的新产品。' },
        { icon: 'users', title: '专属支持', description: '指定客户经理和技术团队，确保项目顺利执行。' },
        { icon: 'clock', title: '灵活起订量', description: '可扩展的订单数量，支持各个成长阶段的企业。' },
      ],
    },
    process: {
      title: 'OEM流程',
      description: '从概念到交付的简单步骤',
      steps: [
        { number: '01', title: '咨询', description: '与我们的OEM专家分享您的需求和愿景' },
        { number: '02', title: '设计与样品', description: '收到详细方案和实物样品供审批' },
        { number: '03', title: '生产', description: '开始生产，每个阶段都有严格的质量控制' },
        { number: '04', title: '交付', description: '准时发货，附带完整的文档和支持' },
      ],
    },
    capabilities: {
      title: '制造能力',
      description: '先进的设施满足多样化的定制需求',
      specs: [
        { label: '宽度范围', value: '44mm - 850mm' },
        { label: '卷筒直径', value: '最大2000mm' },
        { label: '纸管尺寸', value: '12mm - 76mm' },
        { label: '印刷颜色', value: '最多6色' },
        { label: '生产能力', value: '年产5000+吨' },
        { label: '交货期', value: '15-30天' },
      ],
    },
    industries: {
      title: '我们服务的行业',
      description: '跨多个行业可信赖OEM合作伙伴',
      list: ['零售与销售点', '银行与金融服务', '物流与运输', '医疗保健', '酒店与旅游', '政府与公共部门'],
    },
    cta: {
      title: '启动您的OEM项目',
      description: '让我们讨论如何将您的定制产品愿景变为现实',
      button: '申请OEM咨询',
    },
  },
};
