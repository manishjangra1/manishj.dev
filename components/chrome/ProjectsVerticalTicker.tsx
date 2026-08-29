'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FeaturedProjectData } from '@/lib/constants/copy';
import { SHOWCASE_PROJECTS } from '@/lib/constants/copy';

export interface ProjectsVerticalTickerProps {
  projects?: FeaturedProjectData[];
  className?: string;
}

export function ProjectsVerticalTicker({
  projects = SHOWCASE_PROJECTS,
  className,
}: ProjectsVerticalTickerProps) {
  if (!projects || projects.length === 0) return null;

  // Duplicate items 4 times to ensure seamless infinite looping vertically
  const tickerItems = [...projects, ...projects, ...projects, ...projects];

  return (
    <aside
      aria-label="All Projects Vertical Stream"
      className={cn(
        'hidden lg:flex fixed left-0 top-0 bottom-[38px] sm:bottom-[42px] z-30 w-[230px] xl:w-[260px] bg-[var(--color-bg)]/95 dark:bg-[var(--color-bg)]/95 backdrop-blur-xl border-r border-[var(--color-border)] flex-col overflow-hidden pointer-events-auto select-none',
        className
      )}
    >
      {/* Top Header Bar (Matching Navbar height for symmetry) */}
      <div className="h-[56px] md:h-[64px] px-4 bg-[var(--color-bg)]/80 flex items-center shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-1.5 h-1.5 bg-[var(--color-text)] shrink-0" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-text)] truncate">
            PROJECTS ({projects.length})
          </span>
        </div>
      </div>

      {/* Vertical Scrolling Marquee Area */}
      <div
        className="flex-1 overflow-hidden px-2 py-1.5 relative group/scroll [mask-image:linear-gradient(to_bottom,transparent_0%,black_3%,black_97%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_3%,black_97%,transparent_100%)]"
        tabIndex={0}
        role="region"
        aria-label="Scrollable projects list"
      >
        <div className="animate-ticker-vertical flex flex-col gap-2">
          {tickerItems.map((project, idx) => (
            <Link
              key={`${project.slug}-${idx}`}
              href={`/work/${project.slug}`}
              className="group/card flex items-stretch bg-[var(--color-surface)]/40 hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)] transition-all duration-150 overflow-hidden pr-2.5"
            >
              {/* Horizontal Image Thumbnail - Flush on left with zero padding & larger dimensions */}
              <div className="relative w-[70px] xl:w-[80px] shrink-0 bg-[var(--color-card)] border-r border-[var(--color-border)] overflow-hidden min-h-[52px] xl:min-h-[58px]">
                <Image
                  src={project.imageSrc || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop'}
                  alt={project.imageAlt || project.title}
                  fill
                  sizes="90px"
                  className="object-cover group-hover/card:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Name & Category / Kicker horizontally aligned */}
              <div className="flex-1 min-w-0 flex flex-col justify-center py-1.5 pl-2.5">
                <span className="font-mono text-[8px] xl:text-[8.5px] uppercase tracking-wider text-[var(--color-text-muted)] truncate block">
                  {project.kicker || 'PROJECT'}
                </span>
                <h4 className="text-[12px] xl:text-[13px] font-bold text-[var(--color-text)] tracking-tight truncate group-hover/card:underline underline-offset-2 mt-0.5">
                  {project.title}
                </h4>
                {project.meta && project.meta.length > 0 && (
                  <span className="font-mono text-[8px] text-[var(--color-text-secondary)] truncate block mt-0.5 opacity-80">
                    {project.meta.slice(0, 2).join(' • ')}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default ProjectsVerticalTicker;
