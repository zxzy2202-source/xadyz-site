import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { listBlogPosts, createBlogPost, type BlogPost } from '@/lib/supabase/queries/blog';
import { validateAndClearInvalidSession } from '@/admin/lib/auth';
import { getThisMonday } from '@/admin/lib/dateUtils';
import { Plus, Pencil, FileText, Globe, Calendar, Copy } from 'lucide-react';
import { toast } from 'sonner';

const LANG_LABEL: Record<string, string> = { en: 'English', ru: 'Русский', zh: '中文' };

export function BlogAdminPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingPair, setCreatingPair] = useState(false);
  const [filterLang, setFilterLang] = useState<string>('');
  const [filterDraft, setFilterDraft] = useState<string>('');
  const [filterContentType, setFilterContentType] = useState<string>('');

  const load = async () => {
    setLoading(true);
    await validateAndClearInvalidSession();
    const result = await listBlogPosts({
      pageSize: 500,
      language: filterLang || undefined,
      is_draft: filterDraft === 'draft' ? true : filterDraft === 'published' ? false : undefined,
      content_type: filterContentType || undefined,
    });
    if (result.error) {
      toast.error('加载失败: ' + result.error);
      setPosts([]);
    } else {
      setPosts(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [filterLang, filterDraft, filterContentType]);

  const filtered = posts;

  async function handleCreateThisWeeksPair() {
    setCreatingPair(true);
    const weekOf = getThisMonday();
    const baseSlug = `week-${weekOf}`;
    try {
      const row1 = {
        title: `Week ${weekOf} – Weekly Production Update`,
        slug: `${baseSlug}-production`,
        language: 'en' as const,
        content_type: 'factory_journal',
        journal_type: 'weekly_update',
        week_of: weekOf,
        excerpt: '',
        body: '',
        is_draft: true,
      };
      const row2 = {
        title: `Week ${weekOf} – Client Problem & Solution`,
        slug: `${baseSlug}-solution`,
        language: 'en' as const,
        content_type: 'factory_journal',
        journal_type: 'client_solution',
        week_of: weekOf,
        excerpt: '',
        body: '',
        problem: '',
        solution: '',
        is_draft: true,
      };
      const r1 = await createBlogPost(row1);
      if (r1.error) throw new Error(r1.error);
      const r2 = await createBlogPost(row2);
      if (r2.error) throw new Error(r2.error);
      toast.success('已创建本周一对草稿：生产更新 + 客户案例');
      await load();
      if (r1.data) navigate(`/admin/blog/${r1.data.id}`);
    } catch (e: unknown) {
      const msg = (e as Error)?.message || '创建失败';
      const isConflict = /duplicate|unique|violates/.test(String(msg).toLowerCase());
      toast.error(isConflict ? '本周草稿已存在，请直接编辑列表中对应条目' : msg);
    } finally {
      setCreatingPair(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">博客管理</h1>
          <p className="text-gray-600 mt-1">
            在此管理博客文章，支持 SEO / GEO 优化。前台在 <code className="bg-gray-100 px-1 rounded">/resources/blog-insights</code> 展示已发布文章。
          </p>
          <p className="text-sm text-amber-700 mt-1">
            本列表仅显示在 Supabase 中创建的文章；原 Strapi 或静态博客内容不在此处，需在此新建或迁移后才会出现。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCreateThisWeeksPair}
            disabled={creatingPair}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <Copy className="w-4 h-4" />
            {creatingPair ? '创建中…' : "Create This Week's Pair"}
          </button>
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            新建文章
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <select
          value={filterLang}
          onChange={(e) => setFilterLang(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">全部语言</option>
          <option value="en">English</option>
          <option value="ru">Русский</option>
          <option value="zh">中文</option>
        </select>
        <select
          value={filterDraft}
          onChange={(e) => setFilterDraft(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">全部状态</option>
          <option value="draft">仅草稿</option>
          <option value="published">已发布</option>
        </select>
        <select
          value={filterContentType}
          onChange={(e) => setFilterContentType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">全部（Blog + 工厂日志）</option>
          <option value="blog">仅 Blog（文章）</option>
          <option value="factory_journal">仅 Factory Journal（工厂日志）</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">加载中…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {posts.length === 0 ? '暂无文章，点击「新建文章」创建' : '没有符合筛选条件的文章'}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">语言</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">更新时间</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-medium text-gray-900">{p.title || '(无标题)'}</span>
                    </div>
                    {p.slug && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {p.content_type === 'factory_journal'
                          ? `/${p.language}/manufacturing/factory-journal/${p.slug}`
                          : `/${p.language}/resources/blog-insights/${p.slug}`}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">
                      {p.content_type === 'factory_journal' ? (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">Factory Journal</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">Blog</span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-sm">
                      <Globe className="w-4 h-4" />
                      {LANG_LABEL[p.language] ?? p.language}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {p.is_draft ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">草稿</span>
                    ) : p.published_at ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">已发布</span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">未发布</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {p.updated_at ? new Date(p.updated_at).toLocaleString('zh-CN') : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {p.id && (
                      <Link
                        to={`/admin/blog/${p.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        编辑
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
