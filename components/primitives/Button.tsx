'use client';

import React from 'react';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/primitives/Icon';
import { Spinner } from '@/components/primitives/Spinner';
import { cn } from '@/lib/utils';

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  children?: React.ReactNode;
  icon?: IconName;
  state?: 'rest' | 'loading' | 'success' | 'disabled';
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  target?: string;
  rel?: string;
}

export function Button({
  variant,
  size = 'md',
  href,
  type = 'button',
  label,
  children,
  icon,
  state = 'rest',
  loading = false,
  loadingText = 'Sending…',
  disabled = false,
  fullWidth = false,
  onPress,
  onClick,
  className,
  target,
  rel,
}: ButtonProps) {
  const isLoading = loading || state === 'loading';
  const isDisabled = disabled || state === 'disabled';
  const isSuccess = state === 'success';

  const sizeClasses = {
    sm: 'h-[32px] px-[12px] text-[12px] font-medium tracking-[0.04em]',
    md: 'h-[40px] px-[16px] text-[12px] font-medium tracking-[0.04em]',
    lg: 'h-[48px] px-[20px] text-[14px] font-medium tracking-[0.02em]',
  };

  const variantClasses = {
    primary: cn(
      'bg-[var(--color-text)] text-[var(--color-text-inverse)] border-0',
      'hover:bg-[var(--color-hover)]',
      'active:bg-[#09090B] dark:active:bg-[#E4E4E7]',
      isDisabled && 'bg-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'
    ),
    secondary: cn(
      'bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text)]',
      'hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-secondary)]',
      'active:bg-[var(--color-surface)]',
      isDisabled && 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-transparent hover:border-[var(--color-border)]'
    ),
    ghost: cn(
      'bg-transparent border-0 text-[var(--color-text-secondary)]',
      'hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]',
      'active:bg-[var(--color-surface)]',
      isDisabled && 'text-[var(--color-text-muted)] hover:bg-transparent hover:text-[var(--color-text-muted)]'
    ),
  };

  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2 select-none whitespace-nowrap',
    'rounded-[var(--radius-md)] cursor-pointer transition-colors duration-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
    'focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-[var(--focus-ring-offset)]',
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    isLoading && 'cursor-default pointer-events-none',
    isDisabled && 'cursor-not-allowed pointer-events-none',
    className
  );

  const displayLabel = label || children;

  const content = (
    <>
      {isLoading ? (
        <>
          <span className="inline-flex items-center justify-center motion-reduce:hidden">
            <Spinner label={loadingText} />
          </span>
          <span className="hidden motion-reduce:inline">{loadingText}</span>
        </>
      ) : (
        <>
          {icon && (
            <Icon
              name={icon}
              size={size === 'lg' ? 'md' : 'sm'}
              decorative={true}
            />
          )}
          <span>{isSuccess ? 'Sent' : displayLabel}</span>
        </>
      )}
    </>
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (onPress) onPress();
  };

  if (href && !isDisabled && !isLoading) {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href} className={baseClasses} onClick={handleClick}>
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={handleClick}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading ? 'true' : undefined}
      aria-disabled={isDisabled ? 'true' : undefined}
      onClick={handleClick}
      className={baseClasses}
    >
      {content}
    </button>
  );
}

export default Button;
