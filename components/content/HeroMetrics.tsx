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
        'grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6 sm:gap-x-8 pt-6 border-t border-[var(--color-border)] w-full',
        className
      )}
    >
      {metrics.map((metric, idx) => (
        <div key={idx} className="flex flex-col">
          <span className="font-sans text-[24px] sm:text-[28px] lg:text-[32px] font-semibold text-[var(--color-text)] tabular-nums tracking-tight">
            {metric.value}
          </span>
          <span className="text-[12px] sm:text-[13px] text-[var(--color-text-secondary)] font-normal mt-0.5 whitespace-nowrap">
            {metric.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default HeroMetrics;
