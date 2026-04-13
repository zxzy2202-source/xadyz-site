/**
 * 客户留言系统统一配置
 * 客户类型、产品类型 - 前后台共用
 */

export type LeadTypeKey = 'tender' | 'distributor' | 'oem' | 'inquiry' | 'contact';

export type ProductInterestKey =
  | 'thermal_paper_rolls'
  | 'thermal_labels'
  | 'ncr_forms'
  | 'jumbo_rolls'
  | 'materials_other';

export const LEAD_TYPE_LABELS: Record<
  LeadTypeKey,
  { zh: string; en: string; ru: string }
> = {
  tender: { zh: '招标', en: 'Tender', ru: 'Тендер' },
  distributor: { zh: '经销商', en: 'Distributor', ru: 'Дистрибьютор' },
  oem: { zh: 'OEM', en: 'OEM', ru: 'OEM' },
  inquiry: { zh: '询价', en: 'Inquiry', ru: 'Запрос' },
  contact: { zh: '咨询', en: 'Contact', ru: 'Консультация' },
};

/** 产品兴趣选项 - 用于表单多选与后台筛选 */
export const PRODUCT_INTEREST_OPTIONS: Record<
  ProductInterestKey,
  { zh: string; en: string; ru: string; value: string }
> = {
  thermal_paper_rolls: {
    zh: '热敏纸卷',
    en: 'Thermal Paper Rolls',
    ru: 'Термобумага',
    value: 'thermal_paper_rolls',
  },
  thermal_labels: {
    zh: '热敏标签',
    en: 'Thermal Labels',
    ru: 'Термоэтикетки',
    value: 'thermal_labels',
  },
  ncr_forms: {
    zh: 'NCR表格',
    en: 'NCR Forms',
    ru: 'NCR-формы',
    value: 'ncr_forms',
  },
  jumbo_rolls: {
    zh: '原材料大卷',
    en: 'Jumbo Rolls',
    ru: 'Jumbo рулоны',
    value: 'jumbo_rolls',
  },
  materials_other: {
    zh: '其他材料/定制',
    en: 'Other Materials / Custom',
    ru: 'Другие материалы',
    value: 'materials_other',
  },
};

export const PRODUCT_KEYS = Object.keys(
  PRODUCT_INTEREST_OPTIONS
) as ProductInterestKey[];

/** 根据产品 key 获取显示文案 */
export function getProductLabel(
  key: string,
  lang: 'zh' | 'en' | 'ru'
): string {
  const opt = PRODUCT_INTEREST_OPTIONS[key as ProductInterestKey];
  return opt ? opt[lang] : key;
}

/** 根据客户类型 key 获取显示文案 */
export function getLeadTypeLabel(
  key: string,
  lang: 'zh' | 'en' | 'ru'
): string {
  const opt = LEAD_TYPE_LABELS[key as LeadTypeKey];
  return opt ? opt[lang] : key;
}

/** 带产品预填的联系页 URL（用于快速询价） */
export function getContactInquiryUrl(
  lang: 'zh' | 'en' | 'ru',
  productKey: ProductInterestKey,
  intent?: 'quote' | 'sample' | 'tender' | 'contact'
): string {
  const params = new URLSearchParams({
    inquiry: productKey,
  });
  if (intent) {
    params.set('intent', intent);
  }
  return `/${lang}/contact?${params.toString()}`;
}
