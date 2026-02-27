import React, { useEffect, useState } from 'react';
import { supabase, Asset, Placeholder } from '@/admin/lib/supabaseClient';
import { getCurrentUser, hasPermission } from '@/admin/lib/auth';
import { generateUUID } from '@/admin/lib/uuid';
import { Upload, Search, Image, CheckCircle, Clock, Trash2, Eye, Link2 } from 'lucide-react';
import { toast } from 'sonner';

export function AssetsLibraryPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [placeholders, setPlaceholders] = useState<Placeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [filterType, setFilterType] = useState<string>('all');
  const [filterApproved, setFilterApproved] = useState<string>('all');
  const [filterUsage, setFilterUsage] = useState<string>('all');
  
  // Upload form
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadEvidenceTags, setUploadEvidenceTags] = useState<string[]>([]);
  const [uploadApproved, setUploadApproved] = useState(false);
  const [uploadNotes, setUploadNotes] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadFormKey, setUploadFormKey] = useState(0);
  
  // Stats
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    used: 0,
  });

  // User permissions
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    loadUserRole();
    loadData();
  }, [filterType, filterApproved, filterUsage]);

  const loadUserRole = async () => {
    const user = await getCurrentUser();
    setUserRole(user?.role || null);
  };

  const loadData = async () => {
    try {
      setLoading(true);

      // Load assets
      let query = supabase
        .from('assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (filterType !== 'all') {
        query = query.eq('type', filterType);
      }
      // 不再在 SQL 中过滤 approved，避免 assets.approved 列不存在时报错
      const { data: assetData, error: assetError } = await query;
      if (assetError) throw assetError;

      // Load placeholders to show usage
      const { data: placeholderData, error: placeholderError } = await supabase
        .from('placeholders')
        .select('*');
      if (placeholderError) throw placeholderError;

      const normalized = (assetData || []).map((a: any) => ({
        ...a,
        type: a.type ?? a.asset_type,
      }));
      // 客户端过滤 approved（避免 DB 无 approved 列时报错）
      const approved = normalized.filter(a => a.approved === true);
      const pending = normalized.filter(a => a.approved === false);
      const total = normalized.length;
      const usedAssetIds = new Set(placeholderData?.map(p => p.asset_id).filter(Boolean));
      const used = normalized.filter(a => usedAssetIds.has(a.id)).length;

      setStats({ total, approved: approved.length, pending: pending.length, used });

      let filtered = normalized;
      if (filterApproved === 'approved') filtered = approved;
      else if (filterApproved === 'pending') filtered = pending;
      if (filterUsage === 'used') filtered = filtered.filter(a => usedAssetIds.has(a.id));
      else if (filterUsage === 'unused') filtered = filtered.filter(a => !usedAssetIds.has(a.id));
      setAssets(filtered);

    } catch (error: any) {
      toast.error(error.message || '加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setUploadTitle(file.name.split('.')[0]);
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAsset = async () => {
    if (!selectedFile) {
      toast.error('请选择文件');
      return;
    }
    if (!uploadTitle.trim()) {
      toast.error('请输入素材名称');
      return;
    }
    if (!uploadType) {
      toast.error('请选择类型');
      return;
    }

    try {
      setUploading(true);

      // 1. 根据类型选择 bucket
      const bucketMap: Record<string, string> = {
        'banner': 'assets-banners',
        'factory': 'assets-factory',
        'product': 'assets-products',
        'material': 'assets-materials',
        'qc': 'assets-factory',
        'packaging': 'assets-factory',
        'container': 'assets-factory',
        'document': 'assets-docs',
        'icon': 'assets-products',
        'team': 'assets-factory',
      };
      
      const bucket = bucketMap[uploadType] || 'assets-products';

      // 2. 生成路径 yyyy/mm/uuid_slug.ext
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const uuid = generateUUID();
      const ext = selectedFile.name.split('.').pop();
      const slug = uploadTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const filePath = `${year}/${month}/${uuid}_${slug}.${ext}`;

      // 3. 上传到 Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`Storage 上传失败: ${uploadError.message}`);
      }

      // 4. 获取公开 URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      // 5. 解析标签
      const tags = uploadTags.split(',').map(t => t.trim()).filter(t => t);
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      // 6. 保存到数据库（兼容旧 schema: file_name/file_type/status、新 schema: title/type/approved）
      const mimeToFileType = (m: string) =>
        m.startsWith('image/') ? 'image' : m.startsWith('video/') ? 'video' : 'document';
      const insertPayload: Record<string, unknown> = {
        title: uploadTitle,
        file_name: selectedFile.name,
        file_type: mimeToFileType(selectedFile.type || ''),
        file_url: publicUrl,
        file_size: selectedFile.size,
        type: uploadType,
        tags: tags,
        usage_pages: [],
        approved: uploadApproved,
        status: uploadApproved ? 'approved' : 'pending',
        notes: uploadNotes || null,
        uploaded_by: currentUser?.id || null,
      };
      if (uploadEvidenceTags.length > 0) insertPayload.evidence_tags = uploadEvidenceTags;

      const { data: assetData, error: dbError } = await supabase
        .from('assets')
        .insert(insertPayload)
        .select()
        .single();

      if (dbError) {
        await supabase.storage.from(bucket).remove([filePath]);
        throw new Error(`数据库保存失败: ${dbError.message}`);
      }

      toast.success('✅ 素材上传成功！');
      
      // Reset form
      resetUploadForm();
      
      // Reload assets
      await loadData();
    } catch (error: any) {
      toast.error(error.message || '上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  const resetUploadForm = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setUploadTitle('');
    setUploadType('');
    setUploadTags('');
    setUploadEvidenceTags([]);
    setUploadApproved(false);
    setUploadNotes('');
    setPreviewUrl(null);
    setUploadFormKey(k => k + 1); // 下次打开时重置文件选择器
  };

  const openUploadModal = () => {
    setUploadFormKey(k => k + 1);
    setShowUploadModal(true);
  };

  const toggleApproved = async (assetId: string, currentApproved: boolean) => {
    // Check permissions
    if (!hasPermission(userRole, 'approve_assets')) {
      toast.error('您没有权限审核素材');
      return;
    }

    try {
      const newApproved = !currentApproved;
      
      const { error } = await supabase
        .from('assets')
        .update({ 
          approved: newApproved
        })
        .eq('id', assetId);

      if (error) throw error;

      toast.success(newApproved ? '✅ 已批准' : '⏸️ 已取消批准');
      loadData();
    } catch (error: any) {
      toast.error(error.message || '操作失败');
    }
  };

  const deleteAsset = async (asset: Asset) => {
    if (!confirm('确定要删除这个素材吗？此操作不可撤销。')) return;

    try {
      // 1. 尝试从 Supabase Storage 删除实际文件
      if (asset.file_url) {
        try {
          // URL 格式: https://{project}.supabase.co/storage/v1/object/public/{bucket}/{path}
          const storagePrefix = '/storage/v1/object/public/';
          const idx = asset.file_url.indexOf(storagePrefix);
          if (idx !== -1) {
            const rest = asset.file_url.slice(idx + storagePrefix.length);
            const slashIdx = rest.indexOf('/');
            if (slashIdx !== -1) {
              const bucket = rest.slice(0, slashIdx);
              const filePath = rest.slice(slashIdx + 1);
              await supabase.storage.from(bucket).remove([filePath]);
            }
          }
        } catch {
          // Storage 删除失败不阻断 DB 删除
        }
      }

      // 2. 删除数据库记录
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', asset.id);

      if (error) throw error;

      toast.success('素材已删除');
      loadData();
    } catch (error: any) {
      toast.error(error.message || '删除失败');
    }
  };

  const filteredAssets = assets.filter(asset => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (asset.title || '').toLowerCase().includes(term) ||
      (asset.type || '').toLowerCase().includes(term) ||
      (asset.tags || []).some(tag => String(tag).toLowerCase().includes(term))
    );
  });

  const getUsageForAsset = (assetId: string): string[] => {
    return placeholders
      .filter(p => p.asset_id === assetId)
      .map(p => p.placeholder_key);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // 素材类型及中文标签
  const assetTypes = ['banner', 'factory', 'product', 'material', 'qc', 'packaging', 'container', 'document'];
  const ASSET_TYPE_LABELS: Record<string, string> = {
    banner: '横幅',
    factory: '工厂',
    product: '产品',
    material: '原材料',
    qc: '质检',
    packaging: '包装',
    container: '装柜',
    document: '文档',
  };
  const evidenceTagOptions = [
    { key: 'factory_real', label: '真实工厂' },
    { key: 'production_line', label: '生产线' },
    { key: 'qc_process', label: '质检流程' },
    { key: 'container_loading', label: '装柜现场' },
    { key: 'warehouse_stock', label: '仓库库存' },
    { key: 'slitting_machine', label: '分切机' },
    { key: 'printing_process', label: '印刷流程' },
  ];

  const canUpload = hasPermission(userRole, 'upload_assets');
  const canApprove = hasPermission(userRole, 'approve_assets');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">素材管理</h1>
        <p className="text-gray-600 mt-2">上传、标记和审核网站素材</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">素材总数</p>
              <p className="text-3xl font-bold mt-1">{stats.total}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Image className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">已批准</p>
              <p className="text-3xl font-bold mt-1">{stats.approved}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">待审核</p>
              <p className="text-3xl font-bold mt-1">{stats.pending}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">使用中</p>
              <p className="text-3xl font-bold mt-1">{stats.used}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Link2 className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left: Search & Filters */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索标题 / 标签..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">全部类型</option>
              {assetTypes.map(type => (
                <option key={type} value={type}>{ASSET_TYPE_LABELS[type] || type}</option>
              ))}
            </select>

            {/* Approved Filter */}
            <select
              value={filterApproved}
              onChange={(e) => setFilterApproved(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">全部状态</option>
              <option value="approved">已批准</option>
              <option value="pending">待审核</option>
            </select>

            {/* Usage Filter */}
            <select
              value={filterUsage}
              onChange={(e) => setFilterUsage(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">全部使用</option>
              <option value="used">已使用</option>
              <option value="unused">未使用</option>
            </select>
          </div>

          {/* Right: Upload Button */}
          {canUpload && (
            <button
              onClick={openUploadModal}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Upload className="w-5 h-5" />
              上传素材
            </button>
          )}
        </div>
      </div>

      {/* Assets Grid */}
      <div>
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">加载中...</p>
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">暂无素材</p>
            <p className="text-sm text-gray-400 mt-2">点击「上传素材」添加图片或文档</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAssets.map((asset) => {
              const usage = getUsageForAsset(asset.id);
              
              return (
                <div
                  key={asset.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    {asset.type !== 'document' && asset.file_url ? (
                      <img
                        src={asset.file_url}
                        alt={asset.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">文档</span>
                      </div>
                    )}
                    
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <a
                        href={asset.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-lg hover:bg-gray-100"
                      >
                        <Eye className="w-5 h-5 text-gray-700" />
                      </a>
                      <button
                        onClick={() => deleteAsset(asset)}
                        className="p-2 bg-white rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>

                    {/* Approved Badge */}
                    <div className="absolute top-2 right-2">
                      {asset.approved ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          已批准
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          待审核
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1">
                      {asset.title}
                    </h3>
                    
                    {/* Type */}
                    {asset.type && (
                      <div className="mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                          {asset.type}
                        </span>
                      </div>
                    )}

                    {/* Tags */}
                    {asset.tags && asset.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {asset.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {asset.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            +{asset.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Usage */}
                    <div className="mb-3 min-h-[40px]">
                      {usage.length > 0 ? (
                        <>
                          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <Link2 className="w-3 h-3" />
                            使用于:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {usage.slice(0, 2).map((key, i) => (
                              <span key={i} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded font-mono">
                                {key}
                              </span>
                            ))}
                            {usage.length > 2 && (
                              <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded">
                                +{usage.length - 2}
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-gray-400">尚未使用</p>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="text-xs text-gray-500 mb-3">
                      <div>{new Date(asset.created_at).toLocaleDateString('zh-CN')}</div>
                    </div>

                    {/* Actions */}
                    {canApprove && (
                      <button
                        onClick={() => toggleApproved(asset.id, asset.approved)}
                        className={`w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          asset.approved
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {asset.approved ? '✓ 已批准' : '批准'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Upload className="w-6 h-6 text-blue-600" />
                上传新素材
              </h2>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-4">
                {/* File Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    文件 *
                  </label>
                  <input
                    key={uploadFormKey}
                    type="file"
                    onChange={handleFileSelect}
                    accept="image/*,video/*,.pdf"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100
                      cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </p>
                  )}
                </div>

                {/* Preview */}
                {previewUrl && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <img src={previewUrl} alt="Preview" className="max-w-full max-h-48 mx-auto object-contain rounded" />
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    标题 *
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="例如：工厂全景主图"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    类型 *
                  </label>
                  <select
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择类型...</option>
                    {assetTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    标签（逗号分隔）
                  </label>
                  <input
                    type="text"
                    value={uploadTags}
                    onChange={(e) => setUploadTags(e.target.value)}
                    placeholder="例如：分切、仓库、装柜"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Evidence Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    证据标签（B2B 证明）
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {evidenceTagOptions.map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          if (uploadEvidenceTags.includes(key)) {
                            setUploadEvidenceTags(uploadEvidenceTags.filter(t => t !== key));
                          } else {
                            setUploadEvidenceTags([...uploadEvidenceTags, key]);
                          }
                        }}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          uploadEvidenceTags.includes(key)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Approved Toggle */}
                {canApprove && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <input
                      type="checkbox"
                      id="uploadApproved"
                      checked={uploadApproved}
                      onChange={(e) => setUploadApproved(e.target.checked)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <label htmlFor="uploadApproved" className="flex-1 cursor-pointer">
                      <p className="font-medium text-gray-900">立即批准</p>
                      <p className="text-sm text-gray-600">允许此素材在网站上使用</p>
                    </label>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    备注（选填）
                  </label>
                  <textarea
                    value={uploadNotes}
                    onChange={(e) => setUploadNotes(e.target.value)}
                    rows={3}
                    placeholder="补充说明..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={resetUploadForm}
                className="px-6 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={uploadAsset}
                disabled={!selectedFile || !uploadTitle || !uploadType || uploading}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                {uploading ? '上传中...' : '上传素材'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}