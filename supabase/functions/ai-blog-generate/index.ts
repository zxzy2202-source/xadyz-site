// supabase/functions/ai-blog-generate/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type Lang = "en" | "ru" | "zh";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

function json(res: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(res), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
      ...(init.headers || {}),
    },
    ...init,
  });
}

const SYSTEM_PROMPT = `
You are a B2B industrial content strategist for thermal paper & labels.
Write helpful, practical, non-fluffy content for procurement/operations decision makers.

Rules (VERY IMPORTANT):
- Do NOT fabricate certifications, test results, customer names, or production capacity numbers.
- If technical specs are unknown, leave them generic or mark as "TBD".
- Avoid exaggerated marketing claims.
- Output ONLY valid JSON. No markdown. No extra text.
`;

function buildUserPrompt(params: {
  title: string;
  lang: Lang;
  target_region?: string;
  category?: string;
  keywords?: string;
}) {
  const { title, lang, target_region, category, keywords } = params;

  return `
Task:
Generate a structured "Industry Insights / Solutions" article.

Topic(title): ${title}
Language: ${lang}
Target region: ${target_region || "Global"}
Category: ${category || "Industry Insights"}
Keywords (optional): ${keywords || ""}

Return JSON with EXACT keys:
{
  "body": "Full article body in Markdown. 3-6 paragraphs. Expand on the topic for the main blog post. Use headings (##), lists, and short paragraphs. This is the primary readable content shown on the post page.",
  "content": {
    "hero": { "headline": "", "subheadline": "", "summaryBullets": ["string","string"] },
    "problem": {
      "whyItMatters": "",
      "commonSymptoms": ["string"],
      "rootCauses": ["string"]
    },
    "solution": {
      "overview": "",
      "principles": ["string"]
    },
    "useCasesAndProcess": {
      "useCases": [ { "title": "", "description": "", "steps": ["string"] } ],
      "steps": ["string"]
    },
    "comparisonFaqCta": {
      "comparisonPoints": ["string"],
      "qa": [ { "q": "", "a": "" } ],
      "cta": { "headline": "", "subtext": "", "buttonText": "" }
    }
  },
  "seo": {
    "meta_title": "",
    "meta_description": "",
    "meta_keywords": ""
  }
}

Quality constraints:
- body: 3–6 paragraphs in Markdown; use ## for section headings; must be the main readable article content.
- summaryBullets: 3–5 items
- rootCauses: 3–6 items
- principles: 3–6 items
- useCases: 2–4 items with steps
- steps: 4–6 items
- qa: 4–7 items
- seo.meta_title <= 60 chars (approx)
- seo.meta_description 140–160 chars (approx)
`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS, status: 204 });
  }
  if (req.method !== "POST") return json({ error: "Method not allowed" }, { status: 405 });

  try {
    const body = await req.json();
    const title = String(body?.title || "").trim();
    const lang = (body?.language || "en") as Lang;
    const target_region = body?.target_region ? String(body.target_region) : undefined;
    const category = body?.category ? String(body.category) : undefined;
    const keywords = body?.keywords ? String(body.keywords) : undefined;

    if (!title) return json({ error: "title is required" }, { status: 400 });
    if (!["en", "ru", "zh"].includes(lang)) return json({ error: "invalid language" }, { status: 400 });

    // 使用 Google Gemini API（替代原 OpenAI）
    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_API_KEY");
    if (!GOOGLE_API_KEY) return json({ error: "Missing GOOGLE_API_KEY (set it in Edge Function Secrets)" }, { status: 500 });

    const userPrompt = buildUserPrompt({ title, lang, target_region, category, keywords });

    // 调用 Google Generative Language API（Gemini 1.5 Pro），要求返回纯 JSON 文本
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                // 把系统提示和用户指令合并进同一个输入里
                text: `${SYSTEM_PROMPT}\n\n${userPrompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.6,
        },
      }),
    );

    if (!resp.ok) {
      const txt = await resp.text();
      return json({ error: "Google Gemini request failed", detail: txt }, { status: 500 });
    }

    const data = await resp.json();
    const outputText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.output_text ||
      "";

    if (!outputText) return json({ error: "No output from model" }, { status: 500 });

    // 从可能被 markdown 包裹的文本中提取 JSON（Gemini 常用 ```json ... ``` 包裹）
    let jsonStr = outputText.trim();
    const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) jsonStr = codeBlockMatch[1].trim();
    const firstBrace = jsonStr.indexOf("{");
    if (firstBrace >= 0) {
      const lastBrace = jsonStr.lastIndexOf("}");
      if (lastBrace > firstBrace) jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
    }

    let parsed: {
      body?: string;
      content?: unknown;
      seo?: { meta_title?: string; meta_description?: string; meta_keywords?: string };
    };
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      return json({ error: "Model did not return valid JSON", raw: outputText }, { status: 500 });
    }

    if (!parsed?.content || !parsed?.seo) {
      return json({ error: "Invalid JSON shape", raw: parsed }, { status: 500 });
    }

    // body is optional for backward compat; if missing, leave empty so frontend can still use content
    const body = typeof parsed.body === "string" ? parsed.body.trim() : "";

    return json({
      body,
      content: parsed.content,
      seo: parsed.seo,
    });
  } catch (e) {
    return json({ error: String(e) }, { status: 500 });
  }
});
