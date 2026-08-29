import React from 'react';
import { Plate } from '@/components/content/Plate';
import { cn } from '@/lib/utils';

export interface PortraitProps {
  src: string;
  alt: string;
  className?: string;
}

export function Portrait({ src, alt, className }: PortraitProps) {
  return (
    <div
      className={cn(
        'w-full max-w-[320px] aspect-square shrink-0',
        className
      )}
    >
      <Plate
        aspect="1:1"
        src={src}
        alt={alt}
        grayscaleHover={true}
        radius="lg"
      />
    </div>
  );
}

export default Portrait;
