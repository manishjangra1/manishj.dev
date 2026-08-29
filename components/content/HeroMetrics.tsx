import React from 'react';
import { cn } from '@/lib/utils';
import type { HeroMetric } from '@/lib/constants/copy';

export interface HeroMetricsProps {
  metrics: HeroMetric[];
  className?: string;
}

export function HeroMetrics({ metrics, className }: HeroMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div
      className={cn(
        'grid grid-cols-4 gap-x-2.5 sm:gap-x-6 md:gap-x-8 pt-4 sm:pt-6 border-t border-[var(--color-border)] w-full',
        className
      )}
    >
      {metrics.map((metric, idx) => (
        <div key={idx} className="flex flex-col min-w-0">
          <span className="font-sans text-[18px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[var(--color-text)] tabular-nums tracking-tight leading-none">
            {metric.value}
          </span>
          <span className="text-[9px] sm:text-[11px] md:text-[13px] text-[var(--color-text-secondary)] font-normal mt-1 leading-tight">
            {metric.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default HeroMetrics;
