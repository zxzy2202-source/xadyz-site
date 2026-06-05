import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { supabase, Lead, LeadActivity, LeadFile } from '@/admin/lib/supabaseClient';
import { getCurrentUser } from '@/admin/lib/auth';
import { getLeadTypeLabel, getProductLabel } from '@/app/lib/leadConfig';
import { ArrowLeft, Calendar, FileText, Upload, Download } from 'lucide-react';
import { toast } from 'sonner';

export function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [files, setFiles] = useState<LeadFile[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [noteContent, setNoteContent] = useState('');
  const [nextFollowUp, setNextFollowUp] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      loadLeadData();
    }
  }, [id]);

  const loadLeadData = async () => {
    try {
      setLoading(true);

      // Load lead
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .single();

      if (leadError) throw leadError;
      setLead(leadData);

      // Load activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('lead_activities')
        .select('*')
        .eq('lead_id', id)
        .order('created_at', { ascending: false });

      if (activitiesError) throw activitiesError;
      setActivities(activitiesData || []);

      // Load files
      const { data: filesData, error: filesError } = await supabase
        .from('lead_files')
        .select('*')
        .eq('lead_id', id)
        .order('created_at', { ascending: false });

      if (filesError) throw filesError;
      setFiles(filesData || []);

    } catch (error: any) {
      toast.error(error.message || '加载线索失败');
      navigate('/admin/leads');
    } finally {
      setLoading(false);
    }
  };

  const addNote = async () => {
    if (!noteContent.trim()) {
      toast.error('请输入备注内容');
      return;
    }

    try {
      const user = await getCurrentUser();
      
      const { error } = await supabase
        .from('lead_activities')
        .insert({
          lead_id: id,
          activity_type: 'note',
          content: noteContent,
          user_id: user?.id || null,
        });

      if (error) throw error;

      // Update next follow-up if provided
      if (nextFollowUp) {
        await supabase
          .from('leads')
          .update({ 
            next_follow_up: nextFollowUp,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);
      }

      toast.success('备注已添加');
      setNoteContent('');
      setNextFollowUp('');
      loadLeadData();
    } catch (error: any) {
      toast.error(error.message || '添加备注失败');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const user = await getCurrentUser();
      
      // Upload to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('assets-docs')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('assets-docs')
        .getPublicUrl(fileName);

      // Save to lead_files（uploaded_by 为 auth.users.id）
      const { error: dbError } = await supabase
        .from('lead_files')
        .insert({
          lead_id: id,
          file_name: file.name,
          file_url: publicUrl,
          file_size: file.size,
          uploaded_by: user?.id || null,
        });

      if (dbError) throw dbError;

      // Log activity
      await supabase.from('lead_activities').insert({
        lead_id: id,
        activity_type: 'note',
        content: `已上传文件: ${file.name}`,
        user_id: user?.id || null,
      });

      toast.success('文件上传成功');
      loadLeadData();
    } catch (error: any) {
      toast.error(error.message || '上传文件失败');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
        <p className="text-sm text-gray-500">加载中...</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-600">未找到该线索</p>
        <button onClick={() => navigate('/admin/leads')} className="text-blue-600 hover:underline">返回列表</button>
      </div>
    );
  }

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

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/leads')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          返回线索列表
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{lead.company_name}</h1>
            <p className="text-gray-600 mt-1">{lead.contact_name} • {lead.email}</p>
          </div>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead Info */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">线索信息</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">类型</dt>
                <dd className="mt-1 text-sm text-gray-900">{getLeadTypeLabel(lead.lead_type, 'zh')}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">级别</dt>
                <dd className="mt-1 text-sm text-gray-900">{lead.lead_level || '未设置'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">国家</dt>
                <dd className="mt-1 text-sm text-gray-900">{lead.country}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">电话</dt>
                <dd className="mt-1 text-sm text-gray-900">{lead.phone || '-'}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-gray-500">产品兴趣</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {lead.product_interest ||
                    (lead.products_interested?.length
                      ? lead.products_interested.map((k) => getProductLabel(k, 'zh')).join('、')
                      : null) ||
                    '未指定'}
                </dd>
              </div>
              {lead.estimated_value && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">预估金额</dt>
                  <dd className="mt-1 text-sm text-gray-900">${lead.estimated_value.toLocaleString()}</dd>
                </div>
              )}
              {lead.notes && (
                <div className="md:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">备注</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lead.notes}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">跟进记录</h2>
            <div className="space-y-4">
              {activities.length === 0 ? (
                <p className="text-gray-600 text-sm">暂无跟进记录</p>
              ) : (
                activities.map((activity) => (
                  <div key={activity.id} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.user_id ? '管理员' : '系统'} • {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add Note */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">添加跟进记录</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  备注内容
                </label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入跟进备注..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  下次跟进日期
                </label>
                <input
                  type="date"
                  value={nextFollowUp}
                  onChange={(e) => setNextFollowUp(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={addNote}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                添加备注
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Files */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">附件</h2>
            
            <label className="block">
              <input
                type="file"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {uploading ? '上传中...' : '点击上传文件'}
                </p>
              </div>
            </label>

            <div className="mt-4 space-y-2">
              {files.length === 0 ? (
                <p className="text-sm text-gray-600">暂无附件</p>
              ) : (
                files.map((file) => (
                  <a
                    key={file.id}
                    href={file.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900 flex-1 truncate">{file.file_name}</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Meta Info */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">详情</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">创建时间</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(lead.created_at).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">更新时间</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(lead.updated_at).toLocaleString()}
                </dd>
              </div>
              {lead.next_follow_up && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">下次跟进</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(lead.next_follow_up).toLocaleDateString()}
                  </dd>
                </div>
              )}
              {lead.assigned_to && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">负责人</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lead.assigned_to}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">来源</dt>
                <dd className="mt-1 text-sm text-gray-900">{lead.source || '直接'}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}