'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/primitives/Icon';
import { cn } from '@/lib/utils';
import type { ProjectRowData } from '@/lib/constants/copy';

export interface ProjectCardProps extends ProjectRowData {
  className?: string;
}

export function ProjectCard({
  title,
  slug,
  summary,
  meta,
  imageSrc,
  imageAlt,
  liveUrl,
  className,
}: ProjectCardProps) {
  const fallbackImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop';

  return (
    <div
      className={cn(
        'group relative rounded-[var(--radius-lg)] bg-[var(--color-card)] border border-[var(--color-border)]',
        'hover:border-[var(--color-border-strong)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl',
        className
      )}
    >
      {/* Top Image Plate */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <Image
          src={imageSrc || fallbackImage}
          alt={imageAlt || title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
        />

        {/* Top-Right External Link Button */}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} live site`}
            className="absolute top-3 right-3 w-8 h-8 rounded-[var(--radius-sm)] bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white hover:bg-black/80 transition-all z-10"
          >
            <Icon name="arrow-up-right" size="sm" decorative />
          </a>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-[18px] sm:text-[20px] font-semibold text-[var(--color-text)] tracking-tight">
            <Link
              href={`/work/${slug}`}
              className="focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] rounded-[var(--radius-none)]"
            >
              {title}
            </Link>
          </h3>

          <p className="mt-2 text-[13px] sm:text-[14px] leading-[1.5] text-[var(--color-text-secondary)]">
            {summary}
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          {/* Tech Badges */}
          {meta && meta.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {meta.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-[var(--radius-sm)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] font-medium text-[var(--color-text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* View Case Study Link */}
          <div className="pt-3 border-t border-[var(--color-border)]/60 flex items-center justify-between">
            <Link
              href={`/work/${slug}`}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-text)] hover:text-white transition-colors group/link"
            >
              <span>View case study</span>
              <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
