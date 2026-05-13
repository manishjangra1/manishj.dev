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
          whileHover={{ x: -10, scale: 1.1 }}
          className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300 font-mono">
            {link.label}
          </span>
          <div className="glass w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:border-accent-blue/50">
            <link.icon size={16} />
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default CommunicationNodes;
