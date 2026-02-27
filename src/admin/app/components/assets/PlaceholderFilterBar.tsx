import React from 'react';
import { Search } from 'lucide-react';

interface PlaceholderFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterPage: string;
  onFilterPageChange: (value: string) => void;
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
}

const pages = ['home', 'products', 'material-supply', 'manufacturing', 'applications', 'government-tenders'];
const types = ['hero', 'product', 'factory', 'banner', 'icon', 'other'];

export function PlaceholderFilterBar({
  searchTerm,
  onSearchChange,
  filterPage,
  onFilterPageChange,
  filterStatus,
  onFilterStatusChange,
  filterType,
  onFilterTypeChange,
}: PlaceholderFilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search key / path..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Page Filter */}
        <select
          value={filterPage}
          onChange={(e) => onFilterPageChange(e.target.value)}
          className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Pages</option>
          {pages.map(page => (
            <option key={page} value={page}>{page}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => onFilterStatusChange(e.target.value)}
          className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Status</option>
          <option value="missing">Missing</option>
          <option value="replaced">Replaced</option>
        </select>

        {/* Type Filter */}
        <select
          value={filterType}
          onChange={(e) => onFilterTypeChange(e.target.value)}
          className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
