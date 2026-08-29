'use client';

import React, { useRef, useState } from 'react';
import { Mail, Linkedin, Github, MessageCircle, FileText, Check, ArrowUpRight } from 'lucide-react';
import { NavList, type NavCurrentState, type NavItemKey } from '@/components/chrome/NavList';
import { NameMark } from '@/components/chrome/NameMark';
import { IconButton } from '@/components/primitives/IconButton';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { cn } from '@/lib/utils';

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  current: NavCurrentState;
  onNavigate?: (id: NavItemKey) => void;
  email?: string;
  linkedin?: string;
  github?: string;
  whatsapp?: string;
  resumeUrl?: string;
}

export function MobileMenu({
  open,
  onClose,
  current,
  onNavigate,
  email = 'dev.jangramanish@gmail.com',
  linkedin = 'https://linkedin.com/in/manishjangra1',
  github = 'https://github.com/manishjangra1',
  whatsapp = 'https://wa.me/919053015360',
  resumeUrl = '/resume',
}: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useLockBodyScroll(open);
  useFocusTrap(containerRef, open, onClose);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

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
      <div className="h-[56px] px-5 sm:px-6 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg)] shrink-0">
        <NameMark />
        <IconButton
          label="Close menu"
          icon="x"
          size="md"
          onPress={onClose}
        />
      </div>

      {/* Menu Body */}
      <div className="flex-1 px-5 sm:px-6 pt-6 pb-[max(32px,calc(32px+env(safe-area-inset-bottom,0px)))] flex flex-col justify-between overflow-y-auto">
        <div className="flex flex-col gap-6">
          {/* Availability Status */}
          <div className="flex items-center gap-2 select-none">
            <span className="w-1.5 h-1.5 bg-[var(--color-text-muted)] shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
              Available for work & freelance
            </span>
          </div>

          {/* Primary Navigation Stack */}
          <NavList
            layout="stack"
            current={current}
            onNavigate={handleNavigate}
          />
        </div>

        {/* Bottom Direct Connect Section */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              Direct Channels
            </span>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-text)] hover:underline uppercase tracking-wider font-semibold"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Résumé (PDF)</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Email Quick Action Card */}
          <div className="flex items-center justify-between p-3 bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
                Email
              </span>
              <span className="text-[13px] font-medium text-[var(--color-text)] truncate">
                {email}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className={cn(
                'px-3 py-1.5 text-[11px] font-mono font-medium border transition-all shrink-0 rounded-none flex items-center gap-1.5',
                copied
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500'
                  : 'bg-[var(--color-surface)] border-[var(--color-border-strong)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
              )}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Mail className="w-3 h-3" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          {/* Social Icons Row */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] text-[12px] font-mono text-[var(--color-text)] transition-all"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] text-[12px] font-mono text-[var(--color-text)] transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] text-[12px] font-mono text-[var(--color-text)] transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;

