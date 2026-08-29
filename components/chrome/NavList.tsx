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
  { id: 'work', label: 'Work' },
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
    // If on homepage, smooth scroll with offset
    if (window.location.pathname === '/' || window.location.pathname === '') {
      e.preventDefault();
      scrollToId(item.id, prefersReducedMotion);
    }
    if (onNavigate) {
      onNavigate(item.id, e);
    }
  };

  const isOffHome = current === 'work-page';

  return (
    <nav aria-label={layout === 'stack' ? 'Mobile Navigation' : 'Primary Navigation'}>
      <ul
        className={cn(
          layout === 'inline' ? 'flex items-center gap-[24px]' : 'flex flex-col gap-[24px]',
          className
        )}
      >
        {NAV_ITEMS.map((item) => {
          const isCurrentLocation = current === item.id;
          const isCurrentPage = current === 'work-page' && item.id === 'work';
          const isCurrent = isCurrentLocation || isCurrentPage;
          const targetHref = item.href || (isOffHome ? `/#${item.id}` : `#${item.id}`);

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
                  layout === 'inline' && [
                    'text-[13px] font-medium tracking-[0.02em]',
                    isCurrent
                      ? 'text-[var(--color-text)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]',
                  ],
                  layout === 'stack' && [
                    'text-[24px] font-medium leading-none tracking-tight block py-1',
                    isCurrent
                      ? 'text-[var(--color-text)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]',
                  ]
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavList;
