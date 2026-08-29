import React from 'react';

export interface LiveRegionProps {
  message: string;
  politely?: boolean;
  className?: string;
}

export function LiveRegion({
  message,
  politely = true,
  className,
}: LiveRegionProps) {
  return (
    <div
      role="status"
      aria-live={politely ? 'polite' : 'assertive'}
      aria-atomic="true"
      className={className || 'sr-only'}
    >
      {message}
    </div>
  );
}

export default LiveRegion;
