'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { SkipLink } from '@/components/primitives/SkipLink';
import { LiveRegion } from '@/components/primitives/LiveRegion';
import { Navbar } from '@/components/chrome/Navbar';
import { Footer } from '@/components/chrome/Footer';
import { SkillsTicker } from '@/components/chrome/SkillsTicker';
import { ProjectsTicker } from '@/components/chrome/ProjectsTicker';
import { SocialDock, type SocialDockProps } from '@/components/chrome/SocialDock';
import type { CommandItem } from '@/components/chrome/CommandMenu';
import type { FeaturedProjectData } from '@/lib/constants/copy';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { NavCurrentState } from '@/components/chrome/NavList';

const CommandMenu = dynamic(
  () => import('@/components/chrome/CommandMenu'),
  { ssr: false }
);

export interface SiteShellProps {
  children: React.ReactNode;
  current?: NavCurrentState;
  hashCurrent?: 'none' | 'work' | 'experience' | 'about';
  commandItems?: CommandItem[];
  socialDock?: SocialDockProps;
  showcaseProjects?: FeaturedProjectData[];
}

export function SiteShell({
  children,
  current: explicitCurrent,
  hashCurrent,
  commandItems,
  socialDock,
  showcaseProjects,
}: SiteShellProps) {
  const pathname = usePathname();
  const spyCurrent = useScrollSpy();
  const prefersReducedMotion = useReducedMotion();
  const [commandOpen, setCommandOpen] = useState(false);

  const handleOpenCommand = useCallback(() => {
    setCommandOpen(true);
  }, []);

  const handleCloseCommand = useCallback(() => {
    setCommandOpen(false);
  }, []);

  // Idle prefetch CommandMenu bundle
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        import('@/components/chrome/CommandMenu');
      });
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(() => {
        import('@/components/chrome/CommandMenu');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Global ⌘K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Section Scroll Reveal Observer (Phase 6 M14, M15)
  // Operates on [data-reveal] elements on the public site
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (elements.length === 0) return;

    // If reduced motion is requested, immediately reveal all elements without transitions
    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    // Check if elements are already in the viewport on initial paint (avoids empty flash)
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      }
    });

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    elements.forEach((el) => {
      if (!el.classList.contains('is-revealed')) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname, prefersReducedMotion]);

  // If explicitCurrent is set, use that.
  // Else if on /work/[slug] route, set 'work-page' (aria-current="page").
  // Otherwise use the active scroll spy section.
  const isWorkRoute = pathname?.startsWith('/work/');
  const activeCurrent: NavCurrentState =
    explicitCurrent !== undefined
      ? explicitCurrent
      : isWorkRoute
      ? 'work-page'
      : hashCurrent !== undefined
      ? hashCurrent
      : spyCurrent;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-selection-bg)] selection:text-[var(--color-selection-text)]">
      <SkipLink />
      <Navbar
        current={activeCurrent}
        onOpenCommand={handleOpenCommand}
        socialDock={socialDock}
      />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SocialDock {...socialDock} />
      <Footer />
      <ProjectsTicker projects={showcaseProjects} />
      <SkillsTicker />
      {commandOpen && (
        <CommandMenu
          open={commandOpen}
          onClose={handleCloseCommand}
          items={commandItems}
        />
      )}
      <LiveRegion message="" />
    </div>
  );
}

export default SiteShell;
