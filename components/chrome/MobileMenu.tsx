'use client';

import React, { useRef } from 'react';
import { NavList, type NavCurrentState, type NavItemKey } from '@/components/chrome/NavList';
import { NameMark } from '@/components/chrome/NameMark';
import { IconButton } from '@/components/primitives/IconButton';
import { Hairline } from '@/components/primitives/Hairline';
import { TextLink } from '@/components/primitives/TextLink';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { cn } from '@/lib/utils';

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  current: NavCurrentState;
  onNavigate?: (id: NavItemKey) => void;
}

export function MobileMenu({
  open,
  onClose,
  current,
  onNavigate,
}: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);
  useFocusTrap(containerRef, open, onClose);

  const handleNavigate = (id: NavItemKey) => {
    onClose();
    if (onNavigate) {
      onNavigate(id);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className={cn(
        'fixed inset-0 z-[60] bg-[var(--color-bg)] flex flex-col',
        'transition-opacity duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Header bar matching Navbar */}
      <div className="h-[56px] px-[20px] md:px-[32px] flex items-center justify-between border-b border-[var(--color-border)]">
        <NameMark />
        <IconButton
          label="Close menu"
          icon="x"
          size="md"
          onPress={onClose}
        />
      </div>

      {/* Menu Body */}
      <div className="flex-1 px-[20px] md:px-[32px] pt-[32px] pb-[max(32px,calc(32px+env(safe-area-inset-bottom,0px)))] flex flex-col justify-start overflow-y-auto">
        <NavList
          layout="stack"
          current={current}
          onNavigate={handleNavigate}
        />

        <div className="my-[24px]">
          <Hairline tone="default" />
        </div>

        <div className="flex flex-col gap-[16px]">
          <TextLink
            href="/resume"
            tone="secondary"
            className="text-[14px]"
            onClick={onClose}
          >
            Résumé
          </TextLink>
          <TextLink
            href="mailto:dev.jangramanish@gmail.com"
            tone="secondary"
            className="text-[14px]"
            onClick={onClose}
          >
            Email
          </TextLink>
          <TextLink
            href="https://github.com/manishjangra1"
            external={true}
            tone="secondary"
            className="text-[14px]"
            onClick={onClose}
          >
            GitHub
          </TextLink>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
