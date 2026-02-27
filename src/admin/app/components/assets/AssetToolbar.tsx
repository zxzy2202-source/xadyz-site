import React from 'react';
import { Search, Upload } from 'lucide-react';
import { Button } from '@/admin/app/components/base';

interface AssetToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
  filterApproved: string;
  onFilterApprovedChange: (value: string) => void;
  filterUsage: string;
  onFilterUsageChange: (value: string) => void;
  onUploadClick?: () => void;
  canUpload?: boolean;
}

const assetTypes = ['banner', 'factory', 'product', 'material', 'qc', 'document', 'icon', 'team'];

export function AssetToolbar({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  filterApproved,
  onFilterApprovedChange,
  filterUsage,
  onFilterUsageChange,
  onUploadClick,
  canUpload = false,
}: AssetToolbarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: Search & Filters */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search title / tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => onFilterTypeChange(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Types</option>
            {assetTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Approved Filter */}
          <select
            value={filterApproved}
            onChange={(e) => onFilterApprovedChange(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>

          {/* Usage Filter */}
          <select
            value={filterUsage}
            onChange={(e) => onFilterUsageChange(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Usage</option>
            <option value="used">Used</option>
            <option value="unused">Unused</option>
          </select>
        </div>

        {/* Right: Upload Button */}
        {canUpload && onUploadClick && (
          <Button
            variant="primary"
            icon={<Upload className="w-5 h-5" />}
            onClick={onUploadClick}
            className="whitespace-nowrap"
          >
            Upload Asset
          </Button>
        )}
      </div>
    </div>
  );
}
