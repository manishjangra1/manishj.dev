'use client';

import { useEffect } from 'react';

/**
 * Hook to lock body scroll when an overlay / modal is active.
 * Restores original overflow style on unlock/unmount.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}

export default useLockBodyScroll;
