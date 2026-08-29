import React from 'react';
import { cn } from '@/lib/utils';

export interface YearRailProps {
  primary: string;
  secondary?: string;
  className?: string;
}

export function YearRail({ primary, secondary, className }: YearRailProps) {
  return (
    <div
      className={cn(
        'font-mono text-[13px] text-[var(--color-text-muted)] tabular-nums',
        'md:w-[96px] md:shrink-0 md:text-right flex md:flex-col items-baseline md:items-end gap-x-2',
        className
      )}
    >
      <span>{primary}</span>
      {secondary && <span>{secondary}</span>}
    </div>
  );
}

export default YearRail;
