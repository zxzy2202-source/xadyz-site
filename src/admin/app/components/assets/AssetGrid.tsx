import React from 'react';
import { Asset } from '@/admin/lib/supabaseClient';
import { AssetCard } from './AssetCard';
import { EmptyState } from '@/admin/app/components/base';

interface AssetGridProps {
  assets: Asset[];
  usage: Map<string, string[]>; // assetId -> placeholder keys
  onView: (asset: Asset) => void;
  onDelete: (asset: Asset) => void;
  onToggleApproved?: (asset: Asset) => void;
  canApprove?: boolean;
}

export function AssetGrid({ 
  assets, 
  usage, 
  onView, 
  onDelete, 
  onToggleApproved,
  canApprove 
}: AssetGridProps) {
  if (assets.length === 0) {
    return <EmptyState variant="no-assets" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          usage={usage.get(asset.id) || []}
          onView={onView}
          onDelete={onDelete}
          onToggleApproved={onToggleApproved}
          canApprove={canApprove}
        />
      ))}
    </div>
  );
}
