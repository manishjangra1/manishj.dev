import React from 'react';
import { cn } from '@/lib/utils';

export interface ActivityStatProps {
  count: number;
  caption: string;
  className?: string;
}

export function ActivityStat({
  count,
  caption,
  className,
}: ActivityStatProps) {
  const formattedCount = new Intl.NumberFormat('en-US').format(count);

  return (
    <div className={cn('flex flex-col', className)}>
      <span className="font-sans text-[24px] sm:text-[28px] font-medium leading-none tracking-tight text-[var(--color-text)] tabular-nums">
        {formattedCount}
      </span>
      <span className="mt-[6px] text-[14px] text-[var(--color-text-secondary)]">
        {caption}
      </span>
    </div>
  );
}

export default ActivityStat;
