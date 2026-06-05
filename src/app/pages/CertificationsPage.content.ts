/**
 * CertificationsPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface CertItem {
  title: string;
  category: string;
  description: string;
  icon: string;
}

export interface CertificationsContent {
  hero: { title: string; subtitle: string; description: string };
  certifications: { title: string; description: string };
  certs: CertItem[];
  commitment: { title: string; description: string; points: string[] };
  standards: { title: string; description: string; list: string[] };
  cta: { title: string; description: string; button: string };
}

export const content: Record<Lang, CertificationsContent> = {
  en: {
    hero: {
      title: 'Certifications & Quality Standards',
      subtitle: 'International Quality Assurance for Global Markets',
      description: 'Our comprehensive certifications demonstrate our commitment to quality, safety, and environmental responsibility across all product lines.',
    },
    certifications: {
      title: 'Our Certifications',
      description: 'We maintain the highest industry standards through rigorous certification processes',
    },
    certs: [
      { title: 'ISO 9001:2015', category: 'Quality Management', description: 'International standard for quality management systems, ensuring consistent product quality and customer satisfaction.', icon: 'award' },
      { title: 'ISO 14001:2015', category: 'Environmental Management', description: 'Environmental management certification demonstrating our commitment to sustainability and eco-friendly practices.', icon: 'shield' },
      { title: 'FSC Certification', category: 'Sustainable Forestry', description: 'Forest Stewardship Council certification ensuring responsible sourcing of paper materials from sustainable forests.', icon: 'check' },
      { title: 'REACH Compliance', category: 'Chemical Safety', description: 'EU regulation compliance for safe chemical usage, protecting human health and the environment.', icon: 'file' },
      { title: 'RoHS Compliance', category: 'Hazardous Substances', description: 'Restriction of Hazardous Substances directive compliance, ensuring safe products for European markets.', icon: 'shield' },
      { title: 'BPA-Free Certification', category: 'Product Safety', description: 'Certified BPA-free thermal paper products, meeting health and safety requirements worldwide.', icon: 'check' },
    ],
    commitment: {
      title: 'Our Quality Commitment',
      description: 'Quality assurance is at the heart of everything we do',
      points: ['Continuous improvement through regular audits and assessments', 'Investment in latest testing equipment and quality control systems', 'Trained quality assurance team with international expertise', 'Transparent quality documentation for all product batches'],
    },
    standards: {
      title: 'Industry Standards Compliance',
      description: 'Meeting and exceeding international requirements',
      list: ['FDA Food Contact Compliance', 'EN71 Toy Safety Standards', 'CPSIA Consumer Product Safety', 'ASTM Testing Standards', 'JIS Japanese Industrial Standards', 'GB/T Chinese National Standards'],
    },
    cta: {
      title: 'Request Certification Documentation',
      description: 'Get detailed information about our certifications and quality standards',
      button: 'Download Certificate Package',
    },
  },

  ru: {
    hero: {
      title: 'Сертификаты и стандарты качества',
      subtitle: 'Международное обеспечение качества для глобальных рынков',
      description: 'Наши комплексные сертификаты демонстрируют нашу приверженность качеству, безопасности и экологической ответственности по всем линейкам продукции.',
    },
    certifications: {
      title: 'Наши сертификаты',
      description: 'Мы поддерживаем высочайшие отраслевые стандарты через строгие процессы сертификации',
    },
    certs: [
      { title: 'ISO 9001:2015', category: 'Управление качеством', description: 'Международный стандарт систем управления качеством, обеспечивающий стабильное качество продукции и удовлетворенность клиентов.', icon: 'award' },
      { title: 'ISO 14001:2015', category: 'Экологический менеджмент', description: 'Сертификация экологического менеджмента, демонстрирующая нашу приверженность устойчивому развитию и экологичным практикам.', icon: 'shield' },
      { title: 'Сертификация FSC', category: 'Устойчивое лесопользование', description: 'Сертификация Лесного попечительского совета, обеспечивающая ответственное получение бумажных материалов из устойчивых лесов.', icon: 'check' },
      { title: 'Соответствие REACH', category: 'Химическая безопасность', description: 'Соответствие регламенту ЕС по безопасному использованию химических веществ, защите здоровья человека и окружающей среды.', icon: 'file' },
      { title: 'Соответствие RoHS', category: 'Опасные вещества', description: 'Соответствие директиве об ограничении использования опасных веществ, обеспечивающей безопасность продукции для европейских рынков.', icon: 'shield' },
      { title: 'Сертификат без BPA', category: 'Безопасность продукции', description: 'Сертифицированная термобумага без BPA, соответствующая требованиям здоровья и безопасности по всему миру.', icon: 'check' },
    ],
    commitment: {
      title: 'Наша приверженность качеству',
      description: 'Обеспечение качества - в центре всего, что мы делаем',
      points: ['Постоянное совершенствование через регулярные аудиты и оценки', 'Инвестиции в новейшее испытательное оборудование и системы контроля качества', 'Обученная команда по обеспечению качества с международной экспертизой', 'Прозрачная документация по качеству для всех партий продукции'],
    },
    standards: {
      title: 'Соответствие отраслевым стандартам',
      description: 'Соответствие и превышение международных требований',
      list: ['Соответствие FDA для контакта с пищевыми продуктами', 'Стандарты безопасности игрушек EN71', 'Безопасность потребительских товаров CPSIA', 'Стандарты испытаний ASTM', 'Японские промышленные стандарты JIS', 'Китайские национальные стандарты GB/T'],
    },
    cta: {
      title: 'Запросить документацию по сертификации',
      description: 'Получите подробную информацию о наших сертификатах и стандартах качества',
      button: 'Скачать пакет сертификатов',
    },
  },

  zh: {
    hero: {
      title: '认证证书与质量标准',
      subtitle: '面向全球市场的国际质量保证',
      description: '我们全面的认证证书展示了我们对所有产品线的质量、安全和环保责任的承诺。',
    },
    certifications: {
      title: '我们的认证证书',
      description: '通过严格的认证流程保持最高的行业标准',
    },
    certs: [
      { title: 'ISO 9001:2015', category: '质量管理', description: '国际质量管理体系标准，确保产品质量的一致性和客户满意度。', icon: 'award' },
      { title: 'ISO 14001:2015', category: '环境管理', description: '环境管理认证，展示我们对可持续发展和环保实践的承诺。', icon: 'shield' },
      { title: 'FSC认证', category: '可持续林业', description: '森林管理委员会认证，确保纸张材料来自可持续森林的负责任采购。', icon: 'check' },
      { title: 'REACH合规', category: '化学品安全', description: '符合欧盟化学品安全使用法规，保护人类健康和环境。', icon: 'file' },
      { title: 'RoHS合规', category: '有害物质', description: '符合限制有害物质指令，确保产品符合欧洲市场安全要求。', icon: 'shield' },
      { title: '无BPA认证', category: '产品安全', description: '经认证的无BPA热敏纸产品，符合全球健康和安全要求。', icon: 'check' },
    ],
    commitment: {
      title: '我们的质量承诺',
      description: '质量保证是我们所做一切的核心',
      points: ['通过定期审核和评估持续改进', '投资最新的检测设备和质量控制系统', '具有国际专业知识的专业质量保证团队', '所有产品批次的透明质量文档'],
    },
    standards: {
      title: '行业标准合规',
      description: '满足并超越国际要求',
      list: ['FDA食品接触合规', 'EN71玩具安全标准', 'CPSIA消费品安全', 'ASTM测试标准', 'JIS日本工业标准', 'GB/T中国国家标准'],
    },
    cta: {
      title: '索取认证文档',
      description: '获取关于我们认证和质量标准的详细信息',
      button: '下载证书包',
    },
  },
};
