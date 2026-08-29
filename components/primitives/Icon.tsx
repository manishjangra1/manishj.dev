import React from 'react';
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Copy,
  Check,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type IconName =
  | 'search'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'x'
  | 'copy'
  | 'check'
  | 'arrow-up-right'
  | 'arrow-left'
  | 'arrow-right';

export interface IconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  decorative?: boolean;
  className?: string;
}

const iconMap: Record<IconName, LucideIcon> = {
  search: Search,
  sun: Sun,
  moon: Moon,
  menu: Menu,
  x: X,
  copy: Copy,
  check: Check,
  'arrow-up-right': ArrowUpRight,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
};

const sizeMap = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

export function Icon({
  name,
  size = 'md',
  decorative = true,
  className,
}: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  const pixelSize = sizeMap[size];

  return (
    <IconComponent
      size={pixelSize}
      strokeWidth={1.5}
      aria-hidden={decorative ? 'true' : undefined}
      className={cn('inline-block shrink-0 text-current', className)}
    />
  );
}

export default Icon;
