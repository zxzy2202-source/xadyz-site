import { COMPANY } from '@/lib/data';

/**
 * Centralized contact configuration (Bridged to H-track Standard COMPANY object).
 */
export const CONTACT = {
  ...COMPANY.contact,
  addressZh: COMPANY.address.zh,
  addressEn: COMPANY.address.en,
  addressRu: COMPANY.address.ru,
} as const;
