'use client';

import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';

export default function Tools() {
  const { skills } = useData();

  return (
    <section id="tools" className="flex flex-col gap-12">
      <div className="flex flex-col mb-[48px]">
        <h2 className="flex flex-col">
          <span>Premium</span>
          <span className="h1-grey">Tools</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skills.map((skill: any, index: number) => (
          <motion.div
            key={skill._id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="dark-card flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-3">
               {/* Tool Icon Placeholder */}
               <div className="w-full h-full bg-neutral-800 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">
                 {skill.name.substring(0, 2).toUpperCase()}
               </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-black uppercase tracking-tight">{skill.name}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{skill.category || 'Development'}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
