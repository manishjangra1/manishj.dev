'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import { Star } from 'lucide-react';

interface DesktopIconProps {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  image?: string;
  color?: string;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  showStar?: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  icon, 
  label, 
  href, 
  onClick, 
  image, 
  color = 'text-white',
  top,
  bottom,
  right,
  left,
  showStar = false
}) => {
  const { resolvedTheme, isMobile } = useOS();

  const handleLaunch = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const displayLabel = label.length > 10 ? `${label.slice(0, 5)}...` : label;

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
      }
    }
  };

  return (
    <motion.div
      variants={iconVariants}
      drag
      dragMomentum={false}
      whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
      whileTap={{ scale: 0.95 }}
      // On mobile, use single click. On desktop, use double click.
      onClick={isMobile ? handleLaunch : undefined}
      onDoubleClick={!isMobile ? handleLaunch : undefined}
      className={`absolute flex flex-col items-center gap-1 cursor-pointer group select-none pointer-events-auto ${
        isMobile ? 'w-16' : 'w-24'
      }`}
      style={{ top, bottom, right, left }}
    >
      <div className={`relative flex items-center justify-center border shadow-xl transition-all duration-500 backdrop-blur-xl overflow-hidden ${
        isMobile ? 'w-10 h-10 rounded-lg' : 'w-16 h-16 rounded-[1.25rem]'
      } ${
        resolvedTheme === 'dark' 
          ? 'bg-white/10 border-white/20 group-hover:bg-white/20 group-hover:border-white/30 shadow-blue-500/10' 
          : 'bg-white/80 border-black/10 group-hover:bg-white group-hover:shadow-2xl'
      }`}>
        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl ${
          resolvedTheme === 'dark' ? 'bg-blue-400/20' : 'bg-white'
        }`} />

        {/* Project Image or Icon */}
        {image ? (
          <img 
            src={image} 
            alt={label}
            draggable="false"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none relative z-10"
          />
        ) : (
          <div className={`transition-all duration-500 drop-shadow-lg group-hover:scale-105 flex items-center justify-center relative z-10 ${
            isMobile ? 'w-6 h-6' : 'w-11 h-11'
          } ${color}`}>
            {icon && React.cloneElement(icon as React.ReactElement<any>, { size: isMobile ? 24 : 44, strokeWidth: 1.5 })}
          </div>
        )}

        {/* Shining Star for Featured Items */}
        {showStar && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-0.5 right-0.5 z-20 pointer-events-none"
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  rotate: [0, 90, 180, 270, 360],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                className={`absolute inset-0 bg-yellow-400 blur-[3px] rounded-full ${isMobile ? 'w-1.5 h-1.5' : 'w-4 h-4'}`}
              />
              <div className="relative bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-200 p-0.5 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)] border border-white/50">
                <Star size={isMobile ? 4 : 8} fill="currentColor" className="text-amber-900" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <span className={`font-bold tracking-wide px-1 py-0.5 rounded-lg transition-all duration-500 text-center leading-tight line-clamp-1 ${
        isMobile ? 'text-[7px]' : 'text-[11px]'
      } ${
        resolvedTheme === 'dark' 
          ? 'text-white/80 bg-black/40 border border-white/5 group-hover:text-white group-hover:bg-black/60' 
          : 'text-zinc-900 bg-white/80 shadow-md border border-black/10 group-hover:bg-white'
      }`}>
        {displayLabel}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;
