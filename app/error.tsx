'use client';

import React, { useEffect } from 'react';
import { Container } from '@/components/primitives/Container';
import { Kicker } from '@/components/primitives/Kicker';
import { Button } from '@/components/primitives/Button';
import { TextLink } from '@/components/primitives/TextLink';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Public route error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col justify-center py-[96px]">
      <Container well="page">
        <div className="max-w-[640px] flex flex-col items-start">
          <Kicker>500 — Error</Kicker>

          <h1 className="mt-[12px] text-[32px] sm:text-[40px] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--color-text)]">
            Something went wrong.
          </h1>

          <p className="mt-[16px] text-[16px] text-[var(--color-text-secondary)] leading-[1.5]">
            An unexpected error occurred while loading this page. You can try reloading or return to the homepage.
          </p>

          <div className="mt-[32px] flex items-center gap-[24px]">
            <Button
              variant="primary"
              size="md"
              onClick={() => reset()}
            >
              Try again
            </Button>

            <TextLink
              href="/"
              label="Return to homepage"
              className="text-[15px]"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
