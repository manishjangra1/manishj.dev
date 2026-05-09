'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export type AppId = 'projects' | 'about' | 'terminal' | 'gallery' | 'messages' | 'settings';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface OSContextType {
  windows: Record<AppId, WindowState>;
  focusedAppId: AppId | null;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  projects: { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  about: { id: 'about', title: 'About Me', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  terminal: { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  gallery: { id: 'gallery', title: 'Gallery', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  messages: { id: 'messages', title: 'Messages', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  settings: { id: 'settings', title: 'Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
};

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(INITIAL_WINDOWS);
  const [focusedAppId, setFocusedAppId] = useState<AppId | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);

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
    openApp,
    closeApp,
    minimizeApp,
    maximizeApp,
    focusApp,
  }), [windows, focusedAppId, openApp, closeApp, minimizeApp, maximizeApp, focusApp]);

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
