'use client';

import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useOS, AppId } from '@/contexts/OSContext';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
  id: AppId;
  title: string;
  zIndex: number;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ id, title, zIndex, children }) => {
  const { closeApp, minimizeApp, maximizeApp, focusApp, windows, resolvedTheme } = useOS();
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  
  const isMaximized = windows[id].isMaximized;

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        zIndex: zIndex,
        ...(isMaximized ? {
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          x: 0,
          y: 0,
        } : {
          width: '80%',
          height: '70%',
          top: '10%',
          left: '10%',
          y: 0,
        })
      }}
      exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onPointerDown={() => focusApp(id)}
      className={`absolute flex flex-col pointer-events-auto rounded-xl border backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-500 ${
        isMaximized ? 'rounded-none' : ''
      } ${
        resolvedTheme === 'dark' 
          ? 'bg-zinc-900/40 border-white/20 text-white' 
          : 'bg-white/40 border-black/10 text-zinc-900'
      }`}
    >
      {/* Title Bar */}
      <div 
        className={`h-10 flex items-center justify-between px-4 border-b cursor-default select-none shrink-0 transition-colors duration-500 ${
          resolvedTheme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
        }`}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-2">
          {/* Traffic Lights */}
          <div className="flex gap-2 mr-4 group/controls">
            <button 
              onClick={(e) => { e.stopPropagation(); closeApp(id); }}
              className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center group/btn transition-colors hover:bg-red-600"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover/controls:opacity-100" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
              className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center group/btn transition-colors hover:bg-yellow-600"
            >
              <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover/controls:opacity-100" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
              className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center group/btn transition-colors hover:bg-green-600"
            >
              <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover/controls:opacity-100" />
            </button>
          </div>
          <span className={`text-xs font-medium tracking-wide uppercase opacity-60`}>
            {title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-auto custom-scrollbar transition-colors duration-500 ${
        resolvedTheme === 'dark' ? 'bg-black/20' : 'bg-white/20'
      }`}>
        {children}
      </div>

      {/* Resize Handle (Optional/Simplified) */}
      {!isMaximized && (
        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize" />
      )}
    </motion.div>
  );
};

export default Window;
