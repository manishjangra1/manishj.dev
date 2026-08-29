import React from 'react';
import { Container } from '@/components/primitives/Container';
import { Kicker } from '@/components/primitives/Kicker';
import { CapabilityGroup, type CapabilityGroupProps } from '@/components/content/CapabilityGroup';
import { CAPABILITY_GROUPS } from '@/lib/constants/copy';
import { cn } from '@/lib/utils';

export interface CapabilitiesSectionProps {
  header?: {
    kicker: string;
    title: string;
    support?: string;
    actionLabel?: string;
    actionHref?: string;
  };
  groups?: CapabilityGroupProps[];
  className?: string;
}

export function CapabilitiesSection({
  header = {
    kicker: 'CAPABILITIES',
    title: 'The tools I actually ship with.',
    support: 'Production technologies used to build reliable user interfaces, server runtimes, and databases.',
    actionLabel: 'View GitHub profile',
    actionHref: 'https://github.com/manishjangra1',
  },
  groups = CAPABILITY_GROUPS,
  className,
}: CapabilitiesSectionProps) {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
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
              id="capabilities-title"
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

          {header.actionLabel && (
            <a
              href={header.actionHref || 'https://github.com/manishjangra1'}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2.5 px-4 py-2 rounded-none border border-[var(--color-border-strong)]',
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

        {/* 3-Column Capability Cards Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {groups.map((group, idx) => (
            <div
              key={group.label}
              data-reveal
              data-stagger={idx + 1}
              className="h-full"
            >
              <CapabilityGroup {...group} index={idx} className="h-full" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CapabilitiesSection;

