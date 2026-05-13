'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutStory: React.FC = () => {
  const statements = [
    "Obsessed with interfaces that feel alive.",
    "Building emotion through interaction.",
    "Crafting immersive digital systems.",
    "Bridging the gap between design and motion."
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-24 pointer-events-none">
      <div className="w-full max-w-4xl pointer-events-auto">
        <div className="flex flex-col gap-12">
          {statements.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white/20 group-hover:text-white transition-colors duration-700 cursor-default">
                {text}
              </h2>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-col gap-4 max-w-lg"
          >
            <p className="text-white/40 text-lg leading-relaxed">
              I am a creative full-stack developer who believes that the web should be an experience, not just a tool. 
              My work focuses on high-performance 3D environments, complex animations, and editorial-grade layout design.
            </p>
            
            <div className="flex gap-4 items-center">
              <div className="h-[1px] w-12 bg-accent-blue" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent-blue font-mono">
                The Philosophy
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutStory;
