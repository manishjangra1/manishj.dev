'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

export type AppId = 'projects' | 'about' | 'terminal' | 'gallery' | 'messages' | 'settings' | 'skills' | 'experience' | 'blog' | 'projectDetail';
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
}

interface OSContextType {
  windows: Record<AppId, WindowState>;
  focusedAppId: AppId | null;
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  contextMenu: ContextMenuState;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  setTheme: (theme: ThemeMode) => void;
  setContextMenu: (state: ContextMenuState) => void;
  closeContextMenu: () => void;
  motionEnabled: boolean;
  soundsEnabled: boolean;
  density: 'compact' | 'standard';
  setMotionEnabled: (val: boolean) => void;
  setSoundsEnabled: (val: boolean) => void;
  setDensity: (val: 'compact' | 'standard') => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  isMobile: boolean;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  projects: { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  about: { id: 'about', title: 'About Me', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  terminal: { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  gallery: { id: 'gallery', title: 'Gallery', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  messages: { id: 'messages', title: 'Messages', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  settings: { id: 'settings', title: 'System Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  skills: { id: 'skills', title: 'Skills', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  experience: { id: 'experience', title: 'Experience', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  blog: { id: 'blog', title: 'Blog', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  projectDetail: { id: 'projectDetail', title: 'Project Details', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
};

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(INITIAL_WINDOWS);
  const [focusedAppId, setFocusedAppId] = useState<AppId | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ isOpen: false, x: 0, y: 0 });
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [soundsEnabled, setSoundsEnabled] = useState(false);
  const [density, setDensity] = useState<'compact' | 'standard'>('compact');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Resolve theme based on system preference if 'auto'
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, isOpen: false }));
  }, []);

  const focusApp = useCallback((id: AppId) => {
    setFocusedAppId(id);
    setMaxZIndex((prev) => prev + 1);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: maxZIndex + 1, isMinimized: false },
    }));
  }, [maxZIndex]);

  const openApp = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false },
    }));
    focusApp(id);
  }, [focusApp]);

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
    if (focusedAppId === id) {
      setFocusedAppId(null);
    }
  }, [focusedAppId]);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (focusedAppId === id) {
      setFocusedAppId(null);
    }
  }, [focusedAppId]);

  const maximizeApp = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
    focusApp(id);
  }, [focusApp]);

  const value = useMemo(() => ({
    windows,
    focusedAppId,
    theme,
    resolvedTheme,
    contextMenu,
    openApp,
    closeApp,
    minimizeApp,
    maximizeApp,
    focusApp,
    setTheme,
    setContextMenu,
    closeContextMenu,
    motionEnabled,
    soundsEnabled,
    density,
    setMotionEnabled,
    setSoundsEnabled,
    setDensity,
    selectedProjectId,
    setSelectedProjectId,
    isMobile,
  }), [
    windows, 
    focusedAppId, 
    theme, 
    resolvedTheme, 
    contextMenu, 
    openApp, 
    closeApp, 
    minimizeApp, 
    maximizeApp, 
    focusApp, 
    setTheme, 
    setContextMenu, 
    closeContextMenu,
    motionEnabled,
    soundsEnabled,
    density,
    selectedProjectId,
    isMobile,
  ]);

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
