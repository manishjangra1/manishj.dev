import React from 'react';
import { cn } from '@/lib/utils';

export interface KickerProps {
  children: string;
  as?: 'p' | 'span';
  className?: string;
}

export function Kicker({
  children,
  as: Component = 'p',
  className,
  ...props
}: KickerProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      className={cn(
        'font-mono text-[11px] font-medium leading-[1.3] tracking-[0.16em] uppercase text-[var(--color-text-muted)] select-none',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Kicker;
