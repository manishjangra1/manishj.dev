import React from 'react';
import { Container } from '@/components/primitives/Container';
import { Kicker } from '@/components/primitives/Kicker';
import { TextLink } from '@/components/primitives/TextLink';
import { cn } from '@/lib/utils';

export interface NotFoundSectionProps {
  className?: string;
}

export function NotFoundSection({ className }: NotFoundSectionProps) {
  return (
    <section
      aria-label="Not found"
      className={cn('py-[128px] md:py-[160px] flex flex-col justify-start', className)}
    >
      <Container well="prose">
        <div className="flex flex-col items-start">
          <Kicker>404</Kicker>
          <h1 className="mt-[12px] text-[28px] sm:text-[32px] md:text-[36px] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--color-text)]">
            This page does not exist.
          </h1>
          <p className="mt-[16px] text-[16px] text-[var(--color-text-secondary)]">
            The link you followed may be broken, or the page may have been moved.
          </p>
          <div className="mt-[32px]">
            <TextLink href="/" label="Go home" className="text-[15px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NotFoundSection;
