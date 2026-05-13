'use client';

import { motion } from 'framer-motion';
import { Home, Folder, Briefcase, Wrench, PenTool } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  const navItems = [
    { icon: <Home size={20} />, href: '#' },
    { icon: <Folder size={20} />, href: '#projects' },
    { icon: <Briefcase size={20} />, href: '#experience' },
    { icon: <Wrench size={20} />, href: '#tools' },
    { icon: <PenTool size={20} />, href: '#blog' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 left-1/2 z-[5000] flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10"
    >
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors text-white/50 hover:text-white"
        >
          {item.icon}
        </Link>
      ))}
    </motion.nav>
  );
}
