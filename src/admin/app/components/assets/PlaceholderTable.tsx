import React from 'react';
import { Placeholder, Asset } from '@/admin/lib/supabaseClient';
import { PlaceholderRow } from './PlaceholderRow';
import { EmptyState } from '@/admin/app/components/base';

interface PlaceholderTableProps {
  placeholders: Placeholder[];
  assets: Map<string, Asset>; // assetId -> asset
  onBind: (placeholder: Placeholder) => void;
  onUnbind: (placeholder: Placeholder) => void;
  onPriorityChange: (placeholder: Placeholder, priority: Placeholder['priority']) => void;
}

export function PlaceholderTable({
  placeholders,
  assets,
  onBind,
  onUnbind,
  onPriorityChange,
}: PlaceholderTableProps) {
  if (placeholders.length === 0) {
    return <EmptyState variant="no-placeholders" />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Page
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Section
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Placeholder Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Required Ratio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bound Asset
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {placeholders.map((placeholder) => (
              <PlaceholderRow
                key={placeholder.id}
                placeholder={placeholder}
                boundAsset={placeholder.asset_id ? assets.get(placeholder.asset_id) || null : null}
                onBind={onBind}
                onUnbind={onUnbind}
                onPriorityChange={onPriorityChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
