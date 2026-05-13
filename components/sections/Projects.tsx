'use client';

import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const { projects } = useData();

  return (
    <section id="projects" className="flex flex-col gap-12">
      <div className="flex flex-col mb-[48px]">
        <h2 className="flex flex-col">
          <span>Recent</span>
          <span className="h1-grey">Projects</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project: any, index: number) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="dark-card group cursor-pointer flex items-center justify-between hover:bg-[#262626] transition-colors"
          >
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/5">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 font-bold text-xl">
                    {index + 1}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-black uppercase tracking-tight">{project.title}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-white/30">{project.technologies?.[0] || 'Web Design'}</p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 transition-all">
              <ArrowUpRight size={20} className="text-white/40 group-hover:text-white transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
