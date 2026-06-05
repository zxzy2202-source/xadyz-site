import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import {
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  isValidUuid,
  type BlogPost,
  checkBlogSlugExists,
} from '@/lib/supabase/queries/blog';
import { BLOG_CATEGORIES } from '@/lib/blog/categories';
import { getThisMonday } from '@/admin/lib/dateUtils';
import { migrateContent } from '@/lib/supabase/queries/blogContentSchema';
import type { PostContent } from '@/lib/supabase/queries/blogContentSchema';
import { PostForm } from '@/admin/app/components/blog/PostForm';
import { aiGenerateBlog } from '@/lib/ai/blogGenerate';
import { computeContentScore } from '@/lib/blog/contentScore';
import { ArrowLeft, Save, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { AssetUrlPickerModal } from '@/admin/app/components/assets';

const LANG_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Русский' },
  { value: 'zh', label: '中文' },
];

export function BlogEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [humanVerified, setHumanVerified] = useState(false);
  const [form, setForm] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    language: 'en',
    excerpt: '',
    body: '',
    content: null,
    category: '',
    cover_image_url: '',
    read_time: '',
    published_at: '',
    is_draft: true,
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    og_image_url: '',
    canonical_url: '',
    target_region: '',
    hreflang_alternates: null,
    content_type: 'blog',
    journal_type: null,
    week_of: null,
    problem: null,
    root_cause: null,
    solution: null,
    result: null,
    client_region: null,
    product_category: null,
  });
  const [content, setContent] = useState<PostContent>(migrateContent(null));
  const [hreflangJson, setHreflangJson] = useState('');
  const [assetPickerField, setAssetPickerField] = useState<'cover' | 'og' | 'canonical' | null>(null);

  useEffect(() => {
    if (isNew) return;
    if (!id || !isValidUuid(id)) {
      setLoading(false);
      toast.error('无效的文章 ID');
      navigate('/admin/blog');
      return;
    }
    (async () => {
      const { data, error } = await getBlogPost(id);
      if (error) {
        toast.error('加载失败: ' + error);
        navigate('/admin/blog');
        return;
      }
      const d = data!;
      setForm({
        ...d,
        published_at: d.published_at ? new Date(d.published_at).toISOString().slice(0, 16) : '',
        week_of: d.week_of ? (d.week_of as string).slice(0, 10) : null,
      });
      setHumanVerified(!!d.human_verified);
      setContent(migrateContent(d.content ?? d.body ?? null));
      setHreflangJson(
        d.hreflang_alternates && typeof d.hreflang_alternates === 'object'
          ? JSON.stringify(d.hreflang_alternates, null, 2)
          : ''
      );
      setLoading(false);
    })();
  }, [id, isNew, navigate]);

  const set = (key: keyof BlogPost, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value ?? '' }));
  };

  /**
   * 在保存/发布前检查 slug + language 是否唯一，避免触发后端唯一索引报错
   */
  const ensureSlugUnique = async (action: 'save' | 'publish' | 'draft'): Promise<boolean> => {
    const slug = form.slug?.trim();
    const language = (form.language || 'en') as 'en' | 'ru' | 'zh';
    if (!slug) {
      toast.error('请填写 slug');
      return false;
    }

    // 新建时不排除任何 ID；编辑时需要排除当前这条
    const excludeId = !isNew && id && isValidUuid(id) ? id : undefined;
    const { exists, error } = await checkBlogSlugExists(slug, language, excludeId);

    if (error) {
      toast.error('检查 slug 唯一性失败：' + error);
      return false;
    }
    if (exists) {
      const actionLabel = action === 'publish' ? '发布' : action === 'draft' ? '保存草稿' : '保存';
      toast.error(`当前语言下已存在相同 slug，请修改 slug 或语言后再${actionLabel}。`);
      return false;
    }
    return true;
  };

  async function handleAIGenerateAll() {
    if (!form.title?.trim()) {
      toast.error('请先填写标题再生成');
      return;
    }
    setAiLoading(true);
    try {
      const result = await aiGenerateBlog({
        title: form.title,
        language: (form.language || 'en') as 'en' | 'ru' | 'zh',
        target_region: form.target_region || 'Global',
        category: form.category || 'Industry Insights',
        keywords: form.seo_keywords || '',
      });

      const aiContent = migrateContent(result.content);
      setContent(aiContent);

      // 正文：优先用 AI 返回的 body；若无则从结构化 content 拼一段 Markdown 作为兜底
      let bodyText = (result.body && result.body.trim()) || '';
      if (!bodyText && aiContent) {
        const parts: string[] = [];
        if (aiContent.hero?.headline) parts.push(`## ${aiContent.hero.headline}\n`);
        if (aiContent.hero?.subheadline) parts.push(aiContent.hero.subheadline);
        if (aiContent.problem?.whyItMatters) parts.push(`\n## Why It Matters\n\n${aiContent.problem.whyItMatters}`);
        if (aiContent.solution?.overview) parts.push(`\n## Solution\n\n${aiContent.solution.overview}`);
        if (parts.length) bodyText = parts.join('\n\n');
      }

      setForm((prev) => ({
        ...prev,
        body: bodyText || prev.body,
        excerpt: prev.excerpt || result.seo.meta_description || prev.excerpt,
        seo_title: prev.seo_title || result.seo.meta_title,
        seo_description: prev.seo_description || result.seo.meta_description,
        seo_keywords: prev.seo_keywords || result.seo.meta_keywords,
        ai_generated: true,
      }));

      toast.success('AI 已生成正文与结构化内容 ✅ 请人工补充真实数据与证据');
    } catch (e: unknown) {
      toast.error((e as Error)?.message || 'AI 生成失败');
    } finally {
      setAiLoading(false);
    }
  }

  function buildRow() {
    let hreflang: Record<string, string> | null = null;
    if (hreflangJson.trim()) {
      try {
        hreflang = JSON.parse(hreflangJson);
      } catch {
        return null;
      }
    }
    const score = computeContentScore({ content, internalLinksCount: 0 });
    return {
      title: form.title,
      slug: form.slug,
      language: form.language || 'en',
      excerpt: form.excerpt || null,
      body: form.body || null,
      content: content as unknown as Record<string, unknown>,
      category: form.category || null,
      cover_image_url: form.cover_image_url || null,
      read_time: form.read_time || null,
      published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
      is_draft: form.is_draft ?? true,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      seo_keywords: form.seo_keywords || null,
      og_image_url: form.og_image_url || null,
      canonical_url: form.canonical_url || null,
      target_region: form.target_region || null,
      hreflang_alternates: hreflang,
      ai_generated: !!form.ai_generated,
      human_verified: humanVerified,
      content_score: score,
      content_type: form.content_type || 'blog',
      journal_type: form.content_type === 'factory_journal' ? (form.journal_type || null) : null,
      week_of: form.content_type === 'factory_journal' && form.week_of ? form.week_of : null,
      problem: form.problem || null,
      root_cause: form.root_cause || null,
      solution: form.solution || null,
      result: form.result || null,
      client_region: form.client_region || null,
      product_category: form.product_category || null,
    };
  }

  const handleSave = async () => {
    if (!form.title?.trim()) {
      toast.error('请填写标题');
      return;
    }
    // 预检查：slug + language 是否唯一
    const ok = await ensureSlugUnique('save');
    if (!ok) return;
    if (!form.slug?.trim()) {
      toast.error('请填写 slug');
      return;
    }
    if (form.content_type === 'factory_journal' && !form.week_of) {
      toast.error('Factory Journal 必须填写 Week Of（本周一）');
      return;
    }
    if (form.content_type === 'factory_journal' && form.journal_type === 'client_solution') {
      if (!form.problem?.trim() || !form.solution?.trim()) {
        toast.error('Client Solution 必须填写 Problem 和 Solution');
        return;
      }
    }
    const row = buildRow();
    if (!row) {
      toast.error('Hreflang JSON 格式无效');
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        const result = await createBlogPost(row);
        if (result.error) throw new Error(result.error);
        if (result.data) {
          toast.success('已创建');
          navigate(`/admin/blog/${result.data.id}`);
        }
      } else {
        if (!id || !isValidUuid(id)) {
          toast.error('无效的文章 ID');
          setSaving(false);
          return;
        }
        const result = await updateBlogPost(id, row);
        if (result.error) throw new Error(result.error);
        toast.success('已保存');
      }
    } catch (e: unknown) {
      toast.error((e as Error).message || '保存失败');
    } finally {
      setSaving(false);
    }
  };

  async function handleSaveDraft() {
    if (isNew || !id || !isValidUuid(id)) return;
    if (!form.title?.trim()) {
      toast.error('请填写标题');
      return;
    }
    const ok = await ensureSlugUnique('draft');
    if (!ok) return;
    if (!form.slug?.trim()) {
      toast.error('请填写 slug');
      return;
    }
    const row = buildRow();
    if (!row) {
      toast.error('Hreflang JSON 格式无效');
      return;
    }
    setSaving(true);
    try {
      const result = await updateBlogPost(id, { ...row, is_draft: true });
      if (result.error) throw new Error(result.error);
      toast.success('已保存草稿');
    } catch (e: unknown) {
      toast.error((e as Error).message || '保存失败');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (isNew || !id || !isValidUuid(id)) return;
    const isFactoryJournal = form.content_type === 'factory_journal';
    if (!isFactoryJournal) {
      if (!humanVerified) {
        toast.error('发布前请勾选：已补充真实规格/证据/内链（人工确认）');
        return;
      }
      const score = computeContentScore({ content, internalLinksCount: 0 });
      if (score < 60) {
        toast.error(`内容评分 ${score}，建议先完善再发布（≥60 更安全）`);
        return;
      }
    }
    if (!form.title?.trim()) {
      toast.error('请填写标题');
      return;
    }
    const ok = await ensureSlugUnique('publish');
    if (!ok) return;
    if (!form.slug?.trim()) {
      toast.error('请填写 slug');
      return;
    }
    const row = buildRow();
    if (!row) {
      toast.error('Hreflang JSON 格式无效');
      return;
    }
    setSaving(true);
    try {
      const result = await updateBlogPost(id, {
        ...row,
        is_draft: false,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : new Date().toISOString(),
        human_verified: true,
      });
      if (result.error) throw new Error(result.error);
      toast.success('已发布 ✅');
    } catch (e: unknown) {
      toast.error((e as Error).message || '发布失败');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  const contentScore = computeContentScore({ content, internalLinksCount: 0 });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/admin/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" />
          返回列表
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {(form.content_type ?? 'blog') === 'factory_journal'
            ? (isNew ? '新建工厂日志' : '编辑工厂日志')
            : (isNew ? '新建文章' : '编辑文章')}
        </h1>
      </div>

      {/* AI 助手面板（仅 Blog 模式） */}
      {(form.content_type ?? 'blog') === 'blog' && (
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-gray-900">✨ AI 助手</div>
            <div className="text-sm text-gray-600">
              一键生成结构化行业科普内容（不会编造证书/产能/客户）
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={aiLoading}
            onClick={handleAIGenerateAll}
          >
            {aiLoading ? '生成中…' : 'AI 生成整篇'}
          </button>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={humanVerified}
              onChange={(e) => setHumanVerified(e.target.checked)}
            />
            <span className="text-sm text-gray-700">我已补充真实数据/证据素材/内链（人工确认）</span>
          </label>
          {!isNew && (
            <span className="text-sm text-gray-500">内容评分: {contentScore}/100</span>
          )}
        </div>
      </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Basics */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basics</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
                <input
                  type="text"
                  value={form.title ?? ''}
                  onChange={(e) => set('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="文章标题"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">内容类型</label>
                <select
                  value={form.content_type ?? 'blog'}
                  onChange={(e) => {
                    const v = e.target.value as 'blog' | 'factory_journal';
                    set('content_type', v);
                    if (v === 'factory_journal') {
                      if (!form.week_of) {
                        const weekStr = getThisMonday();
                        set('week_of', weekStr);
                        if (!form.slug?.trim()) {
                          set('slug', `week-${weekStr}-production`);
                        }
                      }
                      if (!form.journal_type) set('journal_type', 'weekly_update');
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="blog">Blog（传统文章）</option>
                  <option value="factory_journal">Factory Journal（工厂日志）</option>
                </select>
              </div>
              {(form.content_type ?? 'blog') === 'factory_journal' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Journal Type</label>
                    <select
                      value={form.journal_type ?? 'weekly_update'}
                      onChange={(e) => set('journal_type', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="weekly_update">Weekly Update（每周生产）</option>
                      <option value="client_solution">Client Solution（客户问题解决）</option>
                      <option value="behind_scenes">Behind the Scenes（车间花絮）</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Week Of（本周一）*</label>
                    <input
                      type="date"
                      value={form.week_of ?? ''}
                      onChange={(e) => set('week_of', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => set('week_of', getThisMonday())}
                      className="mt-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      自动填本周一
                    </button>
                  </div>
                  {(form.journal_type ?? 'weekly_update') === 'client_solution' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Problem *</label>
                        <textarea
                          value={form.problem ?? ''}
                          onChange={(e) => set('problem', e.target.value)}
                          rows={2}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="客户遇到的问题"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Root Cause</label>
                        <textarea
                          value={form.root_cause ?? ''}
                          onChange={(e) => set('root_cause', e.target.value)}
                          rows={2}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="技术原因"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Solution *</label>
                        <textarea
                          value={form.solution ?? ''}
                          onChange={(e) => set('solution', e.target.value)}
                          rows={2}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="我们的解决方案"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
                        <textarea
                          value={form.result ?? ''}
                          onChange={(e) => set('result', e.target.value)}
                          rows={2}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="可量化结果"
                        />
                      </div>
                    </>
                  )}
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900">
                      Quick Filters（可选）
                    </summary>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Region</label>
                        <input
                          type="text"
                          value={form.client_region ?? ''}
                          onChange={(e) => set('client_region', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="CIS, EU, ME, SEA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
                        <input
                          type="text"
                          value={form.product_category ?? ''}
                          onChange={(e) => set('product_category', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="POS Rolls, 4x6 Labels, Jumbo"
                        />
                      </div>
                    </div>
                  </details>
                </>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                  <input
                    type="text"
                    value={form.slug ?? ''}
                    onChange={(e) => set('slug', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="url-slug"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">语言</label>
                  <select
                    value={form.language ?? 'en'}
                    onChange={(e) => set('language', e.target.value as 'en' | 'ru' | 'zh')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {LANG_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
                <textarea
                  value={form.excerpt ?? ''}
                  onChange={(e) => set('excerpt', e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="简短摘要"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                  <select
                    value={form.category ?? ''}
                    onChange={(e) => set('category', e.target.value || null)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">请选择（与前台展示一致）</option>
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">阅读时间</label>
                  <input
                    type="text"
                    value={form.read_time ?? ''}
                    onChange={(e) => set('read_time', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="8 min read"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">封面图 URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={form.cover_image_url ?? ''}
                    onChange={(e) => set('cover_image_url', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="https://..."
                  />
                  <button
                    type="button"
                    onClick={() => setAssetPickerField('cover')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 text-sm"
                  >
                    <ImagePlus className="w-4 h-4" />
                    从素材库选择
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.is_draft ?? true}
                    onChange={(e) => set('is_draft', e.target.checked)}
                  />
                  <span className="text-sm text-gray-700">草稿（不对外展示）</span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">发布时间</label>
                  <input
                    type="datetime-local"
                    value={form.published_at ?? ''}
                    onChange={(e) => set('published_at', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </section>

              {/* Content: Simple (Factory Journal) or Advanced (Blog) */}
          {(form.content_type ?? 'blog') === 'factory_journal' ? (
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">正文 (Markdown)</h2>
              <p className="text-sm text-gray-500 mb-4">
                80–120 字简短描述即可；客户问题案例可多用 Problem/Solution 字段，此处补充细节。
              </p>
              <textarea
                value={form.body ?? ''}
                onChange={(e) => set('body', e.target.value)}
                rows={8}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                placeholder="## 本周生产亮点&#10;1. 80×80 热敏纸卷发往 UAE&#10;2. ..."
              />
            </section>
          ) : (
            <>
              <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">正文</h2>
                <p className="text-sm text-gray-500 mb-4">
                  文章主内容，支持纯文本或 Markdown。前台详情页会在此处显示。
                </p>
                <textarea
                  value={form.body ?? ''}
                  onChange={(e) => set('body', e.target.value)}
                  rows={12}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                  placeholder="在此输入文章正文，支持多段文字、换行。"
                />
              </section>
              <PostForm content={content} onChange={setContent} />
            </>
          )}
        </div>

        {/* SEO & GEO */}
        <div className="space-y-6">
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <input
                  type="text"
                  value={form.seo_title ?? ''}
                  onChange={(e) => set('seo_title', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="留空则用标题"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  value={form.seo_description ?? ''}
                  onChange={(e) => set('seo_description', e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                <input
                  type="text"
                  value={form.seo_keywords ?? ''}
                  onChange={(e) => set('seo_keywords', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="逗号分隔"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OG 图片 URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={form.og_image_url ?? ''}
                    onChange={(e) => set('og_image_url', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="https://..."
                  />
                  <button
                    type="button"
                    onClick={() => setAssetPickerField('og')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 text-sm"
                  >
                    <ImagePlus className="w-4 h-4" />
                    从素材库选择
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={form.canonical_url ?? ''}
                    onChange={(e) => set('canonical_url', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="https://..."
                  />
                  <button
                    type="button"
                    onClick={() => setAssetPickerField('canonical')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 text-sm"
                  >
                    <ImagePlus className="w-4 h-4" />
                    从素材库选择
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">GEO</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">目标地区</label>
                <input
                  type="text"
                  value={form.target_region ?? ''}
                  onChange={(e) => set('target_region', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="CIS, EU, Global"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hreflang 多语言链接 (JSON)</label>
                <textarea
                  value={hreflangJson}
                  onChange={(e) => setHreflangJson(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                  placeholder='{"en":"/en/...", "ru":"/ru/..."}'
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        {isNew ? (
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? '保存中…' : '保存'}
          </button>
        ) : (
          <>
            <button
              onClick={handleSaveDraft}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? '保存中…' : '保存草稿'}
            </button>
            <button
              onClick={handlePublish}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              发布
            </button>
          </>
        )}
      </div>

      {/* 素材 URL 选择弹窗 */}
      <AssetUrlPickerModal
        isOpen={assetPickerField !== null}
        onClose={() => setAssetPickerField(null)}
        title={
          assetPickerField === 'cover'
            ? '选择封面图'
            : assetPickerField === 'og'
              ? '选择 OG 图片'
              : '选择 Canonical URL 素材'
        }
        subtitle="从已批准的素材库中选择"
        onSelect={(url) => {
          if (assetPickerField === 'cover') set('cover_image_url', url);
          else if (assetPickerField === 'og') set('og_image_url', url);
          else if (assetPickerField === 'canonical') set('canonical_url', url);
          setAssetPickerField(null);
        }}
      />
    </div>
  );
}
