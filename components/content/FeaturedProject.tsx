import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/primitives/Container';
import { Kicker } from '@/components/primitives/Kicker';
import { MetaLine } from '@/components/content/MetaLine';
import { TextLink } from '@/components/primitives/TextLink';
import { Plate } from '@/components/content/Plate';
import { cn } from '@/lib/utils';

export interface FeaturedProjectProps {
  kicker: string;
  title: string;
  slug: string;
  lede: string;
  meta: string[];
  imageSrc: string;
  imageAlt: string;
  liveUrl?: string;
  repoUrl?: string;
  status?: 'shipped' | 'in-progress';
  className?: string;
}

export function FeaturedProject({
  kicker,
  title,
  slug,
  lede,
  meta,
  imageSrc,
  imageAlt,
  liveUrl,
  repoUrl,
  status,
  className,
}: FeaturedProjectProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* 1. Text Block (container.page) */}
      <Container well="page">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Kicker>{kicker}</Kicker>
            {status === 'in-progress' && (
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
                In progress
              </span>
            )}
          </div>

          <h3 className="mt-[12px] text-[24px] sm:text-[28px] md:text-[32px] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--color-text)] text-balance">
            <Link
              href={`/work/${slug}`}
              className="hover:underline underline-offset-[4px] decoration-[var(--color-border-strong)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] rounded-[var(--radius-none)]"
            >
              {title}
            </Link>
          </h3>

          <p className="mt-[16px] max-w-[48em] text-[16px] sm:text-[17px] leading-[1.5] text-[var(--color-text-secondary)] text-pretty">
            {lede}
          </p>

          <div className="mt-[16px] flex flex-wrap items-center justify-between gap-y-3">
            <MetaLine items={meta} separator="middot" />
            <div className="flex items-center gap-4">
              {liveUrl && (
                <TextLink
                  href={liveUrl}
                  label="Live"
                  external={true}
                  showExternalIcon={true}
                  className="text-[13px] font-mono"
                />
              )}
              {repoUrl && (
                <TextLink
                  href={repoUrl}
                  label="Repository"
                  external={true}
                  showExternalIcon={true}
                  className="text-[13px] font-mono"
                />
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* 2. 16:9 Media Plate (container.wide) */}
      <div className="mt-[24px]">
        <Container well="wide">
          <Plate
            aspect="16:9"
            src={imageSrc}
            alt={imageAlt}
            href={`/work/${slug}`}
            grayscaleHover={true}
            radius="lg"
          />
        </Container>
      </div>
    </div>
  );
}

export default FeaturedProject;
