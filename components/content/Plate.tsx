'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface PlateProps {
  aspect: '16:9' | '1:1' | 'graph';
  padding?: 'none' | 'md';
  grayscaleHover?: boolean;
  href?: string;
  alt?: string;
  src?: string;
  priority?: boolean;
  children?: React.ReactNode;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Plate({
  aspect,
  padding = 'none',
  grayscaleHover = true,
  href,
  alt = '',
  src,
  priority = false,
  children,
  radius = 'none',
  className,
}: PlateProps) {
  const isLink = Boolean(href);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClasses = {
    '16:9': 'aspect-[16/9] w-full',
    '1:1': 'aspect-square w-full',
    graph: 'w-full min-h-[112px] md:min-h-[128px] lg:min-h-[160px]',
  };

  const paddingClasses = {
    none: 'p-0',
    md: 'p-[24px]',
  };

  const radiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-[var(--radius-sm)]',
    md: 'rounded-[var(--radius-md)]',
    lg: 'rounded-[var(--radius-lg)]',
    xl: 'rounded-[var(--radius-xl)]',
  };

  const plateClasses = cn(
    'group relative block overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]',
    'transition-colors duration-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
    isLink && 'cursor-pointer hover:border-[var(--color-border-strong)]',
    radiusClasses[radius],
    aspectClasses[aspect],
    paddingClasses[padding],
    className
  );

  const mediaContent = (
    <>
      {src && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            unoptimized={src.startsWith('http')}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
            onLoad={() => setIsLoaded(true)}
            className={cn(
              'object-cover transition-[filter,opacity] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              isLoaded ? 'opacity-100' : 'opacity-0 motion-reduce:opacity-100',
              grayscaleHover
                ? 'grayscale-0 [@media(hover:hover)_and_(pointer:fine)]:grayscale [@media(hover:hover)_and_(pointer:fine)]:group-hover:grayscale-0'
                : 'grayscale-0'
            )}
          />
        </div>
      )}
      {children}
    </>
  );

  if (href) {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href} className={plateClasses}>
          {mediaContent}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={plateClasses}
      >
        {mediaContent}
      </a>
    );
  }

  return <div className={plateClasses}>{mediaContent}</div>;
}

export default Plate;
