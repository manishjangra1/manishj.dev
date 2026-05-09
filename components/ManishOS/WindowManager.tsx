'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import Window from './Window';

// Import apps
import ProjectsApp from './apps/ProjectsApp';
import AboutApp from './apps/AboutApp';
import TerminalApp from './apps/TerminalApp';
import GalleryApp from './apps/GalleryApp';
import MessagesApp from './apps/MessagesApp';
import SystemSettingsApp from './apps/SystemSettingsApp';

const APP_COMPONENTS: Record<string, React.FC> = {
  projects: ProjectsApp,
  about: AboutApp,
  terminal: TerminalApp,
  gallery: GalleryApp,
  messages: MessagesApp,
  settings: SystemSettingsApp,
};

const WindowManager: React.FC = () => {
  const { windows } = useOS();

  return (
    <div className="relative w-full h-full pointer-events-none">
      <AnimatePresence>
        {Object.values(windows)
          .filter(win => win.isOpen && !win.isMinimized)
          .map((win) => {
            const AppComponent = APP_COMPONENTS[win.id] || (() => <div className="p-8">App coming soon...</div>);
            return (
              <Window 
                key={win.id} 
                id={win.id} 
                title={win.title}
                zIndex={win.zIndex}
              >
                <AppComponent />
              </Window>
            );
          })}
      </AnimatePresence>
    </div>
  );
};

export default WindowManager;
