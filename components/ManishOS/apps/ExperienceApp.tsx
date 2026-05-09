'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';

const ExperienceApp: React.FC = () => {
  const { resolvedTheme } = useOS();

  return (
    <div className={`h-full p-8 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
    }`}>
      <h2 className="text-2xl font-bold mb-8">Professional Journey</h2>
      <div className="space-y-12">
        {[
          { 
            role: 'Lead Fullstack Developer', 
            company: 'Tech Innovators', 
            period: '2022 - Present',
            desc: 'Leading the development of high-performance spatial computing web platforms.'
          },
          { 
            role: 'Senior React Developer', 
            company: 'Creative Studio', 
            period: '2020 - 2022',
            desc: 'Architected immersive user interfaces and cinematic web experiences.'
          },
          { 
            role: 'Software Engineer', 
            company: 'Future Systems', 
            period: '2018 - 2020',
            desc: 'Developed scalable microservices and real-time data visualizations.'
          }
        ].map((job, i) => (
          <div key={i} className="relative pl-8 border-l border-blue-500/30">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-500" />
            <div className="text-sm font-medium text-blue-500 mb-1">{job.period}</div>
            <h3 className="text-xl font-bold">{job.role}</h3>
            <div className="text-sm opacity-60 mb-4">{job.company}</div>
            <p className="opacity-70 leading-relaxed">{job.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceApp;
