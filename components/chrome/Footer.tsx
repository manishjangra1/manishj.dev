'use client';

import React from 'react';
import { Container } from '@/components/primitives/Container';
import { Hairline } from '@/components/primitives/Hairline';
import { TextLink } from '@/components/primitives/TextLink';
import { scrollToId } from '@/lib/utils/scroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterProps {
  year?: number;
  links?: FooterLink[];
}

const DEFAULT_FOOTER_LINKS: FooterLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Résumé', href: '/resume' },
  { label: 'GitHub', href: 'https://github.com/manishjangra1', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/manishjangra1', external: true },
  { label: 'Email', href: 'mailto:dev.jangramanish@gmail.com' },
];

export function Footer({
  year = new Date().getFullYear(),
  links = DEFAULT_FOOTER_LINKS,
}: FooterProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      if (window.location.pathname === '/' || window.location.pathname === '') {
        e.preventDefault();
        const targetId = href.replace('#', '');
        scrollToId(targetId, prefersReducedMotion);
      }
    }
  };

  return (
    <footer className="w-full">
      <Container well="page">
        <Hairline tone="default" />
        <div className="pt-[48px] md:pt-[64px] pb-[max(88px,calc(88px+env(safe-area-inset-bottom,0px)))] md:pb-[96px] flex flex-col md:flex-row md:items-center justify-between gap-[16px]">
          {/* Left: Copyright */}
          <p className="font-mono text-[13px] text-[var(--color-text-muted)] select-none tabular-nums">
            © {year} Manish Jangra
          </p>

          {/* Right: Navigation Links */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-[16px] gap-y-[8px]">
              {links.map((link) => (
                <li key={link.label}>
                  <TextLink
                    href={link.href}
                    external={link.external}
                    tone="muted"
                    showExternalIcon={false}
                    className="text-[13px]"
                    onClick={(e) => handleLinkClick(link.href, e)}
                  >
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
