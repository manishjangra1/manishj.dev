'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS, AppId, ThemeMode } from '@/contexts/OSContext';
import { 
  ChevronRight, 
  Monitor, 
  Terminal as TerminalIcon, 
  Briefcase, 
  Image as ImageIcon,
  Sun,
  Moon,
  MonitorDot,
  Settings as SettingsIcon,
  RotateCcw
} from 'lucide-react';

const MenuItem = ({ 
  label, 
  icon: Icon, 
  onClick, 
  submenu,
  danger
}: { 
  label: string; 
  icon?: any; 
  onClick?: () => void;
  submenu?: React.ReactNode;
  danger?: boolean;
}) => {
  const [showSubmenu, setShowSubmenu] = React.useState(false);

  return (
    <div 
      className="relative group/item"
      onMouseEnter={() => setShowSubmenu(true)}
      onMouseLeave={() => setShowSubmenu(false)}
    >
      <button
        onClick={(e) => {
          if (!submenu && onClick) {
            e.stopPropagation();
            onClick();
          }
        }}
        className={`w-full flex items-center justify-between px-3 py-1.5 text-[13px] rounded-md transition-colors ${
          danger ? 'text-red-400 hover:bg-red-500 hover:text-white' : 'text-white/90 hover:bg-blue-500 hover:text-white'
        }`}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-3.5 h-3.5" />}
          <span>{label}</span>
        </div>
        {submenu && <ChevronRight className="w-3 h-3 opacity-50" />}
      </button>

      <AnimatePresence>
        {submenu && showSubmenu && (
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            className="absolute top-0 left-full ml-1 w-48 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-lg p-1 shadow-2xl z-[100]"
          >
            {submenu}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContextMenu: React.FC = () => {
  const { contextMenu, closeContextMenu, openApp, setTheme, theme } = useOS();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeContextMenu();
      }
    };
    if (contextMenu.isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [contextMenu.isOpen, closeContextMenu]);

  if (!contextMenu.isOpen) return null;

  const MENU_WIDTH = 224; // w-56 = 14rem = 224px
  const MENU_HEIGHT = 300; // Approximate height

  let adjustedX = contextMenu.x;
  let adjustedY = contextMenu.y;

  // Horizontal check
  if (typeof window !== 'undefined') {
    if (adjustedX + MENU_WIDTH > window.innerWidth) {
      adjustedX -= MENU_WIDTH;
    }
    // Vertical check
    if (adjustedY + MENU_HEIGHT > window.innerHeight) {
      adjustedY -= MENU_HEIGHT;
    }
  }

  const themes: { mode: ThemeMode; label: string; icon: any }[] = [
    { mode: 'light', label: 'Light', icon: Sun },
    { mode: 'dark', label: 'Dark', icon: Moon },
    { mode: 'auto', label: 'Auto', icon: MonitorDot },
  ];

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ top: adjustedY, left: adjustedX }}
      className="fixed w-56 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-lg p-1 shadow-2xl z-[100] select-none"
    >
      <div className="space-y-0.5">
        <MenuItem 
          label="New Window" 
          icon={Monitor} 
          onClick={() => openApp('settings')} 
        />
        <div className="h-px bg-white/10 my-1 mx-2" />
        <MenuItem 
          label="Open Terminal" 
          icon={TerminalIcon} 
          onClick={() => openApp('terminal')} 
        />
        <MenuItem 
          label="Open Projects" 
          icon={Briefcase} 
          onClick={() => openApp('projects')} 
        />
        <MenuItem 
          label="Open Gallery" 
          icon={ImageIcon} 
          onClick={() => openApp('gallery')} 
        />
        <div className="h-px bg-white/10 my-1 mx-2" />
        <MenuItem 
          label="Theme" 
          icon={Sun}
          submenu={
            <div className="space-y-0.5">
              {themes.map((t) => (
                <MenuItem 
                  key={t.mode}
                  label={t.label}
                  icon={t.icon}
                  onClick={() => {
                    setTheme(t.mode);
                    closeContextMenu();
                  }}
                />
              ))}
            </div>
          }
        />
        <div className="h-px bg-white/10 my-1 mx-2" />
        <MenuItem 
          label="System Settings" 
          icon={SettingsIcon} 
          onClick={() => openApp('settings')} 
        />
        <MenuItem 
          label="Refresh Simulation" 
          icon={RotateCcw} 
          onClick={() => window.location.reload()} 
          danger
        />
      </div>
    </motion.div>
  );
};

export default ContextMenu;
