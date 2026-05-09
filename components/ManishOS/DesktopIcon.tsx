'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  color?: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick, href, color = 'bg-white/10' }) => {
  const { resolvedTheme } = useOS();

  const content = (
    <motion.div
      drag
      dragMomentum={false}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-1.5 w-20 cursor-pointer group select-none"
      onClick={onClick}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all duration-300 ${
        resolvedTheme === 'dark' 
          ? 'bg-white/5 border-white/10 group-hover:bg-white/15' 
          : 'bg-black/5 border-black/5 group-hover:bg-white group-hover:shadow-lg'
      }`}>
        <div className={`w-8 h-8 transition-transform duration-500 group-hover:scale-110 ${color}`}>
          {icon}
        </div>
      </div>
      <span className={`text-[10px] font-bold tracking-tight px-2 py-0.5 rounded-md transition-colors ${
        resolvedTheme === 'dark' 
          ? 'text-white/70 bg-black/20' 
          : 'text-zinc-700 bg-white/40 shadow-sm'
      }`}>
        {label}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
        {content}
      </a>
    );
  }

  return content;
};

export default DesktopIcon;
