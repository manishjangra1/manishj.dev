'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';

const AboutApp: React.FC = () => {
  const { resolvedTheme } = useOS();

  return (
    <div className={`h-full p-8 overflow-y-auto custom-scrollbar flex flex-col md:flex-row gap-8 transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
    }`}>
      <div className="w-full md:w-1/3 space-y-6">
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl relative overflow-hidden">
          {/* Avatar Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center text-6xl">👨‍💻</div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Manish Jangra</h2>
          <p className={resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Spatial Computing Enthusiast</p>
        </div>
      </div>
      
      <div className="flex-1 space-y-8">
        <section>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${
            resolvedTheme === 'dark' ? 'text-gray-500' : 'text-zinc-400'
          }`}>The Story</h3>
          <p className={`leading-relaxed text-lg transition-colors ${
            resolvedTheme === 'dark' ? 'text-gray-300' : 'text-zinc-600'
          }`}>
            I am a full-stack developer dedicated to bridging the gap between traditional web experiences and immersive spatial computing. My work focuses on creating cinematic, interaction-heavy digital environments that feel like a real operating system.
          </p>
        </section>

        <section>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${
            resolvedTheme === 'dark' ? 'text-gray-500' : 'text-zinc-400'
          }`}>Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'Three.js', 'Framer Motion', 'Tailwind', 'MongoDB'].map(tech => (
              <span key={tech} className={`px-3 py-1 rounded-full border text-sm transition-all ${
                resolvedTheme === 'dark' 
                  ? 'bg-white/5 border-white/10 text-gray-400' 
                  : 'bg-black/5 border-black/5 text-zinc-600'
              }`}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutApp;
