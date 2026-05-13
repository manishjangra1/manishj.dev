'use client';

import { useData } from '@/contexts/DataContext';
import Section from '../Section';
import { motion } from 'framer-motion';

export default function Experience() {
  const { experience } = useData();

  return (
    <Section id="experience" className="bg-transparent">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
        <div>
          <span className="label">Career Path</span>
          <h2 className="mt-4">Professional <span className="text-accent italic">Trajectory</span></h2>
        </div>
        <p className="body max-w-xs opacity-50 text-sm">
          A history of contributing to high-impact projects and engineering teams across diverse industries.
        </p>
      </div>

      <div className="flex flex-col">
        {experience.map((exp: any, index: number) => (
          <ExperienceItem key={exp._id} exp={exp} index={index} />
        ))}
      </div>
    </Section>
  );
}

function ExperienceItem({ exp, index }: { exp: any; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group border-t border-foreground/10 py-12 flex flex-col md:grid md:grid-cols-12 gap-8 items-start relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
      
      <div className="md:col-span-2 relative z-10">
        <span className="text-sm font-mono opacity-40">{exp.startDate ? new Date(exp.startDate).getFullYear() : '2023'} — {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}</span>
      </div>
      
      <div className="md:col-span-4 relative z-10">
        <h3 className="text-2xl font-semibold mb-1">{exp.company}</h3>
        <span className="label text-[10px] text-accent opacity-100">{exp.position}</span>
      </div>

      <div className="md:col-span-6 relative z-10">
        <p className="body text-sm opacity-60 group-hover:opacity-100 transition-opacity">
          {exp.description || "Leading the development of high-performance web applications and design systems for global clients."}
        </p>
      </div>
    </motion.div>
  );
}
