import React from 'react';
import { cn } from '@/lib/utils';
import type { ExperienceRowData } from '@/lib/constants/copy';

export interface ExperienceTimelineProps {
  roles: ExperienceRowData[];
  className?: string;
}

export function ExperienceTimeline({ roles, className }: ExperienceTimelineProps) {
  if (!roles || roles.length === 0) return null;

  return (
    <div className={cn('relative flex flex-col', className)}>
      {roles.map((role, idx) => {
        const isLast = idx === roles.length - 1;
        const dateRange = `${role.startYear} – ${role.endYear}`;

        return (
          <div
            key={`${role.company}-${idx}`}
            className="relative flex gap-6 sm:gap-8 pb-10 sm:pb-12 last:pb-0 group"
          >
            {/* Left Timeline Rail & Node */}
            <div className="relative flex flex-col items-center shrink-0 w-4 pt-1.5">
              {/* Square Node Indicator */}
              <div className="w-3 h-3 border-2 border-[var(--color-border-strong)] bg-[var(--color-bg)] group-hover:border-[var(--color-text)] group-hover:scale-110 transition-all z-10" />

              {/* Connecting Vertical Line */}
              {!isLast && (
                <div className="w-[1px] bg-[var(--color-border)] absolute top-5 bottom-0 left-1/2 -translate-x-1/2" />
              )}
            </div>

            {/* Timeline Content Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-y-3 lg:gap-x-6 items-start">
              {/* Date Column (2.5 cols on desktop) */}
              <div className="lg:col-span-3 font-mono text-[13px] text-[var(--color-text-muted)] pt-0.5 tabular-nums">
                {dateRange}
              </div>

              {/* Role, Company & Summary (6.5 cols on desktop) */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="text-[16px] sm:text-[18px] font-semibold text-[var(--color-text)]">
                    {role.role}
                  </h3>
                  <span className="text-[var(--color-border-strong)]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-[15px] sm:text-[16px] text-[var(--color-text-secondary)]">
                    {role.company}
                  </span>
                </div>

                <p className="mt-2 text-[13px] sm:text-[14px] leading-[1.55] text-[var(--color-text-secondary)]">
                  {role.summary}
                </p>
              </div>

              {/* Tech Stack Badges (3 cols on desktop) */}
              <div className="lg:col-span-3 flex flex-wrap lg:justify-end gap-1.5 pt-1">
                {role.tags && role.tags.length > 0 ? (
                  role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-[var(--radius-sm)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] font-medium text-[var(--color-text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="font-mono text-[12px] text-[var(--color-text-muted)]">
                    {role.location || 'Engineering'}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ExperienceTimeline;
