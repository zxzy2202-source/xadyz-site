import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { supabase, Lead } from '@/admin/lib/supabaseClient';
import { getCurrentUser } from '@/admin/lib/auth';
import { getLeadTypeLabel, getProductLabel, PRODUCT_KEYS } from '@/app/lib/leadConfig';
import { Search, Eye, Mail, Phone, MapPin, Calendar, TrendingUp, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function LeadsListPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 删除确认状态（存储当前正在等待二次确认的 lead id）
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Filters
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterProduct, setFilterProduct] = useState<string>('all');

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    won: 0,
  });

  useEffect(() => {
    loadLeads();
  }, [filterType, filterLevel, filterStatus, filterCountry, filterProduct]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filterType !== 'all') {
        query = query.eq('lead_type', filterType);
      }
      if (filterLevel !== 'all') {
        query = query.eq('lead_level', filterLevel);
      }
      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }
      if (filterCountry !== 'all') {
        query = query.eq('country', filterCountry);
      }
      if (filterProduct !== 'all') {
        query = query.contains('products_interested', [filterProduct]);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);

      // Calculate stats
      const total = data?.length || 0;
      const newCount = data?.filter(l => l.status === 'new').length || 0;
      const contactedCount = data?.filter(l => l.status === 'contacted').length || 0;
      const wonCount = data?.filter(l => l.status === 'won').length || 0;
      setStats({ total, new: newCount, contacted: contactedCount, won: wonCount });

    } catch (error: any) {
      toast.error(error.message || '加载线索列表失败');
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;

      // Log activity（lead_activities 表：user_id 可为空）
      const user = await getCurrentUser();
      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        activity_type: 'status_change',
        content: `状态更新为 ${newStatus}`,
        new_value: newStatus,
        user_id: user?.id || null,
      });

      toast.success('状态已更新');
      loadLeads();
    } catch (error: any) {
      toast.error(error.message || '更新状态失败');
    }
  };

  const updateLeadLevel = async (leadId: string, newLevel: 'A' | 'B' | 'C') => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ lead_level: newLevel, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;

      toast.success(`线索已标记为 ${newLevel}`);
      loadLeads();
    } catch (error: any) {
      toast.error(error.message || '更新级别失败');
    }
  };

  const deleteLead = async (leadId: string) => {
    try {
      // 先删除关联的活动记录（避免外键约束报错）
      await supabase.from('lead_activities').delete().eq('lead_id', leadId);

      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;

      toast.success('线索已删除');
      setConfirmDeleteId(null);
      loadLeads();
    } catch (error: any) {
      toast.error(error.message || '删除失败');
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      lead.company_name?.toLowerCase().includes(term) ||
      lead.contact_name?.toLowerCase().includes(term) ||
      lead.email?.toLowerCase().includes(term)
    );
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-purple-100 text-purple-800',
      qualified: 'bg-green-100 text-green-800',
      proposal: 'bg-yellow-100 text-yellow-800',
      negotiation: 'bg-orange-100 text-orange-800',
      won: 'bg-emerald-100 text-emerald-800',
      lost: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      tender: 'bg-red-100 text-red-800',
      distributor: 'bg-blue-100 text-blue-800',
      oem: 'bg-purple-100 text-purple-800',
      inquiry: 'bg-gray-100 text-gray-800',
      contact: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getLevelColor = (level: string | null) => {
    const colors: Record<string, string> = {
      A: 'bg-green-100 text-green-800',
      B: 'bg-yellow-100 text-yellow-800',
      C: 'bg-orange-100 text-orange-800',
    };
    return level ? colors[level] || 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800';
  };

  const getTypeLabel = (type: string) => getLeadTypeLabel(type, 'zh');

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      new: '新线索',
      contacted: '已联系',
      qualified: '已确认',
      proposal: '报价中',
      negotiation: '谈判中',
      won: '已成交',
      lost: '已丢失',
    };
    return labels[status] || status;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">客户留言管理</h1>
        <p className="text-gray-600 mt-2">共 {filteredLeads.length} 条留言</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">全部留言</p>
              <p className="text-3xl font-bold mt-1">{stats.total}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Mail className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">新留言</p>
              <p className="text-3xl font-bold mt-1">{stats.new}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">已联系</p>
              <p className="text-3xl font-bold mt-1">{stats.contacted}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Phone className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">已成交</p>
              <p className="text-3xl font-bold mt-1">{stats.won}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索公司名、联系人、邮箱..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="all">全部类型</option>
            <option value="tender">招标</option>
            <option value="distributor">经销商</option>
            <option value="oem">OEM</option>
            <option value="inquiry">询价</option>
            <option value="contact">咨询</option>
          </select>

          {/* Level Filter */}
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="all">全部级别</option>
            <option value="A">⭐ A - 高优先级</option>
            <option value="B">⭐ B - 中优先级</option>
            <option value="C">⭐ C - 低优先级</option>
          </select>

          {/* Product Filter */}
          <select
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="all">全部产品</option>
            {PRODUCT_KEYS.map((key) => (
              <option key={key} value={key}>{getProductLabel(key, 'zh')}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="all">全部状态</option>
            <option value="new">新线索</option>
            <option value="contacted">已联系</option>
            <option value="qualified">已确认</option>
            <option value="proposal">报价中</option>
            <option value="negotiation">谈判中</option>
            <option value="won">已成交</option>
            <option value="lost">已丢失</option>
          </select>
        </div>
      </div>

      {/* Leads Cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">加载中...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">暂无留言</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
              <div className="p-6">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{lead.company_name}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(lead.lead_type)}`}>
                        {getTypeLabel(lead.lead_type)}
                      </span>
                      {lead.lead_level && (
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getLevelColor(lead.lead_level)}`}>
                          级别 {lead.lead_level}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      {lead.contact_name && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium">{lead.contact_name}</span>
                        </span>
                      )}
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-blue-600">
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </a>
                      )}
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-blue-600">
                          <Phone className="w-4 h-4" />
                          {lead.phone}
                        </a>
                      )}
                      {lead.country && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {lead.country}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-lg border-0 cursor-pointer ${getStatusColor(lead.status)}`}
                  >
                    <option value="new">新线索</option>
                    <option value="contacted">已联系</option>
                    <option value="qualified">已确认</option>
                    <option value="proposal">报价中</option>
                    <option value="negotiation">谈判中</option>
                    <option value="won">已成交</option>
                    <option value="lost">已丢失</option>
                  </select>
                </div>

                {/* Content */}
                {(lead.product_interest || (lead.products_interested?.length ?? 0) > 0 || lead.notes) && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    {(lead.product_interest || (lead.products_interested?.length ?? 0) > 0) && (
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">产品兴趣：</span>
                        {lead.product_interest ||
                          lead.products_interested?.map((k) => getProductLabel(k, 'zh')).join(', ') ||
                          '—'}
                      </p>
                    )}
                    {lead.notes && (
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">留言内容：</span>
                        {lead.notes}
                      </p>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(lead.created_at).toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {lead.source && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded">
                        来源: {lead.source}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {lead.lead_level ? (
                      <select
                        value={lead.lead_level || ''}
                        onChange={(e) => updateLeadLevel(lead.id, e.target.value as 'A' | 'B' | 'C')}
                        className={`px-2 py-1 text-xs font-semibold rounded-md border-0 cursor-pointer ${getLevelColor(lead.lead_level)}`}
                      >
                        <option value="A">⭐ A</option>
                        <option value="B">⭐ B</option>
                        <option value="C">⭐ C</option>
                      </select>
                    ) : (
                      <select
                        onChange={(e) => updateLeadLevel(lead.id, e.target.value as 'A' | 'B' | 'C')}
                        className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-md border-0 cursor-pointer"
                      >
                        <option value="">设置优先级</option>
                        <option value="A">⭐ A - 高</option>
                        <option value="B">⭐ B - 中</option>
                        <option value="C">⭐ C - 低</option>
                      </select>
                    )}
                    
                    {confirmDeleteId === lead.id ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-red-600 font-medium">确认删除？</span>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors"
                        >
                          确认
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(lead.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-gray-400 hover:text-red-600 hover:bg-red-50 text-sm rounded-lg transition-colors"
                        title="删除此线索"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <Link
                      to={`/admin/leads/${lead.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      查看详情
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}