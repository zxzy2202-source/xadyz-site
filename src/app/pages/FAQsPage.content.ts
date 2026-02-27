/**
 * FAQsPage 三语言内容数据
 */

export type Lang = 'en' | 'ru' | 'zh';

export interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

export interface FAQsContent {
  hero: { title: string; subtitle: string; description: string };
  search: { placeholder: string; noResults: string };
  categories: { title: string; items: string[] };
  faqs: FaqItem[];
  contact: { title: string; description: string; button: string; or: string; phone: string; email: string };
}

export const content: Record<Lang, FAQsContent> = {
  en: {
    hero: {
      title: 'Frequently Asked Questions',
      subtitle: 'Quick Answers to Common Questions',
      description: 'Find answers to the most common questions about our products, services, and ordering process.',
    },
    search: {
      placeholder: 'Search FAQs...',
      noResults: 'No matching questions found. Try different keywords or contact us for assistance.',
    },
    categories: {
      title: 'Browse by Category',
      items: ['Products', 'Ordering', 'Shipping', 'Quality', 'Technical', 'Pricing'],
    },
    faqs: [
      { category: 'Products', question: 'What types of thermal paper products do you offer?', answer: 'We manufacture a complete range of thermal paper products including POS rolls, ATM rolls, thermal labels (4x6", A6), NCR forms, jumbo rolls, and self-adhesive materials. All products are available in blank and custom-printed versions.' },
      { category: 'Products', question: 'Are your thermal paper products BPA-free?', answer: 'Yes, we offer BPA-free thermal paper options that meet international health and safety standards. Our BPA-free products use alternative sensitizers that are safe for food contact and general use.' },
      { category: 'Products', question: 'What is the shelf life of thermal paper?', answer: 'When stored properly in a cool, dry environment away from direct sunlight, our thermal paper has a shelf life of 2-3 years. For optimal image retention, we recommend using within 18 months of production.' },
      { category: 'Ordering', question: 'What is your minimum order quantity (MOQ)?', answer: 'Our standard MOQ varies by product type. For standard thermal rolls, the MOQ is typically one pallet (approximately 50-100 cartons depending on size). For custom printed products, MOQs are higher due to setup costs. Contact us for specific MOQ information.' },
      { category: 'Ordering', question: 'Can you provide custom printing and packaging?', answer: 'Absolutely! We offer full customization services including custom printing (up to 6 colors), private labeling, and custom packaging design. Our OEM services can adapt to your specific brand requirements.' },
      { category: 'Ordering', question: 'How do I place an order?', answer: 'You can place an order by contacting our sales team via email, phone, or through our contact form. We will provide a detailed quotation, confirm specifications, and arrange production once we receive your purchase order.' },
      { category: 'Shipping', question: 'What are your shipping options to Russia and CIS countries?', answer: 'We offer multiple shipping options including sea freight (most economical for bulk orders), rail freight, and air freight for urgent orders. We work with reliable logistics partners experienced in Russia and CIS markets.' },
      { category: 'Shipping', question: 'What is the typical lead time?', answer: 'For standard products, lead time is typically 15-20 days after order confirmation. Custom printed products require 25-30 days. Actual timing depends on order quantity, customization requirements, and current production schedule.' },
      { category: 'Shipping', question: 'Do you handle customs clearance?', answer: 'We can provide FOB, CIF, or DDP terms depending on your preference. For DDP shipments, we handle all customs procedures. We provide complete documentation including commercial invoices, packing lists, and certificates of origin.' },
      { category: 'Quality', question: 'What quality certifications do you have?', answer: 'We hold ISO 9001:2015 (Quality Management), ISO 14001:2015 (Environmental Management), FSC certification, and comply with REACH, RoHS, and FDA regulations. All products undergo strict quality control testing.' },
      { category: 'Quality', question: 'How do you ensure consistent product quality?', answer: 'We maintain strict quality control throughout production including raw material inspection, in-process monitoring, and final product testing. Each batch is tested for coating weight, image density, heat sensitivity, and physical properties.' },
      { category: 'Quality', question: 'What if I receive defective products?', answer: 'Quality is our priority. If you receive defective products, please contact us immediately with photos and details. We will investigate the issue and provide replacements or credit for confirmed defects according to our quality guarantee policy.' },
      { category: 'Technical', question: 'What printer models are compatible with your thermal paper?', answer: 'Our thermal paper is compatible with all major thermal printer brands including Epson, Star Micronics, Bixolon, Citizen, Zebra, and more. We can provide specific recommendations based on your printer model.' },
      { category: 'Technical', question: 'How should thermal paper be stored?', answer: 'Store thermal paper in a cool (15-25°C), dry environment with relative humidity below 65%. Keep away from direct sunlight, heat sources, and chemicals. Store rolls horizontally and avoid stacking too high to prevent deformation.' },
      { category: 'Technical', question: 'Can thermal paper be recycled?', answer: 'Standard thermal paper can be recycled, though it should be separated from regular paper recycling in some regions due to the thermal coating. Our FSC-certified products support sustainable forestry practices.' },
      { category: 'Pricing', question: 'How is pricing determined?', answer: 'Pricing depends on product specifications (width, diameter, core size), order quantity, coating type (standard or premium), customization requirements, and delivery terms. Volume discounts are available for larger orders.' },
      { category: 'Pricing', question: 'Do you offer payment terms?', answer: 'For first-time customers, we typically require 30% deposit with 70% balance before shipment. For established customers with good credit history, we can discuss extended payment terms such as 30-60 day credit.' },
      { category: 'Pricing', question: 'Are samples available?', answer: 'Yes, we provide free samples for quality evaluation. You only need to cover the shipping cost. Sample requests can be made through our contact form or by contacting our sales team directly.' },
    ],
    contact: {
      title: 'Still Have Questions?',
      description: 'Our team is here to help with any additional questions or specific requirements',
      button: 'Contact Us',
      or: 'or',
      phone: 'Call Us',
      email: 'Email Us',
    },
  },

  ru: {
    hero: {
      title: 'Часто задаваемые вопросы',
      subtitle: 'Быстрые ответы на распространенные вопросы',
      description: 'Найдите ответы на самые распространенные вопросы о наших продуктах, услугах и процессе заказа.',
    },
    search: {
      placeholder: 'Поиск по FAQ...',
      noResults: 'Подходящих вопросов не найдено. Попробуйте другие ключевые слова или свяжитесь с нами для получения помощи.',
    },
    categories: {
      title: 'Просмотр по категориям',
      items: ['Продукция', 'Заказ', 'Доставка', 'Качество', 'Технические', 'Цены'],
    },
    faqs: [
      { category: 'Продукция', question: 'Какие типы продукции из термобумаги вы предлагаете?', answer: 'Мы производим полный ассортимент продукции из термобумаги, включая POS-рулоны, рулоны для банкоматов, термоэтикетки (4x6", A6), NCR-формы, джамбо-рулоны и самоклеящиеся материалы. Вся продукция доступна в чистом виде и с индивидуальной печатью.' },
      { category: 'Продукция', question: 'Ваша термобумага не содержит BPA?', answer: 'Да, мы предлагаем варианты термобумаги без BPA, соответствующие международным стандартам здоровья и безопасности. Наши продукты без BPA используют альтернативные сенсибилизаторы, безопасные для контакта с пищевыми продуктами и общего использования.' },
      { category: 'Продукция', question: 'Каков срок хранения термобумаги?', answer: 'При правильном хранении в прохладной, сухой среде вдали от прямых солнечных лучей наша термобумага имеет срок хранения 2-3 года. Для оптимального сохранения изображения рекомендуем использовать в течение 18 месяцев с момента производства.' },
      { category: 'Заказ', question: 'Каков ваш минимальный объем заказа (MOQ)?', answer: 'Наш стандартный MOQ варьируется в зависимости от типа продукта. Для стандартных термо-рулонов MOQ обычно составляет один паллет (приблизительно 50-100 коробок в зависимости от размера). Для продукции с индивидуальной печатью MOQ выше из-за затрат на настройку. Свяжитесь с нами для получения конкретной информации о MOQ.' },
      { category: 'Заказ', question: 'Можете ли вы предоставить индивидуальную печать и упаковку?', answer: 'Абсолютно! Мы предлагаем полные услуги по индивидуализации, включая индивидуальную печать (до 6 цветов), частную маркировку и индивидуальный дизайн упаковки. Наши OEM-услуги могут адаптироваться к вашим конкретным требованиям бренда.' },
      { category: 'Заказ', question: 'Как разместить заказ?', answer: 'Вы можете разместить заказ, связавшись с нашим отделом продаж по электронной почте, телефону или через нашу контактную форму. Мы предоставим подробную смету, подтвердим спецификации и организуем производство после получения вашего заказа на покупку.' },
      { category: 'Доставка', question: 'Какие варианты доставки в Россию и страны СНГ?', answer: 'Мы предлагаем несколько вариантов доставки, включая морской фрахт (наиболее экономичный для оптовых заказов), железнодорожный фрахт и авиаперевозки для срочных заказов. Мы работаем с надежными логистическими партнерами, имеющими опыт работы на рынках России и СНГ.' },
      { category: 'Доставка', question: 'Каков типичный срок выполнения заказа?', answer: 'Для стандартных продуктов срок выполнения обычно составляет 15-20 дней после подтверждения заказа. Продукты с индивидуальной печатью требуют 25-30 дней. Фактические сроки зависят от объема заказа, требований к индивидуализации и текущего графика производства.' },
      { category: 'Доставка', question: 'Занимаетесь ли вы таможенной очисткой?', answer: 'Мы можем предоставить условия FOB, CIF или DDP в зависимости от ваших предпочтений. Для отгрузок DDP мы обрабатываем все таможенные процедуры. Мы предоставляем полную документацию, включая коммерческие счета-фактуры, упаковочные листы и сертификаты происхождения.' },
      { category: 'Качество', question: 'Какие сертификаты качества у вас есть?', answer: 'У нас есть ISO 9001:2015 (управление качеством), ISO 14001:2015 (экологический менеджмент), сертификация FSC, и мы соответствуем нормам REACH, RoHS и FDA. Вся продукция проходит строгое тестирование контроля качества.' },
      { category: 'Качество', question: 'Как вы обеспечиваете стабильное качество продукции?', answer: 'Мы поддерживаем строгий контроль качества на протяжении всего производства, включая инспекцию сырья, мониторинг в процессе и тестирование конечной продукции. Каждая партия тестируется на вес покрытия, плотность изображения, термочувствительность и физические свойства.' },
      { category: 'Качество', question: 'Что делать, если я получу дефектную продукцию?', answer: 'Качество - наш приоритет. Если вы получите дефектную продукцию, пожалуйста, немедленно свяжитесь с нами с фотографиями и деталями. Мы расследуем проблему и предоставим замену или кредит для подтвержденных дефектов в соответствии с нашей политикой гарантии качества.' },
      { category: 'Технические', question: 'С какими моделями принтеров совместима ваша термобумага?', answer: 'Наша термобумага совместима со всеми основными брендами термопринтеров, включая Epson, Star Micronics, Bixolon, Citizen, Zebra и другие. Мы можем предоставить конкретные рекомендации на основе модели вашего принтера.' },
      { category: 'Технические', question: 'Как следует хранить термобумагу?', answer: 'Храните термобумагу в прохладной (15-25°C), сухой среде с относительной влажностью ниже 65%. Держите вдали от прямых солнечных лучей, источников тепла и химикатов. Храните рулоны горизонтально и избегайте слишком высокой укладки, чтобы предотвратить деформацию.' },
      { category: 'Технические', question: 'Можно ли перерабатывать термобумагу?', answer: 'Стандартная термобумага может быть переработана, хотя в некоторых регионах ее следует отделять от обычной бумаги для переработки из-за термического покрытия. Наши продукты с сертификацией FSC поддерживают практики устойчивого лесопользования.' },
      { category: 'Цены', question: 'Как определяется цена?', answer: 'Цена зависит от спецификаций продукта (ширина, диаметр, размер втулки), объема заказа, типа покрытия (стандартное или премиум), требований к индивидуализации и условий доставки. Скидки на объем доступны для более крупных заказов.' },
      { category: 'Цены', question: 'Предлагаете ли вы условия оплаты?', answer: 'Для клиентов, впервые размещающих заказ, мы обычно требуем 30% депозит с 70% остатком перед отгрузкой. Для постоянных клиентов с хорошей кредитной историей мы можем обсудить расширенные условия оплаты, такие как кредит на 30-60 дней.' },
      { category: 'Цены', question: 'Доступны ли образцы?', answer: 'Да, мы предоставляем бесплатные образцы для оценки качества. Вам нужно только покрыть стоимость доставки. Запросы на образцы можно сделать через нашу контактную форму или связавшись напрямую с нашим отделом продаж.' },
    ],
    contact: {
      title: 'Остались вопросы?',
      description: 'Наша команда готова помочь с любыми дополнительными вопросами или конкретными требованиями',
      button: 'Связаться с нами',
      or: 'или',
      phone: 'Позвоните нам',
      email: 'Напишите нам',
    },
  },

  zh: {
    hero: {
      title: '常见问题',
      subtitle: '常见问题的快速解答',
      description: '查找关于我们产品、服务和订购流程的最常见问题的答案。',
    },
    search: {
      placeholder: '搜索常见问题...',
      noResults: '未找到匹配的问题。尝试不同的关键词或联系我们寻求帮助。',
    },
    categories: {
      title: '按类别浏览',
      items: ['产品', '订购', '运输', '质量', '技术', '价格'],
    },
    faqs: [
      { category: '产品', question: '你们提供哪些类型热敏纸产品？', answer: '我们生产全系列热敏纸产品，包括POS卷、ATM卷、热敏标签（4x6"、A6）、NCR表格、大卷纸和自粘材料。所有产品均提供空白和定制印刷版本。' },
      { category: '产品', question: '你们的热敏纸产品是否无BPA？', answer: '是的，我们提供符合国际健康和安全标准的无BPA热敏纸选项。我们的无BPA产品使用替代敏化剂，安全用于食品接触和一般用途。' },
      { category: '产品', question: '热敏纸的保质期是多久？', answer: '在避光、阴凉、干燥的环境中妥善保存时，我们的热敏纸保质期为2-3年。为了获得最佳的图像保留效果，我们建议在生产后18个月内使用。' },
      { category: '订购', question: '你们的最小起订量（MOQ）是多少？', answer: '我们的标准MOQ因产品类型而异。对于标准热敏卷，MOQ通常为一个托盘（根据尺寸约50-100箱）。对于定制印刷产品，由于设置成本，MOQ较高。请联系我们获取具体的MOQ信息。' },
      { category: '订购', question: '你们能提供定制印刷和包装吗？', answer: '当然可以！我们提供全面的定制服务，包括定制印刷（最多6种颜色）、贴牌生产和定制包装设计。我们的OEM服务可以适应您的具体品牌要求。' },
      { category: '订购', question: '如何下订单？', answer: '您可以通过电子邮件、电话或我们的联系表单联系我们的销售团队下订单。我们将提供详细报价，确认规格，并在收到您的采购订单后安排生产。' },
      { category: '运输', question: '你们到俄罗斯和独联体国家的运输选项是什么？', answer: '我们提供多种运输选项，包括海运（大批量订单最经济）、铁路运输和紧急订单的空运。我们与在俄罗斯和独联体市场有经验的可靠物流合作伙伴合作。' },
      { category: '运输', question: '典型的交货时间是多久？', answer: '对于标准产品，交货时间通常在订单确认后15-20天。定制印刷产品需要25-30天。实际时间取决于订单数量、定制要求和当前生产计划。' },
      { category: '运输', question: '你们处理清关吗？', answer: '我们可以根据您的偏好提供FOB、CIF或DDP条款。对于DDP发货，我们处理所有海关程序。我们提供完整的文档，包括商业发票、装箱单和原产地证明。' },
      { category: '质量', question: '你们有哪些质量认证？', answer: '我们拥有ISO 9001:2015（质量管理）、ISO 14001:2015（环境管理）、FSC认证，并符合REACH、RoHS和FDA法规。所有产品都经过严格的质量控制测试。' },
      { category: '质量', question: '你们如何确保产品质量的一致性？', answer: '我们在整个生产过程中保持严格的质量控制，包括原材料检验、过程监控和最终产品测试。每批产品都要测试涂层重量、图像密度、热敏性和物理性能。' },
      { category: '质量', question: '如果我收到有缺陷的产品怎么办？', answer: '质量是我们的首要任务。如果您收到有缺陷的产品，请立即与我们联系并提供照片和详情。我们将调查问题，并根据我们的质量保证政策为确认的缺陷提供更换或退款。' },
      { category: '技术', question: '你们的热敏纸与哪些打印机型号兼容？', answer: '我们的热敏纸与所有主要热敏打印机品牌兼容，包括爱普生、Star Micronics、Bixolon、Citizen、Zebra等。我们可以根据您的打印机型号提供具体建议。' },
      { category: '技术', question: '热敏纸应该如何存储？', answer: '将热敏纸存放在阴凉（15-25°C）、干燥的环境中，相对湿度低于65%。远离直射阳光、热源和化学品。水平存放卷纸，避免堆放过高以防止变形。' },
      { category: '技术', question: '热敏纸可以回收吗？', answer: '标准热敏纸可以回收，但在某些地区由于热敏涂层应与普通纸张回收分开。我们的FSC认证产品支持可持续林业实践。' },
      { category: '价格', question: '价格是如何确定的？', answer: '价格取决于产品规格（宽度、直径、芯尺寸）、订单数量、涂层类型（标准或高级）、定制要求和交货条款。大订单可享受批量折扣。' },
      { category: '价格', question: '你们提供付款条件吗？', answer: '对于首次客户，我们通常要求30%定金，发货前支付70%余款。对于信用良好的老客户，我们可以讨论延长的付款条件，如30-60天信用期。' },
      { category: '价格', question: '有样品吗？', answer: '是的，我们提供免费样品用于质量评估。您只需承担运费。可以通过我们的联系表单或直接联系我们的销售团队申请样品。' },
    ],
    contact: {
      title: '还有问题？',
      description: '我们的团队随时为您解答任何额外的问题或特定需求',
      button: '联系我们',
      or: '或',
      phone: '致电我们',
      email: '发邮件',
    },
  },
};
