import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, FileText } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const CommunicationNodes: React.FC = () => {
  const { settings } = useData();

  const links = useMemo(() => {
    if (!settings) return [];
    
    const { socialLinks, resumeUrl } = settings;
    
    const items = [
      { icon: Github, label: 'GitHub', href: socialLinks?.github },
      { icon: Twitter, label: 'Twitter', href: socialLinks?.twitter },
      { icon: Linkedin, label: 'LinkedIn', href: socialLinks?.linkedin },
      { icon: Mail, label: 'Email', href: socialLinks?.email ? `mailto:${socialLinks.email}` : null },
      { icon: FileText, label: 'Resume', href: resumeUrl },
    ];

    // Filter out items without URLs
    return items.filter(item => item.href);
  }, [settings]);

  if (!links.length) return null;

  return (
    <div className="flex flex-col gap-6 items-end">
      {links.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href!}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
          whileHover={{ x: -12, scale: 1.05 }}
          className="group flex items-center gap-4 text-foreground/40 hover:text-accent-amber transition-all duration-500"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 font-mono">
            {link.label}
          </span>
          <div className="glass w-11 h-11 flex items-center justify-center rounded-full transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(214,168,106,0.15)] group-hover:border-accent-amber/30">
            <link.icon size={18} className="transition-transform duration-500 group-hover:scale-110" />
          </div>
        </motion.a>

      ))}
    </div>
  );
};

export default CommunicationNodes;
