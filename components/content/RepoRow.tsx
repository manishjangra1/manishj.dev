import React from 'react';
import { Icon } from '@/components/primitives/Icon';
import { cn } from '@/lib/utils';

export interface RepoRowProps {
  name: string;
  description: string;
  language?: string;
  href: string;
  className?: string;
}

export function RepoRow({
  name,
  description,
  language,
  href,
  className,
}: RepoRowProps) {
  return (
    <div
      className={cn(
        'group py-[20px] md:py-[24px] transition-colors duration-150',
        className
      )}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col md:flex-row md:items-baseline justify-between gap-y-1 md:gap-x-6 focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] rounded-[var(--radius-none)]"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-3 gap-y-1 min-w-0">
          <span className="font-mono text-[14px] font-medium text-[var(--color-text)] group-hover:underline underline-offset-[3px] decoration-[var(--color-border-strong)] inline-flex items-center gap-1.5 shrink-0">
            {name}
            <Icon name="arrow-up-right" size="sm" decorative={true} />
          </span>
          <span className="text-[14px] text-[var(--color-text-secondary)] truncate">
            {description}
          </span>
        </div>

        {language && (
          <span className="hidden md:block font-mono text-[13px] text-[var(--color-text-muted)] shrink-0">
            {language}
          </span>
        )}
      </a>
    </div>
  );
}

export default RepoRow;
