/**
 * Image Slot Registry following H-track v2.1 standard.
 * Maps slot keys to metadata or default placeholders.
 */
export const IMAGE_SLOTS = {
  // Global
  LOGO: 'global.logo',
  FAVICON: 'global.favicon',
  
  // Home Page
  HOME_HERO: 'home.hero',
  HOME_FACTORY_PROOF: 'home.factory_proof',
  
  // Product Pages
  PRODUCTS_HERO: 'products.hero',
  MATERIAL_HERO: 'material.hero',
  
  // Government Tenders
  TENDERS_HERO: 'government-tenders.hero',
  TENDERS_FACTORY: 'government-tenders.factory_real',
  
  // Manufacturing
  MANUFACTURING_HERO: 'manufacturing.hero',
  SLITTING_MACHINE: 'manufacturing.slitting_machine',
  
  // About Page
  ABOUT_HERO: 'about.hero',
  ABOUT_TEAM: 'about.team',
  
  // Contact Page
  CONTACT_HERO: 'contact.hero',
} as const;

export type SlotKey = typeof IMAGE_SLOTS[keyof typeof IMAGE_SLOTS];
