import React from 'react';
import { cn } from '@/lib/utils';

export interface SkipLinkProps {
  className?: string;
  href?: string;
  label?: string;
}

export function SkipLink({
  className,
  href = '#main',
  label = 'Skip to content',
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]',
        'px-4 py-2 text-[14px] font-medium text-[var(--color-text)] bg-[var(--color-bg-elevated)]',
        'border border-[var(--color-border-strong)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)]',
        'focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-[var(--focus-ring-offset)]',
        'transition-colors duration-[150ms]',
        className
      )}
    >
      {label}
    </a>
  );
}

export default SkipLink;
