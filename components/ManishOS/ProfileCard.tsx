'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useOS } from '@/contexts/OSContext';

const ProfileCard: React.FC = () => {
  const { resolvedTheme } = useOS();

  return (
    <div className="flex flex-col gap-4">
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className={`w-[380px] p-10 rounded-[40px] border backdrop-blur-3xl shadow-2xl relative overflow-hidden group transition-colors duration-500 ${
          resolvedTheme === 'dark' 
            ? 'border-white/15 bg-white/10 text-white' 
            : 'border-black/5 bg-white/40 text-zinc-900 shadow-xl'
        }`}
      >
        {/* Subtle Inner Glow */}
        <div className={`absolute inset-0 rounded-[40px] border pointer-events-none ${
          resolvedTheme === 'dark' ? 'border-white/5' : 'border-black/5'
        }`} />
        
        <div className="relative z-10 flex flex-col gap-8">
          {/* Avatar */}
          <div className={`w-24 h-24 rounded-full overflow-hidden border-2 shadow-xl transition-colors duration-500 ${
            resolvedTheme === 'dark' ? 'border-white/20 bg-neutral-800' : 'border-black/10 bg-neutral-200'
          }`}>
            <Image 
              src="/avatar.png" 
              alt="Steve Mac" 
              width={96} 
              height={96} 
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[28px] font-bold tracking-tight leading-none whitespace-nowrap">
              Steve — <span className={`opacity-70 font-medium text-[26px] transition-opacity ${
                resolvedTheme === 'dark' ? 'text-white' : 'text-zinc-600'
              }`}>Creative Designer</span>
            </h2>
            <p className={`leading-[1.6] text-[17px] font-medium transition-colors ${
              resolvedTheme === 'dark' ? 'text-white/60' : 'text-zinc-500'
            }`}>
              Crafting thoughtful digital experiences with clarity and purpose.
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]" />
              <div className={`absolute w-3 h-3 rounded-full bg-emerald-400 animate-ping ${
                resolvedTheme === 'dark' ? 'opacity-60' : 'opacity-40'
              }`} />
            </div>
            <span className={`text-[17px] font-medium transition-colors ${
              resolvedTheme === 'dark' ? 'text-white/80' : 'text-zinc-700'
            }`}>Available for work</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
