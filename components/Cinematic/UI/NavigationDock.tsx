'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Home, Briefcase, User, Mail } from 'lucide-react';
import { useExperienceStore, Section } from '@/lib/store/experience-store';

const items: { icon: any; label: Section; id: Section }[] = [
  { icon: Home, label: 'home', id: 'home' },
  { icon: Briefcase, label: 'projects', id: 'projects' },
  { icon: User, label: 'about', id: 'about' },
  { icon: Mail, label: 'contact', id: 'contact' },
];

const NavigationDock: React.FC = () => {
  const { activeSection, setActiveSection } = useExperienceStore();
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="glass px-4 py-3 rounded-2xl flex items-center gap-4 relative shadow-2xl"
    >
      {items.map((item) => (
        <DockIcon
          key={item.id}
          mouseX={mouseX}
          item={item}
          isActive={activeSection === item.id}
          onClick={() => setActiveSection(item.id)}
        />
      ))}
      
      {/* Active Indicator Glow */}
      <div 
        className="absolute bottom-0 h-[2px] bg-accent-blue shadow-[0_0_10px_#3b82f6] transition-all duration-500 ease-out"
        style={{
          width: '20px',
          left: `calc(${items.findIndex(i => i.id === activeSection) * 56 + 28}px - 10px)`
        }}
      />
    </motion.div>
  );
};

const DockIcon = ({ mouseX, item, isActive, onClick }: { 
  mouseX: MotionValue<number>; 
  item: { icon: any; label: Section; id: Section }; 
  isActive: boolean; 
  onClick: () => void 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      style={{ width }}
      className={`group relative aspect-square rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
        isActive ? 'bg-white/10' : 'hover:bg-white/5'
      }`}
    >
      <item.icon 
        size={20} 
        className={`transition-colors duration-300 ${
          isActive ? 'text-accent-blue' : 'text-white/40 group-hover:text-white'
        }`} 
      />
      
      {/* Tooltip */}
      <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md glass text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {item.label}
      </span>
    </motion.div>
  );
};

export default NavigationDock;
