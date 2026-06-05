import React from 'react';
import { Link } from 'react-router';
import { Image, ExternalLink, MapPin, FileText } from 'lucide-react';
import { PAGE_BANNER_MAP } from '@/app/lib/pageBannerMap';

/**
 * 页面-素材对应关系
 * 展示各页面与 Banner 的映射，便于在占位符中绑定素材
 */
export function PageAssetsMappingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">页面-素材对应关系</h1>
        <p className="text-gray-600 mt-1">
          各页面的 Hero Banner 占位符与素材绑定说明。在「占位符」中按 placeholder_pattern 或 page_path 找到对应占位符，绑定已上传的素材。
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-blue-900">使用流程</p>
          <ol className="mt-2 text-sm text-blue-800 list-decimal list-inside space-y-1">
            <li>在<Link to="/admin/assets" className="underline">素材库</Link>上传并批准素材</li>
            <li>在<Link to="/admin/placeholders" className="underline">占位符</Link>中按 page_path 或 placeholder_pattern 搜索</li>
            <li>点击「绑定」选择已批准的素材</li>
            <li>前台页面将优先显示已绑定的素材（需执行 sql/08-public-placeholder-assets.sql 并接入前端）</li>
          </ol>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">页面</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Banner Key</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">占位符 Pattern</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">说明</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {PAGE_BANNER_MAP.map((row) => (
              <tr key={row.pagePath} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">
                  <span className="font-mono text-gray-900">{row.pagePath}</span>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-blue-700">{row.bannerKey}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">{row.placeholderPattern}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{row.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
