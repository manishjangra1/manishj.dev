import React from 'react';
import { Container } from '@/components/primitives/Container';
import { Kicker } from '@/components/primitives/Kicker';
import { ProjectCard } from '@/components/content/ProjectCard';
import { PROJECT_ROWS, type ProjectRowData } from '@/lib/constants/copy';
import { cn } from '@/lib/utils';

export interface WorkSectionProps {
  header?: {
    kicker: string;
    title: string;
    actionLabel?: string;
    actionHref?: string;
  };
  projects?: ProjectRowData[];
  className?: string;
}

export function WorkSection({
  header = {
    kicker: 'SELECTED WORK',
    title: "Products I've designed and shipped",
    actionLabel: 'View all projects',
    actionHref: '/work',
  },
  projects = PROJECT_ROWS,
  className,
}: WorkSectionProps) {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className={cn(
        'hidden md:block scroll-mt-[80px] py-10 sm:py-12 md:py-14 lg:py-16',
        className
      )}
    >
      <Container well="wide">
        {/* Section Header with Right Action Button */}
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <div className="flex flex-col items-start">
            <Kicker>{header.kicker}</Kicker>
            <h2
              id="work-title"
              className="mt-[10px] text-[28px] sm:text-[34px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--color-text)] text-balance"
            >
              {header.title}
            </h2>
          </div>

          {header.actionLabel && (
            <a
              href={header.actionHref || '#'}
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

        {/* 3-Column Project Cards Grid */}
        {projects && projects.length > 0 && (
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, idx) => (
              <div
                key={project.slug}
                data-reveal
                data-stagger={Math.min(idx + 1, 4)}
                className="h-full"
              >
                <ProjectCard {...project} className="h-full" />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default WorkSection;
