'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { IconButton } from '@/components/primitives/IconButton';

export interface ThemeToggleProps {
  theme?: 'light' | 'dark';
  onToggle?: () => void;
  className?: string;
}

export function ThemeToggle({
  theme: controlledTheme,
  onToggle: controlledOnToggle,
  className,
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  const currentTheme = controlledTheme || resolvedTheme;
  const isDark = currentTheme === 'dark';
  const handleToggle = controlledOnToggle || toggleTheme;

  // Next theme label
  const nextLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  const iconName = isDark ? 'sun' : 'moon';

  return (
    <IconButton
      label={nextLabel}
      icon={iconName}
      size="md"
      onPress={handleToggle}
      className={className}
    />
  );
}

export default ThemeToggle;
