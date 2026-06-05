/**
 * Site Settings Types following H-track v2.1 standard.
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export interface SiteSettings {
  siteName: string;
  siteFullName: string;
  supportEmail: string;
  supportPhone: string;
  seo: SEOMetadata;
  features: {
    enableTenders: boolean;
    enableSamples: boolean;
    enableQuotes: boolean;
  };
  geo: Record<string, {
    heroTitle: string;
    heroSubtitle: string;
    seo: SEOMetadata;
  }>;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'Zhixin Paper',
  siteFullName: 'Zhixin Paper Industry',
  supportEmail: 'Sales@zxpapers.com',
  supportPhone: '+86 135 7282 1237',
  seo: {
    title: 'Zhixin Paper | Professional Thermal Paper & Label Supplier',
    description: 'Leading manufacturer of thermal paper rolls, labels, and jumbo rolls in China. Serving 50+ countries with ISO 9001 certified quality.',
  },
  features: {
    enableTenders: true,
    enableSamples: true,
    enableQuotes: true,
  },
  geo: {
    us: {
      heroTitle: 'Direct Factory Supply to North America',
      heroSubtitle: 'High-quality thermal paper with fast delivery and competitive pricing.',
      seo: {
        title: 'Zhixin Paper USA | Industrial Thermal Paper Supplier',
        description: 'BPA-free thermal paper rolls and labels for the US market.',
      }
    },
    ru: {
      heroTitle: 'Поставки термобумаги напрямую с завода',
      heroSubtitle: 'Высокое качество, быстрая доставка и поддержка государственных тендеров.',
      seo: {
        title: 'Zhixin Paper Россия | Поставщик термобумаги из Китая',
        description: 'Сертифицированная термобумага для российского рынка. Поддержка тендеров.',
      }
    }
  }
};
