/**
 * 客户留言查看工具
 * 用于快速查看Supabase数据库中的客户留言
 */

import React, { useEffect, useState } from 'react';
import { supabase } from '/src/admin/lib/supabaseClient';

interface Lead {
  id: string;
  created_at: string;
  lead_type: 'contact' | 'tender';
  name: string;
  email: string;
  company?: string;
  country?: string;
  phone?: string;
  message?: string;
  product_interest?: string;
  status: 'new' | 'contacted' | 'qualified' | 'won' | 'lost';
  lead_level?: 'A' | 'B' | 'C';
  language?: 'en' | 'ru' | 'zh';
}

export function LeadsChecker() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    byType: { contact: 0, tender: 0 },
    byLanguage: { en: 0, ru: 0, zh: 0 }
  });

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const leadsData = data as Lead[] || [];
      setLeads(leadsData);

      // 计算统计数据
      const newStats = {
        total: leadsData.length,
        new: leadsData.filter(l => l.status === 'new').length,
        contacted: leadsData.filter(l => l.status === 'contacted').length,
        qualified: leadsData.filter(l => l.status === 'qualified').length,
        byType: {
          contact: leadsData.filter(l => l.lead_type === 'contact').length,
          tender: leadsData.filter(l => l.lead_type === 'tender').length
        },
        byLanguage: {
          en: leadsData.filter(l => l.language === 'en').length,
          ru: leadsData.filter(l => l.language === 'ru').length,
          zh: leadsData.filter(l => l.language === 'zh').length
        }
      };

      setStats(newStats);
    } catch (err: any) {
      setError(err.message || '加载失败');
      console.error('Error loading leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      new: { bg: 'bg-blue-100', text: 'text-blue-800', label: '新线索' },
      contacted: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '已联系' },
      qualified: { bg: 'bg-green-100', text: 'text-green-800', label: '已确认' },
      won: { bg: 'bg-purple-100', text: 'text-purple-800', label: '已成交' },
      lost: { bg: 'bg-gray-100', text: 'text-gray-800', label: '已失效' }
    };
    const badge = badges[status] || badges.new;
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    return type === 'contact' ? (
      <span className="px-2 py-1 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
        咨询
      </span>
    ) : (
      <span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
        招标
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载客户留言中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
          <h2 className="text-xl font-bold text-red-800 mb-2">加载失败</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadLeads}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📨 客户留言管理
          </h1>
          <p className="text-gray-600">
            志信纸业 B2B 独立站 - xadyz.com
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">总留言数</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">新线索</div>
            <div className="text-3xl font-bold text-blue-600">{stats.new}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">已联系</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.contacted}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">已确认</div>
            <div className="text-3xl font-bold text-green-600">{stats.qualified}</div>
          </div>
        </div>

        {/* 类型和语言统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">按类型分布</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">咨询表单</span>
                <span className="font-semibold">{stats.byType.contact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">招标需求</span>
                <span className="font-semibold">{stats.byType.tender}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">按语言分布</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">🇬🇧 英语</span>
                <span className="font-semibold">{stats.byLanguage.en}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">🇷🇺 俄语</span>
                <span className="font-semibold">{stats.byLanguage.ru}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">🇨🇳 中文</span>
                <span className="font-semibold">{stats.byLanguage.zh}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 留言列表 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              所有留言 ({leads.length})
            </h2>
          </div>

          {leads.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">暂无客户留言</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {leads.map((lead) => (
                <div key={lead.id} className="px-6 py-5 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {lead.name}
                        </h3>
                        {getTypeBadge(lead.lead_type)}
                        {getStatusBadge(lead.status)}
                        {lead.lead_level && (
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            lead.lead_level === 'A' ? 'bg-red-100 text-red-800' :
                            lead.lead_level === 'B' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {lead.lead_level}级
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>📧 {lead.email}</div>
                        {lead.company && <div>🏢 {lead.company}</div>}
                        {lead.country && <div>🌍 {lead.country}</div>}
                        {lead.phone && <div>📱 {lead.phone}</div>}
                        {lead.product_interest && (
                          <div>📦 产品兴趣: {lead.product_interest}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>{formatDate(lead.created_at)}</div>
                      {lead.language && (
                        <div className="mt-1">
                          {lead.language === 'en' ? '🇬🇧' : lead.language === 'ru' ? '🇷🇺' : '🇨🇳'}
                          {' '}{lead.language.toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  {lead.message && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 mb-1">留言内容:</div>
                      <div className="text-sm text-gray-900 whitespace-pre-wrap">
                        {lead.message}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 操作提示 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 管理提示</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 访问 <a href="/admin" className="underline font-medium">/admin</a> 进入完整的后台管理系统</li>
            <li>• 后台可以查看详细信息、添加备注、跟踪客户状态</li>
            <li>• 建议及时回复新线索，提高转化率</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LeadsChecker;