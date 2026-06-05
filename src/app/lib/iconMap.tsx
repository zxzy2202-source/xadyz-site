import React from 'react';
import {
  Factory,
  Shield,
  Package,
  Globe,
  Receipt,
  Tag,
  FileText,
  Store,
  Truck,
  ShoppingCart,
  Briefcase,
  CheckCircle2,
  Users,
  Settings,
  Printer,
  Box,
  Building2,
  Heart,
  CreditCard,
  ShoppingBag,
  Zap,
  Barcode,
  MapPin,
  Award,
  Palette,
  TrendingUp,
  Clock,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  factory: Factory,
  shield: Shield,
  package: Package,
  globe: Globe,
  receipt: Receipt,
  tag: Tag,
  file: FileText,
  store: Store,
  truck: Truck,
  cart: ShoppingCart,
  briefcase: Briefcase,
  users: Users,
  settings: Settings,
  printer: Printer,
  box: Box,
  building: Building2,
  heart: Heart,
  creditCard: CreditCard,
  shoppingBag: ShoppingBag,
  zap: Zap,
  barcode: Barcode,
  mapPin: MapPin,
  checkCircle2: CheckCircle2,
  check: CheckCircle2,
  award: Award,
  palette: Palette,
  trending: TrendingUp,
  trendingUp: TrendingUp,
  clock: Clock,
};

const defaultClassName = 'text-blue-600';

/**
 * Renders an icon by name. Used across landing, products, and application pages.
 */
export function getIcon(iconName: string, size: number = 32, className?: string): React.ReactNode {
  const Icon = iconMap[iconName] || Package;
  return <Icon size={size} className={className ?? defaultClassName} />;
}
