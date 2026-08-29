'use client';

import React, { useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';

export interface CommandTriggerProps {
  onOpen: () => void;
  visible?: boolean;
  className?: string;
}

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof navigator === 'undefined') return '⌘K';
  return /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent) ? '⌘K' : 'Ctrl+K';
}

function getServerSnapshot() {
  return '⌘K';
}

export function CommandTrigger({
  onOpen,
  visible = true,
  className,
}: CommandTriggerProps) {
  const shortcutLabel = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => {
        import('@/components/chrome/CommandMenu');
      }}
      onFocus={() => {
        import('@/components/chrome/CommandMenu');
      }}
      aria-label="Open command menu"
      className={cn(
        'hidden md:inline-flex items-center justify-center h-[32px] px-[10px] select-none',
        'bg-transparent border border-[var(--color-border-strong)] rounded-[var(--radius-md)]',
        'font-mono text-[12px] font-medium text-[var(--color-text-secondary)]',
        'hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] hover:border-[var(--color-text-secondary)]',
        'focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-[var(--focus-ring-offset)]',
        'transition-colors duration-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer',
        className
      )}
    >
      {shortcutLabel}
    </button>
  );
}

export default CommandTrigger;
