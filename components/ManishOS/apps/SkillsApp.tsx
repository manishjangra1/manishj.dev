'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';

const SkillsApp: React.FC = () => {
  const { resolvedTheme } = useOS();

  return (
    <div className={`h-full p-8 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
    }`}>
      <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Three.js'] },
          { category: 'Backend', skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis'] },
          { category: 'DevOps', skills: ['Docker', 'AWS', 'Vercel', 'CI/CD', 'Git'] },
          { category: 'Design', skills: ['Figma', 'Spline', 'Framer Motion', 'UI/UX'] }
        ].map((item) => (
          <div key={item.category} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest opacity-50">{item.category}</h3>
            <div className="flex flex-wrap gap-2">
              {item.skills.map(skill => (
                <span key={skill} className={`px-3 py-1 rounded-full border text-sm ${
                  resolvedTheme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'
                }`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsApp;
