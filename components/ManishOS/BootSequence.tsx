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
  "Syncing Simulation Data...",
  "Optimizing cinematic interactions...",
  "Ready.",
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentLog, setCurrentLog] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const { isLoading, settings } = useData();
  const profileImage = settings?.aboutImage || '/avatar.png';

  useEffect(() => {
    // If we are at the "Syncing Simulation Data..." log, wait for isLoading to be false
    const isSyncingLog = BOOT_LOGS[currentLog] === "Syncing Simulation Data...";
    
    if (currentLog < BOOT_LOGS.length) {
      if (isSyncingLog && isLoading) {
        // Stay on this log while loading
        return;
      }

      const timer = setTimeout(() => {
        setCurrentLog(prev => prev + 1);
      }, 400 + Math.random() * 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentLog, isLoading]);

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
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
