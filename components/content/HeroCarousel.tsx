'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/primitives/Icon';
import { cn } from '@/lib/utils';
import type { FeaturedProjectData } from '@/lib/constants/copy';
import { SHOWCASE_PROJECTS } from '@/lib/constants/copy';

export interface HeroCarouselProps {
  projects?: FeaturedProjectData[];
  autoScrollInterval?: number; // In milliseconds, default 4500
  className?: string;
}

export function HeroCarousel({
  projects = SHOWCASE_PROJECTS,
  autoScrollInterval = 4500,
  className,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to middle/featured item (Servyq)
  const [isPaused, setIsPaused] = useState(false);
  const total = projects.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Automatic scrolling interval with pause on hover/focus
  useEffect(() => {
    if (total <= 1 || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, autoScrollInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isPaused, autoScrollInterval, handleNext]);

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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={cn(
        'relative w-full flex flex-col items-center select-none focus:outline-none overflow-visible',
        className
      )}
    >
      {/* 3D Perspective Stage (compact & proportional) */}
      <div className="relative w-full h-[330px] sm:h-[360px] flex items-center justify-center [perspective:900px] overflow-visible py-1">
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
                  ? 'translateX(-50%) scale(0.85) translateZ(-35px) rotateY(10deg)'
                  : 'translateX(50%) scale(0.85) translateZ(-35px) rotateY(-10deg)',
                zIndex: isCenter ? 20 : 10,
                opacity: isCenter ? 1 : 0.5,
              }}
              className={cn(
                'absolute top-0 w-[240px] sm:w-[270px] md:w-[290px] rounded-none bg-[var(--color-card)] border border-[var(--color-border)] p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer',
                'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xl',
                isCenter && 'cursor-default ring-1 ring-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] border-[var(--color-border-strong)]'
              )}
            >
              {/* Top Media Plate */}
              <div className="relative w-full aspect-[16/10] rounded-none overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt || project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                  priority={isCenter}
                  loading="eager"
                />
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} live site`}
                    className="absolute top-2 right-2 w-6 h-6 rounded-none bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black transition-all z-10"
                  >
                    <Icon name="arrow-up-right" size="sm" decorative />
                  </a>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-col mt-3">
                <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  {project.kicker || 'FEATURED PROJECT'}
                </span>
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[var(--color-text)] tracking-tight mt-0.5">
                  {project.title}
                </h3>
                <p className="text-[11px] sm:text-[12px] leading-[1.4] text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                  {project.lede}
                </p>

                {/* Tech Stack Pills */}
                {project.meta && project.meta.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {project.meta.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 rounded-none bg-[var(--color-surface)] border border-[var(--color-border)] text-[9px] sm:text-[10px] font-mono text-[var(--color-text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* View Case Study Link */}
                <div className="mt-3 pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-mono font-medium text-[var(--color-text)] hover:text-white transition-colors group/link"
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
          className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-strong)] text-[var(--color-text)] flex items-center justify-center shadow-lg transition-all duration-150 hover:scale-105 active:scale-95 text-xs font-mono"
        >
          <span>‹</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next project"
          className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-strong)] text-[var(--color-text)] flex items-center justify-center shadow-lg transition-all duration-150 hover:scale-105 active:scale-95 text-xs font-mono"
        >
          <span>›</span>
        </button>
      </div>

      {/* Prominent High-Contrast Scroll & Index Indicator Bar */}
      <div className="flex items-center gap-3 mt-4 sm:mt-5 z-20">
        <div className="flex items-center gap-1.5">
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to project slide ${idx + 1}`}
              className={cn(
                'h-1.5 rounded-none transition-all duration-300',
                idx === currentIndex
                  ? 'w-8 bg-[var(--color-text)] ring-1 ring-white/20'
                  : 'w-3 bg-[var(--color-border-strong)] hover:bg-[var(--color-text-muted)]'
              )}
            />
          ))}
        </div>

        <span className="font-mono text-[10px] font-bold text-[var(--color-text-muted)] tracking-wider">
          0{currentIndex + 1} / 0{total}
        </span>
      </div>
    </div>
  );
}

export default HeroCarousel;
