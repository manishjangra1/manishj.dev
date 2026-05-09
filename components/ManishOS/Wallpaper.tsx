'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';

const Wallpaper: React.FC = () => {
  const { resolvedTheme } = useOS();

  // Wave configurations for Light and Dark modes
  const themeColors = {
    light: {
      bg: '#0062e3',
      wave1: '#007aff',
      wave2: '#00c6ff',
      wave3: '#5ac8fa',
      accent: '#ffffff',
    },
    dark: {
      bg: '#00050a',
      wave1: '#001a35',
      wave2: '#000d1a',
      wave3: '#002244',
      accent: '#003366',
    }
  };

  const colors = resolvedTheme === 'dark' ? themeColors.dark : themeColors.light;

  return (
    <div className="w-full h-full relative overflow-hidden transition-colors duration-1000" style={{ backgroundColor: colors.bg }}>
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-40 blur-[120px]">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-[90%] h-[90%] rounded-full"
          style={{ backgroundColor: colors.wave3 }}
        />
      </div>

      {/* Single Liquid Wave using SVG */}
      <svg 
        viewBox="0 0 1440 900" 
        preserveAspectRatio="none" 
        className="absolute inset-0 w-full h-full transition-all duration-1000"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.wave1} stopOpacity="1" />
            <stop offset="100%" stopColor={colors.bg} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Primary Morphing Wave */}
        <motion.path
          animate={{
            d: [
              "M0,400 C400,300 800,600 1440,400 L1440,900 L0,900 Z",
              "M0,450 C450,350 750,550 1440,450 L1440,900 L0,900 Z"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          fill="url(#waveGradient)"
        />

        {/* Subtle Highlight Border */}
        <motion.path
          animate={{
            d: [
              "M0,400 C400,300 800,600 1440,400",
              "M0,450 C450,350 750,550 1440,450"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          fill="none"
          stroke={colors.accent}
          strokeWidth="2"
          strokeOpacity="0.1"
        />
      </svg>

      {/* Glassmorphic Overlay */}
      <div className="absolute inset-0 backdrop-blur-[15px] pointer-events-none opacity-10" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Cinematic Vignette */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
        resolvedTheme === 'dark' 
          ? 'bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] opacity-90' 
          : 'bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.1)_100%)] opacity-40'
      }`} />
    </div>
  );
};

export default Wallpaper;
