import React from 'react';
import { Image, FileText, Search } from 'lucide-react';

export type EmptyStateVariant = 'no-assets' | 'no-placeholders' | 'no-results';

interface EmptyStateProps {
  variant: EmptyStateVariant;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ variant, title, description, action }: EmptyStateProps) {
  const configs: Record<EmptyStateVariant, { icon: React.ReactNode; defaultTitle: string; defaultDescription: string }> = {
    'no-assets': {
      icon: <Image className="w-16 h-16 text-gray-300" />,
      defaultTitle: 'No assets yet',
      defaultDescription: 'Upload your first asset to get started',
    },
    'no-placeholders': {
      icon: <FileText className="w-16 h-16 text-gray-300" />,
      defaultTitle: 'No placeholders found',
      defaultDescription: 'Create placeholders in the database to start binding assets',
    },
    'no-results': {
      icon: <Search className="w-16 h-16 text-gray-300" />,
      defaultTitle: 'No results found',
      defaultDescription: 'Try adjusting your search or filters',
    },
  };

  const config = configs[variant];

  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
      <div className="mx-auto mb-4">
        {config.icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title || config.defaultTitle}
      </h3>
      <p className="text-gray-600 mb-4">
        {description || config.defaultDescription}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
