/**
 * RequestTenderPackPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface TenderItem {
  title: string;
  description: string;
}

export interface RequestTenderPackContent {
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  whatsIncluded: string;
  whatsIncludedDesc: string;
  items: TenderItem[];
  formTitle: string;
  formSubtitle: string;
  companyName: string;
  companyNamePlaceholder: string;
  contactPerson: string;
  contactPersonPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  country: string;
  countryPlaceholder: string;
  projectType: string;
  projectTypePlaceholder: string;
  projectTypes: string[];
  productsInterest: string;
  productsInterestHint: string;
  additionalInfo: string;
  additionalInfoPlaceholder: string;
  submitBtn: string;
  submitting: string;
  contactTitle: string;
  contactDesc: string;
  whatsapp: string;
  telegram: string;
  emailBtn: string;
  successMsg: string;
  errorMsg: string;
  heroTag: string;
}

export const content: Record<Lang, RequestTenderPackContent> = {
  en: {
    title: 'Request Tender Pack - Zhixin Paper',
    description: 'Download our comprehensive tender pack with factory certificates, technical specifications, and project case studies.',
    h1: 'Request Tender Pack',
    subtitle: "Get instant access to our complete documentation package for project bidding and procurement.",
    whatsIncluded: "What's Included",
    whatsIncludedDesc: 'Our tender pack contains everything you need for project evaluation and procurement decisions.',
    items: [
      { title: 'Factory Certificates', description: 'ISO 9001, FSC, BPA-free certifications, and compliance documentation' },
      { title: 'Technical Specifications', description: 'Detailed product specs, material data sheets, and quality standards' },
      { title: 'Production Capacity', description: 'Factory capacity reports, lead times, and delivery capabilities' },
      { title: 'Project Case Studies', description: 'Reference projects, client testimonials, and successful implementations' },
      { title: 'Pricing Templates', description: 'Quote templates, bulk pricing structures, and payment terms' },
      { title: 'Company Profile', description: '15+ years history, factory photos, equipment list, and team overview' },
    ],
    formTitle: 'Request Your Tender Pack',
    formSubtitle: "Fill out the form below and we'll send you the complete documentation within 24 hours.",
    companyName: 'Company Name',
    companyNamePlaceholder: 'Your Company Ltd.',
    contactPerson: 'Contact Person',
    contactPersonPlaceholder: 'John Smith',
    email: 'Email Address',
    emailPlaceholder: 'john@company.com',
    phone: 'Phone Number',
    phonePlaceholder: '+1 234 567 8900',
    country: 'Country',
    countryPlaceholder: 'Select your country',
    projectType: 'Project Type',
    projectTypePlaceholder: 'Select project type',
    projectTypes: ['Government Tender', 'Corporate Procurement', 'Distributor Partnership', 'Large Volume Order', 'Other'],
    productsInterest: 'Products of Interest',
    productsInterestHint: 'Select all that apply',
    additionalInfo: 'Additional Information (Optional)',
    additionalInfoPlaceholder: 'Tell us about your project requirements...',
    submitBtn: 'Request Tender Pack',
    submitting: 'Sending...',
    contactTitle: 'Prefer Direct Contact?',
    contactDesc: 'Reach out to our team directly for immediate assistance.',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    emailBtn: 'Email',
    successMsg: 'Successfully submitted! We will send the pack to your email within 24 hours.',
    errorMsg: 'Submission failed',
    heroTag: 'Project Tenders',
  },

  ru: {
    title: 'Запросить тендерный пакет - Zhixin Paper',
    description: 'Загрузите наш полный тендерный пакет с сертификатами завода, техническими характеристиками и кейсами проектов.',
    h1: 'Запросить тендерный пакет',
    subtitle: 'Получите мгновенный доступ к полному пакету документации для участия в тендерах и закупках.',
    whatsIncluded: 'Что входит в комплект',
    whatsIncludedDesc: 'Наш тендерный пакет содержит все необходимое для оценки проекта и принятия решений о закупках.',
    items: [
      { title: 'Сертификаты завода', description: 'ISO 9001, FSC, сертификаты BPA-free и документация о соответствии' },
      { title: 'Технические характеристики', description: 'Детальные спецификации продукции, паспорта материалов и стандарты качества' },
      { title: 'Производственная мощность', description: 'Отчеты о мощности завода, сроки поставки и возможности доставки' },
      { title: 'Кейсы проектов', description: 'Референс-проекты, отзывы клиентов и успешные внедрения' },
      { title: 'Шаблоны цен', description: 'Шаблоны коммерческих предложений, структура оптовых цен и условия оплаты' },
      { title: 'Профиль компании', description: '15+ лет истории, фото завода, список оборудования и обзор команды' },
    ],
    formTitle: 'Запросите тендерный пакет',
    formSubtitle: 'Заполните форму ниже, и мы отправим вам полную документацию в течение 24 часов.',
    companyName: 'Название компании',
    companyNamePlaceholder: 'ООО "Ваша компания"',
    contactPerson: 'Контактное лицо',
    contactPersonPlaceholder: 'Иван Иванов',
    email: 'Email',
    emailPlaceholder: 'ivan@company.ru',
    phone: 'Телефон',
    phonePlaceholder: '+7 900 123 45 67',
    country: 'Страна',
    countryPlaceholder: 'Выберите страну',
    projectType: 'Тип проекта',
    projectTypePlaceholder: 'Выберите тип проекта',
    projectTypes: ['Гос. тендер', 'Корпоративная закупка', 'Дистрибьютор', 'Крупный заказ', 'Другое'],
    productsInterest: 'Интересующие продукты',
    productsInterestHint: 'Выберите все подходящие',
    additionalInfo: 'Дополнительная информация (необязательно)',
    additionalInfoPlaceholder: 'Расскажите о требованиях вашего проекта...',
    submitBtn: 'Запросить тендерный пакет',
    submitting: 'Отправка...',
    contactTitle: 'Предпочитаете прямой контакт?',
    contactDesc: 'Свяжитесь с нашей командой напрямую для немедленной помощи.',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    emailBtn: 'Email',
    successMsg: 'Успешно отправлено! Мы отправим пакет на вашу почту в течение 24 часов.',
    errorMsg: 'Ошибка отправки',
    heroTag: 'Проектные тендеры',
  },

  zh: {
    title: '索取投标资料包 - 志信纸业',
    description: '下载包含工厂认证、技术规格和项目案例的完整投标资料包。',
    h1: '索取投标资料包',
    subtitle: '立即获取用于项目投标和采购决策的完整文档包。',
    whatsIncluded: '资料包内容',
    whatsIncludedDesc: '我们的投标资料包包含项目评估和采购决策所需的一切信息。',
    items: [
      { title: '工厂认证', description: 'ISO 9001、FSC、BPA-free认证和合规文档' },
      { title: '技术规格', description: '详细产品规格、材料数据表和质量标准' },
      { title: '产能报告', description: '工厂产能报告、交期和交付能力' },
      { title: '项目案例', description: '参考项目、客户评价和成功案例' },
      { title: '报价模板', description: '报价模板、批量价格结构和付款条款' },
      { title: '公司简介', description: '15年以上历史、工厂照片、设备清单和团队概况' },
    ],
    formTitle: '申请投标资料包',
    formSubtitle: '填写下方表单，我们将在24小时内发送完整文档。',
    companyName: '公司名称',
    companyNamePlaceholder: '您的公司名称',
    contactPerson: '联系人',
    contactPersonPlaceholder: '张三',
    email: '电子邮箱',
    emailPlaceholder: 'zhang@company.com',
    phone: '电话号码',
    phonePlaceholder: '+86 138 0000 0000',
    country: '国家',
    countryPlaceholder: '选择国家',
    projectType: '项目类型',
    projectTypePlaceholder: '选择项目类型',
    projectTypes: ['政府招标', '企业采购', '分销商合作', '大批量订单', '其他'],
    productsInterest: '感兴趣的产品',
    productsInterestHint: '可多选',
    additionalInfo: '附加信息（可选）',
    additionalInfoPlaceholder: '告诉我们您的项目需求...',
    submitBtn: '申请投标资料包',
    submitting: '提交中...',
    contactTitle: '更喜欢直接联系？',
    contactDesc: '直接联系我们的团队以获得即时帮助。',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    emailBtn: '电子邮件',
    successMsg: '提交成功！我们将在24小时内发送资料包到您的邮箱。',
    errorMsg: '提交失败',
    heroTag: '项目投标',
  },
};
