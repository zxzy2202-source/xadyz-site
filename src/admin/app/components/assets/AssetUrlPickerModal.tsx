/**
 * 素材 URL 选择弹窗：从已批准素材中选择，返回 file_url
 * 用于博客封面图、OG 图、Canonical URL 等字段
 */
import React, { useState, useEffect } from 'react';
import { Modal } from '@/admin/app/components/base/Modal';
import { Button } from '@/admin/app/components/base/Button';
import { AssetSelector } from './AssetSelector';
import { Asset } from '@/admin/lib/supabaseClient';
import { supabase } from '@/admin/lib/supabaseClient';

interface AssetUrlPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  onSelect: (url: string) => void;
  /** 可选：仅显示指定类型的素材 */
  filterType?: string | null;
}

export function AssetUrlPickerModal({
  isOpen,
  onClose,
  title,
  subtitle,
  onSelect,
  filterType,
}: AssetUrlPickerModalProps) {
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
      let query = supabase
        .from('assets')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });
      const { data, error } = await query;
      if (error) throw error;
      const normalized = (data || []).map((a: Record<string, unknown>) => ({
        ...a,
        type: a.type ?? a.asset_type,
      })) as Asset[];
      setAssets(normalized);
    } catch (error) {
      console.error('Failed to load assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    const asset = assets.find((a) => a.id === selectedAssetId);
    if (!asset?.file_url) return;
    setConfirming(true);
    try {
      onSelect(asset.file_url);
      onClose();
    } finally {
      setConfirming(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
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
            确认选择
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-gray-500">加载素材中...</div>
        ) : (
          <AssetSelector
            assets={assets}
            selectedAssetId={selectedAssetId}
            onSelectAsset={setSelectedAssetId}
            placeholderType={filterType}
          />
        )}
      </div>
    </Modal>
  );
}
