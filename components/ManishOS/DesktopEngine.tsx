'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import WindowManager from './WindowManager';
import Dock from './Dock';
import Wallpaper from './Wallpaper';
import BootSequence from './BootSequence';
import ContextMenu from './ContextMenu';
import ProfileCard from './ProfileCard';
import MenuBar from './MenuBar';
import DesktopIcons from './DesktopIcons';

const DesktopEngineContent: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const { setContextMenu, closeContextMenu, resolvedTheme, motionEnabled } = useOS();
  
  // Mouse parallax effect with smooth spring physics
  const springConfig = { damping: 25, stiffness: 150 };
  const translateX = useSpring(0, springConfig);
  const translateY = useSpring(0, springConfig);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!motionEnabled) return;
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 150;
      const moveY = (clientY - window.innerHeight / 2) / 150;
      translateX.set(-moveX);
      translateY.set(-moveY);
    };

    if (!motionEnabled) {
      translateX.set(0);
      translateY.set(0);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [translateX, translateY, motionEnabled]);

  // Auto-open About window after 2 seconds (only once)
  const { openApp } = useOS();
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  
  useEffect(() => {
    if (isBooted && !hasAutoOpened) {
      const timer = setTimeout(() => {
        openApp('about');
        setHasAutoOpened(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isBooted, hasAutoOpened, openApp]);

  if (!isBooted) {
    return <BootSequence onComplete={() => setIsBooted(true)} />;
  }

  return (
    <div 
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
      className={`relative w-screen h-screen overflow-hidden font-sans text-white select-none touch-none transition-colors duration-1000 ${
        resolvedTheme === 'dark' ? 'bg-[#050505]' : 'bg-[#dddde2]'
      }`}
    >
      <MenuBar />

      {/* Cinematic Wallpaper with Parallax */}
      <motion.div 
        style={{ x: translateX, y: translateY, scale: 1.1 }}
        className="absolute inset-0 z-0"
      >
        <Wallpaper />
      </motion.div>

      {/* Personal Profile Card - Top Left */}
      <div className="absolute top-12 left-4 z-[5]">
        <ProfileCard />
      </div>

      {/* Draggable Desktop Icons - Top Right */}
      <DesktopIcons />

      {/* Main Desktop Area */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center overflow-hidden pointer-events-none">
        <WindowManager />
      </main>


      {/* macOS-style Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50">
        <Dock />
      </div>

      {/* Background Lighting/Vignette */}
      <div className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-1000 ${
        resolvedTheme === 'dark' 
          ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-100' 
          : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.4)_100%)] opacity-30'
      }`} />

      {/* Context Menu */}
      <ContextMenu />
    </div>
  );
};

const DesktopEngine: React.FC = () => {
  return (
    <DesktopEngineContent />
  );
};

export default DesktopEngine;
