/**
 * Centralized contact configuration.
 * Update phone/email/address here to change across Contact, Footer, and other pages.
 */
export const CONTACT = {
  phone: '+86 135 7282 1237',
  phoneRaw: '8613572821237',
  telUrl: 'tel:+8613572821237',
  whatsappUrl: 'https://wa.me/8613572821237',
  telegramUrl: 'https://t.me/8613572821237',
  email: 'Sales@zxpapers.com',
  emailSecondary: 'jack@zxpapers.com', // Optional second contact
  responseTime: '24', // hours
  workingHours: 'Mon–Fri 9:00–18:00 (GMT+8)',
  timezone: 'China Standard Time (GMT+8)',

  /** 工厂地址 - 用于页脚、联系页、Google 地图 / 结构化数据 */
  addressZh: '中国陕西省西安市高陵区融豪工业园二期15栋',
  addressEn: 'Building 15, Ronghao Industrial Park Phase 2, Gaoling District, Xi\'an, Shaanxi, China',
  addressRu: 'Китай, г. Сиань, р-н Гаолин, промпарк Жунхао, 2-я очередь, корп. 15',
} as const;
