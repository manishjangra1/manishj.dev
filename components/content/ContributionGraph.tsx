import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

export interface ContributionGraphProps {
  weeks: number[][]; // Array of 7-day contribution level buckets (0-4)
  className?: string;
}

const LEVEL_COLORS = [
  'bg-[var(--color-contrib-0)] border border-[var(--color-contrib-0-border)]',
  'bg-[var(--color-contrib-1)] border border-[var(--color-contrib-1-border)]',
  'bg-[var(--color-contrib-2)] border border-[var(--color-contrib-2-border)]',
  'bg-[var(--color-contrib-3)] border border-[var(--color-contrib-3-border)]',
  'bg-[var(--color-contrib-4)] border border-[var(--color-contrib-4-border)] shadow-[0_0_8px_rgba(255,255,255,0.25)] dark:shadow-[0_0_8px_rgba(255,255,255,0.4)]',
];

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export function ContributionGraph({
  weeks,
  className,
}: ContributionGraphProps) {
  // Ensure we have a valid weeks array; if empty, fallback to 52 empty weeks
  const displayWeeks = weeks && weeks.length > 0
    ? weeks
    : Array.from({ length: 52 }, () => Array(7).fill(0));

  // Compute month positions across the 52-week window without overlaps
  const monthMap = useMemo(() => {
    const map = new Map<number, string>();
    const now = new Date();
    let lastMonth = -1;
    let lastRenderedWeek = -99;

    // First pass: identify month start week indices
    const monthStarts: Array<{ weekIndex: number; month: number; label: string }> = [];
    for (let w = 0; w < displayWeeks.length; w++) {
      const weekDate = new Date(now.getTime() - (displayWeeks.length - 1 - w) * 7 * 24 * 60 * 60 * 1000);
      const month = weekDate.getMonth();
      if (month !== lastMonth) {
        const monthName = weekDate.toLocaleString('en-US', { month: 'short' });
        const label = month === 0 ? `${monthName} '${weekDate.getFullYear().toString().slice(2)}` : monthName;
        monthStarts.push({ weekIndex: w, month, label });
        lastMonth = month;
      }
    }

    // Second pass: filter out month labels that would collide (need at least 3 weeks gap)
    for (let i = 0; i < monthStarts.length; i++) {
      const current = monthStarts[i];
      const next = monthStarts[i + 1];

      // If next month starts in < 3 weeks, skip this short partial month to avoid collision
      if (next && next.weekIndex - current.weekIndex < 3) {
        continue;
      }

      if (current.weekIndex - lastRenderedWeek >= 3) {
        map.set(current.weekIndex, current.label);
        lastRenderedWeek = current.weekIndex;
      }
    }

    return map;
  }, [displayWeeks.length]);

  return (
    <div className={cn('w-full overflow-x-auto select-none py-1 scrollbar-thin scrollbar-thumb-[var(--color-border)]', className)}>
      <div className="min-w-[720px] w-full flex flex-col gap-2">
        {/* Month Labels Header */}
        <div className="flex items-center">
          {/* Spacer for day label column */}
          <div className="w-7 shrink-0" />
          {/* Month column track */}
          <div className="flex-1 flex gap-[3px] text-[11px] font-mono text-[var(--color-text-muted)] h-4 relative">
            {displayWeeks.map((_, weekIndex) => {
              const monthLabel = monthMap.get(weekIndex);
              return (
                <div key={weekIndex} className="flex-1 min-w-[8px] max-w-[14px] relative">
                  {monthLabel && (
                    <span className="absolute left-0 top-0 whitespace-nowrap">
                      {monthLabel}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Heatmap Grid with Day Labels on Left */}
        <div className="flex gap-2 items-start">
          {/* Day of Week Labels */}
          <div className="w-7 shrink-0 flex flex-col gap-[3px]">
            {DAY_LABELS.map((day, idx) => (
              <div
                key={idx}
                className="w-full aspect-square min-w-[8px] min-h-[8px] max-w-[14px] max-h-[14px] flex items-center justify-start text-[10px] font-mono text-[var(--color-text-muted)] leading-none"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 52/53 Weeks Matrix */}
          <div className="flex-1 flex gap-[3px]">
            {displayWeeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex-1 flex flex-col gap-[3px]"
              >
                {week.map((level, dayIndex) => {
                  const clampedLevel = Math.min(Math.max(0, level), 4);
                  const colorClass = LEVEL_COLORS[clampedLevel];

                  return (
                    <div
                      key={dayIndex}
                      className={cn(
                        'w-full aspect-square min-w-[8px] min-h-[8px] max-w-[14px] max-h-[14px] rounded-none transition-colors duration-150',
                        colorClass
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContributionGraph;


