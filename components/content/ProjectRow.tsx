import React from 'react';
import Link from 'next/link';
import { YearRail } from '@/components/content/YearRail';
import { MetaLine } from '@/components/content/MetaLine';
import { cn } from '@/lib/utils';

export interface ProjectRowProps {
  year: string;
  title: string;
  slug: string;
  summary: string;
  meta?: string[];
  className?: string;
}

export function ProjectRow({
  year,
  title,
  slug,
  summary,
  meta,
  className,
}: ProjectRowProps) {
  return (
    <div
      className={cn(
        'group relative py-[24px] md:py-[32px] transition-colors duration-150',
        className
      )}
    >
      <Link
        href={`/work/${slug}`}
        className="block focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-[var(--focus-ring-offset)] rounded-[var(--radius-none)]"
      >
        <div className="flex flex-col md:flex-row md:items-baseline gap-y-2 md:gap-x-[32px]">
          {/* Zone 1: Year Rail (96px desktop) */}
          <YearRail primary={year} />

          {/* Zone 2: Middle (Title + Summary) */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[17px] sm:text-[18px] font-medium text-[var(--color-text)] group-hover:underline underline-offset-[3px] decoration-[var(--color-border-strong)]">
              {title}
            </h3>
            <p className="mt-[6px] text-[14px] sm:text-[15px] leading-[1.5] text-[var(--color-text-secondary)]">
              {summary}
            </p>

            {/* Tablet meta fallback (below middle) */}
            {meta && meta.length > 0 && (
              <div className="mt-[8px] block lg:hidden">
                <MetaLine items={meta} />
              </div>
            )}
          </div>

          {/* Zone 3: Right (Desktop Meta) */}
          {meta && meta.length > 0 && (
            <div className="hidden lg:block shrink-0 max-w-[280px] text-right">
              <MetaLine items={meta} className="justify-end" />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ProjectRow;
