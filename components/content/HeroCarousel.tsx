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
  autoScrollInterval = 6500,
  className,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = projects.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

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

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    setIsPaused(false);
  };

  if (!projects || projects.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Featured Projects Showcase"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={cn(
        'relative w-full flex flex-col items-center select-none focus:outline-none overflow-visible',
        className
      )}
    >
      {/* 3D Perspective Stage */}
      <div
        className="relative w-full h-[350px] sm:h-[370px] md:h-[380px] flex items-center justify-center [perspective:1000px] overflow-visible py-1"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {projects.map((project, index) => {
          // Exact cyclic distance relative to currentIndex
          let diff = (index - currentIndex) % total;
          if (diff < 0) diff += total;
          let offset = diff;
          if (diff > total / 2) {
            offset = diff - total;
          }

          const isCenter = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isVisible = isCenter || isLeft || isRight;

          if (!isVisible && total > 2) return null;

          return (
            <div
              key={project.slug || `${project.title}-${index}`}
              onClick={() => {
                if (isLeft) handlePrev();
                if (isRight) handleNext();
              }}
              style={{
                transform: isCenter
                  ? 'translateX(0) scale(1) translateZ(0) rotateY(0deg)'
                  : isLeft
                  ? 'translateX(-54%) scale(0.85) translateZ(-40px) rotateY(14deg)'
                  : 'translateX(54%) scale(0.85) translateZ(-40px) rotateY(-14deg)',
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
                  src={project.imageSrc || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'}
                  alt={project.imageAlt || project.title}
                  fill
                  sizes="(max-width: 768px) 280px, 340px"
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
              <div className="flex flex-col mt-2.5 sm:mt-3">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] truncate">
                    {project.kicker || 'FEATURED PROJECT'}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--color-text-muted)]">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-[14px] sm:text-[16px] font-bold text-[var(--color-text)] tracking-tight mt-0.5 truncate">
                  {project.title}
                </h3>
                <p className="text-[11px] sm:text-[12px] leading-[1.4] text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                  {project.lede}
                </p>

                {/* Tech Stack Pills */}
                {project.meta && project.meta.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.meta.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 rounded-none bg-[var(--color-surface)] border border-[var(--color-border)] text-[9px] font-mono text-[var(--color-text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* View Case Study Link */}
                <div className="mt-2.5 sm:mt-3 pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
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
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="absolute -left-5 sm:-left-8 md:-left-12 lg:-left-14 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-strong)] text-[var(--color-text)] flex items-center justify-center shadow-xl transition-all duration-150 hover:scale-105 active:scale-95 text-xs font-mono"
            >
              <span>‹</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="absolute -right-5 sm:-right-8 md:-right-12 lg:-right-14 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-strong)] text-[var(--color-text)] flex items-center justify-center shadow-xl transition-all duration-150 hover:scale-105 active:scale-95 text-xs font-mono"
            >
              <span>›</span>
            </button>
          </>
        )}
      </div>

      {/* Prominent High-Contrast Scroll & Index Indicator Bar */}
      <div className="flex items-center gap-3 mt-3 sm:mt-4 z-20">
        <div className="flex items-center gap-1.5 max-w-[200px] overflow-x-auto py-1">
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to project slide ${idx + 1}`}
              className={cn(
                'h-1.5 rounded-none transition-all duration-300 shrink-0',
                idx === currentIndex
                  ? 'w-6 sm:w-8 bg-[var(--color-text)] ring-1 ring-white/20'
                  : 'w-2.5 sm:w-3 bg-[var(--color-border-strong)] hover:bg-[var(--color-text-muted)]'
              )}
            />
          ))}
        </div>

        <span className="font-mono text-[10px] font-bold text-[var(--color-text-muted)] tracking-wider shrink-0">
          {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

export default HeroCarousel;
