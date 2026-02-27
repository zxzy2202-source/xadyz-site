import React from 'react';
import { Asset } from '@/admin/lib/supabaseClient';
import { Badge } from '@/admin/app/components/base';
import { Eye, Trash2, Link2, Image as ImageIcon } from 'lucide-react';

interface AssetCardProps {
  asset: Asset;
  usage: string[]; // placeholder keys this asset is used in
  onView: (asset: Asset) => void;
  onDelete: (asset: Asset) => void;
  onToggleApproved?: (asset: Asset) => void;
  canApprove?: boolean;
}

export function AssetCard({ 
  asset, 
  usage, 
  onView, 
  onDelete, 
  onToggleApproved,
  canApprove = false 
}: AssetCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group">
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        {(asset.type !== 'document' && asset.file_url) ? (
          <img
            src={asset.file_url}
            alt={asset.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => onView(asset)}
            className="p-2 bg-white rounded-lg hover:bg-gray-100"
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => onDelete(asset)}
            className="p-2 bg-white rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <Badge 
            variant={asset.approved ? 'approved' : 'pending'} 
            label={asset.approved ? '已批准' : '待审核'}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1">
          {asset.title}
        </h3>
        
        {/* Type Badge */}
        {asset.type && (
          <div className="mb-2">
            <Badge 
              variant={asset.type as any} 
              showIcon={false}
            />
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

        {/* Evidence Tags */}
        {asset.evidence_tags && asset.evidence_tags.length > 0 && (
          <div className="mb-2">
            <p className="text-xs text-gray-500 mb-1">证据标签:</p>
            <div className="flex flex-wrap gap-1">
              {asset.evidence_tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                  {tag}
                </span>
              ))}
            </div>
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

        {/* Date */}
        <div className="text-xs text-gray-500 mb-3">
          <div>{new Date(asset.created_at).toLocaleDateString('zh-CN')}</div>
        </div>

        {/* Approve Action */}
        {canApprove && onToggleApproved && (
          <button
            onClick={() => onToggleApproved(asset)}
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
}