'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { FeaturedProjectData } from '@/lib/constants/copy';
import { SHOWCASE_PROJECTS } from '@/lib/constants/copy';

export interface ProjectsTickerProps {
  projects?: FeaturedProjectData[];
  className?: string;
}

export function ProjectsTicker({
  projects = SHOWCASE_PROJECTS,
  className,
}: ProjectsTickerProps) {
  if (!projects || projects.length === 0) return null;

  // Duplicate items 4 times to ensure seamless infinite looping on wider viewports
  const tickerItems = [...projects, ...projects, ...projects, ...projects];

  return (
    <aside
      aria-label="Featured Projects Ticker"
      className={cn(
        'fixed bottom-[38px] sm:bottom-[42px] left-0 right-0 z-30 h-[78px] sm:h-[86px] bg-[var(--color-bg)]/95 backdrop-blur-md border-t border-[var(--color-border)] flex items-center overflow-hidden pointer-events-auto select-none lg:hidden',
        className
      )}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
      }}
    >
      <div className="animate-ticker-reverse flex items-center gap-7 sm:gap-9 whitespace-nowrap">
        {tickerItems.map((project, idx) => (
          <Link
            key={`${project.slug}-${idx}`}
            href={`/work/${project.slug}`}
            className="flex items-center gap-3.5 font-mono text-[11px] sm:text-[12px] tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors group py-1"
          >
            <span className="w-1.5 h-1.5 bg-[var(--color-text-muted)] opacity-60 shrink-0" />

            {/* Enlarged Thumbnail Image */}
            <div className="relative h-[60px] sm:h-[68px] aspect-[16/10] overflow-hidden rounded-none bg-[var(--color-surface)] border border-[var(--color-border-strong)] shrink-0 shadow-sm">
              <Image
                src={project.imageSrc || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'}
                alt={project.imageAlt || project.title}
                fill
                sizes="120px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Project Name (Top) & Project Type (Below) */}
            <div className="flex flex-col justify-center leading-tight">
              <div className="flex items-center gap-1.5 font-bold text-[14px] sm:text-[16px] text-[var(--color-text)] tracking-tight group-hover:underline underline-offset-2">
                <span>{project.title}</span>
                <span className="text-[12px] text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium mt-1">
                {project.kicker || project.meta?.[0] || 'PROJECT'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default ProjectsTicker;
