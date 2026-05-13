'use client';

import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Experience() {
  const { experience } = useData();

  return (
    <section id="experience" className="flex flex-col gap-12">
      <div className="flex flex-col mb-[48px]">
        <h2 className="flex flex-col">
          <span>Years of</span>
          <span className="h1-grey">Experience</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {experience.map((exp: any, index: number) => (
          <motion.div
            key={exp._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col md:flex-row md:items-start justify-between gap-6 group"
          >
            <div className="flex flex-col gap-4 flex-1">
              <h3 className="text-3xl font-black uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                {exp.company}
              </h3>
              <p className="body text-sm max-w-xl">
                {exp.description || 'Led the design team in creating user-centric mobile and web applications, improving the user experience and increasing user engagement.'}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2020'} — {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0">
              <ArrowUpRight size={20} className="text-white/20" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
