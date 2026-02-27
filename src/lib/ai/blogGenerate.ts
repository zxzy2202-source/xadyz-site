import { projectId, publicAnonKey } from '/utils/supabase/info';

const SUPABASE_FUNCTIONS_URL = `https://${projectId}.supabase.co/functions/v1`;

export type AIGeneratePayload = {
  title: string;
  language: 'en' | 'ru' | 'zh';
  target_region?: string;
  category?: string;
  keywords?: string;
};

export type AIGenerateResult = {
  /** 博客正文（Markdown），由 AI 生成 */
  body?: string;
  content: Record<string, unknown>;
  seo: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
  };
};

export async function aiGenerateBlog(payload: AIGeneratePayload): Promise<AIGenerateResult> {
  const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/ai-blog-generate`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok) {
    const detail = json?.detail;
    const msg = json?.error || 'AI generate failed';
    throw new Error(typeof detail === 'string' ? `${msg}: ${detail}` : msg);
  }
  return json as AIGenerateResult;
}
