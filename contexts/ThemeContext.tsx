'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 
  | 'dark' 
  | 'light' 
  | 'blue' 
  | 'green' 
  | 'purple' 
  | 'orange' 
  | 'red'
  | 'sunset'
  | 'ocean'
  | 'forest'
  | 'lavender'
  | 'midnight'
  | 'rose'
  | 'amber'
  | 'mint'
  | 'indigo'
  | 'coral'
  | 'emerald'
  | 'violet'
  | 'sakura'
  | 'cyber'
  | 'pastelPink'
  | 'pastelBlue'
  | 'pastelGreen'
  | 'pastelPurple'
  | 'pastelYellow'
  | 'pastelPeach'
  | 'pastelMint'
  | 'pastelLavender'
  | 'pastelSky'
  | 'pastelRose';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: ThemeColors;
}

interface ThemeColors {
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
  gradientFrom: string;
  gradientTo: string;
  navBg: string;
  navBorder: string;
}

const themeColors: Record<Theme, ThemeColors> = {
  dark: {
    background: '#0a0a0a',
    foreground: '#ededed',
    primary: '#6366f1',
    primaryHover: '#818cf8',
    secondary: '#8b5cf6',
    secondaryHover: '#a78bfa',
    accent: '#ec4899',
    accentHover: '#f472b6',
    cardBg: 'rgba(255, 255, 255, 0.2)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    gradientFrom: '#6366f1',
    gradientTo: '#ec4899',
    navBg: 'rgba(0, 0, 0, 0.8)',
    navBorder: 'rgba(255, 255, 255, 0.1)',
  },
  light: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    primary: '#4f46e5',
    primaryHover: '#6366f1',
    secondary: '#7c3aed',
    secondaryHover: '#8b5cf6',
    accent: '#db2777',
    accentHover: '#ec4899',
    cardBg: 'rgba(0, 0, 0, 0.05)',
    cardBorder: 'rgba(0, 0, 0, 0.1)',
    textPrimary: '#0a0a0a',
    textSecondary: 'rgba(0, 0, 0, 0.7)',
    gradientFrom: '#4f46e5',
    gradientTo: '#db2777',
    navBg: 'rgba(255, 255, 255, 0.9)',
    navBorder: 'rgba(0, 0, 0, 0.1)',
  },
  blue: {
    background: '#0f172a',
    foreground: '#e2e8f0',
    primary: '#3b82f6',
    primaryHover: '#60a5fa',
    secondary: '#2563eb',
    secondaryHover: '#3b82f6',
    accent: '#06b6d4',
    accentHover: '#22d3ee',
    cardBg: 'rgba(59, 130, 246, 0.1)',
    cardBorder: 'rgba(59, 130, 246, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(226, 232, 240, 0.8)',
    gradientFrom: '#3b82f6',
    gradientTo: '#06b6d4',
    navBg: 'rgba(15, 23, 42, 0.9)',
    navBorder: 'rgba(59, 130, 246, 0.2)',
  },
  green: {
    background: '#0a1f0a',
    foreground: '#d1fae5',
    primary: '#10b981',
    primaryHover: '#34d399',
    secondary: '#059669',
    secondaryHover: '#10b981',
    accent: '#14b8a6',
    accentHover: '#2dd4bf',
    cardBg: 'rgba(16, 185, 129, 0.1)',
    cardBorder: 'rgba(16, 185, 129, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(209, 250, 229, 0.8)',
    gradientFrom: '#10b981',
    gradientTo: '#14b8a6',
    navBg: 'rgba(10, 31, 10, 0.9)',
    navBorder: 'rgba(16, 185, 129, 0.2)',
  },
  purple: {
    background: '#1a0a2e',
    foreground: '#e9d5ff',
    primary: '#a855f7',
    primaryHover: '#c084fc',
    secondary: '#9333ea',
    secondaryHover: '#a855f7',
    accent: '#ec4899',
    accentHover: '#f472b6',
    cardBg: 'rgba(168, 85, 247, 0.1)',
    cardBorder: 'rgba(168, 85, 247, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(233, 213, 255, 0.8)',
    gradientFrom: '#a855f7',
    gradientTo: '#ec4899',
    navBg: 'rgba(26, 10, 46, 0.9)',
    navBorder: 'rgba(168, 85, 247, 0.2)',
  },
  orange: {
    background: '#1c0a00',
    foreground: '#fed7aa',
    primary: '#f97316',
    primaryHover: '#fb923c',
    secondary: '#ea580c',
    secondaryHover: '#f97316',
    accent: '#f59e0b',
    accentHover: '#fbbf24',
    cardBg: 'rgba(249, 115, 22, 0.1)',
    cardBorder: 'rgba(249, 115, 22, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(254, 215, 170, 0.8)',
    gradientFrom: '#f97316',
    gradientTo: '#f59e0b',
    navBg: 'rgba(28, 10, 0, 0.9)',
    navBorder: 'rgba(249, 115, 22, 0.2)',
  },
  red: {
    background: '#1a0000',
    foreground: '#fecaca',
    primary: '#ef4444',
    primaryHover: '#f87171',
    secondary: '#dc2626',
    secondaryHover: '#ef4444',
    accent: '#f43f5e',
    accentHover: '#fb7185',
    cardBg: 'rgba(239, 68, 68, 0.1)',
    cardBorder: 'rgba(239, 68, 68, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(254, 202, 202, 0.8)',
    gradientFrom: '#ef4444',
    gradientTo: '#f43f5e',
    navBg: 'rgba(26, 0, 0, 0.9)',
    navBorder: 'rgba(239, 68, 68, 0.2)',
  },
  sunset: {
    background: '#1a0a0f',
    foreground: '#ffe4e6',
    primary: '#fb7185',
    primaryHover: '#fda4af',
    secondary: '#f97316',
    secondaryHover: '#fb923c',
    accent: '#f59e0b',
    accentHover: '#fbbf24',
    cardBg: 'rgba(251, 113, 133, 0.1)',
    cardBorder: 'rgba(251, 113, 133, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 228, 230, 0.8)',
    gradientFrom: '#fb7185',
    gradientTo: '#f97316',
    navBg: 'rgba(26, 10, 15, 0.9)',
    navBorder: 'rgba(251, 113, 133, 0.2)',
  },
  ocean: {
    background: '#0a1628',
    foreground: '#cffafe',
    primary: '#06b6d4',
    primaryHover: '#22d3ee',
    secondary: '#0891b2',
    secondaryHover: '#06b6d4',
    accent: '#3b82f6',
    accentHover: '#60a5fa',
    cardBg: 'rgba(6, 182, 212, 0.1)',
    cardBorder: 'rgba(6, 182, 212, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(207, 250, 254, 0.8)',
    gradientFrom: '#06b6d4',
    gradientTo: '#3b82f6',
    navBg: 'rgba(10, 22, 40, 0.9)',
    navBorder: 'rgba(6, 182, 212, 0.2)',
  },
  forest: {
    background: '#0a1f0a',
    foreground: '#d1fae5',
    primary: '#059669',
    primaryHover: '#10b981',
    secondary: '#047857',
    secondaryHover: '#059669',
    accent: '#84cc16',
    accentHover: '#a3e635',
    cardBg: 'rgba(5, 150, 105, 0.1)',
    cardBorder: 'rgba(5, 150, 105, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(209, 250, 229, 0.8)',
    gradientFrom: '#059669',
    gradientTo: '#84cc16',
    navBg: 'rgba(10, 31, 10, 0.9)',
    navBorder: 'rgba(5, 150, 105, 0.2)',
  },
  lavender: {
    background: '#1a0f2e',
    foreground: '#f3e8ff',
    primary: '#c084fc',
    primaryHover: '#d8b4fe',
    secondary: '#a855f7',
    secondaryHover: '#c084fc',
    accent: '#ec4899',
    accentHover: '#f472b6',
    cardBg: 'rgba(192, 132, 252, 0.1)',
    cardBorder: 'rgba(192, 132, 252, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(243, 232, 255, 0.8)',
    gradientFrom: '#c084fc',
    gradientTo: '#ec4899',
    navBg: 'rgba(26, 15, 46, 0.9)',
    navBorder: 'rgba(192, 132, 252, 0.2)',
  },
  midnight: {
    background: '#0a0a1a',
    foreground: '#e0e7ff',
    primary: '#6366f1',
    primaryHover: '#818cf8',
    secondary: '#4f46e5',
    secondaryHover: '#6366f1',
    accent: '#8b5cf6',
    accentHover: '#a78bfa',
    cardBg: 'rgba(99, 102, 241, 0.1)',
    cardBorder: 'rgba(99, 102, 241, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(224, 231, 255, 0.8)',
    gradientFrom: '#6366f1',
    gradientTo: '#8b5cf6',
    navBg: 'rgba(10, 10, 26, 0.9)',
    navBorder: 'rgba(99, 102, 241, 0.2)',
  },
  rose: {
    background: '#1a0a0f',
    foreground: '#fce7f3',
    primary: '#f43f5e',
    primaryHover: '#fb7185',
    secondary: '#e11d48',
    secondaryHover: '#f43f5e',
    accent: '#ec4899',
    accentHover: '#f472b6',
    cardBg: 'rgba(244, 63, 94, 0.1)',
    cardBorder: 'rgba(244, 63, 94, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(252, 231, 243, 0.8)',
    gradientFrom: '#f43f5e',
    gradientTo: '#ec4899',
    navBg: 'rgba(26, 10, 15, 0.9)',
    navBorder: 'rgba(244, 63, 94, 0.2)',
  },
  amber: {
    background: '#1a0f00',
    foreground: '#fef3c7',
    primary: '#f59e0b',
    primaryHover: '#fbbf24',
    secondary: '#d97706',
    secondaryHover: '#f59e0b',
    accent: '#f97316',
    accentHover: '#fb923c',
    cardBg: 'rgba(245, 158, 11, 0.1)',
    cardBorder: 'rgba(245, 158, 11, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(254, 243, 199, 0.8)',
    gradientFrom: '#f59e0b',
    gradientTo: '#f97316',
    navBg: 'rgba(26, 15, 0, 0.9)',
    navBorder: 'rgba(245, 158, 11, 0.2)',
  },
  mint: {
    background: '#0a1f1a',
    foreground: '#d1fae5',
    primary: '#10b981',
    primaryHover: '#34d399',
    secondary: '#059669',
    secondaryHover: '#10b981',
    accent: '#06b6d4',
    accentHover: '#22d3ee',
    cardBg: 'rgba(16, 185, 129, 0.1)',
    cardBorder: 'rgba(16, 185, 129, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(209, 250, 229, 0.8)',
    gradientFrom: '#10b981',
    gradientTo: '#06b6d4',
    navBg: 'rgba(10, 31, 26, 0.9)',
    navBorder: 'rgba(16, 185, 129, 0.2)',
  },
  indigo: {
    background: '#0f0a1a',
    foreground: '#e0e7ff',
    primary: '#6366f1',
    primaryHover: '#818cf8',
    secondary: '#4f46e5',
    secondaryHover: '#6366f1',
    accent: '#8b5cf6',
    accentHover: '#a78bfa',
    cardBg: 'rgba(99, 102, 241, 0.1)',
    cardBorder: 'rgba(99, 102, 241, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(224, 231, 255, 0.8)',
    gradientFrom: '#6366f1',
    gradientTo: '#8b5cf6',
    navBg: 'rgba(15, 10, 26, 0.9)',
    navBorder: 'rgba(99, 102, 241, 0.2)',
  },
  coral: {
    background: '#1a0a0a',
    foreground: '#ffe4e6',
    primary: '#fb7185',
    primaryHover: '#fda4af',
    secondary: '#f43f5e',
    secondaryHover: '#fb7185',
    accent: '#f97316',
    accentHover: '#fb923c',
    cardBg: 'rgba(251, 113, 133, 0.1)',
    cardBorder: 'rgba(251, 113, 133, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 228, 230, 0.8)',
    gradientFrom: '#fb7185',
    gradientTo: '#f97316',
    navBg: 'rgba(26, 10, 10, 0.9)',
    navBorder: 'rgba(251, 113, 133, 0.2)',
  },
  emerald: {
    background: '#0a1f14',
    foreground: '#d1fae5',
    primary: '#10b981',
    primaryHover: '#34d399',
    secondary: '#059669',
    secondaryHover: '#10b981',
    accent: '#14b8a6',
    accentHover: '#2dd4bf',
    cardBg: 'rgba(16, 185, 129, 0.1)',
    cardBorder: 'rgba(16, 185, 129, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(209, 250, 229, 0.8)',
    gradientFrom: '#10b981',
    gradientTo: '#14b8a6',
    navBg: 'rgba(10, 31, 20, 0.9)',
    navBorder: 'rgba(16, 185, 129, 0.2)',
  },
  violet: {
    background: '#1a0f2e',
    foreground: '#f3e8ff',
    primary: '#8b5cf6',
    primaryHover: '#a78bfa',
    secondary: '#7c3aed',
    secondaryHover: '#8b5cf6',
    accent: '#6366f1',
    accentHover: '#818cf8',
    cardBg: 'rgba(139, 92, 246, 0.1)',
    cardBorder: 'rgba(139, 92, 246, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(243, 232, 255, 0.8)',
    gradientFrom: '#8b5cf6',
    gradientTo: '#6366f1',
    navBg: 'rgba(26, 15, 46, 0.9)',
    navBorder: 'rgba(139, 92, 246, 0.2)',
  },
  sakura: {
    background: '#1a0a14',
    foreground: '#fce7f3',
    primary: '#f472b6',
    primaryHover: '#f9a8d4',
    secondary: '#ec4899',
    secondaryHover: '#f472b6',
    accent: '#fb7185',
    accentHover: '#fda4af',
    cardBg: 'rgba(244, 114, 182, 0.1)',
    cardBorder: 'rgba(244, 114, 182, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(252, 231, 243, 0.8)',
    gradientFrom: '#f472b6',
    gradientTo: '#fb7185',
    navBg: 'rgba(26, 10, 20, 0.9)',
    navBorder: 'rgba(244, 114, 182, 0.2)',
  },
  cyber: {
    background: '#0a0a0a',
    foreground: '#00ff88',
    primary: '#00ff88',
    primaryHover: '#00ffaa',
    secondary: '#00d9ff',
    secondaryHover: '#00ff88',
    accent: '#ff0080',
    accentHover: '#ff00aa',
    cardBg: 'rgba(0, 255, 136, 0.1)',
    cardBorder: 'rgba(0, 255, 136, 0.2)',
    textPrimary: '#00ff88',
    textSecondary: 'rgba(0, 255, 136, 0.8)',
    gradientFrom: '#00ff88',
    gradientTo: '#00d9ff',
    navBg: 'rgba(0, 0, 0, 0.95)',
    navBorder: 'rgba(0, 255, 136, 0.3)',
  },
  pastelPink: {
    background: '#2a1a1f',
    foreground: '#ffd6e8',
    primary: '#ffb3d9',
    primaryHover: '#ffcce6',
    secondary: '#ff99cc',
    secondaryHover: '#ffb3d9',
    accent: '#ff80bf',
    accentHover: '#ff99cc',
    cardBg: 'rgba(255, 179, 217, 0.15)',
    cardBorder: 'rgba(255, 179, 217, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 214, 232, 0.85)',
    gradientFrom: '#ffb3d9',
    gradientTo: '#ff80bf',
    navBg: 'rgba(42, 26, 31, 0.9)',
    navBorder: 'rgba(255, 179, 217, 0.25)',
  },
  pastelBlue: {
    background: '#1a1f2a',
    foreground: '#d6e8ff',
    primary: '#b3d9ff',
    primaryHover: '#cce6ff',
    secondary: '#99ccff',
    secondaryHover: '#b3d9ff',
    accent: '#80bfff',
    accentHover: '#99ccff',
    cardBg: 'rgba(179, 217, 255, 0.15)',
    cardBorder: 'rgba(179, 217, 255, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(214, 232, 255, 0.85)',
    gradientFrom: '#b3d9ff',
    gradientTo: '#80bfff',
    navBg: 'rgba(26, 31, 42, 0.9)',
    navBorder: 'rgba(179, 217, 255, 0.25)',
  },
  pastelGreen: {
    background: '#1a2a1f',
    foreground: '#d6ffe8',
    primary: '#b3ffd9',
    primaryHover: '#ccffe6',
    secondary: '#99ffcc',
    secondaryHover: '#b3ffd9',
    accent: '#80ffbf',
    accentHover: '#99ffcc',
    cardBg: 'rgba(179, 255, 217, 0.15)',
    cardBorder: 'rgba(179, 255, 217, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(214, 255, 232, 0.85)',
    gradientFrom: '#b3ffd9',
    gradientTo: '#80ffbf',
    navBg: 'rgba(26, 42, 31, 0.9)',
    navBorder: 'rgba(179, 255, 217, 0.25)',
  },
  pastelPurple: {
    background: '#1f1a2a',
    foreground: '#e8d6ff',
    primary: '#d9b3ff',
    primaryHover: '#e6ccff',
    secondary: '#cc99ff',
    secondaryHover: '#d9b3ff',
    accent: '#bf80ff',
    accentHover: '#cc99ff',
    cardBg: 'rgba(217, 179, 255, 0.15)',
    cardBorder: 'rgba(217, 179, 255, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(232, 214, 255, 0.85)',
    gradientFrom: '#d9b3ff',
    gradientTo: '#bf80ff',
    navBg: 'rgba(31, 26, 42, 0.9)',
    navBorder: 'rgba(217, 179, 255, 0.25)',
  },
  pastelYellow: {
    background: '#2a2a1a',
    foreground: '#fffed6',
    primary: '#fff9b3',
    primaryHover: '#fffccc',
    secondary: '#fff699',
    secondaryHover: '#fff9b3',
    accent: '#fff380',
    accentHover: '#fff699',
    cardBg: 'rgba(255, 249, 179, 0.15)',
    cardBorder: 'rgba(255, 249, 179, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 254, 214, 0.85)',
    gradientFrom: '#fff9b3',
    gradientTo: '#fff380',
    navBg: 'rgba(42, 42, 26, 0.9)',
    navBorder: 'rgba(255, 249, 179, 0.25)',
  },
  pastelPeach: {
    background: '#2a1f1a',
    foreground: '#ffe8d6',
    primary: '#ffd9b3',
    primaryHover: '#ffe6cc',
    secondary: '#ffcc99',
    secondaryHover: '#ffd9b3',
    accent: '#ffbf80',
    accentHover: '#ffcc99',
    cardBg: 'rgba(255, 217, 179, 0.15)',
    cardBorder: 'rgba(255, 217, 179, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 232, 214, 0.85)',
    gradientFrom: '#ffd9b3',
    gradientTo: '#ffbf80',
    navBg: 'rgba(42, 31, 26, 0.9)',
    navBorder: 'rgba(255, 217, 179, 0.25)',
  },
  pastelMint: {
    background: '#1a2a26',
    foreground: '#d6ffe8',
    primary: '#b3ffe6',
    primaryHover: '#ccfff0',
    secondary: '#99ffd9',
    secondaryHover: '#b3ffe6',
    accent: '#80ffcc',
    accentHover: '#99ffd9',
    cardBg: 'rgba(179, 255, 230, 0.15)',
    cardBorder: 'rgba(179, 255, 230, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(214, 255, 232, 0.85)',
    gradientFrom: '#b3ffe6',
    gradientTo: '#80ffcc',
    navBg: 'rgba(26, 42, 38, 0.9)',
    navBorder: 'rgba(179, 255, 230, 0.25)',
  },
  pastelLavender: {
    background: '#1f1a26',
    foreground: '#e8e6ff',
    primary: '#d9d4ff',
    primaryHover: '#e6e2ff',
    secondary: '#ccc2ff',
    secondaryHover: '#d9d4ff',
    accent: '#bfb0ff',
    accentHover: '#ccc2ff',
    cardBg: 'rgba(217, 212, 255, 0.15)',
    cardBorder: 'rgba(217, 212, 255, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(232, 230, 255, 0.85)',
    gradientFrom: '#d9d4ff',
    gradientTo: '#bfb0ff',
    navBg: 'rgba(31, 26, 38, 0.9)',
    navBorder: 'rgba(217, 212, 255, 0.25)',
  },
  pastelSky: {
    background: '#1a242a',
    foreground: '#d6f0ff',
    primary: '#b3e0ff',
    primaryHover: '#ccedff',
    secondary: '#99d6ff',
    secondaryHover: '#b3e0ff',
    accent: '#80ccff',
    accentHover: '#99d6ff',
    cardBg: 'rgba(179, 224, 255, 0.15)',
    cardBorder: 'rgba(179, 224, 255, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(214, 240, 255, 0.85)',
    gradientFrom: '#b3e0ff',
    gradientTo: '#80ccff',
    navBg: 'rgba(26, 36, 42, 0.9)',
    navBorder: 'rgba(179, 224, 255, 0.25)',
  },
  pastelRose: {
    background: '#2a1a1f',
    foreground: '#ffe6e8',
    primary: '#ffd1d6',
    primaryHover: '#ffe0e3',
    secondary: '#ffbcc4',
    secondaryHover: '#ffd1d6',
    accent: '#ffa7b2',
    accentHover: '#ffbcc4',
    cardBg: 'rgba(255, 209, 214, 0.15)',
    cardBorder: 'rgba(255, 209, 214, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 230, 232, 0.85)',
    gradientFrom: '#ffd1d6',
    gradientTo: '#ffa7b2',
    navBg: 'rgba(42, 26, 31, 0.9)',
    navBorder: 'rgba(255, 209, 214, 0.25)',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && themeColors[savedTheme]) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.documentElement.style.setProperty('--background', themeColors[theme].background);
      document.documentElement.style.setProperty('--foreground', themeColors[theme].foreground);
      document.documentElement.style.setProperty('--primary', themeColors[theme].primary);
      document.documentElement.style.setProperty('--primary-hover', themeColors[theme].primaryHover);
      document.documentElement.style.setProperty('--secondary', themeColors[theme].secondary);
      document.documentElement.style.setProperty('--secondary-hover', themeColors[theme].secondaryHover);
      document.documentElement.style.setProperty('--accent', themeColors[theme].accent);
      document.documentElement.style.setProperty('--accent-hover', themeColors[theme].accentHover);
      document.documentElement.style.setProperty('--card-bg', themeColors[theme].cardBg);
      document.documentElement.style.setProperty('--card-border', themeColors[theme].cardBorder);
      document.documentElement.style.setProperty('--text-primary', themeColors[theme].textPrimary);
      document.documentElement.style.setProperty('--text-secondary', themeColors[theme].textSecondary);
      document.documentElement.style.setProperty('--gradient-from', themeColors[theme].gradientFrom);
      document.documentElement.style.setProperty('--gradient-to', themeColors[theme].gradientTo);
      document.documentElement.style.setProperty('--nav-bg', themeColors[theme].navBg);
      document.documentElement.style.setProperty('--nav-border', themeColors[theme].navBorder);
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Always provide the context, even before mounting
  // This ensures components can use useTheme() during SSR/initial render
  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themeColors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

