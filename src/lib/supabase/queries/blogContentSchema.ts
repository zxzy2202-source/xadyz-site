/**
 * 博客 content 结构化 schema
 * Basics / Hero / Problem / Solution / Use Cases & Process / Comparison-FAQ-CTA
 */

export type PostContent = {
  hero?: {
    headline?: string;
    subheadline?: string;
    summaryBullets?: string[];
  };
  problem?: {
    whyItMatters?: string;
    commonSymptoms?: string[];
    rootCauses?: string[];
  };
  solution?: {
    overview?: string;
    principles?: string[];
  };
  useCasesAndProcess?: {
    useCases?: Array<{ title: string; description: string; steps: string[] }>;
    steps?: string[];
  };
  comparisonFaqCta?: {
    comparisonPoints?: string[];
    qa?: Array<{ q: string; a: string }>;
    cta?: { headline: string; subtext: string; buttonText: string };
  };
};

export const DEFAULT_CONTENT: PostContent = {
  hero: {
    headline: '',
    subheadline: '',
    summaryBullets: [],
  },
  problem: {
    whyItMatters: '',
    commonSymptoms: [],
    rootCauses: [],
  },
  solution: {
    overview: '',
    principles: [],
  },
  useCasesAndProcess: {
    useCases: [],
    steps: [],
  },
  comparisonFaqCta: {
    comparisonPoints: [],
    qa: [],
    cta: { headline: '', subtext: '', buttonText: '' },
  },
};

/**
 * 旧数据迁移：
 * - content 为空/undefined：使用默认模板
 * - content 为 string（原 body）：优先放入 problem.whyItMatters；若为多行则首行入 whyItMatters，其余行入 hero.summaryBullets
 */
export function migrateContent(raw: unknown): PostContent {
  if (raw == null || raw === '') return { ...DEFAULT_CONTENT };
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    const obj = raw as Record<string, unknown>;
    if (Object.keys(obj).length === 0) return { ...DEFAULT_CONTENT };
    return deepMerge(DEFAULT_CONTENT, obj as PostContent);
  }
  if (typeof raw === 'string' && raw.trim()) {
    const lines = raw.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length <= 1) {
      return {
        ...DEFAULT_CONTENT,
        problem: { ...DEFAULT_CONTENT.problem, whyItMatters: raw.trim() },
      };
    }
    return {
      ...DEFAULT_CONTENT,
      problem: { ...DEFAULT_CONTENT.problem, whyItMatters: lines[0] },
      hero: {
        ...DEFAULT_CONTENT.hero,
        summaryBullets: lines.slice(1),
      },
    };
  }
  return { ...DEFAULT_CONTENT };
}

function deepMerge(base: PostContent, over: Partial<PostContent>): PostContent {
  const out: PostContent = { ...base };
  if (over.hero) out.hero = { ...base.hero, ...over.hero };
  if (over.problem) out.problem = { ...base.problem, ...over.problem };
  if (over.solution) out.solution = { ...base.solution, ...over.solution };
  if (over.useCasesAndProcess) out.useCasesAndProcess = { ...base.useCasesAndProcess, ...over.useCasesAndProcess };
  if (over.comparisonFaqCta) {
    out.comparisonFaqCta = {
      ...base.comparisonFaqCta,
      ...over.comparisonFaqCta,
      cta: over.comparisonFaqCta?.cta
        ? { ...base.comparisonFaqCta?.cta, ...over.comparisonFaqCta.cta }
        : base.comparisonFaqCta?.cta,
    };
  }
  return out;
}
