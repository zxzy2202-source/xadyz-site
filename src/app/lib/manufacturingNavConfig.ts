/**
 * Manufacturing sub-page navigation config.
 * Shared across ProductionPage, CertificationsPage, OEMCustomizationPage.
 */
export const MANUFACTURING_NAV_ITEMS: Record<'en' | 'ru' | 'zh', { key: string; href: string; label: string }[]> = {
  en: [
    { key: 'overview', href: '/en/manufacturing', label: 'Overview' },
    { key: 'factory', href: '/en/manufacturing/factory-overview', label: 'Factory Facilities' },
    { key: 'production', href: '/en/manufacturing/production-lines', label: 'Main Production Lines' },
    { key: 'quality', href: '/en/manufacturing/quality-control', label: 'Quality Control' },
    { key: 'shipping', href: '/en/manufacturing/packaging-shipping', label: 'Packaging & Shipping' },
    { key: 'certs', href: '/en/manufacturing/certifications', label: 'Certifications' },
    { key: 'oem', href: '/en/manufacturing/oem-customization', label: 'OEM & Customization' },
  ],
  ru: [
    { key: 'overview', href: '/ru/manufacturing', label: 'Обзор' },
    { key: 'factory', href: '/ru/manufacturing/factory-overview', label: 'Производственные мощности' },
    { key: 'production', href: '/ru/manufacturing/production-lines', label: 'Производственные линии' },
    { key: 'quality', href: '/ru/manufacturing/quality-control', label: 'Контроль качества' },
    { key: 'shipping', href: '/ru/manufacturing/packaging-shipping', label: 'Упаковка и отгрузка' },
    { key: 'certs', href: '/ru/manufacturing/certifications', label: 'Сертификаты' },
    { key: 'oem', href: '/ru/manufacturing/oem-customization', label: 'OEM и кастомизация' },
  ],
  zh: [
    { key: 'overview', href: '/zh/manufacturing', label: '概览' },
    { key: 'factory', href: '/zh/manufacturing/factory-overview', label: '工厂设施' },
    { key: 'production', href: '/zh/manufacturing/production-lines', label: '生产线' },
    { key: 'quality', href: '/zh/manufacturing/quality-control', label: '质量控制' },
    { key: 'shipping', href: '/zh/manufacturing/packaging-shipping', label: '包装运输' },
    { key: 'certs', href: '/zh/manufacturing/certifications', label: '认证资质' },
    { key: 'oem', href: '/zh/manufacturing/oem-customization', label: 'OEM定制' },
  ],
};
