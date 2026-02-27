/**
 * 页面素材配置类型与工具
 * 统一 pageAssets 结构，方便后台 /admin/page-assets 映射
 */

const P = (name: string) => `/images/placeholders/${name}`;

export type ProofTag = "factory" | "production" | "quality" | "warehouse" | "shipping" | "cert" | "team";

export interface PageImage {
  src: string;
  alt: string;
}

export interface HeroAsset {
  src: string;
  alt: string;
  overlay: "dark" | "light";
  focal: "center" | "left" | "right";
}

export interface ProofImage extends PageImage {
  tag: ProofTag;
}

export interface PageAssetsConfig {
  seoImage: PageImage;
  hero: HeroAsset;
  gallery: PageImage[];
  cards: Record<string, PageImage>;
  proofs: ProofImage[];
}

/** overlay 遮罩透明度：dark=0.55, light=0.25 */
export function getOverlayOpacity(overlay: "dark" | "light"): number {
  return overlay === "dark" ? 0.55 : 0.25;
}

/** 占位图路径前缀 */
export const PLACEHOLDER_BASE = "/images/placeholders";

/** 常用占位图路径 */
export const PLACEHOLDERS = {
  hero: {
    factoryLine: P("hero-factory-line.webp"),
    warehouse: P("hero-warehouse.webp"),
    application: P("hero-application.webp"),
  },
  product: {
    thermalRolls: P("product-thermal-rolls.webp"),
    thermalLabels: P("product-thermal-labels.webp"),
    ncrForms: P("product-ncr-forms.webp"),
  },
  material: {
    jumboRolls: P("material-jumbo-rolls.webp"),
    adhesiveJumbo: P("material-adhesive-jumbo.webp"),
    adhesiveSheets: P("material-adhesive-sheets.webp"),
    ncrJumbo: P("material-ncr-jumbo.webp"),
    ncrSheets: P("material-ncr-sheets.webp"),
  },
  proof: {
    slittingMachine: P("proof-slitting-machine.webp"),
    qualityInspection: P("proof-quality-inspection.webp"),
    warehousePallets: P("proof-warehouse-pallets.webp"),
    containerLoading: P("proof-container-loading.webp"),
    certificatesWall: P("proof-certificates-wall.webp"),
    teamPhoto: P("proof-team-photo.webp"),
  },
  gallery: {
    g1: P("gallery-1.webp"),
    g2: P("gallery-2.webp"),
    g3: P("gallery-3.webp"),
  },
} as const;
