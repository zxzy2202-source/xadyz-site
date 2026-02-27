import React from 'react';
import { Placeholder, Asset } from '@/admin/lib/supabaseClient';
import { Badge } from '@/admin/app/components/base';
import { Eye, Link2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface PlaceholderRowProps {
  placeholder: Placeholder;
  boundAsset: Asset | null;
  onBind: (placeholder: Placeholder) => void;
  onUnbind: (placeholder: Placeholder) => void;
  onPriorityChange: (placeholder: Placeholder, priority: Placeholder['priority']) => void;
}

export function PlaceholderRow({
  placeholder,
  boundAsset,
  onBind,
  onUnbind,
  onPriorityChange,
}: PlaceholderRowProps) {
  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: 'text-red-700 bg-red-50',
      medium: 'text-yellow-700 bg-yellow-50',
      low: 'text-gray-700 bg-gray-50',
    };
    return colors[priority] || 'text-gray-700 bg-gray-50';
  };

  const handleCopyKey = async () => {
    try {
      if (!placeholder.placeholder_key) return;
      await navigator.clipboard.writeText(placeholder.placeholder_key);
      toast.success('占位符 Key 已复制到剪贴板');
    } catch {
      toast.error('复制失败，请手动选择复制');
    }
  };

  const frontendPath = placeholder.page_path || '';

  const getRoleLabel = () => {
    const key = placeholder.placeholder_key || '';
    const section = (placeholder.section_name || '').toLowerCase();
    const type = placeholder.placeholder_type;

    const isHero =
      type === 'hero' ||
      type === 'banner' ||
      /hero/.test(key) ||
      /hero/.test(section) ||
      /header/.test(section);

    if (isHero) {
      return '页面头图 / Hero';
    }
    return '模块内图片';
  };

  return (
    <tr className="hover:bg-gray-50">
      {/* Page */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        {(placeholder.page_path || placeholder.page_key || '').split('/').filter(Boolean)[0] || 'home'}
      </td>
      
      {/* Section */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {placeholder.section_name || '-'}
      </td>

      {/* Role */}
      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
        {getRoleLabel()}
      </td>
      
      {/* Placeholder Key */}
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          type="button"
          onClick={handleCopyKey}
          className="inline-flex items-center gap-2 group"
        >
          <code className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded font-mono group-hover:bg-blue-50 group-hover:text-blue-700">
            {placeholder.placeholder_key}
          </code>
          <span className="text-[10px] text-gray-400 group-hover:text-blue-600">
            点击复制
          </span>
        </button>
      </td>
      
      {/* Type */}
      <td className="px-6 py-4 whitespace-nowrap">
        {placeholder.placeholder_type ? (
          <Badge 
            variant={placeholder.placeholder_type as any} 
            showIcon={false}
          />
        ) : (
          <span className="text-gray-400 text-xs">-</span>
        )}
      </td>
      
      {/* Required Ratio */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {placeholder.required_ratio || placeholder.required_dimensions || '-'}
      </td>
      
      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge 
          variant={placeholder.status === 'replaced' ? 'replaced' : 'missing'} 
        />
      </td>
      
      {/* Bound Asset */}
      <td className="px-6 py-4 whitespace-nowrap">
        {boundAsset ? (
          <div className="flex items-center gap-2">
            {boundAsset.file_type === 'image' && (
              <img
                src={boundAsset.file_url}
                alt={boundAsset.file_name}
                className="w-10 h-10 object-cover rounded"
              />
            )}
            {boundAsset.file_type !== 'image' && (
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-gray-400" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs text-gray-900 truncate max-w-[150px]">
                {boundAsset.file_name}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-gray-400 text-xs">-</span>
        )}
      </td>
      
      {/* Priority */}
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={placeholder.priority}
          onChange={(e) => onPriorityChange(placeholder, e.target.value as Placeholder['priority'])}
          className={`px-2 py-1 text-xs font-semibold rounded border-0 cursor-pointer ${getPriorityColor(placeholder.priority)}`}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </td>
      
      {/* Action */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-3">
          {/* 前台页面预览 */}
          {frontendPath && (
            <a
              href={frontendPath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700"
              title="在前台打开对应页面"
            >
              <Eye className="w-4 h-4" />
            </a>
          )}

          {/* 绑定 / 解绑操作 */}
          {placeholder.status === 'replaced' && boundAsset ? (
            <button
              onClick={() => onUnbind(placeholder)}
              className="text-red-600 hover:text-red-800"
            >
              Unbind
            </button>
          ) : (
            <button
              onClick={() => onBind(placeholder)}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              <Link2 className="w-4 h-4" />
              Bind
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
