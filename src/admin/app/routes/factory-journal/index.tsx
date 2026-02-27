import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { listBlogPosts, type BlogPost } from '@/lib/supabase/queries/blog';
import { validateAndClearInvalidSession } from '@/admin/lib/auth';
import { FileText, Globe, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const LANG_LABEL: Record<string, string> = { en: 'English', ru: 'Русский', zh: '中文' };

type JournalType = 'weekly_update' | 'client_solution' | 'behind_scenes';

const JOURNAL_TYPE_LABEL: Record<JournalType, string> = {
  weekly_update: 'Weekly Update（每周生产）',
  client_solution: 'Client Solution（客户问题）',
  behind_scenes: 'Behind the Scenes（花絮）',
};

export function FactoryJournalAdminPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLang, setFilterLang] = useState<string>('');
  const [filterDraft, setFilterDraft] = useState<string>('');
  const [filterJournalType, setFilterJournalType] = useState<string>('');

  const load = async () => {
    setLoading(true);
    await validateAndClearInvalidSession();
    const result = await listBlogPosts({
      pageSize: 500,
      language: filterLang || undefined,
      is_draft: filterDraft === 'draft' ? true : filterDraft === 'published' ? false : undefined,
      content_type: 'factory_journal',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterLang, filterDraft]);

  const filtered = posts.filter((p) =>
    filterJournalType ? p.journal_type === filterJournalType : true
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">工厂日志管理</h1>
          <p className="text-gray-600 mt-1 text-sm">
            专门管理 <code className="bg-gray-100 px-1 rounded text-xs">Factory Journal</code>{' '}
            记录，前台在 <code className="bg-gray-100 px-1 rounded text-xs">/manufacturing/factory-journal</code>{' '}
            展示。
          </p>
          <p className="text-xs text-gray-500 mt-1">
            创建 / 配对功能仍在「博客管理」中，建议从此处点进单条进行编辑、补充真实生产数据。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/blog')}
            className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
          >
            去博客管理
          </button>
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
          value={filterJournalType}
          onChange={(e) => setFilterJournalType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">全部日志类型</option>
          <option value="weekly_update">Weekly Update（每周生产）</option>
          <option value="client_solution">Client Solution（客户问题）</option>
          <option value="behind_scenes">Behind the Scenes（花絮）</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">加载中…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            {posts.length === 0 ? '暂无工厂日志记录，请先在「博客管理」中创建 Factory Journal 条目' : '没有符合筛选条件的工厂日志'}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题 / 前台 URL</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">日志类型</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">语言</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Week Of</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">更新时间</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((p) => {
                const url =
                  p.slug && p.language
                    ? `/${p.language}/manufacturing/factory-journal/${p.slug}`
                    : null;
                const weekOf = p.week_of
                  ? new Date(p.week_of).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                  : '—';
                const jt = (p.journal_type ?? 'weekly_update') as JournalType;
                return (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="font-medium text-gray-900 text-sm">
                          {p.title || '(无标题)'}
                        </span>
                      </div>
                      {url && (
                        <p className="text-[11px] text-gray-500 mt-0.5">{url}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {JOURNAL_TYPE_LABEL[jt] ?? jt}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-sm">
                        <Globe className="w-4 h-4" />
                        {LANG_LABEL[p.language] ?? p.language}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{weekOf}</td>
                    <td className="px-4 py-3">
                      {p.is_draft ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                          草稿
                        </span>
                      ) : p.published_at ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          已发布
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                          未发布
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {p.updated_at ? new Date(p.updated_at).toLocaleString('zh-CN') : '—'}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {p.id && (
                        <Link
                          to={`/admin/blog/${p.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                          编辑
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

