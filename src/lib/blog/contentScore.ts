import type { PostContent } from '@/lib/supabase/queries/blogContentSchema';

export function computeContentScore(input: {
  content: PostContent | null | undefined;
  internalLinksCount?: number;
}): number {
  const { content, internalLinksCount = 0 } = input;

  let score = 0;

  const bullets = content?.hero?.summaryBullets?.length || 0;
  const rootCauses = content?.problem?.rootCauses?.length || 0;
  const principles = content?.solution?.principles?.length || 0;
  const useCases = content?.useCasesAndProcess?.useCases?.length || 0;
  const steps = content?.useCasesAndProcess?.steps?.length || 0;
  const faq = content?.comparisonFaqCta?.qa?.length || 0;
  const comparisonPoints = content?.comparisonFaqCta?.comparisonPoints?.length || 0;

  if (bullets >= 3) score += 10;
  if (rootCauses >= 3) score += 10;
  if (principles >= 3) score += 10;
  if (useCases >= 2) score += 10;
  if (steps >= 4) score += 10;
  if (faq >= 4) score += 15;
  if (comparisonPoints >= 3) score += 10;
  if (internalLinksCount >= 3) score += 15;

  if (score > 100) score = 100;
  return score;
}
