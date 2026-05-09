'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useOS, AppId } from '@/contexts/OSContext';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
  id: AppId;
  title: string;
  zIndex: number;
  children: React.ReactNode;
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const Window: React.FC<WindowProps> = ({ id, title, zIndex, children }) => {
  const { closeApp, minimizeApp, maximizeApp, focusApp, windows, resolvedTheme } = useOS();
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  
  const isMaximized = windows[id].isMaximized;
  
  // Size and Position State
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize size and position on first render
  useEffect(() => {
    if (!isInitialized) {
      setSize({ 
        width: window.innerWidth * 0.7, 
        height: window.innerHeight * 0.6 
      });
      setPosition({ 
        x: window.innerWidth * 0.15, 
        y: window.innerHeight * 0.1 
      });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Resizing logic
  const resizingRef = useRef<{
    direction: ResizeDirection;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startXPos: number;
    startYPos: number;
  } | null>(null);

  const startResize = useCallback((e: React.PointerEvent, direction: ResizeDirection) => {
    e.preventDefault();
    e.stopPropagation();
    focusApp(id);

    resizingRef.current = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startXPos: position.x,
      startYPos: position.y,
    };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!resizingRef.current) return;

      const { direction, startX, startY, startWidth, startHeight, startXPos, startYPos } = resizingRef.current;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startXPos;
      let newY = startYPos;

      const minWidth = 300;
      const minHeight = 200;

      if (direction.includes('e')) newWidth = Math.max(minWidth, startWidth + dx);
      if (direction.includes('w')) {
        const delta = Math.min(startWidth - minWidth, dx);
        newWidth = startWidth - delta;
        newX = startXPos + delta;
      }
      if (direction.includes('s')) newHeight = Math.max(minHeight, startHeight + dy);
      if (direction.includes('n')) {
        const delta = Math.min(startHeight - minHeight, dy);
        newHeight = startHeight - delta;
        newY = startYPos + delta;
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      resizingRef.current = null;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  }, [size, position, id, focusApp]);

  if (!isInitialized) return null;

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        zIndex: zIndex,
        width: isMaximized ? 'calc(100% - 24px)' : size.width,
        height: isMaximized ? 'calc(100% - 120px)' : size.height,
        x: isMaximized ? 12 : position.x,
        y: isMaximized ? 40 : position.y,
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={(_, info) => {
        setPosition(prev => ({ 
          x: prev.x + info.offset.x, 
          y: prev.y + info.offset.y 
        }));
      }}
      onPointerDown={() => focusApp(id)}
      transition={{ 
        type: 'spring', 
        damping: 35, 
        stiffness: 450,
        x: { type: 'just' },
        y: { type: 'just' }
      }}
      className={`absolute flex flex-col pointer-events-auto border backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden rounded-2xl ${
        resolvedTheme === 'dark' 
          ? 'bg-zinc-900/40 border-white/20 text-white' 
          : 'bg-white/40 border-black/10 text-zinc-900'
      }`}
    >
      {/* Title Bar */}
      <div 
        className={`h-11 flex items-center justify-between px-5 border-b cursor-default select-none shrink-0 transition-colors duration-500 rounded-t-2xl ${
          resolvedTheme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
        }`}
        onPointerDown={(e) => dragControls.start(e)}
        onDoubleClick={() => maximizeApp(id)}
      >
        <div className="flex items-center gap-2">
          {/* Traffic Lights */}
          <div className="flex gap-2.5 mr-5 group/controls">
            <button 
              onClick={(e) => { e.stopPropagation(); closeApp(id); }}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] flex items-center justify-center group/btn transition-colors hover:bg-[#ff4b40]"
            >
              <X className="w-2.5 h-2.5 text-black/40 opacity-0 group-hover/controls:opacity-100" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
              className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] flex items-center justify-center group/btn transition-colors hover:bg-[#ffad1a]"
            >
              <Minus className="w-2.5 h-2.5 text-black/40 opacity-0 group-hover/controls:opacity-100" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
              className="w-3.5 h-3.5 rounded-full bg-[#27c93f] flex items-center justify-center group/btn transition-colors hover:bg-[#1eb332]"
            >
              <Maximize2 className="w-2.5 h-2.5 text-black/40 opacity-0 group-hover/controls:opacity-100" />
            </button>
          </div>
          <span className={`text-[11px] font-bold tracking-widest uppercase opacity-40`}>
            {title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-auto custom-scrollbar transition-colors duration-500 rounded-b-2xl ${
        resolvedTheme === 'dark' ? 'bg-black/20' : 'bg-white/20'
      }`}>
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Edges */}
          <div className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize z-50" onPointerDown={(e) => startResize(e, 'n')} />
          <div className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize z-50" onPointerDown={(e) => startResize(e, 's')} />
          <div className="absolute top-0 bottom-0 left-0 w-2 cursor-ew-resize z-50" onPointerDown={(e) => startResize(e, 'w')} />
          <div className="absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize z-50" onPointerDown={(e) => startResize(e, 'e')} />
          
          {/* Corners */}
          <div className="absolute top-0 left-0 w-5 h-5 cursor-nwse-resize z-50" onPointerDown={(e) => startResize(e, 'nw')} />
          <div className="absolute top-0 right-0 w-5 h-5 cursor-nesw-resize z-50" onPointerDown={(e) => startResize(e, 'ne')} />
          <div className="absolute bottom-0 left-0 w-5 h-5 cursor-nesw-resize z-50" onPointerDown={(e) => startResize(e, 'sw')} />
          <div className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize z-50" onPointerDown={(e) => startResize(e, 'se')} />
        </>
      )}
    </motion.div>
  );
};

export default Window;
