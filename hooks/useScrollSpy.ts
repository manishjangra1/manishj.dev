'use client';

import { useEffect, useState, useRef } from 'react';

export type NavSectionId = 'work' | 'experience' | 'about' | 'contact' | 'none';

interface UseScrollSpyOptions {
  sectionIds?: ('work' | 'experience' | 'about' | 'contact')[];
  offset?: number;
}

const DEFAULT_SECTIONS: ('work' | 'experience' | 'about' | 'contact')[] = [
  'work',
  'experience',
  'about',
  'contact',
];

export function useScrollSpy({
  sectionIds = DEFAULT_SECTIONS,
  offset = 88, // 64px nav + 24px buffer
}: UseScrollSpyOptions = {}) {
  const [current, setCurrent] = useState<NavSectionId>('none');
  const currentRef = useRef<NavSectionId>('none');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      const firstSectionElement = document.getElementById(sectionIds[0]);

      let nextSection: NavSectionId = 'none';

      if (window.scrollY >= 100 && (!firstSectionElement || firstSectionElement.offsetTop <= scrollPosition)) {
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && scrollPosition >= el.offsetTop) {
            nextSection = id;
          }
        }
      }

      if (currentRef.current !== nextSection) {
        currentRef.current = nextSection;
        setCurrent(nextSection);

        // Perform side-effect (history replaceState) safely in effect handler
        if (nextSection !== 'none') {
          window.history.replaceState(null, '', `#${nextSection}`);
        } else if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return current;
}

export default useScrollSpy;
