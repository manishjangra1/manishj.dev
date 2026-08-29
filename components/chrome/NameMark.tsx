'use client';

import React, { useState } from 'react';
import { scrollToId } from '@/lib/utils/scroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface NameMarkProps {
  href?: string;
  name?: string;
  avatarUrl?: string;
  className?: string;
}

export function NameMark({
  href = '/',
  name = 'Manish Jangra',
  avatarUrl = 'https://github.com/manishjangra1.png',
  className,
}: NameMarkProps) {
  const prefersReducedMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === '/' || href === '/#' || href === '#') {
      if (window.location.pathname === '/') {
        e.preventDefault();
        scrollToId('hero', prefersReducedMotion);
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label={`${name}, home`}
      className={cn(
        'group flex items-center gap-2.5 font-sans font-medium text-[14px] text-[var(--color-text)] select-none',
        'focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-[var(--focus-ring-offset)] rounded-[var(--radius-none)]',
        'transition-colors duration-[150ms]',
        className
      )}
    >
      <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-none bg-[var(--color-surface)] border border-[var(--color-border-strong)] overflow-hidden shrink-0 transition-transform duration-200 group-hover:scale-105">
        {!imgError && avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            width={32}
            height={32}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover rounded-none"
          />
        ) : (
          <span className="text-[12px] font-semibold text-[var(--color-text)] tracking-tight">
            MJ
          </span>
        )}
      </span>
      <span className="font-semibold tracking-tight">{name}</span>
    </a>
  );
}

export default NameMark;

