/**
 * Unified company configuration following H-track v2.1 standard.
 * All site names and contact info should be referenced from here.
 */
export const COMPANY = {
  name: 'Zhixin Paper',
  fullName: 'Zhixin Paper Industry',
  slogan: {
    en: 'Professional Thermal Paper & Label Solutions Provider',
    ru: 'Профессиональный поставщик термобумаги и этикеток',
    zh: '专业热敏纸与标签解决方案供应商',
  },
  contact: {
    phone: '+86 135 7282 1237',
    phoneRaw: '8613572821237',
    telUrl: 'tel:+8613572821237',
    whatsappUrl: 'https://wa.me/8613572821237',
    telegramUrl: 'https://t.me/8613572821237',
    email: 'Sales@zxpapers.com',
    emailSecondary: 'jack@zxpapers.com',
    responseTime: '24', // hours
    workingHours: 'Mon–Fri 9:00–18:00 (GMT+8)',
    timezone: 'China Standard Time (GMT+8)',
  },
  address: {
    zh: '中国陕西省西安市高陵区融豪工业园二期15栋',
    en: 'Building 15, Ronghao Industrial Park Phase 2, Gaoling District, Xi\'an, Shaanxi, China',
    ru: 'Китай, г. Сиань, р-н Гаолин, промпарк Жунхао, 2-я очередь, корп. 15',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/zhixin-paper',
    facebook: 'https://www.facebook.com/zhixinpaper',
  }
} as const;
