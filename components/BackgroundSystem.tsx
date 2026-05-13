'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BackgroundSystem() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.05, 0.03]);

  if (!mounted) return null;

  return (
    <>
      {/* Noise Texture */}
      <div className="noise-overlay" />

      {/* Atmospheric Glow */}
      <motion.div 
        className="ambient-glow"
        style={{ opacity }}
      />

      {/* Subtle Grain Motion */}
      <motion.div
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
