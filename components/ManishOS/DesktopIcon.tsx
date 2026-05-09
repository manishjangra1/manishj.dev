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
  top?: number;
  right?: number;
  dragConstraints?: React.RefObject<any>;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick, href, color = 'text-white', top, right }) => {
  const { resolvedTheme } = useOS();

  const handleLaunch = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      onDoubleClick={handleLaunch}
      className="absolute flex flex-col items-center gap-2 w-24 cursor-pointer group select-none pointer-events-auto"
      style={{ top, right }}
    >
      <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center border shadow-xl transition-all duration-500 backdrop-blur-xl ${
        resolvedTheme === 'dark' 
          ? 'bg-white/10 border-white/20 group-hover:bg-white/20 group-hover:border-white/30' 
          : 'bg-white/60 border-black/5 group-hover:bg-white group-hover:shadow-2xl'
      }`}>
        <div className={`w-11 h-11 transition-all duration-500 drop-shadow-lg group-hover:scale-110 flex items-center justify-center ${color}`}>
          {React.cloneElement(icon as React.ReactElement<any>, { size: 44, strokeWidth: 1.5 })}
        </div>
      </div>
      <span className={`text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-lg transition-all duration-500 ${
        resolvedTheme === 'dark' 
          ? 'text-white/80 bg-black/40 border border-white/5 group-hover:text-white group-hover:bg-black/60' 
          : 'text-zinc-800 bg-white/60 shadow-sm border border-black/5 group-hover:bg-white'
      }`}>
        {label}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;
