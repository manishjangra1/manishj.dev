'use client';

import React from 'react';
import { Icon, type IconName } from '@/components/primitives/Icon';
import { cn } from '@/lib/utils';

export interface IconButtonProps {
  label: string;
  icon: IconName;
  size?: 'sm' | 'md';
  pressed?: boolean;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function IconButton({
  label,
  icon,
  size = 'md',
  pressed,
  onPress,
  disabled = false,
  className,
  type = 'button',
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      aria-pressed={pressed !== undefined ? pressed : undefined}
      disabled={disabled}
      onClick={onPress}
      className={cn(
        'relative inline-flex items-center justify-center transition-colors duration-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        'rounded-[var(--radius-md)] text-[var(--color-text-secondary)]',
        'hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]',
        'active:bg-[var(--color-surface)]',
        'focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-[var(--focus-ring-offset)]',
        'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[var(--color-text-secondary)]',
        size === 'md' && 'h-[40px] w-[40px] min-h-[40px] min-w-[40px]',
        size === 'sm' && 'h-[32px] w-[32px] before:absolute before:-inset-[4px] before:content-[""]',
        className
      )}
    >
      <Icon name={icon} size={size === 'sm' ? 'sm' : 'md'} decorative={true} />
    </button>
  );
}

export default IconButton;
