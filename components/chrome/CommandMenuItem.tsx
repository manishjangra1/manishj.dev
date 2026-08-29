'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CommandMenuItemProps {
  id: string;
  label: string;
  hint?: string;
  isActive: boolean;
  onPointer: () => void;
  onRun: () => void;
  className?: string;
}

export function CommandMenuItem({
  id,
  label,
  hint,
  isActive,
  onPointer,
  onRun,
  className,
}: CommandMenuItemProps) {
  return (
    <li
      id={`command-item-${id}`}
      role="option"
      aria-selected={isActive}
      onMouseEnter={onPointer}
      onClick={onRun}
      className={cn(
        'h-[36px] md:h-[40px] px-[12px] flex items-center justify-between gap-4 cursor-pointer select-none rounded-[var(--radius-sm)] transition-colors duration-[100ms]',
        isActive
          ? 'bg-[var(--color-surface-hover)] text-[var(--color-text)]'
          : 'bg-transparent text-[var(--color-text-secondary)]',
        className
      )}
    >
      <span className="text-[13px] md:text-[14px] font-medium truncate">
        {label}
      </span>
      {hint && (
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] shrink-0">
          {hint}
        </span>
      )}
    </li>
  );
}

export default CommandMenuItem;
