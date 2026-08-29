import React from 'react';
import { Container } from '@/components/primitives/Container';
import { SectionHeader } from '@/components/content/SectionHeader';
import { Portrait } from '@/components/content/Portrait';
import { ABOUT_PARAGRAPHS } from '@/lib/constants/copy';
import { cn } from '@/lib/utils';

export interface AboutSectionProps {
  header?: {
    kicker: string;
    title: string;
    support?: string;
  };
  paragraphs?: string[];
  portrait?: {
    src: string;
    alt: string;
  };
  className?: string;
}

export function AboutSection({
  header = {
    kicker: 'About',
    title: 'Background, systems, and product thinking.',
    support: 'How I design and implement reliable software.',
  },
  paragraphs = ABOUT_PARAGRAPHS,
  portrait = {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=640&auto=format&fit=crop',
    alt: 'Manish Jangra',
  },
  className,
}: AboutSectionProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      data-reveal
      className={cn(
        'scroll-mt-[80px] py-10 sm:py-12 md:py-14 lg:py-16',
        className
      )}
    >
      <Container well="page">
        <SectionHeader
          kicker={header.kicker}
          title={header.title}
          titleId="about-title"
          support={header.support}
        />

        <div className="mt-[32px] md:mt-[48px] flex flex-col lg:flex-row gap-y-[32px] gap-x-[64px] items-start">
          {/* Portrait plate */}
          {portrait && (
            <div className="w-full max-w-[280px] lg:max-w-[320px] shrink-0">
              <Portrait src={portrait.src} alt={portrait.alt} />
            </div>
          )}

          {/* Prose Column */}
          <div className="flex-1 max-w-[720px] flex flex-col gap-[16px]">
            {paragraphs.map((p, index) => (
              <p
                key={index}
                className={cn(
                  'leading-[1.6] text-[var(--color-text-secondary)] text-pretty',
                  index === 0
                    ? 'text-[16px] sm:text-[17px] lg:text-[18px] text-[var(--color-text)]'
                    : 'text-[15px] sm:text-[16px]'
                )}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
