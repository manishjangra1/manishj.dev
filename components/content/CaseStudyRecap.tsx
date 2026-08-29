import React from 'react';
import Link from 'next/link';
import { Kicker } from '@/components/primitives/Kicker';
import { cn } from '@/lib/utils';

export interface CaseStudyRecapProps {
  kicker: string;
  title: string;
  lede: string;
  meta: string[];
  liveUrl?: string;
  repoUrl?: string;
  className?: string;
}

export function CaseStudyRecap({
  kicker,
  title,
  lede,
  meta,
  liveUrl,
  repoUrl,
  className,
}: CaseStudyRecapProps) {
  return (
    <div className={cn('flex flex-col items-start w-full', className)}>
      {/* Back Breadcrumb */}
      <Link
        href="/#work"
        className={cn(
          'inline-flex items-center gap-2 mb-3 sm:mb-4 text-[13px] font-mono text-[var(--color-text-muted)]',
          'hover:text-[var(--color-text)] transition-colors'
        )}
      >
        <span>←</span>
        <span>Back to all projects</span>
      </Link>

      {/* Kicker */}
      <Kicker>{kicker}</Kicker>

      {/* Main Title */}
      <h1 className="mt-3 text-[36px] sm:text-[48px] md:text-[56px] font-bold leading-[1.08] tracking-[-0.035em] text-[var(--color-text)] text-balance">
        {title}
      </h1>

      {/* Lede Summary */}
      <p className="mt-4 text-[17px] sm:text-[19px] md:text-[21px] leading-[1.5] text-[var(--color-text-secondary)] text-pretty max-w-3xl">
        {lede}
      </p>

      {/* Meta Badges & Action Buttons Bar */}
      <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        {/* Tech / Role Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {meta.map((tag) => (
            <span
              key={tag}
              className={cn(
                'px-2.5 py-1 text-[12px] font-mono text-[var(--color-text-secondary)]',
                'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-none'
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-3 shrink-0">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-none border border-[var(--color-border-strong)]',
                'text-[13px] font-medium text-[var(--color-text)] bg-[var(--color-surface)]/60',
                'hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-secondary)]',
                'transition-all duration-150 focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)]'
              )}
            >
              <span>Live Preview</span>
              <span className="text-[14px]">↗</span>
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-none border border-[var(--color-border-strong)]',
                'text-[13px] font-medium text-[var(--color-text)] bg-[var(--color-surface)]/60',
                'hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-secondary)]',
                'transition-all duration-150 focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)]'
              )}
            >
              <span>Source Code</span>
              <span className="text-[14px]">↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CaseStudyRecap;

