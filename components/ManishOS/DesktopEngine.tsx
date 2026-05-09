'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { OSProvider, useOS } from '@/contexts/OSContext';
import WindowManager from './WindowManager';
import Dock from './Dock';
import Wallpaper from './Wallpaper';
import AIAssistant from './AIAssistant';
import BootSequence from './BootSequence';

const DesktopEngineContent: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const { windows } = useOS();

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const translateX = useSpring(useMotionValue(0), springConfig);
  const translateY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 50;
      const moveY = (clientY - window.innerHeight / 2) / 50;
      translateX.set(-moveX);
      translateY.set(-moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [translateX, translateY]);

  if (!isBooted) {
    return <BootSequence onComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans text-white select-none">
      {/* Cinematic Wallpaper with Parallax */}
      <motion.div 
        style={{ x: translateX, y: translateY, scale: 1.1 }}
        className="absolute inset-0 z-0"
      >
        <Wallpaper />
      </motion.div>

      {/* Main Desktop Area */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden">
        <WindowManager />
      </main>

      {/* Ambient Assistant */}
      <AIAssistant />

      {/* macOS-style Dock */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Dock />
      </div>

      {/* Background Lighting/Vignette */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

const DesktopEngine: React.FC = () => {
  return (
    <DesktopEngineContent />
  );
};

export default DesktopEngine;
