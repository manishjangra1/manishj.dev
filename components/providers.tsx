'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { PixelPlaneCursor } from '@/components/chrome/PixelPlaneCursor';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <PixelPlaneCursor />
    </ThemeProvider>
  );
}

