import React from 'react';
import { cn } from '@/lib/utils';

export interface MetaLineProps {
  items: string[];
  separator?: 'middot' | 'gap';
  className?: string;
}

export function MetaLine({
  items,
  separator = 'middot',
  className,
}: MetaLineProps) {
  if (!items || items.length === 0) return null;

  return (
    <p
      className={cn(
        'font-mono text-[12px] md:text-[13px] text-[var(--color-text-muted)] flex flex-wrap items-center gap-y-1',
        separator === 'gap' ? 'gap-x-4' : 'gap-x-2',
        className
      )}
    >
      {items.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          {index > 0 && separator === 'middot' && (
            <span aria-hidden="true" className="select-none text-[var(--color-border-strong)]">
              ·
            </span>
          )}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </p>
  );
}

export default MetaLine;
