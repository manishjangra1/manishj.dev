'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CommandMenuItem } from '@/components/chrome/CommandMenuItem';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { scrollToId } from '@/lib/utils/scroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/contexts/ThemeContext';
import { CONTACT_INFO } from '@/lib/constants/copy';
import { cn } from '@/lib/utils';

export type CommandActionType =
  | 'hash'
  | 'route'
  | 'external'
  | 'copy'
  | 'theme'
  | 'download';

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  action: CommandActionType;
  target?: string;
}

export interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
  items?: CommandItem[];
  className?: string;
}

const DEFAULT_COMMAND_ITEMS: CommandItem[] = [
  { id: 'home', label: 'Home', hint: 'Section', action: 'hash', target: 'hero' },
  { id: 'work', label: 'Work', hint: 'Section', action: 'hash', target: 'work' },
  { id: 'experience', label: 'Experience', hint: 'Section', action: 'hash', target: 'experience' },
  { id: 'capabilities', label: 'Capabilities', hint: 'Section', action: 'hash', target: 'capabilities' },
  { id: 'activity', label: 'Activity', hint: 'Section', action: 'hash', target: 'activity' },
  { id: 'about', label: 'About', hint: 'Section', action: 'hash', target: 'about' },
  { id: 'contact', label: 'Contact', hint: 'Section', action: 'hash', target: 'contact' },
  { id: 'servyq', label: 'Servyq', hint: 'Project', action: 'route', target: '/work/servyq' },
  { id: 'dayzo', label: 'Dayzo', hint: 'Project', action: 'route', target: '/work/dayzo' },
  { id: 'portfolio', label: 'Portfolio & CMS', hint: 'Project', action: 'route', target: '/work/portfolio' },
  { id: 'resume', label: 'Download Résumé', hint: 'File', action: 'download', target: '/resume' },
  { id: 'copy-email', label: 'Copy Email Address', hint: 'Action', action: 'copy', target: CONTACT_INFO.email },
  { id: 'theme-toggle', label: 'Toggle Theme', hint: 'Action', action: 'theme' },
  { id: 'github', label: 'GitHub Profile', hint: 'External', action: 'external', target: CONTACT_INFO.github },
  { id: 'linkedin', label: 'LinkedIn Profile', hint: 'External', action: 'external', target: CONTACT_INFO.linkedin },
];

export function CommandMenu({
  open,
  onClose,
  items = DEFAULT_COMMAND_ITEMS,
  className,
}: CommandMenuProps) {
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useLockBodyScroll(open);
  useFocusTrap(containerRef, open, onClose);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lowerQuery) ||
        (item.hint && item.hint.toLowerCase().includes(lowerQuery))
    );
  }, [items, query]);

  // Auto-focus input on open
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  const handleClose = () => {
    setQuery('');
    setActiveIndex(0);
    onClose();
  };

  const executeItem = (item: CommandItem) => {
    handleClose();

    switch (item.action) {
      case 'hash':
        if (window.location.pathname === '/' || window.location.pathname === '') {
          scrollToId(item.target || 'hero', prefersReducedMotion);
        } else {
          router.push(`/#${item.target || ''}`);
        }
        break;
      case 'route':
        if (item.target) {
          router.push(item.target);
        }
        break;
      case 'download':
        window.open(item.target || '/resume', '_blank');
        break;
      case 'external':
        if (item.target) {
          window.open(item.target, '_blank', 'noopener,noreferrer');
        }
        break;
      case 'copy':
        if (item.target) {
          navigator.clipboard.writeText(item.target).catch(() => {});
        }
        break;
      case 'theme':
        toggleTheme();
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const currentItem = filteredItems[activeIndex];
      if (currentItem) {
        executeItem(currentItem);
      }
    }
  };

  if (!open) return null;

  const activeItem = filteredItems[activeIndex];

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] md:pt-[20vh] px-4"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[var(--color-overlay)] transition-opacity duration-200"
      />

      {/* Command Menu Card */}
      <div
        className={cn(
          'relative w-full max-w-[560px] bg-[var(--color-card)] border border-[var(--color-border-strong)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden z-10',
          'animate-command-enter',
          className
        )}
      >
        {/* Search Input */}
        <div className="p-3 border-b border-[var(--color-border)]">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-listbox"
            aria-autocomplete="list"
            aria-activedescendant={activeItem ? `command-item-${activeItem.id}` : undefined}
            aria-label="Search sections, projects, or actions"
            placeholder="Type a command or search…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full h-[40px] px-3 text-[14px] text-[var(--color-text)] bg-transparent border-0 placeholder:text-[var(--color-text-muted)] focus:outline-none"
          />
        </div>

        {/* Results List */}
        <ul
          id="command-listbox"
          role="listbox"
          className="max-h-[320px] overflow-y-auto p-2 flex flex-col gap-[2px]"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <CommandMenuItem
                key={item.id}
                id={item.id}
                label={item.label}
                hint={item.hint}
                isActive={index === activeIndex}
                onPointer={() => setActiveIndex(index)}
                onRun={() => executeItem(item)}
              />
            ))
          ) : (
            <li className="py-6 text-center text-[13px] text-[var(--color-text-muted)] select-none">
              No results
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CommandMenu;
