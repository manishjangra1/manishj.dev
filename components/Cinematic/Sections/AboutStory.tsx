'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';

const AboutStory: React.FC = () => {
  const { settings } = useData();

  const statements = [
    "Obsessed with interfaces that feel alive.",
    "Building emotion through interaction.",
    "Crafting immersive digital systems.",
    "Bridging the gap between design and motion."
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center px-12 md:px-32 pointer-events-none overflow-hidden">
      <div className="w-full max-w-6xl h-full max-h-[85vh] pointer-events-auto overflow-y-auto overflow-x-visible scrollbar-hide pb-32 pt-12 md:pb-40">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start">
          
          {/* Left Side: Editorial Statements */}
          <div className="flex-1 flex flex-col gap-6 md:gap-10">
            {statements.map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold tracking-tight !text-foreground group-hover:!text-accent-amber transition-all duration-700 cursor-default leading-[1.1]">
                  {text}
                </h2>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Detailed Philosophy & Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex-1 flex flex-col gap-10 max-w-xl"
          >
            {settings?.aboutImage && (
              <div className="relative aspect-[4/3] md:aspect-square w-full rounded-3xl overflow-hidden glass p-1 shadow-2xl">
                <img 
                  src={settings.aboutImage} 
                  alt="Manish" 
                  className="w-full h-full object-cover rounded-[22px] grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-accent-amber/5 mix-blend-overlay pointer-events-none" />
              </div>
            )}

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-accent-amber/40" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-accent-amber font-mono">
                    The Architecture
                  </span>
                </div>

                <p className="text-foreground/75 text-lg md:text-xl leading-relaxed font-light">
                  {settings?.aboutText || "I am an architectural digital developer who believes that the web should be an immersive environment, not just a surface. My work focuses on high-performance spatial systems, cinematic motion, and premium industrial design aesthetics."}
                </p>
              </div>
              
              <div className="flex flex-col gap-3 pt-6 border-t border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-amber/50 shadow-[0_0_8px_rgba(214,168,106,0.4)]" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-mono">
                    Meticulous Industrial Craft
                  </span>
                </div>
                <div className="items-center gap-3 hidden md:flex">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-amber/50 shadow-[0_0_8px_rgba(214,168,106,0.4)]" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-mono">
                    Atmospheric Motion Engineering
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AboutStory;
