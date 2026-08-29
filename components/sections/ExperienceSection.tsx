import React from 'react';
import { Container } from '@/components/primitives/Container';
import { Kicker } from '@/components/primitives/Kicker';
import { ExperienceTimeline } from '@/components/content/ExperienceTimeline';
import { EXPERIENCE_ROWS, type ExperienceRowData } from '@/lib/constants/copy';
import { cn } from '@/lib/utils';

export interface ExperienceSectionProps {
  header?: {
    kicker: string;
    title: string;
    actionLabel?: string;
    actionHref?: string;
  };
  roles?: ExperienceRowData[];
  className?: string;
}

export function ExperienceSection({
  header = {
    kicker: 'EXPERIENCE',
    title: 'Where the work happened',
    actionLabel: 'View full timeline',
    actionHref: '/resume',
  },
  roles = EXPERIENCE_ROWS,
  className,
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className={cn(
        'scroll-mt-[80px] py-10 sm:py-12 md:py-14 lg:py-16',
        className
      )}
    >
      <Container well="wide">
        {/* Section Header with Right Action Button */}
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <div className="flex flex-col items-start">
            <Kicker>{header.kicker}</Kicker>
            <h2
              id="experience-title"
              className="mt-[10px] text-[28px] sm:text-[34px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--color-text)] text-balance"
            >
              {header.title}
            </h2>
          </div>

          {header.actionLabel && (
            <a
              href={header.actionHref || '/resume'}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2.5 px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border-strong)]',
                'text-[13px] font-medium text-[var(--color-text)] bg-[var(--color-surface)]/50',
                'hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-secondary)]',
                'transition-all duration-150 shrink-0 focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)]'
              )}
            >
              <span>{header.actionLabel}</span>
              <span className="text-[14px]">↗</span>
            </a>
          )}
        </div>

        {/* Connected Timeline Rail */}
        <div data-reveal className="mt-8 sm:mt-10">
          <ExperienceTimeline roles={roles} />
        </div>
      </Container>
    </section>
  );
}

export default ExperienceSection;
