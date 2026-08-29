'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/primitives/Icon';
import type { ExperienceRowData } from '@/lib/constants/copy';

const VISIBLE_BULLETS = 5;

export interface ExperienceTimelineProps {
  roles: ExperienceRowData[];
  className?: string;
}

/**
 * A single experience role card with expandable bullet list.
 */
function ExperienceRoleCard({ role }: { role: ExperienceRowData }) {
  const bullets = role.bullets ?? (role.summary ? [role.summary] : []);
  const hasOverflow = bullets.length > VISIBLE_BULLETS;
  const [expanded, setExpanded] = useState(false);

  const visibleBullets = expanded ? bullets : bullets.slice(0, VISIBLE_BULLETS);

  return (
    <div className="flex flex-col">
      {/* Role & Company */}
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

      {/* Bullet Points */}
      {bullets.length > 0 && (
        <ul className="mt-2.5 space-y-1.5">
          {visibleBullets.map((bullet, bIdx) => (
            <li
              key={bIdx}
              className="flex items-start gap-2.5 text-[13px] sm:text-[14px] leading-[1.55] text-[var(--color-text-secondary)]"
            >
              <span
                className="mt-[7px] shrink-0 w-1 h-1 bg-[var(--color-text-muted)]"
                aria-hidden="true"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Expand / Collapse Toggle */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={cn(
            'mt-2 inline-flex items-center gap-1.5 text-[12px] font-mono font-medium',
            'text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-focus)] rounded-none px-1 -ml-1'
          )}
          aria-expanded={expanded}
        >
          <Icon
            name="chevron-down"
            size="sm"
            decorative
            className={cn(
              'transition-transform duration-200',
              expanded && 'rotate-180'
            )}
          />
          <span>
            {expanded
              ? 'Show less'
              : `Show ${bullets.length - VISIBLE_BULLETS} more`}
          </span>
        </button>
      )}
    </div>
  );
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
              {/* Date Column */}
              <div className="lg:col-span-3 font-mono text-[13px] text-[var(--color-text-muted)] pt-0.5 tabular-nums">
                {dateRange}
              </div>

              {/* Role, Company & Bullets */}
              <div className="lg:col-span-6">
                <ExperienceRoleCard role={role} />
              </div>

              {/* Location / Tags */}
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
