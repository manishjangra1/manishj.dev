'use client';

import React, { useState, useEffect } from 'react';
import { useOS, AppId } from '@/contexts/OSContext';
import { motion } from 'framer-motion';
import { Command } from 'lucide-react';

const MenuBar: React.FC = () => {
  const { openApp, resolvedTheme, isMobile } = useOS();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems: { label: string; id: AppId }[] = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'messages' }, // Using messages for contact
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 h-8 z-[100] flex items-center justify-between px-2 md:px-4 backdrop-blur-md border-b select-none transition-colors duration-500 ${
      resolvedTheme === 'dark' 
        ? 'bg-black/20 border-white/5 text-white' 
        : 'bg-white/40 border-black/5 text-zinc-900 shadow-sm'
    }`}>
      {/* Left Side */}
      <div className="flex items-center gap-2 md:gap-6 h-full overflow-x-auto scrollbar-hide">
        {!isMobile && (
          <div 
            className="flex items-center cursor-pointer hover:bg-white/10 px-2 rounded-md transition-colors shrink-0"
            onClick={() => openApp('settings')}
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mr-1.5 md:mr-2" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest">MOS</span>
          </div>
        )}

        <div className="flex items-center gap-0.5 md:gap-1 h-full">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => openApp(item.id)}
              className="text-[10px] md:text-xs font-medium px-2 md:px-3 py-1 rounded-md hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {!isMobile && (
        <div className="flex items-center gap-4 h-full pr-2">
          <div className="text-[11px] font-medium tracking-wide">
            {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            <span className="ml-2 uppercase">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
