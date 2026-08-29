/**
 * Utility functions for hash navigation and smooth/instant scrolling.
 */

export function scrollToId(id: string, prefersReducedMotion = false) {
  if (typeof window === 'undefined') return;

  const targetId = id.replace(/^#/, '');

  if (!targetId || targetId === 'hero') {
    // Scroll to top
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.history.replaceState(null, '', window.location.pathname);
    return;
  }

  const element = document.getElementById(targetId);
  if (element) {
    if (prefersReducedMotion) {
      element.scrollIntoView({ behavior: 'auto' });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    window.history.replaceState(null, '', `#${targetId}`);
  }
}

export function replaceHash(hash: string) {
  if (typeof window === 'undefined') return;
  const cleanHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : window.location.pathname;
  window.history.replaceState(null, '', cleanHash);
}
