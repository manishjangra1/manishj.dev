import React from 'react';
import { Kicker } from '@/components/primitives/Kicker';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  kicker: string;
  title: string;
  titleId: string;
  support?: string;
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  titleId,
  support,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <Kicker>{kicker}</Kicker>
      <h2
        id={titleId}
        className="mt-[12px] text-[24px] sm:text-[28px] md:text-[32px] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--color-text)] text-balance"
      >
        {title}
      </h2>
      {support && (
        <p className="mt-[16px] max-w-[40em] text-[15px] sm:text-[16px] leading-[1.5] text-[var(--color-text-secondary)] text-pretty">
          {support}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
