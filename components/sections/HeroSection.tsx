import React from 'react';
import { Container } from '@/components/primitives/Container';
import { Kicker } from '@/components/primitives/Kicker';
import { Button } from '@/components/primitives/Button';
import { HeroMetrics } from '@/components/content/HeroMetrics';
import { HeroCarousel } from '@/components/content/HeroCarousel';
import { HERO_COPY, HERO_METRICS, SHOWCASE_PROJECTS, type HeroMetric, type FeaturedProjectData } from '@/lib/constants/copy';
import { cn } from '@/lib/utils';

export interface HeroSectionProps {
  kicker?: string;
  name?: string;
  lede?: string;
  availability?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  tertiary?: { label: string; href: string };
  metrics?: HeroMetric[];
  showcaseProjects?: FeaturedProjectData[];
  className?: string;
}

export function HeroSection({
  kicker = HERO_COPY.kicker,
  name = HERO_COPY.name,
  lede = HERO_COPY.lede,
  availability = HERO_COPY.availability,
  primary = HERO_COPY.primaryAction,
  secondary = HERO_COPY.secondaryAction,
  metrics = HERO_METRICS,
  showcaseProjects = SHOWCASE_PROJECTS,
  className,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className={cn(
        'min-h-[calc(100dvh-64px-42px)] pt-2 sm:pt-4 md:pt-6 pb-6 sm:pb-8 md:pb-10 flex flex-col justify-center',
        className
      )}
    >
      <Container well="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-center">
          {/* Left Column: Bio, Actions, Availability & Metrics (6 cols on desktop) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <Kicker>{kicker}</Kicker>

            <h1 className="mt-[12px] text-[36px] sm:text-[48px] md:text-[54px] lg:text-[60px] font-bold leading-[1.05] tracking-[-0.035em] text-[var(--color-text)] text-balance">
              {name}
            </h1>

            <p className="mt-[18px] max-w-[28em] text-[15px] sm:text-[16px] leading-[1.5] text-[var(--color-text-secondary)] text-pretty">
              {lede}
            </p>

            {/* Action Buttons */}
            <div className="mt-[26px] flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <Button
                href={primary.href}
                variant="primary"
                size="md"
                className="w-full sm:w-auto font-medium"
              >
                <span className="inline-flex items-center gap-2.5">
                  <span>{primary.label}</span>
                  <span className="text-[14px] leading-none">↗</span>
                </span>
              </Button>

              <Button
                href={secondary.href}
                variant="secondary"
                size="md"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto font-medium"
              >
                <span className="inline-flex items-center gap-2.5">
                  <span>{secondary.label}</span>
                  <span className="text-[14px] leading-none">⤓</span>
                </span>
              </Button>
            </div>

            {/* Availability Indicator (Monochrome, understated, edgy) */}
            {availability && (
              <div className="mt-[22px] flex items-center gap-2.5 select-none">
                <span className="w-1.5 h-1.5 bg-[var(--color-text-muted)] shrink-0" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
                  {availability}
                </span>
              </div>
            )}

            {/* Key Metrics Bar */}
            <div className="mt-[28px] w-full">
              <HeroMetrics metrics={metrics} />
            </div>
          </div>

          {/* Right Column: 3D Project Showcase Carousel (6 cols on desktop) */}
          <div className="lg:col-span-6 w-full flex justify-center items-center overflow-visible">
            <HeroCarousel projects={showcaseProjects} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
