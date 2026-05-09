'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import WindowManager from './WindowManager';
import Dock from './Dock';
import Wallpaper from './Wallpaper';
import BootSequence from './BootSequence';
import ContextMenu from './ContextMenu';
import ProfileCard from './ProfileCard';
import MenuBar from './MenuBar';
import DesktopIcons from './DesktopIcons';
import FeaturedProjectIcons from './FeaturedProjectIcons';

const DesktopEngineContent: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const { setContextMenu, closeContextMenu, resolvedTheme, motionEnabled, openApp } = useOS();
  
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
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  
  useEffect(() => {
    if (isBooted && !hasAutoOpened) {
      const timer = setTimeout(() => {
        openApp('about');
        setHasAutoOpened(true);
      }, 4500); // Slightly longer to wait for animations
      return () => clearTimeout(timer);
    }
  }, [isBooted, hasAutoOpened, openApp]);

  if (!isBooted) {
    return <BootSequence onComplete={() => setIsBooted(true)} />;
  }

  // Animation variants for global entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const wallpaperVariants = {
    hidden: { scale: 1.15, opacity: 0 },
    visible: { 
      scale: 1.1, 
      opacity: 1,
      transition: { duration: 2.5, ease: "easeOut" }
    }
  };

  const dockVariants = {
    hidden: { opacity: 0, y: 100, x: "-50%" },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: "-50%",
      transition: { duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
      className={`relative w-screen h-screen overflow-hidden font-sans text-white select-none touch-none transition-colors duration-1000 ${
        resolvedTheme === 'dark' ? 'bg-[#00050a]' : 'bg-[#0062e3]'
      }`}
    >
      {/* MenuBar */}
      <motion.div variants={menuVariants} className="relative z-50">
        <MenuBar />
      </motion.div>

      {/* Cinematic Wallpaper (No Parallax) */}
      <motion.div 
        variants={wallpaperVariants}
        className="absolute inset-0 z-0"
      >
        <Wallpaper />
      </motion.div>

      {/* Personal Profile Card - Top Left */}
      <motion.div 
        variants={itemVariants}
        className="absolute top-12 left-4 z-[5]"
      >
        <ProfileCard />
      </motion.div>

      {/* Desktop Icons - Staggered */}
      <motion.div variants={itemVariants}>
        <DesktopIcons />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FeaturedProjectIcons />
      </motion.div>

      {/* Main Desktop Area */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center overflow-hidden pointer-events-none">
        <WindowManager />
      </main>

      {/* macOS-style Dock */}
      <motion.div 
        variants={dockVariants}
        className="absolute bottom-3 left-1/2 z-50"
      >
        <Dock />
      </motion.div>

      {/* Background Lighting/Vignette Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-1000 ${
          resolvedTheme === 'dark' 
            ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-100' 
            : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.4)_100%)] opacity-30'
        }`} 
      />

      {/* Context Menu */}
      <ContextMenu />
    </motion.div>
  );
};

const DesktopEngine: React.FC = () => {
  return (
    <DesktopEngineContent />
  );
};

export default DesktopEngine;
