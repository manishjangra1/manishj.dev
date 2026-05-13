'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dribbble, Twitter, Instagram, Youtube, Play, Flame } from 'lucide-react';

export default function ProfileCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sawad-card flex flex-col gap-8 h-fit"
    >
      {/* Portrait Image with Orange Ring */}
      <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-[#F0F0F0]">
         {/* Decorative Orange Arc */}
         <div className="absolute top-4 left-4 w-24 h-24 border-2 border-orange-500 border-dashed rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60" />
         
         <div className="absolute inset-0 m-4 rounded-[1.2rem] overflow-hidden bg-[#FF5F2E]">
           {/* Placeholder for actual image */}
           <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
             <span className="text-white text-4xl font-bold">M</span>
           </div>
         </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[42px] font-black uppercase tracking-tight text-black leading-none">Manish</h2>
          
          <div className="flex items-start gap-3 mt-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#FF3B30] flex items-center justify-center text-white">
               <Flame size={24} fill="white" />
            </div>
            <p className="text-[12px] font-bold uppercase tracking-widest text-black/40 leading-tight">
              A Software Engineer who has<br/>developed countless innovative<br/>solutions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-black/20 pt-2">
          <Dribbble size={20} className="hover:text-[#FF3B30] cursor-pointer transition-colors" />
          <Twitter size={20} className="hover:text-[#FF3B30] cursor-pointer transition-colors" />
          <Instagram size={20} className="hover:text-[#FF3B30] cursor-pointer transition-colors" />
          <Youtube size={20} className="hover:text-[#FF3B30] cursor-pointer transition-colors" />
        </div>

        <div className="mt-2">
          <button className="bg-[#FF3B30] text-white px-6 py-4 rounded-full flex items-center gap-3 text-[12px] font-black uppercase tracking-widest hover:scale-105 transition-transform group shadow-lg">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <Play size={10} fill="white" />
            </div>
            Video Tutorial
          </button>
        </div>
      </div>

      {/* Made in Framer Badge */}
      <div className="mt-8 flex justify-end">
        <div className="bg-white border border-black/5 px-3 py-2 rounded-lg flex items-center gap-2 shadow-sm">
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H12V6H6L0 0Z" fill="black"/>
            <path d="M0 6H6L12 12H0V6Z" fill="black"/>
            <path d="M0 12H6L12 18H0V12Z" fill="black"/>
          </svg>
          <span className="text-[10px] font-bold text-black uppercase tracking-tight">Made in Framer</span>
        </div>
      </div>
    </motion.div>
  );
}
