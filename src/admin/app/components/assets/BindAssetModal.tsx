import React, { useState, useEffect } from 'react';
import { Modal } from '@/admin/app/components/base/Modal';
import { Button } from '@/admin/app/components/base/Button';
import { AssetSelector } from './AssetSelector';
import { Asset, Placeholder } from '@/admin/lib/supabaseClient';
import { supabase } from '@/admin/lib/supabaseClient';

interface BindAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeholder: Placeholder | null;
  onConfirm: (placeholderId: string, assetId: string) => Promise<void>;
}

export function BindAssetModal({
  isOpen,
  onClose,
  placeholder,
  onConfirm,
}: BindAssetModalProps) {
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadApprovedAssets();
    } else {
      setSelectedAssetId('');
    }
  }, [isOpen]);

  const loadApprovedAssets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Failed to load assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!placeholder || !selectedAssetId) return;

    try {
      setConfirming(true);
      await onConfirm(placeholder.id, selectedAssetId);
      onClose();
    } catch (error) {
      console.error('Failed to bind asset:', error);
    } finally {
      setConfirming(false);
    }
  };

  if (!placeholder) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="绑定素材到占位符"
      subtitle={`为占位符选择已批准的素材：${placeholder.placeholder_key}`}
      size="2xl"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            取消
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={!selectedAssetId || confirming}
            loading={confirming}
          >
            确认绑定
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Placeholder Info */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">占位符信息</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-blue-600">键:</span>{' '}
              <code className="bg-white px-2 py-0.5 rounded">{placeholder.placeholder_key}</code>
            </div>
            <div>
              <span className="text-blue-600">Page:</span>{' '}
              <span className="font-medium">{placeholder.page_path}</span>
            </div>
            {placeholder.placeholder_type && (
              <div>
                <span className="text-blue-600">Type:</span>{' '}
                <span className="font-medium">{placeholder.placeholder_type}</span>
              </div>
            )}
            {placeholder.required_ratio && (
              <div>
                <span className="text-blue-600">Ratio:</span>{' '}
                <span className="font-medium">{placeholder.required_ratio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Asset Selector */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Select Asset</h3>
          <AssetSelector
            assets={assets}
            selectedAssetId={selectedAssetId}
            onSelectAsset={setSelectedAssetId}
            placeholderType={placeholder.placeholder_type}
          />
        </div>
      </div>
    </Modal>
  );
}
