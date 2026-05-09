'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/contexts/DataContext';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "Initializing MOS v1.0.4...",
  "Loading kernel modules...",
  "Scanning hardware architecture...",
  "Memory check: 64GB Virtual RAM OK",
  "Initializing Spatial Depth Engine...",
  "Loading Glassmorphism Shaders...",
  "Mounting Projects District...",
  "Connecting to MongoDB CMS...",
  "Pre-caching Simulation Assets...",
  "Optimizing cinematic interactions...",
  "Ready.",
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentLog, setCurrentLog] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  const { isLoading, projects, settings } = useData();

  // Pre-cache all critical images
  useEffect(() => {
    const cacheImages = async () => {
      const imagesToCache = [
        settings?.aboutImage,
        ...projects.map(p => p.image).filter(Boolean)
      ];

      try {
        await Promise.all(imagesToCache.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src!;
            img.onload = resolve;
            img.onerror = resolve; // Continue even if one fails
          });
        }));
        setIsAssetsLoaded(true);
      } catch (e) {
        setIsAssetsLoaded(true);
      }
    };

    if (projects.length > 0) {
      cacheImages();
    } else if (!isLoading) {
      setIsAssetsLoaded(true);
    }
  }, [projects, settings, isLoading]);

  useEffect(() => {
    const isSyncingLog = BOOT_LOGS[currentLog] === "Connecting to MongoDB CMS...";
    const isCachingLog = BOOT_LOGS[currentLog] === "Pre-caching Simulation Assets...";
    
    if (currentLog < BOOT_LOGS.length) {
      if (isSyncingLog && isLoading) return;
      if (isCachingLog && !isAssetsLoaded) return;

      const timer = setTimeout(() => {
        setCurrentLog(prev => prev + 1);
      }, 150 + Math.random() * 250); // Sped up the logs for snappier feel
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentLog, isLoading, isAssetsLoaded]);

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800); // Shorter welcome for faster entry
      return () => clearTimeout(timer);
    }
  }, [showWelcome, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-sm tracking-tight p-8">
      <div className="w-full max-w-lg">
        <div className="space-y-1 mb-8">
          {BOOT_LOGS.slice(0, currentLog).map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={index === BOOT_LOGS.length - 1 ? "text-blue-400" : "text-gray-400"}
            >
              <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
              {log}
            </motion.div>
          ))}
          {currentLog < BOOT_LOGS.length && (
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-white align-middle ml-1"
            />
          )}
        </div>

        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <motion.h1 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-2xl font-sans font-light tracking-[0.3em] text-white uppercase"
              >
                SYSTEM READY
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 left-0 right-0 text-center text-gray-700 text-[10px] md:text-xs tracking-widest uppercase px-4 pointer-events-none">
        © 2026 Manish Jangra — All Rights Reserved
      </div>
    </div>
  );
};

export default BootSequence;
