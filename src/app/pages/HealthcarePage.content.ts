/**
 * HealthcarePage 三语言内容数据
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

export interface HealthcareContent {
  seo: { title: string; description: string; keywords: string };
  hero: { h1: string; subheading: string; intro: string };
  overview: { sectionTitle: string; content: string; highlights: string[] };
  applications: { sectionTitle: string; apps: AppItem[] };
  products: { sectionTitle: string; items: ProductItem[] };
  benefits: { sectionTitle: string; items: BenefitItem[] };
  cta: { headline: string; subtext: string; primaryButton: string; primaryLink: string; secondaryButton: string; secondaryLink: string };
}

export const content: Record<Lang, HealthcareContent> = {
  en: {
    seo: {
      title: 'Healthcare Thermal Labels & Medical Documentation | Hospital Label Solutions | Zhixin',
      description: 'Thermal labels and NCR forms for healthcare facilities, hospitals, pharmacies, and medical documentation. Patient wristbands, specimen labels, and medical records.',
      keywords: 'healthcare thermal labels, medical labels, hospital labels, patient wristband labels, specimen labels, pharmacy labels, medical documentation',
    },
    hero: {
      h1: 'Healthcare & Medical Solutions',
      subheading: 'Thermal labels and forms for healthcare facilities',
      intro: 'Reliable and precise labeling solutions for hospitals, clinics, pharmacies, and medical documentation systems.',
    },
    overview: {
      sectionTitle: 'Paper Solutions for Healthcare',
      content: 'Healthcare environments demand labeling and documentation products that meet strict standards for accuracy, durability, and patient safety. Our thermal labels and NCR forms are designed to support critical healthcare operations, from patient identification to medication tracking and medical record keeping.',
      highlights: [
        'BPA-free options available for safety',
        'Clear printing for accurate identification',
        'Durable adhesive for secure attachment',
        'Compatible with medical label printers',
      ],
    },
    applications: {
      sectionTitle: 'Key Healthcare Applications',
      apps: [
        { icon: 'heart', title: 'Patient Identification', desc: 'Wristband labels and patient identification tags for hospitals and clinics' },
        { icon: 'pill', title: 'Pharmacy Labels', desc: 'Prescription labels and medication identification for pharmacies' },
        { icon: 'fileText', title: 'Specimen Labels', desc: 'Laboratory specimen labels for blood samples, tests, and medical diagnostics' },
        { icon: 'alertCircle', title: 'Medical Records', desc: 'NCR forms for patient records, consent forms, and medical documentation' },
      ],
    },
    products: {
      sectionTitle: 'Recommended Products',
      items: [
        {
          title: 'Thermal Labels for Healthcare',
          desc: 'Thermal label rolls for patient identification and medical applications',
          specs: ['BPA-free options', 'Strong adhesive for secure attachment', 'Compatible with Zebra and other medical printers'],
          link: '/en/thermal-labels',
          cta: 'View Product',
        },
        {
          title: 'NCR Forms for Medical Documentation',
          desc: 'Multi-part carbonless forms for patient records and consent',
          specs: ['2-part or 3-part forms', 'Customizable layouts', 'HIPAA-compliant printing available'],
          link: '/en/ncr-forms',
          cta: 'View Product',
        },
      ],
    },
    benefits: {
      sectionTitle: 'Why Healthcare Facilities Choose Us',
      items: [
        { icon: 'zap', title: 'Patient Safety Focus', desc: 'BPA-free and safety-conscious material options' },
        { icon: 'shield', title: 'Quality Assurance', desc: 'Strict quality control for critical healthcare applications' },
        { icon: 'checkCircle2', title: 'Compliance Ready', desc: 'Products designed to meet healthcare standards and regulations' },
      ],
    },
    cta: {
      headline: 'Ready to supply your healthcare facility?',
      subtext: 'Contact our healthcare solutions team for product specifications and customization options.',
      primaryButton: 'Contact Sales',
      primaryLink: '/en/contact',
      secondaryButton: 'View All Products',
      secondaryLink: '/en/products',
    },
  },

  ru: {
    seo: {
      title: 'Термоэтикетки для здравоохранения | Медицинские этикетки для больниц | Zhixin',
      description: 'Термоэтикетки и NCR-формы для медицинских учреждений, больниц, аптек и медицинской документации. Браслеты пациентов, этикетки образцов и медицинские записи.',
      keywords: 'термоэтикетки для здравоохранения, медицинские этикетки, больничные этикетки, браслеты пациентов, этикетки образцов, аптечные этикетки, медицинская документация',
    },
    hero: {
      h1: 'Решения для здравоохранения',
      subheading: 'Термоэтикетки и формы для медицинских учреждений',
      intro: 'Надёжные и точные решения для маркировки больниц, клиник, аптек и систем медицинской документации.',
    },
    overview: {
      sectionTitle: 'Бумажные решения для здравоохранения',
      content: 'Медицинские учреждения требуют продукты для маркировки и документации, соответствующие строгим стандартам точности, долговечности и безопасности пациентов. Наши термоэтикетки и NCR-формы разработаны для поддержки критичных медицинских операций — от идентификации пациентов до отслеживания лекарств и ведения медицинских записей.',
      highlights: [
        'Доступны варианты без BPA для безопасности',
        'Чёткая печать для точной идентификации',
        'Прочный клей для надёжного крепления',
        'Совместимы с медицинскими принтерами этикеток',
      ],
    },
    applications: {
      sectionTitle: 'Основные применения в здравоохранении',
      apps: [
        { icon: 'heart', title: 'Идентификация пациентов', desc: 'Браслеты и идентификационные бирки пациентов для больниц и клиник' },
        { icon: 'pill', title: 'Аптечные этикетки', desc: 'Этикетки рецептов и идентификация лекарств для аптек' },
        { icon: 'fileText', title: 'Этикетки образцов', desc: 'Лабораторные этикетки для образцов крови, анализов и медицинской диагностики' },
        { icon: 'alertCircle', title: 'Медицинские записи', desc: 'NCR-формы для медицинских карт, форм согласия и медицинской документации' },
      ],
    },
    products: {
      sectionTitle: 'Рекомендуемые продукты',
      items: [
        {
          title: 'Термоэтикетки для здравоохранения',
          desc: 'Рулоны термоэтикеток для идентификации пациентов и медицинских применений',
          specs: ['Варианты без BPA', 'Прочный клей для надёжного крепления', 'Совместимы с Zebra и другими медицинскими принтерами'],
          link: '/ru/thermal-labels',
          cta: 'Смотреть продукт',
        },
        {
          title: 'NCR-формы для медицинской документации',
          desc: 'Многослойные самокопирующиеся формы для медицинских карт и согласий',
          specs: ['2-слойные или 3-слойные формы', 'Настраиваемые макеты', 'Доступна печать, соответствующая HIPAA'],
          link: '/ru/ncr-forms',
          cta: 'Смотреть продукт',
        },
      ],
    },
    benefits: {
      sectionTitle: 'Почему медицинские учреждения выбирают нас',
      items: [
        { icon: 'zap', title: 'Фокус на безопасности пациентов', desc: 'Варианты материалов без BPA и с учётом безопасности' },
        { icon: 'shield', title: 'Гарантия качества', desc: 'Строгий контроль качества для критичных медицинских применений' },
        { icon: 'checkCircle2', title: 'Готовность к соответствию', desc: 'Продукты разработаны в соответствии со стандартами и нормами здравоохранения' },
      ],
    },
    cta: {
      headline: 'Готовы обеспечить поставки для вашего медицинского учреждения?',
      subtext: 'Свяжитесь с нашей командой по медицинским решениям для уточнения спецификаций и вариантов кастомизации.',
      primaryButton: 'Связаться с отделом продаж',
      primaryLink: '/ru/contact',
      secondaryButton: 'Все продукты',
      secondaryLink: '/ru/products',
    },
  },

  zh: {
    seo: {
      title: '医疗健康热敏标签与医疗文档 | 医院标签解决方案 | 志信纸业',
      description: '为医疗机构、医院、药房和医疗文档提供热敏标签和NCR表格。患者腕带、样本标签和医疗记录。',
      keywords: '医疗热敏标签, 医疗标签, 医院标签, 患者腕带标签, 样本标签, 药房标签, 医疗文档',
    },
    hero: {
      h1: '医疗健康解决方案',
      subheading: '为医疗机构提供热敏标签和表格',
      intro: '为医院、诊所、药房和医疗文档系统提供可靠精确的标签解决方案。',
    },
    overview: {
      sectionTitle: '医疗纸张解决方案',
      content: '医疗环境要求标签和文档产品符合严格的准确性、耐用性和患者安全标准。我们的热敏标签和NCR表格旨在支持关键医疗运营，从患者识别到药物追踪和医疗记录保存。',
      highlights: [
        '提供无BPA安全选项',
        '清晰打印以确保准确识别',
        '耐用粘合剂确保安全附着',
        '兼容医疗标签打印机',
      ],
    },
    applications: {
      sectionTitle: '主要医疗应用',
      apps: [
        { icon: 'heart', title: '患者识别', desc: '用于医院和诊所的腕带标签和患者识别标签' },
        { icon: 'pill', title: '药房标签', desc: '用于药房的处方标签和药物识别' },
        { icon: 'fileText', title: '样本标签', desc: '用于血液样本、检测和医疗诊断的实验室样本标签' },
        { icon: 'alertCircle', title: '医疗记录', desc: '用于患者记录、知情同意书和医疗文档的NCR表格' },
      ],
    },
    products: {
      sectionTitle: '推荐产品',
      items: [
        {
          title: '医疗热敏标签',
          desc: '用于患者识别和医疗应用的热敏标签卷',
          specs: ['无BPA选项', '强力粘合剂确保安全附着', '兼容Zebra和其他医疗打印机'],
          link: '/zh/thermal-labels',
          cta: '查看产品',
        },
        {
          title: '医疗文档NCR表格',
          desc: '用于患者记录和同意书的多联无碳复写表格',
          specs: ['2联或3联表格', '可定制版式', '可提供符合HIPAA的印刷'],
          link: '/zh/ncr-forms',
          cta: '查看产品',
        },
      ],
    },
    benefits: {
      sectionTitle: '为什么医疗机构选择我们',
      items: [
        { icon: 'zap', title: '关注患者安全', desc: '无BPA和安全意识材料选项' },
        { icon: 'shield', title: '质量保证', desc: '针对关键医疗应用的严格质量控制' },
        { icon: 'checkCircle2', title: '合规就绪', desc: '产品设计符合医疗标准和法规' },
      ],
    },
    cta: {
      headline: '准备为您的医疗机构供应？',
      subtext: '联系我们的医疗解决方案团队获取产品规格和定制选项。',
      primaryButton: '联系销售',
      primaryLink: '/zh/contact',
      secondaryButton: '查看所有产品',
      secondaryLink: '/zh/products',
    },
  },
};
