import React from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

export type BadgeVariant = 
  | 'approved' 
  | 'pending' 
  | 'rejected'
  | 'missing' 
  | 'replaced'
  | 'banner'
  | 'factory'
  | 'product'
  | 'material'
  | 'qc'
  | 'packaging'
  | 'container'
  | 'document'
  | 'hero'
  | 'icon';

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  showIcon?: boolean;
  className?: string;
}

export function Badge({ variant, label, showIcon = true, className = '' }: BadgeProps) {
  const configs: Record<BadgeVariant, { bg: string; text: string; icon?: React.ReactNode; defaultLabel: string }> = {
    // Status badges
    approved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: <CheckCircle className="w-3 h-3" />,
      defaultLabel: 'Approved',
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: <Clock className="w-3 h-3" />,
      defaultLabel: 'Pending',
    },
    rejected: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: <XCircle className="w-3 h-3" />,
      defaultLabel: 'Rejected',
    },
    missing: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: <AlertCircle className="w-3 h-3" />,
      defaultLabel: 'Missing',
    },
    replaced: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: <CheckCircle className="w-3 h-3" />,
      defaultLabel: 'Replaced',
    },
    
    // Type badges
    banner: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      defaultLabel: 'banner',
    },
    factory: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      defaultLabel: 'factory',
    },
    product: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-800',
      defaultLabel: 'product',
    },
    material: {
      bg: 'bg-teal-100',
      text: 'text-teal-800',
      defaultLabel: 'material',
    },
    qc: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      defaultLabel: 'qc',
    },
    packaging: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      defaultLabel: 'packaging',
    },
    container: {
      bg: 'bg-sky-100',
      text: 'text-sky-800',
      defaultLabel: 'container',
    },
    document: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      defaultLabel: 'document',
    },
    hero: {
      bg: 'bg-pink-100',
      text: 'text-pink-800',
      defaultLabel: 'hero',
    },
    icon: {
      bg: 'bg-cyan-100',
      text: 'text-cyan-800',
      defaultLabel: 'icon',
    },
  };

  const config = configs[variant];
  const displayLabel = label || config.defaultLabel;

  return (
    <span 
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text} ${className}`}
    >
      {showIcon && config.icon}
      {displayLabel}
    </span>
  );
}
