import React from 'react';
import { Container } from '@/components/primitives/Container';
import { Kicker } from '@/components/primitives/Kicker';
import { ContributionGraph } from '@/components/content/ContributionGraph';
import { STATIC_CONTRIBUTION_WEEKS, STATIC_REPOS, type RepoRowData } from '@/lib/constants/copy';
import { cn } from '@/lib/utils';

export interface ActivitySectionProps {
  header?: {
    kicker: string;
    title: string;
    support?: string;
    actionLabel?: string;
    actionHref?: string;
  };
  status?: 'ready' | 'error';
  count?: number;
  caption?: string;
  weeks?: number[][];
  profileUrl?: string;
  repos?: RepoRowData[];
  className?: string;
}

export function ActivitySection({
  header = {
    kicker: 'ACTIVITY',
    title: 'Recent work on GitHub.',
    support: 'Open source contributions and engineering activity.',
    actionLabel: 'View GitHub profile',
    actionHref: 'https://github.com/manishjangra1',
  },
  status = 'ready',
  count = 759,
  caption = 'contributions in the last year',
  weeks = STATIC_CONTRIBUTION_WEEKS,
  profileUrl = 'https://github.com/manishjangra1',
  repos = STATIC_REPOS,
  className,
}: ActivitySectionProps) {
  const isError = status === 'error';
  const effectiveProfileUrl = header.actionHref || profileUrl || 'https://github.com/manishjangra1';

  return (
    <section
      id="activity"
      aria-labelledby="activity-title"
      className={cn(
        'scroll-mt-[80px] py-10 sm:py-12 md:py-14 lg:py-16',
        className
      )}
    >
      <Container well="wide">
        {/* 1. Standard Section Header with Right Action Button */}
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <div className="flex flex-col items-start">
            <Kicker>{header.kicker}</Kicker>
            <h2
              id="activity-title"
              className="mt-[10px] text-[28px] sm:text-[34px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--color-text)] text-balance"
            >
              {header.title}
            </h2>
            {header.support && (
              <p className="mt-2 text-[14px] sm:text-[15px] text-[var(--color-text-secondary)] max-w-xl">
                {header.support}
              </p>
            )}
          </div>

          <a
            href={effectiveProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2.5 px-4 py-2 rounded-none border border-[var(--color-border-strong)]',
              'text-[13px] font-medium text-[var(--color-text)] bg-[var(--color-surface)]/50',
              'hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-secondary)]',
              'transition-all duration-150 shrink-0 focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)]'
            )}
          >
            <span>{header.actionLabel || 'View GitHub profile'}</span>
            <span className="text-[14px]">↗</span>
          </a>
        </div>

        {/* 2. Main GitHub Heatmap Dashboard Card */}
        {!isError && (
          <div
            data-reveal
            className="mt-8 sm:mt-10 bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none transition-all duration-200"
          >
            {/* Card Header: Stat + Heatmap Legend */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
              <div>
                <div className="text-[28px] sm:text-[36px] font-bold tracking-tight text-[var(--color-text)] tabular-nums leading-none">
                  {count.toLocaleString()}
                </div>
                <p className="text-[13px] sm:text-[14px] text-[var(--color-text-secondary)] mt-1.5 font-medium">
                  {caption}
                </p>
              </div>

              {/* Heatmap Legend + Year Range */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="hidden sm:inline-flex items-center px-2.5 py-1 text-[11px] font-mono text-[var(--color-text-secondary)] border border-[var(--color-border)] bg-[var(--color-surface)]/50 rounded-none">
                  {new Date(Date.now() - 364 * 24 * 60 * 60 * 1000).getFullYear()} – {new Date().getFullYear()}
                </div>

                <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-muted)] select-none">
                  <span>Less</span>
                  <div className="flex items-center gap-[3px]">
                    <span className="w-[10px] h-[10px] bg-[var(--color-contrib-0)] border border-[var(--color-contrib-0-border)] rounded-none inline-block" />
                    <span className="w-[10px] h-[10px] bg-[var(--color-contrib-1)] border border-[var(--color-contrib-1-border)] rounded-none inline-block" />
                    <span className="w-[10px] h-[10px] bg-[var(--color-contrib-2)] border border-[var(--color-contrib-2-border)] rounded-none inline-block" />
                    <span className="w-[10px] h-[10px] bg-[var(--color-contrib-3)] border border-[var(--color-contrib-3-border)] rounded-none inline-block" />
                    <span className="w-[10px] h-[10px] bg-[var(--color-contrib-4)] border border-[var(--color-contrib-4-border)] rounded-none inline-block" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Heatmap Canvas */}
            <div className="pt-6">
              <ContributionGraph weeks={weeks} />
            </div>
          </div>
        )}

        {/* 3. Pinned Repositories 3-Column Grid */}
        {!isError && repos && repos.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[12px] font-mono uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                Pinned Repositories
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {repos.map((repo, idx) => (
                <a
                  key={repo.name}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal
                  data-stagger={Math.min(idx + 1, 4)}
                  className={cn(
                    'group bg-[var(--color-card)] border border-[var(--color-border)] p-5 sm:p-6 rounded-none',
                    'hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]',
                    'transition-all duration-150 flex flex-col justify-between min-h-[160px]',
                    'focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)]'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[14px] font-semibold text-[var(--color-text)] group-hover:text-white transition-colors truncate">
                        {repo.name}
                      </span>
                      <span className="text-[14px] text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0">
                        ↗
                      </span>
                    </div>
                    <p className="text-[13px] text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                      {repo.description}
                    </p>
                  </div>

                  {repo.language && (
                    <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-none bg-[var(--color-text-secondary)]" />
                      <span className="font-mono text-[12px] text-[var(--color-text-muted)]">
                        {repo.language}
                      </span>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Fallback state if error */}
        {isError && (
          <div className="mt-8 p-8 border border-[var(--color-border)] bg-[var(--color-card)] text-center rounded-none">
            <p className="text-[14px] text-[var(--color-text-secondary)]">
              GitHub activity is temporarily unavailable. View open source projects directly on{' '}
              <a
                href={effectiveProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text)] underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

export default ActivitySection;

