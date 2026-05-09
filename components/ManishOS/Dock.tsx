'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useOS, AppId } from '@/contexts/OSContext';
import { 
  Briefcase, 
  User, 
  Terminal as TerminalIcon, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings as SettingsIcon 
} from 'lucide-react';

const APPS: { id: AppId; icon: any; label: string; color: string }[] = [
  { id: 'projects', icon: Briefcase, label: 'Projects', color: 'bg-blue-500' },
  { id: 'about', icon: User, label: 'About', color: 'bg-green-500' },
  { id: 'terminal', icon: TerminalIcon, label: 'Terminal', color: 'bg-zinc-800' },
  { id: 'gallery', icon: ImageIcon, label: 'Gallery', color: 'bg-purple-500' },
  { id: 'messages', icon: MessageSquare, label: 'Messages', color: 'bg-emerald-500' },
  { id: 'settings', icon: SettingsIcon, label: 'Settings', color: 'bg-gray-500' },
];

function DockItem({ 
  app, 
  mouseX, 
  onClick 
}: { 
  app: typeof APPS[0], 
  mouseX: MotionValue, 
  onClick: () => void 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { windows } = useOS();
  const isOpen = windows[app.id].isOpen;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onClick={onClick}
      className={`relative flex items-center justify-center rounded-2xl cursor-pointer group shadow-lg transition-colors overflow-visible`}
    >
      <div className={`absolute inset-0 rounded-2xl opacity-80 blur-md group-hover:blur-lg transition-all ${app.color}`} />
      <div className={`relative z-10 w-full h-full flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md`}>
        <app.icon className="w-1/2 h-1/2 text-white" />
      </div>

      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-900/80 backdrop-blur-md rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
        {app.label}
      </div>

      {/* Active Indicator */}
      {isOpen && (
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_5px_white]" />
      )}
    </motion.div>
  );
}

const Dock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);
  const { openApp } = useOS();

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end gap-3 px-4 py-3 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      {APPS.map((app) => (
        <DockItem 
          key={app.id} 
          app={app} 
          mouseX={mouseX} 
          onClick={() => openApp(app.id)}
        />
      ))}
    </motion.div>
  );
};

export default Dock;
