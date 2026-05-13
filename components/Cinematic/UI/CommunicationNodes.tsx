'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, FileText } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/manish' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/manish' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/manish' },
  { icon: Mail, label: 'Email', href: 'mailto:manish@example.com' },
  { icon: FileText, label: 'Resume', href: '/resume.pdf' },
];

const CommunicationNodes: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 items-end">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
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
