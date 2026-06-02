'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useData } from '@/contexts/DataContext';
import { User, Sparkles, Code2, Cpu, Zap, Heart } from 'lucide-react';

const principles = [
  {
    icon: Sparkles,
    title: "Interactive UI",
    description: "Obsessed with building smooth, intuitive interfaces that react instantly to user behavior."
  },
  {
    icon: Zap,
    title: "User-First Motion",
    description: "Bridging the gap between static design and active motion with subtle micro-animations."
  },
  {
    icon: Cpu,
    title: "Robust Systems",
    description: "Designing scalable backend architectures, secure APIs, and performant data pipelines."
  },
  {
    icon: Code2,
    title: "Modern Tech",
    description: "Utilizing React, Next.js, Node.js, TypeScript, and NestJS to engineer clean, maintainable code."
  }
];

export const AboutStory: React.FC = () => {
  const { settings } = useData();

  return (
    <div className="w-full flex flex-col gap-6 pt-6">
      
      {/* Upper Grid: Photo + Biography */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Profile Image Bento Card (1 Col) */}
        {settings?.aboutImage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="md:col-span-1 bento-card relative aspect-square md:aspect-auto md:min-h-[360px] overflow-hidden p-1 group border border-border-standard"
          >
            <img 
              src={settings.aboutImage} 
              alt="Manish Jangra" 
              className="w-full h-full object-cover rounded-[20px] grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        )}

        {/* Card 2: About Biography Card (2 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="md:col-span-2 bento-card flex flex-col justify-between min-h-[360px] relative overflow-hidden group"
        >
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-accent-amber/5 flex items-center justify-center text-accent-amber">
                <User size={12} />
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-accent-amber font-mono font-bold">
                Professional Profile
              </span>
            </div>

            <div className="space-y-4 text-foreground/75 leading-relaxed font-light text-sm sm:text-base">
              <p>
                {settings?.aboutText || "I am a full stack software engineer focused on building high-performance web applications, clean user interfaces, and robust system architectures with modern web technologies."}
              </p>

              {settings?.aboutText2 && (
                <p className="text-foreground/50 border-t border-border-standard pt-4 text-xs sm:text-sm">
                  {settings.aboutText2}
                </p>
              )}
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-border-standard text-[8px] font-mono text-foreground/20 uppercase tracking-widest flex justify-between">
            <span>Engineering Philosophy</span>
            <span className="text-accent-amber/50 font-bold">Biography</span>
          </div>
        </motion.div>
      </div>

      {/* Lower Card: Core Principles Grid Card (3 Cols - Full Width) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bento-card w-full space-y-8 relative overflow-hidden group"
      >
        
        <div className="relative z-10 flex flex-col gap-1">
          <span className="text-[9px] uppercase tracking-[0.4em] text-accent-amber font-mono font-bold">Design & Engineering Principles</span>
          <h3 className="text-lg font-bold text-foreground uppercase tracking-tight">Core Values</h3>
        </div>

        {/* 4 columns list side-by-side */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p, idx) => {
            const PrincipleIcon = p.icon;
            return (
              <div 
                key={p.title}
                className="p-4 rounded-xl border border-border-standard bg-surface-secondary/40 hover:border-accent-amber/20 hover:bg-surface-secondary transition-all duration-300 group/item flex flex-col justify-between min-h-[140px]"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-amber/5 flex items-center justify-center text-accent-amber group-hover/item:bg-accent-amber/10 transition-colors">
                    <PrincipleIcon size={14} />
                  </div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider group-hover/item:text-accent-amber transition-colors">
                    {p.title}
                  </h4>
                </div>
                <p className="text-[10px] text-foreground/45 leading-relaxed font-light mt-2">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
};

export default AboutStory;
