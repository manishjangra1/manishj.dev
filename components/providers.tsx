'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { OSProvider } from '@/contexts/OSContext';
import { DataProvider } from '@/contexts/DataContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <OSProvider>
        <SessionProvider>{children}</SessionProvider>
      </OSProvider>
    </ThemeProvider>
  );
}

