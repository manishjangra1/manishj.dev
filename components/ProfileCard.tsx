'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dribbble, Twitter, Instagram, Youtube, Flame } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

export default function ProfileCard() {
  const { settings } = useData();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sawad-card flex flex-col items-center justify-between text-center overflow-hidden"
    >
      {/* Background Decorative Arcs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20px] left-[-20px] w-32 h-32 border-2 border-[#FF5F2E] border-dashed rounded-full opacity-60" />
        <div className="absolute bottom-[20%] left-[-40px] w-48 h-48 border-2 border-[#FF5F2E] border-dashed rounded-full opacity-60" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full gap-8">
        {/* Portrait Image */}
        <div className="relative w-full aspect-square rounded-[16px] overflow-hidden bg-[#FF5F2E] p-3">
           <div className="relative w-full h-full rounded-[12px] overflow-hidden">
             {settings?.aboutImage ? (
               <Image
                 src={settings.aboutImage}
                 alt={settings.siteTitle || "Manish"}
                 fill
                 className="object-cover"
               />
             ) : (
               <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                 <span className="text-white text-4xl font-bold">M</span>
               </div>
             )}
           </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[36px] font-black uppercase tracking-tight text-black leading-none">
            {settings?.siteTitle || "Manish"}
          </h2>
          
          <div className="flex flex-col items-center gap-4 px-2">
            <div className="w-12 h-12 rounded-full bg-[#FF5F2E] flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
               <Flame size={24} fill="white" />
            </div>
            <p className="text-[13px] font-bold uppercase tracking-widest text-black/40 leading-relaxed max-w-[240px]">
              {settings?.siteDescription || "A Software Engineer who has developed countless innovative solutions."}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-8 text-black/30 pt-8">
        <a href={settings?.socialLinks?.portfolio || "#"} target="_blank" rel="noopener noreferrer">
          <Dribbble size={20} className="hover:text-[#FF5F2E] cursor-pointer transition-colors" />
        </a>
        <a href={settings?.socialLinks?.twitter || "#"} target="_blank" rel="noopener noreferrer">
          <Twitter size={20} className="hover:text-[#FF5F2E] cursor-pointer transition-colors" />
        </a>
        <a href={settings?.socialLinks?.linkedin || "#"} target="_blank" rel="noopener noreferrer">
          <Instagram size={20} className="hover:text-[#FF5F2E] cursor-pointer transition-colors" />
        </a>
        <a href={settings?.socialLinks?.github || "#"} target="_blank" rel="noopener noreferrer">
          <Youtube size={20} className="hover:text-[#FF5F2E] cursor-pointer transition-colors" />
        </a>
      </div>
    </motion.div>
  );
}
