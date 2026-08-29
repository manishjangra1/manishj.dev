'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/primitives/Icon';
import { cn } from '@/lib/utils';

export interface TextLinkProps {
  href: string;
  label?: string;
  children?: React.ReactNode;
  external?: boolean;
  relMe?: boolean;
  tone?: 'default' | 'muted' | 'secondary';
  showExternalIcon?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function TextLink({
  href,
  label,
  children,
  external = false,
  relMe = false,
  tone = 'default',
  showExternalIcon = false,
  className,
  onClick,
}: TextLinkProps) {
  const isExternal = external || href.startsWith('http') || href.startsWith('mailto:');
  const rel = [
    isExternal ? 'noopener noreferrer' : '',
    relMe ? 'me' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const toneClasses = {
    default: 'text-[var(--color-link)] hover:text-[var(--color-link-hover)]',
    muted: 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
    secondary: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]',
  };

  const linkClasses = cn(
    'inline-flex items-center gap-1 underline underline-offset-[3px] decoration-[var(--color-border-strong)] hover:decoration-[var(--color-text)]',
    'transition-colors duration-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer',
    'focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-[var(--focus-ring-offset)] rounded-[var(--radius-none)]',
    toneClasses[tone],
    className
  );

  const displayContent = label ? <span>{label}</span> : children;

  const content = (
    <>
      {displayContent}
      {isExternal && showExternalIcon && (
        <Icon name="arrow-up-right" size="sm" decorative={true} />
      )}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel={rel || undefined}
        className={linkClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses} onClick={onClick}>
      {content}
    </Link>
  );
}

export default TextLink;
