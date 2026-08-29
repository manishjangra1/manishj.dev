import React from 'react';
import { YearRail } from '@/components/content/YearRail';
import { cn } from '@/lib/utils';

export interface ExperienceRowProps {
  startYear: string;
  endYear: string;
  role: string;
  company: string;
  location?: string;
  summary: string;
  current?: boolean;
  className?: string;
}

export function ExperienceRow({
  startYear,
  endYear,
  role,
  company,
  location,
  summary,
  className,
}: ExperienceRowProps) {
  const dateString = `${startYear} – ${endYear}`;

  return (
    <div className={cn('py-[24px] md:py-[32px]', className)}>
      <div className="flex flex-col md:flex-row md:items-baseline gap-y-2 md:gap-x-[32px]">
        {/* Zone 1: Year Rail (96px desktop) */}
        <YearRail primary={dateString} />

        {/* Zone 2: Middle (Role · Company + Summary) */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h3 className="text-[17px] sm:text-[18px] font-medium text-[var(--color-text)]">
              {role}
            </h3>
            <span aria-hidden="true" className="text-[var(--color-border-strong)]">
              ·
            </span>
            <span className="text-[16px] sm:text-[17px] text-[var(--color-text-secondary)]">
              {company}
            </span>
          </div>

          <p className="mt-[6px] max-w-[48em] text-[14px] sm:text-[15px] leading-[1.5] text-[var(--color-text-secondary)]">
            {summary}
          </p>

          {/* Location on mobile/tablet */}
          {location && (
            <p className="mt-[6px] block lg:hidden font-mono text-[12px] text-[var(--color-text-muted)]">
              {location}
            </p>
          )}
        </div>

        {/* Zone 3: Right (Location on Desktop) */}
        {location && (
          <div className="hidden lg:block shrink-0 max-w-[240px] text-right font-mono text-[13px] text-[var(--color-text-muted)]">
            {location}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExperienceRow;
