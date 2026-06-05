import React, { useState } from 'react';
import { Asset } from '@/admin/lib/supabaseClient';
import { Search, Image as ImageIcon, FileText } from 'lucide-react';

interface AssetSelectorProps {
  assets: Asset[]; // Only approved assets should be passed
  selectedAssetId: string;
  onSelectAsset: (assetId: string) => void;
  placeholderType?: string | null; // For auto-filtering
}

export function AssetSelector({
  assets,
  selectedAssetId,
  onSelectAsset,
  placeholderType,
}: AssetSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter by search term
  const filteredAssets = assets.filter(asset => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (asset.title || '').toLowerCase().includes(term) ||
      (asset.type || '').toLowerCase().includes(term) ||
      (asset.tags || []).some(tag => String(tag).toLowerCase().includes(term))
    );
  });

  // Auto-filter by type
  const typeFilteredAssets = placeholderType
    ? filteredAssets.filter(asset => asset.type === placeholderType)
    : filteredAssets;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索已批准的素材..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ✅ 仅显示已批准的素材
          {placeholderType && ` • 已按类型筛选: ${placeholderType}`}
        </p>
      </div>

      {/* Assets Grid */}
      {typeFilteredAssets.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="font-medium">未找到已批准的素材</p>
          <p className="text-sm mt-1">请先在素材库中批准素材</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
          {typeFilteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset.id)}
              className={`cursor-pointer rounded-lg border-2 transition-all ${
                selectedAssetId === asset.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow'
              }`}
            >
              <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                {(asset.type !== 'document' && asset.file_url) ? (
                  <img
                    src={asset.file_url}
                    alt={asset.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-gray-900 truncate mb-1">
                  {asset.title}
                </p>
                {asset.type && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                    {asset.type}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
