import React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
  label?: string;
  className?: string;
}

export function Spinner({
  label = 'Sending…',
  className,
}: SpinnerProps) {
  return (
    <span className="inline-flex items-center justify-center">
      <svg
        className={cn('animate-spin h-4 w-4 shrink-0 text-current', className)}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ animationDuration: '800ms', animationTimingFunction: 'linear' }}
      >
        <circle
          cx="8"
          cy="8"
          r="6.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.25"
        />
        <path
          d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default Spinner;
