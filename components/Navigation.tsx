'use client';

import { useTheme, Theme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navigation() {
  const { theme, setTheme } = useTheme();

  const themes: { id: Theme; label: string }[] = [
    { id: 'eclipse', label: 'Eclipse' },
    { id: 'bone', label: 'Bone' },
    { id: 'graphite', label: 'Graphite' },
    { id: 'amber', label: 'Amber' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 left-1/2 z-[5000] flex items-center gap-8 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
    >
      <div className="flex gap-6 items-center">
        {['About', 'Projects', 'Experience', 'Blog', 'Contact'].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="h-4 w-[1px] bg-white/10" />

      <div className="flex gap-2">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              theme === t.id ? 'scale-125 border border-white/50' : 'opacity-30 hover:opacity-60'
            }`}
            style={{ 
              backgroundColor: 
                t.id === 'eclipse' ? '#ff3e00' : 
                t.id === 'bone' ? '#1a1a1a' : 
                t.id === 'graphite' ? '#888888' : '#ff9d00' 
            }}
            title={t.label}
          />
        ))}
      </div>
    </motion.nav>
  );
}
