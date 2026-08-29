'use client';

import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  secondaryHover: string;
  accent: string;
  accentHover: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted?: string;
  gradientFrom: string;
  gradientTo: string;
  navBg: string;
  navBorder: string;
}

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const defaultColors: ThemeColors = {
  background: 'var(--color-bg)',
  foreground: 'var(--color-text)',
  primary: 'var(--color-text)',
  primaryHover: 'var(--color-hover)',
  secondary: 'var(--color-surface)',
  secondaryHover: 'var(--color-surface-hover)',
  accent: 'var(--color-accent)',
  accentHover: 'var(--color-text)',
  cardBg: 'var(--color-card)',
  cardBorder: 'var(--color-border)',
  textPrimary: 'var(--color-text)',
  textSecondary: 'var(--color-text-secondary)',
  textMuted: 'var(--color-text-muted)',
  gradientFrom: 'var(--color-bg)',
  gradientTo: 'var(--color-surface)',
  navBg: 'var(--color-bg-elevated)',
  navBorder: 'var(--color-border)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [, startTransition] = useTransition();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const stored = localStorage.getItem('theme') as Theme | null;
    const initialTheme = stored && (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'system';
    const initialResolved = initialTheme === 'system' ? (mediaQuery.matches ? 'dark' : 'light') : initialTheme;

    startTransition(() => {
      setThemeState(initialTheme);
      setResolvedTheme(initialResolved);
    });

    const root = document.documentElement;
    if (initialResolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    const handleChange = () => {
      const currentStored = localStorage.getItem('theme') as Theme | null;
      if (!currentStored || currentStored === 'system') {
        const next = mediaQuery.matches ? 'dark' : 'light';
        startTransition(() => {
          setResolvedTheme(next);
        });
        if (next === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const nextResolved = newTheme === 'system' ? (mediaQuery.matches ? 'dark' : 'light') : newTheme;
    setResolvedTheme(nextResolved);
    const root = document.documentElement;
    if (nextResolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const next = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        colors: defaultColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
