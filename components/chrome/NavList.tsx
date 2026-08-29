'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { scrollToId } from '@/lib/utils/scroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type NavItemKey = 'work' | 'experience' | 'about' | 'blog' | 'github';
export type NavCurrentState = 'none' | NavItemKey | 'work-page' | 'blog-page';

export interface NavListProps {
  layout: 'inline' | 'stack';
  current: NavCurrentState;
  onNavigate?: (id: NavItemKey, e?: React.MouseEvent) => void;
  className?: string;
}

const NAV_ITEMS: { id: NavItemKey; label: string; href?: string; external?: boolean }[] = [
  { id: 'work', label: 'Work', href: '/work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/manishjangra1', external: true },
];

export function NavList({
  layout,
  current,
  onNavigate,
  className,
}: NavListProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleItemClick = (item: (typeof NAV_ITEMS)[0], e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.external) return;

    const isHome = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '');

    // On mobile, work section is hidden on home, so clicking work routes to /work
    if (item.id === 'work' && typeof window !== 'undefined' && window.innerWidth < 768) {
      if (onNavigate) {
        onNavigate(item.id, e);
      }
      return;
    }

    // If on homepage and section anchor exists, smooth scroll
    if (isHome && !item.href?.startsWith('/blog')) {
      const el = document.getElementById(item.id);
      if (el) {
        e.preventDefault();
        scrollToId(item.id, prefersReducedMotion);
      }
    }

    if (onNavigate) {
      onNavigate(item.id, e);
    }
  };

  const isOffHome = current === 'work-page';

  return (
    <nav aria-label={layout === 'stack' ? 'Mobile Navigation' : 'Primary Navigation'} className="w-full">
      <ul
        className={cn(
          layout === 'inline' ? 'flex items-center gap-[24px]' : 'flex flex-col gap-1 w-full',
          className
        )}
      >
        {NAV_ITEMS.map((item, idx) => {
          const isCurrentLocation = current === item.id;
          const isCurrentPage = current === 'work-page' && item.id === 'work';
          const isCurrent = isCurrentLocation || isCurrentPage;
          const targetHref = item.href || (isOffHome ? `/#${item.id}` : `#${item.id}`);
          const indexStr = `0${idx + 1}`;

          if (layout === 'inline') {
            return (
              <li key={item.id}>
                <a
                  href={targetHref}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={(e) => handleItemClick(item, e)}
                  aria-current={isCurrentPage ? 'page' : isCurrentLocation ? 'location' : undefined}
                  className={cn(
                    'transition-colors duration-[150ms] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-[var(--focus-ring-offset)] rounded-[var(--radius-sm)]',
                    'text-[13px] font-medium tracking-[0.02em]',
                    isCurrent
                      ? 'text-[var(--color-text)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          }

          // Stack layout for Mobile Menu
          return (
            <li key={item.id} className="w-full">
              <a
                href={targetHref}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={(e) => handleItemClick(item, e)}
                aria-current={isCurrentPage ? 'page' : isCurrentLocation ? 'location' : undefined}
                className={cn(
                  'group flex items-center justify-between py-3 px-2 rounded-none border-b border-[var(--color-border)]/40 transition-all duration-150',
                  'hover:bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]',
                  'focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)]',
                  isCurrent && 'bg-[var(--color-surface)]/60 border-[var(--color-border-strong)]'
                )}
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] tracking-wider">
                    {indexStr}
                  </span>
                  <span
                    className={cn(
                      'text-[24px] sm:text-[26px] font-bold tracking-tight transition-colors',
                      isCurrent
                        ? 'text-[var(--color-text)]'
                        : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)]'
                    )}
                  >
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
                  {item.external ? (
                    <span className="text-[14px]">↗</span>
                  ) : (
                    <span className="text-[16px] transition-transform duration-150 group-hover:translate-x-1">→</span>
                  )}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavList;
