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
  };
  roles?: ExperienceRowData[];
  className?: string;
}

export function ExperienceSection({
  header = {
    kicker: 'EXPERIENCE',
    title: 'Where the work happened',
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
        {/* Section Header */}
        <div data-reveal className="flex flex-col items-start pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <Kicker>{header.kicker}</Kicker>
          <h2
            id="experience-title"
            className="mt-[10px] text-[28px] sm:text-[34px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--color-text)] text-balance"
          >
            {header.title}
          </h2>
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
