'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/primitives/Icon';
import { cn } from '@/lib/utils';
import type { FeaturedProjectData } from '@/lib/constants/copy';
import { SHOWCASE_PROJECTS } from '@/lib/constants/copy';

export interface HeroCarouselProps {
  projects?: FeaturedProjectData[];
  className?: string;
}

export function HeroCarousel({
  projects = SHOWCASE_PROJECTS,
  className,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to middle/featured item (Servyq)
  const total = projects.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Keyboard navigation when focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  if (!projects || projects.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Featured Projects Showcase"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative w-full flex flex-col items-center select-none focus:outline-none overflow-visible',
        className
      )}
    >
      {/* 3D Perspective Stage (overflow-visible to never crop side cards) */}
      <div className="relative w-full h-[470px] sm:h-[490px] flex items-center justify-center [perspective:1000px] overflow-visible py-2">
        {projects.map((project, index) => {
          // Calculate relative position: -1 (left), 0 (center active), 1 (right), or hidden
          let offset = index - currentIndex;
          if (offset < -1) offset += total;
          if (offset > 1) offset -= total;

          const isCenter = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isVisible = isCenter || isLeft || isRight;

          if (!isVisible) return null;

          return (
            <div
              key={project.slug}
              onClick={() => {
                if (isLeft) handlePrev();
                if (isRight) handleNext();
              }}
              style={{
                transform: isCenter
                  ? 'translateX(0) scale(1) translateZ(0) rotateY(0deg)'
                  : isLeft
                  ? 'translateX(-54%) scale(0.86) translateZ(-40px) rotateY(12deg)'
                  : 'translateX(54%) scale(0.86) translateZ(-40px) rotateY(-12deg)',
                zIndex: isCenter ? 20 : 10,
                opacity: isCenter ? 1 : 0.55,
              }}
              className={cn(
                'absolute top-4 w-[280px] sm:w-[320px] md:w-[350px] rounded-[var(--radius-lg)] bg-[var(--color-card)] border border-[var(--color-border)] p-4 sm:p-5 flex flex-col justify-between cursor-pointer',
                'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xl',
                isCenter && 'cursor-default ring-1 ring-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border-[var(--color-border-strong)]'
              )}
            >
              {/* Top Media Plate */}
              <div className="relative w-full aspect-[16/10] rounded-[var(--radius-md)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt || project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                />
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} live site`}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-[var(--radius-sm)] bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/90 transition-all z-10"
                  >
                    <Icon name="arrow-up-right" size="sm" decorative />
                  </a>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-col mt-4">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  {project.kicker || 'FEATURED PROJECT'}
                </span>
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[var(--color-text)] tracking-tight mt-1">
                  {project.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] leading-[1.5] text-[var(--color-text-secondary)] mt-1.5 line-clamp-3">
                  {project.lede}
                </p>

                {/* Tech Stack Pills */}
                {project.meta && project.meta.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.meta.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-[var(--radius-sm)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[10px] sm:text-[11px] font-medium text-[var(--color-text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* View Case Study Link */}
                <div className="mt-4 pt-2.5 border-t border-[var(--color-border)]/60 flex items-center justify-between">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-medium text-[var(--color-text)] hover:text-white transition-colors group/link"
                  >
                    <span>View case study</span>
                    <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Prev & Next Floating Buttons */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous project"
          className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-[var(--radius-none)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-strong)] text-[var(--color-text)] flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <span className="text-[15px] -translate-x-0.5">‹</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next project"
          className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-[var(--radius-none)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-strong)] text-[var(--color-text)] flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <span className="text-[15px] translate-x-0.5">›</span>
        </button>
      </div>

      {/* Pagination Indicator Bars */}
      <div className="flex items-center gap-1.5 mt-3" aria-hidden="true">
        {projects.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              'h-1 rounded-[var(--radius-none)] transition-all duration-300',
              idx === currentIndex
                ? 'w-6 bg-[var(--color-text)]'
                : 'w-2 bg-[var(--color-border-strong)] hover:bg-[var(--color-text-muted)]'
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
