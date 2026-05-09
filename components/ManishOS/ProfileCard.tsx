'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useOS } from '@/contexts/OSContext';
import { useSettings } from '@/hooks/useData';
import { X } from 'lucide-react';

const ProfileCard: React.FC = () => {
  const { resolvedTheme, isMobile } = useOS();
  const { settings, isLoading } = useSettings();
  const [isEnlarged, setIsEnlarged] = useState(false);

  const profile = {
    name: settings?.siteTitle || 'Manish',
    role: settings?.heroText || 'Full Stack Software Developer',
    bio: settings?.aboutText || settings?.siteDescription || 'Crafting thoughtful digital experiences.',
    aboutImage: settings?.aboutImage || '/avatar.png'
  };

  return (
    <>
      <div className={`flex flex-col gap-4 ${isMobile ? 'w-fit' : ''}`}>
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: isMobile ? 0 : -20, y: isMobile ? 20 : 0 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`rounded-[24px] border backdrop-blur-3xl shadow-2xl relative overflow-hidden group transition-all duration-500 ${
            isMobile ? 'w-[70vw] p-3' : 'w-[400px] p-7'
          } ${
            resolvedTheme === 'dark' 
              ? 'border-white/15 bg-white/10 text-white' 
              : 'border-black/10 bg-white/95 text-zinc-900 shadow-xl'
          }`}
        >
          {/* Subtle Inner Glow */}
          <div className={`absolute inset-0 rounded-[24px] border pointer-events-none ${
            resolvedTheme === 'dark' ? 'border-white/5' : 'border-black/5'
          }`} />
          
          <div className={`relative z-10 flex flex-col ${isMobile ? 'gap-2' : 'gap-6'}`}>
            {/* Avatar - Clickable to enlarge */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEnlarged(true)}
              className={`${isMobile ? 'w-10 h-10' : 'w-16 h-16'} cursor-pointer rounded-full overflow-hidden border-2 shadow-lg transition-colors duration-500 ${
                resolvedTheme === 'dark' ? 'border-white/20 bg-neutral-800' : 'border-black/30 bg-neutral-100'
              }`}
            >
              {isLoading ? (
                <div className="w-full h-full animate-pulse bg-zinc-500/20" />
              ) : (
                <img 
                  src={profile.aboutImage} 
                  alt={profile.name} 
                  className={`object-cover w-full h-full transition-all duration-700 ${
                    resolvedTheme === 'dark' 
                      ? 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100' 
                      : 'grayscale-0 opacity-100 brightness-95 contrast-110'
                  }`}
                />
              )}
            </motion.div>

            {/* Info */}
            <div className="flex flex-col gap-1.5">
              <h2 className={`${isMobile ? 'text-[14px]' : 'text-[24px]'} font-bold tracking-tight leading-tight`}>
                {isLoading ? 'Loading...' : profile.name}
              </h2>
              <p className={`font-medium leading-tight ${isMobile ? 'text-[12px] opacity-80' : 'text-[20px] opacity-60'} transition-opacity ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-zinc-700'
                }`}>
                  {isLoading ? '...' : profile.role}
              </p>
              {!isMobile && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`leading-relaxed text-[15px] font-medium pt-2 transition-colors ${
                    resolvedTheme === 'dark' ? 'text-white/60' : 'text-zinc-600'
                  }`}
                >
                  {isLoading ? 'Syncing simulation...' : profile.bio}
                </motion.p>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 pt-0.5">
              <div className="relative flex items-center justify-center">
                <div className={`${isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5'} rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]`} />
                <div className={`absolute ${isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5'} rounded-full bg-emerald-400 animate-ping ${
                  resolvedTheme === 'dark' ? 'opacity-60' : 'opacity-40'
                }`} />
              </div>
              <span className={`${isMobile ? 'text-[11px]' : 'text-[14px]'} font-medium transition-colors ${
                resolvedTheme === 'dark' ? 'text-white/80' : 'text-zinc-800'
              }`}>Available for work</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enlarged Image Overlay */}
      <AnimatePresence>
        {isEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEnlarged(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className={`relative rounded-[24px] overflow-hidden shadow-2xl border ${
                isMobile ? 'w-[240px] h-[240px]' : 'w-[320px] h-[320px]'
              } ${
                resolvedTheme === 'dark' ? 'border-white/20 bg-neutral-900' : 'border-black/10 bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={profile.aboutImage} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
              
              {/* Close Button */}
              <button 
                onClick={() => setIsEnlarged(false)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-md"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileCard;
