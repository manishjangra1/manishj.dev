'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function Section({ children, id, className = '', delay = 0 }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`section-padding min-h-screen flex flex-col justify-center ${className}`}
    >
      {children}
    </motion.section>
  );
}
