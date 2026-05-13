'use client';

import { motion } from 'framer-motion';
import { Layers, Layout } from 'lucide-react';

export default function Hero() {
  return (
    <section className="flex flex-col gap-16 pt-8">
      <div className="flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="flex flex-col mb-[40px]">
            <span>Software</span>
            <span className="h1-grey">Engineer</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="body max-w-lg"
        >
          Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-16 mt-16"
        >
          <div className="stat-item">
            <span className="stat-value">+12</span>
            <span className="stat-label">Years of Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">+46</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">+20</span>
            <span className="stat-label">Worldwide Clients</span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="accent-card-orange flex flex-col justify-between aspect-square md:aspect-auto md:h-[220px]">
          <Layers size={32} />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-black uppercase tracking-tight leading-none">
              Dynamic Animation, Motion Design
            </h3>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center self-end mt-2">
              <span className="text-xl">→</span>
            </div>
          </div>
        </div>

        <div className="accent-card-lime flex flex-col justify-between aspect-square md:aspect-auto md:h-[220px]">
          <Layout size={32} />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-black uppercase tracking-tight leading-none">
              Framer, Figma, Wordpress, ReactJS
            </h3>
            <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center self-end mt-2">
              <span className="text-xl">→</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
