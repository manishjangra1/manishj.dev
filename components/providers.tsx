'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { PixelLionCursor } from '@/components/chrome/PixelLionCursor';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <PixelLionCursor />
    </ThemeProvider>
  );
}

