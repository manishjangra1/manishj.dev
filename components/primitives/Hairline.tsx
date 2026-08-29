import React from 'react';
import { cn } from '@/lib/utils';

export interface HairlineProps {
  tone?: 'default' | 'subtle';
  className?: string;
}

export function Hairline({
  tone = 'default',
  className,
}: HairlineProps) {
  return (
    <hr
      aria-hidden="true"
      className={cn(
        'w-full h-[1px] border-0 my-0',
        tone === 'subtle' ? 'bg-[var(--color-border-subtle)]' : 'bg-[var(--color-border)]',
        className
      )}
    />
  );
}

export default Hairline;
