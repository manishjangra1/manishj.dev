'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface FooterProps {
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export default function Footer({ socialLinks }: FooterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="py-20 px-6 sm:px-8 lg:px-12 border-t"
      style={{ 
        backgroundColor: colors.background,
        borderColor: colors.cardBorder,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: colors.textPrimary }}
          >
            Manish
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ 
              background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`
            }}
          />
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <p 
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              © {currentYear} <span style={{ color: colors.textPrimary, fontWeight: 600 }}>Manish</span>. All rights reserved.
            </p>
          </motion.div>

          {socialLinks && (socialLinks.github || socialLinks.linkedin || socialLinks.twitter || socialLinks.email) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-3"
            >
              {socialLinks.github && (
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 backdrop-blur-lg rounded-xl border transition-colors"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBorder;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBg;
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" style={{ color: colors.textPrimary }} />
                </motion.a>
              )}
              {socialLinks.linkedin && (
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 backdrop-blur-lg rounded-xl border transition-colors"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBorder;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBg;
                  }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" style={{ color: colors.textPrimary }} />
                </motion.a>
              )}
              {socialLinks.twitter && (
                <motion.a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 backdrop-blur-lg rounded-xl border transition-colors"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBorder;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBg;
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" style={{ color: colors.textPrimary }} />
                </motion.a>
              )}
              {socialLinks.email && (
                <motion.a
                  href={`mailto:${socialLinks.email}`}
                  className="p-3.5 backdrop-blur-lg rounded-xl border transition-colors"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBorder;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardBg;
                  }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" style={{ color: colors.textPrimary }} />
                </motion.a>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center md:text-right"
          >
            <p 
              className="text-sm hidden"
              style={{ color: colors.textSecondary }}
            >
              Built with <span style={{ color: colors.gradientFrom }}>Next.js</span> & <span style={{ color: colors.gradientTo }}>TypeScript</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
