import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/primitives/Container';
import { cn } from '@/lib/utils';

export interface CaseStudyPagerProps {
  prev?: {
    title: string;
    slug: string;
  };
  next?: {
    title: string;
    slug: string;
  };
  className?: string;
}

export function CaseStudyPager({ prev, next, className }: CaseStudyPagerProps) {
  return (
    <nav
      aria-label="Case study pagination"
      className={cn('w-full pt-6 sm:pt-8 pb-4 sm:pb-6 border-t border-[var(--color-border)]', className)}
    >
      <Container well="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous Project Card */}
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className={cn(
                'group flex flex-col p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-none',
                'hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]',
                'transition-all duration-150'
              )}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                <span>←</span>
                <span>Previous Project</span>
              </span>
              <span className="text-[17px] sm:text-[19px] font-bold text-[var(--color-text)] group-hover:text-[var(--color-text)]">
                {prev.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/#work"
              className={cn(
                'group flex flex-col p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-none',
                'hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]',
                'transition-all duration-150'
              )}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                <span>←</span>
                <span>Portfolio</span>
              </span>
              <span className="text-[17px] sm:text-[19px] font-bold text-[var(--color-text)]">
                Back to all projects
              </span>
            </Link>
          )}

          {/* Next Project Card */}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className={cn(
                'group flex flex-col sm:items-end sm:text-right p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-none',
                'hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]',
                'transition-all duration-150'
              )}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                <span>Next Project</span>
                <span>→</span>
              </span>
              <span className="text-[17px] sm:text-[19px] font-bold text-[var(--color-text)] group-hover:text-[var(--color-text)]">
                {next.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/#contact"
              className={cn(
                'group flex flex-col sm:items-end sm:text-right p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-none',
                'hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]',
                'transition-all duration-150'
              )}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                <span>Collaborate</span>
                <span>→</span>
              </span>
              <span className="text-[17px] sm:text-[19px] font-bold text-[var(--color-text)]">
                Get in touch
              </span>
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
}

export default CaseStudyPager;

