'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, MessageCircle, FileText, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SocialDockProps {
  email?: string;
  linkedin?: string;
  github?: string;
  whatsapp?: string;
  resumeUrl?: string;
  className?: string;
}

function formatWhatsAppUrl(val?: string): string {
  if (!val) return '';
  const trimmed = val.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  const digits = trimmed.replace(/[^\d]/g, '');
  return digits ? `https://wa.me/${digits}` : '';
}

export function SocialDock({
  email = 'dev.jangramanish@gmail.com',
  linkedin = 'https://linkedin.com/in/manishjangra1',
  github = 'https://github.com/manishjangra1',
  whatsapp = 'https://wa.me/919053015360',
  resumeUrl = '/resume',
  className,
}: SocialDockProps) {
  const [copied, setCopied] = useState(false);
  const formattedWhatsApp = formatWhatsAppUrl(whatsapp);

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

  const links = [
    {
      id: 'email',
      label: copied ? 'COPIED!' : 'EMAIL',
      icon: copied ? Check : Mail,
      href: `mailto:${email}`,
      onClick: handleCopyEmail,
      ariaLabel: 'Copy email address or send email',
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      icon: Linkedin,
      href: linkedin,
      external: true,
      ariaLabel: 'LinkedIn Profile',
    },
    {
      id: 'github',
      label: 'GITHUB',
      icon: Github,
      href: github,
      external: true,
      ariaLabel: 'GitHub Profile',
    },
    {
      id: 'whatsapp',
      label: 'WHATSAPP',
      icon: MessageCircle,
      href: formattedWhatsApp || 'https://wa.me/919053015360',
      external: true,
      ariaLabel: 'WhatsApp Chat',
    },
    {
      id: 'resume',
      label: 'RÉSUMÉ',
      icon: FileText,
      href: resumeUrl,
      external: true,
      ariaLabel: 'View Resume',
    },
  ];

  return (
    <aside
      aria-label="Direct connections and profiles"
      className={cn(
        'hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none',
        className
      )}
    >
      <div className="flex flex-col items-center bg-[var(--color-bg)]/95 backdrop-blur-md border-y border-l border-r-0 border-[var(--color-border)] shadow-xl rounded-none p-1 gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={link.onClick}
              aria-label={link.ariaLabel}
              className={cn(
                'group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10',
                'border border-transparent hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)]',
                'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]',
                'transition-all duration-150 rounded-none focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)]',
                copied && link.id === 'email' && 'text-emerald-500 border-emerald-500/40 bg-emerald-500/10'
              )}
            >
              <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />

              {/* Hover Tooltip on Left */}
              <span
                className={cn(
                  'absolute right-full mr-2.5 px-2 py-1',
                  'bg-[var(--color-text)] text-[var(--color-bg)] text-[10px] font-mono font-bold tracking-wider uppercase',
                  'rounded-none whitespace-nowrap shadow-md pointer-events-none',
                  'opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150',
                  'hidden sm:block z-50'
                )}
              >
                {link.label}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}

export default SocialDock;
