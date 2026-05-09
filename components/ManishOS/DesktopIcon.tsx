import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import { Star } from 'lucide-react';

interface DesktopIconProps {
  icon?: React.ReactNode;
  image?: string;
  label: string;
  onClick?: () => void;
  href?: string;
  color?: string;
  top?: number;
  right?: number;
  left?: number;
  showStar?: boolean;
  dragConstraints?: React.RefObject<any>;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  icon, 
  image,
  label, 
  onClick, 
  href, 
  color = 'text-white', 
  top, 
  right,
  left,
  showStar = false
}) => {
  const { resolvedTheme } = useOS();

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
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={handleLaunch}
      className="absolute flex flex-col items-center gap-2 w-24 cursor-pointer group select-none pointer-events-auto"
      style={{ top, right, left }}
    >
      <div className={`relative w-16 h-16 rounded-[1.25rem] flex items-center justify-center border shadow-xl transition-all duration-500 backdrop-blur-xl overflow-hidden ${
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
          <div className={`w-11 h-11 transition-all duration-500 drop-shadow-lg group-hover:scale-105 flex items-center justify-center relative z-10 ${color}`}>
            {icon && React.cloneElement(icon as React.ReactElement<any>, { size: 44, strokeWidth: 1.5 })}
          </div>
        )}

        {/* Shining Star for Featured Items */}
        {showStar && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1 right-1 z-20 pointer-events-none"
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
                className="absolute inset-0 bg-yellow-400 blur-[4px] rounded-full w-4 h-4"
              />
              <div className="relative bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-200 p-0.5 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)] border border-white/50">
                <Star size={8} fill="currentColor" className="text-amber-900" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <span className={`text-[11px] font-bold tracking-wide px-0.5 py-0.5 rounded-lg transition-all duration-500 text-center leading-tight line-clamp-1 ${
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
