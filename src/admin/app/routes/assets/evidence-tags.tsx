import React, { useEffect, useState } from 'react';
import { supabase, EvidenceTag, Asset } from '@/admin/lib/supabaseClient';
import { Tag, Plus, Trash2, Shield } from 'lucide-react';
import { toast } from 'sonner';

export function EvidenceTagsPage() {
  const [tags, setTags] = useState<EvidenceTag[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Add form
  const [newTagKey, setNewTagKey] = useState('');
  const [newTagLabel, setNewTagLabel] = useState('');
  const [newTagDescription, setNewTagDescription] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load evidence tags
      const { data: tagData, error: tagError } = await supabase
        .from('evidence_tags')
        .select('*')
        .order('created_at', { ascending: false });

      if (tagError && tagError.code !== 'PGRST116') { // Ignore "not found" error
        throw tagError;
      }

      // Load assets with evidence tags（若 evidence_tags 列不存在则加载全部）
      let assetData: Asset[] = [];
      const { data: assetResult, error: assetError } = await supabase
        .from('assets')
        .select('*');

      if (assetError) throw assetError;
      assetData = (assetResult || []).filter(a => a.evidence_tags && a.evidence_tags.length > 0);

      setTags(tagData || []);
      setAssets(assetData);

    } catch (error: any) {
      console.error('Error loading evidence tags:', error);
      toast.error(error.message || '加载证据标签失败');
    } finally {
      setLoading(false);
    }
  };

  const addTag = async () => {
    if (!newTagKey.trim() || !newTagLabel.trim()) {
      toast.error('请填写标签Key和名称');
      return;
    }

    try {
      const { error } = await supabase
        .from('evidence_tags')
        .insert({
          tag_key: newTagKey.toLowerCase().replace(/\s+/g, '_'),
          tag_label: newTagLabel,
          description: newTagDescription || null,
        });

      if (error) throw error;

      toast.success('✅ 证据标签已创建！');
      setShowAddModal(false);
      setNewTagKey('');
      setNewTagLabel('');
      setNewTagDescription('');
      loadData();
    } catch (error: any) {
      toast.error(error.message || '创建失败');
    }
  };

  const deleteTag = async (tagId: string) => {
    if (!confirm('确定要删除这个证据标签吗？')) return;

    try {
      const { error } = await supabase
        .from('evidence_tags')
        .delete()
        .eq('id', tagId);

      if (error) throw error;

      toast.success('标签已删除');
      loadData();
    } catch (error: any) {
      toast.error(error.message || '删除失败');
    }
  };

  const getAssetCountForTag = (tagKey: string): number => {
    return assets.filter(asset => 
      asset.evidence_tags?.includes(tagKey)
    ).length;
  };

  // Predefined evidence tag templates
  const tagTemplates = [
    { key: 'factory_real', label: 'Real Factory Photo', description: 'Authentic factory floor and facility images' },
    { key: 'production_line', label: 'Production Line', description: 'Manufacturing equipment and production processes' },
    { key: 'qc_process', label: 'Quality Control', description: 'Quality inspection and testing procedures' },
    { key: 'container_loading', label: 'Container Loading', description: 'Export packaging and container loading' },
    { key: 'warehouse_stock', label: 'Warehouse Stock', description: 'Inventory and warehouse management' },
    { key: 'slitting_machine', label: 'Slitting Machine', description: 'Jumbo roll slitting equipment' },
    { key: 'printing_process', label: 'Printing Process', description: 'Flexo and offset printing operations' },
    { key: 'iso_certified', label: 'ISO Certification', description: 'ISO 9001 and quality certificates' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Evidence Tags</h1>
          <p className="text-gray-600 mt-2">证据标签 - 为B2B素材添加可信度标记</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <Shield className="w-4 h-4 inline mr-1" />
              <strong>什么是证据标签？</strong> 为工业B2B网站素材打上"真实性"标签，支撑投标、Why Choose Us等关键页面。
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          添加标签
        </button>
      </div>

      {/* Quick Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">快速添加模板</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {tagTemplates.map((template) => {
            const existing = tags.find(t => t.tag_key === template.key);
            return (
              <button
                key={template.key}
                onClick={async () => {
                  if (existing) {
                    toast.info('此标签已存在');
                    return;
                  }
                  try {
                    await supabase.from('evidence_tags').insert({
                      tag_key: template.key,
                      tag_label: template.label,
                      description: template.description,
                    });
                    toast.success('✅ 标签已添加！');
                    loadData();
                  } catch (error: any) {
                    toast.error(error.message);
                  }
                }}
                disabled={!!existing}
                className={`p-3 text-left rounded-lg border-2 transition-all ${
                  existing
                    ? 'border-green-200 bg-green-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <p className="font-semibold text-sm text-gray-900 mb-1">
                  {template.label}
                  {existing && <span className="ml-2 text-xs text-green-600">✓ 已添加</span>}
                </p>
                <p className="text-xs text-gray-600">{template.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tags List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="text-gray-600 mt-4">加载中...</p>
          </div>
        ) : tags.length === 0 ? (
          <div className="p-12 text-center">
            <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">暂无证据标签</p>
            <p className="text-sm text-gray-500">添加标签以标记素材的证明属性</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    标签 Key
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    名称
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    描述
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    使用数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    创建时间
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tags.map((tag) => {
                  const usageCount = getAssetCountForTag(tag.tag_key);
                  
                  return (
                    <tr key={tag.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded font-mono">
                          {tag.tag_key}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {tag.tag_label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {tag.description || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          usageCount > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {usageCount} {usageCount === 1 ? 'asset' : 'assets'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(tag.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => deleteTag(tag.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-600" />
          How to Use Evidence Tags
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">✅ Best Practices:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Tag real factory photos with <code className="px-1 bg-white rounded">factory_real</code></li>
              <li>• Mark quality control images with <code className="px-1 bg-white rounded">qc_process</code></li>
              <li>• Label export evidence with <code className="px-1 bg-white rounded">container_loading</code></li>
              <li>• Use for Government & Tenders page credibility</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">🎯 Future Integration:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Only allow evidence-tagged assets on tender pages</li>
              <li>• Create "Proof Gallery" with evidence tags</li>
              <li>• Filter assets by evidence type</li>
              <li>• Auto-generate credibility badges</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add Tag Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Tag className="w-6 h-6 text-purple-600" />
                添加证据标签
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标签 Key *（小写、下划线）
                </label>
                <input
                  type="text"
                  value={newTagKey}
                  onChange={(e) => setNewTagKey(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                  placeholder="例如：factory_real"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  名称 *
                </label>
                <input
                  type="text"
                  value={newTagLabel}
                  onChange={(e) => setNewTagLabel(e.target.value)}
                  placeholder="例如：真实工厂照片"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  描述
                </label>
                <textarea
                  value={newTagDescription}
                  onChange={(e) => setNewTagDescription(e.target.value)}
                  rows={3}
                  placeholder="例如：真实工厂车间和设施图片"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewTagKey('');
                  setNewTagLabel('');
                  setNewTagDescription('');
                }}
                className="px-6 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={addTag}
                disabled={!newTagKey.trim() || !newTagLabel.trim()}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                添加标签
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
