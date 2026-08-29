'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '@/components/primitives/Container';
import { IconButton } from '@/components/primitives/IconButton';
import { NameMark } from '@/components/chrome/NameMark';
import { NavList, type NavCurrentState } from '@/components/chrome/NavList';
import { CommandTrigger } from '@/components/chrome/CommandTrigger';
import { ThemeToggle } from '@/components/chrome/ThemeToggle';
import { MobileMenu } from '@/components/chrome/MobileMenu';
import { cn } from '@/lib/utils';

export interface NavbarProps {
  isScrolled?: boolean;
  current?: NavCurrentState;
  onOpenCommand?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  menuOpen?: boolean;
  onToggleMenu?: () => void;
}

export function Navbar({
  isScrolled: controlledScrolled,
  current = 'none',
  onOpenCommand,
  theme,
  onToggleTheme,
  menuOpen: controlledMenuOpen,
  onToggleMenu,
}: NavbarProps) {
  const [internalScrolled, setInternalScrolled] = useState(false);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);

  const isScrolled = controlledScrolled !== undefined ? controlledScrolled : internalScrolled;
  const menuOpen = controlledMenuOpen !== undefined ? controlledMenuOpen : internalMenuOpen;

  useEffect(() => {
    if (controlledScrolled !== undefined) return;

    const handleScroll = () => {
      setInternalScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [controlledScrolled]);

  const handleOpenMenu = () => {
    if (onToggleMenu) {
      onToggleMenu();
    } else {
      setInternalMenuOpen(true);
    }
  };

  const handleCloseMenu = () => {
    if (onToggleMenu) {
      onToggleMenu();
    } else {
      setInternalMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-[10] w-full transition-[background-color,border-color] duration-150',
          'h-[56px] md:h-[64px]',
          isScrolled
            ? 'bg-[var(--color-bg-elevated)]/80 backdrop-blur-[12px] border-b border-[var(--color-border)]'
            : 'bg-[var(--color-bg)] border-b border-transparent'
        )}
      >
        <Container well="wide" className="h-full flex items-center justify-between">
          {/* Left: Brand mark */}
          <NameMark />

          {/* Right: Navigation + Utilities */}
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-[32px]">
              <NavList layout="inline" current={current} />
              <div className="flex items-center gap-[8px]">
                {onOpenCommand && <CommandTrigger onOpen={onOpenCommand} />}
                <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              </div>
            </div>

            {/* Mobile Navigation controls */}
            <div className="flex md:hidden items-center gap-[4px]">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              <IconButton
                label={menuOpen ? 'Close menu' : 'Open menu'}
                icon={menuOpen ? 'x' : 'menu'}
                size="md"
                onPress={menuOpen ? handleCloseMenu : handleOpenMenu}
                aria-expanded={menuOpen}
              />
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        open={menuOpen}
        onClose={handleCloseMenu}
        current={current}
      />
    </>
  );
}

export default Navbar;
