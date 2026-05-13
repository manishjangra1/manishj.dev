'use client';

import { motion } from 'framer-motion';
import Section from '../Section';

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <Section className="relative pt-40 pb-20 overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10"
      >
        <motion.div variants={item} className="label mb-6">Creative Engineer</motion.div>
        
        <motion.h1 variants={item} className="max-w-[12ch]">
          Engineering products with <span className="text-accent italic">precision</span> and emotion.
        </motion.h1>

        <motion.div variants={item} className="mt-20 asymmetrical-grid items-end">
          <div className="grid-cols-start-1 col-span-12 md:col-span-5">
            <p className="body max-w-md">
              Specializing in crafting digital systems that feel alive. My work sits at the intersection of robust architecture and immersive interaction design.
            </p>
          </div>
          
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <div className="flex flex-col gap-4">
              <div className="h-[1px] w-full bg-foreground/10" />
              <div className="flex justify-between items-center">
                <span className="label">Based in</span>
                <span className="text-sm font-medium">Remote / India</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="label">Focus</span>
                <span className="text-sm font-medium">Full Stack / Interaction</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Background Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-bold pointer-events-none opacity-[0.02] select-none"
      >
        MANISH
      </motion.div>
    </Section>
  );
}
