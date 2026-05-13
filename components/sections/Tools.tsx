'use client';

import { useData } from '@/contexts/DataContext';
import Section from '../Section';
import { motion } from 'framer-motion';

export default function Tools() {
  const { skills } = useData();

  // Group skills by category if possible
  const categories = Array.from(new Set(skills.map((s: any) => s.category || 'Expertise')));

  return (
    <Section id="tools" className="bg-transparent overflow-hidden">
      <div className="mb-20">
        <span className="label">The Stack</span>
        <h2 className="mt-4">Technical <span className="text-accent italic">Architecture</span></h2>
      </div>

      <div className="flex flex-col gap-20">
        {/* Infinite Marquee for all tools */}
        <div className="relative flex overflow-x-hidden border-y border-foreground/5 py-10">
          <MarqueeContent skills={skills} />
          <MarqueeContent skills={skills} />
        </div>

        <div className="asymmetrical-grid">
          {categories.slice(0, 3).map((cat: any, i: number) => (
            <div key={cat} className={`col-span-12 md:col-span-4 ${i === 1 ? 'md:mt-20' : ''}`}>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="label text-[10px]">{cat}</span>
                  <div className="h-[1px] flex-1 bg-foreground/10" />
                </div>
                <div className="flex flex-col gap-4">
                   {skills
                    .filter((s: any) => s.category === cat)
                    .slice(0, 5)
                    .map((skill: any) => (
                      <div key={skill._id} className="flex justify-between items-end group">
                        <span className="text-xl font-medium opacity-60 group-hover:opacity-100 transition-opacity">{skill.name}</span>
                        <span className="text-[10px] font-mono opacity-20 group-hover:text-accent group-hover:opacity-100 transition-all">0{skill.level || 9}%</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function MarqueeContent({ skills }: { skills: any[] }) {
  return (
    <motion.div 
      animate={{ x: ['0%', '-100%'] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex whitespace-nowrap gap-20 px-10"
    >
      {skills.map((skill: any) => (
        <span key={skill._id} className="h1 opacity-10 hover:opacity-100 hover:text-accent transition-all duration-700 cursor-default select-none">
          {skill.name}
        </span>
      ))}
    </motion.div>
  );
}
